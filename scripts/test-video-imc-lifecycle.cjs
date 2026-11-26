// Video Projects: Brand, IMC, Paid creative and Lifecycle proof-bound case.
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const vm=require("node:vm");
const {JSDOM,VirtualConsole}=require("jsdom");

(async()=>{
  const site=path.resolve(__dirname,"../site");
  const src=fs.readFileSync(path.join(site,"projects.js"),"utf8");
  const css=fs.readFileSync(path.join(site,"growth.css"),"utf8");
  new vm.Script(src,{filename:"projects.js"});
  assert.ok(css.includes("/* Video Projects: Brand / IMC / Paid creative / Lifecycle decisions"),"Video responsive style missing");
  const html=fs.readFileSync(path.join(site,"index.html"),"utf8").replace(/<script[^>]*src[^>]*><\/script>/g,"");
  const errors=[];
  const dom=new JSDOM(html,{url:"https://portfolio.test/",runScripts:"outside-only",pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
  const w=dom.window,d=w.document;
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.addEventListener("error",e=>errors.push(e.message));
  for(const f of ["data.js","selected-work.js","growth.js","projects.js","app.js","role-journeys.js"]){w.eval(fs.readFileSync(path.join(site,f),"utf8"))}
  const route=async(r)=>{w.location.hash="#/"+r;await new Promise(resolve=>setTimeout(resolve,105))};
  const count=(sel)=>d.querySelectorAll(sel).length;
  await route("case/creative/video-projects");
  const root=d.getElementById("video-projects");
  assert.ok(root,"Video Projects chapter absent");
  assert.equal(count("#video-projects .video-positioning-grid article"),3,"Market, Customer and Brand decision lenses missing");
  assert.equal(count("#video-projects .video-campaign-positioning-line>div"),3,"Brand/Seasonal/Creator strategy chain missing");
  assert.equal(count("#video-projects .tvc-work-card"),2,"Both seasonal film creative cases must remain");
  assert.equal(count("#video-projects .tvc-work-safe-preview"),2,"Source footage links must be replaced with anonymized summaries");
  assert.equal(count("#video-projects .g-video-gallery video"),2,"Two local creator clips must remain");
  assert.equal(count("#video-projects .video-imc-framework .tvc-campaign-bridge-grid article"),4,"IMC channel-role mapping missing");
  assert.equal(count("#video-projects .video-journey-grid article"),5,"Awareness through postpurchase content responsibilities incomplete");
  assert.equal(count("#video-projects .video-lifecycle-handoff article"),2,"Lifecycle and loyalty need distinct evidence boundaries");
  assert.equal(count("#video-projects .video-hook-grid article"),3,"Paid creative angle hypotheses incomplete");
  assert.equal(count("#video-projects .video-delivery-grid article"),5,"Campaign video management chain incomplete");
  assert.ok(root.querySelector(".video-campaign-positioning-line")?.textContent.includes("Power Every Move"),"Long-term brand promise missing");
  assert.ok(root.querySelector(".video-context-note")?.textContent.includes("Make Room for What Matters"),"Cross-campaign context should be explicit");
  assert.ok(root.querySelector(".video-test-boundary")?.textContent.includes("Paid Owner"),"Paid experiment ownership must remain distinct");
  assert.ok(root.querySelector(".video-lifecycle-handoff")?.textContent.includes("CRM / Lifecycle Owner"),"CRM consent/status boundaries missing");
  assert.ok(root.querySelector(".video-lifecycle-handoff")?.textContent.includes("推荐奖励"),"Loyalty cannot be inferred from video plays");
  assert.ok(root.querySelector('#video-projects a[href="#/case/gtm/campaign-architecture"]'),"Video-to-Campaign navigation missing");
  assert.ok(root.querySelector('#video-projects a[href="#/case/brand/pr-project"]'),"Video-to-brand/PR navigation missing");
  for(const src of ["assets/video/creator-staircase-7s.mp4","assets/video/creator-livingroom-7s.mp4"]){assert.ok(root.querySelector('source[src="'+src+'"]'),"Original video missing: "+src)}
  await route("case/gtm/campaign-architecture");
  assert.ok(d.querySelector('#campaign-paid-email-assets a[href="#/case/creative/video-projects"]'),"Campaign-to-Video backlink missing");
  assert.equal(count("#campaign-architecture .campaign-management-sequence article"),4,"Campaign management must remain intact");
  assert.equal(errors.length,0,errors.join("; "));
  dom.window.close();
  process.stdout.write("PASS: Video Projects / 3 insight lenses / 4 IMC jobs / 5 awareness-lifecycle stages / Paid creative / 5 production-management stages and original videos\n");
})().catch(err=>{console.error(err);process.exitCode=1});
