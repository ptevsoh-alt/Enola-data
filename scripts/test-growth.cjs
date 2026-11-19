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
  check("index copy retained with stylesheet and script additions only", () =>
    assert.equal(
      sha(
        read("site/index.html")
          .replace(/\?v=[a-f0-9]+(?=")/g, "")
          .replace('        <span aria-hidden="true"> · </span><a href="review/">独立审阅入口 ↗</a>\n', "")
          .replace('<a href="review/">审阅入口</a>', "")
          .replace('    <link rel="stylesheet" href="growth.css" />\n', "")
          .replace('    <script src="growth.js" defer></script>\n', "")
          .replace('    <script src="projects.js" defer></script>\n', ""),
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
    if (enhanced) {
      w.eval(read("site/growth.js"));
      w.eval(read("site/projects.js"));
    }
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
  const featured = ["gtm", "brand", "operations", "social"];
  for (const r of routes.filter((r) => r.startsWith("data/") || r === "about")) {
    await route("/" + r);
    check("data values and metric identities preserved: " + r, () => {
      if (r === "about") {
        assert.equal(d.querySelectorAll(".rights-grid .badge").length, Object.keys(w.PORTFOLIO.statuses).length);
      } else {
        const current = [...d.querySelectorAll(".data-kpis .metric")].map((x) => [x.dataset.evidence, x.querySelector("strong").textContent]);
        const previous = [...old.d.querySelectorAll(".data-kpis .metric")].map((x) => [x.dataset.evidence, x.querySelector("strong").textContent]);
        assert.deepEqual(current, previous);
      }
    });
  }
  await route("/home");
  check("homepage surfaces four featured cases and two period metrics", () => {
    const links = [...d.querySelectorAll(".featured-nav a")];
    assert.deepEqual(links.map((item) => item.hash.split("/").at(-1)), featured);
    assert.equal(d.querySelectorAll(".featured-grid .case-card").length, 4);
    const summary = d.querySelector(".home-summary");
    assert.ok(summary.textContent.includes("2025 年阶段汇总"));
    assert.deepEqual([...summary.querySelectorAll("[data-evidence]")].map((b) => b.dataset.evidence), ["impressions", "engagements"]);
    assert.equal(d.querySelector(".application-hero img"), null);
  });
  for (const id of featured) {
    await route("/case/" + id);
    check("overview and chapter links: " + id, () => {
      const overview = d.querySelector(".g-case-overview");
      assert.deepEqual([...overview.querySelectorAll("h2")].map((h) => h.textContent), ["我的职责", "关键决定", "产出与结果"]);
      const path = overview.querySelector("a").hash;
      assert.equal(path.split("/")[2], id);
      assert.ok(d.getElementById(path.split("/")[3]));
      assert.equal(d.querySelectorAll(".case-tabs a").length, 7);
    });
  }
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
  check("social metrics are connected to management decisions without causal claims", () => {
    const section = d.querySelector("#social-data-decisions");
    assert.ok(section);
    assert.equal(section.querySelectorAll(".g-decision-card").length, 4);
    for (const id of ["fb-views", "fb-content-interactions", "fb-link-clicks", "fb-visits", "group-viewers", "group-posters", "group-members"])
      assert.ok(section.querySelector(`.g-decision-metric[data-growth-metric="${id}"]`), id);
    assert.ok(section.textContent.includes("不等于订单或收入"));
    assert.equal(section.querySelectorAll(".g-decision-card")[0].querySelector("h3").textContent, "页面浏览量");
    assert.equal(section.querySelectorAll(".g-decision-card")[1].querySelector("h3").textContent, "内容互动");
    assert.equal(section.querySelectorAll(".g-decision-card")[2].querySelector("h3").textContent, "链接与页面访问");
    assert.ok(!section.textContent.includes("内容触达"));
    assert.ok(!section.textContent.includes("站点导流"));
    assert.ok(section.textContent.includes("计算活跃率或成员转化率"));
    assert.ok(section.textContent.includes("不是单项内容的因果归因"));
    assert.ok(section.querySelector('a[href="#/data/social"]'));
    assert.ok(section.querySelector('a[href="#/case/community"]'));
  });
  check("editorial and campaign planning are connected to the social case", () => {
    assert.ok(d.querySelector(".g-editorial"));
    assert.ok(d.querySelector(".g-campaign-wall"));
    assert.ok(d.querySelector(".g-social-loop"));
  });
  check("Facebook Group growth and participation use separate metric cards", () => {
    assert.deepEqual(
      [...d.querySelectorAll(".g-social-community-growth .g-social-community-card")].map((x) => x.dataset.growthMetric),
      ["group-growth-1k", "group"],
    );
    assert.deepEqual(
      [...d.querySelectorAll(".g-social-community-grid .g-social-community-card")].map((x) => x.dataset.growthMetric),
      ["group-members", "group-posters", "group-viewers"],
    );
    assert.ok(d.querySelector(".g-social-community-note").textContent.includes("1K+"));
    assert.ok(d.querySelector(".g-social-community-note").textContent.includes("+227"));
    assert.ok(d.querySelector(".g-social-community-note").textContent.includes("不合并为增长率或活跃率"));
    assert.ok(d.querySelector('.g-social-community-actions a[href="#/case/community"]'));
    assert.ok(d.querySelector('.g-social-community-actions a[href="#/data/social"]'));
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
  check("aggregate data never supplies a fabricated daily series", () => {
    assert.equal(w.PORTFOLIO_GROWTH.series.length, 0);
    assert.ok(
      d.querySelector(".g-growth").textContent.includes("连续日期导出"),
    );
  });
  check("Facebook source evidence contains two anonymized backend screenshots", () => {
    const cards = d.querySelectorAll(".g-source-evidence-card");
    assert.equal(cards.length, 2);
    assert.equal(
      d.querySelector('.g-source-evidence-card img[src="assets/evidence/facebook-page-insights.webp"]')?.getAttribute("alt")?.includes("Facebook 页面分析后台截图"),
      true,
    );
    assert.equal(
      d.querySelector('.g-source-evidence-card img[src="assets/evidence/facebook-group-insights.webp"]')?.getAttribute("alt")?.includes("Facebook Group Insights"),
      true,
    );
    assert.ok(d.querySelector(".g-source-window").textContent.includes("2025.11.02"));
    assert.ok(d.querySelector(".g-source-window").textContent.includes("2026.09.30"));
    assert.ok([...cards].every((card) => card.tagName === "DETAILS" && !card.open));
    assert.ok(d.querySelector('.g-source-evidence-actions a[href="#/case/social"]'));
    assert.ok(d.querySelector('.g-source-evidence-actions a[href="#/case/community"]'));
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
  check("GTM creative territories map to one primary mechanism and proof boundary", () => {
    const section = d.querySelector("#campaign-mechanism-mapping");
    assert.ok(section);
    for (const term of ["问题显化", "机制揭示", "关系价值转移", "细节证明", "真实体验证明"])
      assert.ok(section.textContent.includes(term), term);
    assert.ok(section.parentElement.textContent.includes("视觉隐喻不能替代产品性能证据"));
  });
  d.querySelector("[data-image]").click();
  await route("/case/gtm/strategy");
  check("same case chapter route closes image modal", () =>
    assert.equal(d.querySelector("#lightbox").open, false),
  );
  await route("/case/community");
  check("community case shows both documented growth records without AI copy", () => {
    const copy = d.querySelector("main").textContent;
    assert.ok(copy.includes("1K+"));
    assert.ok(copy.includes("+227"));
    for (const phrase of ["经历重构", "策略结构示意", "文案样例为本次概念创作", "字段核验", "重构示意"])
      assert.ok(!copy.includes(phrase), phrase);
  });
  for (let i = 0; i < 6; i++) {
    d.querySelector(`[data-g-topic="${i}"]`).click();
    check("community topic selection " + i, () => {
      assert.equal(
        d.querySelectorAll('[data-g-topic][aria-pressed="true"]').length,
        1,
      );
      assert.ok(
        !d.querySelector("[data-topic-panel]").textContent.includes("文案样例为本次概念创作"),
      );
      assert.ok(
        !d.querySelector("[data-topic-panel]").textContent.includes("非历史帖子"),
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
  check("community activation has a single-owner event contract and consent boundaries", () => {
    const section = d.querySelector("#community-event-governance");
    assert.ok(section);
    for (const term of ["唯一负责人", "活动发生在 Group 内，不自动改变最终 Owner", "参与资格", "奖励与履约", "单独确认使用授权", "出席不等于营销同意", "RSVP 不等于购买意向", "抽奖参与不等于高价值客户"])
      assert.ok(section.textContent.includes(term), term);
  });
  check("new evidence modules use readable typography", () => {
    const css = read("site/growth.css");
    assert.ok(css.includes(".g-decision-question { font-size: 13px; line-height: 1.8; }"));
    assert.ok(css.includes(".g-decision-action p { font-size: 13px; line-height: 1.8; }"));
    assert.ok(css.includes(".g-decision-note { font-size: 12px; line-height: 1.8; }"));
    assert.ok(css.includes(".g-chart-note { margin: .75rem 0;"));
  });
  for (const path of ["/case/community", "/data/community"]) {
    await route(path);
    check("community metrics have independent cards and evidence: " + path, () => {
      const proof = d.querySelector(".g-community-proof");
      const cards = [...proof.querySelectorAll(".g-community-metric")];
      assert.deepEqual(cards.map((card) => card.dataset.evidence), ["group-viewers", "group-posters", "group-members"]);
      assert.deepEqual(cards.map((card) => card.querySelector("strong").textContent.trim()), ["34,387 人", "146 人", "4,009 名"]);
      assert.ok(cards[0].textContent.includes("2025/11/02–2026/09/30"));
      assert.ok(cards[1].textContent.includes("2025/11/02–2026/09/30"));
      assert.ok(cards[2].textContent.includes("采集日期未注明"));
      assert.equal(proof.querySelector(".g-compare-chart, [role='progressbar']"), null);
      assert.ok(proof.querySelector('a[href="assets/evidence/facebook-group-insights.webp"]'));
      for (const card of cards) {
        card.focus();
        card.click();
        assert.ok(d.querySelector("#evidence-dialog").open);
        d.querySelector('[data-close="evidence-dialog"]').click();
        assert.equal(d.activeElement, card);
      }
    });
  }
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
      assert.ok(card.querySelector(".g-snapshot-change").textContent.includes(value));
    }
    assert.ok(
      d.querySelector('.g-snapshot-card[data-growth-metric="fb-views"]').textContent.includes("未提供"),
    );
    assert.equal(d.querySelector(".g-compare-chart, .bar-row, [role='progressbar']"), null);
    const summary = d.querySelector(".g-meta-summary");
    assert.deepEqual([...summary.querySelectorAll(".metric")].map((card) => card.dataset.evidence), ["impressions", "engagements"]);
    assert.ok(summary.querySelector('[data-evidence="er"]'));
  });
  check("Father's Day calendar renders thirty selectable bilingual entries", () => {
    const days = [...d.querySelectorAll("#fathers-day-calendar [data-calendar-day]")];
    assert.deepEqual(days.map((day) => Number(day.dataset.calendarDay)), Array.from({ length: 30 }, (_, index) => index + 1));
    assert.ok(days.every((day) => day.querySelector('[lang="en"]') && day.querySelector('summary b')));
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
        "group-growth-1k",
      ],
    );
  });
  check("Facebook Group 1K+ growth is documented separately from +227", () => {
    const growth = d.querySelector('.g-history-card[data-growth-metric="group-growth-1k"]');
    const stage = d.querySelector('.g-history-card[data-growth-metric="group"]');
    assert.ok(growth.querySelector(".is-documented"));
    assert.ok(growth.textContent.includes("1K+"));
    assert.ok(!growth.textContent.includes("≈1K/月"));
    assert.ok(stage.textContent.includes("+227"));
    assert.equal(w.PORTFOLIO.metrics.find((x) => x.id === "group-growth-1k").status, "DOCUMENTED");
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
