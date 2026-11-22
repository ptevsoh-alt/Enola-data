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
    gtm: ["市场与定位", "预热 / 首发 / 放量 / 收尾", "四渠道接口与物料", "D7 / D30 复盘设计"],
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
  const workDetails = {
    gtm: ["上市规划先明确美国市场、五月窗口和可售条件。价格、库存、支付和履约由商业及供应链确认。", "围绕餐后硬地设置传播主张，确定主视觉、连续演示和 FAQ 分别回答的问题，并把要求写入 Brief。", "按预热、首发、放量、收尾安排社媒内容和跨渠道依赖；四渠道分别由电商、站点、海外渠道和社媒负责人验收，不把横向协调误写成管理四个团队。", "计划在 D7 查渠道排期、素材与链接断点，在 D30 查有效访问、净订单和售后，再决定保留、返工或停止；未宣称执行过 D7 / D30 复盘。"],
    brand: ["统一品牌主张、用户利益和产品事实。", "梳理 Brand House、Message House 与视觉表达。", "按 Social、PR、Creator 和展会分配传播任务。", "审核脚本、视觉与跨渠道信息一致性。"],
    social: ["制定季度传播主题与月度内容日历。", "围绕演示、家庭场景、教程、FAQ 和 UGC 规划栏目。", "按 Facebook、Instagram 与 Group 分配平台角色。", "结合触达、互动、点击和社群反馈调整选题。"],
    operations: ["确定季度目标、月度内容与活动排期。", "拆分文案、设计、视频、产品审核和发布任务。", "组织创意评审、脚本审核与视觉检查。", "开展周 / 月复盘，将问题写回 Brief 和审核清单。"],
    creator: ["筛选受众、内容类型与产品适配度。", "明确合作目标、产品事实和交付要求。", "审核脚本、成片与平台版本。", "确认素材授权范围、期限和使用方式。"],
    community: ["策划清洁教程、主题投票和挑战活动。", "组织 UGC 投稿与分享激励。", "核对产品信息、投稿内容和使用授权。", "整理高频问题，回流 FAQ 与下一轮选题。"],
    b2b: ["按客户类型梳理采购需求和应用场景。", "组合搜索、社媒和邮件触达。", "跟进询盘、报价、合同与交期确认。", "整理展会反馈，推进客户资料和后续跟进。"],
    seo: ["按关键词和搜索意图规划内容主题。", "组织 Pillar Blog、FAQ 与内容集群。", "协同商品页、EDM 和社媒选题。", "观察 GSC 点击与自然搜索收入结构。"],
    amazon: ["优化 Listing、A+ 与 Store 商品信息。", "结合搜索词与竞争情况调整 CPC。", "协同促销、库存和售后。", "复盘转化、销售与经营表现。"],
    creative: ["明确使用场景、创意主张与叙事结构。", "安排产品动作、镜头顺序和画面重点。", "审核字幕、产品事实与操作画面。", "检查剪辑节奏、成片质量和导出文件。"],
    crm: ["区分新客、浏览、加购与购后状态。", "定义触发条件、同意记录和发送频控。", "规划邮件内容、会员权益与召回触点。", "完成域名、数据和权限核查后再上线。"],
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
  const caseDecisions = {
    gtm: {
      choice: "先用餐后硬地验证相关性，按结构图、操作实拍与说明书的证据强度决定讲什么。",
      handoff: "我负责社媒排期、Brief 和内容审核，横向收集电商、站点及渠道的依赖；产品、商业和各渠道 Owner 分别对事实、可售状态和发布进行签核。",
      review: "D7 / D30 是下一轮复盘设计：先诊断排期、素材、链接，再核实有效访问、净订单与售后。不把规划当作已发生的订单成果。",
      chapter: "launch-cross-channel",
      artifact: "四渠道接口与上市节奏",
    },
    brand: {
      choice: "先用餐区和浴室两种清洁任务解释产品分工，再把同一个场景分别写成社媒演示、联合活动和新闻稿。",
      handoff: "产品确认事实，营销把事实写成渠道 Brief。媒体稿先核验分发性质，合作活动另核参与规则和授权。",
      review: "新闻稿可核对分发，联合活动可核对海报。媒体影响、参与和履约需各自的数据。",
      chapter: "pr-project",
      artifact: "北美新闻稿分发",
    },
    social: {
      choice: "把平台分工落实到季度主题、月度日历和周度审核，避免各渠道反复发布同一套内容。",
      handoff: "内容组定选题和渠道；产品核事实，设计和视频交创意，社群把用户问题带回下轮选题。",
      review: "页面浏览、内容互动、链接动作和社群参与分别诊断。只有范围和日期对齐，才比较表现。",
      chapter: "social-data-decisions",
      artifact: "经营复盘和数据口径",
    },
    operations: {
      choice: "把容易返工的产品结构、文案主张和渠道安全区写进 Brief，按不同交付物逐项验收。",
      handoff: "我直接负责社媒小组的优先级、Brief 和审核；跨部门推动节点、回收反馈、同步口径，不代替其他渠道负责人批准预算、人事和发布。",
      review: "主视觉遮挡双盘的样稿进入返工。复核外观、裁切和 CTA 之后，最终品牌与产品签核仍待确认。",
      chapter: "cross-functional-governance",
      artifact: "横向协作与返工记录",
    },
    community: {
      choice: "先用投票和教程降低参与门槛，再让愿意分享使用过程的人投稿。根据用户提问补内容与 FAQ。",
      handoff: "我安排主题和活动素材，社群负责答疑和投稿审核，产品确认高频问题；创作者或成员素材复用需要单独核权利。",
      review: "成员规模、查看和发帖评论是三类指标。单场活动还需要参与窗口、规则、履约与复用授权。",
      output: "成员快照为 4,009；另有超过 1,000 人与新增 227 人的独立阶段记录。",
      chapter: "community-event-governance",
      artifact: "活动职责、参与规则与反馈",
    },
    b2b: {
      choice: "先按采购场景、系统适配度和推进阶段筛选对象，再分别安排触达、技术答疑和报价。",
      handoff: "客户开发负责判断意向和跟进，把配置及交付问题交产品和商务。展会以脱敏照片呈现参与和系统陈列。",
      review: "任职期触达、转化和成交属于经营记录。若要评估展会，需另核现场登记与会后机会来源。",
      output: "任职期记录月均触达潜客 100+。展会另有三张脱敏现场照片。",
      chapter: "expo-project",
      artifact: "展会与客户沟通工作样例",
    },
    seo: {
      choice: "按任务和搜索意图分流。先以万圣节清洁总指南接住主题，再用专题回答黏污、边角和选型问题。",
      handoff: "我参与选题与内容协同。产品核使用条件，内容组写指南和 FAQ，商品信息负责选型与承接。",
      review: "主题集群需要按页面核收录和点击。站点自然搜索收入份额与历史 GSC 点击单独解释。",
      output: "形成 1 篇主指南与 9 篇英文专题的规划；历史阶段另有搜索表现记录。",
      chapter: "seo-cluster",
      artifact: "主题集群规划",
    },
    amazon: {
      choice: "先判断曝光、点击、页面转化或履约哪一段出现问题，再决定改关键词、商品页还是促销安排。",
      handoff: "经营侧拆问题与优先级，设计负责商品表达，广告侧核关键词和流量，供应链与售后核库存、退换和差评。",
      review: "相近窗口里复核流量、转化和成本，再观察库存和售后。阶段销售变化不能单独归因于某一动作。",
      output: "履历记录阶段销售额约 +10%。转化与利润指标各有定义与窗口限制。",
      chapter: "amazon-priority",
      artifact: "店铺经营取舍",
    },
    creative: {
      choice: "品牌片先建立节庆家庭场景，操作短片直接切入工具如何接触、推进和转向。",
      handoff: "我参与创意策划与脚本、画面审核。产品确认结构和用途；制作交对应镜头；运营核渠道版本和使用权。",
      review: "不同开场承担不同任务。阶段测试可固定其余条件比较留存；去污表现需要可核实的同条件镜头。",
      output: "三段静音网页节选，含节庆叙事、楼梯演示及两种开场对照。另有脚本和审核样例。",
      chapter: "video-projects",
      artifact: "播放节庆故事和产品演示",
    },
    crm: {
      choice: "先判断客户状态、有效许可和排除条件，再规划欢迎、购物车、购后或召回邮件。",
      handoff: "运营定义旅程目标；电商和邮件平台核事件及同意记录；客服提供退款与用户状态，避免触发冲突。",
      review: "先实测触发、抑制、退出和重复进入，再核发送与转化。复购和留存尚无可核结果。",
      output: "交付用户旅程、触发与频控规则规划，供实际配置及测试使用。",
      chapter: "crm-handoff",
      artifact: "发送条件与旅程交接",
    },
    creator: {
      choice: "先按目标市场与受众问题筛选。要回答操作问题时，优先审查交付能否看到完整动作。",
      handoff: "内容方写 Brief 和修改意见，产品核事实，合作负责人确认披露与平台、地域、期限及付费使用权。",
      review: "每次审片对应具体版本，最终素材和授权一同归档。效果需匹配实际合作发布与同窗口数据。",
      output: "展示合作筛选、英文 Brief、素材审核和授权流程样例；结果待实际合作证据。",
      chapter: "partner-handoff",
      artifact: "创作者 Brief 与交接",
    },
  };
  function cover(c, large = false) {
    const img = ["gtm", "brand", "creative"].includes(c.id)
      ? `<img src="assets/concept-${c.id === "gtm" ? "01" : c.id === "brand" ? "02" : "03"}.png" alt="${esc(c.subtitle)}视觉方向" ${large ? "" : 'loading="lazy"'} width="1000" height="1200">`
      : "";
    return `<div class="project-cover cover-${c.id} ${img ? "has-image" : ""}">${img}<div class="cover-top"><span>${tags[c.id]}</span><span>${c.no} / SELECTED WORK</span></div><div class="cover-diagram" aria-hidden="true">${names[c.id].map((n, i) => `<span><small>0${i + 1}</small>${n}</span>`).join("")}</div><div class="cover-bottom"><b>${esc(c.subtitle)}</b><span>${img ? "视觉方向" : "项目重点"} · ${P.statuses[c.status]}</span></div></div>`;
  }
  function card(c) {
    return `<article class="case-card"><a class="cover-link" href="#/case/${c.id}" aria-label="阅读${esc(c.title)}">${cover(c)}</a><div class="card-meta"><span>${tags[c.id]}</span>${badge(c.status)}</div><h3>${link(c.id, c.title)}</h3><p>${esc(c.role)}</p></article>`;
  }
  function metricCard(m) {
    return `<button class="metric" data-evidence="${esc(m.id)}"><strong>${esc(m.display)}</strong><span>${esc(m.label)}</span><small>${esc(m.window)}</small><span class="metric-source">${P.statuses[m.status]} · 定义与来源 ↗</span></button>`;
  }
  const featured = window.PORTFOLIO_SELECTED_WORK;
  const homeRoutes = [
    ["01", "GTM / 产品营销", "让用户在餐后清洁任务中理解新品，再决定哪些信息能进入 KV、视频和商品页。", "#/case/gtm/launch-decisions", "M3 使用场景与产品证明"],
    ["02", "IMC / Campaign", "由一个主目标到 Big Idea、内容矩阵、渠道职责与发布条件，而非多平台同步发帖。", "#/case/gtm/campaign-architecture", "Campaign Strategy / 内容矩阵"],
    ["03", "Brand / PR", "品牌屋确定任务分工，新闻稿和联合营销承担不同的可信信息角色。", "#/case/brand/brand-positioning", "品牌屋与实际传播作品"],
    ["04", "Creative / Video", "节庆故事建立情绪关联，操作镜头证明产品如何接触与移动。", "#/case/creative/video-projects", "播放三段 MP4 节选"],
    ["05", "Social / Growth", "季度主题、月度日历与平台数据相互关联，复盘不混用不同窗口。", "#/case/social/social-data-decisions", "2025 Meta 阶段结果"],
    ["06", "Team / Delivery", "社媒小组管理、产品事实核验、设计返工及渠道放行责任分开记录。", "#/case/operations/asset-review", "真实视觉返工与协同"],
  ];

  function featuredCard(id, item) {
    const image = item.image ? `<img src="assets/projects/${item.image}.webp" alt="${esc(item.alt)}" loading="lazy" decoding="async">` : "";
    const signals = id === "social" ? `<div class="featured-metric-pair" aria-label="2025 年 Meta 阶段汇总"><span><b>${metric("impressions").display}</b> 曝光</span><span><b>${metric("engagements").display}</b> 互动</span></div>` : "";
    const delivery = id === "operations" ? '<ol class="featured-rhythm"><li>季度主题</li><li>月度排期</li><li>周度审核</li></ol>' : "";
    return `<article class="case-card featured-project${image ? " featured-project-photo" : ""}">
      ${image}<div><p class="featured-label">${item.label}</p><h3>${link(id, item.title)}</h3>
      ${signals}${delivery}<p>${item.decision}</p><p class="featured-highlight">${item.highlight}</p><a class="featured-detail" href="#/case/${id}/${item.chapter}">${item.artifact} <span aria-hidden="true">↗</span></a></div>
    </article>`;
  }

  function home() {
    return `<div class="home-intro-band"><div class="wrap">
      <section class="portfolio-hero application-hero" aria-labelledby="home-title">
        <div><p class="eyebrow">黄文琳 · 个人作品集</p><h1 id="home-title">海外品牌营销<br><em>整合传播与产品上市</em></h1>
        <p class="profile-direction">${esc(P.profile.direction)}</p>
        <p class="hero-summary">${esc(P.profile.summary)}</p>
        <div class="actions"><a class="btn" href="#/home/strategy-map">按主题看作品 ↘</a><a href="#/case/creative/video-projects">播放视频 ↗</a><a href="#/experience">经历与职责</a></div></div>
        <nav class="featured-nav" aria-label="代表项目"><h2>重点项目直达</h2>${Object.entries(featured).map(([id, item]) => `<a href="#/case/${id}"><div><strong>${item.title}</strong><span>${item.label}</span></div><span class="featured-arrow" aria-hidden="true">↗</span></a>`).join("")}</nav>
      </section>
      <section class="home-summary results-band" aria-label="Meta 阶段数据"><div><h2>Meta 社媒表现</h2><p>2025 年阶段汇总 · 历史项目记录</p><a href="#/case/social/results">查看经营结果与数据口径 ↗</a></div><div class="home-metrics">${["impressions", "engagements"].map((id) => metricCard(metric(id))).join("")}</div></section>
    </div></div><div class="wrap">
      <section class="section home-route-section" id="strategy-map" aria-labelledby="strategy-map-title">
        <div class="section-head"><div><p class="eyebrow">SELECTED PRACTICE / 项目导航</p><h2 id="strategy-map-title">从策略判断到作品与结果</h2></div><a href="#/cases">查看所有案例 ↗</a></div>
        <p class="home-route-intro">每张卡片都能打开对应的项目决策、实物或数据。规划案例与已经发生的结果分开展示。</p>
        <div class="home-route-grid">${homeRoutes.map(([no, title, note, href, evidence]) => `<a class="home-route-card" href="${href}"><span class="home-route-index">${no} / ${title}</span><p>${note}</p><strong>${evidence} <span aria-hidden="true">↗</span></strong></a>`).join("")}</div>
      </section>
      <section class="home-proof-bridge" aria-label="跨项目阶段数据入口">
        <a href="#/data/community"><small>美国 Facebook Group · 成员快照</small><strong>${esc(metric("group-members").display)}</strong><span>采集日期未注明；与 2025 Meta 汇总不合并 ↗</span></a>
        <a href="#/data/b2b"><small>瑞音博 · 任期内 Facebook 账号</small><strong>${esc(metric("fb-follower-scale").display)}</strong><span>粉丝规模起止值，日期和账号范围待核 ↗</span></a>
        <a href="#/case/creative/video-projects"><small>节庆与产品教育 · 本地播放器</small><strong>3 段视频</strong><span>节庆叙事、实际操作及开场对照 ↗</span></a>
      </section>
      <section class="section featured-section" id="selected-work" aria-labelledby="featured-title"><div class="section-head"><h2 id="featured-title">重点案例与实际工作物</h2><a href="#/cases">全部 ${P.cases.length} 个案例 ↗</a></div><div class="featured-grid">${Object.entries(featured).map(([id, item]) => featuredCard(id, item)).join("")}</div></section>
      <section class="contact-band"><div><h2>工作经历与联系</h2><p>${esc(P.profile.focus)}</p></div><div class="actions"><a href="#/experience">工作经历 ↗</a><a class="btn" href="#/contact">联系 ↗</a></div></section>
    </div>`;
  }

  function caseOverview(c) {
    const focus = caseDecisions[c.id];
    const item = featured[c.id] ?? {
      role: c.role,
      decision: focus.choice,
      output: focus.output,
      chapter: focus.chapter,
      artifact: focus.artifact,
    };
    return `<section class="g-case-overview" aria-label="项目速览">
      <div><h2>我的职责</h2><p>${esc(item.role)}</p></div>
      <div><h2>关键决定</h2><p>${esc(item.decision)}</p></div>
      <div><h2>产出与结果</h2><p>${esc(item.output)}</p></div>
      <a href="#/case/${c.id}/${item.chapter}">${esc(item.artifact)} <span aria-hidden="true">↗</span></a>
      ${c.id === "social" ? '<a href="#/data/social">查看数据与口径 ↗</a>' : ""}
    </section>`;
  }
  function listPage() {
    return `<div class="wrap page"><p class="eyebrow">THE WORK / 案例索引</p><h1>项目案例</h1><p class="lede">品牌、产品、传播与团队交付。从项目出发，查看我的分工、关键取舍与交付记录。</p><section class="filters" aria-label="案例筛选"><div class="filter-row">${["全部", "策略与上市", "传播与合作", "团队与交付", "商业与生命周期"].map((x) => `<button class="chip" data-filter="${x}" aria-pressed="${x === filter}">${x}</button>`).join("")}</div><label>搜索案例 <input type="search" id="case-search" placeholder="如 PMM、PR、品牌" value="${esc(query)}"></label><span id="filter-count" role="status"></span></section><div class="visual-grid" id="case-list"></div></div>`;
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
    const focus = caseDecisions[c.id];
    return `<div class="management-board case-handoff-board">
      <article><h3>怎么分工交接</h3><p>${esc(focus.handoff)}</p></article>
      <article><h3>结果怎么复核</h3><p>${esc(focus.review)}</p></article>
    </div>`;
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
    return `<div class="wrap page case-page"><a class="text-link" href="#/cases">← 返回案例索引</a><div class="case-title"><div><p class="eyebrow">CASE ${c.no} / ${tags[c.id]}</p><h1>${esc(featured[c.id]?.title || c.title)}</h1>${featured[c.id] ? "" : badge(c.status)}</div>${featured[c.id] ? "" : `<p class="case-scope">${esc(c.scope)}</p>`}</div>${caseOverview(c)}<nav class="case-tabs" aria-label="案例章节">${sections.map(([chapter, , label]) => `<a href="#/case/${c.id}/${chapter}">${label}</a>`).join("")}</nav>${featured[c.id] ? "" : cover(c, true)}<section id="background" class="case-section"><div class="chapter-label">01 / Background</div><div><h2>项目背景</h2><p>${esc(c.problem)}</p></div></section><section id="insight" class="case-section"><div class="chapter-label">02 / Insight</div><div><h2>从问题到判断</h2><p>${esc(c.decision)}</p></div></section><section id="strategy" class="case-section"><div class="chapter-label">03 / Strategy</div><div><h2>策略结构</h2><p>${esc(c.plan)}</p>${flow(c)}${["gtm", "brand"].includes(c.id) ? brandHouse() : ""}</div></section><section id="execution" class="case-section"><div class="chapter-label">04 / Execution</div><div><h2>执行与工作物</h2><p>${esc(c.execution)}</p>${c.id === "creator" ? rights() : `<div class="deliverable-grid">${names[c.id].map((n, i) => `<article><span>工作内容 / 0${i + 1}</span><h3>${n}</h3><p>${workDetails[c.id][i]}</p></article>`).join("")}</div>`}${["gtm", "brand", "creative"].includes(c.id) ? `<button class="btn secondary" data-image="${c.id === "gtm" ? "01" : c.id === "brand" ? "02" : "03"}">查看视觉方向 ↗</button>` : ""}</div></section><section id="management" class="case-section"><div class="chapter-label">05 / Management Contribution</div><div><h2>管理贡献与协作</h2>${management(c)}</div></section><section id="results" class="case-section"><div class="chapter-label">06 / Results</div><div><h2>结果与限制</h2><p>${esc(c.result)}</p><div class="result-grid">${metrics.map(metricCard).join("")}</div>${c.id === "social" ? metaSummary() : c.id === "seo" ? shareChart() : ""}<p class="note">${esc(c.review)}</p></div></section><section id="evidence" class="case-section"><div class="chapter-label">07 / Evidence</div><div><h2>证据与来源</h2><p><a href="#/case/${c.id}/${caseDecisions[c.id].chapter}">${esc(caseDecisions[c.id].artifact)} ↗</a></p>${metrics.length ? metrics.map((m) => `<details><summary>${esc(m.label)} · ${P.statuses[m.status]}</summary><p>定义：${esc(m.definition)}</p><p>来源：${esc(m.source)}</p><p>统计窗口：${esc(m.window)}</p><p>限制：${esc(m.limits)}</p></details>`).join("") : '<p class="note">本案例展示策略与交付流程，暂无对应的量化结果。</p>'}</div></section><div class="case-end">${link(P.cases[(P.cases.indexOf(c) + 1) % P.cases.length].id, "下一个案例")}<a href="#/cases">全部案例 ↗</a></div></div>`;
  }
  function metaSummary() {
    const ids = ["impressions", "engagements"];
    return `<section class="g-meta-summary" aria-label="Meta 社媒阶段汇总">
      <h3>Meta 社媒阶段汇总</h3>
      <div class="g-meta-metrics">${ids.map((id) => metricCard(metric(id))).join("")}</div>
      <button class="text-link" type="button" data-evidence="er">查看互动与曝光的估算口径 ↗</button>
    </section>`;
  }
  function shareChart() {
    const m = metric("organic-share");
    return `<figure class="share-chart"><div class="donut" role="img" aria-label="自然搜索收入份额 82.46%，其余渠道补数 17.54%"><b>82.46%<small>收入份额</small></b></div><figcaption><h3>自然搜索收入在渠道中的占比</h3><p>${esc(m.window)} · ${P.statuses[m.status]}</p><p>其他渠道 17.54% 为 100% 减去原记录份额的补数。归因模型、收入定义与窗口待核，不建立与内容计划的因果关系。</p><button class="text-link" data-evidence="organic-share">查看来源 ↗</button></figcaption></figure>`;
  }
  function dataPage(domain) {
    const selected = P.domains[domain] ? domain : "social",
      rows = P.metrics.filter((m) => m.domain === selected);
    return `<div class="wrap page"><p class="eyebrow">MEASUREMENT / 数据与证据</p><h1>增长数据与统计口径</h1><p class="lede">选择业务领域查看指标。打开任一数值可核对平台、统计窗口、来源和比较条件。</p><nav class="filter-row" aria-label="数据领域">${Object.entries(
      P.domains,
    )
      .map(
        ([id, n]) =>
          `<a class="chip ${id === selected ? "active" : ""}" href="#/data/${id}" ${id === selected ? 'aria-current="page"' : ""}>${n}</a>`,
      )
      .join(
        "",
      )}</nav>${selected === "social" ? metaSummary() : selected === "search" ? shareChart() : ""}<div class="data-kpis">${rows.map(metricCard).join("")}</div><details><summary>查看所有数值与口径</summary><div class="table-scroll"><table><thead><tr><th>指标</th><th>数值</th><th>统计窗口</th><th>证据状态</th></tr></thead><tbody>${rows.map((m) => `<tr><th scope="row">${esc(m.label)}</th><td>${esc(m.display)}</td><td>${esc(m.window)}</td><td>${P.statuses[m.status]}</td></tr>`).join("")}</tbody></table></div></details></div>`;
  }
  function simple(page) {
    if (page === "experience")
      return `<div class="wrap page"><p class="eyebrow">EXPERIENCE</p><h1>工作经历</h1><p class="lede">近 6 年海外市场与跨境业务经历，从 Amazon 店铺经营、海外 B2B 客户研究与展会营销，到北美消费品牌传播、社媒增长及内容团队管理。</p><div class="career-list">${P.experiences.map((e) => `<article><time>${esc(e.date)}</time><div><small>${esc(e.title)}</small><h2>${esc(e.role)}</h2><p>${esc(e.body)}</p>${e.context ? `<p>${esc(e.context)}</p>` : ""}${e.work.length ? `<div class="actions">${e.work.map(([id, label]) => link(id, esc(label))).join("")}</div>` : ""}</div></article>`).join("")}</div></div>`;
    if (page === "capabilities")
      return `<div class="wrap page"><p class="eyebrow">CAPABILITIES</p><h1>营销能力</h1><div class="cap-list">${P.capabilities.map((c) => `<article><small>${esc(c[1])}</small><h2>${esc(c[0])}</h2><p>${esc(c[2])}</p>${link(c[3])}</article>`).join("")}</div></div>`;
    if (page === "contact")
      return `<div class="wrap page"><p class="eyebrow">LET’S CONNECT</p><h1>联系黄文琳</h1><p class="lede">${esc(P.profile.direction)}</p><p>工作重点：${esc(P.profile.focus)}。联系方式以随投递简历提供的信息为准。</p><div class="section">${link("operations", "了解团队管理与项目交付")}</div></div>`;
    return `<div class="wrap page"><p class="eyebrow">ABOUT THE EVIDENCE</p><h1>事实与展示，<br>各有清晰的依据。</h1><div class="rights-grid">${Object.entries(
      P.statuses,
    )
      .map(
        ([s, n]) =>
          `<article>${badge(s)}<h2>${n}</h2><p>${{ VERIFIED: "可由原始平台数据直接核对。", DOCUMENTED: "简历、项目记录或后台截图中有对应记录。", RECONSTRUCTED: "根据实际职责与项目流程整理的工作方法。", CONCEPT: "用于展示创意方向和内容表达的样例。", PENDING: "字段定义或统计窗口尚未完整。" }[s]}</p></article>`,
      )
      .join(
        "",
      )}</div><p>品牌与企业身份已匿名化。创作者合作重点展示受众筛选、Brief、内容审核和授权管理；视觉样例用于呈现创意方向。</p></div>`;
  }
  function scrollToChapter(chapter) {
    const target = document.getElementById(chapter);
    if (!target) return;
    const disclosure = target.closest("details");
    if (disclosure) disclosure.open = true;
    target.scrollIntoView();
  }

  function route() {
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
    const [rawPage, id, caseChapter] = location.hash
      .replace(/^#\/?/, "")
      .split("/");
    const page = rawPage || "home";
    const chapter = page === "home" ? id : caseChapter;
    const key = page === "home" ? "home/" : page + "/" + (id || "");
    if (route.key === key && chapter) {
      scrollToChapter(chapter);
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
        : "黄文琳｜品牌营销 · IMC · GTM 作品集";
    window.scrollTo(0, 0);
    if (route.started) main.focus({ preventScroll: true });
    route.started = true;
    if (chapter)
      requestAnimationFrame(() => scrollToChapter(chapter));
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
        ]
          .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
          .join("")}</dl>${link(m.caseId, "查看关联案例")}`;
      open("evidence-dialog", t);
    }
    if (t.dataset.image) {
      $("#lightbox-content").innerHTML =
        `<img src="assets/concept-${t.dataset.image}.png" alt="项目视觉方向"><p>视觉方向</p>`;
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
