# Purchase Experience — Clickable Demo Build Spec

*Drafted: 2026-08-16*
*For: a coding agent/tool ("Code") building a real, hosted, clickable prototype of one fixed happy path through the purchase experience.*
*Companion docs: `PURCHASE-EXPERIENCE-DEMO-CONTENT.md` — every copy string, name, number, and mock-data value used below, in one place so content can be tweaked without touching component code. `PURCHASE-EXPERIENCE-DEMO-LISTING-SCREEN-SPEC.md` — the Listing Detail screen that now precedes this flow (§1).*
*Reference docs (all in the Livingin.ae project, for lookup only — this demo does NOT live in or depend on that codebase, see §2): `DESIGN_SYSTEM.md` (source of truth for the tokens ported in §2.1), `PURCHASE-EXPERIENCE-UI-POLISH-SPEC.md` (the fixes baked into this spec — subhead typography, confirmation-moment treatment, collapsed header), `Purchase Experience (Standalone).html` (the interactive HTML prototype this demo supersedes — richer, but not hosted and not narrowed to one path).*

**Built as a real installable web app (§3), not an illustration of a phone.** No drawn status bar, no drawn home-indicator bar, no fixed-size mockup frame floating on a grey page — those read as a design tool export, not a native app, the moment it's opened on an actual device. It fills the real viewport and respects real device safe areas instead.

**This is a standalone project — its own repo, its own codebase, its own hosting. It does not live inside, import from, or deploy alongside the Livingin.ae Next.js app.** It only *borrows* that app's visual language (colors, fonts, shadows), which are ported as static values below so this project has zero dependency on the main repo.

---

## 1. Scope

**One fixed happy path, not the full branching prototype.** No decline states, no document-mismatch state, no cheques payment branch. Every "landlord" or "system" response in this demo is simulated — there is no second user, no backend, no real payment processor.

**A Listing Detail screen now sits before this path** — see `PURCHASE-EXPERIENCE-DEMO-LISTING-SCREEN-SPEC.md` (in `Purchase-Experience-Demo/`). It's the browsing/decision screen (photos, rating, landlord profile, reviews, similar buildings) the tenant sees before committing to the wizard below. It has its own header (no step counter/progress bar — browsing isn't part of the transaction) and its one CTA, **Arrange Viewing**, is what starts the numbered flow at step 1. Nothing below is renumbered by its addition.

The path, in order:

1. Make appointment → landlord accepts
2. Make offer → landlord counters → tenant accepts counter
3. Accept contract
4. Pay the Living Fee
5. Upload documents (all verify)
6. Ejari flow (mocked, with one user action mid-flow)
7. Pay deposit → landlord confirms receipt
8. Set up pay-monthly payment (Keyper)
9. Move-in confirmed → Marketplace (browse → add to cart → checkout → order confirmed)

This is a **superset** of what the original 10-step/40-variant HTML prototype covered for this same flow — it adds the offer counter-negotiation and treats "pay monthly" as the demo's only payment path (cheques are out of scope here; they're fully speced already in the HTML prototype if ever needed later).

### Explicit non-goals
- No real authentication, no real payment processing, no real file upload (or file storage) — visual only.
- No persistence: state lives in React state for the session; a refresh resets to step 1.
- No responsive breakpoints beyond mobile + the single desktop fallback in §3 (centered, capped at 430px) — this doesn't need a real desktop layout.
- No SEO — this route must be excluded from indexing (see §7).

---

## 2. Tech approach

**New repo, standalone codebase.** Do not add this to the Livingin.ae Next.js app — no shared imports, no shared deploy, no shared git history. The only thing carried over is the visual language (§2.1), as static values copied into this new project.

Recommended stack — optimized for "buildable and hostable fast, by tomorrow," not for long-term product engineering:

- **Vite + React + TypeScript.** Lighter and faster to scaffold than Next.js for a single-page, no-routing, no-SSR demo. `npm create vite@latest purchase-experience-demo -- --template react-ts`.
- **Tailwind CSS**, configured fresh in this repo (§2.1) — not imported from Livingin.ae's `tailwind.config.ts`, since that file lives in a repo this project doesn't touch.
- **Fonts via `@fontsource`** (`@fontsource/inter`, `@fontsource/barlow-condensed`, `@fontsource/ibm-plex-mono`) rather than a Google Fonts `<link>` tag — self-hosted npm packages mean the demo renders correctly even on bad venue wifi, no external font request at demo time.
- **`framer-motion`** — step transitions (slide/fade) and the confirmation-panel entrance.
- **`lucide-react`** — back arrow, status-bar glyphs, checkmarks, upload icon, cart icon.
- **State:** a single `useReducer` (or a small `useState` set) in the root `App` component driving `{ step, subState, offerAmount, counterAmount, ... }`. No routing at all needed — this is one page, one component tree, state-driven view switching.
- **No backend, no database, no env vars.** Everything is client-side and in-memory (see §1 non-goals).

