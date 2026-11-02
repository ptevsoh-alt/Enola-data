(() => {
'use strict';
const P=window.PORTFOLIO,$=s=>document.querySelector(s),main=$('#main');
const state={category:'全部',evidence:'全部',query:'',domain:'social',showTable:false};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=s=>`<span class="badge ${s}">${s} · ${P.statuses[s]}</span>`;
const caseBy=id=>P.cases.find(c=>c.id===id),metricBy=id=>P.metrics.find(m=>m.id===id);
const caseLink=(id,label='阅读完整项目')=>`<a class="text-link" href="#/case/${id}">${label} <span aria-hidden="true">↗</span></a>`;
let previousRoute='',currentCase=null;
const metricCard=m=>`<button class="metric ${m.value===null&&!m.range?'missing':''}" data-evidence="${m.id}" aria-label="${esc(m.label)} ${esc(m.display)}，查看口径与证据"><span class="info" aria-hidden="true">↗</span><span class="metric-value-row"><span class="metric-value">${m.display}</span>${m.changeDisplay?`<span class="metric-change">${esc(m.changeDisplay)}</span>`:''}</span><span class="metric-label">${m.label}</span>${m.changeDisplay?`<span class="metric-change-note">平台显示变化 · 比较窗口待核</span>`:''}<span class="metric-note">${m.sourceType==='screenshot'?'截图来源记录':m.status==='PENDING'?'待核验':'历史记录'} · 点击查看口径</span></button>`;
const art=(n,alt,extra='')=>`<figure class="art ${extra}"><button data-image="${n}" aria-label="放大${esc(alt)}"><img src="assets/concept-${String(n).padStart(2,'0')}.png" alt="${esc(alt)}；匿名化概念视觉，不代表历史已投放成品" loading="lazy" width="1000" height="${n===1?1120:1200}"></button><figcaption class="art-caption">CONCEPT · 匿名化概念视觉</figcaption></figure>`;
const pageHead=(label,title,desc)=>`<div class="page-head"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="lede">${desc}</p></div>`;
const capArticles=(limit=9)=>P.capabilities.slice(0,limit).map(c=>`<article><h3>${c[0]}</h3><p class="english">${c[1]}</p><p>${c[2]}</p>${caseLink(c[3],'查看对应项目')}</article>`).join('');
function home(){return `<div class="wrap"><section class="home-hero"><div><p class="eyebrow">海外品牌营销 · GTM · 整合营销管理</p><h1>把复杂的市场问题，<br>变成清晰的品牌行动。</h1><p class="lede">从用户洞察到产品上市，连接策略、创意与交付。<br>以真实业务经历和可追问的工作物，讲述每一次判断。</p><div class="actions"><a class="btn" href="#/cases">阅读精选项目 <span aria-hidden="true">↗</span></a><a class="text-link" href="#/experience">了解职业经历</a></div><p class="hero-caption">项目与品牌匿名化展示 · 工作物的历史、重构与概念状态分别标注</p></div><aside class="hero-signature" aria-label="黄文琳"><div class="serif">HUANG<br>WENLIN</div><p>策略 / 创意 / 增长</p></aside></section>
 <section class="kpi-strip" aria-label="核心业务成果"><div class="kpi-head"><span class="accent">阶段传播表现</span><span class="muted">不同项目与统计周期；增长率按原平台口径记录</span></div><div class="kpi-grid">${['impressions','engagements','fb-reach','ig-event-engagement-change'].map(id=>metricCard(metricBy(id))).join('')}</div><div class="metric-summary"><p>Meta 曝光与互动为 2025 汇总；Facebook 覆盖与 Instagram 活动互动为独立阶段结果，不拼接比较。</p><a class="text-link" href="#/data">查看数据与统计口径 ↗</a></div></section>
 <section class="snapshot-section" aria-label="Facebook 页面补充指标"><div class="section-head"><div><p class="eyebrow">SUPPLEMENTAL METRICS</p><h2>Facebook 页面补充指标</h2></div><a href="#/data/social">查看社媒数据与口径 ↗</a></div><p class="snapshot-note">来自另一份 Facebook 页面分析截图记录；完整统计窗口与比较期未显示，因此与上方 2025/04–12/30 历史汇总分开展示，不合并计算。</p><div class="snapshot-kpis">${['fb-views','fb-content-interactions','fb-link-clicks','fb-visits','fb-follows'].map(id=>metricCard(metricBy(id))).join('')}</div></section>
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
 launch:{title:'产品营销与新品上市工作框架',status:'RECONSTRUCTED',items:[
  ['市场与用户输入','汇总 Review / VOC、竞品功能与价格、搜索词和社群高频问题；识别目标人群、使用任务、购买异议和内容机会。研究结论用于确定信息优先级，不以未经验证的用户规模装饰报告。'],
  ['卖点与证据体系','核验产品参数、结构和适用范围；按 FABA 拆解特征、优势、用户利益与场景，以 FABE / RTB 明确每项主张的证明方式。将已确认内容整理为 KSP、FAQ、演示要点和待核信息清单。'],
  ['上市阶段与工作包','围绕预热、上市和持续推广分别明确目标、受众、核心信息、渠道角色、素材需求、CTA、负责人、审核节点和复盘指标。'],
  ['跨渠道交付与验收','统一 Social、商品页、KV、视频、Creator Brief 和 PR 资料中的产品事实；检查操作条件、画面表达、页面承接和素材版本，争议参数不进入公开传播。']
 ]},
 calendar:{title:'社媒内容经营与团队交付机制',status:'RECONSTRUCTED',items:[
  ['季度｜确定经营主题','根据业务重点、新品节奏、季节需求和用户教育任务确定季度主题，明确主推产品、目标人群、核心信息和阶段衡量指标。'],
  ['月度｜安排内容与资源','将主题拆成内容支柱、平台任务和月度日历；为每条内容明确负责人、形式、素材需求、发布时间、CTA 与承接页面。'],
  ['周度｜管理生产与审核','通过 Brief、脚本评审、视觉审核、产品事实核验、版权 / 使用权检查和发布前检查控制交付质量；识别延期与依赖问题。'],
  ['复盘｜把数据变成下一步','分别观察曝光、覆盖、互动、点击和站点承接；按内容支柱、形式、Hook、CTA 与平台窗口判断复用、调整或停止的内容。']
 ]},
 community:{title:'社群活动与 UGC 用户反馈机制',status:'RECONSTRUCTED',items:[
  ['活动设计','围绕用户真实使用问题设置教程、投票、清洁挑战和 UGC 投稿入口；说明参与条件、内容主题和活动规则。'],
  ['内容审核','核对用户投稿中的产品信息、操作前提和展示结果；避免剪辑或文案造成夸大效果。'],
  ['授权与合规','参与投稿不默认等于商业使用授权。另行确认使用平台、期限、范围、署名与撤回方式，再决定是否进入品牌素材库。'],
  ['反馈回流','将高频问题、使用障碍和场景反馈整理为 FAQ、内容选题及产品信息优化建议；成员数、查看人数和活跃人数分别统计。']
 ]},
 message:{title:'品牌传播与 PR / Creator 交付清单',status:'RECONSTRUCTED',items:[
  ['品牌与传播主张','明确品牌价值、目标受众、产品利益和可信证明；按 Social、PR、Creator、官网和展会等触点分配表达任务。'],
  ['事实包与内容 Brief','准备已确认的产品信息、适用场景、演示条件、FAQ、图片 / 视频素材和不可使用的争议表述。'],
  ['合作与内容治理','明确合作目标、内容形式、脚本审核、披露要求、素材使用范围、发布时间和承接页面；品牌资产保持版本可追溯。'],
  ['效果与复盘字段','刊发数量、媒体提及、去重触达、点击和站内行为分开记录；缺少原始记录时不补造 Earned Reach 或 Share of Voice。']
 ]},
 handoff:{title:'团队协作与营销项目交付标准',status:'RECONSTRUCTED',items:[
  ['目标与责任','将营销目标拆为工作包，明确交付内容、负责人、输入方、审核人、优先级和完成标准。'],
  ['排期与依赖','先确认产品事实、素材权限和站内承接，再安排脚本、设计、视频和发布节点；关键版本与修改原因留痕。'],
  ['质量验收','逐项检查产品参数、事实主张、视觉表达、字幕、版权、CTA、链接和追踪；未确认内容不进入公开发布。'],
  ['异常与复盘','发现风险后定位受影响素材、暂停错误版本、找到事实负责人、修订并回验；复盘问题来源，更新 Brief 和审核要求。']
 ]},
 account:{title:'海外 B2B 客户开发与商务跟进框架',status:'RECONSTRUCTED',items:[
  ['客户研究与适配','根据客户类型、采购场景、产品匹配度和需求信号筛选目标对象；区分普通触达、回复、有效询盘与销售机会。'],
  ['渠道触达与记录','组合搜索、LinkedIn、社媒和 EDM 进行分层触达；记录来源、触达时间、回复、采购意向和下一步动作。'],
  ['展会与商务协同','展前准备目标客户、KV、画册和样品；现场收集需求，展后按意向跟进询盘、报价、合同、交期、回款和售前售后问题。'],
  ['数据与销售反馈','潜客触达、邮件打开、线索转化和成交额分别呈现；在分母与阶段定义一致前不制作完整漏斗。']
 ]},
 commerce:{title:'Amazon 商品经营与投放复盘框架',status:'RECONSTRUCTED',items:[
  ['商品信息架构','核准产品信息与差异化卖点，规划 Listing、A+、Store 和 Posts 的信息顺序、场景表达及信任要素。'],
  ['搜索与广告管理','结合竞品和搜索词规划 CPC 结构；分别观察曝光、CTR、CPC、CVR、ACOS 和销售反馈，定位流量或页面问题。'],
  ['经营协同','同步促销与库存节奏、买家沟通、售后、账户健康和站外合作；避免单独放大广告投入而忽略履约与利润。'],
  ['结果核算','销售额、转化率、利润率、投诉率和好评率按各自定义核对；相对变化与百分点不混用，不反推未知原值。']
 ]},
 seo:{title:'SEO 内容策略与独立站承接规划',status:'CONCEPT',items:[
  ['搜索需求研究','从关键词主题、搜索意图、用户疑问和购买顾虑确定内容方向；优先解决具体问题，而不是只增加文章数量。'],
  ['主题集群与页面分工','以 Pillar Blog 组织核心主题，细分文章回答具体问题，FAQ 处理高频疑虑，商品页承接选型与购买信息。'],
  ['跨渠道内容协同','将社媒评论与 Creator 反馈作为新问题来源；通过内部链接、EDM 和 Shopify 页面延续用户阅读与选型路径。'],
  ['发布与衡量','核对 URL、上线状态、收录、查询词、落地页和 GA4 渠道收入定义。当前部分内容为规划样张，不宣称已发布或已产生相应 SEO 结果。']
 ]},
 storyboard:{title:'创意 Brief、脚本与视频质量验收',status:'CONCEPT',items:[
  ['传播任务','先明确受众、传播阶段、用户问题、核心主张、证明方式和 CTA，再选择情绪叙事、功能演示、UGC 或对比形式。'],
  ['脚本与镜头结构','为每个镜头明确人物、场景、动作、产品状态、信息任务和情绪作用；确保开场 Hook、过程、证明与收束形成完整逻辑。'],
  ['产品事实与连续性','核对产品结构、操作条件、功能表现、字幕和旁白；镜头变化不能改变产品事实或制造不真实的使用结果。'],
  ['版本与发布检查','针对横竖屏重新检查构图、字幕安全区、标题、声音、CTA 和落地页；概念分镜不作为历史投放或销售证明。']
 ]},
 crm:{title:'EDM 与用户生命周期规划框架',status:'CONCEPT',items:[
  ['用户状态与触发','区分订阅、浏览、加购、购买后、会员和召回状态；触发条件必须来自可核验事件与用户同意。'],
  ['发送治理','每条 Flow 明确发送 Owner、受众、排除条件、频控、优惠规则和目的页；先治理重复发送与 Consent，再开放自动化。'],
  ['会员与推荐机制','分别定义 Points 获取、使用与到期，VIP 等级与权益，以及 Referral 关系、奖励和反作弊规则。'],
  ['上线与结果验收','核验发送域名、DNS、平台权限、名单治理、测试发送和退订逻辑；方案、系统启用、实际发送与收入结果分开记录。']
 ]}
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
function dataPage(){return `<div class="wrap">${pageHead('数据与证据','结果有出处，判断有边界。','按业务领域阅读成果，展开指标定义、统计窗口与来源。新增 Facebook 页面与 Group 的截图来源指标独立列示；统计窗口未核前，不与既有汇总合并。')}<section class="data-controls" aria-label="数据业务领域"><div class="filter-row">${Object.entries(P.domains).map(([k,v])=>`<button class="chip" data-domain="${k}" aria-pressed="${state.domain===k}">${v}</button>`).join('')}</div></section><div id="data-panel" aria-live="polite"></div><div class="evidence-key">${['VERIFIED','DOCUMENTED','RECONSTRUCTED','CONCEPT','PENDING'].map(s=>badge(s)).join('')}<p>当前未取得原始平台导出，未将任何指标标为 VERIFIED。</p></div></div>`}
function updateData(){
 const domain=state.domain,metrics=P.metrics.filter(m=>m.domain===domain);
 const chart=domain==='search'?donutChart():chartEmpty(
  domain==='social'?'Facebook 页面表现趋势':domain==='community'?'社群参与与活跃情况':domain==='b2b'?'客户触达与交易阶段':domain==='commerce'?'电商阶段表现对比':'留存与会员结果',
  domain==='social'?'新增页面截图提供了汇总指标和平台显示的比较变化，但没有完整统计窗口、比较基期或逐日导出。保留指标卡与文字证据摘要，不从截图曲线反推时间序列；原始后台图片不在公开页面展示。':
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
 $('#data-panel').innerHTML=`<div class="data-kpis" aria-label="${P.domains[domain]}指标">${metrics.map(metricCard).join('')}</div><div class="data-chart-layout">${chart}<aside class="data-note"><p class="eyebrow">阅读这些数字之前</p><h3 style="margin-top:14px">先看对象，再看变化。</h3><p>${domainNote}</p><details><summary>指标解释如何查看？</summary><p>点击数字，或通过键盘聚焦后按 Enter，打开证据抽屉。截图来源指标仅展示文字摘要、来源、统计窗口和限制；原始图片不公开。</p></details><details><summary>为什么部分图表暂时留空？</summary><p>缺少完整时间序列、原值、比较窗口或匹配分母时，图形会制造不存在的关系。这里保留数据需求，不以零或演示数字填充。</p></details><details><summary>证据状态代表什么？</summary><p>DOCUMENTED 表示截图或历史文档有记录，但不等于原始导出已核验；PENDING 表示仍需补充或核验。重构和概念只说明工作物性质，不证明历史效果。</p></details></aside></div><div class="pending-components"><article><h3>同期 / 环比对比</h3><p>${comparisonNote} 数据补齐后，再启用可复算的两期对比图。</p></article><article><h3>渠道对比与项目漏斗</h3><p>仅比较定义、窗口和对象一致的渠道。漏斗需同一业务链、分母与排除规则匹配；当前不将曝光、互动、关注或跨任期成果串联。</p></article></div>`;
 document.querySelectorAll('[data-domain]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.domain===domain)));
}

function capabilities(){return `<div class="wrap">${pageHead('能力展示','能力，体现在具体的判断里。','从市场与用户出发，连接品牌策略、产品表达、渠道协同与项目交付。每项能力都关联一个可以继续追问的项目。')}<section class="cap-list" style="padding-bottom:55px">${capArticles()}</section><section class="section"><div class="section-head"><h2>管理与协同方式</h2><a href="#/case/operations">阅读项目管理案例 ↗</a></div><div class="prose-grid"><div><h3>把工作拆成可交接的任务</h3><p>先确定目标、输入与责任，再安排制作、评审和验收。用 Brief、排期和版本记录减少重复沟通。</p></div><div><h3>把不确定性留在正确的位置</h3><p>产品事实由对应负责人确认；争议参数不进入公开材料；数据与结果不超出证据能够支持的范围。</p></div></div></section></div>`}
function experience(){return `<div class="wrap">${pageHead('职业经历','经历连接起来，形成今天的工作方式。','从 Amazon 店铺经营、海外 B2B 获客，到北美消费品牌传播与社媒团队管理。')}<section class="experience-layout"><aside class="experience-aside"><p class="serif">≈ 6</p><h2>年海外市场及跨境业务经验</h2><p>职业经历覆盖 Amazon 店铺从 0 到 1、海外 B2B 客户拓展、展会营销及北美消费品牌传播。</p><p>从商品经营和客户沟通，逐步延伸至产品营销、整合传播、内容团队管理与跨部门项目交付。</p><p class="small">公司、岗位及任职时间依据 2026-10-28 简历；具体品牌、产品与客户对象继续匿名化。</p></aside><div class="experience-list">${P.experiences.map(e=>`<article class="experience-item"><time>${e.date}</time><h2>${e.title}</h2><h3>${e.role}</h3><p>${e.body}</p>${caseLink(e.caseId,'查看相关项目')}</article>`).join('')}</div></section><section class="section"><h2>职责范围与协作</h2><div class="channel-matrix">${[['市场与内容','Review / VOC、竞品研究、季度主题、月度内容日历'],['产品与上市','FABA / FABE / RTB、KSP、Launch Brief、上市阶段与渠道资产'],['创意与审核','品牌故事、VI、KV、脚本、视频、Creator Brief 与素材使用'],['项目与交付','责任分工、排期、版本管理、质量检查与风险处理'],['增长与复盘','Reach、Engagement、Link Click、GA4、GSC、UTM 与站点承接'],['渠道与商务','B2B 客户分层、CRM / ERP、展会、询盘、报价与交付协同']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section><section class="section"><h2>教育背景与工具</h2><div class="channel-matrix"><article><h3>教育背景</h3><p>广州城建职业学院 · 商务英语（大专）<br>2017.09—2020.06</p></article><article><h3>证书与工具</h3><p>英语四级口语 · 初级笔译 · 计算机二级<br>Office · Canva · 剪映 · ChatGPT · Gemini</p></article></div></section></div>`}
function contact(){return `<div class="wrap">${pageHead('联系与交流','期待一段让策略落地的合作。','关注海外品牌营销、GTM / 产品营销，以及整合营销管理岗位。')}<div class="contact-layout"><section><h2>可以从一个具体问题开始。</h2><p>如何让新产品的价值更容易被理解？如何组织跨渠道传播与创意交付？如何让内容与用户反馈进入持续经营？</p><p>作品集提供项目、工作物与统计边界，便于进一步交流角色、判断与协作方式。</p><div class="actions"><a class="btn" href="#/cases">回到精选案例 ↗</a><button class="btn secondary" data-copy-intro>复制职业简介</button></div><span class="copy-status" role="status"></span></section><aside class="contact-panel"><p class="eyebrow">联系方式 · 深圳</p><h3>欢迎就海外品牌营销与 GTM 机会交流</h3><p><a class="text-link" href="mailto:enolahwong@gmail.com">enolahwong@gmail.com</a></p><p><a class="text-link" href="tel:+8615119433912">+86 151 1943 3912</a></p><p class="small">联系方式来自本人简历。页面不收集访客数据，也不设置外部消息发送表单。</p></aside></div></div>`}
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
 if(t.hasAttribute('data-copy-intro')){const text='黄文琳｜近 6 年海外市场及跨境业务经验，覆盖 Amazon 店铺 0 到 1、海外 B2B 获客、北美消费品牌传播；方向为海外品牌营销、GTM、整合营销与产品营销。';try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(text);$('.copy-status').textContent='职业简介已复制。'}catch{$('.copy-status').textContent='请选中复制：'+text}return}
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
