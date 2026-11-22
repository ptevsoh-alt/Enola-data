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
      mix: "节庆海报确定主张，短视频展示产品操作，社群话题邀请读者补充家庭经验。",
      participation: "可设置问题征集与经验分享；是否执行及具体规则待确认。",
      measurement: "方案未提供执行记录；没有可核验的播放、参与或转化结果。",
      note: "复用已标注的概念视觉；不是历史已发布活动或执行成果。",
    },
    {
      id: "collab",
      name: "家居品牌联合抽奖",
      kind: "DOCUMENTED",
      label: "联合活动海报",
      art: "collab",
      objective: "用同一张海报介绍家居种植与清洁电器的联合抽奖。",
      insight: "家庭种植和清洁共用一个家居场景，奖品可以在同一画面里被理解。",
      idea: "The Pristine Living Space Giveaway",
      mechanism: "海报把家庭种植设备与电动清洁刷并排展示，并标出 4 月 18 日至 28 日的活动窗口。",
      mix: "海报以奖品为主视觉，活动名称和日期形成两层信息。",
      participation: "活动规则、中奖及奖品交付记录待补。",
      measurement: "海报可核对活动主题、物料与画面所示日期。发布记录和参与数据待补。",
      note: "日期来自海报，年份未注明。",
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
        "五项汇总数据及平台显示的变化值。点选任一指标查看定义、统计窗口与来源。",
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
      <p class="g-chart-note">数据来自 Facebook 页面分析；不同统计字段用于观察展示、互动和导流表现。</p>
    </section>`;
  }
  function historyCard(id) {
    const x = m(id);
    const pending = x.status === "PENDING";
    const value = ["group", "group-growth-1k"].includes(id) ? `${x.display} 人` : x.display;
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
      <details class="reader-source-note"><summary>指标说明</summary><small>${esc(x.limits)}</small></details>
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
        ids: ["group", "group-growth-1k"],
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
      <p class="g-history-footnote">点击指标可查看统计窗口、来源与口径说明。</p>
    </section>`;
  }
  function anchors() {
    return `<div class="g-evidence-anchors"><div><p class="eyebrow">TIME ANCHORS / 活动与数据</p><h3>知道发生了什么，也说明尚缺什么。</h3></div><article><span>已知年份 / 2025</span><b>Meta 阶段汇总</b><p>曝光与互动有历史汇总，缺少逐期原值。</p>${evidence("impressions")}</article><article><span>活动节点 / 日期待补</span><b>Instagram 活动期互动变化</b><p>原记录 +1,870.9%；具体活动、比较基期与日期未注明。不绑定到任一概念活动。</p>${evidence("ig-event-engagement-change")}</article><article><span>社群窗口 / 2025/11/02–2026/09/30</span><b>查看与参与分别记录</b><p>平台截图所选分析范围，不是活动举办日期。无活动级归因。</p>${evidence("group-posters")}</article></div>`;
  }
  function sourceEvidence() {
    return `<section class="g-module g-source-evidence" aria-label="平台后台趋势截图证据">
      ${header(
        "SOURCE MATERIAL / BACKEND INSIGHTS",
        "数据来源",
        "展开查看匿名化平台截图及对应指标。",
      )}
      <div class="g-source-evidence-grid">
        <details class="g-source-evidence-card">
          <summary>Facebook 页面分析</summary>
          <a href="assets/evidence/facebook-page-insights.webp" target="_blank" rel="noopener noreferrer" aria-label="打开裁切匿名化后的 Facebook 页面分析后台截图">
            <img src="assets/evidence/facebook-page-insights.webp" alt="Facebook 页面分析后台截图，展示浏览量、内容互动、链接点击、访问和关注的原生趋势曲线；浏览人数显示为未提供" width="420" height="391" loading="lazy" decoding="async">
          </a>
          <p>
            页面浏览量 138.2 万次；内容互动 5.3 万次；链接点击 7,364 次；页面访问 5.4 万次；关注次数 1 万次。后台显示的变化百分比保留在各自指标卡中，比较周期未注明。
          </p>
          <small>公开图像已裁去无关界面区域；截图未显示完整日期范围。浏览人数显示“--”，不以 0 代替。</small>
        </details>
        <details class="g-source-evidence-card">
          <summary>Facebook Group 社群分析</summary>
          <a href="assets/evidence/facebook-group-insights.webp" target="_blank" rel="noopener noreferrer" aria-label="打开裁切匿名化后的 Facebook Group 后台截图">
            <img src="assets/evidence/facebook-group-insights.webp" alt="Facebook Group Insights 后台趋势截图，显示发帖和评论人数及查看人数两组曲线" width="420" height="359" loading="lazy" decoding="async">
          </a>
          <div class="g-source-window">
            <span>后台所选统计范围</span>
            <strong>2025.11.02 — 2026.09.30</strong>
          </div>
          <p>
            平台显示 146 人发帖和评论、34,387 人查看；页面另显示 4,009 名成员，但该成员快照日期未注明。三项指标分别保留，不计算活跃率或成员转化率。
          </p>
          <small>公开图像已裁去群组名称与左侧管理导航；曲线为后台原图，不是逐日数据导出。</small>
        </details>
      </div>
      <p class="g-source-evidence-note">日级或周级趋势需要同一账号、同一字段的连续日期导出。</p>
      <div class="g-source-evidence-actions"><a href="#/case/social">返回社媒管理案例 ↗</a><a href="#/case/community">查看 Facebook Group 社群案例 ↗</a></div>
    </section>`;
  }
  function trends() {
    return `<p class="g-chart-note">Facebook Page 和 Group 的现有数据为阶段汇总。日级或周级趋势需使用连续日期导出。</p>`;
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
      ${facebookSnapshot()}
      ${historicalGrowth()}
      ${trends()}
      ${anchors()}
      ${sourceEvidence()}
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
    ${socialDecisionBridge()}
    ${socialLoop()}`;
  }
  function communitySummary() {
    const growthIds = ["group-growth-1k", "group"];
    const snapshotIds = ["group-members", "group-posters", "group-viewers"];
    const cards = (ids) => ids.map((id) => {
      const x = m(id);
      return `<article class="g-social-community-card" data-growth-metric="${id}">
        <span>${esc(x.label)}</span>
        <strong>${esc(x.display)} <small>${esc(x.unit)}</small></strong>
        <p>${esc(x.window)}</p>
        ${evidence(id)}
      </article>`;
    }).join("");
    return `<section class="g-module g-social-community-summary" id="social-community-summary">
      ${header(
        "FACEBOOK GROUP / COMMUNITY",
        "把社群做成用户参与与问题反馈的入口。",
        "围绕教程、投票、清洁挑战、UGC 投稿和问题答疑组织参与；把高频问题回流到 FAQ、内容选题与产品信息核验。",
      )}
      <h3>成员增长记录</h3>
      <div class="g-social-community-growth">${cards(growthIds)}</div>
      <h3>社群规模与参与</h3>
      <div class="g-social-community-grid">${cards(snapshotIds)}</div>
      <p class="g-social-community-note">
        1K+ 与 +227 是两项独立增长记录；4,009 为成员快照，146 与 34,387 为 2025/11/02–2026/09/30 所选范围的平台字段。各项分开呈现，不合并为增长率或活跃率。
      </p>
      <div class="g-social-community-actions">
        <span>运营动作：教程 / 投票 / 清洁挑战 / UGC / 问题答疑</span>
        <a href="#/case/community">查看 Facebook Group 社群经营专项案例 ↗</a>
        <a href="#/data/social">查看后台数据与证据 ↗</a>
      </div>
    </section>`;
  }
  function socialDecisionBridge() {
    const field = (id) => {
      const x = m(id);
      const change = x.changeDisplay
        ? `<small class="g-decision-change">${esc(x.changeDisplay)} · 比较周期未注明</small>`
        : "";
      return `<div class="g-decision-metric" data-growth-metric="${id}">
        <span>${esc(x.label)}</span>
        <strong>${esc(x.display)} <small>${esc(x.unit)}</small></strong>
        ${change}
        ${evidence(id)}
      </div>`;
    };
    return `<section class="g-module g-social-decision" id="social-data-decisions">
      ${header(
        "FROM SIGNAL TO DECISION / DATA-LED MANAGEMENT",
        "让后台数据进入内容与社群管理决策。",
        "将已记录的平台字段与日常管理动作对应。这里展示的是复盘方法，不是单项内容的因果归因；需要逐条内容或同窗口站点数据时，仍以原始导出为准。",
      )}
      <div class="g-decision-grid">
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>01 / PAGE VIEWS</span><h3>页面浏览量</h3></div>
          <div class="g-decision-metrics">${field("fb-views")}</div>
          <p class="g-decision-question">观察问题：页面浏览量反映浏览规模，不等同于曝光、覆盖人数或独立访客。</p>
          <div class="g-decision-action"><b>管理复盘动作</b><p>按平台、内容支柱与形式拆分内容明细，复核主题供给和发布节奏。当前没有逐条内容导出，不据此判断哪条内容贡献最高。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>02 / CONTENT INTERACTIONS</span><h3>内容互动</h3></div>
          <div class="g-decision-metrics">${field("fb-content-interactions")}</div>
          <p class="g-decision-question">观察问题：互动次数是平台汇总字段；后台变化值未注明比较周期，不解释为同比或环比。</p>
          <div class="g-decision-action"><b>管理复盘动作</b><p>结合评论、社群提问和内容主题复核用户反馈，再调整教程、FAQ 与互动话题。当前没有互动动作拆分，不推断点赞、评论或分享的贡献比例。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>03 / LINK & PAGE ACTION</span><h3>链接与页面访问</h3></div>
          <div class="g-decision-metrics">${field("fb-link-clicks")}${field("fb-visits")}</div>
          <p class="g-decision-question">观察问题：链接点击与页面访问是两个不同字段，不能相加，也不能直接视为站点会话。</p>
          <div class="g-decision-action"><b>管理复盘动作</b><p>检查 CTA、目标链接与落地页信息一致性；若要判断站内后续行为，需核对同一窗口的 UTM、GA4 会话与关键事件。点击不等于订单或收入。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>04 / COMMUNITY PARTICIPATION</span><h3>社群查看与参与</h3></div>
          <div class="g-decision-metrics">${field("group-viewers")}${field("group-posters")}${field("group-members")}</div>
          <p class="g-decision-question">观察问题：查看人数、发帖和评论人数、成员数分别代表不同维度；成员数是日期未注明的快照。</p>
          <div class="g-decision-action"><b>管理复盘动作</b><p>通过教程、投票、清洁挑战、UGC 与问题答疑设置参与入口；把高频问题回流 FAQ 和内容计划。不以这三项数据计算活跃率或成员转化率。</p></div>
        </article>
      </div>
      <div class="g-decision-review">
        <span>MANAGEMENT REVIEW LOOP</span>
        <div><b>拆分字段</b><i>→</i><b>核对窗口与定义</b><i>→</i><b>识别可行动问题</b><i>→</i><b>调整内容与社群计划</b></div>
      </div>
      <div class="g-story-note">
        <h3>一次阶段复盘怎样分派下一步</h3>
        <p>复盘工作样例。社媒组把同一阶段的内容按场景、形式和链接动作拆开，确认该继续验证哪类开场。反馈集中在操作问题时，产品与客服先核对用法，内容组再补 FAQ 或短演示。若链接点击出现变化，由电商和数据同事核对对应窗口、落地页访问与关键事件，再决定改 CTA 还是改页面承接。</p>
        <p class="g-chart-note">现有 Meta 阶段汇总支持规模判断。继续、修正或暂缓的决策需要对应内容和承接数据。</p>
      </div>
      <p class="g-decision-note">证据边界：当前后台截图支持平台字段汇总与原生曲线展示；没有同账号、同口径的逐日导出，不能重建日级趋势，也不能把平台表现归因到某一条内容或单场活动。</p>
      <div class="g-decision-links"><a href="#/data/social">查看平台数据与后台截图 ↗</a><a href="#/case/community">查看 Facebook Group 社群案例 ↗</a></div>
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
    return `<div class="g-topic-example"><span>${t[0]} / ${P.statuses[t[4]]}</span><h3>${t[1]}</h3><blockquote>${t[2]}</blockquote><p>${t[3]}</p></div>`;
  }
  function community() {
    return `<section class="g-module g-community" id="community-management">${header("FACEBOOK COMMUNITY MANAGEMENT", "从内容互动，到用户共创。", "围绕教程、投票、清洁挑战与 UGC 组织成员参与，并将高频问题回流到内容选题和 FAQ。")}<div class="g-community-onboarding"><article><span>POSITIONING / 社群定位</span><h3>围绕真实清洁任务组织交流</h3><p>以产品使用、清洁方法和家庭场景为主题，让成员提问、投票并分享经验。</p></article><article><span>RULES / 参与规则</span><h3>明确讨论边界与投稿授权</h3><p>说明参与方式、隐私要求和内容使用范围；成员内容用于品牌传播前，单独确认授权。</p></article></div><div class="g-project-list g-project-calendar-plan" id="community-event-governance">
      <article><small>PROGRAM OWNER / 活动归属</small><h3>先按主要业务目标确定唯一负责人</h3><p>公开激活、上市传播、整合 Campaign 或联合营销，由 GTM / Campaign 负责人统筹；成员关系、支持、教育与生命周期活动由社群 / CRM 负责人负责；单纯内容帖或提醒文案由内容负责人承担。活动发生在 Group 内，不自动改变最终 Owner。</p></article>
      <article><small>EVENT CONTRACT / 活动准入</small><h3>先锁定规则，再开放参与</h3><p>每场活动明确一个主业务目标、目标成员状态、市场与平台、参与资格、日期窗口、用户动作、奖励与履约、素材、审核答疑、身份与许可、主指标、Guardrails、取消 / 回滚条件和活动后交接。</p></article>
      <article><small>PARTICIPATION / 参与路径</small><h3>让参与、审核和内容复用各有边界</h3><p>话题邀约 → 自愿讨论 / 投稿 → 内容审核与答疑 → 单独确认使用授权 → 归档与复用。参与不要求正面评价；投稿不自动取得品牌商业使用权。</p></article>
      <article><small>MEASUREMENT / HANDOFF</small><h3>活动数据分开记录，结果交回对应负责人</h3><p>报名、出席、参与、查看、发帖评论、UGC、点击和购买分别记录。出席不等于营销同意，RSVP 不等于购买意向，抽奖参与不等于高价值客户，Group 活动也不自动形成 CRM 身份。</p></article>
    </div><p class="g-chart-note">活动后将内容资产交回内容团队，成员关系与后续沟通交回社群 / CRM，已验证的事件数据交给 Measurement，Campaign 复盘回到项目负责人。现有资料未提供每场活动完整的资格规则、奖励履约、发布记录和活动级效果，因此本模块展示治理方法，不补造单场活动成果。</p><div class="g-topic-layout"><div class="g-topic-buttons" role="group" aria-label="社群参与机制">${topics.map((t, i) => `<button data-g-topic="${i}" aria-pressed="${i === 0}"><b>${t[1]}</b><span>${t[0]}</span></button>`).join("")}</div><div data-topic-panel aria-live="polite">${topicPanel()}</div></div>${pathSteps(
      [
        ["话题邀约", "清洁问题、教程或投票提供入口"],
        ["自愿参与", "成员讨论、投稿与问题答疑"],
        ["治理与授权", "审核事实；二次使用单独确认许可"],
        ["反馈闭环", "高频问题 → 产品确认 → FAQ 与选题"],
      ],
    )}<div class="g-feedback-loop"><b>User Feedback</b><span>收集问题</span><i>→</i><span>归类场景与障碍</span><i>→</i><span>产品核验</span><i>→</i><span>内容策划</span><i>↻</i><b>Community Insights</b></div>${communitySourceEvidence()}</section>`;
  }
  function communitySourceEvidence() {
    const cards = [
      ["group-viewers", "社群查看人数", "人", m("group-viewers").window],
      ["group-posters", "发帖和评论人数", "人", m("group-posters").window],
      ["group-members", "社群成员数", "名", "成员快照 · 采集日期未注明"],
    ];
    return `<section class="g-module g-community-proof" aria-label="Facebook Group 后台数据证据">
      ${header(
        "FACEBOOK GROUP INSIGHTS",
        "社群查看与参与",
        "Facebook Group · 平台分析",
      )}
      <div class="g-community-counts">${cards.map(([id, label, unit, window]) => `
        <button class="g-community-metric" type="button" data-evidence="${id}">
          <span>${label}</span><strong>${esc(m(id).display)} <small>${unit}</small></strong>
          <span class="g-community-metric-window">${esc(window)}</span>
          <span class="g-community-metric-link">查看指标口径 <span aria-hidden="true">↗</span></span>
        </button>`).join("")}</div>
      <p class="g-chart-note">平台分别统计查看和发帖评论人数，两组人群的重合情况未注明。</p>
      <div class="g-source-evidence-actions"><a href="assets/evidence/facebook-group-insights.webp" target="_blank" rel="noopener noreferrer">打开匿名化后台截图 ↗</a><a href="#/data/social">查看完整社媒数据 ↗</a></div>
    </section>`;
  }
  function visual(c) {
    if (c.art === "03")
      return `<img src="assets/concept-03.png" alt="节日内容概念视觉，非历史已执行活动" width="1000" height="1200" loading="lazy">`;
    if (c.art === "collab")
      return `<img src="assets/projects/joint-giveaway.webp" alt="匿名化联合抽奖海报，展示种植设备和电动清洁刷" loading="lazy" decoding="async">`;
    return `<div class="g-campaign-art art-challenge" aria-hidden="true"><small>COMMUNITY / PARTICIPATION</small><strong>一个小区域，<br>一次清洁分享。</strong><div><span>话题</span><i>→</i><span>投稿</span><i>→</i><span>反馈</span></div></div>`;
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
    return `<section class="g-module g-campaign-wall" id="campaign-wall">${header("CAMPAIGNS", "活动项目", "清洁挑战、节庆内容与家居品牌联合抽奖。")}<div class="g-campaign-cards" role="group" aria-label="活动类型筛选">${campaigns.map((c, i) => `<button data-g-campaign="${i}" aria-pressed="${i === 0}"><div class="g-campaign-thumb">${visual(c)}<span class="g-art-label">${c.label}</span></div><b>${c.name}</b><small>${P.statuses[c.kind]}</small></button>`).join("")}</div><div data-campaign-panel aria-live="polite">${campaignPanel()}</div></section>`;
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
          ?.insertAdjacentHTML("beforeend", communitySourceEvidence() + association());
      else if (domain === "b2b")
        main
          .querySelector(".page")
          ?.insertAdjacentHTML("beforeend", b2bStage());
    }
    window.enhancePortfolioProjects?.(main, { page, id });
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
