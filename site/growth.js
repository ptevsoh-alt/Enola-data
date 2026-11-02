(() => {
  "use strict";
  const P = window.PORTFOLIO,
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
  const m = (id) => P.metrics.find((x) => x.id === id);
  const evidence = (id) =>
    `<button class="g-evidence" data-evidence="${id}">定义、窗口与来源 ↗</button>`;
  const metric = (id) => {
    const x = m(id);
    return `<article class="g-kpi" data-growth-metric="${id}"><p>${esc(x.label)}</p><button data-evidence="${id}" aria-label="${esc(x.label)} ${esc(x.display)}，打开证据"><strong>${esc(x.display)}</strong></button><small>${esc(x.platform)} · ${P.statuses[x.status]}</small><p class="g-window">${esc(x.window)}</p>${evidence(id)}</article>`;
  };
  const header = (en, title, desc) =>
    `<div class="g-heading"><div><p class="eyebrow">${en}</p><h2>${title}</h2></div><p>${desc}</p></div>`;
  function homeSignal(id, note) {
    const x = m(id);
    return `<article class="g-home-signal" data-growth-metric="${id}">
      <span>${esc(x.platform)} · ${note}</span>
      <button type="button" data-evidence="${id}" aria-label="${esc(x.label)} ${esc(x.display)}，查看数据口径">
        <strong>${esc(x.display)}</strong>
        <b>${esc(x.label)}</b>
      </button>
      <small>${esc(x.window)}</small>
    </article>`;
  }
  function homeGrowthStory() {
    const signals = [
      ["engagement-change", "独立比较阶段"],
      ["ig-event-engagement-change", "独立活动阶段"],
      ["group", "独立社群阶段"],
    ];
    const stages = [
      {
        no: "01",
        label: "FOUNDATION / 账号起盘",
        title: "先明确平台任务，再搭建账号矩阵。",
        copy: "负责 Facebook、Instagram 品牌账号与美国 Facebook Group。Facebook 承接品牌信息和链接导流；Instagram 组织产品演示与活动内容；Group 承接交流和问题反馈。",
        proof: true,
      },
      {
        no: "02",
        label: "CONTENT SYSTEM / 内容体系",
        title: "用内容支柱和排期，稳定团队供给。",
        copy: "围绕产品演示、家庭清洁场景、教程与 FAQ、互动挑战、UGC 建立选题体系；季度定主题，月度排内容日历，周度审核脚本、视觉、产品事实与发布状态。",
      },
      {
        no: "03",
        label: "CAMPAIGN / 活动传播",
        title: "把主题内容拆成可协同的活动工作包。",
        copy: "围绕目标、用户洞察、Big Idea、参与机制、平台组合、素材、发布节奏与复盘指标组织活动；概念方案与历史活动数据分开展示，不做未经证实的活动归因。",
      },
      {
        no: "04",
        label: "COMMUNITY / 社群经营",
        title: "让用户参与和问题反馈回到内容计划。",
        copy: "通过教程、投票、清洁挑战、UGC 投稿和问题答疑建立参与入口；将高频问题整理为 FAQ 和下一轮选题，形成内容、社群与产品信息之间的反馈回路。",
      },
    ];
    return `<section class="g-module g-home-story" id="growth-story">
      ${header(
        "SOCIAL GROWTH / MANAGEMENT STORY",
        "从账号起盘，到内容与社群增长。",
        "2025.04–2026.09 担任社媒负责人 / 管理组长，负责 Facebook、Instagram 品牌账号与美国 Facebook Group 的内容策略和团队交付。",
      )}
      <div class="g-home-story-intro">
        <div class="g-home-owner">
          <span>ROLE / 管理职责</span>
          <h3>社媒负责人<br>管理组长</h3>
          <p>把平台分工、内容规划、跨团队制作、活动组织与数据复盘连接起来；协作社媒小组、产品、设计、视频、电商及 Creator / KOL。</p>
          <div class="g-home-owner-tags"><i>Facebook</i><i>Instagram</i><i>Facebook Group</i><i>Shopify 承接</i></div>
        </div>
        <div class="g-home-signals">
          ${signals.map(([id, note]) => homeSignal(id, note)).join("")}
        </div>
      </div>
      <div class="g-home-stage-grid">
        ${stages.map((s) => `<article class="g-home-stage">
          <span>${s.no} / ${s.label}</span>
          <h3>${s.title}</h3>
          <p>${s.copy}</p>
          ${s.proof ? `<div class="g-home-stage-proof">
            <strong>0 → 8K+</strong>
            <span>账号规模阶段记录 · 字段与日期待核</span>
            ${evidence("fb-size")}
          </div>` : ""}
        </article>`).join("")}
      </div>
      <div class="g-home-rhythm">
        <div>
          <span>MANAGEMENT RHYTHM / 管理节奏</span>
          <h3>季度定方向，月度排内容，周度管交付。</h3>
          <p>把策略转成明确的任务、负责人、素材依赖和审核节点。</p>
        </div>
        <div class="g-home-rhythm-items">
          <article><b>季度 / 主题规划</b><p>产品重点、用户问题、内容目标与资源优先级。</p></article>
          <article><b>月度 / 内容日历</b><p>平台、选题、形式、负责人、素材、CTA 与承接页面。</p></article>
          <article><b>周度 / 交付复盘</b><p>脚本、视觉、视频、事实、权限、链接与发布状态。</p></article>
        </div>
      </div>
      <p class="g-home-story-footnote">
        上方三项变化记录来自不同平台与统计阶段：Meta 互动比较阶段、Instagram 独立活动阶段、Facebook Group 独立新增阶段。它们不是同一时间序列，不作横向排名或活动归因；0→8K+ 的账号字段仍待核。
      </p>
    </section>`;
  }
  const socialSteps = [
    [
      "Social Media Foundation",
      "账号基础与矩阵搭建",
      "推动 Facebook、Instagram 品牌账号与美国 Facebook Group 的内容体系从 0 到 1；0→8K+ 账号规模记录的字段与起止日期待核。",
      "PENDING",
      true,
    ],
    [
      "Channel Positioning",
      "平台角色与渠道分工",
      "Facebook 承接品牌信息和链接导流；Instagram 组织产品视觉演示与活动内容；Group 承接用户交流和问题反馈。",
      "RECONSTRUCTED",
    ],
    [
      "Content Pillars",
      "建立内容支柱",
      "围绕产品演示、家庭清洁场景、教程与 FAQ、互动挑战、UGC 与用户反馈组织选题。",
      "RECONSTRUCTED",
    ],
    [
      "Editorial Calendar",
      "季度主题与月度日历",
      "季度确定主题与产品重点；月度安排选题、形式、负责人、素材、CTA 与站点承接；周度跟进制作与发布状态。",
      "RECONSTRUCTED",
    ],
    [
      "Cross-functional Delivery",
      "跨团队任务与质量管理",
      "协调社媒小组、产品、设计、视频、电商与 Creator / KOL；明确事实提供、制作、审核和发布分工。",
      "RECONSTRUCTED",
    ],
    [
      "Campaign Operations",
      "线上活动工作包",
      "将活动目标、用户洞察、Big Idea、参与机制、平台组合、素材、发布节奏和复盘指标拆成独立工作包。",
      "RECONSTRUCTED",
    ],
    [
      "Facebook Community",
      "Facebook Group 社群运营",
      "通过教程、投票、清洁挑战、UGC 与答疑组织参与；把高频问题整理为 FAQ 和下一轮内容选题。",
      "RECONSTRUCTED",
    ],
    [
      "Performance Review",
      "数据复盘与持续迭代",
      "分别查看展示、互动、链接点击与社群反馈；不把不同账号和统计窗口拼成增长曲线或成交归因。",
      "RECONSTRUCTED",
    ],
  ];
  const topics = [
    [
      "Topic-driven Discussion",
      "话题驱动",
      "你最想解决哪一类清洁问题？",
      "问题征集 → 评论归类 → 教程选题",
      "RECONSTRUCTED",
    ],
    [
      "Weekly Discussion",
      "周期讨论",
      "本周分享：一个让清洁更轻松的小方法。",
      "主题邀约 → 成员交流 → FAQ 沉淀；周频为方案节奏",
      "CONCEPT",
    ],
    [
      "UGC Collection",
      "用户内容征集",
      "分享一个清洁前后的使用场景，并说明条件。",
      "投稿 → 事实审核 → 单独授权 → 可用素材归档",
      "RECONSTRUCTED",
    ],
    [
      "Fan Product Reviews",
      "粉丝产品测评",
      "你会如何描述一次真实使用体验？",
      "邀请真实体验 → 保留限制与负面反馈 → 产品端确认",
      "CONCEPT",
    ],
    [
      "Community Challenges",
      "社群挑战",
      "选择一个小区域，记录你的清洁步骤。",
      "规则说明 → 自愿参与 → 讨论答疑 → 问题汇总",
      "RECONSTRUCTED",
    ],
    [
      "Sharing Incentives",
      "分享激励",
      "用内容贡献鼓励互助，而非承诺正面评价。",
      "激励规则、资格、许可和履约先确认；无已执行奖品或规模",
      "CONCEPT",
    ],
  ];
  const campaigns = [
    {
      id: "challenge",
      name: "清洁挑战 / UGC",
      kind: "RECONSTRUCTED",
      label: "参与机制重构",
      art: "challenge",
      objective: "围绕清洁问题建立自愿参与与讨论入口。",
      insight: "成员需要知道分享什么、如何参与，以及反馈会如何被使用。",
      idea: "一个小区域，一次可说明的清洁过程。",
      mechanism:
        "主题与规则 → 自愿投稿 → 审核与答疑 → 单独授权 → 内容与问题归档。",
      mix: "Group 讨论承接；Facebook 解释规则；Instagram 以场景演示发起邀请。",
      participation: "提交使用场景与条件；不要求正面评价，不默认取得商用权。",
      measurement:
        "分别查看成员新增、发帖评论人数与查看人数；原记录窗口不同，不据此归因活动效果。",
      note: "依据社群案例中的清洁挑战、教程、投票和 UGC 机制整理；此卡没有已核实的单场活动日期或成果。",
    },
    {
      id: "seasonal",
      name: "节日内容 / 场景叙事",
      kind: "CONCEPT",
      label: "概念内容方案",
      art: "03",
      objective: "以节日场景解释用户任务与产品价值。",
      insight: "以生活场景组织信息，需要同时保留产品条件与适用限制。",
      idea: "从节日后的真实清洁任务切入，展示解决路径。",
      mechanism: "场景开场 → 任务演示 → 可信说明 → 下一步入口。",
      mix: "概念主视觉、短视频分镜、FAQ 与站内承接页面。",
      participation: "可设置问题征集与经验分享；是否执行及具体规则待确认。",
      measurement: "方案未提供执行记录；没有可核验的播放、参与或转化结果。",
      note: "复用已标注的概念视觉；不是历史已发布活动或执行成果。",
    },
    {
      id: "collab",
      name: "品牌联合传播 / 交付框架",
      kind: "CONCEPT",
      label: "合作方法示意",
      art: "collab",
      objective: "在共同受众与真实价值交换基础上设计协同传播。",
      insight: "合作双方需要先确认受众匹配、产品事实、资产权限与退出条件。",
      idea: "共同用户任务，一致的事实，不同渠道表达。",
      mechanism: "适配判断 → 双方 Brief → 权责与授权 → 联合审核 → 发布与复盘。",
      mix: "品牌主视觉、事实包、双方渠道版本和承接入口；发布许可待确认。",
      participation: "参与资格与用户内容许可需单独设计，不承诺未确认的权益。",
      measurement:
        "暂无可核验的品牌合作方、联名发布或商业贡献，展示范围仅为方法。",
      note: "并非已完成品牌合作案例；不填造合作品牌、预算、刊发或销售成果。",
    },
  ];
  function pathSteps(items) {
    return `<ol class="g-path">${items.map((x, i) => `<li><span>0${i + 1}</span><b>${x[0]}</b><p>${x[1]}</p></li>`).join("")}</ol>`;
  }
  function b2bStage() {
    const x = m("fb-follower-scale");
    return `<section class="g-stage-grid g-b2b-stage">
      <article class="g-stage-card">
        <p class="eyebrow">B2B / FACEBOOK AUDIENCE</p>
        <h3>任期内的粉丝规模记录</h3>
        <div class="g-endpoints">
          <span><b>${esc(x.comparisonValues.start)}</b><small>任职早期记录</small></span>
          <i aria-hidden="true">→</i>
          <span><b>${esc(x.comparisonValues.end)}</b><small>任职后期记录</small></span>
        </div>
        <p>${esc(x.window)}</p>
        <p>此项属于 B2B 任期账号，不与海外消费品牌社媒矩阵合并；账号范围和采样日期未注明，不反算净增量或增长率。</p>
        ${evidence("fb-follower-scale")}
      </article>
    </section>`;
  }
  function facebookSnapshot() {
    const ids = [
      "fb-views",
      "fb-content-interactions",
      "fb-link-clicks",
      "fb-visits",
      "fb-follows",
    ];
    return `<section class="g-snapshot-chart" aria-label="Facebook 页面关键数据">
      ${header(
        "FACEBOOK PAGE / 后台截图记录",
        "Facebook 页面关键数据",
        "浏览量、互动次数、链接点击、页面访问和关注次数分别呈现。每项数据保留自己的变化记录，不把不同指标放在同一尺度上比较。",
      )}
      <div class="g-snapshot-grid">${ids
        .map((id) => {
          const x = m(id);
          const change = x.changeDisplay
            ? `<div class="g-snapshot-change">
                <span>后台显示变化</span>
                <strong>${esc(x.changeDisplay)}</strong>
                <small>比较周期未注明</small>
              </div>`
            : `<div class="g-snapshot-change is-muted">
                <span>历史对照</span>
                <strong>未提供</strong>
                <small>截图未提供可核验的变化值</small>
              </div>`;
          return `<article class="g-snapshot-card" data-growth-metric="${id}">
            <div class="g-snapshot-card-top">
              <b>${esc(x.label)}</b>
            </div>
            <div class="g-snapshot-value">
              <strong>${esc(x.display)}</strong>
              <span>${esc(x.unit)}</span>
            </div>
            ${change}
            <button type="button" data-evidence="${id}" aria-label="${esc(x.label)}，查看字段定义与来源">查看字段定义与来源 ↗</button>
          </article>`;
        })
        .join("")}</div>
      <p class="g-snapshot-footnote">
        这些数字来自 Facebook 页面分析后台截图（原图不公开）。截图未显示完整统计日期和比较周期；百分比沿用后台原始变化值，不标注同比或环比，也不反推前期绝对数。页面浏览量没有可核验的对照值。
      </p>
    </section>`;
  }
  function historyCard(id) {
    const x = m(id);
    const pending = x.status === "PENDING";
    const value = id === "group" ? `${x.display} 人` : x.display;
    return `<article class="g-history-card" data-growth-metric="${id}">
      <div class="g-history-meta">
        <span>${esc(x.platform)}</span>
        <small class="${pending ? "is-pending" : "is-documented"}">${esc(P.statuses[x.status])}</small>
      </div>
      <button type="button" class="g-history-main" data-evidence="${id}" aria-label="${esc(x.label)} ${esc(value)}，查看证据">
        <span>${esc(x.label)}</span>
        <strong>${esc(value)}</strong>
      </button>
      <p>${esc(x.window)}</p>
      <small>${esc(x.limits)}</small>
    </article>`;
  }
  function historicalGrowth() {
    const groups = [
      {
        title: "Meta / Facebook",
        note: "平台阶段变化记录",
        ids: ["engagement-change", "fb-reach", "fb-link-click-change"],
      },
      {
        title: "Instagram",
        note: "活动期与历史阶段记录",
        ids: [
          "ig-event-engagement-change",
          "ig-follower-change",
        ],
      },
      {
        title: "Facebook Group",
        note: "社群成员增长记录",
        ids: ["group", "group-month"],
      },
    ];
    return `<section class="g-history-growth">
      ${header(
        "HISTORICAL GROWTH / 过往项目",
        "过往项目的增长表现",
        "这里汇总 Meta、Facebook、Instagram 与社群的历史记录。平台、账号和统计周期并不完全相同，因此分组展示，不按百分比排名。",
      )}
      <div class="g-history-groups">${groups
        .map(
          (g) => `<section class="g-history-group">
            <div class="g-history-group-heading">
              <h3>${g.title}</h3>
              <p>${g.note}</p>
            </div>
            <div class="g-history-cards">${g.ids.map(historyCard).join("")}</div>
          </section>`,
        )
        .join("")}</div>
      <p class="g-history-footnote">
        比较基期、起止日期或账号范围未完整保留的项目，仅展示原始记录；标注“待核”的数据不作为已验证成果。点击数据可查看来源、定义与限制。
      </p>
    </section>`;
  }
  function anchors() {
    return `<div class="g-evidence-anchors"><div><p class="eyebrow">TIME ANCHORS / 活动与数据</p><h3>知道发生了什么，也说明尚缺什么。</h3></div><article><span>已知年份 / 2025</span><b>Meta 阶段汇总</b><p>曝光与互动有历史汇总，缺少逐期原值。</p>${evidence("impressions")}</article><article><span>活动节点 / 日期待补</span><b>Instagram 活动期互动变化</b><p>原记录 +1,870.9%；具体活动、比较基期与日期未注明。不绑定到任一概念活动。</p>${evidence("ig-event-engagement-change")}</article><article><span>社群窗口 / 2025/11/02–2026/09/30</span><b>查看与参与分别记录</b><p>平台截图所选分析范围，不是活动举办日期。无活动级归因。</p>${evidence("group-posters")}</article></div>`;
  }
  function trends() {
    return `<section class="g-trend-status" aria-label="趋势数据状态">
      <div>
        <p class="eyebrow">TREND READINESS</p>
        <h3>趋势图暂不绘制</h3>
        <p>目前缺少同一账号、同一指标、同一统计周期的连续日期数据。先保留已有阶段变化；补齐日期和原值后，再制作时间趋势对比。</p>
      </div>
      <div class="g-readiness">
        <span><b>01</b>连续日期与原值</span>
        <span><b>02</b>同一账号与字段</span>
        <span><b>03</b>一致统计窗口</span>
        <strong>连续数据待补 · 不绘制趋势线</strong>
      </div>
    </section>`;
  }
  const platformGroups = {
    Meta: ["impressions", "engagements", "er"],
    Facebook: [
      "fb-reach",
      "fb-link-click-change",
      "fb-views",
      "fb-content-interactions",
      "fb-link-clicks",
    ],
    Instagram: ["ig-event-engagement-change", "ig-follower-change"],
    Group: ["group-members", "group-posters", "group-viewers"],
  };
  function platformCards(platform) {
    return platformGroups[platform].map(metric).join("");
  }
  function platformView() {
    return `<section class="g-module" data-platform-module>${header("PLATFORM SIGNALS", "平台各司其职，结果分别阅读。", "用于对照各平台的角色与可用证据；口径与窗口不同，不作增长高低排名。")}<div class="g-platform-tabs" role="group" aria-label="平台筛选">${Object.keys(
      platformGroups,
    )
      .map(
        (x, i) =>
          `<button data-g-platform="${x}" aria-pressed="${i === 0}">${x}</button>`,
      )
      .join(
        "",
      )}</div><div class="g-platform-grid" data-platform-cards aria-live="polite">${platformCards("Meta")}</div><div class="g-role-matrix">${[
      ["Facebook", "品牌信息 / 链接导流", "覆盖与点击是不同字段"],
      ["Instagram", "视觉演示 / 活动沟通", "活动期互动变化不等于成交"],
      ["Group", "讨论 / 问题反馈", "成员、查看和参与人数分别解读"],
    ]
      .map(
        (x) =>
          `<article><b>${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p></article>`,
      )
      .join("")}</div></section>`;
  }
  function association() {
    return `<section class="g-module g-association">${header("BUSINESS CONNECTION", "从内容信号，回到业务问题。", "以下是分析路径，不是可计算的转化漏斗。缺少同范围分母、归因或对照时不建立因果关系。")}${pathSteps(
      [
        ["展示", "曝光 / 浏览：内容是否被看见？"],
        ["参与", "互动 / 发帖评论：用户如何回应？"],
        ["行动", "链接点击：是否发生导流动作？"],
        ["承接", "站内行为需核对追踪与归因；不推定收入贡献。"],
      ],
    )}<p class="caption">社群反馈 → 用户问题归类 → 产品事实核对 → FAQ / 内容选题 → 下一轮讨论与验证。</p></section>`;
  }
  function growth() {
    return `<section class="g-module g-growth" id="growth-overview">
      ${header(
        "GROWTH / EVIDENCE FIRST",
        "社媒增长：历史变化与页面表现",
        "按平台、账号和统计阶段阅读已有记录；不同指标不放在同一尺度上比较，也不把阶段汇总推算成月度趋势。",
      )}
      ${historicalGrowth()}
      ${facebookSnapshot()}
      ${trends()}
      ${anchors()}
    </section>`;
  }
  function editorial() {
    return `<section class="g-module g-editorial">${header("EDITORIAL SYSTEM", "内容日历，也是团队交付计划。", "相对节点为重构流程，不是历史活动日历；未指定具体活动日期或发布日期。")}<div class="g-editorial-grid"><article><span>QUARTER / 季度</span><h3>主题与产品重点</h3><p>主推产品、用户问题、内容目标、资源优先级。</p></article><article><span>MONTH / 月度</span><h3>内容与平台编排</h3><p>选题、形式、负责人、素材需求、CTA、承接页面。</p></article><article><span>WEEK / 周度</span><h3>审核与依赖管理</h3><p>脚本、设计、视频、事实、权限、发布状态。</p></article></div>${pathSteps(
      [
        ["准备", "目标、事实包与角色确认"],
        ["制作", "创意、脚本与平台版本"],
        ["发布前", "产品、视觉、权限、链接验收"],
        ["发布后", "按来源复盘，更新下一轮日历"],
      ],
    )}<p class="caption">内容表现复盘维度：内容支柱 / 形式 / Hook / CTA / 平台窗口。现有数据没有逐条内容明细，不虚构最佳内容排名。</p></section>`;
  }
  function social() {
    return `<section class="g-module g-social-story" id="social-foundation">
      ${header(
        "SOCIAL MEDIA MANAGEMENT / 2025.04—2026.09",
        "从账号矩阵到内容经营，建立一套可持续的社媒管理机制。",
        "负责 Facebook、Instagram 品牌账号及美国 Facebook Group 的内容策略与小组交付；将平台定位、内容规划、活动组织、社群反馈和数据复盘连接起来。",
      )}
      <div class="g-social-ownership">
        <article><span>ROLE / 本人职责</span><b>社媒负责人 / 管理组长</b><p>制定季度主题与月度日历，安排选题、任务分工、创意评审、脚本与视觉审核及周 / 月复盘。</p></article>
        <article><span>CHANNELS / 平台分工</span><b>Facebook · Instagram · Group</b><p>品牌信息与链接导流、产品视觉演示与活动沟通、用户交流与问题反馈分别承接。</p></article>
        <article><span>COLLABORATION / 跨部门协作</span><b>从输入到发布的责任分工</b><p>协同社媒小组、产品、设计、视频、电商与 Creator / KOL，明确事实提供、制作、审核和发布责任。</p></article>
      </div>
      <div class="g-social-flow-heading">
        <span>OPERATING JOURNEY / 管理链路</span>
        <h3>八个管理节点，把策略转成日常交付。</h3>
      </div>
      <div class="g-foundation">${socialSteps.map((x, i) => `<article>
        <span>0${i + 1} / ${x[0]}</span>
        <h3>${x[1]}</h3>
        <p>${x[2]}</p>
        ${x[4] ? `<div class="g-social-step-proof"><b>0 → 8K+</b><small>账号规模记录 · 字段与日期待核</small>${evidence("fb-size")}</div>` : ""}
        <small>${P.statuses[x[3]]}</small>
      </article>`).join("")}</div>
      <div class="g-social-pillar-block">
        <div><span>CONTENT PILLARS / 内容支柱</span><h3>五类内容，围绕用户任务组织。</h3></div>
        <div class="g-pillars">${["产品演示", "家庭清洁场景", "教程与 FAQ", "互动挑战", "UGC 与用户反馈"].map((x, i) => `<span><b>0${i + 1}</b>${x}</span>`).join("")}</div>
      </div>
    </section>
    ${editorial()}
    ${campaignWall()}
    ${communitySummary()}
    ${socialLoop()}`;
  }
  function communitySummary() {
    const ids = ["group", "group-members", "group-posters", "group-viewers"];
    return `<section class="g-module g-social-community-summary" id="social-community-summary">
      ${header(
        "FACEBOOK GROUP / COMMUNITY",
        "把社群做成用户参与与问题反馈的入口。",
        "围绕教程、投票、清洁挑战、UGC 投稿和问题答疑组织参与；把高频问题回流到 FAQ、内容选题与产品信息核验。",
      )}
      <div class="g-social-community-grid">${ids.map((id) => {
        const x = m(id);
        return `<article class="g-social-community-card" data-growth-metric="${id}">
          <span>${esc(x.label)}</span>
          <strong>${esc(x.display)} <small>${esc(x.unit)}</small></strong>
          <p>${esc(x.window)}</p>
          ${evidence(id)}
        </article>`;
      }).join("")}</div>
      <p class="g-social-community-note">
        +227 为独立阶段新增；4,009 为采集日期未注明的成员快照；146 与 34,387 为 2025/11/02–2026/09/30 所选范围的平台字段。统计窗口与字段不同，不合并为增长率或活跃率。
      </p>
      <div class="g-social-community-actions">
        <span>运营动作：教程 / 投票 / 清洁挑战 / UGC / 问题答疑</span>
        <a href="#/case/community">查看 Facebook Group 社群经营专项案例 ↗</a>
      </div>
    </section>`;
  }
  function socialLoop() {
    return `<section class="g-module g-social-loop">
      ${header(
        "PERFORMANCE REVIEW / CONTINUOUS IMPROVEMENT",
        "复盘的终点，是下一轮内容决策。",
        "把平台表现、链接动作与社群反馈拆开观察，再回到内容规划；不将点击直接解释为成交，也不将反馈样本外推为普遍结论。",
      )}
      ${pathSteps([
        ["读取平台信号", "分别看曝光 / 浏览、互动与链接点击"],
        ["归类用户反馈", "整理评论、社群问题与常见使用场景"],
        ["核验产品事实", "与产品及电商协同确认信息和承接"],
        ["回流内容计划", "更新 FAQ、内容支柱与下一轮选题"],
      ])}
    </section>`;
  }
  function topicPanel(index = 0) {
    const t = topics[index];
    return `<div class="g-topic-example"><span>${t[0]} / ${P.statuses[t[4]]}</span><h3>${t[1]}</h3><blockquote>${t[2]}</blockquote><p>${t[3]}</p><small>文案样例为本次概念创作，非历史帖子、真实用户发言或活动成果。</small></div>`;
  }
  function participation() {
    return `<div class="g-participation"><div><p class="eyebrow">COMMUNITY INSIGHTS / 独立字段</p><h3>看到、参与、加入，分别衡量。</h3><p>查看人数不是曝光；发帖评论人数不是帖子数；成员快照不是窗口新增。不计算活跃率。</p></div><div class="g-community-counts">${["group-members", "group-posters", "group-viewers"].map(metric).join("")}</div><p class="caption">146 与 34,387 为 2025/11/02–2026/09/30 所选范围的原平台字段；4,009 为日期未注明的成员快照。</p></div>`;
  }
  function community() {
    return `<section class="g-module g-community" id="community-management">${header("FACEBOOK COMMUNITY MANAGEMENT", "从加入社群，到贡献经验。", "基于现有教程、投票、清洁挑战、UGC 与反馈机制重构。社群创建的日期、规则原件及历史建群日志待补。")}<div class="g-community-onboarding"><article><span>POSITIONING / 定位与创建</span><h3>围绕用户任务建立交流空间</h3><p>整理清洁问题与使用场景；名称、简介、管理权限与欢迎信息作为建群检查流程展示，不声称保存有历史创建日志。</p></article><article><span>RULES / 规则与引导 · 概念样张</span><h3>先建立参与预期</h3><p>欢迎阅读 → 自愿介绍 → 查看主题 → 分享经验；尊重隐私、说明使用条件、保留真实反馈，营销使用另行授权。</p></article></div><div class="g-topic-layout"><div class="g-topic-buttons" role="group" aria-label="社群参与机制">${topics.map((t, i) => `<button data-g-topic="${i}" aria-pressed="${i === 0}"><b>${t[1]}</b><span>${t[0]}</span></button>`).join("")}</div><div data-topic-panel aria-live="polite">${topicPanel()}</div></div>${pathSteps(
      [
        ["话题邀约", "清洁问题、教程或投票提供入口"],
        ["自愿参与", "成员讨论、投稿与问题答疑"],
        ["治理与授权", "审核事实；二次使用单独确认许可"],
        ["反馈闭环", "高频问题 → 产品确认 → FAQ 与选题"],
      ],
    )}<div class="g-feedback-loop"><b>User Feedback</b><span>收集问题</span><i>→</i><span>归类场景与障碍</span><i>→</i><span>产品核验</span><i>→</i><span>内容策划</span><i>↻</i><b>Community Insights</b></div>${participation()}</section>`;
  }
  function visual(c) {
    if (c.art === "03")
      return `<img src="assets/concept-03.png" alt="节日内容概念视觉，非历史已执行活动" width="1000" height="1200" loading="lazy">`;
    return `<div class="g-campaign-art art-${c.art}" aria-hidden="true"><small>${c.art === "challenge" ? "COMMUNITY / PARTICIPATION" : "BRAND / SHARED VALUE"}</small><strong>${c.art === "challenge" ? "一个场景。<br>一种经验。<br>一起讨论。" : "共同任务。<br>一致事实。<br>协同表达。"}</strong><div>${c.art === "challenge" ? "<span>话题</span><i>→</i><span>投稿</span><i>→</i><span>反馈</span>" : "<span>适配</span><i>×</i><span>权限</span><i>×</i><span>交付</span>"}</div></div>`;
  }
  function campaignPanel(index = 0) {
    const c = campaigns[index],
      fields = [
        ["Campaign Objective", c.objective],
        ["Consumer Insight", c.insight],
        ["Big Idea", c.idea],
        ["Campaign Mechanism", c.mechanism],
        ["Content & Channel Mix", c.mix],
        ["UGC / Participation", c.participation],
        ["Measurement & Review", c.measurement],
      ];
    return `<div class="g-campaign-detail"><header><div><span>${c.label} · ${P.statuses[c.kind]}</span><h3>${c.name}</h3></div><button class="g-preview-link" data-g-preview="${c.id}">预览视觉资产 ↗</button></header><div class="g-campaign-fields">${fields.map((f) => `<article><h4>${f[0]}</h4><p>${f[1]}</p></article>`).join("")}</div><h4>Communication Timeline / 相对节点示意</h4>${pathSteps(
      [
        ["准备", "目标 / 规则 / 事实与授权"],
        ["预热", "主题解释 / 场景与参与说明"],
        ["活动期", "内容分发 / 讨论与审核"],
        ["复盘", "独立窗口 / 来源 / 待核问题"],
      ],
    )}<p class="g-campaign-note">${c.note} Instagram 活动期互动变化的具体活动日期和基期未注明，不绑定到这里的任一方案。</p></div>`;
  }
  function campaignWall() {
    return `<section class="g-module g-campaign-wall" id="campaign-wall">${header("ONLINE CAMPAIGNS", "日常内容之外，独立组织一场活动。", "清洁挑战为机制重构；节日与品牌联合传播为概念。没有活动原始素材时使用标注清楚的视觉样张。")}<div class="g-campaign-cards" role="group" aria-label="活动类型筛选">${campaigns.map((c, i) => `<button data-g-campaign="${i}" aria-pressed="${i === 0}"><div class="g-campaign-thumb">${visual(c)}<span class="g-art-label">${c.label}</span></div><b>${c.name}</b><small>${P.statuses[c.kind]}</small></button>`).join("")}</div><div data-campaign-panel aria-live="polite">${campaignPanel()}</div></section>`;
  }
  function trendSeries(series) {
    if (
      !series ||
      series.evidenceStatus !== "VERIFIED" ||
      !series.accountScope ||
      !series.metricDefinition ||
      !series.source ||
      !series.window ||
      !Array.isArray(series.points) ||
      series.points.length < 2
    )
      return null;
    const points = series.points;
    if (
      points.some(
        (p, i) =>
          !/^\d{4}-\d{2}-\d{2}$/.test(p.date) ||
          !Number.isFinite(Date.parse(p.date)) ||
          !Number.isFinite(p.value) ||
          p.value < 0 ||
          (i && Date.parse(p.date) <= Date.parse(points[i - 1].date)),
      )
    )
      return null;
    return points;
  }
  // No time series is supplied by the current evidence set. Do not synthesize it.
  window.PORTFOLIO_GROWTH = { validateSeries: trendSeries, series: [] };
  window.enhancePortfolio = function (main, { page, id }) {
    if (page === "home") {
      main
        .querySelector(".discipline-strip")
        ?.insertAdjacentHTML("afterend", homeGrowthStory());
      main
        .querySelector(".contact-band")
        ?.insertAdjacentHTML("beforebegin", campaignWall());
    }
    if (page === "case" && id === "social") {
      const execution = main.querySelector("#execution>div:last-child");
      const legacyGrid = execution?.querySelector(".deliverable-grid");
      if (legacyGrid) {
        legacyGrid.setAttribute("data-social-legacy-grid-hidden", "true");
        legacyGrid.nextElementSibling?.setAttribute("data-social-legacy-caption-hidden", "true");
        legacyGrid.insertAdjacentHTML("beforebegin", social());
      }
      main
        .querySelector("#results>div:last-child")
        ?.insertAdjacentHTML("beforeend", growth());
    }
    if (page === "case" && id === "community")
      main
        .querySelector("#execution>div:last-child")
        ?.insertAdjacentHTML("beforeend", community());
    if (page === "case" && id === "brand")
      main
        .querySelector("#execution>div:last-child")
        ?.insertAdjacentHTML("beforeend", campaignWall());
    if (page === "data") {
      const domain = P.domains[id] ? id : "social";
      if (domain === "social") {
        main
          .querySelector(".filter-row")
          ?.insertAdjacentHTML("afterend", growth());
        main
          .querySelector(".page")
          ?.insertAdjacentHTML("beforeend", platformView() + association());
      } else if (domain === "community")
        main
          .querySelector(".page")
          ?.insertAdjacentHTML("beforeend", participation() + association());
      else if (domain === "b2b")
        main
          .querySelector(".page")
          ?.insertAdjacentHTML("beforeend", b2bStage());
    }
    decorateCovers(main);
  };
  function decorateCovers(main) {
    main.querySelectorAll(".cover-social").forEach((el) => {
      if (!el.querySelector(".g-cover-signal"))
        el.insertAdjacentHTML(
          "beforeend",
          '<div class="g-cover-signal"><b>0 → 1</b><span>账号基础 · 内容体系 · 团队交付</span></div>',
        );
    });
    main.querySelectorAll(".cover-community").forEach((el) => {
      if (!el.querySelector(".g-cover-signal"))
        el.insertAdjacentHTML(
          "beforeend",
          '<div class="g-cover-signal"><b>JOIN → SHARE</b><span>话题 · UGC · 反馈闭环</span></div>',
        );
    });
  }

  document.addEventListener("input", (e) => {
    if (e.target.id === "case-search")
      queueMicrotask(() => decorateCovers(document.querySelector("main")));
  });
  let previewFocus;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.matches("[data-filter], [data-reset]"))
      queueMicrotask(() => decorateCovers(document.querySelector("main")));
    if (b.hasAttribute("data-g-platform")) {
      const module = b.closest("[data-platform-module]");
      module
        .querySelectorAll("[data-g-platform]")
        .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      module.querySelector("[data-platform-cards]").innerHTML = platformCards(
        b.dataset.gPlatform,
      );
    }
    if (b.hasAttribute("data-g-topic")) {
      const module = b.closest(".g-community");
      module
        .querySelectorAll("[data-g-topic]")
        .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      module.querySelector("[data-topic-panel]").innerHTML = topicPanel(
        Number(b.dataset.gTopic),
      );
    }
    if (b.hasAttribute("data-g-campaign")) {
      const module = b.closest(".g-campaign-wall");
      module
        .querySelectorAll("[data-g-campaign]")
        .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      module.querySelector("[data-campaign-panel]").innerHTML = campaignPanel(
        Number(b.dataset.gCampaign),
      );
    }
    if (b.hasAttribute("data-g-preview")) {
      let dialog = document.querySelector("#growth-preview");
      if (!dialog) {
        document.body.insertAdjacentHTML(
          "beforeend",
          '<dialog id="growth-preview" class="g-preview" aria-labelledby="growth-preview-title"><div class="dialog-bar"><h2 id="growth-preview-title">活动视觉样张</h2><button data-g-close>关闭 ×</button></div><div data-growth-preview-body></div></dialog>',
        );
        dialog = document.querySelector("#growth-preview");
        dialog.addEventListener("close", () => {
          if (previewFocus?.isConnected)
            previewFocus.focus({ preventScroll: true });
        });
      }
      const c = campaigns.find((c) => c.id === b.dataset.gPreview);
      dialog.querySelector("[data-growth-preview-body]").innerHTML =
        `${visual(c)}<h3>${c.name}</h3><p>${c.label} · ${P.statuses[c.kind]}。${c.note}</p>`;
      previewFocus = b;
      dialog.showModal();
    }
    if (b.hasAttribute("data-g-close")) b.closest("dialog").close();
  });
})();
