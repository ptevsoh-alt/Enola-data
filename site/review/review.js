(() => {
  "use strict";
  const P = window.PORTFOLIO;
  if (!P) return;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
    );
  const caseHref = (id) => "../#/case/" + encodeURIComponent(id);
  const dataHref = (id) => "../#/data/" + encodeURIComponent(id);

  const stats = [
    ["项目案例", P.cases.length, "完整案例入口"],
    ["指标记录", P.metrics.length, "逐项保留定义与限制"],
    ["数据领域", Object.keys(P.domains).length, "按业务域分开展示"],
    ["证据状态", Object.keys(P.statuses).length, "区分事实与重构"],
  ];
  $("#review-kpis").innerHTML = stats
    .map(
      ([label, value, note]) =>
        '<div class="review-kpi"><strong>' +
        esc(value) +
        '</strong><span>' +
        esc(label) +
        " · " +
        esc(note) +
        "</span></div>",
    )
    .join("");

  const renderFlow = (items) =>
    items
      .map(
        ([title, note], index) =>
          '<li><span>' +
          String(index + 1).padStart(2, "0") +
          '</span><b>' +
          esc(title) +
          "</b><small>" +
          esc(note) +
          "</small></li>",
      )
      .join("");

  const campaignFlow = [
    ["Business Context", "商业背景、上市窗口与准备条件"],
    ["Audience / Insight", "目标用户、任务场景与需求张力"],
    ["Objective", "主业务目标与营销 / 行为目标分层"],
    ["Positioning / Message", "定位、价值主张与 Message House"],
    ["Big Idea", "创意平台、主题与核心叙事"],
    ["IMC Architecture", "渠道角色、协同路径与传播节奏"],
    ["Content Matrix", "7 个核心内容支柱 + 1 个品牌组合辅助层"],
    ["Activation / Operations", "内容、资源、Owner、Gate 与风险"],
    ["Measurement / Learning", "主结果、前置信号、Guardrails 与复盘"],
  ];
  $("#review-campaign-flow").innerHTML = renderFlow(campaignFlow);

  const territories = [
    ["The After-Dinner Reset", "问题显化", "以餐后地面任务切入；用真实、同条件的连续过程证明。"],
    ["See the Motion", "机制揭示", "展示真实双头运行、接地与移动路径；静态 KV 不替代运行证明。"],
    ["Make Room for What Matters", "关系价值转移", "把产品动作放进家庭生活情境；不推导未经验证的省时承诺。"],
    ["A Closer Look at M3", "细节证明", "用官方源图、说明书或产品确认支撑结构与功能说明。"],
    ["Real Home, Real Reset", "真实体验证明", "Creator 实际体验；披露、肖像、版权和 Paid Usage Rights 分别确认。"],
  ];
  $("#review-territories").innerHTML = territories
    .map(
      ([title, mechanism, proof], index) =>
        '<article class="review-territory-card"><span>0' +
        (index + 1) +
        " / " +
        esc(mechanism) +
        "</span><h4>" +
        esc(title) +
        "</h4><p>" +
        esc(proof) +
        "</p></article>",
    )
    .join("");

  const communityFlow = [
    ["Program Owner", "按主要业务目标确定唯一最终负责人"],
    ["Event Contract", "目标、资格、窗口、奖励履约、审核与回滚条件"],
    ["Participation & Rights", "自愿参与、内容审核、单独确认使用授权"],
    ["Measurement / Handoff", "参与、查看、UGC、点击与购买分别记录并交接"],
  ];
  $("#review-community-flow").innerHTML = renderFlow(communityFlow);

  const deliveryFlow = [
    ["RACI / Single A", "每项交付物只有一个最终负责角色"],
    ["Stage-Gate", "输入、审核、签核与放行条件"],
    ["Resource / Risk", "人力、素材、依赖、容量与异常升级"],
    ["Closeout / Handoff", "结果复盘、资料交接与下一轮改进"],
  ];
  $("#review-delivery-flow").innerHTML = renderFlow(deliveryFlow);

  const cases = P.cases
    .map((item) => {
      const count = Array.isArray(item.metrics) ? item.metrics.length : 0;
      const status = P.statuses[item.status] || item.status;
      const searchText = [
        item.no,
        item.title,
        item.subtitle,
        item.category,
        item.role,
        item.scope,
      ].join(" ");
      return (
        '<article class="review-case-card" data-review-case-card data-search="' +
        esc(searchText) +
        '">' +
        '<div class="review-case-top"><span>' +
        esc(item.no) +
        " / " +
        esc(item.category || item.subtitle) +
        '</span><span class="review-status">' +
        esc(status) +
        "</span></div>" +
        '<p class="review-case-type">' +
        esc(item.subtitle) +
        "</p>" +
        "<h3>" +
        esc(item.title) +
        "</h3>" +
        '<p class="review-case-role">' +
        esc(item.role) +
        '</p><div class="review-case-bottom"><span>' +
        esc(count) +
        " 项关联指标</span><a href=\"" +
        caseHref(item.id) +
        '\">查看案例 ↗</a></div></article>'
      );
    })
    .join("");
  $("#review-case-grid").innerHTML = cases;

  const visuals = [
    ["../assets/concept-01.png", "GTM / Product Launch", "产品上市策略与视觉方向", "gtm", "contain", "launch"],
    ["../assets/projects/m3-yellow-main.webp", "M3 Product Identity", "产品外观与型号识别素材", "gtm", "contain", "launch"],
    ["../assets/projects/mop-kv-detail.webp", "M3 Campaign KV", "Campaign 主视觉细节", "gtm", "cover", "launch"],
    ["../assets/projects/m3-yellow-battery.webp", "M3 Battery Detail", "产品细节素材", "gtm", "contain", "launch"],
    ["../assets/concept-02.png", "Brand / IMC", "品牌整合传播视觉方向", "brand", "contain", "brand"],
    ["../assets/projects/brand-house.webp", "Brand House", "品牌屋与信息架构工作物", "brand", "cover", "brand"],
    ["../assets/projects/joint-giveaway.webp", "Joint Campaign", "联合活动视觉素材", "brand", "cover", "brand"],
    ["../assets/projects/holiday-scene-1.webp", "Seasonal Campaign", "节庆传播场景素材", "brand", "cover", "brand"],
    ["../assets/projects/pr-home-scene.webp", "PR / Home Scene", "家庭场景传播素材", "brand", "cover", "brand"],
    ["../assets/projects/holiday-scene-2.webp", "Seasonal Visual", "节庆传播视觉素材", "brand", "cover", "brand"],
    ["../assets/projects/exhibition-booth-overview-redacted.jpg", "B2B Exhibition", "展会现场图 · 已匿名化", "b2b", "cover", "b2b"],
    ["../assets/projects/exhibition-booth-angle-redacted.jpg", "Exhibition Angle", "展位角度图 · 已匿名化", "b2b", "cover", "b2b"],
    ["../assets/projects/exhibition-product-display-redacted.jpg", "Product Display", "产品展示图 · 已匿名化", "b2b", "cover", "b2b"],
    ["../assets/concept-03.png", "Creative Direction", "创意策略与视觉方向", "creative", "contain", "creative"],
    ["../assets/projects/vacuum-video-frame.webp", "Video Content", "产品演示视频画面", "creative", "cover", "creative"],
    ["../assets/projects/stairs-video-frame.webp", "Use Case / Video", "场景演示视频画面", "creative", "cover", "creative"],
  ];
  const categoryLabels = {
    launch: "产品上市",
    brand: "品牌 / Campaign",
    b2b: "B2B / 展会",
    creative: "创意 / 视频",
  };
  const categoryOrder = ["launch", "brand", "b2b", "creative"];
  const galleryFilters = [
    ["all", "全部"],
    ...categoryOrder.map((key) => [key, categoryLabels[key]]),
  ];
  $("#review-gallery-filters").innerHTML = galleryFilters
    .map(([key, label]) => {
      const count =
        key === "all"
          ? visuals.length
          : visuals.filter((item) => item[5] === key).length;
      return (
        '<button type="button" class="review-filter" data-review-visual-filter="' +
        esc(key) +
        '" aria-pressed="' +
        (key === "all" ? "true" : "false") +
        '">' +
        esc(label) +
        '<span>' +
        esc(count) +
        "</span></button>"
      );
    })
    .join("");
  $("#review-gallery").innerHTML = visuals
    .map(
      ([src, title, note, caseId, fit, category]) =>
        '<article class="review-visual-card" data-review-visual-card data-category="' +
        esc(category) +
        '"><a class="review-visual-image" href="' +
        esc(src) +
        '" target="_blank" rel="noopener" aria-label="单独查看 ' +
        esc(title) +
        '"><img src="' +
        esc(src) +
        '" alt="' +
        esc(title + "，" + note) +
        '" loading="lazy" decoding="async" data-fit="' +
        esc(fit) +
        '"></a><div class="review-visual-copy"><span class="review-visual-category">' +
        esc(categoryLabels[category]) +
        '</span><h3>' +
        esc(title) +
        "</h3><p>" +
        esc(note) +
        '</p><a href="' +
        caseHref(caseId) +
        '">查看关联案例 ↗</a></div></article>',
    )
    .join("");

  const visualCards = [...document.querySelectorAll("[data-review-visual-card]")];
  $("#review-gallery-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-visual-filter]");
    if (!button) return;
    const selected = button.dataset.reviewVisualFilter;
    document
      .querySelectorAll("[data-review-visual-filter]")
      .forEach((item) =>
        item.setAttribute(
          "aria-pressed",
          String(item.dataset.reviewVisualFilter === selected),
        ),
      );
    visualCards.forEach((card) => {
      card.hidden =
        selected !== "all" && card.dataset.category !== selected;
    });
  });

  const statusRows = Object.entries(P.statuses)
    .map(([key, label]) => {
      const count = P.metrics.filter((item) => item.status === key).length;
      const width = P.metrics.length
        ? Math.round((count / P.metrics.length) * 100)
        : 0;
      return (
        '<article class="review-evidence-status"><strong>' +
        esc(count) +
        '</strong><span>' +
        esc(label) +
        '</span><small>' +
        esc(key) +
        " · " +
        esc(width) +
        '%</small><div class="review-evidence-track" role="img" aria-label="' +
        esc(label + "占指标记录 " + width + "%") +
        '" style="--review-share:' +
        width +
        '%"><span></span></div></article>'
      );
    })
    .join("");
  $("#review-evidence-summary").innerHTML = statusRows;

  const maxDomainCount = Math.max(
    1,
    ...Object.keys(P.domains).map(
      (id) => P.metrics.filter((item) => item.domain === id).length,
    ),
  );
  $("#review-domain-grid").innerHTML = Object.entries(P.domains)
    .map(([id, label]) => {
      const rows = P.metrics.filter((item) => item.domain === id);
      const share = P.metrics.length
        ? Math.round((rows.length / P.metrics.length) * 100)
        : 0;
      const relative = Math.round((rows.length / maxDomainCount) * 100);
      return (
        '<article class="review-domain-card"><h3>' +
        esc(label) +
        '</h3><div class="review-domain-meta"><strong>' +
        esc(rows.length) +
        " 项指标</strong><span>" +
        esc(share) +
        '%</span></div><div class="review-domain-track" role="img" aria-label="' +
        esc(label + "占全部指标 " + share + "%") +
        '" style="--review-share:' +
        relative +
        '%"><span></span></div><a href="' +
        dataHref(id) +
        '">查看该领域数据与口径 ↗</a></article>'
      );
    })
    .join("");

  const search = $("#review-search");
  const empty = $("#review-case-empty");
  search.addEventListener("input", () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    document.querySelectorAll("[data-review-case-card]").forEach((card) => {
      const match = card.dataset.search.toLocaleLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });
    empty.hidden = visible !== 0;
  });

  window.__PORTFOLIO_REVIEW_READY__ = {
    cases: P.cases.length,
    metrics: P.metrics.length,
    visuals: visuals.length,
    domains: Object.keys(P.domains).length,
    campaignSteps: campaignFlow.length,
    territories: territories.length,
    communitySteps: communityFlow.length,
    deliverySteps: deliveryFlow.length,
  };
})();
