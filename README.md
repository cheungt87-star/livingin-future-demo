# Purchase Experience Demo — Asset Folder

Everything needed to brief and build the standalone clickable demo of Livingin's purchase experience. This folder is reference material only — the demo itself is a **separate codebase** (see `PURCHASE-EXPERIENCE-DEMO-BUILD-SPEC.md` §2), not part of the Livingin.ae Next.js app.

## Reading order

1. **`PURCHASE-EXPERIENCE-MOCKUP-BRIEF.md`** — the original design brief for the full purchase journey (10 steps, all variants), handed to Claude Design. Origin doc for everything else here.
2. **`Purchase Experience (Standalone).html`** — the resulting interactive HTML mockup (open in a browser to click through). Covers the full branching flow, not hosted, not the happy-path demo.
3. **`PURCHASE-EXPERIENCE-UI-POLISH-SPEC.md`** — visual QA pass on that mockup: typography, hierarchy, colour, native-app framing fixes. Baked into the build spec below.
4. **`PURCHASE-EXPERIENCE-DEMO-BUILD-SPEC.md`** — the spec for the actual standalone, hosted, clickable demo (one fixed happy path). This is what a coding tool should build from.
5. **`PURCHASE-EXPERIENCE-DEMO-LISTING-SCREEN-SPEC.md`** — the Listing Detail screen (photos, rating, landlord profile, reviews, similar buildings) that sits before the wizard starts. Its one CTA, Arrange Viewing, is what kicks off step 1 of the flow in the build spec.
6. **`PURCHASE-EXPERIENCE-DEMO-CONTENT.md`** — every copy string, name, and number used in the demo, in one place.

## Status

Design/spec stage. Demo repo in progress (Vite + React, standalone) — currently one screen built (Appointment). Listing Detail screen speced but not yet built.
