(() => {
  "use strict";
  const P = window.PORTFOLIO,
    main = document.querySelector("#main");
  const $ = (s) => document.querySelector(s),
    esc = (s) =>
      String(s ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const by = (id) => P.cases.find((c) => c.id === id),
    metric = (id) => P.metrics.find((m) => m.id === id);
  let filter = "全部",
    query = "",
    returnFocus;
  const badge = (s) =>
    `<span class="badge ${esc(s)}">${esc(P.statuses[s])}</span>`;
  const link = (id, label = "查看案例") =>
    `<a class="text-link" href="#/case/${id}">${label} <span aria-hidden="true">↗</span></a>`;
  const names = {
    gtm: ["产品事实", "用户任务", "价值主张", "上市交付"],
    brand: ["受众需求", "品牌承诺", "可信证明", "渠道表达"],
    social: ["季度主题", "内容支柱", "平台分工", "复盘决策"],
    operations: ["确认输入", "拆解依赖", "审核验收", "异常闭环"],
    creator: ["受众适配", "合作 Brief", "内容审核", "授权归档"],
    community: ["用户问题", "参与机制", "内容审核", "反馈回流"],
    b2b: ["客户研究", "分层触达", "询盘确认", "商务交接"],
    seo: ["搜索意图", "内容集群", "站点承接", "字段复核"],
    amazon: ["商品表达", "搜索流量", "经营协同", "结果复盘"],
    creative: ["创意主张", "叙事结构", "镜头任务", "事实审核"],
    crm: ["用户状态", "许可核验", "触发与频控", "旅程承接"],
  };
  const tags = {
    gtm: "PMM / GTM",
    brand: "BRAND / IMC / PR",
    social: "SOCIAL STRATEGY",
    operations: "TEAM / DELIVERY",
    creator: "CREATOR GOVERNANCE",
    community: "COMMUNITY",
    b2b: "B2B / FIELD MARKETING",
    seo: "SEARCH / CONTENT",
    amazon: "COMMERCE",
    creative: "CREATIVE DIRECTION",
    crm: "LIFECYCLE",
  };
  function cover(c, large = false) {
    const img = ["gtm", "brand", "creative"].includes(c.id)
      ? `<img src="assets/concept-${c.id === "gtm" ? "01" : c.id === "brand" ? "02" : "03"}.png" alt="${esc(c.subtitle)}概念视觉，非历史已投放成品" ${large ? "" : 'loading="lazy"'} width="1000" height="1200">`
      : "";
    return `<div class="project-cover cover-${c.id} ${img ? "has-image" : ""}">${img}<div class="cover-top"><span>${tags[c.id]}</span><span>${c.no} / SELECTED WORK</span></div><div class="cover-diagram" aria-hidden="true">${names[c.id].map((n, i) => `<span><small>0${i + 1}</small>${n}</span>`).join("")}</div><div class="cover-bottom"><b>${esc(c.subtitle)}</b><span>${img ? "概念视觉" : "策略结构示意"} · ${P.statuses[c.status]}</span></div></div>`;
  }
  function card(c) {
    return `<article class="case-card"><a class="cover-link" href="#/case/${c.id}" aria-label="阅读${esc(c.title)}">${cover(c)}</a><div class="card-meta"><span>${tags[c.id]}</span>${badge(c.status)}</div><h3>${link(c.id, c.title)}</h3><p>${esc(c.role)}</p></article>`;
  }
  function metricCard(m) {
    return `<button class="metric" data-evidence="${esc(m.id)}"><strong>${esc(m.display)}</strong><span>${esc(m.label)}</span><small>${esc(m.window)}</small><span class="metric-source">${P.statuses[m.status]} · 定义与来源 ↗</span></button>`;
  }
  function home() {
    return `<div class="wrap"><section class="portfolio-hero"><div><p class="eyebrow">HUANG WENLIN / SELECTED WORK</p><h1>洞察市场。<br>建立品牌。<br><em>推动交付。</em></h1><p class="hero-intro">黄文琳｜品牌战略 · 产品营销 · GTM · 整合传播</p><p class="muted">近 6 年海外市场与跨境业务经验。连接用户洞察、产品价值、创意表达与跨部门协作。</p><div class="actions"><a class="btn" href="#/cases">探索案例 ↗</a><a href="#/experience">工作经历</a></div></div><a class="hero-feature" href="#/case/gtm" aria-label="查看产品营销与上市案例">${cover(by("gtm"), true)}<span class="feature-caption">FEATURED / 四条核心产品线的上市传播协同 ↗</span></a></section><div class="discipline-strip"><span>品牌战略</span><span>PMM & GTM</span><span>IMC & PR</span><span>团队管理</span><span>跨部门交付</span></div><section class="section"><div class="section-head"><div><p class="eyebrow">01 / SELECTED CASES</p><h2>策略有结构，交付有过程。</h2></div><a href="#/cases">全部案例 ↗</a></div><div class="visual-grid">${["gtm", "brand", "social", "operations", "creator", "b2b"].map((id) => card(by(id))).join("")}</div></section><section class="results-band"><div><p class="eyebrow">02 / MEASUREMENT</p><h2>让结果与证据同行。</h2><p>以下为同一历史汇总记录；平台账户范围与原始字段待核。不同来源与统计窗口分别展示。</p><a href="#/data">查看全部指标与说明 ↗</a></div><div class="home-metrics">${["impressions", "engagements"].map((id) => metricCard(metric(id))).join("")}</div></section><section class="section"><div class="section-head"><div><p class="eyebrow">03 / HOW I WORK</p><h2>从方向到协作，再到交付。</h2></div>${link("operations", "管理工作方式")}</div>${flow(by("operations"))}<p class="caption">经历重构 · 流程用于解释管理方法，不代表历史审批记录。</p></section><section class="contact-band"><div><p class="eyebrow">BRAND × PRODUCT × PEOPLE</p><h2>把复杂的市场问题，<br>变成清晰的团队行动。</h2></div><a class="btn" href="#/contact">了解工作范围 ↗</a></section></div>`;
  }
  function listPage() {
    return `<div class="wrap page"><p class="eyebrow">THE WORK / 案例索引</p><h1>从商业问题，<br>到可交付的解决路径。</h1><p class="lede">品牌、产品、传播与团队交付。每个案例分别说明工作背景、判断、本人贡献与证据状态。</p><section class="filters" aria-label="案例筛选"><div class="filter-row">${["全部", "策略与上市", "传播与合作", "团队与交付", "商业与生命周期"].map((x) => `<button class="chip" data-filter="${x}" aria-pressed="${x === filter}">${x}</button>`).join("")}</div><label>搜索案例 <input type="search" id="case-search" placeholder="如 PMM、PR、品牌" value="${esc(query)}"></label><span id="filter-count" role="status"></span></section><div class="visual-grid" id="case-list"></div></div>`;
  }
  const groups = {
    策略与上市: ["gtm", "brand"],
    传播与合作: ["social", "community", "creator", "creative"],
    团队与交付: ["operations"],
    商业与生命周期: ["b2b", "amazon", "seo", "crm"],
  };
  function updateList() {
    const rows = P.cases.filter(
      (c) =>
        (filter === "全部" || groups[filter]?.includes(c.id)) &&
        `${c.title} ${c.subtitle} ${tags[c.id]} ${c.role}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    $("#case-list").innerHTML = rows.length
      ? rows.map(card).join("")
      : '<div class="empty-state"><h2>暂未找到匹配案例</h2><button class="btn" data-reset>重置筛选</button></div>';
    $("#filter-count").textContent = `${rows.length} 个案例`;
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.filter === filter)),
      );
  }
  function flow(c) {
    return `<ol class="strategy-flow" aria-label="${esc(c.subtitle)}策略流程">${names[c.id].map((n, i) => `<li><span>0${i + 1}</span><h3>${esc(P.caseNarratives[c.id]?.stages[i]?.title || n)}</h3><p>${esc(P.caseNarratives[c.id]?.stages[i]?.detail || P.caseNarratives[c.id]?.stages[i]?.body || ["确认目标、输入与证据状态", "明确选择依据及优先级", "记录负责人、依赖与验收条件", "核对事实、权限并明确下一步"][i])}</p></li>`).join("")}</ol>`;
  }
  function brandHouse() {
    return `<div class="brand-house"><div class="house-roof"><small>BRAND PROMISE / 价值主张结构</small><h3>从产品能力，走向用户的生活价值</h3></div><div class="house-pillars"><div><b>用户任务</b><p>使用场景与购买顾虑</p></div><div><b>产品价值</b><p>特征 → 利益 → 证明</p></div><div><b>可信表达</b><p>确认事实与适用限制</p></div></div><div class="house-base">品牌定位 → 产品事实 → PMM 解释 → 渠道 Brief</div></div><div class="channel-grid">${[
      ["Owned", "社媒 / 官网", "解释场景与承接信息"],
      ["Earned", "PR / 媒体", "事实包、新闻价值与编辑独立"],
      ["Partner", "创作者合作", "受众适配、内容审核与授权"],
      ["Commerce", "商品页 / 电商", "一致的价值主张与行动入口"],
    ]
      .map(
        (x) =>
          `<article><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>`,
      )
      .join("")}</div>`;
  }
  function rights() {
    return `<div class="rights-grid">${[
      [
        "策略与筛选",
        "合作目标、目标市场、受众适配、内容质量、表达可信度；不以粉丝量代替影响力判断。",
      ],
      [
        "合作流程",
        "筛选 → 邀约 → Brief → 交付确认 → 审核 → 授权核验 → 归档；每个节点明确负责人和下一步。",
      ],
      [
        "内容治理",
        "产品事实、演示前提、脚本与画面一致；标明需确认的主张，记录版本与审核结论。",
      ],
      [
        "授权机制",
        "分别确认平台、地域、期限、用途、付费推广、改编、署名与撤回；发布不等于获得商用许可。",
      ],
    ]
      .map(
        (x, i) =>
          `<article><span>0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`,
      )
      .join("")}</div>`;
  }
  function management(c) {
    return `<div class="management-board"><article><small>本人职责</small><h3>组织决策与交付</h3><p>${esc(c.role)}</p></article><article><small>协同关系</small><h3>确认输入与依赖</h3><p>${esc(c.resources)}</p></article><article><small>交付管理方法 · 重构示意</small><h3>设置验收与异常闭环</h3><p>按目标、交付物、负责人、审核人、版本和完成标准拆解工作。关键事实或权限待核时暂停受影响动作；记录修订、回验与下一步。</p></article></div>`;
  }
  function casePage(c) {
    const sections = [
      ["background", "Background", "项目背景"],
      ["insight", "Insight", "洞察与判断"],
      ["strategy", "Strategy", "策略选择"],
      ["execution", "Execution", "执行与工作物"],
      ["management", "Management Contribution", "管理贡献"],
      ["results", "Results", "结果与限制"],
      ["evidence", "Evidence", "证据与来源"],
    ];
    const metrics = c.metrics.map(metric);
    return `<div class="wrap page case-page"><a class="text-link" href="#/cases">← 返回案例索引</a><div class="case-title"><div><p class="eyebrow">CASE ${c.no} / ${tags[c.id]}</p><h1>${esc(c.title)}</h1><p class="lede">${esc(c.role)}</p>${badge(c.status)}</div><p class="case-scope">${esc(c.scope)}</p></div>${cover(c, true)}<nav class="case-tabs" aria-label="案例章节">${sections.map((s) => `<a href="#/case/${c.id}/${s[0]}">${s[1]}</a>`).join("")}</nav><section id="background" class="case-section"><div class="chapter-label">01 / Background</div><div><h2>项目背景</h2><p>${esc(c.problem)}</p><p class="caption">项目范围：${esc(c.scope)}</p></div></section><section id="insight" class="case-section"><div class="chapter-label">02 / Insight</div><div><h2>从问题到判断</h2><p>${esc(c.decision)}</p><p class="caption">判断依据为已有经历与项目资料整理。具体研究样本、访谈与历史审批材料未公开；不推定为已验证的普遍用户结论。</p></div></section><section id="strategy" class="case-section"><div class="chapter-label">03 / Strategy</div><div><h2>策略结构</h2><p>${esc(c.plan)}</p>${flow(c)}${["gtm", "brand"].includes(c.id) ? brandHouse() : ""}<p class="caption">经历重构 · 策略图为本次整理的解释性工作物。</p></div></section><section id="execution" class="case-section"><div class="chapter-label">04 / Execution</div><div><h2>执行与工作物</h2><p>${esc(c.execution)}</p>${c.id === "creator" ? rights() : `<div class="deliverable-grid">${names[c.id].map((n, i) => `<article><span>WORK PACKAGE / 0${i + 1}</span><h3>${n}</h3><p>${["目标 · 输入 · 确认状态", "选择依据 · 输出要求", "负责人 · 版本 · 审核节点", "完成标准 · 复盘问题"][i]}</p></article>`).join("")}</div>`}<p class="caption">${P.statuses[c.status]} · 以上样张用于说明工作方法，不作为历史原始交付证据。</p>${["gtm", "brand", "creative"].includes(c.id) ? `<button class="btn secondary" data-image="${c.id === "gtm" ? "01" : c.id === "brand" ? "02" : "03"}">放大概念视觉 ↗</button>` : ""}</div></section><section id="management" class="case-section"><div class="chapter-label">05 / Management Contribution</div><div><h2>管理贡献与协作</h2>${management(c)}<p class="caption">本人参与范围按原资料保留；项目方法示意不代表独立拥有全部业务决策权。</p></div></section><section id="results" class="case-section"><div class="chapter-label">06 / Results</div><div><h2>结果与限制</h2><p>${esc(c.result)}</p><div class="result-grid">${metrics.map(metricCard).join("")}</div>${c.id === "social" ? comparison() : c.id === "seo" ? shareChart() : ""}<p class="note">${esc(c.review)}</p></div></section><section id="evidence" class="case-section"><div class="chapter-label">07 / Evidence</div><div><h2>证据与来源</h2><p>案例类型：${P.statuses[c.status]}。工作物、职责记录与指标证据分别判断。原始后台截图与内部材料不公开。</p>${metrics.length ? metrics.map((m) => `<details><summary>${esc(m.label)} · ${P.statuses[m.status]}</summary><p>定义：${esc(m.definition)}</p><p>来源：${esc(m.source)}</p><p>统计窗口：${esc(m.window)}</p><p>限制：${esc(m.limits)}</p></details>`).join("") : '<p class="note">本案例展示方法与流程；暂无可公开核验的项目效果，不填造结果。</p>'}</div></section><div class="case-end">${link(P.cases[(P.cases.indexOf(c) + 1) % P.cases.length].id, "下一个案例")}<a href="#/cases">全部案例 ↗</a></div></div>`;
  }
  function comparison() {
    return `<figure class="chart-sheet"><h3>Meta 历史汇总 / 独立口径</h3><div class="bar-row"><span>曝光</span><i style="--bar:100%"></i><b>965K</b></div><div class="bar-row"><span>互动</span><i style="--bar:3.8342%"></i><b>37K</b></div><figcaption>${esc(metric("impressions").window)}。37K ÷ 965K ≈ 3.8% 为暂算比值，字段与账户范围待核，不作为已验证 ER 或销售转化率。</figcaption><button class="text-link" data-evidence="er">查看计算与限制 ↗</button></figure>`;
  }
  function shareChart() {
    const m = metric("organic-share");
    return `<figure class="share-chart"><div class="donut" role="img" aria-label="自然搜索收入份额 82.46%，其余渠道补数 17.54%"><b>82.46%<small>收入份额</small></b></div><figcaption><h3>渠道结构，不是增长率。</h3><p>${esc(m.window)} · ${P.statuses[m.status]}</p><p>其他渠道 17.54% 为 100% 减去原记录份额的补数。归因模型、收入定义与窗口待核，不建立与内容计划的因果关系。</p><button class="text-link" data-evidence="organic-share">查看来源 ↗</button></figcaption></figure>`;
  }
  function dataPage(domain) {
    const selected = P.domains[domain] ? domain : "social",
      rows = P.metrics.filter((m) => m.domain === selected);
    return `<div class="wrap page"><p class="eyebrow">MEASUREMENT / 数据与证据</p><h1>先解释口径，<br>再阅读结果。</h1><p class="lede">历史文档与截图记录不升级为原始数据验证；不同平台、窗口和业务对象分别呈现。</p><nav class="filter-row" aria-label="数据领域">${Object.entries(
      P.domains,
    )
      .map(
        ([id, n]) =>
          `<a class="chip ${id === selected ? "active" : ""}" href="#/data/${id}" ${id === selected ? 'aria-current="page"' : ""}>${n}</a>`,
      )
      .join(
        "",
      )}</nav>${selected === "social" ? comparison() : selected === "search" ? shareChart() : ""}<div class="data-kpis">${rows.map(metricCard).join("")}</div><details><summary>查看所有数值与口径</summary><div class="table-scroll"><table><thead><tr><th>指标</th><th>数值</th><th>统计窗口</th><th>证据状态</th></tr></thead><tbody>${rows.map((m) => `<tr><th scope="row">${esc(m.label)}</th><td>${esc(m.display)}</td><td>${esc(m.window)}</td><td>${P.statuses[m.status]}</td></tr>`).join("")}</tbody></table></div></details></div>`;
  }
  function simple(page) {
    if (page === "experience")
      return `<div class="wrap page"><p class="eyebrow">EXPERIENCE</p><h1>品牌与增长，<br>连接于真实业务。</h1><div class="career-list">${P.experiences.map((e) => `<article><time>${esc(e.date)}</time><div><small>${esc(e.title)} · 匿名化</small><h2>${esc(e.role)}</h2><p>${esc(e.body)}</p>${link(e.caseId, "关联案例")}</div></article>`).join("")}</div></div>`;
    if (page === "capabilities")
      return `<div class="wrap page"><p class="eyebrow">CAPABILITIES</p><h1>以策略组织行动。</h1><div class="cap-list">${P.capabilities.map((c) => `<article><small>${esc(c[1])}</small><h2>${esc(c[0])}</h2><p>${esc(c[2])}</p>${link(c[3])}</article>`).join("")}</div></div>`;
    if (page === "contact")
      return `<div class="wrap page"><p class="eyebrow">LET’S CONNECT</p><h1>品牌、产品与团队，<br>需要同一个方向。</h1><p class="lede">工作方向：品牌战略、产品上市传播、社媒团队管理与跨部门营销交付。</p><p>联系信息暂未公开，可通过现有简历渠道联系。</p><div class="section">${link("operations", "了解管理与交付方式")}</div></div>`;
    return `<div class="wrap page"><p class="eyebrow">ABOUT THE EVIDENCE</p><h1>事实与展示，<br>各有清晰的依据。</h1><div class="rights-grid">${Object.entries(
      P.statuses,
    )
      .map(
        ([s, n]) =>
          `<article>${badge(s)}<h2>${n}</h2><p>${{ VERIFIED: "须有可复核原始数据支持；当前指标未使用此状态。", DOCUMENTED: "历史资料或后台截图有记录；字段、窗口和归因仍可能待核。", RECONSTRUCTED: "依据实际经历整理的工作物，不代表历史原件或批准记录。", CONCEPT: "方案与视觉示意，不是历史已执行成品。", PENDING: "信息或定义待补，不以猜测填补。" }[s]}</p></article>`,
      )
      .join(
        "",
      )}</div><p>品牌、企业与客户身份匿名化。创作者合作仅展示策略、筛选、合作流程、内容治理与授权机制。概念图片均标注性质。</p></div>`;
  }
  function route() {
    const [rawPage, id, chapter] = location.hash
      .replace(/^#\/?/, "")
      .split("/");
    const page = rawPage || "home";
    const key = page + "/" + (id || "");
    if (route.key === key && chapter) {
      document.getElementById(chapter)?.scrollIntoView();
      return;
    }
    route.key = key;
    main.innerHTML =
      page === "home"
        ? home()
        : ["cases", "special"].includes(page)
          ? listPage()
          : page === "case" && by(id)
            ? casePage(by(id))
            : page === "data"
              ? dataPage(id)
              : ["experience", "capabilities", "contact", "about"].includes(
                    page,
                  )
                ? simple(page)
                : '<div class="wrap page"><h1>未找到页面</h1><a href="#/cases">返回案例</a></div>';
    if (["cases", "special"].includes(page)) updateList();
    document
      .querySelectorAll("#navigation a")
      .forEach((a) =>
        a.setAttribute(
          "aria-current",
          a.hash === `#/${page}` ? "page" : "false",
        ),
      );
    $("#navigation").classList.remove("open");
    $(".menu-button").setAttribute("aria-expanded", "false");
    document.title =
      page === "case" && by(id)
        ? `${by(id).title}｜黄文琳作品集`
        : "黄文琳｜品牌战略 · 产品营销 · 整合传播";
    window.scrollTo(0, 0);
    if (route.started) main.focus({ preventScroll: true });
    route.started = true;
    if (chapter)
      requestAnimationFrame(() =>
        document.getElementById(chapter)?.scrollIntoView(),
      );
  }
  function open(id, trigger) {
    returnFocus = trigger;
    $("#" + id).showModal();
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button,a");
    if (!t) return;
    if (t.matches(".skip")) {
      e.preventDefault();
      main.focus();
      main.scrollIntoView();
      return;
    }
    if (t.matches(".menu-button")) {
      const on = t.getAttribute("aria-expanded") !== "true";
      t.setAttribute("aria-expanded", String(on));
      $("#navigation").classList.toggle("open", on);
    }
    if (t.dataset.filter) {
      filter = t.dataset.filter;
      updateList();
    }
    if (t.hasAttribute("data-reset")) {
      filter = "全部";
      query = "";
      $("#case-search").value = "";
      updateList();
    }
    if (t.dataset.evidence) {
      const m = metric(t.dataset.evidence);
      if (!m) return;
      $("#evidence-content").innerHTML =
        `<h2 id="evidence-title">${esc(m.label)}</h2><p class="evidence-number">${esc(m.display)}</p>${badge(m.status)}<dl>${[
          ["平台", m.platform],
          ["统计窗口", m.window],
          ["指标定义", m.definition],
          ["来源", m.source],
          ["限制", m.limits],
          ["字段核验", m.fieldVerification || "PENDING"],
        ]
          .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
          .join("")}</dl>${link(m.caseId, "查看关联案例")}`;
      open("evidence-dialog", t);
    }
    if (t.dataset.image) {
      $("#lightbox-content").innerHTML =
        `<img src="assets/concept-${t.dataset.image}.png" alt="匿名化概念视觉，非历史已投放成品"><p>CONCEPT · 概念工作物</p>`;
      open("lightbox", t);
    }
    if (t.dataset.close) $("#" + t.dataset.close).close();
    if (t.closest("dialog") && t.hash) t.closest("dialog").close();
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "case-search") {
      query = e.target.value;
      updateList();
    }
  });
  document.querySelectorAll("dialog").forEach((d) =>
    d.addEventListener("close", () => {
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    }),
  );
  window.addEventListener("hashchange", route);
  route();
})();
