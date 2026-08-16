# Purchase Experience Demo — Content & Mock Data Reference

*Companion to `PURCHASE-EXPERIENCE-DEMO-BUILD-SPEC.md`. Everything here should live in one `content.ts` (or `.json`) file in the demo route so copy can be tweaked without touching component code. All figures are chosen to stay internally consistent — the negotiated rent (AED 140,000) is what every downstream calculation (deposit, fee, agency fee) is based on.*

---

## Cast & property

| Field | Value |
|---|---|
| Landlord name | Ahmed Al Farsi |
| Landlord avatar initials | AF |
| Building | Marina Gate |
| Unit | Unit 1204 |
| Asking price (shown at Offer step as the starting reference) | AED 145,000/yr |

## Listing Detail screen (new — pre-flow, before Appointment)

*See `PURCHASE-EXPERIENCE-DEMO-LISTING-SCREEN-SPEC.md` for the full screen spec. Same building/unit/landlord/rent as above — this is the screen the tenant sees before starting the wizard.*

### Photos
No real photography needed for the demo — use a small set of stock interior/exterior shots (Unsplash direct-image URLs are fine and free; swap for real listing photos in production). Suggested split:
- **Official (5):** exterior, living room, kitchen, bedroom, bathroom — landlord/Livingin-sourced.
- **Community (3):** a balcony-view shot, a building-amenity shot (pool/gym), a hallway/entrance shot — framed as user-submitted.

### Rating hero
*Field names below match the real question keys from `lib/review-flow/types.ts` / `review_flow_seed.sql` — not invented metrics. `overallExperience` and `likelihoodToRecommend` are the same two fields `REVIEWS_PAGE_SPEC.md` sorts the `/reviews` directory by.*

| Field | Value |
|---|---|
| `overallExperience` (hero number) | 4.8 |
| Review count | 128 reviews |
| `likelihoodToRecommend` | 4.6/5 |
| `valueForMoney` | 4.3/5 |
| Most recent review | 2 weeks ago |

### Category ratings (new — the seven `quick_fire` questions)
*Real per-review star ratings from the `quick_fire_building` and `quick_fire_apartment` categories, averaged. This is the structured breakdown that doesn't exist on generic listing platforms — see listing spec §2a.*

| Group | Category | Value |
|---|---|---|
| Building | Maintenance | 4.7 |
| Building | Shared facilities | 4.5 |
| Building | Building staff | 4.8 |
| Building | Traffic & access | 4.2 |
| Apartment | Natural light | 4.6 |
| Apartment | Soundproofing | 3.9 |
| Apartment | Storage space | 4.1 |

### Building & unit facts
| Field | Value |
|---|---|
| Bedrooms | 2 |
| Bathrooms | 2 |
| Size | 1,450 sqft |
| Furnished | Furnished |
| Available from | 1 Sept 2026 |
| Description | "A bright two-bedroom in Marina Gate with full Marina views, a renovated kitchen, and access to the building's pool and gym." |
| House rules | No pets · No parties · No subletting |

### Landlord light profile (bottom sheet)
| Field | Value |
|---|---|
| Member since | 2019 |
| Buildings listed | 6 buildings listed on Livingin |
| Response rate | Responds within 2 hours · 95% response rate |
| Bio | "Manages residential properties across Dubai Marina." |

*No phone number, email, or other direct contact method anywhere in this profile — see the anonymity discussion in this project's history. The only path forward is the Arrange Viewing CTA.*

### Reviews (3 shown, "128" implied total)
*Structured per the real review flow — alias + verified badge, unit tag, `overallExperience` stars, `headline`, and a `whatWasGood` / `whatWasBad` pair (two separate required questions, not one blended excerpt). See listing spec §5.*

| Reviewer alias | Unit tag | `overallExperience` | Headline | 👍 `whatWasGood` | 👎 `whatWasBad` | When |
|---|---|---|---|---|---|---|
| Sarah M. | 2BR · Apartment | 5.0 | "Smooth handover, exactly as listed" | "Ahmed was responsive throughout and the unit matched the listing exactly." | "Parking was a little tight for guests." | 3 weeks ago |
| James K. | 1BR · Apartment | 4.5 | "Great location, well-maintained building" | "Building amenities are well maintained and the gym is rarely crowded." | "Minor delay getting the AC serviced, though it was resolved quickly." | 2 months ago |
| Fatima A. | 3BR · Apartment | 5.0 | "Best rental experience I've had in Dubai" | "Clear communication throughout and a genuinely fair landlord." | "Wifi in the building lobby is patchy, not really Ahmed's fault." | 2 weeks ago |

### Buildings like this (non-interactive, visual only)
| Building | Rating | Rent range |
|---|---|---|
| Marina Heights | 4.6 | AED 125,000 – 145,000/yr |
| Emaar Beachfront | 4.9 | AED 160,000 – 210,000/yr |
| Marina Promenade | 4.5 | AED 115,000 – 135,000/yr |

## Negotiation numbers (Offer step)

| Field | Value |
|---|---|
| Tenant's initial offer | AED 135,000/yr |
| Landlord's counter | AED 140,000/yr |
| Final accepted amount | **AED 140,000/yr** — used everywhere downstream |

## Appointment step

