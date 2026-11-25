// Portfolio M3 Brand / GTM / IMC content integrity checks.
// Checks editorial depth and route-level rendering without asserting marketing outcomes.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { JSDOM, VirtualConsole } = require("jsdom");

(async () => {
  const site = path.resolve(__dirname, "../site");
  const projects = fs.readFileSync(path.join(site, "projects.js"), "utf8");
  const css = fs.readFileSync(path.join(site, "growth.css"), "utf8");
  new vm.Script(projects, { filename: "projects.js" });
  for (const phrase of [
    "CAMPAIGN BIG IDEA", "Power Every Move", "Make Room for What Matters",
    "campaign-strategy-spine", "campaign-brand-thesis", "campaign-territory-set",
    "campaign-adaptation-grid", "campaign-integration-guardrails"
  ]) {
    assert.ok(projects.includes(phrase), `M3 strategy content missing: ${phrase}`);
  }
  assert.ok(css.includes("@media(max-width:620px)"), "Missing mobile layout rules");
  const html = fs.readFileSync(path.join(site, "index.html"), "utf8")
    .replace(new RegExp("<script[^>]*src[^>]*></script>", "g"), "");
  const dom = new JSDOM(html, {
    url: "https://portfolio.test/#/case/gtm/campaign-architecture",
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: new VirtualConsole()
  });
  const w = dom.window;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  for (const file of ["data.js", "selected-work.js", "growth.js", "projects.js", "app.js", "role-journeys.js"]) {
    w.eval(fs.readFileSync(path.join(site, file), "utf8"));
  }
  w.location.hash = "#/case/gtm/campaign-architecture";
  await new Promise(resolve => setTimeout(resolve, 80));
  const d = w.document;
  const count = (q) => d.querySelectorAll(q).length;
  assert.equal(count("#campaign-architecture"), 1, "Campaign section missing or duplicated");
  assert.equal(count(".campaign-strategy-spine article"), 4, "Business/insight/value/tradeoff missing");
  assert.equal(count(".campaign-brand-thesis article"), 3, "Brand positioning layer incomplete");
  assert.equal(count(".campaign-territory-grid article"), 3, "Three distinct creative territories required");
  assert.equal(count(".campaign-integration-grid article"), 3, "Campaign ownership handoffs required");
  assert.equal(count(".campaign-adaptation-grid article"), 4, "Creative channel transformation missing");
  assert.equal(count("#campaign-paid-email-assets"), 1, "Creative adaptation anchor missing");
  assert.equal(count("#campaign-creative-territories"), 1, "Creative territories anchor missing");
  assert.ok(d.querySelector("#campaign-architecture").textContent.includes("Make Room for What Matters"));
  const targets = ["#/case/brand/brand-positioning", "#/case/crm/crm-handoff", "#/case/creative/video-strategy"];
  targets.forEach(h => assert.ok(d.querySelector(`a[href="${h}"]`), `Related case link missing: ${h}`));
  dom.window.close();
  console.log("PASS: Brand → GTM → IMC narrative, 3 creative territories, creative adaptation and links");
})().catch(error => { console.error(error); process.exitCode = 1; });
