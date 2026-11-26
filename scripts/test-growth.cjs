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
        const desiredDomain = r.slice("data/".length);
        const allowedDomains = new Set(w.PORTFOLIO.metrics.filter((m) => m.status !== "PENDING" &&
          !!m.display && ((typeof m.value === "number" && Number.isFinite(m.value)) ||
          (Array.isArray(m.range) && m.range.length === 2 && m.range.every((v) => Number.isFinite(v))))).map((m) => m.domain));
        const domain = allowedDomains.has(desiredDomain) ? desiredDomain : "social";
        const expected = w.PORTFOLIO.metrics.filter((m) => m.domain === domain &&
          m.status !== "PENDING" && !!m.display &&
          ((typeof m.value === "number" && Number.isFinite(m.value)) ||
           (Array.isArray(m.range) && m.range.length === 2 && m.range.every((v) => Number.isFinite(v)))))
          .map((m) => [m.id, m.display]);
        assert.deepEqual(current, JSON.parse(JSON.stringify(expected)));
      }
    });
  }
  await route("/capabilities");
  const capabilityLinks = [...d.querySelectorAll(".cap-links a")].map(a=>a.hash);
  check("capability page has nonduplicated links to specific case chapters", () => {
    assert.equal(d.querySelectorAll(".cap-list article").length, 10);
    assert.ok(capabilityLinks.length >= 14);
    assert.equal(new Set(capabilityLinks).size, capabilityLinks.length);
    assert.ok(capabilityLinks.every(hash=>hash.startsWith("#/case/") && hash.split("/").length===4));
  });
  for (const hash of capabilityLinks) {
    const parts = hash.split("/");
    await route("/case/"+parts[2]+"/"+parts[3]);
    check("capability anchor opens its matching section: "+parts[2]+"/"+parts[3], () => {
      assert.ok(d.querySelector(".case-page-"+parts[2]), "wrong case for "+hash);
      assert.ok(d.getElementById(parts[3]), "missing destination for "+hash);
    });
  }
  await route("/cases");
  check("all 11 case cards use project-specific cover art or editorial color fields", () => {
    const covers = [...d.querySelectorAll("#case-list .case-cover-v3")];
    assert.equal(covers.length, 11);
    assert.equal(new Set(covers.map((x) => x.className.match(/case-cover-v3--(gtm|social|community|brand|operations|b2b|seo|amazon|creative|crm|creator)/)?.[1])).size, 11);
    assert.equal(d.querySelectorAll("#case-list .case-cover-v3-media").length, 3);
    assert.equal(d.querySelectorAll("#case-list .cover-diagram").length, 0);
    const coverSubjects = {
      gtm:"M3",social:"海外社媒增长",community:"社群运营",brand:"品牌策略",
      operations:"社媒团队管理",b2b:"储能展会",seo:"SEO 内容",amazon:"Amazon 运营",
      creative:"视频创意",crm:"邮件旅程",creator:"Creator"
    };
    for (const [id, subject] of Object.entries(coverSubjects)) {
      const card = d.querySelector('#case-list [data-case-id="' + id + '"]');
      assert.ok(card, "missing case " + id);
      assert.ok(card.querySelector(".case-cover-v3-main").textContent.includes(subject), id + " cover subject");
      for (const image of card.querySelectorAll("img")) assert.ok(image.getAttribute("alt"), id + " missing image description");
    }

    assert.equal(d.querySelectorAll('#case-list img[src^="assets/concept-"]').length, 0);
    assert.ok(d.querySelector('#case-list .case-cover-v3--b2b img[src="assets/projects/exhibition-booth-overview-redacted.jpg"]'));
    assert.ok(d.querySelector('#case-list .case-cover-v3--gtm img[src="assets/projects/m3-yellow-main.webp"]'));
    assert.ok(d.querySelector("#case-list .case-cover-v3--social").textContent.includes("海外社媒增长"));
    const copy = d.querySelector("#case-list").textContent;
    for (const phrase of ["先看任务", "再选工具", "项目方法与交付", "复盘的终点", "我的分工与项目推动"]) {
      assert.equal(copy.includes(phrase), false, phrase + " should not appear in the case index");
    }
    assert.equal(d.querySelectorAll('#case-list a[href^="#/case/"]').length >= 22, true);
  });
  await route("/home");
  check("homepage links six selected works, seven practice modules and distinct period metrics", () => {
    const links = [...d.querySelectorAll(".featured-nav a")];
    assert.deepEqual(links.map((item) => item.hash.split("/").at(-1)), featured);
    assert.equal(d.querySelectorAll(".featured-grid .case-card").length, 6);
    assert.equal(d.querySelectorAll("#strategy-map .home-route-card").length, 8);
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

  await route("/home");
  check("career-led visual homepage places GTM, Campaign and management before metrics", () => {
    assert.equal(d.querySelectorAll("#career-showcase .career-spotlight").length, 1);
    assert.equal(d.querySelectorAll("#career-showcase .career-side-card").length, 2);
    assert.equal(d.querySelectorAll("#career-showcase .career-stage-strip span").length, 5);
    assert.ok(d.querySelector('#career-showcase img[src="assets/projects/m3-yellow-main.webp"]'));
    assert.ok(d.querySelector('#career-showcase a[href="#/case/operations/asset-review"]'));
  });
  await route("/case/gtm");
  check("PMM strategy, proof chain and real creative assets lead the GTM case", () => {
    assert.equal(d.querySelectorAll("#gtm-positioning-decision .pmm-decision-process article").length, 4);
    assert.equal(d.querySelectorAll("#campaign-proof-gallery figure").length, 3);
    assert.ok(d.querySelector("#gtm-positioning-decision").textContent.includes("餐后"));
  });
  await route("/case/operations");
  check("team case distinguishes directly managed social work from peer execution", () => {
    assert.equal(d.querySelectorAll("#operations-control .operations-role-board button[role=tab]").length, 4);
    assert.equal(d.querySelectorAll("#operations-control .operations-role-board .is-my-role").length, 1);
    assert.equal(d.querySelectorAll("#operations-control .operations-issue-panel").length, 0);
    assert.ok(d.querySelector("#operations-control").textContent.includes("月度内容日历"));
    const tabs=d.querySelectorAll("#operations-control [data-ops-tab]");
    tabs[2].click();
    assert.equal(tabs[2].getAttribute("aria-selected"),"true");
    assert.equal(d.querySelector("#ops-panel-brief").hidden,false);
    assert.equal(d.querySelector("#ops-panel-quarter").hidden,true);
    tabs[0].click();
  });

  await route("/case/gtm");
  check("IMC media brief and regional GTM provide distinct channel and market decisions", () => {
    assert.equal(d.querySelectorAll("#gtm-media-plan .campaign-media-brief-grid article").length, 2);
    assert.equal(d.querySelectorAll("#locale-decision-matrix .locale-matrix-grid article").length, 4);
    assert.ok(d.querySelector("#gtm-media-plan").textContent.includes("Paid"));
    assert.ok(d.querySelector("#locale-decision-matrix").textContent.includes("UK"));
  });
  await route("/case/social");
  check("documented social results are paired with decision loop without invented time series", () => {
    assert.equal(d.querySelectorAll("#social-outcome-bridge .social-outcome-values strong").length, 2);
    assert.equal(d.querySelectorAll("#social-outcome-bridge .social-decision-loop article").length, 3);
    assert.ok(d.querySelector("#social-outcome-bridge").textContent.includes("96.5万"));
  });
  await route("/case/operations");
  check("verbose operational detail is available on demand after the visual ownership view", () => {
    assert.equal(d.querySelector("#operations-control").tagName, "SECTION");
    assert.equal(d.querySelectorAll(".operations-work-panel").length,4);
    assert.ok(d.querySelector("#ops-panel-month .operations-sample-table"));
    assert.ok(d.querySelector("#ops-panel-brief .operations-brief-sheet"));
    assert.equal(d.querySelectorAll("#ops-panel-review .operations-review-grid article").length,4);
  });
  await route("/home");
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
      assert.deepEqual([...overview.querySelectorAll("h2")].map((h) => h.textContent), [w.PORTFOLIO.cases.find(x => x.id === id).title, "为什么这样做", "怎样组织交付"]);
      assert.ok(d.querySelector(".case-page-" + id), "editorial case theme missing");
        if (["social","community","operations","seo","amazon","crm","creator"].includes(id)) {
          assert.equal(overview.querySelectorAll(".case-diagram-step").length, 3, id + " should have a distinctive illustrated content system");
        }

      if(id === "brand") assert.equal(overview.querySelectorAll(".case-story-pair img").length, 2);
      if(id === "b2b") assert.ok(overview.querySelector('img[src="assets/projects/exhibition-booth-overview-redacted.jpg"]'));
      const path = overview.querySelector("a").hash;
      assert.equal(path.split("/")[2], id);
      assert.ok(d.getElementById(path.split("/")[3]));
      assert.equal(d.querySelectorAll(".case-tabs a").length, 7);
      const related = [...d.querySelectorAll("#evidence .case-related-links a")];
      assert.ok(related.length >= 1);
      for (const a of related) {
        const parts=a.hash.split("/");
        assert.ok(w.PORTFOLIO.cases.some(x=>x.id === parts[2]), "unknown related case: "+a.hash);
        assert.notEqual(parts[2], id, "related link must open a different case");
      }
      assert.deepEqual([...d.querySelectorAll(".case-handoff-board h3")].map((h) => h.textContent), ["组织与协作", "复盘与下一步"]);
      const insight = d.querySelector("#insight");
      assert.notEqual(insight.querySelector("h2").textContent, "从问题到判断");
      assert.equal(insight.querySelectorAll("p").length, 1);
      assert.equal(insight.querySelectorAll(".reader-source-note").length, 0);
    });
  }
  await route("/case/gtm/launch-knowledge-loop");
  check("M3 uses a source-aware Knowledge Loop instead of fixed review dates or fabricated KV", () => {
    const review=d.getElementById("launch-knowledge-loop");
    assert.ok(review);
    assert.equal(review.querySelectorAll(".m3-knowledge-cycle li").length,5);
    assert.equal(review.querySelectorAll(".m3-review-evidence-table tbody tr").length,4);
    assert.equal(review.querySelectorAll(".m3-learning-focus article").length,3);
    assert.equal(d.querySelectorAll(".m3-kv-showcase,.m3-kv-source-layout,.m3-kv-format-roles").length,0);
    assert.ok(!review.textContent.includes("D+7")&&!review.textContent.includes("D+30"));
    assert.ok(review.textContent.includes("CANDIDATE") && review.textContent.includes("VALIDATED"));
  });
  await route("/case/gtm/gtm-visual-schedule");
  check("May plan starts at marketing work, not personal product initiation", () => {
    const schedule = d.querySelector("#gtm-visual-schedule");
    assert.ok(schedule);
    assert.ok(schedule.textContent.includes("05 / 01–03"));
    assert.ok(schedule.textContent.includes("内容方向"));
    assert.equal(schedule.textContent.includes("4/28"), false);
    assert.equal(schedule.textContent.includes("立项"), false);
  });
  await route("/case/gtm/campaign-paid-email-assets");
  check("Paid Ads and EDM creative variants are present", () => {
    assert.equal(d.querySelectorAll("#campaign-paid-email-assets .campaign-assets-pair article").length, 2);
    assert.equal(d.querySelectorAll("#campaign-paid-email-assets .campaign-adaptation-grid article").length, 4);
    assert.equal(d.querySelectorAll("#campaign-activation .campaign-workstreams article").length, 8);
  });
  await route("/case/gtm/launch-delivery");
  check("the launch work sample connects milestones, an English brief and the asset review", () => {
    assert.equal(d.querySelectorAll("#launch-delivery .g-milestone-list li").length, 5);
    assert.equal(d.querySelectorAll("#gtm-visual-schedule .v-gantt-lane").length, 6);
    assert.equal(d.querySelectorAll("#gtm-visual-schedule .v-gantt-axis span").length, 5);
    assert.equal(d.querySelectorAll("#gtm-visual-schedule .v-gantt-gates button").length, 5);
    assert.equal(d.querySelectorAll("#v-gate-detail .v-gate-detail-fields>div").length, 3);
    const gateG2 = d.querySelector('#gtm-visual-schedule [data-gtm-gate="2"]');
    gateG2.click();
    assert.equal(gateG2.getAttribute("aria-pressed"), "true");
    assert.ok(d.querySelector('#v-gate-detail [data-gate-slot="approval"]').textContent.includes("产品结构"));
    assert.ok(d.querySelector('#v-gate-detail [data-gate-slot="title"]').textContent.includes("5/15"));
    assert.equal(d.querySelectorAll("#campaign-mechanism-mapping .v-creative-product-source").length, 1);
    assert.ok(d.querySelector("#gtm-visual-schedule .v-gantt-scroll[tabindex='0']"));
    assert.equal(d.querySelectorAll(".v-gtm-quicknav a").length, 5);
    assert.equal(d.querySelectorAll("#gtm-visual-schedule [data-gtm-focus]").length, 4);
    assert.equal(d.querySelector("#launch-four-stages").tagName, "DETAILS");
    assert.equal(d.querySelector("#launch-channel-plan").tagName, "DETAILS");
    assert.equal(d.querySelector("#launch-decisions .v-supporting-evidence").open, false);
    const options = [...d.querySelectorAll("#gtm-visual-schedule [data-gtm-focus]")];
    const option = (name) => options.find(x => x.dataset.gtmFocus === name);
    const visible = () => [...d.querySelectorAll("#gtm-visual-schedule .v-gantt-lane")].filter(x => !x.hidden);
    for (const [name, count] of [["lead", 1], ["partner", 3], ["support", 2], ["all", 6]]) {
      option(name).click();
      assert.equal(visible().length, count, name + " must show the intended workstreams");
      assert.equal(option(name).getAttribute("aria-pressed"), "true");
    }
    assert.ok(d.querySelector("#gtm-visual-schedule .v-gantt-view-caption").textContent.includes("6 条工作流"));
    assert.equal(d.querySelectorAll("#gtm-channel-orchestration article").length, 4);
    assert.ok(d.querySelector(".campaign-milestone-details"));
    assert.equal(d.querySelectorAll('#english-brief dl[lang="en-US"] dt').length, 4);
    assert.ok(d.querySelector('#english-brief a[href="#/case/operations/asset-review"]'));
    assert.equal(d.querySelectorAll("#launch-decisions tbody tr").length, 3);
    assert.equal(d.querySelectorAll("#launch-channel-plan tbody tr").length, 4);
  });
  await route("/case/gtm/gtm-value-to-launch");
  check("GTM case links consumer task, product proof, channel readiness and D7/D30", () => {
    assert.equal(d.querySelectorAll("#gtm-value-to-launch .gtm-market-steps article").length, 4);
    assert.ok(d.querySelector('#gtm-value-to-launch a[href="#/case/gtm/launch-knowledge-loop"]'));
  });
  await route("/case/gtm/campaign-architecture");
  check("M3 Campaign architecture preserves business targets, channel roles and content pillars", () => {
    assert.ok(d.getElementById("campaign-architecture"));
    assert.equal(d.querySelectorAll("#campaign-decision-logic .v-campaign-logic-steps article").length, 4);
    assert.equal(d.querySelectorAll("#campaign-channel-path>div").length, 4);
    assert.equal(d.querySelectorAll("#campaign-content-matrix .v-matrix-row").length, 8);
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
    assert.equal(d.querySelector("#campaign-mechanism-mapping").tagName, "SECTION");
    assert.equal(d.querySelectorAll("#campaign-mechanism-mapping .v-creative-card").length, 3);
    assert.equal(d.querySelectorAll("#market-adaptation .v-locale-panel").length, 2);
    assert.ok(d.querySelector("#market-adaptation").textContent.includes("美英市场内容与发布检查"));
  });
  await route("/case/social/fathers-day-channel-roles");
  check("Father's Day content plan distinguishes four channel responsibilities", () => {
    assert.equal(d.querySelectorAll("#fathers-day-channel-roles article").length, 6);
  });
  await route("/case/operations/asset-review");
  check("the asset review links back to the relevant brief", () => {
    assert.ok(d.querySelector("#asset-review").textContent.includes("内容审核与发布管理"));
    assert.equal(d.querySelectorAll("#operations-kv-review").length, 0);
    assert.equal(d.querySelectorAll("#operations-content-calendar .operations-calendar-rows article").length, 4);
    assert.ok(!d.getElementById("team-delivery").textContent.includes("社媒项目的协作分工"));
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
    assert.ok(christmas?.getAttribute("title").includes("圣诞节"));
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
    assert.ok(!d.getElementById("video-projects").textContent.includes("两支 TVC"));
    assert.ok(!d.getElementById("video-projects").textContent.includes("完整七秒镜头"));
  });
  check("video editorial review compares three different viewing tasks", () => {
    assert.equal(d.querySelectorAll("#video-decision-strip article").length, 3);
    assert.equal(d.querySelectorAll("#video-storyline .video-story-beats li").length, 4);
    assert.equal(d.querySelectorAll("#video-format-roles>div").length, 3);
  });
  await route("/cases");
  check("case index excludes synthetic imagery with unverified product structure or claims", () => {
    assert.equal(d.querySelectorAll('#case-list img[src*="fathers-day-bbq-concept"]').length, 0);
    assert.equal(d.querySelectorAll('#case-list img[src*="black-friday-suite-concept"]').length, 0);
    assert.ok(d.querySelector('#case-list [data-case-id="brand"] img[src="assets/projects/brand-house.webp"]'));
  });
  await route("/case/brand/seasonal-creative-gallery");
  check("brand visual gallery uses sourced brand and partner assets", () => {
    const gallery = d.querySelector("#seasonal-art-gallery");
    assert.ok(gallery);
    assert.equal(gallery.querySelectorAll("img").length, 2);
    assert.ok(gallery.querySelector('img[src="assets/projects/brand-house.webp"]'));
    assert.ok(gallery.querySelector('img[src="assets/projects/joint-giveaway.webp"]'));
    assert.ok(gallery.textContent.includes("品牌屋"));
  });
  await route("/case/brand/promotion-campaign-kv");
  check("seasonal campaign shows two original KVs and Mother's Day content plan", () => {
    const gallery=d.querySelector("#promotion-kv-gallery");
    assert.ok(gallery);
    const images=[...gallery.querySelectorAll("#promotion-original-work .promotion-original-card>a img")];
    assert.deepEqual(images.map(im=>im.getAttribute("src")), [
      "assets/projects/black-friday-suite-concept.jpg",
      "assets/projects/fathers-day-bbq-concept.jpg"
    ]);
    assert.ok(gallery.querySelector("#promotion-original-mother"));
    assert.ok(!gallery.querySelector(".promotion-kv-grid"));
    assert.ok(d.querySelector("#promotion-campaign-matrix"));
  });
  await route("/case/seo/seo-case-overview");
  check("SEO Content PR case retains responsibilities and PR evidence without English search topic list", () => {
    assert.ok(d.querySelector("#seo-case-overview"));
    assert.ok(d.querySelector("#seo-topic-cluster-map"));
    assert.ok(d.querySelector("#seo-pr-extension"));
    assert.ok(d.querySelector("#seo-article-briefs"));
    assert.ok(d.querySelector("#seo-keyword-intent-map"));
    assert.equal(d.querySelectorAll("#seo-keyword-intent-map .seo-topic-card").length, 4);
    assert.equal(d.querySelectorAll("#seo-keyword-intent-map #seo-intent-table").length, 0);
    assert.match(d.querySelector("#seo-article-briefs").textContent, /内容 Brief|内部链接|CTA/);
    assert.ok(!/不含英文选题|这里展示内容架构|规划数量不等同/.test(d.querySelector("#seo-keyword-intent-map").textContent));
    assert.equal(d.querySelectorAll("#seo-keyword-intent-map .seo-calendar-list article").length, 5);
    assert.ok(!/The Post-Halloween Survival Guide|Sticky Candy Meltdown|ART-01|post-Halloween cleaning guide|英文搜索选题/.test(d.querySelector("main").textContent));
    assert.ok(!d.querySelector("#seo-keyword-intent-map [lang='en']"));
    assert.equal(d.querySelectorAll("#seo-topic-cluster-map .seo-topic-card").length, 4);
    assert.equal(d.querySelectorAll("#seo-pr-extension .seo-pr-angle-grid article").length, 3);
    assert.ok(d.querySelector("#seo-page-architecture"));
    assert.ok(d.querySelector("#seo-content-calendar"));
    assert.ok(d.querySelector("#seo-cross-channel"));
    assert.ok(d.querySelector("#seo-measurement"));
    assert.ok(!/CAP-EARNED|CAP-SEO|M13|M16|Enola-marketing/.test(d.querySelector("main").textContent));
  });
  await route("/cases");
  check("case index keeps authentic seasonal assets and routes Mother's Day to EDM", () => {
    const links=[...d.querySelectorAll(".campaign-index-preview a")];
    assert.equal(links.length,3);
    assert.deepEqual(links.map(x=>x.hash), [
      "#/case/brand/promotion-original-black",
      "#/case/crm/crm-campaign-email-plan",
      "#/case/brand/promotion-original-father"
    ]);
  });
  await route("/case/b2b/expo-project");
  check("exhibition case shows real booth planning, materials and customer follow-up without fictional dimensions", () => {
    const block = d.querySelector("#expo-project");
    assert.ok(block);
    assert.equal(d.querySelectorAll("#expo-visitor-route .expo-visitor-map article").length, 4);
    assert.equal(d.querySelectorAll("#expo-event-plan .expo-flight-card").length, 3);
    assert.equal(d.querySelectorAll("#expo-brand-activation .expo-workstream article").length, 4);
    assert.equal(d.querySelectorAll("#expo-visual-language .expo-identity-grid>article").length, 3);
    assert.ok(d.querySelector("#expo-real-work").textContent.includes("海外储能行业展会"));
    assert.equal(d.querySelectorAll(".expo-gallery figure").length, 2);
    assert.equal(d.querySelectorAll("#expo-asset-manifest .expo-asset-card").length, 6);
    assert.equal(d.querySelectorAll("#expo-activation-program .expo-activation-grid article").length, 3);
    assert.equal(d.querySelectorAll("#expo-activation-program .expo-activation-rhythm>div").length, 4);
    assert.ok(d.querySelector("#expo-handoff"));
    assert.equal(d.querySelectorAll("#b2b-scale-comparison .expo-results article").length, 2);
    for (const phrase of ["概念展位", "HYPOTHETICAL BOOTH", "10 × 20 FT", "6–10m", "远距识别", "虚构尺寸"]) assert.ok(!block.textContent.includes(phrase), phrase);
    for (const brand of ["M3","Q3","Qimedo","POWER EVERY MOVE","双盘","清洁电器"]) assert.ok(!block.textContent.includes(brand), "Exhibition brand leak: "+brand);
  });
  for (const item of w.PORTFOLIO.cases) {
    await route("/case/" + item.id);
    check("editorial copy avoids explanatory disclaimers in " + item.id, () => {
      const copy = d.querySelector(".case-page")?.textContent || "";
      assert.ok(copy.length > 300, item.id + " must retain case content");
      for (const phrase of ["以下以假设的","不代表已实际举办","不是前面实际","当前资料未显示","本页旨在","该章节呈现","仅作工作样例","不以未核实","不以目前上传","不以当前上传","不代表历年","不代表由我负责","不把横向协调","不把系统迁移计划","不将寄样","不把社媒曝光","不把不同账号","不把内容日历","不以打开率独立推断","完整母亲节海报仍保留","优惠数字留给实际审批","当前影像仅为部分工作物"]) {
        assert.equal(copy.includes(phrase), false, item.id + ": " + phrase);
      }
    });
  }
  for (const page of ["/", "/cases", "/capabilities", "/experience"]) {
    await route(page);
    check("recruiter-facing copy is clear on " + page, () => {
      const copy = d.querySelector("#main")?.textContent || "";
      for (const phrase of ["以下以假设的","不代表已实际举办","不是前面实际","当前资料未显示","本页旨在","该章节呈现","仅作工作样例","不以未核实","不以目前上传","不以当前上传","不代表历年","不代表由我负责","不把横向协调","不把系统迁移计划","不将寄样","不把社媒曝光","不把不同账号","不把内容日历","不以打开率独立推断","完整母亲节海报仍保留","优惠数字留给实际审批","当前影像仅为部分工作物"]) assert.equal(copy.includes(phrase), false, page + ": " + phrase);
    });
  }
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
  check("social management case shows ownership and creative content work", () => {
    assert.equal(d.querySelectorAll(".g-social-ownership>article").length, 3);
    assert.ok(d.querySelector(".g-social-ownership").textContent.includes("创意主题与内容表现"));
    assert.ok(!d.querySelector(".g-social-ownership").textContent.includes("从输入到发布的责任分工"));
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
    assert.equal(d.querySelector(".g-editorial"),null);
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
    for (const term of ["The After-Dinner Reset", "See the Motion", "Make Room for What Matters", "One Home, Different Cleaning Jobs"])
      assert.ok(section.textContent.includes(term), term);
    assert.ok(section.textContent.includes("M3 Campaign｜三条创意主线"));
    assert.equal(section.querySelectorAll(".v-creative-art").length, 3);
    assert.ok(d.querySelector('#market-adaptation [lang="en-US"]').textContent.includes("entryway"));
    assert.ok(d.querySelector('#market-adaptation [lang="en-GB"]').textContent.includes("hallway"));
  });
  check("case visual opens real asset chapter instead of concept lightbox", () => {
    assert.equal(d.querySelectorAll("[data-image]").length, 0);
    assert.ok(d.querySelector('a[href="#/case/gtm/gtm-positioning-decision"]'));
  });
  await route("/case/gtm/gtm-positioning-decision");
  check("M3 product positioning replaces the unsupported KV chapter", () => assert.ok(d.getElementById("gtm-positioning-decision") && !d.getElementById("m3-campaign-kv")));
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
    for (const term of ["唯一负责人", "活动落在 Group 时", "参与资格", "奖励与履约", "单独确认使用授权", "分开管理报名", "营销许可独立确认"])
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
