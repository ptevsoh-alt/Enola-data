# Portfolio × Enola Current-Best｜求职导向内容与可视化重构

日期：2026-11-23  
来源基线：Enola Marketing Skills `main`，按 `README.md → control/CURRENT_STATE.md → control/CAPABILITY_MAP.md → 2026-07-22_市场-skill/SKILL.md` 路由。  
修改目标：`ptevsoh-alt/Enola-data` 的 PR #16 / `design/gtm-visual-storytelling-20261123`；源仓 `main` 不修改。  

## 1. 职业定位与优先顺序

单一个人作品集；面向 GTM / PMM、IMC / Campaign、品牌策略、海外市场增长及团队项目管理。首页优先让作品和策略决策可见，而不是罗列软件、方法名称或重复证据说明。

展示优先级：
- P0：首页 GTM/Campaign/Management 三组可视化主案例；GTM 产品定位与使用场景决策；M3 素材证明；跨职能内容交付/真实审核返工。
- P1：US/UK 区域本地化从语言变为传播和商业承接；Paid / PR 创意、媒体和合作接口；Meta 结果与内容复盘路径。
- 仍需补证：市场/竞品的可核验定量研究、实际预算和投放汇总、同窗口实验或销售贡献、实拍前后对比。缺失项不补造、不计算伪 ROI。

## 2. Enola 能力调用与页面落点（仅 Current-Best）

| 当前决策模块 | 主 Owner | Canonical | 本轮 UI 映射 |
|---|---|---|---|
| Market Intelligence `CAP-MKT-001` / Customer Research `CAP-CUS-001` | M02–M03 | `capabilities/dom-a/cap-mkt-001/market-intelligence.md`; `capabilities/dom-a/cap-cus-001/customer-research.md` | 餐后任务、问题类型与场景策略 |
| PMM `CAP-PMM-001` / KSP `CAP-KSP-001` | M05 / M06 | `capabilities/dom-b/cap-pmm-001/product-marketing.md`; `capabilities/dom-b/cap-ksp-001/ksp-value-proposition.md` | `#gtm-positioning-decision`：任务 → 产品价值 → 证明 → 传播承接 |
| GTM `CAP-GTM-001` | M07 | `capabilities/dom-b/cap-gtm-001/gtm-launch.md` | 首页五阶段排期预览 + 原有六泳道、Gate 控件 |
| Campaign `CAP-CAMP-001` | M08 | `capabilities/dom-b/cap-camp-001/campaign-strategy.md` | `#campaign-proof-gallery` 三张原有产品视觉与传播架构 |
| Paid `CAP-PAID-001` / Earned `CAP-EARNED-001` | M09 / Earned Owner | `capabilities/dom-c/cap-paid-001/paid-growth.md`; `capabilities/dom-c/cap-earned-001/earned-growth.md` | `#gtm-media-plan`：广告创意测试与 PR/Creator 接口 |
| International `CAP-INTL-001` | 原业务 Owner / M07 | `capabilities/dom-c/cap-intl-001/international-growth.md` | `#locale-decision-matrix`：市场话术、Proof、渠道角色、商业条件 |
| Marketing Operations / QA `CAP-OPS-001` | M17/M18 support | `capabilities/dom-e/cap-ops-001/qa-gate.md` | `#operations-control`：社媒主责、产品核验、设计视频制作、渠道放行 |
| Data `CAP-DATA-001` | M16 | `capabilities/dom-e/cap-data-001/data-tracking-attribution-experiment.md` | `#social-outcome-bridge`：2025 Meta 数据与内容反馈闭环，不制造时间序列 |

*Canonical 路径相对于 `2026-07-22_市场-skill/`；上述模块为方法依据，不代表所有历史工作执行由对应业务 Owner 授权。*

## 3. 当前改动文件

- `site/growth.js`：新增 `#career-showcase`，GTM / Brand-Campaign / Operations 三组作品主卡。
- `site/projects.js`：GTM 定位决策、Campaign 实际图片展示、团队交接看板、Paid/PR 计划接口、US/UK 国际市场决策、Meta 数据复盘闭环。
- `site/growth.css`：桌面到移动端的项目卡、视觉图片、责任矩阵和区域方案。
- `site/index.html`：缓存版本更新。
- `scripts/test-growth.cjs`：新增结构、链接和案例交互检查。
- `PUBLIC_ASSETS.json`：随页面资源更新的字节数与 SHA256。

## 4. 数据与表述边界

- 2025 Meta 96.5 万曝光、3.7 万互动仍为原记录的同一阶段汇总；新视觉只重复已有指标，不转换为触达人数、订单、活动因果增长或连续曲线。
- M3 2026.05 为上市传播规划；保留对真实商业条件和内容批准 Gate 的负责人区分，不称已上线的多渠道营业结果。
- Paid / PR 两条线是策略协作接口，未添加不存在的预算、CPA、ROAS、达人付费或 PR ROI。
- US/UK 用词对比来自既有文案；区域销售、履约、市场偏好与渠道效率不自行推断。
- B2B 储能展会和通用展会设计仍然隔离，未混入 Qimedo 产品或清洁产品展位。
- 核心代码变更不改写 `site/data.js` 历史数值、指标口径、个人职责和原始作品资源。

## 5. 验收清单

- [ ] GitHub PR 源提交的自动化测试成功（网站、交互、资源哈希、视频引用、隐私边界）
- [ ] 独立预览仓库部署到本轮 PR 确认通过的 exact SHA
- [ ] 实际浏览器 1440 / 390 / 375 / 360px 测试：首页优先级、产品图片裁切、M3 甘特图滚动、区域矩阵、移动端卡片
- [ ] 视频公开访问、人物/音乐/品牌授权另行人工核查
- [ ] 不合并源仓 `main`，PR 保持 Draft 待最终审阅

## 6. 后续最有价值的真实补充材料

优先需要与本人贡献对应的资料：对比性市场/用户洞察、Campaign 实际 KV 与发布稿、跨部门任务记录/实际验收截图、同期间的广告/搜索/CRM/商务指标。缺失时保留已有可证实成果和策略方法，不以概念图或模拟曲线替代。
