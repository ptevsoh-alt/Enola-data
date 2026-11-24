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
let chrome,ws,seq=1,waiting=new Map();
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
  await send("Page.navigate",{url:"http://127.0.0.1:"+port+"/#/"+route});
  for(let i=0;i<35;i++){
    await delay(130);
    const ready=await evaluate("document.readyState==='complete' && Boolean(document.querySelector('main .case-section,main #case-list,main .career-list,main .cap-list'))");
    if(ready)break;
  }
  await evaluate("(async()=>{const ims=[...document.querySelectorAll('main img')];ims.forEach(i=>i.loading='eager');await Promise.all(ims.map(i=>i.decode().catch(()=>null)));return ims.length})()");
  await delay(180);
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
    for(const name of ["cases",...cases,"experience","capabilities"]){
      console.log("VISUAL_ROUTE_BEGIN",width,name);
      const r=await navigate(port,name,width,height);report.screens.push({route:name,width,height,...r});
      console.log("VISUAL_ROUTE_DONE",width,name,r.imageCount,r.overflow);
      if(r.brokenImages.length)report.issues.push({route:name,width,brokenImages:r.brokenImages});
      if(r.imagesWithoutAlt.length)report.issues.push({route:name,width,noAlt:r.imagesWithoutAlt});
      if(r.overflow>12)report.issues.push({route:name,width,overflow:r.overflow});
    }
    const r=await navigate(port,"case/brand/promotion-campaign-kv",width,height);
    await evaluate("document.getElementById('promotion-kv-gallery')?.scrollIntoView({block:'start',behavior:'instant'})");
    await delay(200);
    if(width===1440){await screenshot("PROMO_DESKTOP")}else{await screenshot("PROMO_MOBILE")}
    for(const ratio of ["feed","story","hero"]){
      const expr=[
        "(()=>{const key="+JSON.stringify(ratio)+";",
        "document.querySelector('[data-promo-ratio='+key+']')?.click();",
        "const grid=document.querySelector('#promotion-kv-gallery .promotion-kv-grid');",
        "const cards=[...grid.querySelectorAll('.promotion-kv-art')];",
        "const measured=cards.map(c=>{",
        "const box=c.getBoundingClientRect();",
        "const heading=c.querySelector('.promo-kv-main strong')?.getBoundingClientRect();",
        "const action=c.querySelector('.promo-kv-action')?.getBoundingClientRect();",
        "return {width:Math.round(box.width),height:Math.round(box.height),aspect:Number((box.width/box.height).toFixed(3)),",
        "textOverflow:!!heading&&!!action&&(heading.left<box.left-4||heading.right>box.right+4||heading.bottom>action.top+2||action.bottom>box.bottom+4)};",
        "});",
        "return {ratio:key,selected:grid.dataset.promoLayout,pressed:[...document.querySelectorAll('#promotion-kv-gallery [data-promo-ratio]')].filter(b=>b.getAttribute('aria-pressed')==='true').length,measured};",
        "})()"
      ].join("");
      const result=await evaluate(expr);
      report.ratio.push({viewport:width,...result});
      if(result.selected!==ratio||result.pressed!==1||result.measured.some(c=>c.textOverflow))report.issues.push({ratio,width,result});
    }
  }
  fs.writeFileSync(path.join(__dirname,"../qa/live-visual-audit.json"),JSON.stringify(report,null,2)+"\n");
  console.log("VISUAL_QA_RESULT="+JSON.stringify({screens:report.screens.length,ratio:report.ratio.length,issueCount:report.issues.length,issues:report.issues.slice(0,18)}));
  if(report.issues.some(i=>i.brokenImages||i.noAlt||i.ratio))process.exitCode=1;
})().catch(e=>{console.error("VISUAL_QA_ERROR",e.stack||String(e));process.exitCode=1}).finally(async()=>{clearTimeout(watchdog);if(ws)ws.close();if(chrome)chrome.kill();serve.closeAllConnections?.();serve.close();setTimeout(()=>process.exit(process.exitCode||0),1200)});
