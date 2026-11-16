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
  const featured = {
    gtm: {
      label: "产品营销 / GTM",
      title: "五款清洁电器的上市传播",
      role: "负责社媒传播策略与内容团队交付，参与用户研究、差异化定位、卖点分层和上市传播。",
      decision: "选餐区黏污和浴室边角作为主推场景。双盘拖把拍站姿推进和转向，长柄刷拍调杆、调角和刷头贴合。",
      output: "五款产品、四条产品线的场景分工与卖点演示，配套 KV、社媒选题和创作者 Brief。",
      artifact: "查看产品组合与演示规范",
      chapter: "strategy",
      image: "mop-kv-detail",
      alt: "黄色双盘拖把的产品主视觉局部",
    },
    social: {
      label: "海外社媒 / 品牌增长",
      title: "从零搭建海外社媒内容体系",
      role: "担任社媒负责人、管理组长，负责 Facebook、Instagram 和美国 Facebook Group 的内容规划与团队交付。",
      decision: "Facebook 负责品牌信息和活动导流，Instagram 主做演示短片，Group 通过教程、挑战和答疑回收用户问题。",
      output: "建立季度主题与月度日历。2025 年 Meta 阶段汇总记录 96.5 万次曝光、3.7 万次互动。",
      artifact: "查看内容体系与活动日历",
      chapter: "execution",
    },
    brand: {
      label: "品牌策略 / 整合营销",
      title: "清洁电器品牌定位与整合传播",
      role: "参与品牌故事、视觉资产和产品卖点表达，协同社媒、创作者、PR 与展会的传播素材交付。",
      decision: "让广告主视觉交代清洁姿势，社媒与创作者拍同机位演示，PR 用家庭场景解释产品分工。",
      output: "匿名品牌屋、联合抽奖海报与北美家庭清洁 PR 选题。",
      artifact: "查看品牌屋与渠道分工",
      chapter: "strategy",
      image: "pr-home-scene",
      alt: "家庭餐区清洁主题的传播配图",
    },
    operations: {
      label: "团队管理 / 项目交付",
      title: "社媒团队排期与创意审核",
      role: "安排社媒小组任务与创意评审，协调产品、设计、视频、电商及外部合作方。",
      decision: "月度日历写清负责人和素材依赖。制作前核对产品事实与素材权限，发布前复核脚本、画面与链接。",
      output: "把季度主题拆成月度排期、项目 Brief、脚本与视觉审核，以及周度跟进和月度复盘。",
      artifact: "查看分工、审核与复盘",
      chapter: "management",
    },
  };

  function featuredCard(id, item) {
    const image = item.image ? `<img src="assets/projects/${item.image}.webp" alt="${esc(item.alt)}" loading="lazy" decoding="async">` : "";
    const signals = id === "social" ? `<div class="featured-metric-pair" aria-label="2025 年 Meta 阶段汇总"><span><b>${metric("impressions").display}</b> 曝光</span><span><b>${metric("engagements").display}</b> 互动</span></div>` : "";
    const delivery = id === "operations" ? '<ol class="featured-rhythm"><li>季度主题</li><li>月度排期</li><li>周度审核</li></ol>' : "";
    return `<article class="case-card featured-project${image ? " featured-project-photo" : ""}">
      ${image}<div><p class="featured-label">${item.label}</p><h3>${link(id, item.title)}</h3>
      ${signals}${delivery}<p>${item.decision}</p><a class="featured-detail" href="#/case/${id}/${item.chapter}">${item.artifact} <span aria-hidden="true">↗</span></a></div>
    </article>`;
  }

  function home() {
    return `<div class="wrap">
      <section class="portfolio-hero application-hero" aria-labelledby="home-title">
        <div><p class="eyebrow">黄文琳 / HUANG WENLIN</p><h1 id="home-title">海外品牌营销<br><em>与产品上市策略</em></h1>
        <p class="hero-intro">GTM · 产品营销 · 整合营销 · 品牌增长</p>
        <p class="hero-summary">负责海外社媒策略和内容团队交付，参与清洁电器的用户研究、卖点定位与上市传播。季度定传播主题，月度排内容，周度审核脚本和视觉。</p>
        <div class="actions"><a class="btn" href="#/cases">浏览案例 ↗</a><a href="#/experience">工作经历</a></div></div>
        <nav class="featured-nav" aria-label="代表案例入口"><h2>代表案例</h2>${Object.entries(featured).map(([id, item]) => `<a href="#/case/${id}"><div><span>${item.label}</span><strong>${item.title}</strong></div><span class="featured-arrow" aria-hidden="true">↗</span></a>`).join("")}</nav>
      </section>
      <section class="home-summary results-band" aria-label="Meta 阶段数据"><div><h2>Meta 社媒表现</h2><p>2025 年阶段汇总</p><a href="#/data/social">查看社媒数据 ↗</a></div><div class="home-metrics">${["impressions", "engagements"].map((id) => metricCard(metric(id))).join("")}</div></section>
      <section class="section featured-section" aria-labelledby="featured-title"><div class="section-head"><h2 id="featured-title">代表项目</h2><a href="#/cases">全部 11 个案例 ↗</a></div><div class="featured-grid">${Object.entries(featured).map(([id, item]) => featuredCard(id, item)).join("")}</div></section>
      <section class="contact-band"><div><h2>工作经历与联系</h2><p>海外品牌营销、产品上市与社媒团队管理。</p></div><div class="actions"><a href="#/experience">工作经历 ↗</a><a class="btn" href="#/contact">联系 ↗</a></div></section>
    </div>`;
  }

  function caseOverview(c) {
    const item = featured[c.id];
    if (!item) return "";
    return `<section class="g-case-overview" aria-label="项目速览">
      <div><h2>我的职责</h2><p>${item.role}</p></div>
      <div><h2>关键决定</h2><p>${item.decision}</p></div>
      <div><h2>产出与结果</h2><p>${item.output}</p></div>
      <a href="#/case/${c.id}/${item.chapter}">${item.artifact} <span aria-hidden="true">↗</span></a>
      ${c.id === "social" ? '<a href="#/data/social">查看数据与口径 ↗</a>' : ""}
    </section>`;
  }
  function listPage() {
    return `<div class="wrap page"><p class="eyebrow">THE WORK / 案例索引</p><h1>项目案例</h1><p class="lede">品牌、产品、传播与团队交付。按项目查看我的职责、关键决定、交付物与项目结果。</p><section class="filters" aria-label="案例筛选"><div class="filter-row">${["全部", "策略与上市", "传播与合作", "团队与交付", "商业与生命周期"].map((x) => `<button class="chip" data-filter="${x}" aria-pressed="${x === filter}">${x}</button>`).join("")}</div><label>搜索案例 <input type="search" id="case-search" placeholder="如 PMM、PR、品牌" value="${esc(query)}"></label><span id="filter-count" role="status"></span></section><div class="visual-grid" id="case-list"></div></div>`;
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
    return `<div class="wrap page case-page"><a class="text-link" href="#/cases">← 返回案例索引</a><div class="case-title"><div><p class="eyebrow">CASE ${c.no} / ${tags[c.id]}</p><h1>${esc(featured[c.id]?.title || c.title)}</h1>${featured[c.id] ? "" : `<p class="lede">${esc(c.role)}</p>${badge(c.status)}`}</div>${featured[c.id] ? "" : `<p class="case-scope">${esc(c.scope)}</p>`}</div>${caseOverview(c)}<nav class="case-tabs" aria-label="案例章节">${sections.map(([chapter, , label]) => `<a href="#/case/${c.id}/${chapter}">${label}</a>`).join("")}</nav>${featured[c.id] ? "" : cover(c, true)}<section id="background" class="case-section"><div class="chapter-label">01 / Background</div><div><h2>项目背景</h2><p>${esc(c.problem)}</p><p class="caption">项目范围：${esc(c.scope)}</p></div></section><section id="insight" class="case-section"><div class="chapter-label">02 / Insight</div><div><h2>从问题到判断</h2><p>${esc(c.decision)}</p><p class="caption">判断依据为已有经历与项目资料整理。具体研究样本、访谈与历史审批材料未公开；不推定为已验证的普遍用户结论。</p></div></section><section id="strategy" class="case-section"><div class="chapter-label">03 / Strategy</div><div><h2>策略结构</h2><p>${esc(c.plan)}</p>${flow(c)}${["gtm", "brand"].includes(c.id) ? brandHouse() : ""}<p class="caption">经历重构 · 策略图为本次整理的解释性工作物。</p></div></section><section id="execution" class="case-section"><div class="chapter-label">04 / Execution</div><div><h2>执行与工作物</h2><p>${esc(c.execution)}</p>${c.id === "creator" ? rights() : `<div class="deliverable-grid">${names[c.id].map((n, i) => `<article><span>WORK PACKAGE / 0${i + 1}</span><h3>${n}</h3><p>${["目标 · 输入 · 确认状态", "选择依据 · 输出要求", "负责人 · 版本 · 审核节点", "完成标准 · 复盘问题"][i]}</p></article>`).join("")}</div>`}<p class="caption">${P.statuses[c.status]} · 以上样张用于说明工作方法，不作为历史原始交付证据。</p>${["gtm", "brand", "creative"].includes(c.id) ? `<button class="btn secondary" data-image="${c.id === "gtm" ? "01" : c.id === "brand" ? "02" : "03"}">放大概念视觉 ↗</button>` : ""}</div></section><section id="management" class="case-section"><div class="chapter-label">05 / Management Contribution</div><div><h2>管理贡献与协作</h2>${management(c)}<p class="caption">本人参与范围按原资料保留；项目方法示意不代表独立拥有全部业务决策权。</p></div></section><section id="results" class="case-section"><div class="chapter-label">06 / Results</div><div><h2>结果与限制</h2><p>${esc(c.result)}</p><div class="result-grid">${metrics.map(metricCard).join("")}</div>${c.id === "social" ? comparison() : c.id === "seo" ? shareChart() : ""}<p class="note">${esc(c.review)}</p></div></section><section id="evidence" class="case-section"><div class="chapter-label">07 / Evidence</div><div><h2>证据与来源</h2><p>案例类型：${P.statuses[c.status]}。工作物、职责记录与指标证据分别判断。原始后台截图与内部材料不公开。</p>${metrics.length ? metrics.map((m) => `<details><summary>${esc(m.label)} · ${P.statuses[m.status]}</summary><p>定义：${esc(m.definition)}</p><p>来源：${esc(m.source)}</p><p>统计窗口：${esc(m.window)}</p><p>限制：${esc(m.limits)}</p></details>`).join("") : '<p class="note">本案例展示方法与流程；暂无可公开核验的项目效果，不填造结果。</p>'}</div></section><div class="case-end">${link(P.cases[(P.cases.indexOf(c) + 1) % P.cases.length].id, "下一个案例")}<a href="#/cases">全部案例 ↗</a></div></div>`;
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
      return `<div class="wrap page"><p class="eyebrow">EXPERIENCE</p><h1>工作经历</h1><div class="career-list">${P.experiences.map((e) => `<article><time>${esc(e.date)}</time><div><small>${esc(e.title)} · 匿名化</small><h2>${esc(e.role)}</h2><p>${esc(e.body)}</p>${link(e.caseId, "关联案例")}</div></article>`).join("")}</div></div>`;
    if (page === "capabilities")
      return `<div class="wrap page"><p class="eyebrow">CAPABILITIES</p><h1>营销能力</h1><div class="cap-list">${P.capabilities.map((c) => `<article><small>${esc(c[1])}</small><h2>${esc(c[0])}</h2><p>${esc(c[2])}</p>${link(c[3])}</article>`).join("")}</div></div>`;
    if (page === "contact")
      return `<div class="wrap page"><p class="eyebrow">LET’S CONNECT</p><h1>联系黄文琳</h1><p class="lede">工作方向：品牌战略、产品上市传播、社媒团队管理与跨部门营销交付。</p><p>请使用随投递简历提供的联系方式。</p><div class="section">${link("operations", "了解管理与交付方式")}</div></div>`;
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
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
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
    window.enhancePortfolio?.(main, {page, id});
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
        ? `${featured[id]?.title || by(id).title}｜黄文琳作品集`
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
