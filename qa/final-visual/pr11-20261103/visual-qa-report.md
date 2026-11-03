# PR11 最终浏览器视觉验收

任务：PORTFOLIO-PR11-FINAL-VISUAL-QA-20261103。

## A. 执行概况

- 仓库：ptevsoh-alt/Enola-data；PR #11，目标分支 enhance/facebook-insights-evidence-20261103，Base refactor/visual-case-portfolio-20261102。
- 实时起始 HEAD：a6af44cfebfdf0c2099b481277593ff854d3b9d8。预检工作区干净；在独立新工作目录检出目标分支，保留原工作区与用户文件。
- 修复后实际渲染代码 SHA：f020aa8e4b9a6f1d5b32cb8f81e53ba63cda4562。其后提交只归档 QA，网站代码指纹见 screenshot-manifest.json。
- 预览：npm ci 后，设置 PORT=8182，npm run preview；真实入口 http://127.0.0.1:8182/。最初修复前预览为 PORT=8181，两者均直接服务本次目标分支 site/。没有使用 localhost:3000 的 Creator Desk。
- 实际验收日期：2026-11-03（Asia/Shanghai）；逐张时间、URL、视口、SHA、模块与状态在 screenshot-manifest.json。
- Chrome DevTools，复用现有 Chrome Profile / Session，新建自主预览标签 46；图片原生点击产生标签 48。没有创建账号、Profile 或隔离 Context，没有接管用户当前标签。

## B. 视觉验收结果

| Viewport | 首页截图 | 布局 | 图片 | 字体 | 交互 | 结果 |
|---|---|---|---|---|---|---|
| 1440×900 | [desktop-1440.png](desktop-1440.png) | PASS | PASS | PASS | PASS | PARTIAL* |
| 390×844 | [mobile-390.png](mobile-390.png) | PASS | PASS | PASS | PASS | PARTIAL* |
| 375×812 | [mobile-375.png](mobile-375.png) | PASS | PASS | PASS | PASS | PARTIAL* |
| 360×800 | [mobile-360.png](mobile-360.png) | PASS | PASS | PASS | PASS | PARTIAL* |

四档各自通过 DevTools 实际切换视口并重新导航加载。每档都保存首页、社媒管理决策、Group 专项、Page / Group 原图证据四个实际页面模块。截图索引见 SCREENSHOTS.md，未用旧截图替代。截图是原始视口图，不是全页长图，也没有通过 CSS 假造尺寸、裁切或抹除浮层。

*站点布局通过，但现有 Chrome 扩展的蓝色浮动按钮和侧边图标在截图中有局部遮挡。它们不属于站点，未擅自修改扩展或隐藏浮层，因此包含该环境的总体视觉验收保留为 PARTIAL。没有任何尺寸缺图或 PENDING。图片 PASS 指加载和几何比例；源图为 420px 匿名化裁切图，放大不能恢复未提供的原始细节。

页面边界巡检覆盖导航、首屏、章节、指标、图表／图片、说明文字和页尾；四档的四个页面均无页面横向溢出。宽表在自身容器内滚动。Group 图自然尺寸 420×359；Page 图自然尺寸按浏览器记录。146 人发帖和评论、34,387 人查看与 2025-11-02 至 2026-09-30 所选窗口保留；4,009 明确为日期未注明的成员快照，未解释为窗口新增。

## C. 问题与修复

| 级别 | 问题 | 修复文件与方式 | 证据与回归 |
|---|---|---|---|
| P2 | 360px 嵌套指标卡单位紧贴数值，“平台显示人数”被拆开，证据按钮折行 | site/growth.css：只针对 g-social-decision，单位独立成行；720px 以下嵌套指标改为单列；保留字号、正文和数据 | before/360-decision.png → after/360-decision-detail.png；桌面对照 before/1440-decision.png → after/1440-decision.png；四档重新巡检无溢出 |
| P2 / 预览兼容性 | 预览脚本给 WebP 返回 text/plain；Chrome 当前通过内容识别仍可打开，不是已复现的 P1 图片打不开 | preview.cjs：增加 image/webp 类型映射，没有修改生产配置 | HTTP 复核 image/webp；原生点击 Group 图打开图片文档，天然尺寸 420×359；interaction-evidence/group-original-open.png |
| 环境观察 | 扩展浮动按钮局部遮挡 | 不修改浏览器扩展，不伪称网站修复 | 原始截图保留，整体视觉状态 PARTIAL |

没有 P0、没有已复现的站点 P1。没有新增案例、重做结构或改设计方向。site/data.js、site/app.js、site/growth.js 保持相对起始 HEAD 不变；没有更改口径、来源或业务贡献。

代码修复分别保留 acc4982 和 f020aa8 提交。首次格式化触发现有增长回归中精确 CSS 字符串断言；随后保留原 CSS 格式，只追加必要修复，再完整重跑，最终通过。没有删除测试或放宽断言。

## D. 自动化与交互验收

本轮重新执行 npm test，不沿用历史结果：静态 8/8 PASS；原交互 70/70 PASS；增长 69/69 PASS；合计 147/147 PASS。原始输出见 npm-test.log 及三个 results.json。资产 SHA-256 已更新到 PUBLIC_ASSETS.json。

真实浏览器每档分别检查，桌面 11 项、三个移动档各 13 项，全部通过，见 browser-evidence.json。包括七项 Page / Group 指标逐项打开抽屉，并核对 source、definition、window、limits；案例到 Group、Group 到数据、数据返回案例；页面内锚点；移动菜单与案例导航。另通过 DevTools 原生 click 点击 Group 证据抽屉、原图链接，原生 Escape 关闭抽屉，截图在 interaction-evidence/。四档不互相推定。

站点 error / unhandledrejection 巡检监听为空。Chrome Console 仍有一条无定位信息的 Uncaught (in promise)（0 args），来源未确定，未宣称整个浏览器 Console 无错误。记录的站点 HTML、CSS、JS、favicon、概念图和两个 WebP 请求均 HTTP 200；扩展请求与站点请求分开记录。

辅助样式检查曾误传没有 snapshot 的节点，返回 No snapshot found；已停止并取得用户对同一后端、同一页面的明确恢复授权后继续，没有切换后端。

最新 CI Run ID 与最终状态将在 PR 检查和最终交付中实时核对；本报告先明确本地结果，不把历史 41584548939 冒称为本次 CI。

## E. 最终状态

- 视觉：PARTIAL（四档站点布局／图片几何／字体通过；现有扩展浮层遮挡作为环境观察保留）。
- 自动化：PASS，147/147。
- 交互：PASS，50 项分档检查及原生点击／Escape 通过。
- PR：OPEN；Merge：NOT MERGED；Deploy：NOT DEPLOYED。
- 未修改 main、PR #9、生产配置或 Enola-marketing-skills；未清理或覆盖用户原有本地文件。等待人工最终确认。
