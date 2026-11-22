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

  $("#review-direction").textContent = `${P.profile.direction} · ${P.profile.focus}`;
  $("#review-intro").textContent = P.profile.summary;

  const stats = ["impressions", "engagements"].map((id) =>
    P.metrics.find((item) => item.id === id),
  );
  $("#review-kpis").innerHTML = stats
    .map(
      ({ display, label }) => `<div class="review-kpi"><strong>${esc(display)}</strong><span>${esc(label)}次数</span></div>`,
    )
    .join("");

  $("#review-selected-work").innerHTML = Object.entries(window.PORTFOLIO_SELECTED_WORK)
    .map(([id, item]) => {
      const image = item.image
        ? `<img src="../assets/projects/${esc(item.image)}.${esc(item.imageExt || "webp")}" alt="${esc(item.alt)}" loading="lazy" decoding="async">`
        : "";
      return `<a class="review-path-card${image ? " review-path-photo" : ""}" href="${caseHref(id)}/${esc(item.chapter)}">
        ${image}<div><span class="review-path-label">${esc(item.label)}</span>
        <h3>${esc(item.title)}</h3><p>${esc(item.decision)}</p>
        <span class="review-path-highlight">${esc(item.highlight)}</span>
        <b>${esc(item.artifact)} <span aria-hidden="true">↗</span></b></div></a>`;
    })
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
    ["选场景", "用餐后硬地作为美国市场优先验证的任务"],
    ["定主张", "用原图讲结构，用连续实拍讲握持与推进"],
    ["拆交付", "社媒让人认出场景，商品页解释适用条件，产品团队审核事实"],
    ["核上线", "确认素材、当地供货与履约，再开放对应入口"],
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
    ["排优先级", "从季度主题定月度重点，再分文案、设计和视频任务"],
    ["定验收项", "在 Brief 写清产品事实、渠道版本、交付日期与审核人"],
    ["审物料", "主视觉如挡住产品结构，记录位置和修改要求后退回"],
    ["复盘交接", "将常见返工原因写回审核清单，再调整下一轮排期"],
  ];
  $("#review-delivery-flow").innerHTML = renderFlow(deliveryFlow);

  const cases = P.cases
    .map((item) => {
      const searchText = [
        item.no, item.title, item.subtitle, item.category, item.role, item.scope,
      ].join(" ");
      return (
        '<article class="review-case-card" data-review-case-card data-search="' +
        esc(searchText) +
        '"><div class="review-case-top"><span>' + esc(item.no) + " / " + esc(item.category || item.subtitle) +
        '</span></div><p class="review-case-type">' + esc(item.subtitle) +
        "</p><h3>" + esc(item.title) + "</h3>" +
        '<p class="review-case-role">' + esc(item.role) +
        '</p><div class="review-case-bottom"><a href="' + caseHref(item.id) +
        '">阅读项目案例 ↗</a></div></article>'
      );
    }).join("");
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

  const businessHighlights = [
    { id: "impressions", label: "2025 · Meta 社媒曝光", href: "../#/case/social/results" },
    { id: "engagements", label: "2025 · Meta 内容互动", href: "../#/case/social/results" },
    { id: "group-members", label: "Facebook Group · 社群成员规模", href: "../#/case/community/results" },
    { id: "organic-share", label: "自然搜索 · 收入份额", href: "../#/case/seo/results" },
  ];
  $("#review-evidence-summary").innerHTML = businessHighlights.map((item) => {
    const data = P.metrics.find((metric) => metric.id === item.id);
    if (!data) return "";
    return '<article class="review-outcome-card"><span>' + esc(item.label) +
      '</span><strong>' + esc(data.display) +
      '</strong><a href="' + item.href + '">查看项目成果 ↗</a></article>';
  }).join("");

  $("#review-domain-grid").innerHTML = Object.entries(P.domains).map(([id, label]) =>
    '<article class="review-domain-card"><h3>' + esc(label) +
    '</h3><p>查看该业务板块的阶段成果与项目表现。</p><a href="' +
    dataHref(id) + '">查看相关项目 ↗</a></article>'
  ).join("");

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
