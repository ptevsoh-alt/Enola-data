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
    gtm: ["上市规划先明确美国市场、五月窗口和可售条件。价格、库存、支付和履约由商业及供应链确认。", "围绕餐后硬地设置传播主张，确定主视觉、连续演示和 FAQ 分别回答的问题，并把要求写入 Brief。", "按预热、首发、放量、收尾安排社媒内容和跨渠道依赖，对接电商、站点、海外渠道与社媒负责人完成素材审核。", "上市计划设置 D7 / D30 两个复盘节点：首周检查内容与链接表现，月度关注订单、售后及用户反馈，形成下一轮传播动作。"],
    brand: ["统一品牌主张、用户利益和产品事实。", "梳理 Brand House、Message House 与视觉表达。", "按 Social、PR、Creator 和品牌合作活动分配传播任务。", "审核脚本、视觉与跨渠道信息一致性。"],
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
      review: "复盘根据产品理解、渠道到达、反馈及经营证据定位问题，提出可验证的调整，并将经过核实的经验写入下一轮 Brief。",
      chapter: "launch-cross-channel",
      artifact: "四渠道接口与上市节奏",
    },
    brand: {
      choice: "先用餐区和浴室两种清洁任务解释产品分工，再把同一个场景分别写成社媒演示、联合活动和新闻稿。",
      handoff: "产品确认事实，营销把事实写成渠道 Brief。媒体稿先核验分发性质，合作活动另核参与规则和授权。",
      review: "将新闻稿分发、联合活动素材、参与反馈和传播表现纳入复盘。",
      chapter: "pr-project",
      artifact: "北美新闻稿分发",
    },
    social: {
      choice: "把平台分工落实到季度主题、月度日历和周度审核，避免各渠道反复发布同一套内容。",
      handoff: "内容组定选题和渠道；产品核事实，设计和视频交创意，社群把用户问题带回下轮选题。",
      review: "按浏览、互动、链接点击和社群讨论诊断内容表现，优化下一轮传播。",
      chapter: "social-data-decisions",
      artifact: "社媒增长与内容复盘",
    },
    operations: {
      choice: "围绕季度主题制定 Facebook、Instagram 和 Group 的月度日历，安排节庆选题、产品内容与用户互动。",
      handoff: "负责内容排期、创意审核、素材反馈和团队日常管理，跟进社媒不同平台的发布节奏。",
      review: "按照渠道规格和产品事实审核图文及视频版本，跟进修改意见、交付时间及最终素材版本。",
      chapter: "operations-content-calendar",
      artifact: "季度主题与月度内容日历",
    },
    community: {
      choice: "先用投票和教程降低参与门槛，再让愿意分享使用过程的人投稿。根据用户提问补内容与 FAQ。",
      handoff: "我安排主题和活动素材，社群负责答疑和投稿审核，产品确认高频问题；创作者或成员素材复用需要单独核权利。",
      review: "结合成员规模、查看和讨论参与复盘社群，完善活动规则与内容授权。",
      output: "社群成员规模 4,009 人；另有 1,000+ 历史增长及 227 人阶段新增。",
      chapter: "community-event-governance",
      artifact: "活动职责、参与规则与反馈",
    },
    b2b: {
      choice: "围绕参展目标与展品确定展位展示内容、宣传物料和客户沟通重点；会后按需求继续跟进。",
      handoff: "参与展位策划与现场物料准备，协调展品资料和品牌视觉；现场记录需求并衔接商务跟进。",
      review: "从客户来源、响应、询盘和合作阶段评估渠道质量，持续优化后续跟进。",
      output: "海外 B2B 客户开发月均触达潜客 100+，参与海外展会传播与客户跟进，配有匿名化现场作品。",
      chapter: "expo-project",
      artifact: "展会传播与客户沟通",
    },
    seo: {
      choice: "根据用户的搜索任务安排主题指南、细分内容与产品选型信息，并组织品牌媒体内容。",
      handoff: "我参与搜索主题规划、内容策划与 PR 协同；产品、电商和内容团队分别支持使用事实、商品信息与内容表达。",
      review: "结合搜索查询、页面收录、点击和高意图内容表现调整主题集群。",
      output: "搜索主题与页面关系规划、产品教育内容协同，以及北美家庭清洁主题新闻稿分发。",
      chapter: "seo-cluster",
      artifact: "主题集群规划",
    },
    amazon: {
      choice: "先判断曝光、点击、页面转化或履约哪一段出现问题，再决定改关键词、商品页还是促销安排。",
      handoff: "经营侧拆问题与优先级，设计负责商品表达，广告侧核关键词和流量，供应链与售后核库存、退换和差评。",
      review: "以广告流量、转化、成本、库存和售后反馈确定经营优化优先级。",
      output: "Amazon 店铺从 0 到 1 的经营过程中，阶段销售额约增长 10%、转化率约提升 5%，同时优化商品信息与广告结构。",
      chapter: "amazon-priority",
      artifact: "店铺经营取舍",
    },
    creative: {
      choice: "品牌片先建立节庆家庭场景，操作短片直接切入工具如何接触、推进和转向。",
      handoff: "我参与创意策划与脚本、画面审核。产品确认结构和用途；制作交对应镜头；运营核渠道版本和使用权。",
      review: "按品牌情绪与产品演示的不同传播目标检查镜头，并根据观看反馈优化节奏。",
      output: "以节庆视频及 Creator 场景片为代表，说明创意主题、脚本调整、产品演示和渠道版本审核；上传素材只覆盖部分工作内容。",
      chapter: "video-projects",
      artifact: "播放节庆故事和产品演示",
    },
    crm: {
      choice: "先确定邮件活动目标、受众与核心内容，再按用户订阅、浏览、加购和购后阶段安排合适信息。",
      handoff: "运营定义旅程目标；电商和邮件平台核事件及同意记录；客服提供退款与用户状态，避免触发冲突。",
      review: "通过用户状态、许可、排除和频控决定邮件触达的节奏，并与电商、客服保持信息一致。",
      output: "母亲节 EDM 活动邮件方案、英文文案结构和用户分层触达流程，包含触发、排除与发送节奏。",
      chapter: "crm-handoff",
      artifact: "发送条件与旅程交接",
    },
    creator: {
      choice: "先按目标市场与受众问题筛选。要回答操作问题时，优先审查交付能否看到完整动作。",
      handoff: "内容方写 Brief 和修改意见，产品核事实，合作负责人确认披露与平台、地域、期限及付费使用权。",
      review: "每次审片对应具体版本，最终素材和授权一同归档。效果需匹配实际合作发布与同窗口数据。",
      output: "整合创作者筛选、英文合作 Brief、脚本审核和素材使用授权流程，形成可供团队协同的合作管理方案。",
      chapter: "partner-handoff",
      artifact: "创作者 Brief 与交接",
    },
  };

  const caseCatalog = {
    gtm: {
      title:"四条产品线传播与 M3 上市策划",
      intro:"参与四条产品线的卖点传播、内容 Brief 和上市素材协同；M3 展示五月 Campaign 策划。",
      fact:"2026.05 · M3 上市传播方案",
      cover:"M3",eyebrow:"PRODUCT MARKETING / GTM",detail:"新品上市 · Campaign · 排期",
      media:"assets/projects/m3-yellow-main.webp",alt:"黄色 M3 双盘电动拖把官方产品照片",kind:"product"
    },
    social: {
      title:"海外社媒内容策略与增长",
      intro:"管理 Facebook、Instagram 及 Group 内容工作，制定季度主题、月度日历和素材审核标准。",
      fact:"2025 Meta · 96.5 万曝光 / 3.7 万互动",
      cover:"海外社媒增长",eyebrow:"SOCIAL / GROWTH",detail:"内容策略 · Meta 经营表现",kind:"type"
    },
    community: {
      title:"美国 Facebook Group 社群运营",
      intro:"策划清洁教程、用户讨论及 UGC 互动，持续整理社群反馈和内容选题。",
      fact:"Facebook Group · 4,009 名成员",
      cover:"社群运营",eyebrow:"COMMUNITY / UGC",detail:"内容参与 · 用户关系",kind:"type"
    },
    brand: {
      title:"品牌策略与整合传播",
      intro:"整合品牌屋、产品视觉、节庆 Campaign、PR 和合作活动的传播素材。",
      fact:"品牌屋 · Campaign KV · PR 内容",
      cover:"品牌策略",eyebrow:"BRAND / IMC",detail:"品牌屋 · 视觉与传播",
      media:"assets/projects/brand-house.webp",alt:"匿名品牌屋与产品传播结构图",kind:"product"
    },
    operations: {
      title:"社媒团队管理与项目交付",
      intro:"负责季度主题、月度社媒内容日历、创意审核与日常内容复盘。",
      fact:"季度主题 · 月度排期 · 视觉审核",
      cover:"社媒团队管理",eyebrow:"TEAM / DELIVERY",detail:"季度主题 · 月度排期 · 内容审核",kind:"type"
    },
    b2b: {
      title:"储能行业展会与海外 B2B 客户开发",
      intro:"参与海外储能展位策划与品牌物料准备，负责客户需求沟通及会后跟进。",
      fact:"展位策划 · 视觉物料 · 客户开发",
      cover:"储能展会",eyebrow:"B2B / FIELD MARKETING",detail:"展位规划 · 物料 · 客户接待",
      media:"assets/projects/exhibition-booth-overview-redacted.jpg",alt:"脱敏后的真实储能行业展会现场照片",kind:"photo"
    },
    seo: {
      title:"SEO / Content / PR｜搜索增长与品牌内容传播",
      intro:"规划搜索主题、英文内容、产品教育及媒体传播，结合节庆专题和北美新闻稿展示工作。",
      fact:"英文内容策划 · 北美 PR 分发",
      cover:"SEO 内容",eyebrow:"SEO / CONTENT / PR",detail:"内容规划 · 页面架构 · 新闻稿",kind:"type"
    },
    amazon: {
      title:"Amazon 店铺运营与广告优化",
      intro:"参与 Amazon 店铺从 0 到 1 的运营，覆盖 Listing、广告、促销和库存。",
      fact:"店铺 0–1 · 阶段销售额约 +10%",
      cover:"Amazon 运营",eyebrow:"AMAZON / COMMERCE",detail:"Listing · PPC · 经营优化",kind:"type"
    },
    creative: {
      title:"品牌视频与短视频创意案例",
      intro:"参与品牌影片、产品演示与 Creator 视频的创意策划、脚本、镜头审核和渠道版本制作；现有页面展示部分案例。",
      fact:"品牌影片 · 产品演示 · Creator 合作内容",
      cover:"视频创意",eyebrow:"VIDEO / CREATIVE",detail:"感恩节 · 圣诞节",
      kind:"type"
    },
    crm: {
      title:"EDM 内容策划与用户生命周期运营",
      intro:"负责节庆英文邮件内容与发送排期，设计用户分层和购物旅程中的触发、排除与退出规则。",
      fact:"Campaign Email · Welcome · Cart · Post-purchase",
      cover:"邮件旅程",eyebrow:"CRM / LIFECYCLE",detail:"Welcome · Cart · Post-purchase",kind:"type"
    },
    creator: {
      title:"Creator 合作与视频审核",
      intro:"完成创作者筛选、英文 Brief、视频反馈与素材使用权交接。",
      fact:"合作 Brief · 审片 · 素材授权",
      cover:"Creator",eyebrow:"CREATOR / PARTNERSHIPS",detail:"产品实拍与合作交付",
      kind:"type"
    }
  };
  function cover(c, large = false) {
    const item = caseCatalog[c.id] || {title:c.title,cover:c.subtitle,eyebrow:tags[c.id],detail:c.subtitle,kind:"type"};
    const media = item.media ? '<img class="case-cover-v3-media" src="'+esc(item.media)+'" alt="'+esc(item.alt)+'"'+(large?'':' loading="lazy"')+' decoding="async">' : "";
    const picture = ["photo","product"].includes(item.kind);
    const caption = item.kind === "number"
      ? '<strong class="case-cover-v3-number">'+esc(item.cover)+'</strong><span>'+esc(item.detail)+'</span>'
      : '<strong class="case-cover-v3-headline">'+esc(item.cover)+'</strong><span>'+esc(item.detail)+'</span>';
    return '<div class="project-cover case-cover-v3 case-cover-v3--'+esc(c.id)+' case-cover-v3--'+esc(item.kind)+' '+(picture?'has-case-media':'has-case-type')+'">'
      +media+'<div class="case-cover-v3-overlay" aria-hidden="true"></div>'
      +'<div class="case-cover-v3-top"><span>'+esc(item.eyebrow)+'</span><span>CASE '+esc(c.no)+'</span></div>'
      +'<div class="case-cover-v3-main">'+caption+'</div>'
      +'</div>';
  }
  function card(c) {
    const item = caseCatalog[c.id] || {};
    const lead = window.PORTFOLIO_SELECTED_WORK?.[c.id];
    return '<article class="case-card case-card-editorial" data-case-id="'+esc(c.id)+'">'
      +'<a class="cover-link" href="#/case/'+esc(c.id)+'" aria-label="阅读'+esc(item.title||c.title)+'">'+cover(c)+'</a>'
      +'<div class="case-card-body"><div class="card-meta"><span>'+esc(tags[c.id])+'</span></div>'
      +'<h3>'+link(c.id,esc(item.title||c.title))+'</h3><p>'+esc(item.intro||c.role)+'</p>'
      +'<div class="case-card-result"><strong>'+esc(item.fact||lead?.highlight||c.subtitle)+'</strong><a href="#/case/'+esc(c.id)+'/'+esc(lead?.chapter||"insight")+'">查看案例 ↗</a></div></div></article>';
  }
  // Editorial copy on primary reading surfaces; source definitions stay available in evidence details.
  const readerWindow = (m) => {
    const raw = String(m.window || "");
    if (["impressions", "engagements"].includes(m.id)) return "2025 年 Meta 阶段数据";
    if (m.id === "group-members") return "Facebook Group 成员规模快照";
    if (m.id === "group-growth-1k") return "社群增长记录";
    if (m.id === "group") return "社群单阶段新增记录";
    if (/未注明|待核|未完整|具体起止|截图未显示|不确定|未知/.test(raw)) return "";
    return raw.replace(/（简历记录）|（字段待确认）/g, "").replace(/历史阶段；?/g, "").trim();
  };
  const caseResultCopy = {
    gtm: "参与四条产品线的卖点分层与传播内容策划；M3 项目展示五月上市 Campaign 策划、英文 Brief 与传播排期。",
    social: "2025 年 Meta 内容曝光 96.5 万次、互动 3.7 万次。通过季度主题、月度内容规划和跨平台运营机制，持续优化品牌传播与社群参与。",
    community: "围绕教程、清洁挑战和 UGC 分享持续运营美国 Facebook Group。现有成员规模快照为 4,009 人，另有超过 1,000 人的阶段增长记录与单阶段新增 227 人。",
    brand: "形成品牌屋、产品传播视觉、联合营销主视觉及北美新闻稿分发素材，让不同内容触点围绕清晰的品牌主张与产品任务展开。",
    operations: "负责季度主题、月度内容日历、社媒创意和脚本审核，跟进素材制作、版本确认与发布计划。",
    b2b: "海外客户开发任期内，月均触达潜客超过 100 人，线索转化约 3%，月度成交额约 30 万元；同步参与展会营销与销售资料优化。",
    seo: "围绕搜索需求规划内容架构与页面分工，协同产品教育、社媒及邮件内容；参与北美家庭清洁主题新闻稿传播，分发记录见品牌案例。",
    amazon: "参与 Amazon 店铺从 0 到 1 的商品、广告和经营管理，阶段销售额约增长 10%、转化率约提升 5%，结合库存、广告和售后数据调整经营重点。",
    creative: "负责节庆品牌影片、演示短视频及 Creator 内容的创意策划、脚本、画面审核和渠道适配。",
    crm: "策划节庆英文邮件、用户分组及购物旅程中的触发和退出规则，连接 Shopify 商品与内容信息。",
    creator: "负责美国 Creator 的筛选、邀约、议价、寄样和脚本审核，跟进内容交付与素材许可。",
  };
  const caseExamples = {"gtm":[["gtm/gtm-positioning-decision","M3 产品定位与卖点"],["gtm/launch-delivery","传播排期与英文 Brief"]],"social":[["social/social-data-decisions","社媒增长与内容分析"],["social/fathers-day-calendar","父亲节内容日历"]],"community":[["community/community-event-governance","社群互动与 UGC"]],"brand":[["brand/seasonal-creative-gallery","品牌屋及联合活动视觉"],["brand/promotion-campaign-kv","节庆促销 KV"]],"operations":[["operations/operations-control","季度规划、月历与制作 Brief"],["operations/asset-review","创意审核与交付"]],"b2b":[["b2b/expo-project","展会现场与物料"],["b2b/expo-material-delivery","展位策划与客户需求"]],"seo":[["seo/seo-topic-cluster-map","搜索主题与内容架构"],["seo/seo-pr-extension","PR 新闻稿传播"]],"amazon":[["amazon/amazon-priority","Amazon 广告和经营分析"]],"creative":[["creative/video-projects","品牌影片和 Creator 视频"],["creative/creative-production-scope","脚本、镜头与视频审核"]],"crm":[["crm/crm-handoff","母亲节 EDM 与用户旅程"],["crm/crm-platform-handoff","邮件流程与数据"]],"creator":[["creator/creator-assessment","创作者筛选与匹配"],["creator/creator-cooperation-brief","合作 Brief 与授权"]]};
  const relatedCaseLinks = {"gtm":[["brand/brand-positioning","品牌屋与定位"],["creative/video-projects","视频制作"]],"social":[["operations/operations-control","社媒团队管理"],["community/community-event-governance","社群运营"]],"community":[["social/social-data-decisions","社媒增长分析"],["creator/partner-handoff","创作者合作"]],"brand":[["gtm/campaign-architecture","IMC Campaign 策划"],["creator/partner-handoff","Creator 业务合作"]],"operations":[["social/social-data-decisions","社媒内容策略"],["creative/video-projects","视频创意"]],"b2b":[["brand/pr-project","PR 传播"],["amazon/amazon-priority","商业经营"]],"seo":[["brand/pr-project","PR 新闻稿"],["crm/crm-handoff","邮件与生命周期"]],"amazon":[["b2b/expo-project","海外 B2B"],["gtm/gtm-value-to-launch","产品价值传播"]],"creative":[["brand/promotion-campaign-kv","促销 Campaign KV"],["creator/creator-cooperation-brief","Creator 内容合作"]],"crm":[["seo/seo-topic-cluster-map","SEO 内容策划"],["brand/promotion-campaign-kv","节庆活动视觉"]],"creator":[["creative/video-projects","视频与场景实拍"],["brand/pr-project","PR 与外部传播"]]};
  const readerManagement = {
    gtm: ["我负责社媒内容计划、创意 Brief 与物料审核，对接产品、设计、视频及各商业渠道所需的产品信息和素材。", "以首周内容与链接表现定位传播断点，再结合月度订单、售后和用户反馈决定下阶段内容重点。"],
    social: ["我负责季度主题、月度社媒日历和小组交付，协调设计、视频与产品同事完成多平台内容。", "比较不同内容类型的曝光、互动与链接表现，把高频问题带回 FAQ、视频脚本和下月选题。"],
    community: ["结合社群成员的使用问题设计教程、投票和 UGC 互动，与产品及内容团队整理后续回应。", "按成员规模、实际查看、讨论参与及内容投稿分别观察社群经营效果。"],
    brand: ["围绕统一品牌主张，我参与品牌故事、视觉素材和产品传播内容审核，并协调社媒、PR、Creator 与合作活动素材。", "从品牌信息一致性、已发布传播内容和用户反馈三个角度整理下一轮品牌传播方向。"],
    operations: ["按季度和月度主题安排内容任务，协调产品、设计、视频与电商接口；对创意、产品事实和平台规格逐项验收。", "通过返工记录和周月复盘，把常见问题转成明确的画面检查项、Brief 和下期排期。"],
    b2b: ["根据客户类型和采购场景安排搜索、社媒与邮件触达，协同展会物料、询盘、报价和后续销售跟进。", "重点复盘有效客户回应、商机推进和成交质量，将采购疑问反馈到产品资料和下一轮市场沟通。"],
    seo: ["围绕用户搜索问题规划主题指南、FAQ、商品页与邮件选题，同步产品、内容和站点信息。", "将 GSC 的查询与页面表现用于评估内容覆盖，并与自然搜索收入结构分开观察。"],
    amazon: ["统筹 Listing、A+、PPC、促销与库存节奏，协调设计、广告、商品和售后环节。", "先判断问题来自搜索流量、页面说服力还是履约体验，再选择关键词、素材和广告优化。"],
    creative: ["围绕受众、信息点与产品动作安排脚本、分镜和画面审核，协调产品事实、制作流程和平台交付。", "分别观察开场吸引力、动作表达和用户反馈，调整后续剪辑、字幕及画面顺序。"],
    crm: ["连接用户状态、内容主题与邮件沟通路径，规划触达节奏、受众排除和不同阶段的信息。", "关注邮件点击、退订、顾客状态与后续访问，让生命周期信息与商品页、社媒内容持续对应。"],
    creator: ["按市场和内容风格筛选创作者，明确 Brief、产品演示、初稿审核与素材版本交接。", "依据交付质量、受众匹配及素材使用许可，决定哪些内容适合后续品牌传播。"],
  };
  function hasPublishableMetric(m) {
    if (!m || m.status === "PENDING" || !m.display || /待补|待核|暂无|未提供/.test(m.display)) return false;
    const numeric = typeof m.value === "number" && Number.isFinite(m.value);
    const range = Array.isArray(m.range) && m.range.length === 2 && m.range.every((x) => typeof x === "number" && Number.isFinite(x));
    return numeric || range;
  }
  function metricCard(m) {
    const period = readerWindow(m);
    const visiblePeriod = /^(历史阶段数据|社群增长记录)$/.test(period) || !period ? "" : `<small>${esc(period)}</small>`;
    return `<button class="metric" data-evidence="${esc(m.id)}"><strong>${esc(m.display)}</strong><span>${esc(m.label)}</span>${visiblePeriod}<span class="metric-source">查看数据详情 ↗</span></button>`;
  }
  const featured = window.PORTFOLIO_SELECTED_WORK;
  const homeRoutes = [
    ["01","GTM / 新品上市","从家庭清洁任务选择主推卖点，安排产品证明、上市节奏与多渠道物料。","#/case/gtm/gtm-value-to-launch","M3 上市策略与跨团队排期"],
    ["02","IMC / Campaign","把一个 Campaign 主张拆为 Social、Paid、PR / Creator、EDM 与商品页各自的任务。","#/case/gtm/campaign-architecture","Campaign 品牌屋与八条传播工作流"],
    ["03","Brand / Insight","从清洁场景与用户疑问出发，组织品牌价值、产品线定位与多触点内容。","#/case/brand/brand-positioning","品牌屋 · PR · 联合活动"],
    ["04","Project / Delivery","负责社媒小组的季度主题、月度日历、项目排期及创意审核。","#/case/operations/asset-review","月度计划 · Brief · 物料验收"],
    ["05","Social / Growth","以季度主题和月度内容机制运营多个平台，并把内容互动与链接行为用于复盘。","#/case/social/social-data-decisions","96.5 万曝光 · 3.7 万互动"],
    ["06","视频创意与 KOL 内容","围绕品牌影片、节庆传播与 Creator 产品演示组织脚本、镜头及内容审核。","#/case/creative/video-projects","节庆叙事 · 产品演示 · Creator 内容"],
    ["07","海外展会策划","参与海外储能展会的展位规划、品牌物料准备、现场产品介绍和客户需求跟进。","#/case/b2b/expo-project","展会策划 · 海外客户开发"],
    ["08","SEO / Content / PR","从用户搜索问题组织内容主题与页面分工，协同产品教育与品牌新闻稿传播。","#/case/seo/seo-case-overview","内容架构 · 渠道协同 · 北美 PR"],
  ];

  function featuredCard(id, item) {
    const image = item.image ? `<img src="assets/projects/${item.image}.${item.imageExt || "webp"}" alt="${esc(item.alt)}" loading="lazy" decoding="async">` : "";
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
        <div><p class="eyebrow">黄文琳 · 个人作品集</p><h1 id="home-title">海外品牌营销<br><em>产品上市与整合传播</em></h1>
        <p class="profile-direction">${esc(P.profile.direction)}</p>
        <p class="hero-summary">${esc(P.profile.summary)}</p>
        <div class="actions"><a class="btn" href="#/home/jd-case-path">先看核心案例 ↘</a><a href="#/case/creative/video-projects">查看视频与创意案例 ↗</a><a href="#/experience">工作经历</a></div></div>
        <nav class="featured-nav" aria-label="代表项目"><h2>重点项目直达</h2>${Object.entries(featured).map(([id, item]) => `<a href="#/case/${id}"><div><strong>${item.title}</strong><span>${item.label}</span></div><span class="featured-arrow" aria-hidden="true">↗</span></a>`).join("")}</nav>
      </section>

      <section class="career-showcase" id="career-showcase" aria-labelledby="career-showcase-heading">
        <header class="career-showcase-heading"><div><span>SELECTED PROJECTS / 核心案例</span><h2 id="career-showcase-heading">重点项目</h2></div><a href="#/cases">查看全部 11 个项目 ↗</a></header>
        <div class="career-showcase-grid">
          <a class="career-spotlight" href="#/case/gtm/gtm-positioning-decision">
            <div class="career-spotlight-hero">
              <div class="career-spotlight-copy"><small>01 / PRODUCT MARKETING · GTM</small><h3>M3 新品上市<br>策略与传播排期</h3><p>餐后硬地任务 → 产品价值与证明 → 视觉创意 → 渠道协作</p><span class="career-view">打开上市策略与排期 ↗</span></div>
              <img src="assets/projects/m3-yellow-main.webp" alt="M3 黄色双盘拖把主视觉" loading="lazy" decoding="async">
            </div>
            <div class="career-stage-strip" aria-label="五月上市传播的五阶段规划"><span><b>01</b>市场判断</span><span><b>02</b>卖点与 Brief</span><span><b>03</b>创意交付</span><span><b>04</b>渠道放行</span><span><b>05</b>复盘</span></div>
            <div class="career-spotlight-foot"><strong>2026.05 / LAUNCH PLAN</strong><span>五个传播阶段 · 六条协作工作流</span></div>
          </a>
          <div class="career-side-projects">
            <a href="#/case/brand/brand-positioning" class="career-side-card career-side-creative">
              <div class="career-side-photo"><img src="assets/projects/brand-house.webp" alt="品牌屋与传播主张" loading="lazy" decoding="async"></div>
              <div><small>02 / BRAND & IMC</small><h3>品牌定位与整合传播</h3><p>品牌屋、信息层级、Campaign 与传播素材</p><span>查看品牌策略 ↗</span></div>
            </a>
            <a href="#/case/operations/asset-review" class="career-side-card career-side-operations">
              <div><small>03 / MANAGEMENT & DELIVERY</small><h3>社媒排期与素材审核</h3><p>季度主题 · 月度排期 · 内容审核 · 跨部门协作</p></div>
              <div class="career-mini-flow" aria-label="内容交付过程"><span>Brief</span><i>→</i><span>Review</span><i>→</i><span>Release</span></div>
              <div class="career-operations-link">查看真实素材返工与协作 ↗</div>
            </a>
          </div>
        </div>
      </section>
      <section class="home-summary results-band" aria-label="Meta 阶段数据"><div><h2>Meta 社媒表现</h2><p>2025 年 · 品牌内容与社媒增长</p><a href="#/case/social/results">查看 Meta 传播结果 ↗</a></div><div class="home-metrics">${["impressions", "engagements"].map((id) => metricCard(metric(id))).join("")}</div></section>
    </div></div><div class="wrap">
      <section class="section home-decision-section" id="jd-case-path" aria-labelledby="jd-case-path-title">
        <div class="section-head"><div><p class="eyebrow">重点工作 / 项目案例</p><h2 id="jd-case-path-title">新品上市、品牌传播与社媒团队管理</h2></div><a href="#/cases">查看 11 个项目案例 ↗</a></div>
        <div class="home-decision-grid">
          <a href="#/case/brand/brand-positioning"><small>01 / INSIGHT</small><h3>市场与用户判断</h3><p>从真实清洁任务、产品资料及用户问题识别传播机会，整理四条产品线的价值重点。</p><span>品牌屋与产品线定位 ↗</span></a>
          <a href="#/case/gtm/campaign-architecture"><small>02 / STRATEGY</small><h3>GTM 与 Campaign 策划</h3><p>围绕 M3 餐后硬地场景规划上市节奏、Campaign 主题、渠道内容与交付节点。</p><span>M3 Campaign 品牌屋 ↗</span></a>
          <a href="#/case/operations/asset-review"><small>03 / DELIVERY</small><h3>团队协作与项目推进</h3><p>直接管理社媒内容小组，协调产品、视觉、视频和电商；用内容日历和交付记录说明分工与审核。</p><span>社媒内容日历与团队协作 ↗</span></a>
          <a href="#/case/social/social-data-decisions"><small>04 / RESULTS</small><h3>传播结果与优化动作</h3><p>2025 年 Meta 内容曝光 96.5 万、互动 3.7 万次；结合实际表现安排后续选题和渠道动作。</p><span>2025 Meta 数据与社媒复盘 ↗</span></a>
        </div>
        <nav class="home-visual-jumps" aria-label="直接查看 GTM 和 Campaign 关键可视化">
          <span>项目图解 / QUICK VIEW</span>
          <a href="#/case/gtm/campaign-architecture">Campaign 策略</a>
          <a href="#/case/gtm/gtm-visual-schedule">五月上市排期</a>
          <a href="#/case/gtm/gtm-channel-orchestration">跨渠道协作</a>
          <a href="#/case/gtm/campaign-mechanism-mapping">三条创意主线</a>
          <a href="#/case/gtm/market-adaptation">美英本地化</a>
        </nav>
      </section>
      <section class="section home-route-section" id="strategy-map" aria-labelledby="strategy-map-title">
        <div class="section-head"><div><p class="eyebrow">SELECTED PRACTICE / 项目导航</p><h2 id="strategy-map-title">按项目主题浏览</h2></div><a href="#/cases">查看所有案例 ↗</a></div>
        <p class="home-route-intro">上市策略 · Campaign 创意 · 品牌视觉 · SEO / PR · 社媒增长 · 团队管理与展会</p>
        <div class="home-route-grid">${homeRoutes.map(([no, title, note, href, evidence]) => `<a class="home-route-card" href="${href}"><span class="home-route-index">${no} / ${title}</span><p>${note}</p><strong>${evidence} <span aria-hidden="true">↗</span></strong></a>`).join("")}</div>
      </section>
      <section class="home-proof-bridge" aria-label="跨项目阶段数据入口">
        <a href="#/data/community"><small>美国 Facebook Group · 成员快照</small><strong>${esc(metric("group-members").display)}</strong><span>查看社群规模与参与表现 ↗</span></a>
        <a href="#/data/b2b"><small>瑞音博 · 任期内 Facebook 账号</small><strong>${esc(metric("fb-follower-scale").display)}</strong><span>查看海外 B2B 社媒增长成果 ↗</span></a>
        <a href="#/case/creative/video-projects"><small>节庆品牌传播与 KOL 内容</small><strong>视频创意 · 产品演示 · KOL 内容</strong><span>感恩节 / 圣诞节 Campaign 与产品使用 ↗</span></a>
      </section>
      <section class="section featured-section" id="selected-work" aria-labelledby="featured-title"><div class="section-head"><h2 id="featured-title">代表项目</h2><a href="#/cases">全部 ${P.cases.length} 个案例 ↗</a></div><div class="featured-grid">${Object.entries(featured).map(([id, item]) => featuredCard(id, item)).join("")}</div></section>
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
    const visualStoryboard = {
      social: { tag:"SOCIAL / CONTENT ENGINE", headline:"季度主题、月度日历与社媒表现", steps:[["PLAN","季度主题与渠道分工"],["MAKE","月历、创意与团队审核"],["LEARN","内容表现与社群反馈"]], end:"Content → Community → Learning" },
      community: { tag:"COMMUNITY / PARTICIPATION", headline:"Facebook Group 社群参与", steps:[["JOIN","问题与规则入口"],["SHARE","教程、经验与互动"],["RETURN","反馈整理和后续答疑"]], end:"Conversation → UGC → Feedback" },
      operations: { tag:"TEAM / DELIVERY SYSTEM", headline:"社媒小组排期与素材审核", steps:[["BRIEF","明确主题与制作标准"],["REVIEW","产品事实和画面验收"],["DELIVER","版本交接与复盘"]], end:"Owner → Review → Handoff" },
      seo: { tag:"SEARCH / CONTENT JOURNEY", headline:"搜索主题与内容集群", steps:[["QUERY","识别高意图问题"],["PILLAR","主指南连接专题"],["ACTION","FAQ 与商品信息承接"]], end:"Search → Answer → Next step" },
      amazon: { tag:"COMMERCE / OPERATING LOOP", headline:"Amazon 商品、广告与经营表现", steps:[["TRAFFIC","关键词与广告流量"],["PAGE","Listing 与价值证明"],["DELIVERY","库存、售后与复盘"]], end:"Discover → Decide → Deliver" },
      crm: { tag:"LIFECYCLE / MESSAGE PATH", headline:"Welcome、加购与购后邮件", steps:[["STATE","区分浏览、加购与购买"],["RULE","许可、频次与排除"],["HANDOFF","内容、售后与下一步"]], end:"Consent → Relevance → Timing" },
      creator: { tag:"CREATOR / COLLABORATION", headline:"Creator 合作、交付与授权", steps:[["SELECT","受众与内容适配"],["PROVE","真实演示与脚本审核"],["RIGHTS","版本、用途与复用权限"]], end:"Brief → Review → Usage rights" }
    }[c.id];
    const image = c.id === "brand"
      ? `<div class="case-story-visual case-story-pair" aria-label="品牌屋与整合传播工作物">
          <a href="#/case/brand/brand-positioning" aria-label="查看品牌定位与品牌屋"><img src="assets/projects/brand-house.webp" alt="匿名品牌屋与信息架构" loading="lazy" decoding="async"><span>BRAND HOUSE / STRATEGY</span></a>
          <a href="#/case/brand/seasonal-creative-gallery" aria-label="查看品牌合作与视觉素材"><img src="assets/projects/joint-giveaway.webp" alt="品牌联合活动视觉素材" loading="lazy" decoding="async"><span>BRAND ACTIVATION / CREATIVE</span></a>
        </div>`
      : c.id === "b2b"
      ? `<figure class="case-story-visual"><img src="assets/projects/exhibition-booth-overview-redacted.jpg" alt="海外 B2B 储能展会展位现场照片" loading="lazy" decoding="async"><figcaption>EXHIBITION / ON SITE</figcaption></figure>`
      : c.id === "creative"
      ? `<figure class="case-story-visual"><img src="assets/projects/holiday-scene-1.webp" alt="节庆视频内容与家庭清洁情景画面" loading="lazy" decoding="async"><figcaption>CAMPAIGN / FULL FILM</figcaption></figure>`
      : item.image
      ? `<figure class="case-story-visual"><img src="assets/projects/${esc(item.image)}.${esc(item.imageExt || "webp")}" alt="${esc(item.alt || item.title || c.title)}" loading="lazy" decoding="async"><figcaption>${esc(c.category)}</figcaption></figure>`
      : visualStoryboard
      ? `<div class="case-story-visual case-story-diagram case-story-diagram-${esc(c.id)}" role="img" aria-label="${esc(visualStoryboard.headline)}">
          <div class="case-diagram-top"><small>${esc(visualStoryboard.tag)}</small><strong>${esc(visualStoryboard.headline)}</strong></div>
          <div class="case-diagram-steps">${visualStoryboard.steps.map(([label,note],i)=>`<div class="case-diagram-step"><i>0${i+1}</i><b>${esc(label)}</b><span>${esc(note)}</span></div>`).join("")}</div>
          <div class="case-diagram-end">${esc(visualStoryboard.end)}</div>
        </div>`
      : `<div class="case-story-identity" aria-hidden="true"><span>CASE</span><strong>${esc(c.no)}</strong><small>${esc(c.subtitle)}</small></div>`;
    const firstResult = c.metrics.map(metric).find(hasPublishableMetric);
    return `<section class="g-case-overview case-story-lead case-story-${esc(c.id)}" aria-label="项目速览">
      <div class="case-story-primary">
        <div class="case-story-copy"><small>SELECTED WORK / CASE ${esc(c.no)}</small><h2>${esc(c.title)}</h2><p>${esc(item.role)}</p>
          <span class="case-story-category">${esc(c.category)}</span></div>
        ${image}
      </div>
      <div class="case-story-judgement"><span>01 / STRATEGIC DECISION</span><h2>为什么这样做</h2><p>${esc(item.decision)}</p></div>
      <div class="case-story-deliverables"><span>02 / WORK & DELIVERY</span><h2>怎样组织交付</h2><p>${esc(item.output)}</p></div>
      <div class="case-story-foot">
        <a href="#/case/${c.id}/${item.chapter}">${esc(item.artifact)} <span aria-hidden="true">↗</span></a>
        ${firstResult ? `<div class="case-story-evidence"><strong>${esc(firstResult.display)}</strong><span>${esc(firstResult.label)}</span></div>` : `<small>PROJECT / ${esc(c.subtitle)}</small>`}
        ${c.id === "social" ? '<a class="case-story-secondary" href="#/data/social">社媒结果 ↗</a>' : ""}
      </div>
    </section>`;
  }
  function listPage() {
    return `<div class="wrap page"><p class="eyebrow">THE WORK / 案例索引</p><h1>项目案例</h1><p class="lede">产品上市、品牌传播、社媒增长、团队管理与海外 B2B。</p>
      <section class="campaign-index-spotlight" aria-labelledby="campaign-index-title">
        <div class="campaign-index-intro"><small>SELECTED CAMPAIGN WORK / HOLIDAY CREATIVE</small><h2 id="campaign-index-title">节庆促销视觉与营销内容</h2>
          <p>Black Friday 与 Father’s Day 创意原稿 · Mother’s Day 邮件策划。</p>
          <a href="#/case/brand/promotion-campaign-kv">查看 Campaign KV 与渠道应用 ↗</a>
        </div>
        <div class="campaign-index-preview">
          <a href="#/case/brand/promotion-original-black" aria-label="查看 Black Friday 促销 KV"><img src="assets/projects/black-friday-suite-concept.jpg" alt="原有黑五黑金组合产品促销 KV" loading="lazy"><span>BLACK FRIDAY / ORIGINAL</span></a>
          <a href="#/case/crm/crm-campaign-email-plan" aria-label="查看 Mother's Day EDM 策划"><img src="assets/projects/pr-home-scene.webp" alt="母亲节邮件策划所用家庭场景素材" loading="lazy"><span>MOTHER'S DAY / EDM</span></a>
          <a href="#/case/brand/promotion-original-father" aria-label="查看 Father's Day 家庭主题 KV"><img src="assets/projects/fathers-day-bbq-concept.jpg" alt="原有父亲节 BBQ 产品场景促销 KV" loading="lazy"><span>FATHER'S DAY / ORIGINAL</span></a>
        </div>
      </section><section class="filters" aria-label="案例筛选"><div class="filter-row">${["全部", "策略与上市", "传播与合作", "团队与交付", "商业与生命周期"].map((x) => `<button class="chip" data-filter="${x}" aria-pressed="${x === filter}">${x}</button>`).join("")}</div><label>搜索案例 <input type="search" id="case-search" placeholder="如 PMM、PR、品牌" value="${esc(query)}"></label><span id="filter-count" role="status"></span></section><div class="visual-grid" id="case-list"></div></div>`;
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
    return `<ol class="strategy-flow" aria-label="${esc(c.subtitle)}策略流程">${names[c.id].map((n, i) => `<li><span>0${i + 1}</span><h3>${esc(P.caseNarratives[c.id]?.stages[i]?.title || n)}</h3><p>${esc(P.caseNarratives[c.id]?.stages[i]?.detail || P.caseNarratives[c.id]?.stages[i]?.body || ["确定目标与内容需求", "明确选择依据及优先级", "记录负责人、依赖与验收条件", "核对事实、权限并明确下一步"][i])}</p></li>`).join("")}</ol>`;
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
        "综合合作目标、目标市场、受众匹配度、内容质量与互动表现筛选创作者。",
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
        "分别核验平台、地域、期限、用途、付费推广、改编、署名与撤回权限。",
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
      <article><h3>组织与协作</h3><p>${esc(readerManagement[c.id]?.[0] || focus.handoff)}</p></article>
      <article><h3>复盘与下一步</h3><p>${esc(readerManagement[c.id]?.[1] || focus.review)}</p></article>
    </div>`;
  }
  function casePage(c) {
    const sections = [
      ["background", "Background", "项目背景"],
      ["insight", "Insight", "洞察与判断"],
      ["strategy", "Strategy", "策略选择"],
      ["execution", "Execution", "执行与工作物"],
      ["management", "Team & Delivery", "我的协作"],
      ["results", "Results", c.metrics.map(metric).some(hasPublishableMetric) ? "项目成果" : "工作成果"],
      ["evidence", "Related Work", "相关项目"],
    ];
    const metrics = c.metrics.map(metric).filter(hasPublishableMetric);
    const resultsLabel = metrics.length ? "项目成果" : "工作成果";
    return `<div class="wrap page case-page case-page-${esc(c.id)}"><a class="text-link" href="#/cases">← 返回案例索引</a><div class="case-title"><div><p class="eyebrow">CASE ${c.no} / ${tags[c.id]}</p><h1>${esc(featured[c.id]?.title || c.title)}</h1></div>${featured[c.id] ? "" : `<p class="case-scope">${esc(c.role)}</p>`}</div>${caseOverview(c)}<nav class="case-tabs" aria-label="案例章节">${sections.map(([chapter, , label]) => `<a href="#/case/${c.id}/${chapter}">${label}</a>`).join("")}</nav>${featured[c.id] ? "" : cover(c, true)}<section id="background" class="case-section"><div class="chapter-label">01 / Background</div><div><h2>项目背景</h2><p>${esc(c.problem)}</p></div></section><section id="insight" class="case-section"><div class="chapter-label">02 / Insight</div><div><h2>从问题到判断</h2><p>${esc(c.decision)}</p></div></section><section id="strategy" class="case-section"><div class="chapter-label">03 / Strategy</div><div><h2>策略结构</h2><p>${esc(c.plan)}</p>${flow(c)}${["gtm", "brand"].includes(c.id) ? brandHouse() : ""}</div></section><section id="execution" class="case-section"><div class="chapter-label">04 / Execution</div><div><h2>执行与工作物</h2><p>${esc(c.execution)}</p>${c.id === "creator" ? rights() : `<div class="deliverable-grid">${names[c.id].map((n, i) => `<article><span>工作内容 / 0${i + 1}</span><h3>${n}</h3><p>${workDetails[c.id][i]}</p></article>`).join("")}</div>`}${["gtm", "brand", "creative"].includes(c.id) ? `<a class="btn secondary" href="#/case/${c.id}/${c.id === "gtm" ? "gtm-positioning-decision" : c.id === "brand" ? "seasonal-creative-gallery" : "video-projects"}">${c.id === "creative" ? "查看视频创意案例" : c.id === "gtm" ? "查看 M3 产品定位与卖点" : "查看项目视觉素材"} ↗</a>` : ""}</div></section><section id="management" class="case-section"><div class="chapter-label">05 / Team & Delivery</div><div><h2>职责与跨部门协作</h2>${management(c)}</div></section><section id="results" class="case-section"><div class="chapter-label">06 / Results</div><div><h2>${resultsLabel}</h2><p>${esc(caseResultCopy[c.id] || c.result)}</p><div class="result-grid">${metrics.map(metricCard).join("")}</div>${!metrics.length ? `<div class="case-work-samples">${(caseExamples[c.id]||[]).map(([slug,title]) => `<a href="#/case/${slug}">${esc(title)} ↗</a>`).join("")}</div>` : ""}${c.id === "social" ? metaSummary() : ""}</div></section><section id="evidence" class="case-section"><div class="chapter-label">07 / RELATED</div><div><h2>相关案例</h2><div class="case-related-links">${(relatedCaseLinks[c.id]||[]).map(([slug,title]) => `<a href="#/case/${slug}">${esc(title)} ↗</a>`).join("")}</div>${metrics.length ? `<p><a href="#/data/${metrics[0].domain}">查看阶段数据 ↗</a></p>` : ""}</div></section><div class="case-end">${link(P.cases[(P.cases.indexOf(c) + 1) % P.cases.length].id, "下一个案例")}<a href="#/cases">全部案例 ↗</a></div></div>`;
  }
  function metaSummary() {
    const ids = ["impressions", "engagements"];
    return `<section class="g-meta-summary" aria-label="Meta 社媒阶段汇总">
      <h3>Meta 社媒阶段汇总</h3>
      <div class="g-meta-metrics">${ids.map((id) => metricCard(metric(id))).join("")}</div>
      <button class="text-link" type="button" data-evidence="er">了解内容互动表现 ↗</button>
    </section>`;
  }
  function shareChart() {
    return `<figure class="share-chart"><div class="donut" role="img" aria-label="自然搜索收入份额 82.46%"><b>82.46%<small>收入份额</small></b></div><figcaption><h3>自然搜索渠道收入结构</h3><p>在站点渠道收入结构中，自然搜索占比为 82.46%；围绕高意图搜索组织 Blog、FAQ 与商品信息承接。</p></figcaption></figure>`;
  }
  function dataPage(domain) {
    const visibleDomains = Object.entries(P.domains).filter(([id]) => P.metrics.some((m) => m.domain === id && hasPublishableMetric(m)));
    const selected = visibleDomains.some(([id]) => id === domain) ? domain : "social",
      rows = P.metrics.filter((m) => m.domain === selected && hasPublishableMetric(m));
    return `<div class="wrap page"><p class="eyebrow">BUSINESS PERFORMANCE / 项目结果</p><h1>项目数据与增长表现</h1><p class="lede">按社媒、社群、搜索和商业经营查看项目阶段成果。</p><nav class="filter-row" aria-label="数据领域">${visibleDomains
      .map(
        ([id, n]) =>
          `<a class="chip ${id === selected ? "active" : ""}" href="#/data/${id}" ${id === selected ? 'aria-current="page"' : ""}>${n}</a>`,
      )
      .join(
        "",
      )}</nav>${selected === "social" ? metaSummary() : selected === "search" ? shareChart() : ""}<div class="data-kpis">${rows.map(metricCard).join("")}</div></div>`;
  }
  function simple(page) {
    if (page === "experience")
      return `<div class="wrap page"><p class="eyebrow">EXPERIENCE / CAREER</p><h1>工作经历</h1><p class="lede">海外品牌营销、社媒团队管理、产品上市传播、海外 B2B 获客与 Amazon 经营。</p><div class="career-list">${P.experiences.map((e) => `<article><time>${esc(e.date)}</time><div><small>${esc(e.title)}</small><h2>${esc(e.role)}</h2><p>${esc(e.body)}</p>${e.context ? `<p>${esc(e.context)}</p>` : ""}${e.work.length ? `<div class="actions">${e.work.map(([id, label]) => link(id, esc(label))).join("")}</div>` : ""}</div></article>`).join("")}</div></div>`;
    if (page === "capabilities") {
      const paths = {
        "Brand Strategy": [["#/case/brand/brand-positioning","品牌屋与传播项目"]],
        "Market & Customer Insight": [["#/case/gtm/gtm-positioning-decision","用户洞察与上市策略"]],
        "PMM / Value Proposition": [["#/case/gtm/gtm-value-to-launch","卖点分层与证明"]],
        "GTM / Launch Communications": [["#/case/gtm/launch-delivery","上市排期与交付"]],
        "IMC / Campaign Strategy": [["#/case/gtm/campaign-architecture","整合 Campaign 案例"]],
        "Earned Media / Creator": [["#/case/brand/pr-project","PR 与新闻稿"],["#/case/creator/partner-handoff","Creator 合作流程"]],
        "Social / Community": [["#/case/social/social-data-decisions","社媒内容与数据"],["#/case/community/community-event-governance","Facebook Group 运营"]],
        "Team & Project Delivery": [["#/case/operations/operations-content-calendar","月度内容日历"],["#/case/operations/asset-review","创意审核与交付"]],
        "Measurement & Decision": [["#/case/social/social-outcome-bridge","社媒经营表现"],["#/case/seo/seo-topic-cluster-map","SEO 内容架构与选题"]],
        "Commercial & Channel Operations": [["#/case/amazon/amazon-priority","Amazon 经营优化"],["#/case/b2b/expo-project","海外 B2B 与展会"]]
      };
      return `<div class="wrap page"><p class="eyebrow">CAPABILITIES / EXPERIENCE</p><h1>营销能力</h1><p class="lede">以下能力与对应项目直接关联，点击可查看具体工作内容。</p><div class="cap-list">${P.capabilities.map((c) => `<article><small>${esc(c[1])}</small><h2>${esc(c[0])}</h2><p>${esc(c[2])}</p><nav class="cap-links" aria-label="${esc(c[0])}相关案例">${(paths[c[1]] || []).map(([url,label]) => `<a class="cap-case-link" href="${url}">${esc(label)} ↗</a>`).join("")}</nav></article>`).join("")}</div></div>`;
    }
    if (page === "contact")
      return `<div class="wrap page"><p class="eyebrow">LET’S CONNECT</p><h1>联系黄文琳</h1><p class="lede">${esc(P.profile.direction)}</p><p>工作重点：${esc(P.profile.focus)}。联系方式以随投递简历提供的信息为准。</p><div class="section">${link("operations", "了解团队管理与项目交付")}</div></div>`;
    return `<div class="wrap page"><p class="eyebrow">HOW I WORK</p><h1>从品牌判断到项目交付</h1><p class="lede">以业务目标为起点，梳理市场机会、产品价值与传播任务，协调内容、创意和渠道团队将策略落地。</p><div class="cap-list"><article><h2>品牌与市场</h2><p>整理用户需求、市场与竞品信息，确定值得放大的核心价值与传播主张。</p><a href="#/case/brand">查看品牌传播案例 ↗</a></article><article><h2>上市与整合营销</h2><p>制定传播主题、阶段目标、内容矩阵与跨渠道项目节奏。</p><a href="#/case/gtm">查看 M3 上市方案 ↗</a></article><article><h2>内容与创意</h2><p>将用户场景和产品卖点转化为视频、视觉、社媒及 Creator 工作物。</p><a href="#/case/creative">查看创意作品 ↗</a></article><article><h2>团队与增长</h2><p>组织季度主题、月度日历、创意审核及数据复盘，协调多方按节点交付。</p><a href="#/case/operations">查看团队管理案例 ↗</a></article></div></div>`;
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
      const period = readerWindow(m);
      const meaningfulPeriod = /^(历史阶段数据|社群增长记录)$/.test(period) ? "" : period;
      const platform = String(m.platform || "").replace(/（口径待核）/g, "").replace(/，字段待核/g, "");
      $("#evidence-content").innerHTML =
        `<h2 id="evidence-title">${esc(m.label)}</h2><p class="evidence-number">${esc(m.display)}</p><dl>${[
          ["平台", platform],
          ...(meaningfulPeriod ? [["统计时间", meaningfulPeriod]] : []),
          ["指标定义", m.definition],
        ]
          .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
          .join("")}</dl><details class="evidence-method"><summary>数据出处</summary><dl>${[
          ["原始数据来源", m.source],
        ]
          .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
          .join("")}</dl></details>${link(m.caseId, "查看对应项目")}`;
      open("evidence-dialog", t);
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
