# 线上作品集预览检查指南

版本：PR #15 候选版本  
当前站点代码基线：`27aa396e6ce6595ec9af17d55106ffa6bf8c3be2`  
当前分支：`content/drive-source-fill-20261116`  
生产发布：未执行；`main` 未修改。

## 预览获取

GitHub Actions 的 PR 验证流程只生成独立静态预览 ZIP，不部署 GitHub Pages。

- 最新预览包：[Run #142 / Artifact 14515467619](https://github.com/ptevsoh-alt/Enola-data/actions/runs/44497461049/artifacts/14515467619)
- PR：[ptevsoh-alt/Enola-data#15](https://github.com/ptevsoh-alt/Enola-data/pull/15)

下载 ZIP 并解压后，使用 Node.js 22+ 在仓库目录执行：

```bash
npm ci
npm run preview
```

打开 `http://127.0.0.1:8174/`。也可以使用任意静态 HTTP Server 将解压后的 `site/` 目录作为根目录运行。不要只打开 ZIP，也不要只单独复制 `index.html`；CSS、JS 与 assets 必须保留相对目录结构。

## 页面导航地图

网站为单页路由，以下路径均为站内 Hash Route：

| 页面 | 路由 | 重点检查 |
| --- | --- | --- |
| 首页 | `#/home` | 定位、首屏信息层级、代表案例入口 |
| 案例索引 | `#/cases` | 11 个案例卡片、分类、搜索与筛选 |
| 01 产品营销与上市 | `#/case/gtm` | 四条产品线、FABA / FABE、GTM、M3 Campaign、创意机制 |
| 02 海外社媒增长 | `#/case/social` | 季度主题、月度内容日历、团队交付、社媒数据 |
| 03 Facebook Group | `#/case/community` | 成员增长、参与数据、活动 Owner、活动准入与 UGC 授权 |
| 04 品牌与 IMC | `#/case/brand` | Brand House、Message House、跨渠道传播 |
| 05 团队管理 | `#/case/operations` | RACI、项目流程、审核 Gate、资源协同 |
| 06 B2B 与展会 | `#/case/b2b` | 展位照片脱敏、项目参与边界、客户开发与展会协同 |
| 07 SEO 搜索增长 | `#/case/seo` | Pillar / Cluster、搜索承接与指标限制 |
| 08 Amazon 经营 | `#/case/amazon` | 店铺经营、PPC、转化与经营指标边界 |
| 09 创意与视频 | `#/case/creative` | 创意方向、脚本与视频质量管理 |
| 10 EDM / Lifecycle | `#/case/crm` | 生命周期规划、邮件触点与交接 |
| 11 Creator 合作 | `#/case/creator` | 筛选、Brief、审核、授权和 Paid Usage Rights |
| 数据总览 | `#/data` | 数据域导航 |
| 社媒数据 | `#/data/social` | Meta 汇总与 Facebook 页面数据分开展示 |
| 社群数据 | `#/data/community` | 成员规模、查看、发帖评论分别呈现 |
| 搜索数据 | `#/data/search` | 自然搜索收入份额与 GSC 点击变化 |
| B2B 数据 | `#/data/b2b` | 触达、邮件、线索与成交口径 |
| 电商数据 | `#/data/commerce` | Amazon 销售、转化及利润相关指标 |
| 用户关系数据 | `#/data/lifecycle` | 生命周期和留存相关数据 |
| 工作经历 | `#/experience` | 经历时间线、职责和成果 |
| 能力 | `#/capabilities` | 品牌、PMM、GTM、IMC、PR 与管理能力 |
| 资料说明 | `#/about` | 数据证据状态、来源、限制与匿名化说明 |
| 联系 | `#/contact` | 对外联系信息呈现 |

## 本轮重点新增 / 更新

### M3 GTM / Campaign
- 商业目标与营销 / 行为目标分层。
- 五个 Creative Territories 各自映射一个主创意机制及证明边界。
- 明确策略重构不等于五条创意已全部发布或测试胜出。

### Facebook Group / 活动治理
- Program Owner 按主要业务目标确定，单场活动只设一个最终 Owner。
- Event Contract 补齐目标、参与资格、窗口、奖励履约、审核、权限、指标和回滚条件。
- UGC 参与与品牌商业使用授权分开。
- 报名、出席、查看、发帖评论、UGC、点击和购买分别记录。
- 活动结束后明确内容、社群关系、Measurement 与 Campaign 复盘的交接。

## 建议检查顺序

1. 首页：是否能在 10 秒内理解目标岗位和核心价值。
2. 案例索引：11 个案例是否层次清晰，是否更像案例而不是销售 PPT。
3. GTM：策略、Big Idea、创意机制、内容矩阵、跨团队协作是否形成完整链路。
4. 社媒与社群：团队管理、活动治理和数据展示是否能证明管理能力。
5. B2B 展会：照片脱敏是否充分，个人贡献边界是否准确。
6. 数据：图表是否忠于原始口径，是否清楚区分 DOCUMENTED / RECONSTRUCTED / PENDING。
7. Creator / PR / CRM：是否展示策略、流程和治理，而非虚构执行结果。
8. 移动端：菜单、卡片、图表、详情章节和弹窗是否易读、可操作。

## 验收状态与边界

- GitHub Actions Run #141：Validate SUCCESS。
- `npm test`：139/139（结构 / 隐私 / 资源 8/8；DOM / 交互 70/70；Growth / 案例行为 61/61）。
- PR #15 保持 Draft / Open。
- `main` 未修改；Deploy job 按 PR 规则跳过。
- 本轮未对新增模块执行新的真实浏览器截图验收；自动化测试通过不代表视觉验收通过。
- 本站展示的概念方案、策略重构和历史数据保持各自证据状态，不得将规划写成历史发布、投放、成交或 ROI。
