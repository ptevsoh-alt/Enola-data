const fs = require("fs"),
  path = require("path"),
  { JSDOM, VirtualConsole } = require("jsdom"),
  assert = require("assert/strict");
(async () => {
  const errors = [],
    checks = [],
    site = path.resolve(__dirname, "../site");
  const dom = new JSDOM(
    fs
      .readFileSync(path.join(site, "index.html"), "utf8")
      .replace(/<script[^>]*src[^>]*><\/script>/g, ""),
    {
      url: "https://portfolio.test/",
      runScripts: "outside-only",
      pretendToBeVisual: true,
      virtualConsole: new VirtualConsole(),
    },
  );
  const w = dom.window,
    d = w.document;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  w.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new w.Event("close"));
  };
  w.addEventListener("error", (e) => errors.push(e.message));
  w.eval(fs.readFileSync(path.join(site, "data.js"), "utf8"));
  w.eval(fs.readFileSync(path.join(site, "selected-work.js"), "utf8"));
  w.eval(fs.readFileSync(path.join(site, "growth.js"), "utf8"));
  w.eval(fs.readFileSync(path.join(site, "app.js"), "utf8"));
  const check = (n, fn) => {
      fn();
      checks.push({ name: n, status: "PASS" });
    },
    route = async (s) => {
      w.location.hash = s;
      await new Promise((r) => setTimeout(r, 5));
    };
  check("homepage shows the career direction alongside six projects", () => {
    assert.equal(d.querySelectorAll(".case-card").length, 6);
    assert.equal(d.querySelectorAll(".home-route-card").length, 7);
    assert.equal(d.querySelectorAll("#jd-case-path .home-decision-grid a").length, 4);
    assert.equal(d.querySelectorAll(".home-proof-bridge a").length, 3);
    assert.equal(d.querySelector(".profile-direction").textContent, w.PORTFOLIO.profile.direction);
    assert.match(d.querySelector(".hero-summary").textContent, /近 6 年.*小组管理.*四条清洁产品线/);
  });
  for (const c of w.PORTFOLIO.cases) {
    await route("/case/" + c.id);
    check("seven chapters and valid assets: " + c.id, () => {
      assert.equal(d.querySelectorAll(".case-section").length, 7);
      for (const id of [
        "background",
        "insight",
        "strategy",
        "execution",
        "management",
        "results",
        "evidence",
      ])
        assert.ok(d.getElementById(id));
      for (const img of d.querySelectorAll("img"))
        assert.ok(fs.existsSync(path.join(site, img.getAttribute("src"))));
    });
  }
  await route("/cases");
  check("full case index", () =>
    assert.equal(d.querySelectorAll(".case-card").length, 11),
  );
  d.querySelector('[data-filter="团队与交付"]').click();
  check("business filter", () =>
    assert.equal(d.querySelectorAll(".case-card").length, 1),
  );
  let input = d.querySelector("#case-search");
  input.value = "无匹配词";
  input.dispatchEvent(new w.Event("input", { bubbles: true }));
  check("empty state", () => assert.ok(d.querySelector("[data-reset]")));
  d.querySelector("[data-reset]").click();
  check("reset restores all cases", () =>
    assert.equal(d.querySelectorAll(".case-card").length, 11),
  );
  input.value = "PMM";
  input.dispatchEvent(new w.Event("input", { bubbles: true }));
  check("search matches professional terms", () =>
    assert.equal(d.querySelectorAll(".case-card").length, 1),
  );
  for (const domain of Object.keys(w.PORTFOLIO.domains)) {
    await route("/data/" + domain);
    check("data domain " + domain, () =>
      assert.equal(
        d.querySelectorAll(".data-kpis .metric").length,
        w.PORTFOLIO.metrics.filter((m) => m.domain === domain).length,
      ),
    );
  }
  for (const m of w.PORTFOLIO.metrics) {
    await route("/data/" + m.domain);
    const b = d.querySelector(`[data-evidence="${m.id}"]`);
    b.focus();
    b.click();
    check("metric evidence " + m.id, () => {
      assert.ok(d.querySelector("#evidence-dialog").open);
      assert.ok(
        d.querySelector("#evidence-content").textContent.includes(m.definition),
      );
      assert.ok(
        d.querySelector("#evidence-content").textContent.includes(m.source),
      );
    });
    d.querySelector('[data-close="evidence-dialog"]').click();
    assert.equal(d.activeElement, b);
  }
  await route("/case/gtm");
  d.querySelector("[data-image]").click();
  check("concept image preview", () =>
    assert.ok(d.querySelector("#lightbox").open),
  );
  d.querySelector('[data-close="lightbox"]').click();
  d.querySelector(".menu-button").click();
  check("mobile menu toggles", () =>
    assert.equal(
      d.querySelector(".menu-button").getAttribute("aria-expanded"),
      "true",
    ),
  );
  for (const r of ["experience", "capabilities", "contact", "about"]) {
    await route("/" + r);
    check("support page " + r, () => {
      assert.ok(d.querySelector("main h1"));
      if (r === "experience") {
        const jobs = d.querySelectorAll(".career-list article");
        assert.equal(jobs.length, 4);
        assert.equal(jobs[0].querySelector("time").textContent, "2025.04—2026.09");
        assert.equal(jobs[0].querySelector("h2").textContent, "社媒负责人 / 管理组长");
        assert.deepEqual([...jobs[0].querySelectorAll("a")].map((a) => a.hash), ["#/case/gtm", "#/case/operations", "#/case/social"]);
      }
      if (r === "contact") assert.equal(d.querySelector(".lede").textContent, w.PORTFOLIO.profile.direction);
    });
  }
  d.querySelector(".skip").click();
  check("skip link preserves route and focuses main", () => {
    assert.equal(d.activeElement, d.querySelector("main"));
    assert.notEqual(w.location.hash, "#main");
  });
  await route("/unknown");
  check("unknown route recovery", () =>
    assert.ok(d.querySelector("main").textContent.includes("未找到")),
  );
  check("no runtime exceptions", () => assert.deepEqual(errors, []));
  console.log(
    JSON.stringify(
      { passed: checks.length, total: checks.length, checks },
      null,
      2,
    ),
  );
  w.close();
})();
