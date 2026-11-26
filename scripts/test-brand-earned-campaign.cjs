// Hiring-facing Brand PR and Campaign content regression.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { JSDOM, VirtualConsole } = require("jsdom");

(async () => {
  const site=path.resolve(__dirname,"../site");
  const projects=fs.readFileSync(path.join(site,"projects.js"),"utf8");
  const css=fs.readFileSync(path.join(site,"growth.css"),"utf8");
  new vm.Script(projects,{filename:"projects.js"});
  assert.ok(css.includes("/* Brand earned communication + Campaign creative adaptation"),"PR styles absent");
  assert.ok(css.includes("@media(max-width:620px)"),"Mobile styles absent");
  const html=fs.readFileSync(path.join(site,"index.html"),"utf8").replace(/<script[^>]*src[^>]*><\/script>/g,"");
  const errors=[];
  const dom=new JSDOM(html,{url:"https://portfolio.test/",runScripts:"outside-only",pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
  const w=dom.window,d=w.document;
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.addEventListener("error",e=>errors.push(e.message));
  for(const file of ["data.js","selected-work.js","growth.js","projects.js","app.js","role-journeys.js"]){
    w.eval(fs.readFileSync(path.join(site,file),"utf8"));
  }
  const route=async(path)=>{w.location.hash="#/"+path;await new Promise(resolve=>setTimeout(resolve,90));};
  const count=(selector)=>d.querySelectorAll(selector).length;
  await route("case/brand/pr-project");
  assert.ok(d.getElementById("pr-project"),"Brand PR anchor not rendered");
  assert.equal(count("#pr-project .pr-intelligence-grid article"),3,"Market, customer and brand decisions missing");
  assert.equal(count("#pr-project .pr-message-grid article"),4,"Four product-role narratives required");
  assert.equal(count("#pr-project .pr-channel-grid article"),5,"Five distinct channels/localization roles required");
  assert.equal(count("#pr-project .pr-delivery-flow article"),4,"PR preparation, approval and publication sequence missing");
  assert.ok(d.querySelector("#pr-project .pr-message-roof")?.textContent.includes("家庭清洁 · 品牌长期价值"),"Anonymized brand umbrella claim missing");
  const prHeroImage = d.querySelector("#pr-strategy-overview figure img");
  assert.equal(prHeroImage?.getAttribute("src"), "assets/projects/pr-home-scene.webp", "PR image must remain linked");
  assert.equal(prHeroImage?.getAttribute("loading"), "eager", "PR hero image should not be deferred on deep links");
  const proof=d.querySelector("#pr-project .pr-published-evidence")?.textContent||"";
  assert.ok(proof.includes("King Newswire")&&proof.includes("USA Today Press Release"),"Actual publication proof boundary missing");
  assert.ok(proof.includes("独立编辑"),"Press release must not be presented as independent editorial");
  assert.ok(d.querySelector('#pr-project a[href="#/case/brand/brand-positioning"]'),"PR to Brand navigation missing");
  assert.ok(d.querySelector('#pr-project a[href="#/case/gtm/campaign-architecture"]'),"PR to Campaign navigation missing");
  await route("case/gtm/campaign-architecture");
  assert.ok(d.getElementById("campaign-architecture"),"Campaign chapter missing");
  assert.equal(count("#campaign-architecture .campaign-management-sequence article"),4,"Brand to delivery decision chain missing");
  assert.equal(count("#campaign-architecture .campaign-integration-grid article"),3,"Campaign management stages incomplete");
  assert.equal(count("#campaign-architecture .campaign-release-checkpoints>div"),4,"Release milestones incomplete");
  assert.equal(count("#campaign-architecture .campaign-adaptation-grid article"),4,"Native creative versions incomplete");
  assert.equal(count("#campaign-architecture .campaign-adaptation-journey>div"),4,"Creative evidence journey incomplete");
  assert.equal(count("#campaign-architecture .campaign-assets-pair article"),2,"Paid and EDM examples should be retained");
  assert.ok(d.querySelector("#campaign-architecture .campaign-management-sequence")?.textContent.includes("Make Room for What Matters"),"Campaign idea link broken");
  assert.ok(d.querySelector("#campaign-architecture .campaign-adaptation-grid")?.textContent.includes("Creator Brief"),"Creator execution details missing");
  assert.ok(d.querySelector("#campaign-architecture .campaign-adaptation-grid")?.textContent.includes("FAQ"),"User questions absent");
  assert.equal(errors.length,0,"Runtime errors: "+errors.join("; "));
  dom.window.close();
  process.stdout.write("PASS: Brand PR strategy / 3 intelligence lenses / 4 product roles / 5 channel jobs / Campaign execution + creative adaptation\n");
})().catch(e=>{console.error(e);process.exitCode=1});
