#!/usr/bin/env node
"use strict";
/* Browser rendering QA for the independent portfolio preview. No private data or network dependencies. */
const fs=require("fs"),http=require("http"),path=require("path"),os=require("os"),cp=require("child_process");
const site=path.join(__dirname,"../site"),cases=["gtm","social","community","brand","operations","b2b","seo","amazon","creative","crm","creator"];
const mime={".html":"text/html;charset=utf-8",".js":"application/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".mp4":"video/mp4",".txt":"text/plain"};
const serve=http.createServer((req,res)=>{
  const url=new URL(req.url,"http://localhost/");
  let rel=decodeURIComponent(url.pathname);if(rel==="/")rel="/index.html";
  const file=path.resolve(site,"."+rel);
  if(!file.startsWith(site+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end("Not found");return}
  res.setHeader("Content-Type",mime[path.extname(file)]||"application/octet-stream");
  fs.createReadStream(file).pipe(res);
});
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const watchdog=setTimeout(()=>{console.error("VISUAL_QA_WATCHDOG_TIMEOUT");process.exit(2)},150000);
const getJSON=url=>new Promise((resolve,reject)=>{http.get(url,res=>{let t="";res.on("data",x=>t+=x);res.on("end",()=>{try{resolve(JSON.parse(t))}catch(e){reject(e)}})}).on("error",reject)});
const chromeList=[process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium","google-chrome","chromium"].filter(Boolean);
const browser=chromeList.find(cmd=>cp.spawnSync(cmd,["--version"],{stdio:"ignore"}).status===0);
if(!browser){console.error("VISUAL_BROWSER_UNAVAILABLE: Chrome/Chromium missing");process.exit(2)}
let chrome,ws,seq=1,waiting=new Map(),navigationReady=false;
function send(method,params={}){
  const id=seq++;
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{waiting.delete(id);reject(new Error("CDP timeout "+method))},15000);
    waiting.set(id,{resolve,reject,timer});
    ws.send(JSON.stringify({id,method,params}));
  });
}
async function evaluate(expression){
  const r=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
  if(r.exceptionDetails)throw Error("Page JS: "+JSON.stringify(r.exceptionDetails));
  return r.result?.value;
}
async function navigate(port,route,w,h){
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:1,mobile:w<=450});
  if(!navigationReady){
    await send("Page.navigate",{url:"http://127.0.0.1:"+port+"/#/"+route});
    navigationReady=true;
  }else{
    await evaluate("location.hash="+JSON.stringify("#/"+route));
  }
  for(let i=0;i<35;i++){
    await delay(130);
    const ready=await evaluate("document.readyState==='complete' && Boolean(document.querySelector('main .case-section,main #case-list,main .career-list,main .cap-list'))");
    if(ready)break;
  }
  await evaluate("(async()=>{const ims=[...document.querySelectorAll('main img')];ims.forEach(i=>i.loading='eager');await Promise.all(ims.map(i=>i.decode().catch(()=>null)));return ims.length})()");
  await delay(180);
  if(route.startsWith("case/")){
    const id=route.split("/")[1];
    const exists=await evaluate("Boolean(document.querySelector('.case-page-"+id+"'))");
    if(!exists)throw new Error("CASE_NOT_RENDERED "+route);
  }
  return await evaluate("(()=>{const m=document.querySelector('main');const im=[...m.querySelectorAll('img')];return {title:m.querySelector('h1')?.textContent||'',imageCount:im.length,brokenImages:im.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),imagesWithoutAlt:im.filter(i=>!i.hasAttribute('alt')).map(i=>i.src),overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),width:innerWidth,scrollWidth:document.documentElement.scrollWidth,caseId:m.querySelector('.case-page-gtm,.case-page-social,.case-page-brand,.case-page-operations')?.className||''}})()");
}
async function screenshot(label){
  const image=(await send("Page.captureScreenshot",{format:"jpeg",quality:45,fromSurface:true,captureBeyondViewport:false})).data;
  if(!image||image.length<2000)throw Error("Screenshot empty: "+label);
  console.log("VISUAL_JPEG_"+label+"="+image);
  return Math.floor(image.length*.75);
}
(async()=>{
  await new Promise(resolve=>serve.listen(0,"127.0.0.1",resolve));
  const port=serve.address().port;
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"portfolio-chrome-"));
  chrome=cp.spawn(browser,["--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars","--disable-dev-shm-usage","--remote-allow-origins=*","--remote-debugging-port=9229","--user-data-dir="+dir,"about:blank"],{stdio:"ignore"});
  let page;
  for(let i=0;i<70;i++){try{const pages=await getJSON("http://127.0.0.1:9229/json/list");page=pages.find(x=>x.type==="page");if(page)break}catch(e){}await delay(180)}
  if(!page)throw Error("Chrome DevTools unavailable");
  ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener("open",resolve,{once:true});ws.addEventListener("error",reject,{once:true})});
  ws.addEventListener("message",ev=>{let p;try{p=JSON.parse(ev.data)}catch{return}if(!p.id)return;let item=waiting.get(p.id);if(!item)return;waiting.delete(p.id);clearTimeout(item.timer);if(p.error)item.reject(new Error(p.error.message));else item.resolve(p.result)});
  await send("Page.enable");await send("Runtime.enable");
  const report={date:"2026-11-24",screens:[],issues:[],ratio:[]};
  for(const [width,height] of [[1440,980],[390,844]]){
    for(const name of ["cases",...cases.map(id=>"case/"+id),"experience","capabilities"]){
      console.log("VISUAL_ROUTE_BEGIN",width,name);
      const r=await navigate(port,name,width,height);report.screens.push({route:name,width,height,...r});
      console.log("VISUAL_ROUTE_DONE",width,name,r.imageCount,r.overflow,r.title.slice(0,55));
      if(r.brokenImages.length)report.issues.push({route:name,width,brokenImages:r.brokenImages});
      if(r.imagesWithoutAlt.length)report.issues.push({route:name,width,noAlt:r.imagesWithoutAlt});
      if(r.overflow>12)report.issues.push({route:name,width,overflow:r.overflow});
    }
    const pr=await navigate(port,"case/brand/pr-project",width,height);
    await evaluate("document.getElementById('pr-strategy-overview')?.scrollIntoView({block:'start',behavior:'instant'})");
    await delay(220);
    const prAudit=await evaluate("(()=>{const el=document.getElementById('pr-strategy-overview'),bar=document.querySelector('.case-page .case-tabs'),root=document.getElementById('pr-project');return {exists:!!el,top:el?.getBoundingClientRect().top??-1,navBottom:bar?.getBoundingClientRect().bottom??0,intelligence:root?.querySelectorAll('.pr-intelligence-grid article').length||0,productRoles:root?.querySelectorAll('.pr-message-grid article').length||0,channelJobs:root?.querySelectorAll('.pr-channel-grid article').length||0,delivery:root?.querySelectorAll('.pr-delivery-flow article').length||0,proof:root?.querySelector('.pr-published-evidence')?.textContent.includes('King Newswire')||false,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth)}})()");
    console.log("VISUAL_BRAND_PR="+JSON.stringify({width,...prAudit}));
    report.brandPr ??=[];
    report.brandPr.push({width,...prAudit});
    if(!prAudit.exists||prAudit.intelligence!==3||prAudit.productRoles!==4||prAudit.channelJobs!==5||prAudit.delivery!==4||!prAudit.proof||prAudit.overflow>12||prAudit.top<prAudit.navBottom-4){
      report.issues.push({brandPr:{width,...prAudit}});
    }
    if(width===1440){await screenshot("BRAND_PR_DESKTOP")}else{await screenshot("BRAND_PR_MOBILE")}
    const videoCase=await navigate(port,"case/creative/video-projects",width,height);
    await evaluate("document.getElementById('video-brand-foundation')?.scrollIntoView({block:'start',behavior:'instant'})");
    await delay(210);
    const videoAudit=await evaluate("(()=>{const section=document.getElementById('video-projects'),hero=document.getElementById('video-brand-foundation'),bar=document.querySelector('.case-page .case-tabs');return {exists:!!section,top:hero?.getBoundingClientRect().top??-1,navBottom:bar?.getBoundingClientRect().bottom??0,foundation:section?.querySelectorAll('.video-foundation-grid article').length||0,assets:section?.querySelectorAll('.video-asset-architecture-grid article').length||0,paid:section?.querySelectorAll('.video-paid-stage-grid article').length||0,lifecycle:section?.querySelectorAll('.video-lifecycle-journey article').length||0,production:section?.querySelectorAll('.video-production-grid article').length||0,tvcs:section?.querySelectorAll('.tvc-work-grid iframe').length||0,creator:section?.querySelectorAll('.g-video-gallery video').length||0,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth)}})()");
    console.log("VISUAL_VIDEO_CAMPAIGN="+JSON.stringify({width,...videoAudit}));
    report.videoCampaign ??=[];
    report.videoCampaign.push({width,...videoAudit});
    if(!videoAudit.exists||videoAudit.foundation!==3||videoAudit.assets!==4||videoAudit.paid!==4||videoAudit.lifecycle!==4||videoAudit.production!==3||videoAudit.tvcs!==2||videoAudit.creator!==2||videoAudit.overflow>12||videoAudit.top<videoAudit.navBottom-4){
      report.issues.push({videoCampaign:{width,...videoAudit}});
    }
    if(width===1440){await screenshot("VIDEO_CAMPAIGN_DESKTOP")}else{await screenshot("VIDEO_CAMPAIGN_MOBILE")}
    const pm=await navigate(port,"case/gtm/gtm-positioning-decision",width,height);
    await evaluate("document.getElementById('gtm-positioning-decision')?.scrollIntoView({block:'start',behavior:'instant'})");
    await delay(220);
    const pmm=await evaluate("(()=>{const root=document.getElementById('gtm-positioning-decision'),bar=document.querySelector('.case-page .case-tabs');return {exists:!!root,top:root?.getBoundingClientRect().top??-1,navBottom:bar?.getBoundingClientRect().bottom??0,brandRoles:root?.querySelectorAll('.pmm-positioning-bridge article').length||0,competitors:root?.querySelectorAll('.pmm-competitive-grid article').length||0,fabe:root?.querySelectorAll('.pmm-fabe-grid article').length||0,messages:root?.querySelectorAll('.pmm-awareness-grid article').length||0,visibleIdea:root?.textContent.includes('Make Room for What Matters')||false,overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth)}})()");
    console.log("VISUAL_PMM_ANCHOR="+JSON.stringify({width,...pmm}));
    report.positioning ??=[];
    report.positioning.push({width,...pmm});
    if(!pmm.exists||pmm.brandRoles!==3||pmm.competitors!==3||pmm.fabe!==3||pmm.messages!==4||!pmm.visibleIdea||pmm.overflow>12||pmm.top<pmm.navBottom-4){
      report.issues.push({positioning:{width,...pmm}});
    }
    if(width===1440){await screenshot("M3_POSITIONING_DESKTOP")}else{await screenshot("M3_POSITIONING_MOBILE")}
    const r=await navigate(port,"case/brand/promotion-campaign-kv",width,height);
    await evaluate("document.getElementById('promotion-kv-gallery')?.scrollIntoView({block:'start',behavior:'instant'})");
    await delay(200);
    const anchor=await evaluate("(()=>{const el=document.getElementById('promotion-kv-gallery'),bar=document.querySelector('.case-page .case-tabs');return {artTop:el?.getBoundingClientRect().top??-1,navBottom:bar?.getBoundingClientRect().bottom??0}})()");
    report.anchor ??=[];
    report.anchor.push({width,...anchor});
    if(anchor.artTop<anchor.navBottom-3)report.issues.push({width,anchorOverlap:anchor});
    if(width===1440){await screenshot("PROMO_DESKTOP")}else{await screenshot("PROMO_MOBILE")}
    const originals=await evaluate("(()=>{const gallery=document.querySelector('#promotion-kv-gallery');const items=[...gallery.querySelectorAll('#promotion-original-work .promotion-original-card>a img')].map(x=>({src:x.getAttribute('src'),complete:x.complete,width:x.naturalWidth}));const mother=!!gallery.querySelector('#promotion-original-mother a[href*=crm-campaign-email-plan]');const simulated=!!gallery.querySelector('.promotion-kv-grid');return {items,mother,simulated}})()");
    report.originalKV ??=[];
    report.originalKV.push({viewport:width,...originals});
    const expected=["assets/projects/black-friday-suite-concept.jpg","assets/projects/fathers-day-bbq-concept.jpg"];
    if(originals.items.length!==2 || originals.items.some((item,i)=>item.src!==expected[i]||!item.complete||item.width===0) || !originals.mother || originals.simulated){
      report.issues.push({width,originalKV:originals});
    }
  }
  fs.writeFileSync(path.join(__dirname,"../qa/live-visual-audit.json"),JSON.stringify(report,null,2)+"\n");
  console.log("VISUAL_QA_RESULT="+JSON.stringify({screens:report.screens.length,originalKV:report.originalKV?.length||0,positioning:report.positioning?.length||0,brandPr:report.brandPr?.length||0,videoCampaign:report.videoCampaign?.length||0,issueCount:report.issues.length,issues:report.issues.slice(0,18)}));
  if(report.issues.some(i=>i.brokenImages||i.noAlt||i.originalKV||i.anchorOverlap||i.positioning||i.brandPr||i.videoCampaign||i.overflow))process.exitCode=1;
})().catch(e=>{console.error("VISUAL_QA_ERROR",e.stack||String(e));process.exitCode=1}).finally(async()=>{clearTimeout(watchdog);if(ws)ws.close();if(chrome)chrome.kill();serve.closeAllConnections?.();serve.close();setTimeout(()=>process.exit(process.exitCode||0),1200)});
