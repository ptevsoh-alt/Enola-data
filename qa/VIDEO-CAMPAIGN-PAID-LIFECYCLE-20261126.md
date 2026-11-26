# Video Projects × Campaign × Paid → Lifecycle — Content QA

## Scope

- Source is stacked on Draft PR #32 (`portfolio/brand-earned-creative-campaign-20261125`), not on source `main`.
- Target route: `#/case/creative/video-projects`.
- Campaign bridge: `#/case/gtm/campaign-architecture`.
- Important original deep links retained: `video-campaign-showcase`, `video-campaign-strategy`, `creative-production-scope`, `video-storyline`, `kol-shorts`, `video-management`.
- Original media retained: two Google Drive TVCs (Thanksgiving/Christmas) and two actual Creator 7s video assets (stairs/living room).

## Sources used (current Enola knowledge)

- [Market Intelligence](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-a/cap-mkt-001/market-intelligence.md): category differences, substitute decisions, market-relevant proof.
- [Customer Research](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-a/cap-cus-001/customer-research.md): JTBD, usage context and hypotheses vs research evidence.
- [Brand Strategy](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-b/cap-brand-001/brand-strategy.md): awareness/associations vs loyalty truth, positioning and message consistency.
- [Campaign Strategy](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-b/cap-camp-001/campaign-strategy.md): business goal → Big Idea → asset system → channel sequence → review.
- [Content Marketing](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-cont-001/content-marketing.md): content jobs, canonical source assets, format-specific adaptation.
- [Social Content](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-soc-001/social-content-publishing.md) and [Community Relationship](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-soc-001/community-relationship.md): useful questions, UGC rights, source of feedback and identity/consent boundary.
- [Paid Architecture / Creative Supply](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-paidarch-001/paid-architecture-creative-supply.md): campaign business role, creative families, testing scope/lineage.
- [Paid Growth](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-paid-001/paid-growth.md): control variables, audience, delivery, attribution evidence, owner approval.
- [Video Production](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-c/cap-vid-001/video-production.md): brief, script, shot, continuity, real product actions and version QA.
- [Lifecycle Orchestration](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-d/cap-life-001/lifecycle-orchestration.md) and [Lifecycle Handoff](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-d/cap-life-001/lifecycle-actions-handoff.md): verified state, permission, purchase exits, channel ownership, writeback.
- [Loyalty / VIP / Referral](https://github.com/ptevsoh-alt/enola-marketing-skills/blob/main/2026-07-22_市场-skill/capabilities/dom-d/cap-loy-001/loyalty-vip-referral.md): genuine membership rules, consent, rewards, referral identity and content rights.

## Portfolio presentation decisions

### Existing work vs channel strategy

- **Original work**: Thanksgiving and Christmas seasonal TVC footage; distinct stairs/living room Creator video excerpts; participation in subject/story decisions, scripts/shot requirements, product and format review.
- **Cross-channel application**: the marketing jobs those creative styles can perform at awareness, product explanation, comparison, offer qualification and post-purchase education.
- **Proposed Paid asset supply**: Story Hook, Product Proof, Creator Explainer families. This does not claim the videos were launched as ads or generated measurable CPA/ROAS.
- **Lifecycle / Loyalty handoff**: eligible educational video and voluntary UGC/advocacy concepts; not a claim about existing CRM activation, loyalty liabilities, sales or actual customer cohorts.

### Campaign boundaries

- `Power Every Move` is the brand-level proposition.
- Thanksgiving and Christmas are independent seasonal executions.
- `Make Room for What Matters` is a separate M3 campaign. Reusable creative production methods may cross these projects, not historical campaign results.
- Conversion, retention and loyalty measurement require verified signals and correct data owners. Viewing a video is not consent or a purchase.

### Layout / links / asset acceptance

- Five stages of content job (Notice / Learn / Compare / Act / Return), three Paid creative families, four cross-channel handoffs and four video production steps.
- Brand → Campaign → video strategy / actual media → CRM / Community / Creator path includes actual links, not unimplemented UI.
- Keep four original video sources; no fabricated videos or new video count claims.
- Mobile 390px and desktop 1440px: no horizontal overflow, broken images or sticky anchor overlap.
- Original 11 case routes and existing section anchors retained (with alias for previous production heading).
- Public asset hashes must be recomputed after JS/CSS/cache changes.

## Release plan

- Draft source PR #33 stacked on source Draft PR #32. Do not merge source main.
- Deploy as separate nested preview `/preview/pr33/` alongside `/preview/pr32/`, keeping official root byte-identical to published fixed source.
- Use GitHub Actions tests and real Chrome checks before showing a working preview link. Do not label preview as verified until GitHub Pages deployment succeeds.
