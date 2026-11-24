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
    `<button class="g-evidence" data-evidence="${id}">查看数据详情 ↗</button>`;
  const metric = (id) => {
    const x = m(id);
    const period = /^20\d{2}/.test(String(x.window || "")) && !/未注明|待核|具体/.test(x.window) ? x.window : "";
    const platform = String(x.platform || "").replace(/（字段待核）|（口径待核）/g, "");
    return `<article class="g-kpi" data-growth-metric="${id}"><p>${esc(x.label)}</p><button data-evidence="${id}" aria-label="${esc(x.label)} ${esc(x.display)}，打开数据出处"><strong>${esc(x.display)}</strong></button><small>${esc(platform)}</small>${period ? `<p class="g-window">${esc(period)}</p>` : ""}${evidence(id)}</article>`;
  };
  const header = (en, title, desc) =>
    `<div class="g-heading"><div><p class="eyebrow">${en}</p><h2>${title}</h2></div><p>${desc}</p></div>`;
  const socialSteps = [
    [
      "Social Media Foundation",
      "账号基础与矩阵搭建",
      "推动 Facebook、Instagram 品牌账号与美国 Facebook Group 的内容体系从 0 到 1，建立渠道角色、内容规划和审核机制。",
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
      "Creative Quality",
      "创意形式与内容质量",
      "围绕产品事实、用户问题和渠道格式审核视频开场、Before/After、字幕安全区与产品操作细节；将反馈更新到下一期选题。",
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
      "按账号、内容类型和统计周期分析展示、互动、链接点击与社群反馈。",
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
        "分别分析成员增长、讨论参与和内容查看情况。",
      note: "社群参与机制与内容设计",
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
      participation: "通过问题征集和经验分享组织内容讨论，并明确参与入口与反馈方式。",
      measurement: "按内容曝光、视频互动与后续问题反馈区分不同传播任务，依据同平台数据调整创意。",
      note: "节庆场景与 Campaign 创意",
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
      participation: "海报使用主题、奖品组合与日期引导用户了解联合活动。",
      measurement: "联名视觉按照信息可读性、品牌一致性与参与入口完整度进行审核。",
      note: "联合活动窗口按海报上注明的 4 月 18–28 日呈现。",
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
        <p>海外 B2B 岗位期间的 Facebook 账号规模记录。</p>
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
        "展示 Facebook 品牌页面的内容浏览、互动、链接点击、访问与关注表现。",
      )}
      <div class="g-snapshot-grid">${ids
        .map((id) => {
          const x = m(id);
          return `<article class="g-snapshot-card" data-growth-metric="${id}">
            <div class="g-snapshot-card-top">
              <b>${esc(x.label)}</b>
            </div>
            <div class="g-snapshot-value">
              <strong>${esc(x.display)}</strong>
              <span>${esc(x.unit)}</span>
            </div>
            <button type="button" data-evidence="${id}" aria-label="查看${esc(x.label)}数据详情">查看数据详情 ↗</button>
          </article>`;
        })
        .join("")}</div>

    </section>`;
  }
  function historyCard(id) {
    const x = m(id);
    const value = ["group", "group-growth-1k"].includes(id) ? `${x.display} 人` : x.display;
    const context = {
      "group-growth-1k": "社群历史增长",
      group: "单阶段新增成员",
      "fb-reach": "Facebook 覆盖",
      "fb-link-click-change": "Facebook 链接点击表现",
      "engagement-change": "Meta 内容互动表现",
      "ig-follower-change": "Instagram 账号增长",
    };
    return `<article class="g-history-card" data-growth-metric="${id}">
      <div class="g-history-meta"><span>${esc(x.platform)}</span></div>
      <button type="button" class="g-history-main" data-evidence="${id}" aria-label="查看${esc(x.label)}数据详情">
        <span>${esc(context[id] || x.label)}</span>
        <strong>${esc(value)}</strong>
      </button>
    </article>`;
  }
  function historicalGrowth() {
    const groups = [
      {
        title: "Meta / Facebook",
        note: "覆盖、内容互动与链接表现",
        ids: ["engagement-change", "fb-reach", "fb-link-click-change"],
      },
      {
        title: "Instagram",
        note: "账号规模变化",
        ids: ["ig-follower-change"],
      },
      {
        title: "Facebook Group",
        note: "不同阶段的社群运营表现",
        ids: ["group", "group-growth-1k"],
      },
    ];
    return `<section class="g-history-growth">
      ${header(
        "CHANNEL PERFORMANCE / 品牌传播与增长",
        "多平台传播与社群增长",
        "将品牌传播、内容互动、链接表现与社群增长放在各自的业务场景中展示。",
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

    </section>`;
  }
  function sourceEvidence() {
    return `<details class="g-module g-source-evidence g-source-evidence-collapsed">
      <summary>查看 Facebook 与社群后台数据截图</summary>
      <div class="g-source-evidence-grid">
        <details class="g-source-evidence-card">
          <summary>Facebook 页面分析</summary>
          <a href="assets/evidence/facebook-page-insights.webp" target="_blank" rel="noopener noreferrer" aria-label="查看 Facebook 页面分析后台截图"><img src="assets/evidence/facebook-page-insights.webp" alt="Facebook 页面分析后台截图，展示页面浏览、内容互动、链接点击、访问和关注指标" width="420" height="391" loading="lazy" decoding="async"></a>
          <p>页面浏览量 138.2 万次 · 内容互动 5.3 万次 · 链接点击 7,364 次</p>
        </details>
        <details class="g-source-evidence-card">
          <summary>Facebook Group 社群分析</summary>
          <a href="assets/evidence/facebook-group-insights.webp" target="_blank" rel="noopener noreferrer" aria-label="查看 Facebook Group 数据截图"><img src="assets/evidence/facebook-group-insights.webp" alt="Facebook Group Insights 后台截图，展示用户查看和发帖评论数据" width="420" height="359" loading="lazy" decoding="async"></a>
          <div class="g-source-window"><span>参与数据统计范围</span><strong>2025.11.02 — 2026.09.30</strong></div>
          <p>发帖和评论人数 146 · 查看人数 34,387</p>
        </details>
      </div>
      <div class="g-source-evidence-actions"><a href="#/case/social">社媒管理案例 ↗</a><a href="#/case/community">社群运营案例 ↗</a></div>
    </details>`;
  }
  function association() {
    return `<section class="g-module g-association">${header("BUSINESS CONNECTION", "从内容信号，回到业务问题。", "从内容曝光、用户互动到链接访问，安排下一轮营销动作与团队协作。")}${pathSteps(
      [
        ["展示", "曝光 / 浏览：内容是否被看见？"],
        ["参与", "互动 / 发帖评论：用户如何回应？"],
        ["行动", "链接点击：是否发生导流动作？"],
        ["承接", "通过页面访问、产品咨询与真实订单数据检验转化路径"],
      ],
    )}<p class="caption">社群反馈 → 用户问题归类 → 产品事实核对 → FAQ / 内容选题 → 下一轮讨论与验证。</p></section>`;
  }
  function growth() {
    return `<section class="g-module g-growth" id="growth-overview">
      ${header(
        "SOCIAL PERFORMANCE / 传播与增长",
        "社媒传播成果",
        "从品牌内容表现到用户参与，呈现不同平台的实际运营成果。",
      )}
      ${facebookSnapshot()}
      ${historicalGrowth()}
      ${sourceEvidence()}
    </section>`;
  }
  function editorial() {
    return `<section class="g-module g-editorial">${header("EDITORIAL SYSTEM", "内容日历，也是团队交付计划。", "季度定主题，月度组织内容，周度跟进制作、审核与发布。")}<div class="g-editorial-grid"><article><span>QUARTER / 季度</span><h3>主题与产品重点</h3><p>主推产品、用户问题、内容目标、资源优先级。</p></article><article><span>MONTH / 月度</span><h3>内容与平台编排</h3><p>选题、形式、负责人、素材需求、CTA、承接页面。</p></article><article><span>WEEK / 周度</span><h3>审核与依赖管理</h3><p>脚本、设计、视频、事实、权限、发布状态。</p></article></div>${pathSteps(
      [
        ["准备", "目标、事实包与角色确认"],
        ["制作", "创意、脚本与平台版本"],
        ["发布前", "产品、视觉、权限、链接验收"],
        ["发布后", "按来源复盘，更新下一轮日历"],
      ],
    )}<p class="caption">内容复盘聚焦内容支柱、表现形式、视频开场、CTA 与用户反馈，并把结论写入下一轮日历。</p></section>`;
  }
  function social() {
    return `<section class="g-module g-social-story" id="social-foundation">
      ${header(
        "SOCIAL MEDIA MANAGEMENT / 2025.04—2026.09",
        "从零搭建社媒内容体系，制定季度主题、月度日历并负责内容审核。",
        "负责 Facebook、Instagram 品牌账号及美国 Facebook Group 的内容策略与小组交付；将平台定位、内容规划、活动组织、社群反馈和数据复盘连接起来。",
      )}
      <div class="g-social-ownership">
        <article><span>ROLE / 本人职责</span><b>社媒负责人 / 管理组长</b><p>制定季度主题与月度日历，安排选题、任务分工、创意评审、脚本与视觉审核及周 / 月复盘。</p></article>
        <article><span>CHANNELS / 平台分工</span><b>Facebook · Instagram · Group</b><p>品牌信息与链接导流、产品视觉演示与活动沟通、用户交流与问题反馈分别承接。</p></article>
        <article><span>CREATIVE / 社媒创意</span><b>创意主题与内容表现</b><p>围绕家庭清洁、Before/After、LED 显尘和操作教程安排视频 Hook、图文结构与版本审核。</p></article>
      </div>
      <div class="g-social-flow-heading">
        <span>OPERATING JOURNEY / 管理链路</span>
        <h3>八个管理节点，把策略转成日常交付。</h3>
      </div>
      <div class="g-foundation">${socialSteps.map((x, i) => `<article>
        <span>0${i + 1} / ${x[0]}</span>
        <h3>${x[1]}</h3>
        <p>${x[2]}</p>
        ${x[4] ? `<div class="g-social-step-proof"><b>0 → 8K+</b><small>账号阶段规模记录</small>${evidence("fb-size")}</div>` : ""}
        <small>${P.statuses[x[3]]}</small>
      </article>`).join("")}</div>
      <div class="g-social-pillar-block">
        <div><span>CONTENT PILLARS / 内容支柱</span><h3>五类内容，围绕用户任务组织。</h3></div>
        <div class="g-pillars">${["产品演示", "家庭清洁场景", "教程与 FAQ", "互动挑战", "UGC 与用户反馈"].map((x, i) => `<span><b>0${i + 1}</b>${x}</span>`).join("")}</div>
      </div>
    </section>
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

      <div class="g-social-community-actions">
        <span>运营动作：教程 / 投票 / 清洁挑战 / UGC / 问题答疑</span>
        <a href="#/case/community">查看 Facebook Group 社群经营专项案例 ↗</a>
        <a href="#/data/community">查看社群数据 ↗</a>
      </div>
    </section>`;
  }
  function socialDecisionBridge() {
    const field = (id) => {
      const x = m(id);
      return `<div class="g-decision-metric" data-growth-metric="${id}">
        <span>${esc(x.label)}</span>
        <strong>${esc(x.display)} <small>${esc(x.unit)}</small></strong>
        ${evidence(id)}
      </div>`;
    };
    return `<section class="g-module g-social-decision" id="social-data-decisions">
      ${header(
        "DATA-LED CONTENT MANAGEMENT / 数据驱动内容运营",
        "从数据复盘到下一轮内容决策",
        "将页面表现、内容互动、链接动作和社群参与转化为可执行的团队任务。",
      )}
      <div class="g-decision-grid">
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>01 / PAGE VIEWS</span><h3>页面浏览量</h3></div>
          <div class="g-decision-metrics">${field("fb-views")}</div>
          <p class="g-decision-question">关注内容主题与发布频次带来的页面浏览表现。</p>
          <div class="g-decision-action"><b>下一步行动</b><p>按内容支柱与表现形式组织月度复盘，调整选题、图文与短视频供给。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>02 / CONTENT INTERACTIONS</span><h3>内容互动</h3></div>
          <div class="g-decision-metrics">${field("fb-content-interactions")}</div>
          <p class="g-decision-question">识别用户更愿意参与的清洁情境与内容话题。</p>
          <div class="g-decision-action"><b>下一步行动</b><p>将评论和社群高频问题转化为教程、FAQ、互动内容及视频开场。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>03 / LINK & PAGE ACTION</span><h3>链接与页面访问</h3></div>
          <div class="g-decision-metrics">${field("fb-link-clicks")}${field("fb-visits")}</div>
          <p class="g-decision-question">观察内容引导用户进一步了解产品的意愿。</p>
          <div class="g-decision-action"><b>下一步行动</b><p>与电商和数据同事检查 CTA、商品页面及追踪链路，优化内容到商品的承接。</p></div>
        </article>
        <article class="g-decision-card">
          <div class="g-decision-card-head"><span>04 / COMMUNITY PARTICIPATION</span><h3>社群查看与参与</h3></div>
          <div class="g-decision-metrics">${field("group-viewers")}${field("group-posters")}${field("group-members")}</div>
          <p class="g-decision-question">结合成员规模、内容查看与实际讨论观察社群关系。</p>
          <div class="g-decision-action"><b>下一步行动</b><p>优化教程、清洁挑战和 UGC 活动，把成员问题反馈给产品与内容团队。</p></div>
        </article>
      </div>
      <div class="g-decision-review"><span>MANAGEMENT REVIEW LOOP</span><div><b>分析表现</b><i>→</i><b>归类用户问题</b><i>→</i><b>明确优化优先级</b><i>→</i><b>更新内容与社群计划</b></div></div>
      <div class="g-story-note"><h3>如何将复盘结论交给团队</h3><p>按内容主题、表现形式和用户反馈筛选下期选题；涉及产品使用疑问时联动产品与客服，涉及链接承接时与电商、数据团队协作优化页面信息。</p></div>
      <div class="g-decision-links"><a href="#/data/social">查看社媒增长数据 ↗</a><a href="#/case/community">查看 Facebook Group 项目 ↗</a></div>
    </section>`;
  }
  function socialLoop() {
    return `<section class="g-module g-social-loop">
      ${header(
        "PERFORMANCE REVIEW / CONTINUOUS IMPROVEMENT",
        "社媒数据复盘与内容调整",
        "结合浏览、互动、链接点击与社群反馈，调整后续选题和产品演示内容。",
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
    return `<section class="g-module g-community" id="community-management">${header("FACEBOOK COMMUNITY MANAGEMENT", "Facebook Group｜内容互动与 UGC 运营", "围绕教程、投票、清洁挑战与 UGC 组织成员参与，并将高频问题回流到内容选题和 FAQ。")}<div class="g-community-onboarding"><article><span>POSITIONING / 社群定位</span><h3>围绕真实清洁任务组织交流</h3><p>以产品使用、清洁方法和家庭场景为主题，让成员提问、投票并分享经验。</p></article><article><span>RULES / 参与规则</span><h3>明确讨论边界与投稿授权</h3><p>说明参与方式、隐私要求和内容使用范围；成员内容用于品牌传播前，单独确认授权。</p></article></div><div class="g-project-list g-project-calendar-plan" id="community-event-governance">
      <article><small>PROGRAM OWNER / 活动归属</small><h3>先按主要业务目标确定唯一负责人</h3><p>公开激活、上市传播、整合 Campaign 或联合营销，由 GTM / Campaign 负责人统筹；成员关系、支持、教育与生命周期活动由社群 / CRM 负责人负责；单纯内容帖或提醒文案由内容负责人承担。活动落在 Group 时，按品牌传播、用户参与或社区关系的目标分配相应负责人。</p></article>
      <article><small>EVENT CONTRACT / 活动准入</small><h3>先锁定规则，再开放参与</h3><p>每场活动明确一个主业务目标、目标成员状态、市场与平台、参与资格、日期窗口、用户动作、奖励与履约、素材、审核答疑、身份与许可、主指标、Guardrails、取消 / 回滚条件和活动后交接。</p></article>
      <article><small>PARTICIPATION / 参与路径</small><h3>让参与、审核和内容复用各有边界</h3><p>话题邀约 → 自愿讨论 / 投稿 → 内容审核与答疑 → 单独确认使用授权 → 归档与复用。参与不要求正面评价；投稿不自动取得品牌商业使用权。</p></article>
      <article><small>MEASUREMENT / HANDOFF</small><h3>活动数据分开记录，结果交回对应负责人</h3><p>分开管理报名、活动参与、互动、UGC、链接点击及购买；营销许可独立确认。</p></article>
    </div><p class="g-chart-note">内容素材交付内容团队，用户关系交接 CRM，活动表现由 Campaign 负责人复盘。</p><div class="g-topic-layout"><div class="g-topic-buttons" role="group" aria-label="社群参与机制">${topics.map((t, i) => `<button data-g-topic="${i}" aria-pressed="${i === 0}"><b>${t[1]}</b><span>${t[0]}</span></button>`).join("")}</div><div data-topic-panel aria-live="polite">${topicPanel()}</div></div>${pathSteps(
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
      ["group-members", "社群成员数", "名", "成员规模快照"],
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
          <span class="g-community-metric-link">查看数据详情 <span aria-hidden="true">↗</span></span>
        </button>`).join("")}</div>
      
      <div class="g-source-evidence-actions"><a href="assets/evidence/facebook-group-insights.webp" target="_blank" rel="noopener noreferrer">打开匿名化后台截图 ↗</a><a href="#/data/social">查看完整社媒数据 ↗</a></div>
    </section>`;
  }
  function visual(c) {
    if (c.art === "03")
      return `<div class="g-campaign-art art-challenge" aria-label="节庆社群传播内容设计"><small>SEASONAL / SOCIAL CAMPAIGN</small><strong>家务日常<br>也有节日故事。</strong><div><span>节庆主题</span><i>→</i><span>场景</span><i>→</i><span>互动</span></div></div>`;
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
    return `<div class="g-campaign-detail"><header><div><span>${c.label} · ${P.statuses[c.kind]}</span><h3>${c.name}</h3></div><button class="g-preview-link" data-g-preview="${c.id}">预览视觉资产 ↗</button></header><div class="g-campaign-fields">${fields.map((f) => `<article><h4>${f[0]}</h4><p>${f[1]}</p></article>`).join("")}</div><h4>Communication Timeline / 活动排期</h4>${pathSteps(
      [
        ["准备", "目标 / 规则 / 事实与授权"],
        ["预热", "主题解释 / 场景与参与说明"],
        ["活动期", "内容分发 / 讨论与审核"],
        ["复盘", "内容表现 / 用户反馈 / 调整动作"],
      ],
    )}</div>`;
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
          ?.insertAdjacentHTML("beforeend", association());
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
          '<dialog id="growth-preview" class="g-preview" aria-labelledby="growth-preview-title"><div class="dialog-bar"><h2 id="growth-preview-title">活动视觉</h2><button data-g-close>关闭 ×</button></div><div data-growth-preview-body></div></dialog>',
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
