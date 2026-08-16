# Listing Detail Screen — Spec (pre-flow, sits before Appointment)

*Companion to `PURCHASE-EXPERIENCE-DEMO-BUILD-SPEC.md` and `PURCHASE-EXPERIENCE-DEMO-CONTENT.md`. This is a new screen, added ahead of the existing 9-step wizard.*

*Rating/review data model verified against the live Livingin.ae repo — `lib/review-flow/types.ts`, `supabase/migrations/20260707120100_review_flow_seed.sql`, and `REVIEWS_PAGE_SPEC.md` — rather than invented. See §2, §2a, and §5 for what changed as a result.*

## Where this sits in the flow

**This is not step 1 of 9 — it's what comes before the wizard starts.** The existing step counter/progress bar (`1/9` through `9/9`) represents commitment progress through a transaction the tenant has already decided to pursue. Browsing a listing isn't part of that commitment yet, so:

- This screen has **no step counter and no progress bar**. Its own header is lighter: a back button (top-left, overlaid on the image carousel — can be a no-op or hidden in this demo since there's no browse-results screen to return to), a save/heart icon (top-right, same treatment), nothing else fixed at the top.
- Tapping the primary CTA (**Arrange Viewing**) is what transitions into the existing wizard, landing on Appointment at `1/9`, unchanged from the current build.
- Nothing else in the already-built 9-step flow needs renumbering. This is purely additive.

## Layout, top to bottom

### 1. Image carousel
- Full-bleed width, **fixed height 300px** (not aspect-ratio-driven) — use `object-fit: cover` on every image so the carousel frame stays consistent regardless of source photo dimensions. This intentionally crops portrait/off-ratio photos; that's the standard pattern for a listing hero carousel (Airbnb does the same), not a bug. Worth a one-line note for whoever sources real photos later: pick images where the crop-worthy content sits centered.
- A small pill badge, top-left over the image (below the back button), toggles/labels which set is showing: **Official** vs **Community** — e.g. two tab pills "Official · 5" / "Community · 3". Switching tabs swaps which image set the carousel scrolls through. This is the "official and user-uploaded" distinction called out in the brief — don't just blend all images into one unlabeled set, the distinction itself is a trust signal (matches the target-state vision's "official + user submitted" building details).
- **Single-image sets:** if a tab has exactly 1 image, render it as a static image — no dot indicators (a single dot communicates nothing), no swipe gesture wired up. `ImageCarousel` should branch on `images.length <= 1` and skip the carousel behavior entirely rather than rendering a swipeable component with one frame.
- Dot indicators (2+ images only): centered at the bottom edge of the image.
- Back button and save/heart icon: circular, semi-transparent dark background over the image (`bg-black/30`), white icon, so they stay legible over any photo.

### 2. Rating hero — the single most prominent element on the screen

**Revised after reviewing the live review-flow schema (`lib/review-flow/types.ts`, `review_flow_seed.sql`, `REVIEWS_PAGE_SPEC.md`).** The earlier draft of this section invented generic stats ("Responsiveness", "Would-recommend %") that don't correspond to anything Livingin actually captures. Livingin's review flow asks every reviewer three specific `headline_ratings` questions — `overallExperience`, `valueForMoney`, and `likelihoodToRecommend` — each a 1–5 star rating (`likelihoodToRecommend` additionally carries sentiment labels: Highly unlikely → Very likely). Those three are the real proprietary headline metrics, and the reviews directory (`REVIEWS_PAGE_SPEC.md`) already sorts and displays by exactly `overallExperience` and `likelihoodToRecommend` — so this screen should use the same two field names, not invented ones.

This is explicitly the hero, so it should read as such: bigger and higher up than anything else in the content area, directly below the carousel, before building facts.

