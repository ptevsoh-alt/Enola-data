# 作品集对照两组管理岗 JD：内容修订与证据边界（2026-11-22）

## 目标
本次优化的是 `Enola-data` 现有 11 案例个人作品集，而不是新建“GTM 版”“区域 IMC 版”两套求职站。优先展示业务判断、核心取舍、所负责的内容团队交付、横向协调、真实作品与结果。首页仍从个人经历与代表项目进入。

## 来源
- 用户本轮上传 JD 画面一：上市节奏、市场/竞品、Amazon A+/主图 / 独立站落地页 / 社媒视频脚本 / 渠道培训、四执行口横向推动、D7/D30 复盘。
- 用户本轮上传 JD 画面二：欧洲及澳洲区域整合营销规划、区域营销日历、节点 / 节庆 Campaign、产品 GTM 协同、品牌社媒产品项目团队的跨部门协作、本地化；岗位要求强调独立推进活动。
- 简历基线：2026-10-28(4) 两页完整简历；2025.04—2026.09 社媒负责人 / 社媒管理组长、2023.11—2025.03 海外 B2B、此前两段 Amazon 运营。
- Enola-marketing `main` 基线：`409e5a64adb3e2437c657fe3b0c2f8aec42835c9`：GTM、Campaign、PMM、Operations、Data 的跨业务 Owner 协同与证据边界。

## 逐项 JD → 案例交付
| JD 关注点 | 修改/入口 | 可证明程度 |
|---|---|---|
| 上市四阶段：预热 / 首发 / 放量 / 收尾 | `site/projects.js` → `#/case/gtm/launch-four-stages` | 2026 年 5 月 M3 规划重建，非实际发布 |
| 用户任务、市场与竞品 | `#/case/gtm/launch-decisions` 与 `#/case/brand/brand-positioning` | 定性问题与功能参照，非量化需求验证 |
| 跨渠道物料 Brief | `#/case/gtm/launch-cross-channel` | 社媒 Brief 与 KV QA 有工作物；M3 Amazon A+ / dealer 培训为接口样例，定稿待核 |
| 横向协调四执行口 | `#/case/operations/cross-functional-governance` | 负责社媒小组，跨团队是协作；不声称管理 Amazon / 站点 / 海外渠道团队 |
| D7 / D30 对齐渠道与复盘 | `#/case/gtm/launch-d7-d30` | 复盘方法设计，非已实际完成的两轮项目报告 |
| 区域营销日历及本地化 | `#/case/brand/regional-campaign-planning` | 北美历史项目 + 美英文案样例可证明；欧洲和澳洲当地营销执行待证实 |
| 季节与节庆 Campaign | `#/case/social/fathers-day-calendar` 与 `#/case/creative/video-projects` | 父亲节为内容日历概念；视频为节选，不能写作已投放完整成片 |
| 资源调度及 Campaign 闭环 | `#/case/operations/asset-review` 和 `#/case/operations/cross-functional-governance` | 有主视觉被 CTA 遮挡的明确返工事实，不造预算、人员规模、节省时间 |

## Enola 能力落地与表达规则
- **GTM**：定位 / 证据 / 上市窗口 / Channel Motion / 商业就绪 → 由相关 Owner 批准，内容组执行传播任务。
- **Campaign**：主目标 → 用户情境 → Big Idea / 渠道机制 → 资源 / 容量 → 物料 Brief → QA → 衡量 / 下一轮；日历只是这一链条的部分交付。
- **PMM / Claim**：FABA / FABE、用户利益、结构展示、真实演示及适用条件，不能把没有拍到的动作或证据写成性能验证。
- **Operations**：明确单项最终业务 Owner 与支持方，异常用具体 BLOCKER → 下一动作 → 负责人与确认时点处理，不把跨部门催节点理解成管理所有部门。
- **Data**：同市场、窗口、定义区分 D7 的早期行为信号与 D30 的商业/售后评估；没有订单与对照窗口时不给 ROI 结论。

## 本轮页面写入
- `site/projects.js` 新增四阶段上市、Amazon/独立站/海外渠道/社媒接口、D7/D30 分诊、区域活动适配、团队横向协作。
- `site/data.js` GTM 案例计划、资源责任与复盘文案同步，不把内容示范当真实投放。
- `site/selected-work.js` 将 M3 首页代表项目入口聚焦四阶段和渠道协调。
- `site/app.js` 更新核心项目步骤与“实际管理社媒小组 vs 协调其他职能”的文字。
- `site/review/index.html` 增加可直接点击的章节入口。
- `PUBLIC_ASSETS.json` 根据代码资源校准，数字指标和图片/视频原件不改。

## 仍需要的原始材料
1. 若实际执行过多渠道新品发布，提供上市版本、Amazon A+/主图、独立站落地页、渠道培训文件中的任意一组发布链接或脱敏成品；没有则保留接口示例。
2. D7、D30 真实报告或同时间窗口数据，用于把示范性复盘升级为业务结果。
3. 欧洲和澳洲区域 Campaign 的直接参与材料（若有），否则不写成该市场执行经历。
4. 市场与竞品研究的来源、日期、样本和结论，用于将策略假设提升为可核实的用户洞察。
5. 一次完整 Campaign 的负责人决策记录、跨部门排期和验收结论；无需用户离职后强行索取不可得的公司内部敏感文件。

## 发布原则
保留单一个人作品集；主站 `main` 不擅自合并；源代码在 PR #15 候选分支，独立 `Enola-data-Portfolio` GitHub Pages 站在源代码校验成功后再更新固定提交。CI 通过证明结构/交互和资源校验，不能代替真实浏览器的全屏视觉、音画与手机端人工验收。
