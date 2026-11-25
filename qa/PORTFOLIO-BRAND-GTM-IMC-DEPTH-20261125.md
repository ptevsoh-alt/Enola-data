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

---

## 2026-11-25 第二轮深化｜Product Truth → PMM → KSP → Commercial Message

### 为什么原来的 Make Room for What Matters 不够

先前版本有消费者情绪张力、三条 Creative Territories 与渠道执行框架，但缺少以下向上承接：

1. **Product Truth**：双盘、握持与电池外观属于什么证据层，使用结果与规格在哪里获准；
2. **PMM / Positioning**：为何以硬地为入口，与手动拖地、洗吸设备、其他电动拖地工具的任务选择如何不同；
3. **KSP / FABE / RTB**：每个卖点如何从产品事实转为具体利益，以及证明/限制；
4. **Buyer Awareness / Commercial Message**：不同理解阶段如何安排消息深度、比较信息、购买疑虑和 CTA。

仅靠“饭后生活更重要”会让 Campaign 成为通用家居品牌口号，任何产品都能套用，因此必须由可见操作和产品选择理由连接品牌情绪。

### 本轮关键策略结论

**Brand Idea**：Power Every Move，长期品牌价值与生活行动关系，不能被单次促销替代。

**M3 产品定位（沟通候选）**：面向希望处理日常硬地、考虑电动拖地方式的家庭；M3 的可见双盘工作形态、站姿握持和连续动作是说明产品的入口。此处并不主张“比手动更快”或“比同类更好”。

**Primary Value Proposition（沟通候选）**：让目标家庭看懂电动双盘如何参与地面整理，并可依据操作、适配条件与可信证明判断是否适合自己。避免以创意叙事替代已验证的体感省力、效率或清洁成绩。

**竞争参照**：
- 手动拖把：说明操作机制变化；不以“手动一定不如电动”进行绝对比较；
- 洗吸一体设备：解释功能范围差异；不暗示 M3 具有吸污等未经核验的能力；
- 其他电动拖把：真实竞品比较需要确切版本/条件/数据；当前以本品操作证明为主，不写臆造的优势排序。

**FABE / RTB 证据映射**：
- 双盘旋转结构：源资产可用于结构识别；动态旋转、接地、具体清洁效果须独立实际证明；
- 握持与推进：设计和站姿动作可通过连续演示解释；“省力”“人体工学改善”不因图像而成立；
- 电池部件：源资产支持组件识别；续航与换电等功能需官方资料，不能自行推断；
- 地面适配：须按当地 M3 型号与官方说明核验。

**Big Idea / Make Room for What Matters**：保留作为 Campaign 的故事主题，明确受众张力 → 产品动作 → 回到生活的叙事因果；不是时间节约功效宣称。传播主题的价值在于场景共鸣与可延展创意，购买理由仍由产品证据、使用适配和可售商业条件承担。

**Commercial Message**：按场景认知、方案理解、产品比较、行动准备四种信息需求安排内容，区别于真实已识别的买家状态。广告平台事件不自动证明用户属于某认知阶段，CTA 随证据与可售能力提高，不用促销掩盖证据缺口。

### Current-Best 源能力

- `CAP-PROD-001`：Fact Lock / Claim Verification / Mechanism / Limitation / Version
- `CAP-PMM-001`：Product Positioning / Use Case / Competitive Position / Value Proposition / Objection / Proof
- `CAP-KSP-001`：KSP / Feature-Benefit-Outcome / FABE / RTB / Product Message House
- `00-shared-commercial-message-decision.md`：Buyer Awareness × Market Sophistication、Message Need、Emotion-to-Action
- `CAP-BRAND-001`：Brand Strategy、Positioning 与 Experience 独立于产品卖点
- `CAP-GTM-001`：商业化与渠道顺序；`CAP-CAMP-001`：Campaign Big Idea 与触点编排

### 代码修改与回归条件

- `site/projects.js`：新增 `#m3-product-positioning`、`#m3-product-value`、`#m3-commercial-message`；扩写 Big Idea 的产品连接、六段创意命题；FABE/RTB 表格用详情折叠。
- `site/growth.css`：大屏三/四列并列；平板降到两列，手机单列；FABE 表格手机采用独立水平滚动容器。
- `site/selected-work.js`：同步精选项目价值判断；`site/index.html`：更新缓存键。
- `scripts/test-brand-gtm-imc.cjs`：验证新增策略板块、比较对象、证明层、消息阶段以及 Big Idea 与证据关联。
- `PUBLIC_ASSETS.json`：用 UTF-8 实际内容重新计算字节数与 SHA-256，保留强制完整性门槛。
- 完整 `npm test` 与桌面/移动端真实 Chrome 全站检查以对应最新 SHA 的 GitHub Actions 结果为准；不将旧版 #508 的成功复用到新增修改。

**待补强事实，不在公开页面假装已完成**：目标用户 JTBD/VOC 样本与窗口、美国 M3 SKU 的适用地面及限用说明、连续使用视频原片及权利、同条件竞品比较、价格与 Offer、库存/售后、真实广告与转化数据。它们可强化定位/商业断言，但不应被情绪故事填补。

