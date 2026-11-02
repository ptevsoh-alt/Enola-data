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
      assert.equal(
        clone.textContent.replace(/\\s+/g, " ").trim(),
        old.d.querySelector("main").textContent.replace(/\\s+/g, " ").trim(),
      );
    });
  }
  await route("/home");
  check("homepage presents three independent growth records and a four-stage operating story", () => {
    assert.ok(d.querySelector("#growth-story"));
    assert.equal(d.querySelectorAll(".g-home-signal").length, 3);
    assert.deepEqual(
      [...d.querySelectorAll(".g-home-signal")].map((x) => x.dataset.growthMetric),
      ["engagement-change", "ig-event-engagement-change", "group"],
    );
    assert.equal(d.querySelectorAll(".g-home-stage").length, 4);
    assert.ok(d.querySelector(".g-home-stage-proof").textContent.includes("0 → 8K+"));
    assert.ok(d.querySelector(".g-home-stage-proof").textContent.includes("字段与日期待核"));
    assert.ok(d.querySelector(".g-home-story-footnote").textContent.includes("不是同一时间序列"));
    assert.ok(d.querySelector(".results-band").textContent.includes("96.5万"));
    assert.ok(d.querySelector(".results-band").textContent.includes("3.7万"));
  });
  await route("/case/social");
  check("eight social management stages form one end-to-end journey", () => {
    assert.equal(d.querySelectorAll(".g-foundation>article").length, 8);
    assert.ok(d.querySelector(".g-social-story").textContent.includes("社媒负责人 / 管理组长"));
    assert.ok(d.querySelector(".g-foundation").textContent.includes("Facebook Group 社群运营"));
    assert.ok(d.querySelector(".g-foundation").textContent.includes("数据复盘与持续迭代"));
  });
  check("social management case shows ownership and collaboration", () => {
    assert.equal(d.querySelectorAll(".g-social-ownership>article").length, 3);
    assert.ok(d.querySelector(".g-social-ownership").textContent.includes("产品、设计、视频、电商"));
  });
  check("editorial and campaign planning are connected to the social case", () => {
    assert.ok(d.querySelector(".g-editorial"));
    assert.ok(d.querySelector(".g-campaign-wall"));
    assert.ok(d.querySelector(".g-social-loop"));
  });
  check("Facebook Group operation is integrated with four distinct source fields", () => {
    assert.equal(d.querySelectorAll(".g-social-community-card").length, 4);
    assert.deepEqual(
      [...d.querySelectorAll(".g-social-community-card")].map((x) => x.dataset.growthMetric),
      ["group", "group-members", "group-posters", "group-viewers"],
    );
    assert.ok(d.querySelector(".g-social-community-note").textContent.includes("不合并为增长率或活跃率"));
    assert.ok(d.querySelector('.g-social-community-actions a[href="#/case/community"]'));
  });
  check("B2B Facebook follower scale is not mixed into the social case", () => {
    assert.equal(d.querySelectorAll('[data-growth-metric="fb-follower-scale"]').length, 0);
    assert.equal(d.querySelectorAll('[data-growth-metric="linkedin-follower-change"]').length, 0);
  });
  const communityEvidence = d.querySelector(
    '.g-social-community-card[data-growth-metric="group-posters"] [data-evidence]',
  );
  communityEvidence.focus();
  communityEvidence.click();
  check("integrated community metric opens the evidence drawer", () =>
    assert.ok(d.querySelector("#evidence-dialog").open),
  );
  d.querySelector('[data-close="evidence-dialog"]').click();
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
  await route("/data/b2b");
  check("B2B Facebook follower scale stays on the B2B data page", () => {
    assert.ok(d.querySelector(".g-b2b-stage"));
    assert.ok(d.querySelector(".g-b2b-stage").textContent.includes("400+"));
    assert.ok(d.querySelector(".g-b2b-stage").textContent.includes("1,900+"));
  });
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
  check("Facebook page snapshot uses five independent metric cards", () => {
    assert.equal(d.querySelectorAll(".g-snapshot-card").length, 5);
    assert.equal(d.querySelectorAll(".g-snapshot-period").length, 0);
    assert.equal(d.querySelectorAll(".g-snapshot-card-top small").length, 0);
    assert.deepEqual(
      [...d.querySelectorAll(".g-snapshot-card")].map((x) => x.dataset.growthMetric),
      ["fb-views", "fb-content-interactions", "fb-link-clicks", "fb-visits", "fb-follows"],
    );
    assert.equal(d.querySelectorAll(".g-bar-row, .g-chart-scale").length, 0);
    assert.ok(!d.querySelector(".g-snapshot-chart").textContent.includes("内容表现的数量级"));
  });
  check("Facebook backend change values stay attached to their own fields", () => {
    const expected = new Map([
      ["fb-content-interactions", "↑ 1,358.3%"],
      ["fb-link-clicks", "↑ 1.7万%"],
      ["fb-visits", "↑ 1,517.8%"],
      ["fb-follows", "↑ 2,129.2%"],
    ]);
    for (const [id, value] of expected) {
      const card = d.querySelector(`.g-snapshot-card[data-growth-metric="${id}"]`);
      assert.ok(card.textContent.includes(value), id);
      assert.ok(card.textContent.includes("比较周期未注明"), id);
    }
    assert.ok(
      d.querySelector('.g-snapshot-card[data-growth-metric="fb-views"]').textContent.includes("未提供"),
    );
  });
  check("social historical growth is grouped by social channel without B2B metrics", () => {
    assert.equal(d.querySelectorAll(".g-history-card").length, 7);
    assert.equal(d.querySelectorAll(".g-history-group").length, 3);
    assert.ok(d.querySelector(".g-history-growth").textContent.includes("不按百分比排名"));
    assert.ok(d.querySelector(".g-history-growth").textContent.includes("Instagram"));
    assert.ok(!d.querySelector(".g-history-growth").textContent.includes("LinkedIn"));
    assert.deepEqual(
      [...d.querySelectorAll(".g-history-card")].map((x) => x.dataset.growthMetric),
      [
        "engagement-change",
        "fb-reach",
        "fb-link-click-change",
        "ig-event-engagement-change",
        "ig-follower-change",
        "group",
        "group-month",
      ],
    );
  });
  check("unverified monthly group growth remains visibly pending", () => {
    assert.ok(
      d.querySelector('.g-history-card[data-growth-metric="group-month"] .is-pending'),
    );
  });
  const snapshotEvidence = d.querySelector(
    '.g-snapshot-card[data-growth-metric="fb-content-interactions"] [data-evidence]',
  );
  snapshotEvidence.focus();
  snapshotEvidence.click();
  check("snapshot metric still opens the existing evidence drawer", () =>
    assert.ok(d.querySelector("#evidence-dialog").open),
  );
  d.querySelector('[data-close="evidence-dialog"]').click();
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
