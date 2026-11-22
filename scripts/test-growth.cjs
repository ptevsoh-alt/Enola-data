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
  const publicMetricsRevision = JSON.parse(read("qa/incremental/public-metrics-20261122.json"));
  const originalApp = read("site/app.js")
    .replace(
      '    document.querySelectorAll("dialog[open]").forEach(d => d.close());\n',
      "",
    )
    .replace("    window.enhancePortfolio?.(main, {page, id});\n", "");
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
    w.eval(read("site/selected-work.js"));
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
  check("approved public metric revision removes only missing-outcome placeholders", () => {
    assert.equal(publicMetricsRevision.baselineSha256, baseline.publicMetricsSha256);
    assert.equal(sha(JSON.stringify(w.PORTFOLIO.metrics)), publicMetricsRevision.publicMetricsSha256);
    assert.equal(w.PORTFOLIO.metrics.length, publicMetricsRevision.publicMetricCount);
    for (const id of publicMetricsRevision.removedPlaceholderIds) {
      assert.ok(!w.PORTFOLIO.metrics.some((m) => m.id === id), id + " was not removed");
    }
    assert.ok(w.PORTFOLIO.metrics.some((m) => m.id === publicMetricsRevision.retainDocumentedRangeMetric));
  });
  check("index metadata reflects the portfolio career direction", () => {
    assert.match(d.querySelector('meta[name="description"]').content, /海外品牌营销.*IMC.*GTM/);
    assert.match(d.querySelector('meta[name="description"]').content, /社媒增长.*团队交付/);
    assert.equal(d.querySelector('meta[property="og:title"]').content, d.title);
  });
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
  const featured = ["gtm", "brand", "social", "operations", "creative", "b2b"];
  for (const r of routes.filter((r) => r.startsWith("data/") || r === "about")) {
    await route("/" + r);
    check("data values and metric identities preserved: " + r, () => {
      if (r === "about") {
        assert.equal(d.querySelectorAll(".cap-list article").length, 4);
        assert.ok(d.querySelector("main h1").textContent.includes("从品牌判断到项目交付"));
      } else {
        const current = [...d.querySelectorAll(".data-kpis .metric")].map((x) => [x.dataset.evidence, x.querySelector("strong").textContent]);
        const previous = [...old.d.querySelectorAll(".data-kpis .metric")].map((x) => [x.dataset.evidence, x.querySelector("strong").textContent]);
        assert.deepEqual(current, previous);
      }
    });
  }
  await route("/home");
  check("homepage links six selected works, seven practice modules and distinct period metrics", () => {
    const links = [...d.querySelectorAll(".featured-nav a")];
    assert.deepEqual(links.map((item) => item.hash.split("/").at(-1)), featured);
    assert.equal(d.querySelectorAll(".featured-grid .case-card").length, 6);
    assert.equal(d.querySelectorAll("#strategy-map .home-route-card").length, 7);
    assert.equal(d.querySelectorAll("#jd-case-path .home-decision-grid a").length, 4);
    assert.deepEqual([...d.querySelectorAll("#jd-case-path .home-decision-grid h3")].map((x) => x.textContent),
      ["市场与用户判断", "GTM 与 Campaign 策划", "团队协作与项目推进", "传播结果与优化动作"]);
    assert.equal(d.querySelectorAll(".home-proof-bridge a").length, 3);
    assert.equal(d.querySelector(".home-proof-bridge a strong").textContent, "4,009");
    const summary = d.querySelector(".home-summary");
    assert.ok(summary.textContent.includes("2025 年 · 品牌内容与社媒增长"));
    assert.deepEqual([...summary.querySelectorAll("[data-evidence]")].map((b) => b.dataset.evidence), ["impressions", "engagements"]);
    assert.equal(d.querySelector(".application-hero img"), null);
  });
  const originalScrollIntoView = w.HTMLElement.prototype.scrollIntoView;
  let scrolledSection;
  w.HTMLElement.prototype.scrollIntoView = function () { scrolledSection = this.id; };
  await route(d.querySelector('.application-hero .btn').hash);
  check("homepage topic action scrolls to the portfolio route index", () => {
    assert.equal(scrolledSection, "jd-case-path");
  });
  w.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  for (const { id } of w.PORTFOLIO.cases) {
    await route("/case/" + id);
    check("overview and chapter links: " + id, () => {
      const overview = d.querySelector(".g-case-overview");
      assert.deepEqual([...overview.querySelectorAll("h2")].map((h) => h.textContent), ["我的工作范围", "关键策略判断", "项目交付与成果"]);
      const path = overview.querySelector("a").hash;
      assert.equal(path.split("/")[2], id);
      assert.ok(d.getElementById(path.split("/")[3]));
      assert.equal(d.querySelectorAll(".case-tabs a").length, 7);
      const evidencePath = d.querySelector("#evidence a").hash;
      assert.ok(d.getElementById(evidencePath.split("/")[3]));
      assert.deepEqual([...d.querySelectorAll(".case-handoff-board h3")].map((h) => h.textContent), ["组织与协作", "复盘与下一步"]);
      const insight = d.querySelector("#insight");
      assert.notEqual(insight.querySelector("h2").textContent, "从问题到判断");
      assert.equal(insight.querySelectorAll("p").length, 1);
      assert.equal(insight.querySelectorAll(".reader-source-note").length, 0);
    });
  }
  await route("/case/gtm/campaign-paid-email-assets");
  check("Paid Ads and EDM creative variants are present", () => {
    assert.equal(d.querySelectorAll("#campaign-paid-email-assets article").length, 2);
    assert.equal(d.querySelectorAll("#campaign-activation .campaign-workstreams article").length, 8);
  });
  await route("/case/gtm/launch-delivery");
  check("the launch work sample connects milestones, an English brief and the asset review", () => {
    assert.equal(d.querySelectorAll("#launch-delivery .g-milestone-list li").length, 5);
    assert.equal(d.querySelectorAll("#launch-delivery .campaign-flight-row").length, 6);
    assert.ok(d.querySelector(".campaign-milestone-details"));
    assert.equal(d.querySelectorAll('#english-brief dl[lang="en-US"] dt').length, 4);
    assert.ok(d.querySelector('#english-brief a[href="#/case/operations/asset-review"]'));
    assert.equal(d.querySelectorAll("#launch-decisions tbody tr").length, 3);
    assert.equal(d.querySelectorAll("#launch-channel-plan tbody tr").length, 4);
  });
  await route("/case/gtm/gtm-value-to-launch");
  check("GTM case links consumer task, product proof, channel readiness and D7/D30", () => {
    assert.equal(d.querySelectorAll("#gtm-value-to-launch .gtm-market-steps article").length, 4);
    assert.ok(d.querySelector('#gtm-value-to-launch a[href="#/case/gtm/launch-d7-d30"]'));
  });
  await route("/case/gtm/campaign-architecture");
  check("M3 Campaign architecture preserves business targets, channel roles and content pillars", () => {
    assert.ok(d.getElementById("campaign-architecture"));
    assert.equal(d.querySelectorAll("#campaign-architecture .campaign-lens-grid article").length, 4);
    assert.equal(d.querySelectorAll("#campaign-architecture .campaign-journey>div").length, 4);
    assert.equal(d.querySelectorAll("#campaign-content-matrix tbody tr").length, 8);
    assert.equal(d.querySelectorAll("#campaign-architecture .campaign-house-channels article").length, 8);
    assert.equal(d.querySelectorAll("#campaign-architecture .campaign-workstreams article").length, 8);
    assert.ok(d.getElementById("campaign-architecture").textContent.includes("EDM & CRM"));
    assert.ok(d.getElementById("campaign-architecture").textContent.includes("PAID ADS"));
    assert.equal(d.querySelectorAll("#product-portfolio .g-project-product, #product-portfolio .g-product-gallery").length, 0);
    assert.ok(!d.querySelector("#strategy").textContent.includes("查看四条产品线与官方产品图"));
    assert.ok(d.querySelector("#campaign-mechanism-mapping"));
    assert.ok(d.querySelector("#market-adaptation"));
  });
  await route("/case/gtm/campaign-mechanism-mapping");
  check("a direct link from review opens the M3 creative directions", () => {
    assert.equal(d.querySelector("#campaign-mechanism-mapping").open, true);
  });
  await route("/case/social/fathers-day-channel-roles");
  check("Father's Day content plan distinguishes four channel responsibilities", () => {
    assert.equal(d.querySelectorAll("#fathers-day-channel-roles article").length, 6);
  });
  await route("/case/operations/asset-review");
  check("the asset review links back to the relevant brief", () => {
    assert.ok(d.querySelector("#asset-review").textContent.includes("遮挡并裁切了双盘"));
    assert.ok(d.querySelector('#asset-review a[href="#/case/gtm/english-brief"]'));
  });
  await route("/case/creative/video-projects");
  check("the creative case shows distinct Thanksgiving/Christmas TVCs and KOL short-form examples", () => {
    const clips = [...d.querySelectorAll("#video-projects video")];
    assert.equal(clips.length, 2);
    clips.forEach((clip) => {
      assert.ok(clip.hasAttribute("controls"));
      assert.ok(clip.hasAttribute("playsinline"));
      const source = clip.querySelector('source[type="video/mp4"]');
      assert.ok(fs.statSync(path.join(root, "site", source.getAttribute("src").split("#")[0])).size > 0);
      assert.ok(d.getElementById(clip.getAttribute("aria-describedby")));
    });
    assert.ok(d.querySelector('#video-strategy a[href="#/case/creative/video-projects"]'));
    assert.ok(d.querySelector('#video-opening-comparison source[src="assets/video/creator-livingroom-7s.mp4"]'));
    const christmas = d.querySelector('#holiday-full-film iframe[src="https://drive.google.com/file/d/15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/preview"]');
    assert.ok(christmas?.getAttribute("title").includes("90"));
    const thanksgiving = d.querySelector('#thanksgiving-tvc iframe[src="https://drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/preview"]');
    assert.ok(thanksgiving?.getAttribute("title").includes("感恩节"));
    assert.ok(d.querySelector('#video-drive-editions iframe'));
    assert.ok(d.querySelector('#long-film-note a[href*="15m5TOYZh90NUqTmSbHget8BJbeBEhLKE"]'));
    assert.equal(d.querySelectorAll('#kol-shorts video').length, 2);
    assert.ok(d.querySelector('#video-campaign-strategy'));
    assert.ok(!d.querySelector("#video-holiday-cutdown"));
    assert.ok(!d.getElementById("video-projects").innerHTML.includes("product-opening.mp4#t="));
    assert.ok(!d.getElementById("video-projects").innerHTML.includes("assets/video/holiday-story.mp4"));
    const creatorClips = [...d.querySelectorAll("#kol-shorts video source")].map(x => x.getAttribute("src"));
    assert.deepEqual(creatorClips.sort(), ["assets/video/creator-livingroom-7s.mp4", "assets/video/creator-staircase-7s.mp4"].sort());
    assert.equal(new Set(creatorClips).size, 2);
    assert.ok(!d.querySelector("#results .metric") || d.querySelector("#results .metric").textContent !== "待补充");
    assert.ok(d.getElementById("kol-shorts").textContent.includes("客厅"));
    assert.ok(!d.getElementById("video-projects").textContent.includes("另一版节庆广告"));
  });
  check("video editorial review compares three different viewing tasks", () => {
    assert.equal(d.querySelectorAll("#video-decision-strip article").length, 3);
    assert.equal(d.querySelectorAll("#video-storyline .video-story-beats li").length, 4);
    assert.equal(d.querySelectorAll("#video-format-roles>div").length, 3);
  });
  await route("/case/brand/seasonal-creative-gallery");
  check("new Drive artwork is presented as Campaign concepts", () => {
    const gallery = d.querySelector("#seasonal-art-gallery");
    assert.ok(gallery);
    assert.equal(gallery.querySelectorAll("img").length, 2);
    assert.ok(gallery.querySelector('img[src="assets/projects/fathers-day-bbq-concept.jpg"]'));
    assert.ok(gallery.querySelector('img[src="assets/projects/black-friday-suite-concept.jpg"]'));
    assert.ok(gallery.textContent.includes("创意提案"));
  });
  await route("/case/b2b/expo-project");
  check("overseas exhibition case combines original photos with visitor and follow-up work", () => {
    assert.equal(d.querySelectorAll("#expo-visitor-route .expo-visitor-map article").length, 4);
    assert.equal(d.querySelectorAll("#expo-event-plan .expo-program-grid article").length, 3);
    assert.equal(d.querySelectorAll("#expo-team-handoff .expo-handoff-rails>div").length, 4);
    assert.equal(d.querySelectorAll(".expo-gallery figure").length, 2);
    assert.equal(d.querySelectorAll("#b2b-scale-comparison .expo-results article").length, 2);
    assert.ok(d.querySelector("#expo-handoff"));
    assert.equal(d.querySelectorAll("#expo-distance-route .expo-space-stop").length, 4);
    assert.ok(d.querySelector("#expo-floorplan .expo-plan-wall"));
    assert.equal(d.querySelectorAll("#expo-floorplan .expo-plan-interior>div").length, 3);
    assert.ok(d.querySelector("#expo-floorplan .expo-plan-reception"));
    assert.equal(d.querySelectorAll("#expo-asset-manifest .expo-asset-card").length, 6);
    assert.equal(d.querySelectorAll("#expo-activation-program .expo-activation-grid article").length, 3);
    assert.equal(d.querySelectorAll("#expo-activation-program .expo-activation-rhythm>div").length, 4);
    const all = d.querySelector("#expo-asset-manifest").textContent;
    for (let i = 1; i <= 6; i++) assert.ok(all.includes("EXH-MAT-0" + i));
    const zone = d.querySelector('[data-expo-select="2"]');
    zone.click();
    assert.equal(zone.getAttribute("aria-pressed"), "true");
    assert.ok(d.querySelector("#expo-selected-detail").textContent.includes("A3"));
  });
  await route("/case/creator/partner-handoff");
  check("the partner handoff is available as a case chapter", () => {
    assert.ok(d.querySelector('#partner-handoff a[href="#/case/gtm/english-brief"]'));
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
  check("social metrics are connected to management decisions without causal claims", () => {
    const section = d.querySelector("#social-data-decisions");
    assert.ok(section);
    assert.equal(section.querySelectorAll(".g-decision-card").length, 4);
    for (const id of ["fb-views", "fb-content-interactions", "fb-link-clicks", "fb-visits", "group-viewers", "group-posters", "group-members"])
      assert.ok(section.querySelector(`.g-decision-metric[data-growth-metric="${id}"]`), id);
    assert.ok(section.textContent.includes("从数据复盘到下一轮内容决策"));
    assert.equal(section.querySelectorAll(".g-decision-card")[0].querySelector("h3").textContent, "页面浏览量");
    assert.equal(section.querySelectorAll(".g-decision-card")[1].querySelector("h3").textContent, "内容互动");
    assert.equal(section.querySelectorAll(".g-decision-card")[2].querySelector("h3").textContent, "链接与页面访问");
    assert.ok(!section.textContent.includes("内容触达"));
    assert.ok(!section.textContent.includes("站点导流"));
    assert.ok(section.textContent.includes("更新内容与社群计划"));
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
    assert.equal(d.querySelector(".g-social-community-note"), null);
    assert.ok(d.querySelector(".g-social-community-growth").textContent.includes("1K+"));
    assert.ok(d.querySelector(".g-social-community-growth").textContent.includes("+227"));
    assert.ok(d.querySelector('.g-social-community-actions a[href="#/case/community"]'));
    assert.ok(d.querySelector('.g-social-community-actions a[href="#/data/community"]'));
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
    assert.equal(d.querySelector(".g-evidence-anchors"), null);
    assert.equal(d.querySelector("[data-platform-module]"), null);
  });
  check("HR-facing social page avoids technical caveat sections", () => {
    assert.equal(d.querySelector(".g-evidence-anchors"), null);
    assert.equal(d.querySelector("[data-platform-module]"), null);
    assert.equal(d.querySelector(".g-history-footnote"), null);
    assert.equal(d.querySelector(".g-social-community-note"), null);
    assert.equal(d.querySelector(".g-source-evidence-collapsed").tagName, "DETAILS");
    assert.ok(!d.querySelector(".g-source-evidence-collapsed").open);
    for (const text of ["TIME ANCHORS", "平台各司其职", "历史增长记录；具体统计窗口未注明", "不是统计期间的新增人数"]) {
      assert.ok(!d.querySelector(".g-growth").textContent.includes(text), text);
    }
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
  check("social results have no audit-style platform selector", () => {
    assert.equal(d.querySelector("[data-platform-module]"), null);
    assert.equal(d.querySelector(".g-evidence-anchors"), null);
    assert.ok(d.querySelector(".data-kpis"));
  });
  const evidence = d.querySelector('.data-kpis [data-evidence="ig-follower-change"]');
  evidence.focus();
  evidence.click();
  check("social KPI still opens source drawer", () =>
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
    for (const term of ["唯一负责人", "活动落在 Group 时", "参与资格", "奖励与履约", "单独确认使用授权", "出席不等于营销同意", "RSVP 不等于购买意向", "抽奖参与不等于高价值客户"])
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
      assert.ok(cards[2].textContent.includes("成员规模快照"));
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
  check("Facebook case shows five business metrics without unanchored comparison percentages", () => {
    assert.equal(d.querySelectorAll(".g-snapshot-card").length, 5);
    assert.equal(d.querySelectorAll(".g-snapshot-change").length, 0);
    assert.ok(!d.querySelector(".g-snapshot-chart").textContent.includes("比较周期未注明"));
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
    assert.equal(d.querySelectorAll(".g-history-card").length, 6);
    assert.equal(d.querySelectorAll(".g-history-group").length, 3);
    assert.ok(d.querySelector(".g-history-growth").textContent.includes("多平台传播与社群增长"));
    assert.ok(d.querySelector(".g-history-growth").textContent.includes("Instagram"));
    assert.ok(!d.querySelector(".g-history-growth").textContent.includes("LinkedIn"));
    assert.deepEqual(
      [...d.querySelectorAll(".g-history-card")].map((x) => x.dataset.growthMetric),
      [
        "engagement-change",
        "fb-reach",
        "fb-link-click-change",
        "ig-follower-change",
        "group",
        "group-growth-1k",
      ],
    );
  });
  check("Facebook Group 1K+ growth is documented separately from +227", () => {
    const growth = d.querySelector('.g-history-card[data-growth-metric="group-growth-1k"]');
    const stage = d.querySelector('.g-history-card[data-growth-metric="group"]');
    assert.equal(growth.querySelector(".reader-source-note"), null);
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
