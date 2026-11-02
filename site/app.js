(() => {
'use strict';
const P=window.PORTFOLIO,$=s=>document.querySelector(s),main=$('#main');
const state={category:'全部',evidence:'全部',query:'',domain:'social',showTable:false};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=s=>`<span class="badge ${s}">${s} · ${P.statuses[s]}</span>`;
const caseBy=id=>P.cases.find(c=>c.id===id),metricBy=id=>P.metrics.find(m=>m.id===id);
const caseLink=(id,label='阅读完整项目')=>`<a class="text-link" href="#/case/${id}">${label} <span aria-hidden="true">↗</span></a>`;
let previousRoute='',currentCase=null;
const metricCard=m=>`<button class="metric ${m.value===null?'missing':''}" data-evidence="${m.id}" aria-label="${esc(m.label)} ${esc(m.display)}，查看口径与证据"><span class="info" aria-hidden="true">↗</span><span class="metric-value-row"><span class="metric-value">${m.display}</span>${m.changeDisplay?`<span class="metric-change">${esc(m.changeDisplay)}</span>`:''}</span><span class="metric-label">${m.label}</span>${m.changeDisplay?`<span class="metric-change-note">平台显示变化 · 比较窗口待核</span>`:''}<span class="metric-note">${m.sourceType==='screenshot'?'后台截图记录':m.status==='PENDING'?'待核验':'历史记录'} · 点击查看口径</span></button>`;
const art=(n,alt,extra='')=>`<figure class="art ${extra}"><button data-image="${n}" aria-label="放大${esc(alt)}"><img src="assets/concept-${String(n).padStart(2,'0')}.png" alt="${esc(alt)}；匿名化概念视觉，不代表历史已投放成品" loading="lazy" width="1000" height="${n===1?1120:1200}"></button><figcaption class="art-caption">CONCEPT · 匿名化概念视觉</figcaption></figure>`;
const pageHead=(label,title,desc)=>`<div class="page-head"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="lede">${desc}</p></div>`;
const capArticles=(limit=9)=>P.capabilities.slice(0,limit).map(c=>`<article><h3>${c[0]}</h3><p class="english">${c[1]}</p><p>${c[2]}</p>${caseLink(c[3],'查看对应项目')}</article>`).join('');
function home(){return `<div class="wrap"><section class="home-hero"><div><p class="eyebrow">海外品牌营销 · GTM · 整合营销管理</p><h1>把复杂的市场问题，<br>变成清晰的品牌行动。</h1><p class="lede">从用户洞察到产品上市，连接策略、创意与交付。<br>以真实业务经历和可追问的工作物，讲述每一次判断。</p><div class="actions"><a class="btn" href="#/cases">阅读精选项目 <span aria-hidden="true">↗</span></a><a class="text-link" href="#/experience">了解职业经历</a></div><p class="hero-caption">项目与品牌匿名化展示 · 工作物的历史、重构与概念状态分别标注</p></div><aside class="hero-signature" aria-label="黄文琳"><div class="serif">HUANG<br>WENLIN</div><p>策略 / 创意 / 增长</p></aside></section>
 <section class="kpi-strip" aria-label="核心业务成果"><div class="kpi-head"><span class="accent">阶段传播表现</span><span class="muted">2025/04–12/30 · 统计窗口由本人提供，原报表待核</span></div><div class="kpi-grid">${['impressions','engagements','visits','follows'].map(id=>metricCard(metricBy(id))).join('')}</div><div class="metric-summary"><p>各指标独立呈现；访问与关注字段待核。</p><a class="text-link" href="#/data">查看数据与统计口径 ↗</a></div></section>
 <section class="snapshot-section" aria-label="Facebook 页面后台补充数据"><div class="section-head"><div><p class="eyebrow">SUPPLEMENTAL SNAPSHOT</p><h2>Facebook 页面后台快照</h2></div><a href="#/data/social">查看社媒数据与口径 ↗</a></div><p class="snapshot-note">来自另一张后台截图；完整统计窗口与比较期未显示，因此与上方 2025/04–12/30 历史汇总分开展示，不合并计算。</p><div class="snapshot-kpis">${['fb-views','fb-content-interactions','fb-link-clicks','fb-visits','fb-follows'].map(id=>metricCard(metricBy(id))).join('')}</div></section>
 <section class="section"><div class="section-head"><h2>精选项目</h2><a href="#/cases">查看全部案例 ↗</a></div><article class="featured">${art(1,'从用户任务到产品价值概念主视觉')}<div><p class="eyebrow">01 / 新品上市与产品营销</p><h3>从用户任务出发，<br>组织产品的价值表达。</h3><p>用户洞察 → 卖点分层 → 上市传播</p><p>参与产品营销与跨团队协同，把产品事实转译为可理解、可证明的一致信息。</p><div style="margin-top:20px">${badge('RECONSTRUCTED')}</div>${caseLink('gtm','阅读策略与工作物')}</div></article><div class="project-pair">${['social','brand'].map(id=>{const c=caseBy(id);return `<article class="project-mini"><p class="eyebrow">${c.no} / ${c.subtitle}</p><h3>${c.title}</h3><p>${c.decision}</p>${caseLink(id,'进入案例')}</article>`}).join('')}</div></section>
 <section class="section"><div class="section-head"><h2>核心能力</h2><a href="#/capabilities">查看完整能力结构 ↗</a></div><div class="cap-list">${capArticles(6)}</div></section>
 <section class="section home-experience"><div><p class="eyebrow">职业经历</p><h2 style="margin-top:20px">从商业经营，<br>走向品牌与市场。</h2><p class="muted">跨越商品经营、B2B 市场与消费品牌传播，逐步连接市场判断与组织交付。</p>${caseLink('operations','了解项目协作方式')}</div><div>${P.experiences.slice(0,3).map(e=>`<article class="career-row"><time>${e.date}</time><div><h3>${e.title}</h3><p>${e.role}</p></div></article>`).join('')}<a class="text-link" href="#/experience">查看完整经历 ↗</a></div></section>
 <section class="contact-band"><div><h2>让下一段工作，连接策略与行动。</h2><p>关注海外品牌营销、GTM 与整合营销管理机会。</p></div><a class="btn" href="#/contact">联系与交流 ↗</a></section></div>`}

function listPage(special=false){
 const cats=special?['B2B 海外市场','SEO / 商业增长','Creative / TVC','CRM / Lifecycle']:['新品上市与产品营销','品牌战略与 IMC','海外社媒增长','整合营销项目管理'];
 return `<div class="wrap">${pageHead(special?'专题项目':'案例中心',special?'不同业务场景，同样清晰的判断。':'每一个项目，都有它的问题与答案。',special?'将 B2B、搜索、电商、创意与用户关系分开阅读。历史经营结果与新方案各自保留证据边界。':'围绕真实经历，展示策略如何形成、资源如何组织，以及结果如何被解释。案例数量由经历与证据决定。')}
 ${special?'<div class="special-intro"><p>这些专题补充商业经营与内容能力，不与主案例重复累计成果。</p><p>匿名重构与概念工作物均有清晰标识。点击案例可查看角色、判断与复盘。</p></div>':''}
 <section class="filters" aria-label="案例筛选"><div class="filter-row"><span class="filter-label">业务领域</span>${['全部',...cats].map(t=>`<button class="chip" data-category="${t}" aria-pressed="${state.category===t}">${t}</button>`).join('')}</div><div class="filter-row"><span class="filter-label">证据状态</span>${['全部','DOCUMENTED','RECONSTRUCTED','CONCEPT'].map(t=>`<button class="chip" data-status="${t}" aria-pressed="${state.evidence===t}">${t==='全部'?'全部':P.statuses[t]}</button>`).join('')}</div><div class="filter-row"><label class="filter-field">搜索案例 <input id="case-search" type="search" placeholder="搜索项目、策略或职责" value="${esc(state.query)}"></label><span class="filter-meta" id="filter-count" role="status"></span></div></section><div class="project-list" id="case-list"></div></div>`
}
function updateList(special){
 const list=P.cases.filter(c=>(c.kind===(special?'special':'main'))&&(state.category==='全部'||c.category===state.category)&&(state.evidence==='全部'||c.status===state.evidence)&&`${c.title}${c.subtitle}${c.role}${c.decision}`.toLowerCase().includes(state.query.toLowerCase()));
 $('#case-list').innerHTML=list.length?list.map(c=>`<article class="project-row"><span class="project-number">${c.no}</span><div><p class="subtitle">${c.subtitle}</p><h2><a href="#/case/${c.id}">${c.title}</a></h2>${badge(c.status)}</div><p>${c.problem}</p><a class="round-link" href="#/case/${c.id}" aria-label="阅读${c.title}">↗</a></article>`).join(''):`<div class="empty-state"><h2>没有符合条件的项目</h2><p>试试其他领域或证据状态，或清除搜索条件。</p><button class="text-link" data-reset-filters>清除全部筛选 ↗</button></div>`;
 $('#filter-count').textContent=`${list.length} 个项目`;
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===state.category)));
 document.querySelectorAll('[data-status]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.status===state.evidence)));
}

