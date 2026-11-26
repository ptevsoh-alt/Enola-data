// Video portfolio: Brand → Campaign → Paid/Organic/Creator → Lifecycle content roles.
// Tests public narrative and route continuity; does not claim paid/CRM outcomes.
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const {JSDOM,VirtualConsole}=require("jsdom");
(async()=>{
 const root=path.resolve(__dirname,"../site");
 const source=fs.readFileSync(path.join(root,"projects.js"),"utf8");
 new vm.Script(source,{filename:"projects.js"});
 const style=fs.readFileSync(path.join(root,"growth.css"),"utf8");
 assert.ok(style.includes("/* 2026-11-26: Video portfolio"),"Responsive video strategy styling absent");
 const doc=fs.readFileSync(path.join(root,"index.html"),"utf8").replace(/<script[^>]*src[^>]*><\/script>/g,"");
 const dom=new JSDOM(doc,{url:"https://portfolio.test/",runScripts:"outside-only",pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
 const w=dom.window,d=w.document,errors=[];
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.addEventListener("error",e=>errors.push(e.message));
 for(const f of ["data.js","selected-work.js","growth.js","projects.js","app.js","role-journeys.js"])
  w.eval(fs.readFileSync(path.join(root,f),"utf8"));
 const route=async(x)=>{w.location.hash="#/"+x;await new Promise(resolve=>setTimeout(resolve,100));};
 const count=x=>d.querySelectorAll(x).length;
 await route("case/creative/video-projects");
 const v=d.getElementById("video-projects");assert.ok(v,"Video target chapter missing");
 for(const id of ["video-brand-foundation","video-asset-architecture","video-paid-architecture","video-production-system","video-lifecycle-handoff","video-management"])
  assert.ok(v.querySelector("#"+id),"Missing strategy/production/lifecycle section: "+id);
 assert.equal(count("#video-projects .video-foundation-grid article"),3,"Category, customer and brand analysis incomplete");
 assert.equal(count("#video-projects .video-asset-architecture-grid article"),4,"Four video roles required");
 assert.equal(count("#video-projects .video-paid-stage-grid article"),4,"Paid/organic creative stages missing");
 assert.equal(count("#video-projects .video-production-grid article"),3,"Video production proof gate incomplete");
 assert.equal(count("#video-projects .video-lifecycle-journey article"),4,"Video lifecycle role sequence incomplete");
 assert.equal(count("#video-projects .video-delivery-grid article"),4,"Creative management path incomplete");
 assert.equal(count("#video-projects iframe[src^='https://drive.google.com/file/d/']"),2,"Both full TVC embeds must remain");
 assert.equal(count("#video-projects video[controls]"),2,"Two local Creator demos must remain");
 for(const asset of ["assets/video/creator-staircase-7s.mp4","assets/video/creator-livingroom-7s.mp4"])
  assert.ok(v.querySelector('source[src="'+asset+'"]'),"Original Creator source missing: "+asset);
 assert.ok(v.textContent.includes("Power Every Move"),"Brand roof missing");
 assert.ok(v.textContent.includes("Make Room for What Matters"),"M3 vs holiday distinction missing");
 assert.ok(v.textContent.includes("Paid Owner"),"Paid execution ownership missing");
 assert.ok(v.textContent.includes("会员"),"Loyalty boundary missing");
 assert.ok(v.querySelector('a[href="#/case/gtm/campaign-architecture"]'),"Video → Campaign handoff missing");
 assert.ok(v.querySelector('a[href="#/case/crm/crm-handoff"]'),"Video → Lifecycle handoff missing");
 assert.equal(count("#video-projects a[href^='#thanksgiving']"),0,"Do not use invalid in-page hash router links");
 await route("case/gtm/campaign-architecture");
 const c=d.getElementById("campaign-architecture");assert.ok(c,"Campaign anchor missing");
 assert.equal(count("#campaign-architecture .campaign-video-handoff-grid article"),3,"Campaign video roles missing");
 assert.ok(c.querySelector('a[href="#/case/creative/video-projects"]'),"Campaign → Video case link missing");
 assert.ok(c.textContent.includes("Make Room for What Matters"),"M3 campaign theme missing");
 assert.ok(c.textContent.includes("Power Every Move"),"Brand strategy missing");
 await route("case/brand/pr-project");
 assert.ok(d.querySelector("#pr-project .pr-message-grid"),"Stacked PR #32 enhancements not preserved");
 for(const link of ["case/brand/brand-positioning","case/crm/crm-handoff","case/community","case/operations/asset-review"]) {
  await route(link);
  const id=link.split("/").at(-1);
  if(link.startsWith("case/")&&link.split("/").length===3)assert.ok(d.getElementById(id),"Linked chapter missing: "+link);
 }
 assert.deepEqual(errors,[],"Browser runtime errors");
 dom.window.close();
 console.log("PASS Video Campaign: 3 strategy lenses / 4 real video roles / 4 paid-content jobs / 3 video gates / 4 lifecycle states / 4 delivery phases / 2 TVCs / 2 Creator demos / bidirectional Campaign links");
})().catch(e=>{console.error(e);process.exitCode=1});
