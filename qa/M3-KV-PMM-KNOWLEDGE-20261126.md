# M3 Campaign｜KV 真实性修正、Brand × PMM 与 Knowledge Loop｜2026-11-26

## 审核对象与基线

- 源码基线：PR #33 的已验证 HEAD `7172e68908025e304c76f589f7f6576dccd20664`（包含 PR #32）。新草稿只叠加该版本，不写主分支。
- 对应前端：`#/case/gtm/m3-campaign-kv`、`#/case/gtm/launch-d7-d30`，以及现有 `#/case/gtm/campaign-architecture` 渠道分工。
- 用户提供的网页截图证实：16:9 文案覆盖原产品图，4:5 顶部文字被图块遮挡，CSS 制作的图像布局并非原始 KV 文件。
- 复核源 `site/projects.js` 后确认：旧 16:9 与 4:5 是同一张 `m3-yellow-main.webp` 及不同文字的网页排版，属于“假装成 KV 成品”的错误呈现。

## Google Drive 原始候选（仅本地审阅，不上传公开仓库）

经授权读取到 `M3_Campaign_KV版本 / R8_KV` 中三幅独立画面，已核对图像实际尺寸与画面：

- `M3_KV_16x9.png`：1920×1080，家庭餐桌场景+左侧 Campaign 宣传信息+黄色 M3。
- `M3_KV_4x5.png`：1080×1350，4:5 独立排版，上部家庭场景、下部品牌/产品信息。
- `M3_KV_9x16.png`：1080×1920，9:16 独立排版，更适合 Story 版位。
- 以上来自未公开共享的 Drive 目录，且营销策划文档写明 **PLANNING DRAFT**。**这些图像的公开展示授权、视觉终稿签核、产品结构及 CTA 可用性、实投/已发布状态尚未证实。**
- 本次不将这些原图复制到 public GitHub，不新增对外可见的个人或未授权素材。提供单独本地 ZIP 供授权者核对；正式图片替换需先确认权利/商业发布边界。

## 已实施的网站修复

1. 删除旧的 CSS 叠加式虚构 16:9 / 4:5 KV 展示（不会再出现文案重叠或双重“KV 成品”的误导）。
2. 用仓库已经公开的 `m3-yellow-main.webp` 展示 M3 产品形态，正确标记“产品源图，不是 Campaign KV”。
3. Brand / Product PMM / Campaign 信息层分开：
   - 长期品牌：Power Every Move。
   - PMM：M3 双盘电动拖把的使用任务、可观察结构与握持方式；不把演示图误作清洁效果证明。
   - Big Idea：Make Room for What Matters。
   - 场景内容：Dinner’s done. The floor isn’t.
4. 16:9 Hero、4:5 Feed、9:16 Story/Reels 分别说明受众任务、信息次序与真实演示依赖，不把横版粗裁冒充平台适配。
5. 保留前一版 PMM 定位、FABE/RTB、竞争参照、Campaign 渠道激活与 PR/Video 关联，形成同一套内容逻辑。

## 复盘与知识闭环

数据依据：`Qimedo M3｜2026年5月新品上市 IMC & GTM Campaign 策略与创意主题补充版` 明确：
- 项目市场美国，计划窗口 2026-05-01 至 2026-05-31，建议上市日 5/22；
- `PLANNING DRAFT` 不代表实际发布、广告投放、销售或传播成果。
- 业务目标是核验上市传播与订单承接能力，媒体可见互动、访问和问答只能作为过程诊断。
- D+7 与 D+30 不可凭没有对应来源的“假数字”代替实测结果。

按 `CAP-DATA-001` 保留数据合同：
`metric_object / numerator / denominator / market / channel / window / timezone / source / version / owner / timestamp / attribution / exclusions / data_quality`。
- Reach 不能跨平台直接相加当去重人数；
- 观看与互动不自动等于购物意愿；
- GA4 访问、媒体归因与净履约订单分属不同证据层；
- 未读取真实订单/成本/退款数据时不计算业务增长、净贡献、Paid CAC/ROAS；
- 源端未提供完整可对账的首周/整月数据时，所有 D+7 / D+30 结果状态为 `INSUFFICIENT_EVIDENCE`。

按 `CAP-CAMP-007/008` 与 `Growth Knowledge Loop Registry`：
- Observe：核对真实发布时间、素材版本、有效窗口、原始平台和商业数据；
- Diagnose：排查发布、内容理解、实际到达、商业承接、供应链与客服断点；保存替代解释；
- Act：由 Owner 选择 `KEEP / FIX / STOP / RETEST`，明确范围、权限、预算与退出条件；
- Verify：在约定时间窗复核主指标及 Guardrails；
- Write back：把候选经验登记为 `CANDIDATE`，不自动宣称 `VALIDATED` 或 `ACTIVE`。

示例候选（**假设，不是已发生的复盘结论**）：
- `hypothesis`：如果平台观看/互动合格，但针对双盘使用方式的疑问仍集中，则下一轮增加连续操作镜头及适用表面说明。
- `diagnostic inputs`：同样市场/时间窗的观看数据、评论分类、实际演示片段、有效访问与 FAQ；检查产品真实使用限制、渠道分发是否异常。
- `action`：M10 内容负责人协调 M12 视频制作，产品 Owner 确认主张后试发新版；Paid Owner 独立批准广告实验。
- `validation`：同定义观察理解型问题变化、有效访问、负反馈与版本切换，记录替代解释。
- `status`：`CANDIDATE / NOT EXECUTED / DATA_REQUIRED`。

## 参考知识库

- `CAP-BRAND-001` Brand Positioning，Brand Evidence。
- `CAP-PMM-001` Product Positioning、Value Proposition、Proof Strategy。
- `CAP-CAMP-001` Channel Mix、Measurement、Retrospective。
- `CAP-DATA-001` Data Quality、Reconciliation、Attribution、Minimum Evidence。
- `references/10-growth-knowledge-loop-registry.md`：Candidate / Provisional / Validated / Active 的升级与回滚规则。

## 验证项目

- `npm test` 新增 `scripts/test-m3-kv-pmm-knowledge-loop.cjs`：失真 KV 删除、3 层信息、3 种比例、5 层证据、5 步闭环、前版 PR/Video 保留。
- 真 Chrome 1440px、390px：新 KV 章节和 D+7 / D+30 的锚点、原图、宽度、表格横向滚动，失真 CSS 叠加不可再出现。
- 真正 R8 图片的公开展示被限制在批准前；根目录及现有 `/preview/pr32/`、`/preview/pr33/` 均不自动更改。
