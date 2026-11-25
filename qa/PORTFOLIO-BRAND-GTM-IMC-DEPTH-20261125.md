# M3｜Brand Idea × Campaign Big Idea × Creative Adaptation 内容深化审查

日期：2026-11-25  
目标案例：`#/case/gtm/campaign-architecture`  
起点：公开作品集固定源码 `e9f7601466f31b383a62e446c94edb1bb3c82d3a`  
工作分支：`portfolio/brand-gtm-imc-depth-20261125`

## 需求与编辑判断

本轮针对「从用户场景到上市传播」中 M3 的品牌、产品营销、整合传播与创意适配，不调整 11 个案例的归属、不拆分岗位版本、不更换现有 M3 官方产品素材，也不把传播策划写成真实投放销量。

之前 Brand Idea 只有长期口号，Campaign Big Idea 只有主题词与场景罗列；两者没有充分解释受众张力、品牌角色、主题形成理由与证明链。Creative Adaptation 只展示 Paid 与 EDM 两张概念卡，缺少 Hero / 视频 / 社群 / PR 的创意转换原则；渠道清单与创意策略互相重复。

## 已完成的编辑

| 对外模块 | 修改内容 | 业务表达重点 |
|---|---|---|
| Strategy spine | 增加商业背景、创意场景张力、产品角色、取舍判断 | 为什么选择餐后硬地而不是从参数开始 |
| Brand Idea | 保留 Power Every Move；增加受众任务、品牌角色、可信依据 | 品牌承诺不是产品功能清单，也不等于当季主题 |
| Campaign Big Idea | 保留 Make Room for What Matters；解释情境冲突、连续变化机制、希望受众理解的核心信息 | 情绪由人物生活承载；产品用真实动作提供解释 |
| Creative Territories | 三条方向：Scene Contrast、Mechanism Reveal、Life After the Task | 功能型、场景型与情绪型的任务区别、渠道用途及选择理由 |
| Creative Adaptation | 完善 Paid / EDM 内容卡，增加 Hero、Reels/Creator、Facebook Group、PR/Search 四条触点适配 | 统一主张但重组开场、证明、信息密度和互动方式 |
| Campaign management | 新增版本管理、事实/权利放行责任、学习反馈的三个交接卡 | 策划者与产品/广告/CRM/商业负责人的职责边界 |
| Entry copy | 修改精选案例的战略判断、交付摘要和跳转锚点 | 招聘方点击即可看到核心策略 |
| Responsive | 新增桌面和 960px / 620px 断点的版式规则 | 新卡片在手机上单列，避免小屏 3 列文字拥挤 |
| Regression | 添加 `scripts/test-brand-gtm-imc.cjs` 并加入 `npm test` | 验证源码语法、页面渲染、卡片数量和相关案例链接 |

## 知识库能力对应

- Brand Strategy／Positioning／Brand Experience：[CAP-BRAND-001](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-b/cap-brand-001/brand-strategy.md)；品牌的受众、角色、差异、证明、体验边界与 Campaign 分开。
- Product Marketing／Use Case／Proof：[CAP-PMM-001](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-b/cap-pmm-001/product-marketing.md)；M3 的场景、可见动作与 FAQ 形成产品卖点的证明结构。
- GTM／Channel Strategy：[CAP-GTM-001](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-b/cap-gtm-001/gtm-launch.md)；产品、市场、商务条件、渠道和上市 Gate 必须衔接。
- Campaign Architecture／Big Idea／Channel Mix：[CAP-CAMP-001](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-b/cap-camp-001/campaign-strategy.md)；统一主命题、资产角色、阶段与测量，不把 Campaign 当帖子集合。
- Campaign 主题与创意机制：[Campaign 创意主题与 Big Idea 构建](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/campaign-theme-construction.md)、[Campaign 内容矩阵](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/campaign-content-matrix.md)、[社媒渠道与形式策略](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/social-channel-and-format-strategy.md)；区分主题、Big Idea、Creative Territory、内容支柱及资产版本。

## 事实和职责边界

- 「餐后地面待整理」是本案例选定的传播场景张力，不应声称已由定量消费者调查验证。
- 官方 M3 产品图支持外观与结构识别；连续操作视频与产品适用说明是需要单独核验的不同证据层。
- **Power Every Move** 为既定品牌方向；**Make Room for What Matters** 为此案例的 Campaign 主题。三条 Creative Territories 是策划与内容延展，不伪称实际 Paid A/B 实验结果。
- 本人负责或参与场景、社媒传播、内容矩阵、Brief 与素材审核；Paid 预算、CRM 许可、产品 Claims、当地供货和转化数据归相关负责人审批。
- 禁止凭发布计划虚构曝光、转化、ROI、使用时长、清洁效率、真实 Creator 发布或社群参与效果。

## 验证

- 编辑阶段：9 组项目文案及布局锚点进行了精确唯一匹配替换，新 CSS 在 960px 与 620px 设置单列展示。
- 自动化：`npm test` 新增 M3 回归。以 PR 的 GitHub Actions 结果为准，不能因为本审查文件存在就宣布通过。
- 浏览器端待验：1440px 桌面、960px 平板及 390/375/360px 手机；焦点导航、每个插入区块的换行和横向溢出、各章节锚点、图片与实拍视频加载。
- 线上发布：展示仓库继续固定使用原提交；此分支未修改 `main`、未触发 Pages 公开部署。审阅通过后再确定固定新 SHA 的发布。

## 对外版式的编辑原则

让 HR/业务负责人先看到「为什么选这个场景 → 品牌在其中扮演什么角色 → Big Idea 怎么产生 → 选择哪条创意方向 → 渠道怎样变体 → 谁负责交付」，再进入原有八条渠道明细。保留具体英文广告和邮件内容样例，避免内部知识库术语、审批状态代码和大段免责声明直接出现在作品集页面。
