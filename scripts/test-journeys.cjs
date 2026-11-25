const fs = require("fs");
const path = require("path");
const assert = require("assert/strict");
const {JSDOM, VirtualConsole} = require("jsdom");
(async () => {
  const site = path.resolve(__dirname, "../site");
  const failures = [];
  const dom = new JSDOM(
    fs.readFileSync(path.join(site, "index.html"), "utf8").replace(/<script[^>]*src[^>]*><\/script>/g, ""),
    {url:"https://portfolio.test/",runScripts:"outside-only",pretendToBeVisual:true,virtualConsole:new VirtualConsole()}
  );
  const w=dom.window,d=w.document;
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.addEventListener("error",e=>failures.push(e.message));
  for(const file of ["data.js","selected-work.js","growth.js","projects.js","app.js","role-journeys.js"]) {
    w.eval(fs.readFileSync(path.join(site,file),"utf8"));
  }
  const check=(condition,message)=>assert.ok(condition,message);
  const route=async(hash)=>{w.location.hash=hash;await new Promise(resolve=>setTimeout(resolve,12));};
  check(d.querySelectorAll(".jd-journey-card").length===4,"Home must show four integrated case journeys");
  check(d.querySelectorAll("#jd-case-path .home-decision-grid a").length===4,"Legacy four-step links retained");
  check(d.querySelectorAll("#strategy-map .home-route-card").length===8,"Legacy eight topic links retained");
  check(d.querySelector(".jd-legacy-index")?.matches("details"),"Legacy index must be optional");
  check(d.querySelectorAll(".jd-journey-stages a").length===16,"Four complete four-stage links");
  check(w.PORTFOLIO_SELECTED_WORK.gtm.chapter==="gtm-positioning-decision","GTM featured case must open positioning first for the hiring reader");
  check(d.querySelector('.career-spotlight[href="#/case/gtm/gtm-positioning-decision"]'),"Home spotlight must open M3 positioning first");
  const anchors=[...d.querySelectorAll(".jd-journey-stages a")].map(x=>x.getAttribute("href"));
  const unique=[...new Set(anchors)];
  const ids=new Set(w.PORTFOLIO.cases.map(c=>c.id));
  for(const a of unique){
    const match=a.match(/^#\/case\/([^/]+)(?:\/([^/]+))?$/);
    check(match&&ids.has(match[1]),"Unknown case link: "+a);
    await route(a.slice(1));
    if(match[2])check(Boolean(d.getElementById(match[2])),"Missing target chapter: "+a);
    check(d.querySelectorAll(".case-section").length===7,"Case sections must remain intact: "+a);
    check(d.querySelector("#evidence .case-related-links[data-integrated]"),"Integrated case links missing: "+a);
    check(!d.querySelector(".jd-case-bridge"),"Duplicate related-work panel found: "+a);
  }
  await route("/capabilities");
  check(d.querySelectorAll(".jd-journey-card").length===4,"Capabilities page has integrated pathways");
  check(d.querySelectorAll(".jd-capabilities-detail .cap-list article").length===10,"Existing ten capability entries preserved");
  await route("/home");
  check(d.querySelectorAll(".jd-journey-card").length===4,"Home rehydrates after navigation");
  check(failures.length===0,"Runtime errors: "+failures.join("; "));
  dom.window.close();
  process.stdout.write("Integrated journey regression PASS: 4 journeys / 16 links / 11 original cases retained / no runtime errors\n");
})().catch(e=>{console.error(e);process.exitCode=1;});