const workSections={
 launch:{title:'上市传播 Brief',status:'RECONSTRUCTED',items:[['商业问题','用户难以把参数与自己的清洁任务联系起来。先回答“是否适合我、如何使用、凭什么相信”。'],['人群与任务','按任务、地材、购买顾虑和原有方法整理信息；不在未验证时填造用户画像规模。'],['核心信息','用户利益优先；特征、优势、利益、场景逐层展开。每项关键主张明确产品事实与证明要求。'],['交付与验收','产品口径、KV / 视频、FAQ、商品页、Creator Brief。所有触点核对同一事实，争议参数暂缓使用。']]},
 calendar:{title:'内容经营工作单',status:'RECONSTRUCTED',items:[['季度 · 明确主题','围绕用户任务与营销节点确定教育、演示、互动等内容支柱。'],['月度 · 组织渠道','按平台角色安排选题和日历，明确输入、责任人与站内承接目的。'],['周度 · 审核交付','Brief → 脚本 → 视觉 → 产品口径 / 使用权 → 发布检查。'],['复盘 · 回流问题','曝光、互动、点击分别看；将用户疑问反馈到下一轮选题、FAQ 与商品信息。']]},
 community:{title:'社群互动与素材授权说明',status:'RECONSTRUCTED',items:[['参与入口','围绕“你的使用问题是什么”征集地材、污渍、原有方法与操作条件。'],['内容要求','教程或挑战展示前提、操作过程与结果，不以跳剪制造夸大效果。'],['授权分开','参与投稿不默认同意商业使用。另行确认使用范围、时长、平台与撤回方式。'],['反馈沉淀','整理高频问题和使用障碍，交给内容与产品信息负责人；不编造投稿量与活动转化。']]},
 message:{title:'PR / Creator 交付清单',status:'RECONSTRUCTED',items:[['故事角度','围绕用户任务与品牌价值选角度。产品事实与传播主张分别审核。'],['事实与证明','可用产品信息、演示条件、FAQ、素材清单和不可使用的争议表述。'],['合作与使用权','明确内容形式、脚本审核、披露、使用范围、发布时间与承接页面。'],['效果字段','刊发、媒体提及、去重触达、点击分别记录；当前缺少单项原始结果，保持待补。']]},
 handoff:{title:'营销项目交付与审核单',status:'RECONSTRUCTED',items:[['输入确认','目标、受众、产品事实和允许主张明确。每项工作包有负责人与审核人。'],['版本与依赖','素材版本可追溯；产品输入先于素材定稿，站内承接先于传播执行检查。'],['质量检查','事实、版权、参数、排版、CTA 与追踪逐项检查；不将待核参数放入公开材料。'],['异常处理','发现问题 → 隔离受影响内容 → 找到事实负责人 → 修订回验 → 复盘。']]},
 account:{title:'B2B 客户研究与跟进框架',status:'RECONSTRUCTED',items:[['客户适配','公司类型、采购场景、产品匹配与可验证的需求信号。'],['触达记录','记录渠道、触达日期、回复与下一步。触达对象不自动升级为有效销售线索。'],['商务协同','询盘、报价、合同、交期、回款各有责任与记录；真实客户信息不公开。'],['复盘边界','潜客触达与成交额分项说明；未匹配阶段分母前不制作转化漏斗。']]},
 commerce:{title:'商品页与经营复盘框架',status:'RECONSTRUCTED',items:[['商品表达','核准产品信息，整理 Listing、A+、Store 的信息顺序与差异化价值。'],['搜索与投放','根据竞品、搜索词与阶段反馈调整关键词和 CPC 结构。'],['运营协同','促销与库存节奏、买家沟通、售后与账户健康同步检查。'],['数据核对','流量、CTR、CVR、销售额分开看；相对变化与百分点先核清，不反推未知原值。']]},
 seo:{title:'搜索内容与商业承接规划',status:'CONCEPT',items:[['内容目标','以节日清洁问题为主题入口，连接用户问题、操作内容与选型信息。'],['链接原则','主题页链接相关细分内容；每篇细分内容返回主题页，按语境连接 FAQ 或相关商品信息。'],['事实与使用','每篇文章核对产品适用范围与主张，涉及承诺的内容须另行确认。'],['发布与衡量','当前是内容计划；实际 URL、发布与收录状态待补，不宣称已产生这些 SEO 结果。']]},
 storyboard:{title:'创意 Brief 与分镜验收',status:'CONCEPT',items:[['信息任务','先明确受众、问题、允许主张、证据与下一步；再决定情绪故事或过程演示。'],['镜头连续','人物、环境、产品结构和操作条件保持一致，镜头变化不改变事实。'],['声音与字幕','画面、旁白、字幕各自承担信息；关键主张必须清晰可读且有依据。'],['版本适配','横竖屏重新检查字幕、动作、标题与 CTA，不将机械裁切当作适配完成。']]},
 crm:{title:'邮件与会员机制方案',status:'CONCEPT',items:[['用户状态','订阅 → 欢迎教育 → 浏览 / 加购意向 → 购买后 → 会员 → 召回。状态需由真实事件与同意判断。'],['发送条件','每封邮件明确受众、排除条件、频控、负责人和目的页。没有核验系统配置前不声称已经启用。'],['会员机制','Points 获取、使用与到期；VIP 权益与等级；Referral 关系、奖励及反作弊。规则为方案，不代表结果。'],['发送与承诺','2026 年 12 月排期为计划。物流和交付承诺须业务确认后方可使用；当前无已发送或收入数据。']]}
};
function workHtml(key){const w=workSections[key];return `<article class="work-paper" data-work-paper="${key}"><header><div><p class="eyebrow">工作物展示</p><h3>${w.title}</h3></div>${badge(w.status)}</header>${w.items.map(x=>`<div class="work-section"><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}<p class="small muted" style="margin-top:20px">${w.status==='CONCEPT'?'用于展示能力的方案样张，非历史已执行成品。':'依据真实经历重构的展示工作物，非历史原始文件或审批记录。'}</p></article>`}

const launchTimeline=[['预热','确认人群与信息','核准产品事实，整理用户任务、购买顾虑与核心信息，准备跨触点 Brief。'],['上市','一致表达与交付','协同 KV、视频、商品页、FAQ 与 Creator 信息；检查素材版本和承接。'],['持续','反馈与迭代','分别观察渠道表现与用户问题，反馈选题、演示和站点信息优化。']];
const opsTimeline=[['T−21','策略确认','目标、受众、信息主张、责任与批准输入。相对节点为建议排期，不是历史日期。'],['T−14','素材准备','拆解 KV、视频、PR、EDM 与搜索内容的工作包及依赖。'],['T−7','质量检查','核对产品事实、使用权、素材版本、承接、同意与追踪。'],['T0','执行核查','确认渠道动作、页面与关键内容可用；不把计划当作已上线。'],['T+7','结果复盘','记录可核指标、问题、限制和下一轮行动。']];
const crmTimeline=[['12/04','备客场景','2026-12-04 · 计划。面向活跃订阅者，组织节日备客与地面清洁内容。'],['12/09','礼赠选择','2026-12-09 · 计划。围绕礼赠意向安排价值表达与选型信息。'],['12/14','履约信息','2026-12-14 · 计划。原主题涉及截单或送达承诺，须物流确认后才可采用。'],['12/18','临近节日','2026-12-18 · 计划。面向高互动用户，检查排除、频控与目的页。'],['12/26','节后维护','2026-12-26 · 计划。为活跃顾客与老客安排节后复位与使用教育。']];
function timeline(type){const rows=type==='ops'?opsTimeline:type==='crm'?crmTimeline:launchTimeline;return `<div class="timeline" data-timeline="${type}"><div class="timeline-controls" role="group" aria-label="${type==='crm'?'2026 邮件计划节点':'项目节点'}">${rows.map((x,i)=>`<button class="timeline-button" data-timeline-index="${i}" aria-pressed="${i===0}">${x[0]}</button>`).join('')}</div><div class="timeline-panel" aria-live="polite"><h3>${rows[0][1]}</h3><p>${rows[0][2]}</p></div></div>`}
const scenes=[['00–03s','问题出现','用一眼可理解的场景或提问建立观看理由。避免夸大污渍、痛点或结果。'],['03–06s','建立张力','展示原有方法的摩擦，把用户需要与下一步行动连接。'],['06–10s','开始行动','展示使用条件与动作；产品结构与真实适用范围保持一致。'],['10–15s','过程证明','用连续动作解释效果，不以跳变替代证明。没有证据的参数不写入画面。'],['15–20s','回到生活','用空间和情绪变化收束故事，不承诺未经验证的产品性能。'],['20–25s','清楚的下一步','给出准确行动与限制说明，按投放触点适配 CTA。']];
function storyboard(){return `<div class="storyboard"><div class="scene-tabs" role="group" aria-label="创意分镜切换">${scenes.map((x,i)=>`<button data-scene="${i}" aria-pressed="${i===0}">${String(i+1).padStart(2,'0')} / ${x[1]}</button>`).join('')}</div><div id="scene-content" aria-live="polite">${sceneHtml(0)}</div><p class="scene-note">CONCEPT · 分镜任务示意，非历史影片；未制作视频或虚构投放表现。</p></div>`}
function sceneHtml(i){const s=scenes[i];return `<div class="scene-stage"><div class="scene-visual"><strong>${String(i+1).padStart(2,'0')}</strong><span>${s[0]} / 概念分镜</span></div><div class="scene-copy"><p class="small">${s[0]}</p><h3>${s[1]}</h3><p>${s[2]}</p></div></div>`}
function visualStructure(c){
 if(c.layout==='launch')return `${timeline('launch')}<p class="small muted" style="margin-top:16px">RECONSTRUCTED · 阶段结构重构；没有将建议节点写成历史日期。</p>`;
 if(c.layout==='brand')return `<div class="message-house"><div class="roof"><p class="small">品牌屋 · 匿名重构</p><h3>让产品价值可理解、可验证</h3></div><div class="pillars">${[['任务适配','人群、场景、使用条件'],['可信证明','产品事实、演示、证据'],['一致传播','主张、触点、承接']].map(x=>`<div><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div><div class="foundation">信息 / 证明 / 产品事实 / 素材使用权</div></div><div class="channel-matrix">${[['Social','认知、教育与互动'],['PR','事实包与第三方传播'],['Creator','场景体验与内容'],['站点','FAQ 与商品信息承接']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div><p class="small muted" style="margin-top:16px">RECONSTRUCTED · 策略与渠道分工示意，非某次合作的真实传播记录。</p>`;
 if(c.layout==='operations')return `${timeline('ops')}<p class="small muted" style="margin-top:16px">RECONSTRUCTED · 建议排期，不是某次历史项目的实际日期。</p>`;
 if(c.layout==='creative')return storyboard();
 if(c.layout==='crm')return `${timeline('crm')}<p class="small muted" style="margin-top:16px">CONCEPT · 2026 年未来计划，尚无发送与结果验证。</p>`;
 if(c.layout==='seo')return `<div class="topic-hub"><p class="small">主题内容 · 计划</p><h3>节日清洁与备客指南</h3><p class="small">主题总览连接九篇细分内容；不代表已发布或收录。</p></div><div class="spokes">${['厨房深清','地毯与松针','高频地板护理','客用浴室','省力与人体工学','户外与烧烤','临时应急','节后复位','实用礼赠'].map((t,i)=>`<div><span>${String(i+2).padStart(2,'0')}</span>${t}</div>`).join('')}</div>`;
 const rows=c.layout==='social'?[['季度','主题与内容支柱'],['月度','日历与渠道分工'],['周度','制作与审核'],['复盘','数据与问题回流']]:c.layout==='community'?[['参与','教程与问题'],['投稿','条件与过程'],['授权','范围与用途'],['回流','FAQ 与内容']]:c.layout==='b2b'?[['研究','客户适配与需求'],['触达','渠道与下一步'],['协同','商务与交付'],['复盘','分项业务记录']]:[['表达','Listing / A+'],['流量','搜索词与 CPC'],['经营','库存与促销'],['复盘','页面与数据']];
 return `<div class="channel-matrix">${rows.map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div><p class="small muted" style="margin-top:16px">RECONSTRUCTED · 工作结构重构；不作为历史执行日志或业务漏斗。</p>`;
}
function casePage(c){currentCase=c;return `<div class="wrap"><header class="case-head"><div class="breadcrumb"><a href="#/${c.kind==='main'?'cases':'special'}">${c.kind==='main'?'案例中心':'专题项目'}</a><span>/</span><span>${c.subtitle}</span></div><div class="case-heading"><div class="case-number">${c.no}</div><div><p class="eyebrow">${c.subtitle}</p><h1>${c.title}</h1>${badge(c.status)}</div></div><div class="case-meta"><div><b>我的角色</b>${c.role}</div><div><b>经历与证据范围</b>${c.scope}</div></div></header>
 <div class="case-content"><aside class="chapter-nav" aria-label="案例章节"><a href="#/case/${c.id}/overview">01 项目概览</a><a href="#/case/${c.id}/decision">02 策略决策</a><a href="#/case/${c.id}/planning">03 规划与组织</a><a href="#/case/${c.id}/work">04 创意与工作物</a><a href="#/case/${c.id}/results">05 结果与复盘</a></aside><article>
 <section id="overview" class="chapter"><h2>项目概览与商业问题</h2>${c.image?`<div class="case-cover">${art(c.image,c.subtitle+'概念视觉')}<div><h2>${c.subtitle}</h2><p>${c.problem}</p>${badge(c.image===3?'CONCEPT':'RECONSTRUCTED')}</div></div>`:`<p>${c.problem}</p>`}<p>${c.execution}</p></section>
 <section id="decision" class="chapter"><h2>关键策略决策</h2><blockquote class="decision-quote">${c.decision}</blockquote></section>
 <section id="planning" class="chapter"><h2>项目规划与资源组织</h2><div class="prose-grid"><div><h3>如何安排工作</h3><p>${c.plan}</p></div><div><h3>如何组织协作</h3><p>${c.resources}</p></div></div>${visualStructure(c)}</section>
 <section id="work" class="chapter"><div class="section-head"><h2>创意执行与工作物</h2><button class="text-link" data-work="${c.work}">展开阅读 ↗</button></div><p>${c.execution}</p>${workHtml(c.work)}</section>
 <section id="results" class="chapter"><h2>结果与复盘</h2><p>${c.result}</p>${c.metrics.length?`<div class="result-grid">${c.metrics.map(id=>metricCard(metricBy(id))).join('')}</div>`:''}${c.id==='seo'?donutChart('case'):''}<div class="note">${c.review}</div><a class="text-link" href="#/data/${c.metrics.length?metricBy(c.metrics[0]).domain:'social'}">查看独立数据中心 ↗</a></section>
 </article></div><div class="case-end"><a class="text-link" href="#/${c.kind==='main'?'cases':'special'}">← 返回${c.kind==='main'?'案例中心':'专题项目'}</a>${caseLink(P.cases[(P.cases.indexOf(c)+1)%P.cases.length].id,'下一个项目')}</div></div>`}

function donutChart(prefix='data'){
 const v=metricBy('organic-share').value,circ=2*Math.PI*74,dash=circ*v/100;
 return `<div class="chart-sheet" data-chart="organic-share"><h2>自然搜索的收入份额</h2><p class="small">历史阶段 · 统计窗口与归因模型待核。这是收入结构，不是增长率。</p><figure aria-label="自然搜索收入份额 82.46%，其他渠道合计补数 17.54%"><div class="donut-layout"><svg class="donut-svg" viewBox="0 0 240 240" role="group" aria-label="可交互的收入份额环图"><circle cx="120" cy="120" r="74" fill="none" stroke="#d2d7c8" stroke-width="25" tabindex="0" role="button" aria-label="其他渠道合计 17.54%，由 100% 减去 82.46% 推算，点击查看说明" data-evidence="organic-share" data-tip="其他渠道合计 17.54%：仅为 100% 减去自然搜索份额的推算补数。"/><circle cx="120" cy="120" r="74" fill="none" stroke="#a3422c" stroke-width="25" stroke-dasharray="${dash} ${circ-dash}" transform="rotate(-90 120 120)" tabindex="0" role="button" aria-label="自然搜索收入份额 82.46%，点击查看证据" data-case="seo" data-tip="自然搜索收入份额 82.46% · 历史文档记录。点击进入 SEO 案例。"/><text x="120" y="117" text-anchor="middle" class="donut-label">82.46%</text><text x="120" y="143" text-anchor="middle" class="donut-subtitle">自然搜索收入份额</text></svg></div><figcaption class="chart-legend"><button data-case="seo"><span class="swatch" aria-hidden="true"></span>自然搜索 82.46% · 查看案例 ↗</button><button data-evidence="organic-share"><span class="swatch other" aria-hidden="true"></span>其他渠道合计 17.54% · 推算补数</button></figcaption></figure><div class="chart-actions"><button data-chart-table="${prefix}" aria-expanded="false" aria-controls="${prefix}-chart-values">查看图表数值</button><button data-evidence="organic-share">统计口径与证据 ↗</button></div><div id="${prefix}-chart-values" hidden><table class="chart-table"><caption class="small muted">历史收入份额及推算补数</caption><thead><tr><th scope="col">渠道</th><th scope="col">份额</th><th scope="col">依据</th></tr></thead><tbody><tr><th scope="row">自然搜索</th><td>82.46%</td><td>历史记录</td></tr><tr><th scope="row">其他渠道合计</th><td>17.54%</td><td>100% − 82.46%</td></tr></tbody></table></div></div>`;
}
function chartEmpty(title,text){return `<div class="chart-sheet"><h2>${title}</h2><div class="empty-chart"><span aria-hidden="true">—</span><h3>数据待补充</h3><p>${text}</p></div></div>`}
function dataPage(){return `<div class="wrap">${pageHead('数据与证据','结果有出处，判断有边界。','按业务领域阅读成果，展开指标定义、统计窗口与来源。新增 Facebook 页面与 Group 后台截图数据独立归档；统计窗口未核前，不与既有汇总合并。')}<section class="data-controls" aria-label="数据业务领域"><div class="filter-row">${Object.entries(P.domains).map(([k,v])=>`<button class="chip" data-domain="${k}" aria-pressed="${state.domain===k}">${v}</button>`).join('')}</div></section><div id="data-panel" aria-live="polite"></div><div class="evidence-key">${['VERIFIED','DOCUMENTED','RECONSTRUCTED','CONCEPT','PENDING'].map(s=>badge(s)).join('')}<p>当前未取得原始平台导出，未将任何指标标为 VERIFIED。</p></div></div>`}
function updateData(){
 const domain=state.domain,metrics=P.metrics.filter(m=>m.domain===domain);
 const chart=domain==='search'?donutChart():chartEmpty(
  domain==='social'?'Facebook 页面表现趋势':domain==='community'?'社群参与与活跃情况':domain==='b2b'?'客户触达与交易阶段':domain==='commerce'?'电商阶段表现对比':'留存与会员结果',
  domain==='social'?'新增页面截图提供了汇总指标和平台显示的比较变化，但没有完整统计窗口、比较基期或逐日导出。保留指标卡与原始截图，不从截图曲线反推时间序列。':
  domain==='community'?'Group 截图提供了所选期间的发帖评论、查看人数及截图时成员规模；没有可读取的逐日原始数据，不重绘趋势，也不与其他社群阶段数据拼接。':
  domain==='b2b'?'各阶段的对象、分母与时间窗口尚未匹配，暂不绘制漏斗。':
  domain==='commerce'?'阶段原值、精确窗口及百分比类型待核，不反推基期或绘制虚构对比。':
  '当前为方案工作物，系统启用、邮件发送与业务结果待补。'
 );
 const domainNote=domain==='social'?'曝光、浏览、覆盖、互动、链接点击、访问与关注分别保留平台原字段。965K / 37K 历史汇总与新上传页面截图不是同一已确认统计窗口，不合并、不相加；截图显示的百分比变化也未显示比较期。':
  domain==='community'?'Group 成员数、发帖和评论人数、查看人数属于社群后台字段；与 Facebook Page 数据分开。截图中的 4,009 成员是否对应历史 +227 或约 1K/月记录，仍需确认社群对象和时间窗口。':
  domain==='search'?'收入份额反映结构；点击环比反映另一种变化。两者不能互相替代，也不能证明某份新内容计划已带来结果。':
  domain==='b2b'?'100+ 是月均触达的潜客规模，不是有效线索。成交额与触达没有匹配窗口前，不能据此计算转化。':
  domain==='commerce'?'Amazon 与 B2B 属于不同任期和业务链。相对百分比、百分点与金额的含义需要分别核对。':
  '邮件、会员和召回方案用于展示规划能力。没有系统与报表支持时，不展示复购率、会员收入或 ROI。';
 const comparisonNote=domain==='social'?'新截图中的 +1,358.3%、+1.7万%、+1,517.8% 与 +2,129.2% 是平台卡片显示值；未见比较窗口和基期，当前只保留原显示，不作为可复算增长率。':
  domain==='community'?'当前没有同一社群的两期成员数、期间新增和净增记录，不计算成员增长率或参与率。':
  domain==='search'?'GSC 点击环比约 +20% 有历史记录，但两个具体月份与原值待核。':
  domain==='social'?' +122.5% 互动变化有历史记录，但比较窗口与两期原值尚未核清。':'需补充同口径的两期原值、统计窗口与对象。';
 $('#data-panel').innerHTML=`<div class="data-kpis" aria-label="${P.domains[domain]}指标">${metrics.map(metricCard).join('')}</div><div class="data-chart-layout">${chart}<aside class="data-note"><p class="eyebrow">阅读这些数字之前</p><h3 style="margin-top:14px">先看对象，再看变化。</h3><p>${domainNote}</p><details><summary>指标解释如何查看？</summary><p>点击数字，或通过键盘聚焦后按 Enter，打开证据抽屉。新增截图指标可在抽屉中查看脱敏截图原貌。</p></details><details><summary>为什么部分图表暂时留空？</summary><p>缺少完整时间序列、原值、比较窗口或匹配分母时，图形会制造不存在的关系。这里保留数据需求，不以零或演示数字填充。</p></details><details><summary>证据状态代表什么？</summary><p>DOCUMENTED 表示截图或历史文档有记录，但不等于原始导出已核验；PENDING 表示仍需补充或核验。重构和概念只说明工作物性质，不证明历史效果。</p></details></aside></div><div class="pending-components"><article><h3>同期 / 环比对比</h3><p>${comparisonNote} 数据补齐后，再启用可复算的两期对比图。</p></article><article><h3>渠道对比与项目漏斗</h3><p>仅比较定义、窗口和对象一致的渠道。漏斗需同一业务链、分母与排除规则匹配；当前不将曝光、互动、关注或跨任期成果串联。</p></article></div>`;
 document.querySelectorAll('[data-domain]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.domain===domain)));
}

function capabilities(){return `<div class="wrap">${pageHead('能力展示','能力，体现在具体的判断里。','从市场与用户出发，连接品牌策略、产品表达、渠道协同与项目交付。每项能力都关联一个可以继续追问的项目。')}<section class="cap-list" style="padding-bottom:55px">${capArticles()}</section><section class="section"><div class="section-head"><h2>管理与协同方式</h2><a href="#/case/operations">阅读项目管理案例 ↗</a></div><div class="prose-grid"><div><h3>把工作拆成可交接的任务</h3><p>先确定目标、输入与责任，再安排制作、评审和验收。用 Brief、排期和版本记录减少重复沟通。</p></div><div><h3>把不确定性留在正确的位置</h3><p>产品事实由对应负责人确认；争议参数不进入公开材料；数据与结果不超出证据能够支持的范围。</p></div></div></section></div>`}
function experience(){return `<div class="wrap">${pageHead('职业经历','经历连接起来，形成今天的工作方式。','从商品与交易经营，到海外品牌传播与团队协同。关注商业目标，也关注创意和交付的质量。')}<section class="experience-layout"><aside class="experience-aside"><p class="serif">≈ 6</p><h2>年海外市场及跨境业务经验</h2><p>根据现有职业经历与项目资料整理；不按当前日期自动外推年限。</p><p>商务英语背景。以客户与用户理解为基础，逐步拓展到品牌传播、产品营销和项目管理。</p><p class="small">公开展示采用匿名业务场景。部分任职起止仍待进一步核实。</p></aside><div class="experience-list">${P.experiences.map(e=>`<article class="experience-item"><time>${e.date}</time><h2>${e.title}</h2><h3>${e.role}</h3><p>${e.body}</p>${caseLink(e.caseId,'查看相关项目')}</article>`).join('')}</div></section><section class="section"><h2>职责范围与协作</h2><div class="channel-matrix">${[['市场与内容','主题、内容支柱、日历、用户反馈'],['创意与审核','Brief、脚本、视觉与产品口径'],['项目与交付','责任分工、版本、评审与风险'],['数据与迭代','字段、窗口、复盘与下一步']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section></div>`}
function contact(){return `<div class="wrap">${pageHead('联系与交流','期待一段让策略落地的合作。','关注海外品牌营销、GTM / 产品营销，以及整合营销管理岗位。')}<div class="contact-layout"><section><h2>可以从一个具体问题开始。</h2><p>如何让新产品的价值更容易被理解？如何组织跨渠道传播与创意交付？如何让内容与用户反馈进入持续经营？</p><p>作品集提供项目、工作物与统计边界，便于进一步交流角色、判断与协作方式。</p><div class="actions"><a class="btn" href="#/cases">回到精选案例 ↗</a><button class="btn secondary" data-copy-intro>复制职业简介</button></div><span class="copy-status" role="status"></span></section><aside class="contact-panel"><p class="eyebrow">公开联系方式</p><h3>待本人确认后补充</h3><p>公开联系方式待补充。此处不展示未经确认的邮箱、电话或社交账号，也不设置虚假的发送表单。</p><p class="small">页面不设置访客信息收集或外部消息发送功能。</p></aside></div></div>`}
function about(){return `<div class="wrap">${pageHead('资料与证据说明','把展示与事实，放在同一条线上。','案例匿名化呈现；历史结果、经历重构与概念方案分别标注，让每项内容都保持清晰的事实边界。')}<div class="info-grid"><article><h2>五种证据状态</h2><ul class="status-list">${Object.entries(P.statuses).map(([k,v])=>`<li>${badge(k)}<span>${{VERIFIED:'有原始平台或业务证据支持。',DOCUMENTED:'有历史工作记录或资料支持，部分统计口径仍待核。',RECONSTRUCTED:'依据真实工作经历重新整理的展示工作物，不是历史原件。',CONCEPT:'为说明策略与创意能力而制作的概念方案。',PENDING:'来源、字段、统计窗口或结果仍需补充核验。'}[k]}</span></li>`).join('')}</ul></article><article><h2>案例与工作物</h2><p>作品集依据真实职业经历、历史项目资料与已提供的数据整理。品牌屋、传播矩阵、Brief、时间轴和制作流程等工作物，会按实际性质标注为经历重构或概念方案。</p><p>方法框架用于说明工作方式，不将方法库、工具能力或规划文件写成已经发生的业务成果。</p></article><article><h2>数据口径</h2><p>曝光、浏览、覆盖、互动、访问、点击、关注和社群成员分别呈现。不同平台、账户与统计窗口的数据不直接相加。</p><p>没有原始时间序列、可比基期或匹配分母时，不推算趋势、转化率或 ROI；缺失值不以零替代。</p></article><article><h2>隐私与公开范围</h2><p>案例中的品牌、社群与业务对象采用匿名化表达。公开页面不展示客户名单、内部文件路径、未经授权的项目外链或未确认的联系方式。</p><p>如需进一步了解具体项目职责、协作方式和数据口径，可在交流时结合可公开材料说明。</p></article></div></div>`}

function openEvidence(id,trigger){
 const m=metricBy(id);if(!m)return;
 const comparison=m.changeDisplay?`<dt>平台显示变化</dt><dd>${m.changeDisplay}。${m.changeNote||'比较窗口与基期待核，不作为可复算增长率。'}</dd>`:'';
 $('#evidence-content').innerHTML=`<p class="eyebrow">${m.platform}</p><h2 id="evidence-title">${m.label}</h2><div class="evidence-number">${m.display}</div>${badge(m.status)}<dl><dt>指标定义</dt><dd>${m.definition}</dd><dt>统计窗口</dt><dd>${m.window}</dd>${comparison}<dt>单位</dt><dd>${m.unit}</dd><dt>来源摘要</dt><dd>${m.source}</dd><dt>限制与待核内容</dt><dd>${m.limits}</dd></dl><p class="small muted">公开证据仅提供文字摘要；后台截图保留于私有资料，不在网站展示。</p><a class="btn" href="#/case/${m.caseId}" data-dialog-link>阅读对应案例 ↗</a><p class="small muted" style="margin-top:25px">原始后台导出待补充；当前不授予 VERIFIED。公开展示不暴露内部来源路径。</p>`;
 openDialog('evidence-dialog',trigger);
}
function openDialog(id,trigger){hideTip();const d=$('#'+id);d.returnFocus=trigger;if(!d.open)d.showModal();}
function closeDialog(id){const d=$('#'+id);if(d.open)d.close();if(d.returnFocus?.isConnected)d.returnFocus.focus({preventScroll:true});}
function openImage(n,trigger){$('#lightbox-title').textContent='匿名化概念主视觉';$('#lightbox-content').innerHTML=`<img src="assets/concept-${String(n).padStart(2,'0')}.png" alt="匿名化概念视觉完整图片"><p class="work-caption">CONCEPT · 匿名化概念视觉，非历史已投放成品。</p>`;openDialog('lightbox',trigger)}
function showTip(target,event){const tip=$('#tooltip');tip.textContent=target.dataset.tip;tip.hidden=false;const r=target.getBoundingClientRect();const x=event?.clientX||r.left+r.width/2,y=event?.clientY||r.top;tip.style.left=Math.max(12,Math.min(window.innerWidth-tip.offsetWidth-12,x+12))+'px';tip.style.top=Math.max(12,Math.min(window.innerHeight-tip.offsetHeight-12,y-tip.offsetHeight-15))+'px'}
function hideTip(){$('#tooltip').hidden=true}
function route(){
 const [page='home',id,chapter]=(location.hash.replace(/^#\/?/,'')||'home').split('/');
 const routeKey=`${page}/${id||''}`;const same=previousRoute===routeKey;
 document.querySelectorAll('dialog[open]').forEach(d=>d.close());hideTip();
 $('#navigation').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');
 if(same&&page==='case'&&chapter){document.getElementById(chapter)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
 previousRoute=routeKey;currentCase=null;
 if(page==='data'&&P.domains[id])state.domain=id;
 if(page==='cases'||page==='special'){if(!same){state.category='全部';state.evidence='全部';state.query='';}main.innerHTML=listPage(page==='special');updateList(page==='special');}
 else if(page==='home')main.innerHTML=home();
 else if(page==='case'&&caseBy(id))main.innerHTML=casePage(caseBy(id));
 else if(page==='data'){main.innerHTML=dataPage();updateData();}
 else if(page==='capabilities')main.innerHTML=capabilities();
 else if(page==='experience')main.innerHTML=experience();
 else if(page==='contact')main.innerHTML=contact();
 else if(page==='about')main.innerHTML=about();
 else main.innerHTML=`<div class="wrap"><div class="page-head"><p class="eyebrow">页面未找到</p><h1>这一页暂不存在。</h1><a class="text-link" href="#/home">返回首页 ↗</a></div></div>`;
 const active=page==='case'?(caseBy(id)?.kind==='special'?'special':'cases'):page;
 document.querySelectorAll('nav a').forEach(a=>{if(a.hash===`#/${active}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.title=`${page==='case'&&caseBy(id)?caseBy(id).title:({home:'黄文琳',cases:'案例中心',special:'专题项目',data:'数据与证据',capabilities:'核心能力',experience:'职业经历',contact:'联系与交流',about:'资料与证据说明'}[page]||'页面未找到')}｜品牌营销 · GTM`;
 main.classList.remove('page-enter');void main.offsetWidth;main.classList.add('page-enter');
 window.scrollTo({top:0,behavior:'instant'});if(chapter&&page==='case')requestAnimationFrame(()=>document.getElementById(chapter)?.scrollIntoView());
 if(route.hasRun)main.focus({preventScroll:true});route.hasRun=true;
}

document.addEventListener('click',async e=>{
 const t=e.target.closest('button,a,[role=button]');if(!t)return;
 if(t.matches('.skip')){e.preventDefault();main.focus();main.scrollIntoView();return}
 if(t.matches('.menu-button')){const open=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);return}
 if(t.hasAttribute('data-close')){closeDialog(t.dataset.close);return}
 if(t.hasAttribute('data-dialog-link')){t.closest('dialog')?.close();return}
 if(t.hasAttribute('data-evidence')){openEvidence(t.dataset.evidence,t);return}
 if(t.hasAttribute('data-image')){openImage(t.dataset.image,t);return}
 if(t.hasAttribute('data-work')){$('#lightbox-title').textContent=workSections[t.dataset.work].title;$('#lightbox-content').innerHTML=workHtml(t.dataset.work);openDialog('lightbox',t);return}
 if(t.hasAttribute('data-case')){hideTip();location.hash=`/case/${t.dataset.case}`;return}
 if(t.hasAttribute('data-category')){state.category=t.dataset.category;updateList(location.hash.startsWith('#/special'));return}
 if(t.hasAttribute('data-status')){state.evidence=t.dataset.status;updateList(location.hash.startsWith('#/special'));return}
 if(t.hasAttribute('data-reset-filters')){state.category='全部';state.evidence='全部';state.query='';$('#case-search').value='';updateList(location.hash.startsWith('#/special'));return}
 if(t.hasAttribute('data-domain')){state.domain=t.dataset.domain;updateData();return}
 if(t.hasAttribute('data-chart-table')){const el=document.getElementById(t.dataset.chartTable+'-chart-values');el.hidden=!el.hidden;t.setAttribute('aria-expanded',String(!el.hidden));t.textContent=el.hidden?'查看图表数值':'收起图表数值';return}
 if(t.hasAttribute('data-timeline-index')){const el=t.closest('[data-timeline]'),rows=el.dataset.timeline==='ops'?opsTimeline:el.dataset.timeline==='crm'?crmTimeline:launchTimeline,row=rows[Number(t.dataset.timelineIndex)];el.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===t)));el.querySelector('.timeline-panel').innerHTML=`<h3>${row[1]}</h3><p>${row[2]}</p>`;return}
 if(t.hasAttribute('data-scene')){const i=Number(t.dataset.scene);document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===t)));$('#scene-content').innerHTML=sceneHtml(i);return}
 if(t.hasAttribute('data-copy-intro')){const text='黄文琳｜海外品牌营销 / GTM / 整合营销管理。连接市场判断、产品表达、渠道协同与项目交付。';try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(text);$('.copy-status').textContent='职业简介已复制。'}catch{$('.copy-status').textContent='请选中复制：'+text}return}
});
document.addEventListener('input',e=>{if(e.target.id==='case-search'){state.query=e.target.value;updateList(location.hash.startsWith('#/special'))}});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){hideTip();if(!document.querySelector('dialog[open]')){$('#navigation').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');}}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [role=button]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
});
document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-tip]');if(t)showTip(t,e)});
document.addEventListener('pointerout',e=>{if(e.target.closest('[data-tip]'))hideTip()});
document.addEventListener('focusin',e=>{const t=e.target.closest('[data-tip]');if(t)showTip(t)});
document.addEventListener('focusout',e=>{if(e.target.closest('[data-tip]'))hideTip()});
window.addEventListener('scroll',hideTip,{passive:true});
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{if(d.returnFocus?.isConnected)d.returnFocus.focus({preventScroll:true})});d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog(d.id)})});
window.addEventListener('hashchange',route);route();
})();