- Large rating number — **32–36px, IBM Plex Mono, bold**, charcoal — this is `overallExperience`, averaged. (The number itself is data, but at this size it functions as the headline, so charcoal, not the smaller mono-data grey.)
- Coral star row directly beside or below the number (filled stars = coral, per the design system's role-locked rule — never any other color for stars).
- Review count, tappable, scrolls down to the Reviews section: "128 reviews" as a text link (`coral-dark` per the link color rule).
- A row of exactly 2 stat chips beneath, smaller type (12–13px, `text-secondary` label + mono value):
  - **Likelihood to recommend** — `4.6/5`, sourced from `likelihoodToRecommend`. This is the actual field the reviews directory sorts by — surfacing it here (not a fabricated "%") keeps the number meaning the same thing everywhere on the site.
  - **Value for money** — `4.3/5`, sourced from `valueForMoney`.
- A light caption line beneath the stat chips, not a stat chip itself (it's metadata, not a gathered rating): "Most recent review: 2 weeks ago" — from `submitted_at` on the most recent published review for this building.
- **Data provenance (for this demo): all mocked, flat values in the content doc — not computed from the 3 review cards shown.** `overallRating`, `reviewCount`, `likelihoodToRecommend`, `valueForMoney`, and `mostRecentReviewLabel` are each just fields on the mock listing object, named to match the real question keys. Real backend note (not demo scope): in production these would be per-building aggregates computed from `review_responses` filtered to `status = 'published'`, likely a periodic rollup rather than computed per-request (matches `REVIEWS_PAGE_SPEC.md`'s own note that in-memory sorting is a Phase 1 stopgap, to be replaced by denormalized columns or a view at volume) — don't build any aggregation logic for this demo, just use the mock values.

### 2a. Category ratings — the actual proprietary differentiator

**New section, added after this review — this is arguably the most important addition.** Beyond the three headline ratings, Livingin's review flow captures seven more granular category ratings that no generic listing platform (Property Finder, Dubizzle, Google reviews) asks for or structures: four **building**-level (`quick_fire_building`: traffic/access, building staff, maintenance, shared facilities) and three **apartment**-level (`quick_fire_apartment`: noise/soundproofing, natural light, storage space). This structured breakdown — not just one star number — is the real proprietary asset, and the Listing Detail screen should showcase it, not just the headline score.

- `SubHeading` "Category ratings" (shared component, see §5).
- Two labeled groups, **Building** and **Apartment**, each a simple 2-column grid of label + rating:
  - Building: Maintenance, Shared facilities, Building staff, Traffic & access
  - Apartment: Natural light, Soundproofing, Storage space
- Each row: label (14px, charcoal) + either a compact 5-star mini row (coral) or a mono value out of 5 — pick one treatment and use it consistently across all seven; a mono value (`4.7`) reads cleaner at this density than seven repeated star rows.
- These are aggregated averages per building (mocked flat values for this demo, same provenance note as above — see content doc).
- Component: `CategoryRatingGrid` (add to the component table below).

### 3. Building & unit facts
- Headline: building + unit (`Marina Gate · Unit 1204`), Barlow Condensed, matches the wizard's step-title treatment for continuity.
- Rent: **AED 145,000/yr** (this is the *asking* price — matches the content doc's negotiation numbers, so the Offer step later in the flow references the same figure the tenant saw here).
- Key-facts row, icon + label pairs (`lucide-react` icons): bedrooms, bathrooms, size (sqft), furnished status, available-from date.
- Short description paragraph, 2–3 sentences.
- House-rules chips (outline pills, `text-secondary`): No pets · No parties · No subletting. These are Tier 2 terms per the earlier North Star brief — showing them here, before a viewing is even booked, is the whole point of surfacing them early.

### 4. Landlord — verified badge that expands to a light profile
- A single row: avatar (`Avatar` component, initials "AF"), name "Ahmed Al Farsi", `Badge variant="green"` "Verified", chevron affordance. The whole row is tappable.
- Tapping it opens a **bottom sheet** (slide up from bottom, `framer-motion`, true modal with a scrim behind it — see dismissal note below) with the light profile:
  - Larger avatar, name, verified badge repeated
  - "Member since 2019" — a mock field on the landlord object (`memberSince: 2019`) for this demo, not derived from anything. Production note: this would likely be the landlord's account-creation or first-verified-listing date, but for the demo it's just a static value in the content doc.
  - "6 buildings listed on Livingin"
  - "Responds within 2 hours · 95% response rate"
  - One-line bio: "Manages residential properties across Dubai Marina."
  - **No phone number, no email, no other direct contact method anywhere in this sheet.** This isn't an oversight — it's the anonymity principle from the purchase-experience discussion: no direct contact channel gets handed over before a commitment milestone. The only path forward from here is the "Arrange Viewing" CTA, which is how contact actually happens (in-app, scheduled).
  - **Dismissal & interaction with the sticky CTA below:** the sheet is a true modal — its scrim covers the entire screen, including the sticky "Arrange Viewing" bar underneath. That means the CTA simply isn't reachable while the sheet is open; the user must dismiss the sheet first (tap the scrim or a close button) before they can tap Arrange Viewing. Don't special-case "what if the CTA is tapped while the sheet is open" in the CTA's click handler — the modal layering makes that state unreachable by construction.

### 5. Reviews — browsable, and structured the way Livingin's real reviews actually are

**Revised: a real Livingin review isn't a single free-text blob with a star rating — it's structured data**, and the review card should show that structure, matching the card pattern already defined in `REVIEWS_PAGE_SPEC.md` §4 ("building name, bedrooms/type tags, star rating, liked/disliked snippet, reviewer alias + verified badge, timestamp") rather than inventing a different, generic card shape for this screen.

- `SubHeading` "Reviews (128)" — **same shared `SubHeading` component the wizard already uses** (Inter, uppercase, 12px, weight 600, `letter-spacing: 0.04em`, `text-secondary`, per build spec §5). Not a new pattern — reuse it directly so this screen doesn't introduce a second subhead style.
- A simple 5-star distribution bar (five thin horizontal bars, coral fill proportional to count per star level) — optional but cheap to build and reinforces the rating hero with real distribution rather than just one number.
- **3 review cards visible by default**, each a `Card` containing, top to bottom:
  - Reviewer alias (username, e.g. "Sarah M.") + `Badge variant="green"` "Verified tenant" — matches the real site's "reviewer alias + verified badge" pattern (`review_flow` requires a `username` field and reviews are alias-only, never real names — consistent with the anonymity stance elsewhere in this project).
  - A small unit tag chip: bedrooms + property type, e.g. "2BR · Apartment" — from the real `bedrooms`/`buildingType` questions.
  - Star row — this review's `overallExperience` rating.
  - Headline (one line, bold-ish, 14px) — from the real `headline` question ("Summarize your experience in one line").
  - **Liked/disliked snippet, not a single excerpt** — two short lines, each line-clamped:
    - 👍 (or a small teal check) + truncated `whatWasGood` text
    - 👎 (or a small `renter-red`-tinted dash) + truncated `whatWasBad` text
    - This pros/cons split is exactly what the real review flow captures as two separate required questions — showing them separately here is more honest to the data and more useful to a reader than blending them into one paragraph.
  - Relative date ("3 weeks ago").
- **Truncation: CSS line-clamp, not a character count.** Use `-webkit-line-clamp: 2` on each of the liked/disliked lines (with `display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden`) rather than slicing the string at N characters — line-clamp adapts correctly to the actual rendered width and font size at any viewport, where a character cap would produce a different number of visual lines depending on device. No "read more" expansion needed — truncation is silent.
- "See all 128 reviews" link/button below the visible three — for this demo, tapping it can either expand the list in place or be a no-op with a "Not available in this demo" toast (see §Non-goals below — don't build a full reviews sub-page for one demo screen). Tapping an individual review card to open a full detail view (matching the real site's `ReviewDetailModal`, which would also show `bestSuitedFor` tags and the remaining category ratings for that specific review) is also out of scope for this demo — easy to add later, not needed to make the point here.

### 6. "Buildings like this"
- `SubHeading` "Buildings like this" — same shared component, see above.
- Horizontal scroll row of cards: thumbnail image, building name, rating (small, coral star + number), rent range. Visually similar to the Marketplace `CategoryTile` pattern already in the build spec, but with a photo instead of an icon.
- **Non-interactive in this demo** — these exist for visual completeness (a real listing page never dead-ends into nothing below the fold), but tapping one should either no-op or show a toast ("Not available in this demo"). Do not build out additional listing-detail pages for these — that's real scope, not demo scope.
- **Minimum-count rule:** render the whole section (heading included) only if there's at least 1 similar building; hide it entirely at 0. For this demo the mock data always has 3 (see content doc), so this branch won't actually trigger, but the component shouldn't assume a fixed count — a section header sitting above an empty row would look like a bug.

### 7. Sticky bottom CTA
- Single primary CTA, full-width coral pill, `safe-area-inset-bottom` padded: **Arrange Viewing** → transitions into the existing wizard at Appointment (`1/9`).
- No secondary CTA here — Save is already covered by the heart icon in the carousel header, keeping this screen to the one-coral-CTA rule like every other screen in the flow.

## New components needed (add to the build spec's component table)

| Component | Purpose |
|---|---|
| `ImageCarousel` | Swipeable image set with dot indicators and an Official/Community tab toggle |
| `RatingHero` | Large mono `overallExperience` number + coral stars + tappable review count + likelihood-to-recommend/value-for-money stat chips |
| `CategoryRatingGrid` | Building + Apartment grouped breakdown of the seven quick-fire category ratings |
| `LandlordRow` + `LandlordSheet` | Tappable summary row; bottom sheet with the expanded light profile |
| `ReviewCard` | Alias + verified badge, unit tag, stars, headline, liked/disliked snippet, date |
| `RatingDistributionBar` | Five thin coral-fill bars, one per star level |
| `SimilarListingCard` | Thumbnail, name, rating, rent range — horizontal scroll row |

## Non-goals for this screen
- No real photo upload/management — carousel images are static mock assets (see content doc for sourcing).
- No working "See all reviews" sub-page — truncate to 3, everything past that is a no-op or toast.
- No working "Buildings like this" navigation — visual only.
- No map/location view — out of scope unless you want to add it later.

## Responsive behavior

Same stance as the rest of the demo (build spec §3) — **single column throughout, no breakpoint-driven multi-column reflow.** On desktop this screen caps at the same `max-width: 430px`, centered, that every wizard screen uses. It doesn't become a two-column "gallery left / details right" desktop layout — that would be a different, larger design effort, and isn't needed for a demo that's fundamentally mobile-first.

## Confirmed mock data (content doc)

Per the content doc's "Listing Detail screen" section: **128 reviews, 5 Official images, 3 Community images.** These are already the values written there — flagging explicitly since they're referenced throughout this spec and should stay in sync if either doc changes.
