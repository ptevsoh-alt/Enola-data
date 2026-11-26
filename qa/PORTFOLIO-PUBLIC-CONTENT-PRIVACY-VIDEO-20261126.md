# Public Portfolio — Content Privacy & Video Preservation Audit

Date: 2026-11-26
Source baseline: `e604a382db8771537bd06fb19964f99422896db5`

## Scope of this pass

- Public site copy: replace the remaining directly named B2B employer in the homepage bridge with an anonymous project label.
- Recruiter review gallery: relabel a product detail image correctly; it is not presented as a delivered Campaign KV.
- Preserve the 11 case routes, current business metrics, provenance/limitations and the entire GTM/IMC/Brand editorial structure.
- Preserve both standalone Creator demonstration excerpts and the full Thanksgiving / Christmas TVC iframe / original-view links; no video binaries or media path edits.
- Bump only the changed JS asset cache keys; refresh the verified public-asset manifest.
- Align the source README with the 36 metrics present in the current data model.
- Add a site-level privacy/critical-video regression test, supplementing the pre-existing security, asset-hash and prohibited-Creator-record checks.

## Privacy decision boundaries

- Personal portfolio owner name remains intentionally visible; no phone, email, internal file-system path or secret was found in the published HTML/JS audit.
- Platform names (Meta, Facebook, Amazon), historical aggregated achievements, and the M3 product communication case remain useful recruiting evidence; they are not vendor or client-identity endorsements.
- The two explicitly whitelisted Google Drive film links are intentionally preserved to meet the retain-video requirement. They point outside the public site; Drive sharing permissions, embedded branding and uploader metadata must be separately cleared by the rights owner. No inference of consent is made.
- Existing exhibition images were already named/redacted in the source. This text-only pass does not certify every pixel in any image or video as anonymized, and it does not rewrite historic Git commits or other review documents that remain in the public repository.
- Source and display/deploy validation are separate: this change requires new GitHub CI on the branch, then an explicit production source pin update if published.

## Release verification

- Confirm 11 cases and 36 public metrics remain unchanged in the data payload.
- Confirm exact Git object hashes for the two video files match the base commit; video case anchors and the full TVC URLs still exist.
- Confirm a validated `npm test` and browser render on the final release commit before switching the public display repository pin.
