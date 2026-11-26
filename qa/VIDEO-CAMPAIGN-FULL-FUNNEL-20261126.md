# 视频作品集 × Brand / Campaign / Paid / Lifecycle 内容重构｜2026-11-26

## 范围
- 视频案例：`#/case/creative/video-projects`
- M3 Campaign：`#/case/gtm/campaign-architecture`
- 累积基线：PR #32 的 HEAD `4f920656c4edfa37c8ddc415624e082831d8ec51`；本轮采用独立 stacked Draft PR，不改来源 `main`。
- 发布端根目录与现有 PR #32 预览保持不变，直至本轮独立预览核验成功。

## 证据与内容定位

**已在视频页呈现的素材**：
- 感恩节主题 TVC（原 Google Drive 视频嵌入保留）
- 圣诞节主题 TVC（原 Google Drive 视频嵌入保留）
- 本地楼梯 7 秒 Creator 演示
- 本地客厅 7 秒 Creator 人物介绍

**品牌与 Campaign 边界**：
- `Power Every Move` 是长期品牌主张。
- 感恩节与圣诞节分别为季节性品牌主题，不属于 M3 2026/05 上市的执行纪录。
- `Make Room for What Matters` 是 M3 上市策划的独立 Campaign Big Idea。与节庆视频案例只关联通用策略和视频制作方法，不混算执行结果。

**新结构**：
1. Market / Customer / Brand → category task, user question, approved brand roof。
2. 4 个真实视频作品各自的传播工作：Brand Hero 情绪、Brand Association、真实操作教育、Creator 产品介绍。
3. Paid Architecture → discovery、education、controlled creative variations、post-attention handoff。这里是内容供给方法，不是投放预算或实测 ROAS。
4. Video Production → script/storyboard、product continuity/proof、format & rights review。
5. Lifecycle → discovery、consider、post-purchase education、community / approved loyalty & referral；流量互动不会自动构成购买意图、同意许可或会员身份。
6. Campaign 管理 → Brief、镜头审核、版本和授权、复盘；准确标注个人创意与社媒内容协调范围。

## 在线知识来源

- [Market Intelligence](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-a/cap-mkt-001/market-intelligence.md)
- [Customer Research](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-a/cap-cus-001/customer-research.md)
- [Content Marketing](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-cont-001/content-marketing.md)
- [Social Content & Community](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-soc-001/social-content-publishing.md)
- [Paid Architecture](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-paidarch-001/paid-architecture-creative-supply.md)
- [Video Production](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-vid-001/video-production.md)
- [Paid Growth](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-paid-001/paid-growth.md)
- [Lifecycle](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-d/cap-life-001/lifecycle-orchestration.md)
- [Loyalty / VIP / Referral](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-d/cap-loy-001/loyalty-vip-referral.md)
- [Campaign Social Workflow](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/campaign-social-workflow.md)
- [Campaign Content Matrix](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/campaign-content-matrix.md)
- [Creative Territories](https://github.com/ptevsoh-alt/social-media-Enola/blob/main/docs/creative-territory-style-and-social-expression-framework.md)

## 事实边界与交付检查
- 不声称节庆视频是 M3 上市的真实投放素材；不声称存在未经核实的 Paid spend / CPA / ROAS / purchase lift 或已上线 Lifecycle / Loyalty 流程。
- 不把评论、点赞或视频观看直接定义为可触达客户、已同意营销的人群或会员。
- 广告实际预算、平台设置、定向与数据归因归 Paid Owner；CRM、会员规则和履约由对应 Owner 审核。
- 原有 TVC 嵌入 / Creator mp4 / 案例锚点保持完整。
- `scripts/test-video-campaign-lifecycle.cjs` 验证 3×策略、4×视频、4×Paid 内容任务、3×Video 制作、4×Lifecycle、4×项目管理；同时验证 Campaign 双向链接和原 PR 案例。
- Real Chrome 1440px / 390px 验证导航、长页布局、视频素材、溢出及品牌入口，记录 `VISUAL_VIDEO_CAMPAIGN` 与 `VISUAL_QA_RESULT`。
