# Livingin.ae — Purchase Experience (Mockup Brief for Claude Design)

*Drafted: 2026-08-16*
*Purpose: standalone design brief for the end-to-end rental "purchase" journey — from post-viewing appointment through to deposit, tenancy paperwork, and the post-move-in add-on marketplace. This is forward-looking (Phase 4–5 territory); not a current build priority. Not yet reconciled with `PRODUCT-JOURNEYS-NORTH-STAR-MOCKUP-BRIEF.md`, which already sketches a shorter version of the middle portion of this flow (see Open Items below).*

---

## Flow overview

Happens after the initial in-person viewing. Ten steps, one continuous journey for the tenant, with landlord accept/decline gates along the way. **2% processing fee** applies to the transaction; the listing comes off the portal once it's under this process (assumption — see Open Items).

1. Appointment request → landlord accept/decline
2. Offer (amount + payment type: cheques w/ count, or pay-monthly) → landlord accept/decline
3. Contract drafted by landlord, high-level terms → tenant views/reviews in-app
4. Living fee (non-refundable, 2% of annual rent regardless of payment option) charged → listing comes off available listings the moment this is paid
5. Document upload, both sides → documents are stored against the user record platform-wide, so anything already on file (from prior verification, another listing, etc.) is reused, not re-requested → Livingin verifies names match across documents
6. Ejari generated → both parties accept via REST app
7. Deposit: landlord shares bank details in-app → tenant pays offline → landlord confirms receipt
8. Rent payment setup: cheques (tenant sends physically, uploads proof, landlord confirms receipt) **or** Keyper/Rently/other monthly provider (embedded UI)
9. Move-in date confirmed
10. Add-on marketplace: moving, internet, deep clean, regular clean — e-commerce checkout style

---

## Screen-by-screen brief

### 1. Appointment Request
- Tenant proposes date/time (Calendly-style, reuse slot-picker pattern if already designed for viewing booking)
- States: pending (awaiting landlord), confirmed, declined (with re-propose CTA)

### 2. Make an Offer
- Amount field, payment type selector: cheques (stepper for count, 1–12) vs. pay-monthly
- Submit → pending state
- States: pending, accepted, declined (with revise-and-resend CTA)

### 3. Contract Review
- High-level terms rendered as a readable summary (not a raw PDF dump) — rent, duration, payment schedule, key clauses
- Tenant actions: approve / request changes
- States: awaiting landlord draft, ready for review, changes requested, approved

### 4. Living Fee Checkout
- Clear "non-refundable" disclosure before payment
- Fee = 2% of annual rent, flat regardless of payment option (cheques or pay-monthly) — shown as a line-item calculation, not just a total
- Standard checkout pattern (card entry, T&Cs checkbox, pay CTA)
- Confirmation state post-payment, with explicit messaging that the listing is now off the market (paying this fee is the trigger — design a visible "listing removed" moment, not a silent backend change)

### 5. Document Upload
- Documents are stored against the user's account, not per-transaction — if a party has already uploaded a document (from a prior listing, or pre-verification), this screen should show it as already-on-file rather than re-requesting it. Design an "already verified" state alongside the upload states below.
- Both parties see their own checklist (EID, passport, visa, Title Deed, etc. — exact list TBC, these are the confirmed core ones)
- Per-document states: not uploaded, on file from before (pre-filled), pending verification, verified, mismatch flagged
- Tenant should see landlord's upload progress at a glance (not the documents themselves) to know the process is moving

