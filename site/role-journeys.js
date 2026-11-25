/* Job-demand-led portfolio journeys. One personal portfolio, not role-specific copies.
   Related projects keep their original company, date and evidence boundaries. */
(function () {
  "use strict";
  const journeys = [
    {
      id: "launch",
      eyebrow: "PRODUCT MARKETING / GTM",
      title: "从用户场景到新品上市传播",
      context: "四条清洁产品线传播经验；M3 五月 Campaign 为上市策划案例。",
      introduction: "产品参数本身不是购买理由。我参与梳理用户清洁任务、产品利益与演示证据，再将信息交给内容、设计、视频及渠道团队。",
      stages: [
        ["市场与用户判断", "梳理 Review、竞品与使用场景，明确需要回答的购买问题", "#/case/gtm/gtm-positioning-decision"],
        ["产品价值与证明", "把功能、利益、使用条件组织成卖点层级与传播 Brief", "#/case/gtm/gtm-value-to-launch"],
        ["Campaign 与内容交付", "安排五月传播阶段、主题、KV、演示与跨渠道素材", "#/case/gtm/campaign-architecture"],
        ["团队协作与审核", "组织内容排期，协调产品事实、视觉和视频版本审核", "#/case/operations/asset-review"]
      ],
      output: "可查看的工作物：产品卖点结构、Campaign 方案、上市日历、英文 Brief 与视觉审核。",
      scope: "M3 展示的是 2026 年 5 月策划方案；不将其他年度的品牌增长数据写成 M3 销售成果。"
    },
    {
      id: "brand",
      eyebrow: "BRAND / IMC / CAMPAIGN",
      title: "从品牌主张到整合传播内容",
      context: "北美消费品牌的品牌建设、节庆传播与渠道内容协同。",
      introduction: "围绕同一品牌信息，组织视觉、节日 Campaign、视频、媒体内容和创作者合作，让不同触点回答各自的用户问题。",
      stages: [
        ["品牌信息与定位", "品牌屋、产品线任务、品牌视觉及内容口径", "#/case/brand/brand-positioning"],
        ["节庆 Campaign 创意", "黑五、母亲节、父亲节 KV 与场景传播内容", "#/case/brand/promotion-campaign-kv"],
        ["PR 与创作者协同", "北美新闻稿、Creator Brief、素材审核与授权管理", "#/case/brand/pr-project"],
        ["搜索与生命周期承接", "SEO / Content 主题规划与 EDM 阶段内容协同", "#/case/seo/seo-case-overview"]
      ],
      output: "可查看的工作物：品牌屋、节庆 KV、传播物料、媒体内容与内容规划。",
      scope: "各触点的素材与项目阶段分别呈现；渠道协同不代表本人独立负责全部投放、销售或审批。"
    },
    {
      id: "growth",
      eyebrow: "SOCIAL GROWTH / TEAM DELIVERY",
      title: "从社媒内容运营到增长复盘",
      context: "2025 年 Meta 阶段记录及独立的 Facebook Group 运营记录。",
      introduction: "担任社媒负责人及管理组长，制定季度主题、月度内容日历、平台分工，跟进团队交付并用互动和用户问题调整内容。",
      stages: [
        ["平台与内容策略", "明确 Facebook、Instagram 和 Group 的角色及内容支柱", "#/case/social"],
        ["社群与用户反馈", "通过教程、话题、UGC 与答疑组织用户参与", "#/case/community"],
        ["团队管理与交付", "制定排期、分配任务、审核脚本与视觉、推进版本交接", "#/case/operations/operations-content-calendar"],
        ["结果与优化", "查看 Meta 内容表现、社群记录及独立统计窗口的数据", "#/case/social/social-data-decisions"]
      ],
      output: "阶段记录：2025 年 Meta 曝光 96.5 万次、互动 3.7 万次；社群记录单独查看。",
      scope: "Meta、Facebook Page 和 Facebook Group 的账户范围与统计周期各不相同，不相加、不交叉归因。"
    },
    {
      id: "commercial",
      eyebrow: "FIELD MARKETING / COMMERCIAL GROWTH",
      title: "从海外获客到商业经营",
      context: "海外 B2B 市场推广与更早期的 Amazon 经营，属于不同公司和任职阶段。",
      introduction: "除了消费品牌传播，也参与过展会获客、销售跟进和电商经营。以客户需求、询盘、页面转化和商品经营指标判断营销工作的业务价值。",
      stages: [
        ["海外 B2B 市场开发", "客户分层、搜索与邮件触达、CRM / ERP 跟进", "#/case/b2b"],
        ["展会与现场营销", "展位内容、品牌物料、现场交流和后续商机衔接", "#/case/b2b/expo-project"],
        ["Amazon 0–1 经营", "Listing、A+、CPC、促销、库存及售后协同", "#/case/amazon"],
        ["商业效果复盘", "分别查看 B2B 线索与成交、Amazon 销售与转化成果", "#/case/amazon/amazon-priority"]
      ],
      output: "历史项目成果：B2B 月均触达 100+ 潜客；Amazon 阶段销售约 +10%、转化约 +5%。",
      scope: "B2B 与 Amazon 并非同一个项目，数据仅用于说明不同业务场景下的实践。"
    }
  ];
  const byCase = {
    gtm: "launch", brand: "brand", creative: "brand", creator: "brand",
    seo: "brand", crm: "brand", social: "growth", community: "growth",
    operations: "growth", b2b: "commercial", amazon: "commercial"
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);

  function board(id, isCapabilities) {
    return '<section class="section jd-journeys" id="' + id + '" aria-labelledby="jd-journeys-title">' +
      '<div class="jd-journeys-header"><div><p class="eyebrow">PROJECT EXPERIENCE / BUSINESS OUTCOMES</p>' +
      '<h2 id="jd-journeys-title">四条业务主线，串起完整营销能力</h2></div>' +
      '<p>以目标岗位常见的市场判断、产品价值、Campaign、渠道增长及团队交付要求组织案例。每一步均可进入实际项目或工作物。</p></div>' +
      '<div class="jd-journey-grid">' +
      journeys.map((j, ix) =>
        '<article class="jd-journey-card" id="journey-' + j.id + '">' +
          '<div class="jd-journey-head"><span>0' + (ix + 1) + ' / ' + esc(j.eyebrow) + '</span>' +
          '<h3>' + esc(j.title) + '</h3><p class="jd-journey-context">' + esc(j.context) + '</p>' +
          '<p>' + esc(j.introduction) + '</p></div>' +
          '<ol class="jd-journey-stages">' +
            j.stages.map((s, i) =>
              '<li><a href="' + esc(s[2]) + '"><small>0' + (i + 1) + '</small>' +
              '<span><strong>' + esc(s[0]) + '</strong><em>' + esc(s[1]) + '</em></span>' +
              '<span aria-hidden="true">↗</span></a></li>').join("") +
          '</ol><div class="jd-journey-foot"><p>' + esc(j.output) + '</p>' +
          '<small>' + esc(j.scope) + '</small></div></article>'
      ).join("") + '</div>' +
      (isCapabilities ? '<p class="jd-journeys-note">下方仍保留完整专业能力清单，供需要查看具体技能的招聘方展开。</p>' : '') +
      '</section>';
  }

  function supplemental() {
    return '<section class="section jd-other-work" id="jd-supporting-work" aria-labelledby="jd-other-title">' +
      '<div><p class="eyebrow">MORE PROJECTS</p><h2 id="jd-other-title">其他代表性工作</h2>' +
      '<p>四条业务主线以外的具体工作内容，仍可在详细案例中查看。</p></div>' +
      '<nav aria-label="其他项目案例">' +
      '<a href="#/case/creative/video-projects">品牌视频与产品演示 ↗</a>' +
      '<a href="#/case/creator/partner-handoff">Creator 合作与内容治理 ↗</a>' +
      '<a href="#/case/crm/crm-handoff">母亲节 EDM 及用户沟通 ↗</a>' +
      '<a href="#/cases">全部 11 个案例 ↗</a></nav></section>';
  }

  function related(caseId) {
    const key = byCase[caseId], j = journeys.find((x) => x.id === key);
    if (!j) return "";
    const other = j.stages.filter((s) => !s[2].startsWith("#/case/" + caseId + "/") && s[2] !== "#/case/" + caseId);
    return '<section class="jd-case-bridge" aria-labelledby="jd-case-bridge-title">' +
      '<div><p class="eyebrow">RELATED WORK / 项目关联</p><h2 id="jd-case-bridge-title">这项工作与哪些能力相连？</h2>' +
      '<p>属于「' + esc(j.title) + '」主线。其他模块提供不同阶段的工作材料；项目和统计口径仍分别保留。</p></div>' +
      '<nav aria-label="相关阶段案例">' + other.map((s) => '<a href="' + esc(s[2]) + '">' + esc(s[0]) + ' ↗</a>').join("") + '</nav>' +
      '</section>';
  }

  function hydrate() {
    const main = document.querySelector("#main");
    if (!main) return;
    const path = location.hash.replace(/^#\/?/, "").split("/");
    const page = path[0] || "home";
    if (page === "home") {
      const old = main.querySelector("#jd-case-path");
      if (old && !old.querySelector(".jd-journeys")) {
        const existing = old.innerHTML;
        old.innerHTML = board("jd-journeys-home", false) +
          '<details class="jd-legacy-index"><summary>查看完整的四阶段工作说明</summary>' + existing + '</details>';
      }
      const map = main.querySelector("#strategy-map");
      if (map && !map.querySelector(".jd-other-work")) {
        const existing = map.innerHTML;
        map.innerHTML = supplemental() +
          '<details class="jd-legacy-index"><summary>按专业领域查看全部案例入口</summary>' + existing + '</details>';
      }
    } else if (page === "capabilities") {
      const capList = main.querySelector(".cap-list");
      if (capList && !main.querySelector(".jd-journeys")) {
        capList.insertAdjacentHTML("beforebegin", board("jd-capability-journeys", true));
        const details = document.createElement("details");
        details.className = "jd-capabilities-detail";
        const summary = document.createElement("summary");
        summary.textContent = "展开查看 10 项专业能力与案例入口";
        capList.replaceWith(details);
        details.append(summary, capList);
      }
    } else if (page === "case" && path[1]) {
      const section = main.querySelector("#evidence");
      if (section && !main.querySelector(".jd-case-bridge")) section.insertAdjacentHTML("beforebegin", related(path[1]));
    }
  }
  // The existing router is registered first; this listener decorates its completed route.
  window.addEventListener("hashchange", hydrate);
  hydrate();
})();
