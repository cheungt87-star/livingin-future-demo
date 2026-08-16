# Purchase Experience Mockup — UI Polish Spec

*Reviewed: 2026-08-16*
*Source reviewed: `Purchase Experience (Standalone).html` — 10-step interactive prototype (Appointment → Offer → Contract → Living Fee → Documents → Ejari → Deposit → Rent Setup → Move-In → Marketplace), phone-frame presentation, built on `LivinginAeDesignSystem_00b073`.*
*Flow/IA verdict: sound, no changes needed there. This spec is UI polish only — typography, hierarchy, colour, native-app framing, labelling — for tomorrow's demo.*

The prototype is functionally complete — every step has working state and multiple variants (pending/declined/confirmed etc.), which is the hard part and it's done well. What's undermining "professional/trustworthy/native" is almost entirely presentation: no device chrome, visible dev harness, flat typographic hierarchy, and under-celebrated confirmation moments. None of it requires new screens — it's tightening what's there.

---

## Fix before the demo (high impact, mechanical, low effort)

### 1. No native device chrome — the single biggest "feels like a web mockup" tell
**Current:** phone frame is a plain 390×780 box — 1px border, rounded corners, drop shadow. No status bar, no home indicator.
**Why it matters:** this is the fastest, cheapest way to make something read as "real app" vs. "design tool export." Airbnb's own marketing mockups always ship with this.
**Fix:**
- Add a simulated iOS status bar at the very top of the frame: time (`9:41`), signal/wifi/battery glyphs, ~44px tall, sits above the existing back/title/counter nav row.
- Add a home-indicator bar at the bottom: a `134×5px` rounded charcoal bar, centered, ~8px from the bottom edge, floating over content (not pushing it up).
- Round the frame corners more aggressively to read as a device, not a card — try `36–40px` instead of the current card-style radius.

### 2. Dev harness is visible around the frame
**Current:** above the phone, there's a "Purchase Experience — prototype" label, a step counter, a horizontal row of 10 numbered step-pills, and variant-selector chips ("Pending", "Confirmed", "Declined"...) — all necessary for building/QA, all wrong for a demo screenshot or share.
**Fix:** for anything captured and shown live tomorrow, frame/crop to the phone only — none of the harness should be in-shot. If there's time, add a simple toggle that hides the harness entirely (`?present=1`-style flag) so the link itself can be shared clean without needing careful cropping.

### 3. Subsection headers use two different type treatments with no visible rule
**Current:** some in-screen subheads ("Money", "Key clauses") use Barlow Condensed, uppercase, 13px/700; others doing the identical job ("Price breakdown", "Payment schedule", "Your documents", "Landlord's progress") use plain Inter, sentence case, 13px/600. Both patterns appear on the *same screen* (Contract step).
**Fix — pick one, apply everywhere:** Inter, uppercase, **12px**, weight 600, `letter-spacing: 0.04em`, color `var(--text-secondary)`. Reserve Barlow Condensed strictly for the step title in the nav bar and the one big "You're all set" moment — per `DESIGN_SYSTEM.md`, Barlow Condensed is an H1–H3 heading font, not a label font, and using it for every card subhead dilutes what should be the flow's biggest hierarchy signal (the step title).

### 4. Confirmation moments are visually the *quietest* thing on screen — should be the payoff
**Current:** "Payment confirmed" (fee), "Receipt confirmed" (deposit), "Ejari filed", "Order confirmed" (marketplace) all render as a small green Badge + a 16–20px mono number. Only the Move-In-Ready screen gets the bigger treatment (sun-tinted panel, 20px Barlow Condensed "You're all set").
**Why it matters:** these are the four moments in a high-stakes financial flow where the user should feel reassured/rewarded. Right now they read as just another list row.
**Fix:** reuse the Move-In-Ready panel pattern (soft-tint background panel, `var(--radius-lg)`, big number) for all four:
- Fee paid → tint `rgba(255,107,91,0.08)` (already used for the "listing removed" note — extend it to wrap the whole confirmation block), hero number **28px** mono, not 20px.
- Deposit confirmed → tint `rgba(0,184,169,0.1)` (teal, since this is a landlord-confirmed trust moment), hero number **28px**.
- Ejari filed → same teal tint treatment, currently just a bare badge with nothing else — add the panel.
- Order confirmed (marketplace) → same coral/teal tint, hero number **28px**.

### 5. Header stack is four bands deep before content starts
**Current:** toast (conditional) → back/title/counter nav → 3px progress bar → unit-info bar ("Marina Gate · Unit 1204" + "AED 140,000/yr") — all fixed, all above the fold, on a 780px-tall frame.
**Fix:** fold the unit-info bar into the nav row as a subtitle under the step title (smaller, `11px`, `text-secondary`) instead of its own full-width band. Recovers ~40px of content height per screen and reduces the "cluttered" feeling on first glance. Drop the rent figure from this persistent bar entirely — it's only relevant on Offer/Contract/Fee, not on Marketplace or Ejari, and repeating it everywhere adds noise without adding information.

---

## Worth doing if time allows (real improvement, not demo-blocking)

### 6. No imagery anywhere — zero photos, zero avatars
This is a flow about trusting a stranger with a large financial commitment, and it's currently 100% text/data. Airbnb leans hard on host photo + listing photo specifically to solve this. Add: a small landlord avatar (circle, ~32px) next to "Ahmed Al Farsi" wherever his name appears (appointment, offer, contract), and a unit thumbnail in the nav subtitle area. Highest-effort item on this list — reasonable to defer past tomorrow, but flag it as the next real trust upgrade.

### 7. Hero/total numbers under-differentiated from line items
**Current:** e.g. on the fee checkout screen, "Total due: AED 2,800" is 16px/700 against 14px/400 line items above it — only a 2px jump.
**Fix:** three-tier money scale — line-item label 12px/400 secondary, line-item value 14px/500 charcoal, total/hero value **20–24px/700 mono**. Apply consistently across Contract price-breakdown, Fee checkout, and the payment-schedule lists.

### 8. CTA verb consistency
Current labels shift voice: "Continue to Deposit," "Continue with Keyper," "Explore Move-In Services," "Back to Marketplace." Standardize forward-progress CTAs on "Continue to [next step]" and reserve verbs like "Explore" only for genuinely optional/exploratory actions (the marketplace entry point is a legitimate exception).

### 9. Fee step under-explains what the payment buys
"This fee is non-refundable once paid" is the only framing at the single highest-stakes moment in the flow. Add one reassurance line — something like confirming the payment is what locks in the agreed terms and moves the listing into contract — so the fee reads as "this is what happens next," not just a warning label.

---

## What's already working — don't touch

- **CTA button treatment** (full-width 48px pill, coral fill, coral-tinted shadow, uppercase Inter bold) — correct, on-brand, no changes.
- **Segmented control / chip pattern** (charcoal fill when selected, outline when not) for Cheques/Monthly and Card/Tabby toggles — this is deliberately neutral rather than coral, which actually matches Airbnb's own pattern of reserving colour for true primary actions, not for selection state. Keep as-is.
- **Error/declined states** (`rgba(220,38,38,0.1)` background, `var(--renter-red)` text) — correctly follows the design system's error-color rule, no changes.
- **Numeric steppers** (+/− circular buttons for offer amount and cheque count) — good native-feeling affordance already.
- **Move-In-Ready screen** — this is the template every other confirmation moment should be copying (see item 4).
