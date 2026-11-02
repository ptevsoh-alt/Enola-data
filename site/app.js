(() => {
'use strict';
const P=window.PORTFOLIO,$=s=>document.querySelector(s),main=$('#main');
const state={category:'全部',evidence:'全部',query:'',domain:'social',showTable:false};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=s=>`<span class="badge ${s}">${P.statuses[s]||s}</span>`;
const caseBy=id=>P.cases.find(c=>c.id===id),metricBy=id=>P.metrics.find(m=>m.id===id);
const caseLink=(id,label='阅读完整项目')=>`<a class="text-link" href="#/case/${id}">${label} <span aria-hidden="true">↗</span></a>`;
let previousRoute='',currentCase=null;
const metricOrigin=m=>m.sourceType==='screenshot'?'平台后台截图':m.status==='PENDING'?'历史记录':m.status==='DOCUMENTED'?'历史业务记录':m.status==='RECONSTRUCTED'?'经历整理':'规划示意';
const metricBadge=m=>`<span class="source-label">${metricOrigin(m)}</span>`;
const metricCard=m=>`<button class="metric ${m.value===null&&!m.range?'missing':''}" data-evidence="${m.id}" aria-label="${esc(m.label)} ${esc(m.display)}，查看指标说明"><span class="info" aria-hidden="true">↗</span><span class="metric-value-row"><span class="metric-value">${m.display}</span>${m.changeDisplay?`<span class="metric-change">${esc(m.changeDisplay)}</span>`:''}</span><span class="metric-label">${m.label}</span>${m.changeDisplay?`<span class="metric-change-note">${m.sourceType==='screenshot'?'截图显示变化':'历史资料记录变化'}</span>`:''}<span class="metric-note">${metricOrigin(m)} · 查看数据说明</span></button>`;
const art=(n,alt,extra='')=>`<figure class="art ${extra}"><button data-image="${n}" aria-label="放大${esc(alt)}"><img src="assets/concept-${String(n).padStart(2,'0')}.png" alt="${esc(alt)}；匿名化概念视觉，不代表历史已投放成品" loading="lazy" width="1000" height="${n===1?1120:1200}"></button><figcaption class="art-caption">CONCEPT · 匿名化概念视觉</figcaption></figure>`;
const pageHead=(label,title,desc)=>`<div class="page-head"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="lede">${desc}</p></div>`;
const capArticles=(limit=10)=>P.capabilities.slice(0,limit).map(c=>`<article><h3>${c[0]}</h3><p class="english">${c[1]}</p><p>${c[2]}</p>${caseLink(c[3],'查看对应项目')}</article>`).join('');
function creatorSnapshot(){return '<section class="snapshot-section creator-snapshot" aria-label="达人合作与内容资产数据"><div class="section-head"><div><p class="eyebrow">CREATOR OPERATIONS</p><h2>达人合作与内容资产</h2></div><a href="#/case/creator">查看完整案例 ↗</a></div><p class="snapshot-note">两个管理视图分别记录达人资源与内容 / 合作数据；统计窗口和字段不同，不合并为同一漏斗。</p><div class="snapshot-kpis">'+['creator-new','creator-videos','creator-active','creator-gmv-collabs'].map(id=>metricCard(metricBy(id))).join('')+'</div><p class="small muted">达人工作台：2026-10-25；红人运营工作台：统计窗口自 2026-04-01 起，数据截至 2026-10-28 09:20，2026-10-30 只读导入。</p></section>';}
function home(){return `<div class="wrap"><section class="home-hero"><div><p class="eyebrow">海外市场 · 产品营销 · 社媒团队管理</p><h1>负责海外社媒策略与团队交付，<br>参与四条产品线上市传播。</h1><p class="lede">近 6 年海外市场与跨境业务经验。2025.04–2026.09 负责北美消费品牌社媒策略与内容团队交付：制定季度传播主题和月度内容日历，安排选题与制作，审核脚本和视觉，协调产品、设计、视频、电商及 Creator，并跟进达人合作、内容授权与效果归因。参与 4 条核心产品线的用户与竞品信息整理、卖点分层和上市传播；此前有海外 B2B 客户开发及 Amazon 店铺从 0 到 1 经营经历。</p><div class="actions"><a class="btn" href="#/cases">阅读精选项目 <span aria-hidden="true">↗</span></a><a class="text-link" href="#/experience">查看工作经历</a></div><p class="hero-caption">案例按职责、交付物与结果展开；历史记录、经历重构和概念方案分别标注</p></div><aside class="hero-signature" aria-label="黄文琳"><div class="serif">HUANG<br>WENLIN</div><p>策略 / 内容 / 交付</p></aside></section>
 <section class="kpi-strip" aria-label="核心业务成果"><div class="kpi-head"><span class="accent">社媒阶段结果</span><span class="muted">Meta 2025 汇总与其他平台阶段记录分开呈现</span></div><div class="kpi-grid">${['impressions','engagements','fb-reach','ig-event-engagement-change'].map(id=>metricCard(metricBy(id))).join('')}</div><div class="metric-summary"><p>Meta 2025 年汇总为 96.5 万次曝光、3.7 万次互动；Facebook 覆盖与 Instagram 活动互动来自独立阶段记录。</p><a class="text-link" href="#/data/social">查看社媒指标说明 ↗</a></div></section>
 <section class="snapshot-section" aria-label="Facebook 页面分析截图指标"><div class="section-head"><div><p class="eyebrow">FACEBOOK PAGE INSIGHTS</p><h2>Facebook 页面表现数据</h2></div><a href="#/data/social">查看全部社媒数据 ↗</a></div><p class="snapshot-note">Facebook 页面分析后台截图记录（原图不公开）。截图未标注完整统计周期，因此与 Meta 2025 年汇总分开展示。</p><div class="snapshot-kpis">${['fb-views','fb-content-interactions','fb-link-clicks','fb-visits','fb-follows'].map(id=>metricCard(metricBy(id))).join('')}</div></section>
 ${creatorSnapshot()}
 <section class="section"><div class="section-head"><h2>精选项目</h2><a href="#/cases">查看全部案例 ↗</a></div><article class="featured">${art(1,'从用户任务到产品价值概念主视觉')}<div><p class="eyebrow">01 / 产品营销与新品上市</p><h3>参与四条核心产品线，<br>完成用户信息整理与上市传播协同。</h3><p>用户问题 / 竞品差异 / FABA 卖点 / Launch Brief</p><p>把 Review、VOC 和竞品信息整理成用户任务与购买顾虑，再形成卖点层级、FAQ、演示重点和渠道 Brief；协同设计、视频、电商与 Creator 完成 KV、演示内容和商品页素材。</p><div style="margin-top:20px">${badge('RECONSTRUCTED')}</div>${caseLink('gtm','查看本人职责与上市工作物')}</div></article><div class="project-pair">${['social','brand','creator'].map(id=>{const c=caseBy(id);return `<article class="project-mini"><p class="eyebrow">${c.no} / ${c.subtitle}</p><h3>${c.title}</h3><p>${c.execution}</p>${caseLink(id,'查看项目过程与结果')}</article>`}).join('')}</div></section>
 <section class="section"><div class="section-head"><h2>核心能力</h2><a href="#/capabilities">查看具体工作范围 ↗</a></div><div class="cap-list">${capArticles(6)}</div></section>
 <section class="section home-experience"><div><p class="eyebrow">职业经历</p><h2 style="margin-top:20px">从店铺经营与 B2B 获客，<br>转向品牌传播与团队管理。</h2><p class="muted">经历覆盖 Amazon Listing / A+ / Store / CPC、海外客户研究与展会跟进，以及北美消费品牌社媒策略、产品营销和跨部门内容交付。</p>${caseLink('operations','查看团队协作与项目交付')}</div><div>${P.experiences.slice(0,3).map(e=>`<article class="career-row"><time>${e.date}</time><div><h3>${e.title}</h3><p>${e.role}</p></div></article>`).join('')}<a class="text-link" href="#/experience">查看完整经历 ↗</a></div></section>
 <section class="contact-band"><div><h2>海外社媒团队管理、产品上市传播与跨渠道项目交付。</h2><p>工作内容包括季度传播主题、月度内容日历、团队任务分配、创意审核、产品卖点整理、Launch Brief 和周 / 月复盘。</p></div><a class="btn" href="#/contact">查看工作范围与联系方式 ↗</a></section></div>`}
function listPage(special=false){
 const cats=special?['B2B 海外市场','SEO / 商业增长','Creative / TVC','CRM / Lifecycle','Creator / KOL']:['新品上市与产品营销','品牌战略与 IMC','海外社媒增长','整合营销项目管理'];
 return `<div class="wrap">${pageHead(special?'专题项目':'案例中心',special?'B2B 获客、展会跟进与 Amazon 店铺经营。':'产品上市、社媒运营、品牌传播与团队项目管理。',special?'专题包括海外 B2B 客户开发、Amazon 店铺经营、SEO 内容规划、视频创意、EDM 生命周期，以及达人合作管理与内容资产运营。':'案例覆盖 4 条核心产品线上市传播、Facebook / Instagram 内容运营、美国 Facebook Group 社群、品牌 IMC、营销项目管理和 SEO 内容承接；每个项目说明本人负责的环节、协作对象、交付物和结果。')}
 ${special?'<div class="special-intro"><p>专题分别呈现海外 B2B 客户开发、Amazon 店铺经营、SEO 内容集群、视频创意、EDM 生命周期，以及 Creator 资源管理、合作进度、内容授权和 GMV 记录。</p><p>B2B 与 Amazon 按不同任期、不同经营指标分别展示。SEO、视频和 EDM 的方案工作物会标明规划或概念性质，不作为已发布或已投放结果。</p></div>':''}
 <section class="filters" aria-label="案例筛选"><div class="filter-row"><span class="filter-label">业务领域</span>${['全部',...cats].map(t=>`<button class="chip" data-category="${t}" aria-pressed="${state.category===t}">${t}</button>`).join('')}</div><div class="filter-row"><span class="filter-label">资料类型</span>${['全部','DOCUMENTED','RECONSTRUCTED','CONCEPT'].map(t=>`<button class="chip" data-status="${t}" aria-pressed="${state.evidence===t}">${t==='全部'?'全部':P.statuses[t]}</button>`).join('')}</div><div class="filter-row"><label class="filter-field">搜索案例 <input id="case-search" type="search" placeholder="搜索项目、策略或职责" value="${esc(state.query)}"></label><span class="filter-meta" id="filter-count" role="status"></span></div></section><div class="project-list" id="case-list"></div></div>`
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
 ]},
 creator:{title:'达人合作管理与内容资产工作框架',status:'RECONSTRUCTED',items:[
  ['资源池与筛选','维护达人资源库、备选达人库和合作红人库；按平台、地区、品类、受众匹配、内容形式与合作适配度整理候选对象。'],
  ['合作进度管理','将邀约、回复、合作确认、寄样、内容排期、发布与待处理事项分开记录；每个合作节点明确负责人、状态和下一步动作。'],
  ['内容资产与授权','内容库登记标题、平台、发布日期、内容链接与专属码；授权状态区分已授权、无授权和未备注，发布不自动等于商业使用许可。'],
  ['效果归因与复投','将达人、合作、内容、授权、专属码和订单记录逐项核验；GMV、佣金和结算字段分开管理，缺少匹配关系时不计算 ROI。']
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
function creatorWorkflow(mode='case'){
 const steps=[
  ['01','资源入库','平台、地区、品类、受众匹配与候选标签'],
  ['02','建联与合作','邀约、回复、合作确认、寄样与发布排期'],
  ['03','内容登记','标题、平台、发布日期、专属码与内容链接'],
  ['04','授权管理','已授权 / 无授权 / 未备注；区分发布与商业使用'],
  ['05','效果归因','订单与 GMV 记录、复投判断和结算核验']
 ];
 const flow='<ol class="creator-flow">'+steps.map(s=>'<li><span class="creator-step-no">'+s[0]+'</span><h3>'+s[1]+'</h3><p>'+s[2]+'</p></li>').join('')+'</ol>';
 const panels=mode==='case'
  ?'<div class="creator-source-grid"><article><p class="eyebrow">达人工作台 · 2026-10-25（北京）</p><strong>500</strong><h3>新增达人</h3><p>当前截图另显示今日待处理 0、待付款 ¥0.00；仅为当时工作台视图，不代表历史累计或最终结算。</p></article><article><p class="eyebrow">红人运营工作台 · 数据截至 2026-10-28 09:20</p><strong>200 / 226 / 107</strong><h3>内容、活跃达人与有 GMV 合作</h3><p>统计窗口自 2026-04-01 起，2026-10-30 只读导入；表内未见佣金字段。平台选项包括 Instagram、TikTok、YouTube 与 Reddit。</p></article></div>'
  :'<div class="creator-linkage"><p class="eyebrow">建议核验的数据关联键</p><div class="creator-key-chain"><span>达人 ID</span><b>→</b><span>合作 ID</span><b>→</b><span>内容 ID</span><b>→</b><span>授权记录</span><b>→</b><span>专属码 / 订单 ID</span></div><p class="small muted">这是建议的数据核验模型，不代表当前截图已经完成全部关联。GMV 金额不可辨识，佣金字段未提供。</p></div>';
 return '<div class="creator-workflow">'+flow+panels+'</div>';
}
function visualStructure(c){
 if(c.layout==='launch')return `${timeline('launch')}<p class="small muted" style="margin-top:16px">RECONSTRUCTED · 阶段结构重构；没有将建议节点写成历史日期。</p>`;
 if(c.layout==='brand')return `<div class="message-house"><div class="roof"><p class="small">品牌屋 · 匿名重构</p><h3>让产品价值可理解、可验证</h3></div><div class="pillars">${[['任务适配','人群、场景、使用条件'],['可信证明','产品事实、演示、证据'],['一致传播','主张、触点、承接']].map(x=>`<div><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div><div class="foundation">信息 / 证明 / 产品事实 / 素材使用权</div></div><div class="channel-matrix">${[['Social','认知、教育与互动'],['PR','事实包与第三方传播'],['Creator','场景体验与内容'],['站点','FAQ 与商品信息承接']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div><p class="small muted" style="margin-top:16px">RECONSTRUCTED · 策略与渠道分工示意，非某次合作的真实传播记录。</p>`;
 if(c.layout==='creator')return creatorWorkflow('case')+'<p class="small muted" style="margin-top:16px">RECONSTRUCTED · 流程按后台字段与运营管理任务整理；不同系统的快照不作为同一转化漏斗。</p>';
 if(c.layout==='operations')return `${timeline('ops')}<p class="small muted" style="margin-top:16px">RECONSTRUCTED · 建议排期，不是某次历史项目的实际日期。</p>`;
 if(c.layout==='creative')return storyboard();
 if(c.layout==='crm')return `${timeline('crm')}<p class="small muted" style="margin-top:16px">CONCEPT · 2026 年未来计划，尚无发送与结果验证。</p>`;
 if(c.layout==='seo')return `<div class="topic-hub"><p class="small">主题内容 · 计划</p><h3>节日清洁与备客指南</h3><p class="small">主题总览连接九篇细分内容；不代表已发布或收录。</p></div><div class="spokes">${['厨房深清','地毯与松针','高频地板护理','客用浴室','省力与人体工学','户外与烧烤','临时应急','节后复位','实用礼赠'].map((t,i)=>`<div><span>${String(i+2).padStart(2,'0')}</span>${t}</div>`).join('')}</div>`;
 const rows=c.layout==='social'?[['季度','主题与内容支柱'],['月度','日历与渠道分工'],['周度','制作与审核'],['复盘','数据与问题回流']]:c.layout==='community'?[['参与','教程与问题'],['投稿','条件与过程'],['授权','范围与用途'],['回流','FAQ 与内容']]:c.layout==='b2b'?[['研究','客户适配与需求'],['触达','渠道与下一步'],['协同','商务与交付'],['复盘','分项业务记录']]:[['表达','Listing / A+'],['流量','搜索词与 CPC'],['经营','库存与促销'],['复盘','页面与数据']];
 return `<div class="channel-matrix">${rows.map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div><p class="small muted" style="margin-top:16px">RECONSTRUCTED · 工作结构重构；不作为历史执行日志或业务漏斗。</p>`;
}
function caseStoryline(c){
 const n=P.caseNarratives?.[c.id];if(!n)return '';
 return `<section class="case-storyline" aria-label="项目工作路径"><div class="case-story-heading"><p class="eyebrow">项目路径</p><h2>${n.headline}</h2><p>${n.summary}</p></div><ol class="case-story-steps">${n.stages.map((s,i)=>`<li><span class="story-step-number">${String(i+1).padStart(2,'0')}</span><h3>${s.title}</h3><p>${s.detail}</p></li>`).join('')}</ol></section>`;
}
function caseEvidence(c){
 const n=P.caseNarratives?.[c.id];if(!n)return '';
 const groups=n.evidenceGroups||[];
 const blocks=groups.map(g=>{
  const items=g.metrics.map(id=>metricBy(id)).filter(Boolean);if(!items.length)return '';
  const domain=items[0].domain;
  return `<section class="case-evidence-group"><div class="case-evidence-head"><div><h3>${g.title}</h3><p>${g.description}</p></div><a class="text-link" href="#/data/${domain}">查看该组指标 ↗</a></div><div class="result-grid">${items.map(metricCard).join('')}</div></section>`;
 }).join('');
 return `<div class="case-evidence"><div class="case-evidence-intro"><p class="eyebrow">结果与指标</p><h3>与项目对应的业务指标</h3></div>${blocks||`<div class="case-evidence-empty"><b>可展示的工作结果</b><p>${n.evidenceNote}</p></div>`}${blocks?`<p class="case-evidence-note">${n.evidenceNote}</p>`:''}</div>`;
}
function casePage(c){
 currentCase=c;
 return `<div class="wrap"><header class="case-head"><div class="breadcrumb"><a href="#/${c.kind==='main'?'cases':'special'}">${c.kind==='main'?'案例中心':'专题项目'}</a><span>/</span><span>${c.subtitle}</span></div><div class="case-heading"><div class="case-number">${c.no}</div><div><p class="eyebrow">${c.subtitle}</p><h1>${c.title}</h1>${badge(c.status)}</div></div><div class="case-meta"><div><b>负责工作</b>${c.role}</div><div><b>项目范围</b>${c.scope}</div></div></header>
 ${caseStoryline(c)}
 <div class="case-content"><aside class="chapter-nav" aria-label="案例章节"><a href="#/case/${c.id}/overview">01 业务背景</a><a href="#/case/${c.id}/decision">02 策略判断</a><a href="#/case/${c.id}/planning">03 资源协同</a><a href="#/case/${c.id}/work">04 关键交付</a><a href="#/case/${c.id}/results">05 结果复盘</a></aside><article>
 <section id="overview" class="chapter"><h2>业务背景与关键挑战</h2>${c.image?`<div class="case-cover">${art(c.image,c.subtitle+'概念视觉')}<div><h2>${c.subtitle}</h2><p>${c.problem}</p>${badge(c.image===3?'CONCEPT':'RECONSTRUCTED')}</div></div>`:`<p>${c.problem}</p>`}</section>
 <section id="decision" class="chapter"><h2>关键判断与策略选择</h2><blockquote class="decision-quote">${c.decision}</blockquote></section>
 <section id="planning" class="chapter"><h2>目标拆解与资源协同</h2><div class="prose-grid"><div><h3>工作拆解与阶段安排</h3><p>${c.plan}</p></div><div><h3>资源配置与协作机制</h3><p>${c.resources}</p></div></div>${visualStructure(c)}</section>
 <section id="work" class="chapter"><div class="section-head"><h2>关键工作与管理交付</h2><button class="text-link" data-work="${c.work}">展开阅读 ↗</button></div><p>${c.execution}</p>${workHtml(c.work)}</section>
 <section id="results" class="chapter"><h2>阶段结果与业务复盘</h2><p>${c.result}</p>${caseEvidence(c)}${c.id==='seo'?donutChart('case'):''}<div class="note"><b>下一轮复盘重点</b><p>${c.review}</p></div>${c.metrics.length?`<a class="text-link" href="#/data/${metricBy(c.metrics[0]).domain}">查看本案例对应数据 ↗</a>`:''}</section>
 </article></div><div class="case-end"><a class="text-link" href="#/${c.kind==='main'?'cases':'special'}">← 返回${c.kind==='main'?'案例中心':'专题项目'}</a>${caseLink(P.cases[(P.cases.indexOf(c)+1)%P.cases.length].id,'下一个项目')}</div></div>`;
}

function donutChart(prefix='data'){
 const v=metricBy('organic-share').value,circ=2*Math.PI*74,dash=circ*v/100;
 return `<div class="chart-sheet" data-chart="organic-share"><h2>自然搜索收入份额</h2><p class="small">历史阶段记录 · 自然搜索收入占报告总收入的 82.46%；这是渠道结构，不是收入增长率。</p><figure aria-label="自然搜索收入份额 82.46%，其他渠道合计补数 17.54%"><div class="donut-layout"><svg class="donut-svg" viewBox="0 0 240 240" role="group" aria-label="可交互的收入份额环图"><circle cx="120" cy="120" r="74" fill="none" stroke="#d2d7c8" stroke-width="25" tabindex="0" role="button" aria-label="其他渠道合计 17.54%，由 100% 减去 82.46% 推算，点击查看说明" data-evidence="organic-share" data-tip="其他渠道合计 17.54%：由 100% 减去自然搜索份额计算。"/><circle cx="120" cy="120" r="74" fill="none" stroke="#a3422c" stroke-width="25" stroke-dasharray="${dash} ${circ-dash}" transform="rotate(-90 120 120)" tabindex="0" role="button" aria-label="自然搜索收入份额 82.46%，点击查看证据" data-case="seo" data-tip="自然搜索收入份额 82.46%。点击进入 SEO 案例。"/><text x="120" y="117" text-anchor="middle" class="donut-label">82.46%</text><text x="120" y="143" text-anchor="middle" class="donut-subtitle">自然搜索收入份额</text></svg></div><figcaption class="chart-legend"><button data-case="seo"><span class="swatch" aria-hidden="true"></span>自然搜索 82.46% · 查看案例 ↗</button><button data-evidence="organic-share"><span class="swatch other" aria-hidden="true"></span>其他渠道合计 17.54% · 算术补数</button></figcaption></figure><div class="chart-actions"><button data-chart-table="${prefix}" aria-expanded="false" aria-controls="${prefix}-chart-values">查看图表数值</button><button data-evidence="organic-share">查看指标说明 ↗</button></div><div id="${prefix}-chart-values" hidden><table class="chart-table"><caption class="small muted">自然搜索收入份额及算术补数</caption><thead><tr><th scope="col">渠道</th><th scope="col">份额</th><th scope="col">说明</th></tr></thead><tbody><tr><th scope="row">自然搜索</th><td>82.46%</td><td>历史资料记录</td></tr><tr><th scope="row">其他渠道合计</th><td>17.54%</td><td>100% − 82.46%</td></tr></tbody></table></div></div>`;
}
function chartEmpty(title,text){return `<div class="chart-sheet"><h2>${title}</h2><div class="empty-chart"><span aria-hidden="true">—</span><h3>暂不绘制趋势线</h3><p>${text}</p></div></div>`}
function followerStageChart(){return `<div class="chart-sheet"><h2>Facebook 粉丝规模阶段变化</h2><p class="small">任职阶段早期至后期的简历记录。起止采样日期未注明，按原记录下限展示，不代表逐月增长曲线。</p><figure class="line-chart" aria-label="Facebook 粉丝规模从 400+ 增至 1,900+ 的阶段变化"><svg viewBox="0 0 640 330" role="img" aria-labelledby="fb-stage-title fb-stage-desc"><title id="fb-stage-title">Facebook 粉丝规模阶段变化</title><desc id="fb-stage-desc">任职早期 400 以上，任职后期 1,900 以上。具体采样日期未注明。</desc><g class="chart-grid-lines"><path d="M76 34H590 M76 94H590 M76 154H590 M76 214H590 M76 274H590"/></g><g class="chart-axis-labels"><text x="64" y="39" text-anchor="end">2,000+</text><text x="64" y="99" text-anchor="end">1,500</text><text x="64" y="159" text-anchor="end">1,000</text><text x="64" y="219" text-anchor="end">500</text><text x="64" y="279" text-anchor="end">0</text></g><path class="chart-line" d="M145 226 L515 46"/><circle class="chart-point" cx="145" cy="226" r="7"/><circle class="chart-point" cx="515" cy="46" r="7"/><g class="chart-value-labels"><text x="145" y="204" text-anchor="middle">400+</text><text x="515" y="24" text-anchor="middle">1,900+</text></g><g class="chart-x-labels"><text x="145" y="307" text-anchor="middle">任职早期</text><text x="515" y="307" text-anchor="middle">任职后期</text></g></svg><figcaption class="small muted">来源：2026-10-28 简历中的 Facebook 粉丝规模记录（400+ → 1,900+）。</figcaption></figure><details><summary>查看图表数值与口径</summary><table class="chart-table"><thead><tr><th scope="col">阶段</th><th scope="col">粉丝规模</th></tr></thead><tbody><tr><th scope="row">任职早期</th><td>400+</td></tr><tr><th scope="row">任职后期</th><td>1,900+</td></tr></tbody></table><p class="small muted">起止采样日期未注明；图表仅呈现两个阶段记录，不推算增长率或月度变化。</p></details></div>`;}
function creatorOpsVisual(){return '<div class="chart-sheet creator-ops-sheet"><h2>达人合作与内容资产管理链路</h2><p class="small">将资源、合作、内容、授权与订单字段分层管理；当前数据以后台快照为主，不绘制未经匹配的转化漏斗。</p>'+creatorWorkflow('data')+'</div>';}
function dataPage(){return `<div class="wrap">${pageHead('数据表现','不同业务阶段的结果，按原平台口径分别呈现。','涵盖 Meta / Facebook / Instagram 社媒、Facebook Group 社群、Creator 达人合作、Google Search Console 搜索、海外 B2B 客户开发和 Amazon 店铺经营。点击任一指标，可查看字段定义、统计范围、来源摘要和数据说明。')}<section class="data-controls" aria-label="数据业务领域"><div class="filter-row">${Object.entries(P.domains).map(([k,v])=>`<button class="chip" data-domain="${k}" aria-pressed="${state.domain===k}">${v}</button>`).join('')}</div></section><div id="data-panel" aria-live="polite"></div><p class="small muted" style="padding:18px 0 42px">数据按平台、项目和统计周期分开展示；后台截图只展示来源摘要，不公开原图。</p></div>`}
function updateData(){
 const domain=state.domain,metrics=P.metrics.filter(m=>m.domain===domain);
 const chart=domain==='search'?donutChart():domain==='b2b'?followerStageChart():domain==='creator'?creatorOpsVisual():chartEmpty(
  domain==='social'?'社媒表现趋势':domain==='community'?'社群成员与参与趋势':domain==='b2b'?'B2B 客户开发趋势':domain==='commerce'?'Amazon 店铺经营趋势':'用户留存趋势',
  domain==='social'?'目前可用的是 Meta 2025 年汇总值，以及 Facebook 页面分析截图中的浏览、互动、点击等汇总指标。截图没有完整日期序列；取得同一 Page 的逐日或逐月数据后，再展示曝光、互动和链接点击折线。':
  domain==='community'?'现有记录包括截图时成员规模 4,009、所选期间发帖和评论人数 146、查看人数 34,387，以及另一阶段新增 227。它们不是连续成员增长数据，不能连成一条趋势线。':
  domain==='b2b'?'海外客户开发记录包括月均触达 100+ 潜客、邮件打开率 10%–15%、线索转化约 3% 和月度成交额约 30 万元；其中 Facebook 粉丝规模有任职早期与后期两个记录点，可作阶段变化展示，其他指标没有逐月明细。':
  domain==='commerce'?'Amazon 目前只有销售额变化约 +10%、转化率变化约 +5% 和项目利润率约 30% 的阶段结果，没有逐月销售或转化原值。':
  '目前展示的是邮件与会员生命周期规划，没有实际发送量、点击、下单和复购的连续记录。'
 );
 const domainNote=domain==='social'?'2025 年 Meta 汇总记录为 96.5 万次曝光、3.7 万次互动。另有 Facebook 页面分析截图记录 138.2 万次浏览、5.3 万次内容互动、7,364 次链接点击等；两组数据来源与统计周期不同，分别展示。':
  domain==='community'?'Facebook Group 截图所选范围为 2025/11/02–2026/09/30：发帖和评论人数 146、查看人数 34,387；4,009 是截图时成员规模。历史新增 +227 与约 1K/月来自其他阶段记录。':
  domain==='search'?'自然搜索收入份额 82.46% 反映渠道收入结构；GSC 点击环比约 +20% 是另一项搜索变化记录，两者不是同一指标。':
  domain==='b2b'?'海外 B2B 记录包括月均触达潜客 100+、线索转化约 3%、月度成交额约 30 万元；触达、线索和成交属于不同阶段，当前没有匹配的逐月分母。':
  domain==='commerce'?'Amazon 任期为 2022.07–2023.10，阶段记录包括销售额变化约 +10%、CVR 变化约 +5%、项目利润率约 30%；各项指标按原定义分别展示。':
  domain==='creator'?'达人工作台截图显示新增达人 500；另一套红人运营工作台在 2026-04-01 起的统计窗口内显示 200 条视频、226 位窗口内活跃达人和 107 条有 GMV 的合作。数据截至 2026-10-28 09:20，并于 2026-10-30 只读导入。':'目前可展示用户旅程、邮件内容波次、Consent 与频控规划；实际发送和复购结果尚无对应数据。';
 const comparisonNote=domain==='social'?'Facebook 页面截图中的 +1,358.3%、+1.7 万%、+1,517.8% 和 +2,129.2% 均为平台原图显示值，未标注比较周期；另有简历记录的链接点击近 +200%，两项来源分开展示。':
  domain==='community'?'4,009 是截图时成员规模；146 和 34,387 是所选期间的不同平台字段，不换算为社群活跃率。':
  domain==='search'?'82.46% 是收入份额，约 +20% 是 GSC 点击变化；缺少两期点击原值和月份，不绘制搜索趋势。':
  domain==='b2b'?'100+ 触达、约 3% 线索转化和月成交约 30 万元没有匹配的统计月份与分母，不制作完整销售漏斗。':
  domain==='commerce'?'销售额变化、CVR 变化和利润率分别展示；不反推基期，也不据此计算广告 ROI。':
  domain==='creator'?'500 来自 2026-10-25 的独立达人工作台；200、226、107 来自另一套工作台的不同字段，不拼成同一漏斗。播放、点赞、评论、收藏、转发数值不可辨识；GMV 金额不可辨识且未见佣金字段，不计算总 GMV、佣金、ROI 或结算收益。':'目前没有实际发送和复购记录，暂不展示留存或会员收入变化。';
 const domainCaseIds={social:'social',community:'community',search:'seo',b2b:'b2b',commerce:'amazon',lifecycle:'crm',creator:'creator'};
 const relatedCase=caseBy(domainCaseIds[domain]),relatedStory=P.caseNarratives?.[relatedCase?.id];
 const caseBridge=relatedCase?`<section class="domain-case-bridge"><div><p class="eyebrow">从数据回到业务动作</p><h3>${relatedCase.title}</h3><p>${relatedStory?.summary||relatedCase.execution}</p></div><a class="text-link" href="#/case/${relatedCase.id}">查看策略、团队交付与复盘 ↗</a></section>`:'';
 $('#data-panel').innerHTML=`<div class="data-kpis" aria-label="${P.domains[domain]}指标">${metrics.map(metricCard).join('')}</div><div class="data-chart-layout">${chart}<aside class="data-note"><p class="eyebrow">业务表现</p><h3 style="margin-top:14px">这些数字说明了什么</h3><p>${domainNote}</p><details><summary>数据如何阅读？</summary><p>趋势图只使用有两个以上真实时间或阶段记录的数据。其余指标保留原始汇总值，不将平均值或百分比变化拆成虚构月份。</p></details><details><summary>比较变化时看什么？</summary><p>${comparisonNote}</p></details><details><summary>如何查看指标来源？</summary><p>点击指标卡，可查看平台字段、统计窗口、来源摘要和必要说明。后台截图原图不公开。</p></details></aside></div>${caseBridge}<div class="pending-components"><article><h3>趋势图</h3><p>只在存在连续、同口径的真实日期或阶段记录时绘制趋势；其他数据保留原始汇总值，不补造中间点。</p></article><article><h3>指标口径</h3><p>Facebook Page、Facebook Group、Instagram、Creator、B2B 和 Amazon 分开统计；不同系统、字段和统计窗口不合并为同一漏斗。</p></article></div>`;
 document.querySelectorAll('[data-domain]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.domain===domain)));
}
function capabilities(){return `<div class="wrap">${pageHead('能力展示','覆盖产品营销、社媒运营、品牌传播、Creator 合作管理与商业渠道。','实际工作包括 4 条核心产品线的卖点整理与上市传播、Facebook / Instagram 内容运营、美国 Facebook Group 社群活动、品牌与 Creator 协同、SEO 内容规划、海外 B2B 客户开发及 Amazon 店铺经营。')}<section class="cap-list" style="padding-bottom:55px">${capArticles()}</section><section class="section"><div class="section-head"><h2>社媒团队与项目交付方式</h2><a href="#/case/operations">查看项目管理案例 ↗</a></div><div class="prose-grid"><div><h3>季度定方向，月度排内容</h3><p>季度先确定主推产品、传播主题和用户教育重点；月度日历再拆成 Facebook / Instagram / Group 的内容支柱、选题、形式、素材需求、负责人和发布时间。每条内容明确 Hook、核心信息、演示证明和 CTA。</p></div><div><h3>周度审核，月度复盘</h3><p>制作阶段检查脚本、画面、产品事实、字幕、链接和素材授权；发布后分别查看曝光、互动、链接点击和站点承接。复盘结论回写下一轮选题、创意 Brief 和资源安排。</p></div></div></section></div>`}
function experience(){return `<div class="wrap">${pageHead('职业经历','从 Amazon 经营与 B2B 获客，延伸至品牌传播和社媒团队管理。','2025.04–2026.09 担任社媒负责人 / 管理组长，负责季度传播主题、月度内容日历、小组任务与创意审核；参与 4 条核心产品线的用户信息整理、卖点分层和上市传播。此前有海外 B2B 客户拓展、展会跟进及 Amazon 店铺从 0 到 1 经营经历。')}<section class="experience-layout"><aside class="experience-aside"><p class="serif">≈ 6</p><h2>年海外市场及跨境业务经验</h2><p>最近一段经历的重点是社媒团队交付：季度主题、月度内容日历、任务分配、创意评审、脚本与视觉审核，以及周 / 月数据复盘。</p><p>产品营销工作覆盖 Review / VOC、竞品信息整理、FABA / FABE 卖点分层、Launch Brief 和 KV、演示视频、FAQ、商品页及 Creator Brief 协同。</p><p class="small">公司、岗位及任职时间依据 2026-10-28 简历；具体品牌、产品与客户对象匿名化展示。</p></aside><div class="experience-list">${P.experiences.map(e=>`<article class="experience-item"><time>${e.date}</time><h2>${e.title}</h2><h3>${e.role}</h3><p>${e.body}</p>${caseLink(e.caseId,'查看相关项目')}</article>`).join('')}</div></section><section class="section"><h2>业务职责与管理范围</h2><div class="channel-matrix">${[['社媒策略与团队交付','制定季度主题与月度日历；安排选题、文案、设计和视频任务；组织创意评审、脚本 / 视觉审核及周 / 月复盘。'],['产品营销与上市传播','参与 4 条核心产品线的用户与竞品信息整理、FABA / FABE 卖点分层，并协同完成 Launch Brief、KV、演示视频、FAQ、商品页和 Creator Brief。'],['品牌与创意协同','参与品牌故事、VI、Logo / IP、品牌画册、宣传片及产品演示内容；对外部素材审核产品事实、画面表达和使用范围。'],['跨部门项目管理','协调产品、设计、视频、电商、PR / Creator 和供应商；明确输入方、制作方、审核人、交付节点和版本要求。'],['增长数据复盘','分别查看 Meta 曝光与互动、Facebook 点击、GSC 搜索点击及 Shopify 页面承接；按平台和统计窗口解释数据，不跨口径拼接。'],['商业渠道经验','B2B 客户研究、渠道触达、展会、询盘、报价和交付协调；Amazon Listing、A+、Store、CPC、促销、库存和售后运营。']].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section><section class="section"><h2>教育背景与工具</h2><div class="channel-matrix"><article><h3>教育背景</h3><p>广州城建职业学院 · 商务英语（大专）<br>2017.09—2020.06</p></article><article><h3>证书与工具</h3><p>英语四级口语 · 初级笔译 · 计算机二级<br>Office · Canva · 剪映 · ChatGPT · Gemini</p></article></div></section></div>`}
function contact(){return `<div class="wrap">${pageHead('工作范围与联系','海外社媒策略与团队管理 / 产品营销与上市传播。','近 6 年海外市场与跨境业务经验，工作范围包括社媒内容体系、产品上市传播、品牌与 Creator 协同、SEO 内容规划、海外 B2B 客户拓展及 Amazon 店铺经营。')}<div class="contact-layout"><section><h2>可承担的工作</h2><h3>社媒策略与团队管理</h3><p>制定季度传播主题和月度内容日历，规划 Facebook、Instagram 与社群内容支柱；安排选题和制作任务，组织创意评审、脚本 / 视觉审核及周 / 月复盘。</p><h3>产品营销与 GTM</h3><p>整理 Review / VOC、竞品和用户场景，参与产品差异化定位与 FABA / FABE 卖点分层；协同产品、设计、视频、电商完成 Launch Brief、KV、演示视频、FAQ、商品页和 Creator Brief。</p><h3>整合营销与渠道协同</h3><p>协调 Social、PR / Creator、达人内容授权、SEO / Pillar Blog、EDM 与 Shopify 页面之间的内容分工和承接；此前也负责 B2B 客户研究、展会触达、询盘跟进，以及 Amazon Listing / A+ / Store / CPC 运营。</p><div class="actions"><a class="btn" href="#/cases">查看项目案例 ↗</a><button class="btn secondary" data-copy-intro>复制职业简介</button></div><span class="copy-status" role="status"></span></section><aside class="contact-panel"><p class="eyebrow">联系方式 · 深圳</p><h3>社媒团队管理 · GTM / 产品营销 · 整合传播</h3><p><a class="text-link" href="mailto:enolahwong@gmail.com">enolahwong@gmail.com</a></p><p><a class="text-link" href="tel:+8615119433912">+86 151 1943 3912</a></p><p class="small">联系方式来自本人简历。页面不收集访客数据，也不设置外部消息发送表单。</p></aside></div></div>`}
function about(){return `<div class="wrap">${pageHead('资料与数据说明','案例内容、指标定义和来源摘要分开展示。','历史资料记录、后台截图、经历重构和概念方案分别标注；每项指标可查看平台字段、统计周期、来源摘要及必要说明。')}<div class="info-grid"><article><h2>资料标注方式</h2><ul class="status-list"><li>${badge('DOCUMENTED')}<span>来自简历、历史项目资料或平台后台截图的记录；按原字段和已知统计周期展示。</span></li><li>${badge('RECONSTRUCTED')}<span>根据实际工作经历重新整理的 Brief、流程、矩阵或管理工作物，不作为历史原件。</span></li><li>${badge('CONCEPT')}<span>用于展示策略与创意能力的方案样张，不代表已发布、已投放或已产生经营结果。</span></li><li>${badge('PENDING')}<span>统计周期、账号范围或字段定义尚不完整；保留已知数值，不补算未知结果。</span></li></ul></article><article><h2>案例与工作物</h2><p>案例以真实职业经历、简历和已有项目资料为基础，重点说明本人负责的工作、协作对象、具体交付物和阶段结果；Creator 数据分别保留达人工作台与红人运营工作台的来源和统计窗口。品牌屋、传播矩阵、Brief、时间轴与流程样张按性质标注为经历重构或概念方案。</p><p>方法框架用于解释工作方式，不把规划文件写成已上线成果，也不把参与项目表述为独立拥有全部决策权。</p></article><article><h2>指标说明</h2><p>曝光、浏览、覆盖、互动、访问、点击、关注、社群成员、搜索点击、成交额和利润率分别呈现。点击指标卡可查看平台字段、统计窗口和来源摘要。</p><p>同一指标有连续日期数据时才展示折线趋势；只有阶段汇总或单次截图时，以结果卡呈现，不补造中间数据。</p></article><article><h2>公开范围</h2><p>Facebook 页面与 Group 后台截图仅展示文字来源摘要，原图不公开；社群名称、品牌和客户对象采用匿名化表达。</p><p>不展示客户名单、内部文件路径或未经授权的业务资料。</p></article></div></div>`}
function openEvidence(id,trigger){
 const m=metricBy(id);if(!m)return;
 const comparison=m.changeDisplay?`<dt>平台显示变化</dt><dd>${m.changeDisplay}。 ${m.changeNote||'平台截图保留该变化值，比较周期未显示。'}</dd>`:'';
 $('#evidence-content').innerHTML=`<p class="eyebrow">${m.platform}</p><h2 id="evidence-title">${m.label}</h2><div class="evidence-number">${m.display}</div><dl><dt>指标定义</dt><dd>${m.definition}</dd><dt>统计范围</dt><dd>${m.window}</dd>${comparison}<dt>单位</dt><dd>${m.unit}</dd><dt>来源摘要</dt><dd>${m.source}</dd><dt>数据说明</dt><dd>${m.publicNote||m.limits}</dd></dl><a class="btn" href="#/case/${m.caseId}" data-dialog-link>查看对应案例 ↗</a>`;
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
 if(t.hasAttribute('data-copy-intro')){const text='黄文琳｜近 6 年海外市场与跨境业务经验。2025.04–2026.09 担任社媒负责人 / 管理组长，负责北美消费品牌季度传播主题、月度内容日历、小组任务分配、创意评审、脚本 / 视觉审核及周 / 月复盘；参与 4 条核心产品线用户与竞品信息整理、卖点分层和上市传播。此前负责海外 B2B 客户研究、渠道触达、展会及询盘 / 报价 / 交付协同，并有 Amazon 店铺从 0 到 1、Listing / A+ / Store / CPC 经营经验。';try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(text);$('.copy-status').textContent='职业简介已复制。'}catch{$('.copy-status').textContent='请选中复制：'+text}return}
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