### 2.1 Design tokens to port (copy these into this project's `tailwind.config.ts`)

Pulled directly from Livingin.ae's `DESIGN_SYSTEM.md` / `tailwind.config.ts` — this is the exact subset this demo needs, nothing more:

```ts
// tailwind.config.ts — colors
colors: {
  coral: { DEFAULT: "#FF6B5B", dark: "#E04E3E" },
  teal: { DEFAULT: "#00B8A9" },
  sun: "#FFC845",
  lilac: "#8C7AE6",
  charcoal: { DEFAULT: "#0F172A", 800: "#1E293B", 700: "#334155" },
  ink: { DEFAULT: "#0F172A", dark: "#0B1120" },
  surface: "#F8FAFC",
  paper: "#F4F1EA",
  border: "#E5E7EB",
  borderWarm: "#E7E2D6",
  slate: "#64748B",   // secondary text
  renter: { red: "#DC2626" },  // error / declined states
}
```

```ts
// tailwind.config.ts — fonts (map to the @fontsource imports above)
fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"],
  mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
  "barlow-condensed": ["Barlow Condensed", "Arial", "sans-serif"],
}
```

```ts
// tailwind.config.ts — shadows actually used by this demo
boxShadow: {
  subtle: "0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)",
  "subtle-hover": "0 4px 6px rgba(15,23,42,0.04), 0 12px 24px rgba(15,23,42,0.1)",
  coral: "0 4px 14px rgba(255,107,91,0.25)",
  "float-lg": "0 10px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.18)",
}
```

Everything else in Livingin.ae's real token set (guide palette, review-specific colors, etc.) is out of scope — this demo doesn't touch neighbourhood guides or the review flow.

---

## 3. This is a real web app, not an illustration of a phone

**Correction from an earlier draft of this spec:** the first build pass rendered a hand-drawn phone — a fixed 390×780 box with a drawn status bar (fake "9:41", fake signal/battery icons) and a drawn home-indicator bar, floating in the middle of a grey page. That's a *mockup graphic*, and it actively works against "feels native": on a real phone, the browser (or the OS itself, if installed to the home screen) already draws a real status bar and a real home-indicator gesture bar — a hand-drawn fake one on top of the real one looks broken, not native. Scrap that approach entirely.

**Build this as an actual responsive web app that fills the real viewport:**

- **No fake device bezel, no fake status bar, no fake home-indicator bar.** Delete those from the plan. The device the user is holding supplies all of that for real.
- **Root layout fills the true viewport:** `height: 100dvh` (not `100vh` — `dvh` accounts for mobile browser chrome showing/hiding), `width: 100%`, no fixed pixel dimensions, no centered card with a drop shadow.
- **Respect safe areas properly**, so content and buttons never sit under a notch, camera cutout, or the iOS home-indicator gesture bar:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  ```
  ```css
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  ```
  Apply `safe-area-inset-top` to the nav row and `safe-area-inset-bottom` to the sticky CTA bar at the bottom of each screen — these are the two places real device chrome can overlap content.
- **Make it installable, so it can genuinely be "added to home screen" and open without a browser URL bar** — this is what actually earns the "native app" feeling on a real device, not a drawn graphic:
  - `manifest.json`: `name`, `short_name`, `display: "standalone"`, `theme_color` (charcoal `#0F172A`), `background_color` (surface `#F8FAFC`), an icon set (a simple coral square with a wordmark glyph is enough for a demo).
  - `<meta name="apple-mobile-web-app-capable" content="yes">` and `<meta name="theme-color" content="#0F172A">` in `index.html`.
  - You do **not** need a service worker or offline caching for a demo — installability/standalone display mode is the part that matters here, not offline support. Skip that scope entirely unless there's spare time.
