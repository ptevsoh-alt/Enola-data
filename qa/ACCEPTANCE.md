# 视觉案例作品集验收

日期：2026-11-02（Asia/Shanghai）

状态：本地 LIVE_VERIFIED；等待 PR 审核，不合并、不部署。线上 main 和旧历史提交尚未替换，不能将分支中的隐私清理描述为线上已清除。

## 交付内容

- 首页以视觉案例卡片为入口；品牌战略、PMM、GTM、IMC、PR、团队管理与交付为主线。
- 11 个案例均包含 Background、Insight、Strategy、Execution、Management Contribution、Results、Evidence。
- 复用既有匿名概念图片；其余封面、策略流程、品牌屋、触点矩阵、协作看板以 HTML/CSS 构建。未导入参考站内容、品牌、图片或指标。
- 创作者只保留策略、筛选、合作流程、内容治理与授权机制。公开数据中的详细运营指标已删除，未藏入隐藏组件或备用 JSON。
- 企业身份匿名化。其余 38 项指标与基准 `27239dc` 逐对象比对一致，保留来源、定义、统计窗口、限制、空值与证据状态。
- Current-Best 只读应用记录见 CURRENT_BEST_APPLICATION.md；营销能力仓库 tracked diff 保持为空，原有未跟踪目录保留。

## 自动化 QA

`npm test`：78/78 PASS（8 项结构／隐私／资产检查 + 70 项 DOM 与交互检查）。明细见 static-results.json 和 interaction-results.json。DOM 测试不冒充浏览器视觉检查。

自动检查覆盖 11 个七章节案例、6 个数据域、38 个指标抽屉、筛选、搜索、空态、重置、图片预览、菜单、焦点返回、未知路由恢复、资源清单完整性和哈希、公开数据隐私。开发依赖安装审计为 0 vulnerabilities（安装时结果）。

## 桌面与移动端

浏览器：chrome-devtools MCP，同一后端授权恢复后，在新建本地预览页 pageId 42 执行。用户当前标签未被接管。

| 验收项 | 结果 |
| --- | --- |
| 桌面 1440 宽 | 23 个路由巡检通过；页面无横向溢出；首页全页截图和品牌策略区域截图人工检查通过 |
| 移动 390 × 844、触屏 | 23 个路由巡检通过；首页、达人治理卡片、指标抽屉截图检查通过 |
| 移动 375 × 844、360 × 844、触屏 | 各 23 个路由巡检通过；页面无横向溢出 |
| 原生浏览器交互 | 筛选、空态、重置、移动菜单、图片 Lightbox、指标抽屉、焦点返回、受控表格滚动 8/8 PASS |
| 图表与数据 | 原始字段绑定；暂算互动比值单独说明；收入份额不改写为增长率；没有补造趋势或达人数据图表 |
| 运行错误 | 路由巡检期间页面 error / unhandledrejection 监听为空 |

每档路由范围为首页、案例索引、11 个详情、6 个数据域、经历、能力、说明和联系页，共 23 个。诊断文件中的 table 子节点超出视口属于 `.table-scroll` 内部宽表；页面 scrollWidth 未超过视口，已展开表格实测容器滚动。

修复后复查：空 hash 首页回退；移动封面说明拥挤；图表窗口统一绑定数据源。文字和策略结构按现有资料组织，未新增历史成绩、团队人数、预算权限或因果归因。

截图中的蓝色悬浮图标属于浏览器环境，不在站点资产中。真实截图已在本次会话显示；本地诊断 JSON 随 PR 保存。截图不作为业务结果证据。

## 发布范围

仅 `site/` 是候选公开网站产物。PR 验证运行 `npm ci` 和 `npm test`，PR 事件跳过部署任务。现有 main 发布机制保持由维护者控制，此次不会触发 main 合并或部署。

仍存在的业务限制：原始后台报表、部分窗口与账户范围待核；PR／品牌／治理案例主要为经历重构，CRM 与创意概念不代表已执行。联系方式未提供，页面没有虚构联系方式。

Console 补充：现有 Chrome 环境仍记录一条空信息 `Uncaught (in promise)`，消息无定位信息。站点自身路由巡检监听为空；未宣称浏览器 Console 完全无错误。站点资源请求为 200；扩展请求单独看待。


## 2026-11-19 Enola Campaign / Community Event capability integration

### Portfolio additions
- M3 GTM case separates the single primary business result (net fulfilled orders / net contribution) from marketing and behavior objectives; product understanding, effective views, visits and engagement remain diagnostic / intermediate signals.
- Five M3 Creative Territories are mapped to one primary mechanism each: pain-point emergence, mechanism reveal, relationship value transfer, micro-detail proof and user-experience proof. The mapping is a strategy reconstruction, not evidence that every territory was published or tested.
- Facebook Group case adds Program Owner routing, minimum event contract, participation and UGC-rights handling, metric separation and post-event handoff.
- No event-level results, budget, team size, ROI or causal attribution were invented.

### Automated verification
- Site code candidate HEAD: `27aa396e6ce6595ec9af17d55106ffa6bf8c3be2`; current PR HEAD: `4951517f73237f2d1e519e59674491c24ca312ff` (QA documentation updates only).
- GitHub Actions Run #140: Validate SUCCESS; `npm test` = 139/139: site structure / privacy / asset checks 8/8, DOM / interaction checks 70/70, growth / case behavior checks 61/61.
- `PUBLIC_ASSETS.json` byte sizes and SHA-256 values were refreshed for `growth.js`, `projects.js` and `index.html`; manifest validation passed.
- Latest PR preview artifact uploaded: [Run #140 preview](https://github.com/ptevsoh-alt/Enola-data/actions/runs/44493011702/artifacts/14513452874).
- Deploy: SKIPPED. `main` remains unchanged; PR #15 remains Draft / Open; no merge or production deployment was performed.

### Visual acceptance boundary
The current candidate has passed automated structure, interaction, privacy and asset checks. This run did not perform new real-browser screenshot inspection at desktop / mobile viewports. Earlier screenshots are not reused as evidence for these new modules; rendered visual QA remains pending.


## 2026-11-19 Independent /review/ entry validation

- Independent entry: `site/review/index.html`; route: `/review/`; standalone styles and rendering script are under `site/review/`.
- The main portfolio footer links to the review entry. The review page provides review path, searchable 11-case index, 15-asset visual gallery, 38 metric evidence-status summary, and six data-domain links.
- Case and data links return to the main portfolio Hash Router; local asset paths remain relative and portable for GitHub Pages project paths.
- The route is marked `noindex, nofollow`; no remote scripts, external asset dependencies, form submission or data transmission are added.
- Public asset manifest now includes all three review files and has matching byte / SHA-256 metadata. Homepage manifest metadata was also reconciled.
- GitHub Actions Run #152: Validate SUCCESS; 9 site/privacy/asset checks, 70 interaction checks, 61 Growth checks, plus review-route rendering, search, relative-link, noindex and local HTTP preview checks all passed.
- Isolated PR preview ZIP: [Run #152 / Artifact 14518338411](https://github.com/ptevsoh-alt/Enola-data/actions/runs/44505183583/artifacts/14518338411).
- PR #15 remains Draft / Open; `main` is unchanged; Deploy is skipped. This artifact is a review build, not a production URL or live deployment.
- New real-browser screenshot acceptance for the review page remains pending; the local HTTP route and automated content/asset checks passed.