| Field | Value |
|---|---|
| Proposed date | Tue, 19 Aug |
| Time slots | 10:00 AM ✓, 11:00 AM ✗ (booked), 12:00 PM ✓, 1:00 PM ✓, 2:00 PM ✗ (booked), 3:00 PM ✓, 4:00 PM ✓, 5:00 PM ✗ (booked) |
| Slot the demo selects | 12:00 PM |
| Pending copy | "We'll notify you as soon as Ahmed Al Farsi responds to your request." |
| Confirmed copy | "Confirmed by Ahmed Al Farsi" |
| Toast on confirmation | "Proposed time accepted" |

## Contract step

| Field | Value |
|---|---|
| Annual rent | AED 140,000 |
| Duration | 12 months |
| Contract start | 1 Sept 2026 |
| Move-in date | 1 Sept 2026 |
| Payment schedule | Monthly via Keyper |
| Security deposit (5%) | AED 7,000 |
| Agency fee (5%) | AED 7,000 |
| Living fee (2%, non-refundable) | AED 2,800 |
| Due before move-in (total) | AED 9,800 *(deposit + living fee — agency fee timing is a separate line, not summed into "due before move-in" unless you want to; keep consistent with whatever the Price Breakdown card shows)* |
| Key clauses (plain text, 3 lines) | "Security deposit equal to 5% of annual rent" / "No subletting without written consent" / "90-day notice period for non-renewal" |

## Living Fee checkout step

| Field | Value |
|---|---|
| Fee calculation shown | AED 140,000 × 0.02 |
| Total due | AED 2,800 |
| Disclosure | "This fee is non-refundable once paid." |
| Supporting line | "Charged regardless of payment method." |
| Payment methods | Card (default) / Tabby · 4 payments |
| Tabby installment preview (if built) | 4 × AED 700 |
| Confirmation copy | "Marina Gate, Unit 1204 has been **removed from active listings**." |

## Documents step

| Document | Ends at |
|---|---|
| Emirates ID | Verified |
| Passport | Verified |
| Visa | Verified |

*(All three verify in this happy path — no mismatch state. Stagger the "verifying" delay slightly per document, e.g. 1.5s / 2s / 2.5s, so they don't all pop at once.)*

## Ejari step

| Field | Value |
|---|---|
| Tracker labels | Generating → Ready for review → Sent for e-signature → Both parties signed → Filed |
| Mid-flow card copy | "Complete your signature in the REST app" / "This step happens outside Livingin — the REST app will confirm back to us automatically." |
| Mid-flow button | "I've Signed via REST" |
| Filed badge | "Ejari filed" |

## Deposit step

| Field | Value |
|---|---|
| Account name | Ahmed Al Farsi |
| Bank | Emirates NBD |
| IBAN | AE07 0331 2345 6789 0123 456 |
| Deposit due | AED 7,000 |
| Confirmation badge | "Receipt confirmed by landlord" |
| Confirmation hero | "AED 7,000 received" |

## Rent Setup step (Keyper)

| Field | Value |
|---|---|
| Provider | Keyper |
| Handoff copy | "You're leaving Livingin's flow to finish setup with Keyper, our monthly-payment partner." |
| Connecting state copy | "Connecting to Keyper…" |
| Connected confirmation | "Keyper connected" — supporting line: "First payment: AED 11,667 on 1 Sept 2026" *(140,000 / 12, rounded)* |

## Move-In step

| Field | Value |
|---|---|
| Headline | "You're all set" |
| Move-in date | 1 Sept 2026 |
| Recap checklist | Living fee paid · Ejari filed · Deposit confirmed · Keyper connected (all pre-checked) |
| CTA | "Explore Move-In Services" |

## Marketplace step

| Category | From price | Provider | Cart price |
|---|---|---|---|
| Moving | AED 350 | Zippy Movers | AED 450 |
| Internet | AED 299/mo | Etisalat Home | AED 399 |
| Deep Clean | AED 280 | Sparkle Clean Co. | AED 320 |
| Regular Clean | AED 99/wk | Sparkle Clean Co. (Weekly) | AED 120 |

*Recommended demo path: tap **Deep Clean** → add Sparkle Clean Co. (AED 320) to cart → View Cart → Checkout.*

| Field | Value |
|---|---|
| Trust badge on provider card | "Livingin rate" |
| Add-to-cart toast | "Added to cart" |
| Order confirmation | "Order confirmed" — "AED 320 paid" — "Your providers will be in touch to schedule." |

---

## Simulated-wait timings (§4 of the build spec)

Vary slightly per step so the pacing doesn't feel mechanical — these are starting points, tune live during rehearsal:

| Step | Wait | Duration |
|---|---|---|
| Appointment | landlord accepts | 1.8s |
| Offer | landlord counters | 2.2s |
| Fee | payment processing | 1.5s |
| Documents | each doc verifies | 1.5s / 2s / 2.5s (staggered) |
| Ejari | first 2 dots auto-advance | 1.5s |
| Ejari | last 2 dots after "I've Signed" tap | 1.2s |
| Deposit | landlord confirms | 2.5s |
| Rent Setup | Keyper connects | 1.8s |
| Marketplace | checkout processing | 1.2s |

All waits are skippable by tapping anywhere on the frame (see build spec §4) — treat the numbers above as the *default* pace for an unhurried run-through, not a hard requirement.