- **Nav row** (real top of the viewport, padded by `safe-area-inset-top`, no drawn status bar above it): back arrow (44×44px tap target, circular outline) · step title (Barlow Condensed, uppercase, 16px/700) · step counter (IBM Plex Mono, 11px, e.g. `3/9`). Directly below it, a subtitle line — `11px`, `text-secondary` — showing `Marina Gate · Unit 1204` only (no rent figure here; see polish spec §5 — rent only shows where it's contextually relevant: Offer, Contract, Fee).
- **Progress bar:** 3px, `border` background, `coral` fill animating width with each step.
- **Desktop/wide-viewport fallback:** when opened on a laptop for a screen-shared demo, don't stretch full-bleed — cap content at `max-width: 430px`, centered, plain neutral gutters either side, `height: 100dvh` still. This is the same pattern real mobile-first web apps use on desktop (e.g. opening a mobile web app in a desktop browser) — a clean centered column, not a hardware-mockup graphic.
- **No dev harness in the default view.** Add a hidden debug affordance instead: reading `?debug=1` from the URL reveals a step-jump row (useful for you while building/testing) — the default shareable/demo URL has zero chrome beyond the app itself.
- **Restart control:** small text link/button, e.g. `Restart demo`, placed as a low-key element within the app itself (e.g. small ghost button in a corner of the final Marketplace-confirmed screen) rather than outside a frame that no longer exists.

---

## 4. Universal interaction pattern: simulated waits

Every "someone else acts" moment (landlord accepts/declines/counters/confirms, Ejari processing, Keyper connecting, payment processing) uses the **same short simulated-wait pattern** — don't build a bespoke timer per step:

- Show a pending state immediately (badge + toast or inline spinner — see §5 `PendingState`).
- Auto-resolve after **1.5–2.5s** (vary slightly per step so it doesn't feel mechanical — exact values in the content doc).
- **Tap-anywhere-to-skip:** while a wait is active, tapping anywhere on the frame (or pressing spacebar) resolves it instantly. This is the safety valve for a live demo — if the timing feels off in front of an audience, the presenter can just tap through rather than standing in dead air.
- Never use an indefinite/real wait — this is a demo, not a real async operation.

---

## 5. Component inventory

Build these once, reuse across all 9 steps:

| Component | Purpose | Notes |
|---|---|---|
| `AppShell` | Root layout — full `100dvh` viewport, safe-area padding, desktop max-width fallback | §3 |
| `StepHeader` | Back button, step title, counter, unit subtitle, progress bar (sits inside `AppShell`, padded by `safe-area-inset-top`) | §3 |
| `Card` | White surface, `rounded-xl`, `border-border`, `shadow-subtle` | Generic content container |
| `Badge` | Pill, variants: `outline` \| `green` (teal bg/text) \| `red` (renter-red bg/text) | Match `DESIGN_SYSTEM.md` role-locked colors exactly |
| `Avatar` | Circular initials badge (e.g. "AF"), teal or coral background | New vs. the HTML prototype — closes the "no imagery/no trust signal" gap from the polish spec without needing a photo asset |
| `PrimaryButton` | Full-width, 48px, `rounded-full`, `bg-coral`, `shadow-coral`, uppercase Inter bold | The one coral CTA per screen — never stack two |
| `SecondaryButton` | Full-width or inline, outline `border-charcoal`, transparent bg | Used sparingly — this demo mostly has one action per screen |
| `SegmentedControl` | Two-option toggle (used once: Card vs. Tabby on the fee step) | Neutral charcoal-fill-when-selected, per polish spec — not coral |
| `Stepper` | +/- circular buttons flanking a value (offer amount, if you want it adjustable — optional, see §6.2) | |
| `SubHeading` | Standardized subsection label: Inter, uppercase, 12px, weight 600, `letter-spacing:0.04em`, `text-secondary` | **Single pattern, used everywhere** — this is the polish-spec fix for the inconsistent subhead typography. Do not use Barlow Condensed for this. |
| `ConfirmationPanel` | Tinted panel (`rounded-2xl`), hero number 28px IBM Plex Mono bold, supporting line | Reused for all 5 "moment" screens: fee paid, deposit confirmed, Ejari filed, Keyper connected, move-in ready, order confirmed. Tint color: coral-tint for payment moments, teal-tint for confirmation/verification moments, sun-tint reserved for the single biggest moment (move-in ready) |
| `PendingState` | Badge (`outline`, "Awaiting...") + skeleton/spinner + supporting line | The simulated-wait UI from §4 |
| `ChecklistRow` | Dot (empty/teal-filled) + label, used in document checklist and move-in recap | |
| `CategoryTile` | 2-col grid tile, marketplace categories | |
| `Toast` | Top-anchored, slides in/out, used for micro-confirmations ("Added to cart", "Proposed time accepted") | Reuse the HTML prototype's toast positioning/easing — it already works well |

---

## 6. Screen-by-screen spec

Each screen below lists: state name(s), what's on screen, the one primary action, and what it triggers. Copy/numbers referenced by name — see the content doc for exact strings.

**No placeholder content, ever — not even in an early build pass.** Every screen must render its actual layout and actual copy from `PURCHASE-EXPERIENCE-DEMO-CONTENT.md` from the first commit that touches it. Do not stub screens with generic text like "Step: appointment / Substep: initial" — that's a debug label, not a screen, and it will visibly ship if the build runs out of time before a "real content" pass. If a screen isn't built yet, it's fine for it to not exist yet (earlier steps just don't advance past it) — but once you're building a screen, build the real one.

### 6.1 Appointment
- **State: `picking`** — date label + 3×N grid of time-slot buttons (some pre-marked unavailable/disabled per content doc). Tap a slot → `pending`.
- **State: `pending`** — `PendingState`: "Awaiting landlord" badge, card showing proposed visit time, supporting copy. Auto-resolves (§4) → `confirmed`.
- **State: `confirmed`** — `Badge variant="green"` "Confirmed", card with visit time + `Avatar` + landlord name ("Confirmed by Ahmed Al Farsi"). Toast fires on entry: "Proposed time accepted". Primary CTA: **Continue to Offer**.

### 6.2 Offer
- **State: `compose`** — offer amount input (pre-filled with the asking price — see content doc for the negotiation numbers), payment-type note ("Pay monthly via Keyper" — no toggle needed since cheques are out of scope, but you can show it as a static labeled row rather than a working `SegmentedControl` to avoid implying a choice that isn't wired up). Primary CTA: **Send Offer** → `pending`.
- **State: `pending`** — `PendingState` card showing the submitted amount. Auto-resolves → `countered`.
- **State: `countered`** — `Badge variant="outline"` "Countered by Ahmed Al Farsi", card comparing "Your offer" vs. "Landlord's counter" (mono figures), one line of copy. Primary CTA: **Accept Counter** → `accepted`. **Do not show a "counter back" button** — out of scope for this happy path, and a visible dead-end control is worse than not having it in a live demo.
- **State: `accepted`** — `Badge variant="green"` "Accepted", card with final agreed amount. Primary CTA: **Continue to Contract**.

### 6.3 Contract
- Single state — no pending/variant needed (landlord already drafted it off-screen, tenant is just reviewing). Two `SubHeading` + `Card` blocks: "Terms" (rent, duration, dates, payment schedule) and "Price breakdown" (rent, security deposit, agency fee, living fee, total due before move-in — three-tier type scale per polish spec §7: labels 12px, line values 14px, total 20-24px mono). Then a `SubHeading` "Key clauses" with 2-3 plain-text lines. Primary CTA: **Accept Contract** → advances to Fee step.

### 6.4 Living Fee (payment)
- **State: `checkout`** — non-refundable disclosure banner, `Card` with fee calculation (rent × 2% = total, "charged regardless of payment method"), `SegmentedControl` (Card / Tabby — this one *is* a real working toggle since both are plausible payment choices, unlike the offer step), conditional input fields (card number/expiry/CVC, or Tabby's split-payment preview), a checkbox ("I agree to the Terms & Conditions") that gates the CTA. Primary CTA: **Pay AED [total]** (disabled until checkbox checked) → brief "Processing payment" spinner (§4 pattern, ~1.5s) → `paid`.
- **State: `paid`** — `ConfirmationPanel` (coral tint): hero figure "AED [total] paid", supporting note "Marina Gate, Unit 1204 has been **removed from active listings**." Primary CTA: **Continue to Documents**.

### 6.5 Documents
- Checklist of 3 rows (EID, Passport, Visa), each starting "Not uploaded". Tapping a row's upload affordance (icon button, doesn't need a real file picker — just a click target) moves that row through `Uploading…` (very brief, ~600ms) → `Verifying` (`Badge outline`) → `Verified` (`Badge green`) after the standard simulated wait. Once all 3 are `Verified`, the primary CTA appears: **Continue to Ejari**.
- Include the landlord-side progress indicator from the original prototype ("Landlord's progress" bar) as a static/pre-filled bar (e.g. already 100% or "2 of 2 uploaded") — it's their side, not interactive here, just context.

### 6.6 Ejari (mocked)
- Vertical tracker, 5 labeled steps (Generating → Ready for review → Sent for e-signature → Both parties signed → Filed), dot-and-line style matching the HTML prototype.
- On entry, auto-advance dots 1→2→3 on the standard timer (§4), landing on "Sent for e-signature".
- At that point, show a `Card`: "Complete your signature in the REST app" + one button **I've Signed via REST** — this is the one deliberate user action in an otherwise automatic flow, so the demo doesn't feel like 8 seconds of pure passive waiting. Tapping it auto-advances dots 4→5 (short timer) to `filed`.
- **State: `filed`** — `ConfirmationPanel` (teal tint): "Ejari filed" badge + hero, supporting line. Primary CTA: **Continue to Deposit**.

### 6.7 Deposit
- **State: `awaiting`** — `Card` with landlord's bank details (account name, bank, IBAN — mono for the IBAN), "Deposit due: AED [amount]" row. Primary CTA: **I've Sent the Transfer** → `pendingConfirmation` (§4 pattern, "Awaiting landlord confirmation").
- **State: `confirmed`** — `ConfirmationPanel` (teal tint): "Receipt confirmed by landlord" badge + hero "AED [amount] received". Primary CTA: **Continue to Rent Setup**.

### 6.8 Rent Setup (pay monthly)
- `Card`: "Rent payment via Keyper" + one line explaining the handoff. Primary CTA: **Connect Keyper Account** → simulated OAuth-style wait ("Connecting to Keyper…", §4 pattern) → `connected`.
- **State: `connected`** — `ConfirmationPanel` (teal tint): "Keyper connected" badge + hero (e.g. first payment date/amount). Primary CTA: **Continue to Move-In**.

### 6.9 Move-In → Marketplace
- **Move-in confirmed:** `ConfirmationPanel` using the **sun tint** (reserved for this one biggest moment, per `DESIGN_SYSTEM.md` and the polish spec) — "You're all set", move-in date, hero treatment (Barlow Condensed, bigger than the other panels — this is the demo's emotional peak). Below it, a `ChecklistRow` recap: fee paid, Ejari filed, deposit confirmed, Keyper connected — all pre-checked (teal dots). Primary CTA: **Explore Move-In Services** → Marketplace.
- **Marketplace — browse:** 2×2 `CategoryTile` grid (Moving / Internet / Deep Clean / Regular Clean). Tapping one reveals a `Card` below with the provider, a `Badge variant="trust"` "Livingin rate", price, and **Add to Cart**. Tapping it fires a `Toast` ("Added to cart") and reveals/updates a **View Cart** affordance.
- **Marketplace — cart:** line item(s), total. Primary CTA: **Checkout** → brief processing (§4) → `confirmed`.
- **Marketplace — confirmed (final screen):** `ConfirmationPanel`: "Order confirmed" + total paid + "Your providers will be in touch to schedule." No further CTA — optionally a subtle **Restart Demo** here as the natural loop point.

---

## 7. Repo, metadata, hosting

- **New git repo** (e.g. `livingin-purchase-demo`), separate from `Livingin.ae`. Doesn't need to live in the same folder on disk, doesn't need to share a GitHub org if you don't want it to.
- **Keep it out of search:** add a `<meta name="robots" content="noindex, nofollow">` tag in `index.html`, and a minimal `robots.txt` at the project root disallowing everything. Simple, framework-agnostic, no Next.js-specific metadata API needed since this isn't Next.
- **Deploy as its own Vercel (or Netlify) project** — new project, new URL, connected to this new repo. Vite static output deploys as a static site, nothing exotic needed on the hosting side. This gives you a real, hosted, shareable URL that's fully decoupled from Livingin.ae's production deploys — nobody can break the live site by touching this repo, and nobody can break this demo by touching the live site.

---

## 8. Build order (fastest path to a demoable state)

If time is tight, build in this order — each stage is independently demoable, so you can stop anywhere and still have something to show:

0. Scaffold the repo (`npm create vite@latest`), install dependencies, wire up `tailwind.config.ts` with §2.1's tokens, install the three `@fontsource` packages, confirm the fonts actually render (this is the step most likely to eat unplanned time — verify it early, not at hour 10).
1. `AppShell` + `StepHeader` (full-viewport layout, safe-area padding, back button, title, progress bar — no drawn status bar or home indicator, see §3) — no step content yet, or the real Appointment screen if you're ready for it. **Never a "Step: X / Substep: Y" placeholder — see §6.** Proves the layout and typography fixes look right on an actual phone, not just in a screenshot.
2. Build the Appointment screen for real (§6.1, full content), THEN wire up the state machine + step transitions (framer-motion) around that one working screen before moving on — confirms the pattern end-to-end on one screen rather than building ten empty shells first.
3. Offer → Contract → Fee (the negotiation + payment spine — this is the part most likely to get real scrutiny in a demo).
4. Documents → Ejari → Deposit → Rent Setup (the "paperwork" middle, mechanically similar to each other once the `PendingState`/`ConfirmationPanel` components exist).
5. Move-In → Marketplace (the payoff ending).
6. Polish pass: toasts, skip-to-continue on waits, restart control, debug step-jump behind `?debug=1`.
