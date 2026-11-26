# 黄文琳｜视觉案例作品集

以项目封面、策略图、流程图、协作看板与数据图表呈现品牌战略、PMM、GTM、IMC、PR、团队管理及跨部门交付。

11 个案例均包含 Background、Insight、Strategy、Execution、Management Contribution、Results、Evidence。

企业与品牌身份匿名化。创作者合作仅公开策略、筛选、流程、内容治理与授权机制，公开数据不包含详细运营记录。36 项其他指标保留原有数值、来源、定义、窗口、限制和证据状态；重构与概念工作物不代表历史成果。

## 本地预览与检查

需要 Node.js 22 或更新版本。

```sh
npm ci
npm test
npm run preview
```

主作品集预览地址为 http://127.0.0.1:8174/；独立审阅入口为 http://127.0.0.1:8174/review/。只发布 `site/`。资产清单为 `PUBLIC_ASSETS.json`；修改网站后执行 `node scripts/update-manifest.cjs`。

PR 只执行校验，不部署。此次改造不自动合并或发布；现有 main 发布流程由仓库维护者控制。

视觉验收与专业能力应用说明见 `qa/ACCEPTANCE.md`。


## 独立审阅入口

- 主作品集：`/`
- 独立审阅页：`/review/`
- 审阅页集中呈现 11 个案例、策略 / Campaign / 社群治理结构、分类视觉素材、36 项指标证据状态和 6 个数据领域。
- 该入口为公开静态页面；`noindex, nofollow` 仅请求搜索引擎不收录，不提供登录或访问控制。公开内容必须先完成匿名化与证据边界核验。
- PR 验证生成独立预览 ZIP，不自动部署生产站点。下载并解压后运行 `npm run preview`，访问 `http://127.0.0.1:8174/review/`。
