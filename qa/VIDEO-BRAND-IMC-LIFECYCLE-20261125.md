# Video Projects — Brand / IMC / Paid / Lifecycle / Campaign review (2026-11-25)

## Scope and dependency
- Route: `#/case/creative/video-projects`, plus reciprocal `#/case/gtm/campaign-architecture` link and home selected-project copy.
- Base: PR #32 `4f920656c4edfa37c8ddc415624e082831d8ec51`. This is a stacked incremental change; the root public portfolio is separately pinned.
- Explicitly do not merge source `main` or reuse a live Pages pin without a separate publication decision.

## Knowledge-to-editorial mapping
| Domain | Decision in Video Projects | Authored deliverable |
| --- | --- | --- |
| [Market Intelligence](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-a/cap-mkt-001/market-intelligence.md) | Category explanation and product alternative need visible working proof | Market-context introduction |
| [Customer Intelligence](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-a/cap-cus-001/customer-research.md) | Home-care job, barrier, use situation and proof to select video role | Customer-task decision and scene-to-video mapping |
| [Content Marketing](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-cont-001/content-marketing.md) | Story, native re-editing, source asset lineage, CTA and proof by task | TVC/Creator adaptation and content continuation |
| [Social Publishing](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-soc-001/social-content-publishing.md) and [Community](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-soc-001/community-relationship.md) | Hook, platform narrative and question-to-tutorial handling | Social/Community video job |
| [Paid Architecture](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-paidarch-001/paid-architecture-creative-supply.md) | Creative supply/angle/crop/claim and platform contract | 3 creative-entry concepts |
| [Video Production](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-vid-001/video-production.md) | Storyboard, shot truth, edit variants, QA, rights | 5-stage production-management board |
| [Paid Growth](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-c/cap-paid-001/paid-growth.md) | Advertising hypothesis and metric maturity owned by Paid | Paid-vs-asset boundary |
| [Lifecycle](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-d/cap-life-001/lifecycle-orchestration.md) | Observed state / consent and next action; watching video is not a customer state | Postpurchase and educational content |
| [Loyalty](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-d/cap-loy-001/loyalty-vip-referral.md) | Referral and UGC require qualification, rights and benefit controls | Loyalty/community boundary |
| [Campaign](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_%E5%B8%82%E5%9C%BA-skill/capabilities/dom-b/cap-camp-001/campaign-strategy.md) | Brand → Big Idea → territories → asset roles → content handoff → review | Video-to-IMC and IMC-to-video links |

## Evidence and claim boundaries
- Preserve the two original Google Drive TVC player URLs, two seven-second Creator MP4 files and their original posters; avoid claiming third-party paid media, consumer interviews or full-film file upload where only a Drive iframe exists.
- Thanksgiving/Christmas are seasonal brand concepts; `Make Room for What Matters` belongs to M3-specific campaign work. Related brand values do not make these the same executed project.
- Do not infer sales/ROAS/CPA/customer lifecycle stage from watch time, likes, a content plan or CTR.
- Video content can **support** a CRM journey and loyalty relations; it is not proof of Klaviyo flows running, referral rewards issued or purchases gained.
- Keep product mismatch explicit: a staircase vacuum clip is not M3 dual-head mop proof.
- Public-facing copy is hiring-reader language (business intent, decision, delivery), without exposing internal skill module IDs or QA tags.

## Acceptance
- `npm test` with new video-to-IMC and original-media regression.
- Real Chrome visual QA desktop 1440px and mobile 390px, including target video Brand/IMC anchor, no overflow or sticky-tab overlap.
- `PUBLIC_ASSETS.json` correct SHA-256 for all changed public files.
- PR remains stacked and Draft until reviewed; no source/main merge and no public root overwrite.
