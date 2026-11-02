# 黄文琳 — A · Editorial Portfolio

海外品牌营销、GTM、产品营销与整合营销管理个人作品集。

## 发布状态

已于 2026-11-02 发布至 GitHub Pages。正式部署运行 [41384496011](https://github.com/ptevsoh-alt/Enola-data/actions/runs/41383732032) 第二次尝试成功；首页、样式、脚本与三张概念图均经真实线上访问返回 HTTP 200。桌面与移动端已完成页面及主要交互回归。

目标地址：https://ptevsoh-alt.github.io/Enola-data/

## 部署与验证

- 原生 HTML / CSS / JavaScript，无构建依赖。
- 执行 `node scripts/validate-site.cjs` 验证源文件、数据与公开隐私边界。
- PR 只运行验证。main 的 push 或手动运行在验证通过后部署 `site/`。
- Node.js 22，GitHub 官方 Pages Actions，环境为 `github-pages`。
- Hash 路由及相对路径支持项目子目录，直接进入 `/#/case/gtm` 等地址。

## 简历校准\n\n- 四段职业经历、公司名称、岗位及任职时间按 2026-10-28 简历校准。\n- 新增 12 项简历所载经营指标，按原项目与平台分开展示；统计窗口、比较期或分母未明确时保留待核说明。\n- 联系页面展示简历中本人提供的邮箱与电话。\n\n## 公开证据政策

- 原始 Facebook 后台截图不进入公开仓库、网站或部署 Artifact。证据抽屉仅展示文字摘要、来源类型、统计窗口、字段定义、状态与限制。
- 38 项指标独立维护，分为 6 个业务域。缺失值保留 null，不以 0 替代。没有真实序列或匹配口径时，不制造趋势、转化率与漏斗。
- DOCUMENTED / PENDING 不升级为 VERIFIED；不同窗口和业务链不拼接。
- 概念图标注 CONCEPT；重构工作物不冒充历史原件；未来计划不声称已执行。
- 不包含内部审计目录、后台截图、真实客户资料、环境配置、跟踪脚本、发送表单或虚构联系方式。

公开文件校验见 `PUBLIC_ASSETS.json`。历史基准提交 `4bd1e0f4d266712d5d8a563905ebb151449ff209` 只有说明文件，没有上一版已上线网站；回退到该提交代表撤回本次网站内容，并非恢复旧网站。