### 6. Ejari Generation
- Status tracker: generating → ready for review → sent for e-signature → both parties signed → filed
- Show REST app handoff clearly (external step — don't imply it happens inside Livingin)

### 7. Deposit Payment
- Landlord's bank details surfaced in-app (IBAN, account name, bank)
- Tenant marks "I've sent it" with optional proof upload
- Landlord confirms receipt → unlocks next step
- States: awaiting landlord bank details, awaiting tenant transfer, awaiting landlord confirmation, confirmed

### 8. Rent Payment Setup — two branches
- **Cheques:** tenant uploads photo of each cheque as arranged/sent; per-cheque status (sent → landlord confirmed received); running tally against total agreed count
- **Keyper/Rently/monthly provider:** embedded provider UI or handoff card with clear "you're leaving Livingin's flow" framing if it's an external redirect

### 9. Move-In Confirmation
- Single confirmation screen: move-in date, summary of what's complete (fee paid, Ejari filed, deposit confirmed, rent payment method set)
- CTA into the marketplace (step 10) — this is the natural upsell moment

### 10. Add-On Marketplace
- Standard e-commerce layout: category grid (Moving / Internet / Deep Clean / Regular Clean) → product/provider list within category → cart → checkout
- Each category shows preferred-rate provider(s) with a "Livingin rate" badge (teal, per role-locked accent rules)
- Standard cart + checkout pattern, reusing the fee-checkout component from step 4 rather than inventing a new one
- Empty-cart and order-confirmation states

---

## Design system reuse

Pull directly from `DESIGN_SYSTEM.md` (canonical: `lib/design-tokens.ts`, `tailwind.config.ts`, `app/globals.css`). Do not introduce new colors, fonts, or components — extend existing patterns (e.g. a step/progress indicator, a document-checklist component) only where nothing currently covers the need.

- **Typography:** Barlow Condensed for headings, Inter for body/UI, IBM Plex Mono for data (fees, cheque amounts, dates, counts) via `typography.data`
- **Color roles:** coral = single primary CTA per screen (pay, submit offer, confirm); teal = verified/success/confirmed states (document verified, payment confirmed, "Livingin rate" badges); lilac = reserved for community/quote accents, unlikely to appear here; sun = reserved for milestone moments only — the move-in confirmation screen (step 9) is a legitimate candidate
- **One-coral-CTA rule matters most here** — every step above has exactly one primary action; secondary actions (decline, request changes, re-propose) use the outline/secondary button style, not a second coral fill
- **Status/progress pattern:** this flow is the platform's first true multi-step wizard — establish one step-indicator component in step 1 and reuse it verbatim through step 9 (marketplace in step 10 switches to a standard e-commerce pattern instead)
- **Cards:** `shadow-subtle` at rest, escalate on interaction, consistent with existing card treatment

---

## Open items worth resolving before design finalizes visuals

- **Fee sequencing conflict:** this brief has the living fee (step 4) charged *after* contract review, whereas `PRODUCT-JOURNEYS-NORTH-STAR-MOCKUP-BRIEF.md` has the fee charged *before* contract drafting (fee-payment-locks-terms logic). These need to be reconciled before this becomes a build spec — for the mockup, follow this brief's order as given, but flag it as unresolved.
- **Exact document list per party** — main ones (EID, passport, visa, Title Deed) are confirmed; full final list still TBC.
- **Document mismatch handling** — what does the tenant/landlord see if Livingin flags a name mismatch? Needs at least an error-state screen.
- **Monthly-payment partner** — "pay-monthly" (step 2/8) will run through a partnership with one of Keyper/Rently/similar; exact partner and their UI constraints not yet locked, so step 8's embedded/handoff treatment is a best-guess placeholder.
- **Marketplace providers** — real integrated checkout with named vendors, or a lead-gen/referral card that hands off externally? Changes whether step 10 needs a full cart/payment UI or a simpler "request quote" pattern.

## Sequencing context (for reference, not in scope of this brief)

Per the current roadmap: reviews-coverage (target-state item 1) comes first with no listings yet — buildings are being collated purely on reviews right now. Building cards get built next. Listings (and therefore this Purchase Experience flow) sit on top, once both of those exist. This brief is a forward-looking design reference, not a near-term build target.

---

## Prompt for Claude (Design)

```
Create mobile-responsive mockup screens for Livingin.ae's Purchase Experience — the end-to-end
flow a tenant and landlord go through after an in-person viewing, from appointment request
through to deposit, tenancy paperwork, and a post-move-in add-on marketplace, for a Dubai
rental marketplace platform.

Use the existing Livingin design system already established in this project (color tokens,
typography — Barlow Condensed for headings, Inter for body, IBM Plex Mono for data/fees/dates
— and the visual hierarchy rules: one coral CTA per screen, verified/confirmed states in teal,
sun reserved for milestone moments only). Don't introduce new colors, fonts, or components
outside that system — extend it only where genuinely needed, such as a reusable step/progress
indicator for this multi-step wizard, or a document-checklist component with per-item status.

Design mobile-first, then confirm layouts hold at tablet and desktop — most Livingin traffic
is mobile. This flow is the platform's first true multi-step wizard, so establish one
step-indicator pattern early (step 1) and carry it through consistently; the final marketplace
step switches to a standard e-commerce layout (category grid → list → cart → checkout) instead.

Build screens for these ten steps, in this order:

1. Appointment Request — slot proposal, pending/confirmed/declined states.
2. Make an Offer — amount, payment type (cheques with count stepper, or pay-monthly), pending/
   accepted/declined states.
3. Contract Review — high-level terms as a readable summary (not a raw document), approve/
   request-changes actions.
4. Living Fee Checkout — non-refundable disclosure, 2% of annual rent shown as a calculated
   line item, standard payment form, and a confirmation state that visibly communicates the
   listing has just been removed from the marketplace (this payment is the removal trigger).
5. Document Upload — per-document checklist for both parties, states: not uploaded, already on
   file (documents are stored against the user's account and reused across listings/flows, not
   re-requested), pending verification, verified, mismatch flagged; tenant sees landlord's
   progress at a glance without seeing the documents.
6. Ejari Status — tracker from generating through both-parties-signed to filed, with a clear
   handoff card for the external REST app step.
7. Deposit Payment — landlord's bank details displayed, tenant marks as sent (optional proof
   upload), landlord confirmation unlocks the next step.
8. Rent Payment Setup — two branches: cheques (per-cheque upload and running tally against
   agreed count) and a monthly-provider (Keyper/Rently) embedded or handoff card.
9. Move-In Confirmation — single summary screen (date, fee/Ejari/deposit/payment-method status
   all shown complete) with a CTA into the marketplace. This is a legitimate spot for the `sun`
   milestone accent.
10. Add-On Marketplace — category grid (Moving, Internet, Deep Clean, Regular Clean), provider
    list per category with a teal "Livingin rate" badge, cart, checkout (reuse the step 4
    checkout pattern), empty-cart and order-confirmation states.

For each step, produce the primary screen state plus at least one alternate state (pending,
declined, mismatch, or empty, as applicable — see the per-step notes above).
```
