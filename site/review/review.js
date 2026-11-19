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
        '">查看案例 ↗</a></div></article>'
      );
    })
    .join("");
  $("#review-case-grid").innerHTML = cases;

  const visuals = [
    ["../assets/concept-01.png", "GTM / Product Launch", "产品上市策略与视觉方向", "gtm", "contain"],
    ["../assets/projects/m3-yellow-main.webp", "M3 Product Identity", "产品外观与型号识别素材", "gtm", "contain"],
    ["../assets/projects/mop-kv-detail.webp", "M3 Campaign KV", "Campaign 主视觉细节", "gtm", "cover"],
    ["../assets/concept-02.png", "Brand / IMC", "品牌整合传播视觉方向", "brand", "contain"],
    ["../assets/projects/brand-house.webp", "Brand House", "品牌屋与信息架构工作物", "brand", "cover"],
    ["../assets/projects/joint-giveaway.webp", "Joint Campaign", "联合活动视觉素材", "brand", "cover"],
    ["../assets/projects/holiday-scene-1.webp", "Seasonal Campaign", "节庆传播场景素材", "brand", "cover"],
    ["../assets/projects/exhibition-booth-overview-redacted.jpg", "B2B Exhibition", "展会现场图 · 已匿名化", "b2b", "cover"],
    ["../assets/projects/exhibition-product-display-redacted.jpg", "Product Display", "产品展示图 · 已匿名化", "b2b", "cover"],
    ["../assets/concept-03.png", "Creative Direction", "创意策略与视觉方向", "creative", "contain"],
    ["../assets/projects/vacuum-video-frame.webp", "Video Content", "产品演示视频画面", "creative", "cover"],
    ["../assets/projects/stairs-video-frame.webp", "Use Case / Video", "场景演示视频画面", "creative", "cover"],
    ["../assets/projects/m3-yellow-battery.webp", "M3 Battery Detail", "产品细节素材", "gtm", "contain"],
    ["../assets/projects/pr-home-scene.webp", "PR / Home Scene", "家庭场景传播素材", "brand", "cover"],
    ["../assets/projects/holiday-scene-2.webp", "Seasonal Visual", "节庆传播视觉素材", "brand", "cover"],
  ];
  $("#review-gallery").innerHTML = visuals
    .map(
      ([src, title, note, caseId, fit]) =>
        '<article class="review-visual-card"><a class="review-visual-image" href="' +
        esc(src) +
        '" target="_blank" rel="noopener" aria-label="单独查看 ' +
        esc(title) +
        '"><img src="' +
        esc(src) +
        '" alt="' +
        esc(title + "，" + note) +
        '" loading="lazy" decoding="async" data-fit="' +
        esc(fit) +
        '"></a><div class="review-visual-copy"><span>' +
        esc(note) +
        "</span><h3>" +
        esc(title) +
        '</h3><a href="' +
        caseHref(caseId) +
        '">查看关联案例 ↗</a></div></article>',
    )
    .join("");

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
        "%</small></article>"
      );
    })
    .join("");
  $("#review-evidence-summary").innerHTML = statusRows;

  $("#review-domain-grid").innerHTML = Object.entries(P.domains)
    .map(([id, label]) => {
      const rows = P.metrics.filter((item) => item.domain === id);
      return (
        '<article class="review-domain-card"><h3>' +
        esc(label) +
        '</h3><p>' +
        esc(rows.length) +
        " 项关联指标</p><a href=\"" +
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
  };
})();
