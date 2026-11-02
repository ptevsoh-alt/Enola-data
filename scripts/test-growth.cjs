const fs = require("fs"),
  path = require("path"),
  crypto = require("crypto"),
  assert = require("assert/strict"),
  { JSDOM, VirtualConsole } = require("jsdom");
(async () => {
  const root = path.resolve(__dirname, ".."),
    read = (f) =>
      fs.readFileSync(path.join(root, f), "utf8").replace(/\r\n/g, "\n"),
    sha = (s) => crypto.createHash("sha256").update(s).digest("hex"),
    checks = [];
  const check = (name, fn) => {
    fn();
    checks.push({ name, status: "PASS" });
  };
  const baseline = JSON.parse(read("qa/incremental/baseline.json"));
  const originalApp = read("site/app.js")
    .replace(
      '    document.querySelectorAll("dialog[open]").forEach(d => d.close());\n',
      "",
    )
    .replace("    window.enhancePortfolio?.(main, {page, id});\n", "");
  check("approved data and stylesheet unchanged", () => {
    for (const f of ["site/data.js", "site/styles.css"])
      assert.equal(sha(read(f)), baseline.files[f]);
  });
  check(
    "all approved app copy and markup retained with only integration and modal cleanup insertions",
    () => assert.equal(sha(originalApp), baseline.files["site/app.js"]),
  );
  check("index copy retained with stylesheet and script additions only", () =>
    assert.equal(
      sha(
        read("site/index.html")
          .replace('    <link rel="stylesheet" href="growth.css" />\n', "")
          .replace('    <script src="growth.js" defer></script>\n', ""),
      ),
      baseline.files["site/index.html"],
    ),
  );
  function create(app, enhanced) {
    const errors = [],
      dom = new JSDOM(
        read("site/index.html").replace(/<script[^>]*src[^>]*><\/script>/g, ""),
        {
          url: "https://portfolio.test/",
          runScripts: "outside-only",
          pretendToBeVisual: true,
          virtualConsole: new VirtualConsole(),
        },
      );
    const w = dom.window;
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
    w.eval(read("site/data.js"));
    if (enhanced) w.eval(read("site/growth.js"));
    w.eval(app);
    return { dom, w, d: w.document, errors };
  }
  const old = create(originalApp, false),
    cur = create(read("site/app.js"), true),
    { w, d } = cur;
  const route = async (r) => {
    old.w.location.hash = r;
    w.location.hash = r;
    await new Promise((r) => setTimeout(r, 10));
  };
  const routes = [
    "home",
    "cases",
    ...w.PORTFOLIO.cases.map((c) => "case/" + c.id),
    ...Object.keys(w.PORTFOLIO.domains).map((x) => "data/" + x),
    "experience",
    "capabilities",
    "about",
    "contact",
  ];
  for (const r of routes) {
    await route("/" + r);
    check("original visible copy preserved: " + r, () => {
      let clone = d.querySelector("main").cloneNode(true);
      clone.querySelectorAll("[class]").forEach((e) => {
        if ([...e.classList].some((s) => s.startsWith("g-"))) e.remove();
      });
      assert.equal(clone.textContent, old.d.querySelector("main").textContent);
    });
  }
  await route("/case/social");
  check("eight social management stages", () =>
    assert.equal(d.querySelectorAll(".g-foundation>article").length, 8),
  );
  check("editorial and campaign planning separated", () => {
    assert.ok(d.querySelector(".g-editorial"));
    assert.ok(d.querySelector(".g-campaign-wall"));
  });
  check("no fabricated trend path or series", () => {
    assert.equal(w.PORTFOLIO_GROWTH.series.length, 0);
    assert.ok(
      d.querySelector(".g-trend-status").textContent.includes("不绘制趋势线"),
    );
  });
  await route("/data/social");
  d.querySelector('[data-g-platform="Instagram"]').click();
  check("Instagram filter preserves metric identities", () => {
    assert.deepEqual(
      [...d.querySelectorAll("[data-platform-cards] [data-growth-metric]")].map(
        (e) => e.dataset.growthMetric,
      ),
      ["ig-event-engagement-change", "ig-follower-change"],
    );
  });
  const evidence = d.querySelector("[data-platform-cards] [data-evidence]");
  evidence.focus();
  evidence.click();
  check("new KPI invokes existing evidence drawer", () =>
    assert.ok(d.querySelector("#evidence-dialog").open),
  );
  await route("/cases");
  check("route closes evidence drawer", () =>
    assert.equal(d.querySelector("#evidence-dialog").open, false),
  );
  await route("/case/gtm");
  d.querySelector("[data-image]").click();
  await route("/case/gtm/strategy");
  check("same case chapter route closes image modal", () =>
    assert.equal(d.querySelector("#lightbox").open, false),
  );
  await route("/case/community");
  for (let i = 0; i < 6; i++) {
    d.querySelector(`[data-g-topic="${i}"]`).click();
    check("community topic selection " + i, () => {
      assert.equal(
        d.querySelectorAll('[data-g-topic][aria-pressed="true"]').length,
        1,
      );
      assert.ok(
        d
          .querySelector("[data-topic-panel]")
          .textContent.includes("非历史帖子"),
      );
    });
  }
  check("community feedback and onboarding present", () => {
    assert.ok(d.querySelector(".g-feedback-loop"));
    assert.equal(
      d.querySelectorAll(".g-community-onboarding>article").length,
      2,
    );
  });
  await route("/case/social");
  for (let i = 0; i < 3; i++) {
    d.querySelector(`[data-g-campaign="${i}"]`).click();
    check("campaign fields " + i, () => {
      for (const field of [
        "Campaign Objective",
        "Consumer Insight",
        "Big Idea",
        "Campaign Mechanism",
        "Content & Channel Mix",
        "UGC / Participation",
        "Communication Timeline",
        "Measurement & Review",
      ])
        assert.ok(
          d.querySelector("[data-campaign-panel]").textContent.includes(field),
        );
    });
    const trigger = d.querySelector("[data-g-preview]");
    trigger.focus();
    trigger.click();
    check("campaign visual preview " + i, () =>
      assert.ok(d.querySelector("#growth-preview").open),
    );
    d.querySelector("[data-g-close]").click();
    assert.equal(d.activeElement, trigger);
  }
  d.querySelector("[data-g-preview]").click();
  await route("/case/community");
  check("route closes added campaign modal", () =>
    assert.equal(d.querySelector("#growth-preview").open, false),
  );
  const valid = {
    evidenceStatus: "VERIFIED",
    accountScope: "confirmed scope",
    metricDefinition: "confirmed field",
    source: "confirmed export",
    window: "2025-01-01 to 2025-01-02",
    points: [
      { date: "2025-01-01", value: 1 },
      { date: "2025-01-02", value: 2 },
    ],
  };
  const validate = w.PORTFOLIO_GROWTH.validateSeries;
  check("trend gate accepts complete dated data contract", () =>
    assert.ok(validate(valid)),
  );
  for (const [name, change] of [
    ["missing scope", { accountScope: "" }],
    ["unverified source", { evidenceStatus: "DOCUMENTED" }],
    ["one aggregate", { points: [valid.points[0]] }],
    ["duplicate date", { points: [valid.points[0], valid.points[0]] }],
    [
      "non-numeric",
      { points: [{ date: "2025-01-01", value: NaN }, valid.points[1]] },
    ],
  ])
    check("trend gate rejects " + name, () =>
      assert.equal(validate({ ...valid, ...change }), null),
    );
  check("no runtime exceptions", () => assert.deepEqual(cur.errors, []));
  console.log(
    JSON.stringify(
      { passed: checks.length, total: checks.length, checks },
      null,
      2,
    ),
  );
  old.w.close();
  w.close();
})();
