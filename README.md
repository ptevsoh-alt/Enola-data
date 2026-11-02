# 黄文琳｜视觉案例作品集

以项目封面、策略图、流程图、协作看板与数据图表呈现品牌战略、PMM、GTM、IMC、PR、团队管理及跨部门交付。

11 个案例均包含 Background、Insight、Strategy、Execution、Management Contribution、Results、Evidence。

企业与品牌身份匿名化。创作者合作仅公开策略、筛选、流程、内容治理与授权机制，公开数据不包含详细运营记录。38 项其他指标保留原有数值、来源、定义、窗口、限制和证据状态；重构与概念工作物不代表历史成果。

## 本地预览与检查

需要 Node.js 22 或更新版本。

```sh
npm ci
npm test
npm run preview
```

预览地址为 http://127.0.0.1:8174/ 。只发布 `site/`。资产清单为 `PUBLIC_ASSETS.json`；修改网站后执行 `node scripts/update-manifest.cjs`。

PR 只执行校验，不部署。此次改造不自动合并或发布；现有 main 发布流程由仓库维护者控制。

视觉验收与专业能力应用说明见 `qa/ACCEPTANCE.md`。
