# 2026-11-26｜品牌文字匿名化与视觉作品保留

- Source baseline: `84fc8f303eaf373d8310df2d89d2f46979313841`.
- User requirement: preserve Black Friday / Mother's Day / Father's Day visuals, PR photos, exhibition materials, Creator excerpts and Thanksgiving/Christmas TVCs. Only anonymize written client/employer/brand identifiers.
- Nine exact instances of the original client slogan were removed from published case text and replaced with accurate descriptions of long-term brand value; no invented replacement brand slogan.
- PR hero image: keep the exact existing `assets/projects/pr-home-scene.webp`; use eager loading to avoid empty deep-link appearance, with an explicit browser asset readiness check.
- Preserve the original `Make Room for What Matters` creative concept and evidence limits. No change to 11 cases, 36 metrics, social growth, PR distribution proof, published video links or thumbnails.
- No files under `site/assets/` were touched; no visual was hidden, retouched, cropped, or removed. Original images may visibly contain client identity or branding; this is intentional under user requirements.
- Regression covers anonymous copy, PR photo availability, two original promotional KV previews, desktop and mobile layouts, and the existing video cases.
- The public Git history and third-party hosted video content are not anonymized by this text-only change.
