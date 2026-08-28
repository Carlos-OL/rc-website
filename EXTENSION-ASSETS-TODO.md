# Extension landing page — asset & follow-up tracker

Last updated 2026-08-26 (evening). Split into what's still OWED and what's DONE, so the
missing pieces are obvious at a glance.

---

## ⏳ STILL OWED

### 1. Videos to film (3)

All three: H.264 MP4, 8–15 s, no audio, `<video autoplay muted loop playsinline poster="…">`.
The original dashed-placeholder markup is in the handoff bundle
(`design_handoff_extension_landing/index.html`) and in git history if you want to restore a slot.
Each video also needs a poster frame (first-frame PNG/WebP works).

All three tour videos are DONE — no videos owed.

DONE: video 1 (container fan-out, 11.7 s) shipped 2026-08-27 as
`extension/assets/ext/video-container-fanout.mp4` + poster, in tour row 01. Filmed with the
N Fresno decoy store; source raw in `design_handoff_extension_landing/raw/`.
DONE: video 2 (product-page panel / Decide, 12.8 s) shipped 2026-08-28 as
`extension/assets/ext/video-product-panel.mp4` + poster, in tour row 02. Trimmed from the 42 s
"Product Page Panel.mp4" raw take (zoomed-in Decide arc only, 3.4s to 16.2s: limit box, premium,
history, payouts); the desktop bookends with browser chrome were cut, removing third-party
toolbar icons. Carlos approved showing buyer names and the Stockton / 95210 store on 2026-08-28.
Full take kept in raw (settings + popup tour, potential future asset).
DONE: video 3 (quantity → checkout / Buy, 14.95 s) staged 2026-08-28 as
`extension/assets/ext/video-qty-checkout.mp4` + poster, in tour row 03. Second take
("qty>checkout.mp4" raw): filmed with a frozen VIRTUAL card saved on both sides, so all card
data (last4 1539, exp 08/30, CVV 500) shows uncensored. Masks are pixelation in the ffmpeg
pass, Carlos's name and address only (cardholder field + billing block, across three zoom
states including the mid-take card-form reflow). Burned-in stopwatch starts at the quantity
click and freezes green at 4.1s when Costco's checkout renders, proving the sub-7s claim
on-screen in an uncut take. Arc: cart guard clear, quantity 4, PM acknowledgment, checkout,
vault recognizes the card and pastes the code. First take (Screen Studio white-slab mask)
superseded; raw kept. Timer shows 0.0s from the first frame, starts counting at Carlos's
actual quantity press (t=2.55 in the raw take, tuned with him), and freezes at 7.9s covering
the full run including the cart-guard clear. DONE 2026-08-28 per Carlos: the sitewide speed
claim moved from 7s to 8s everywhere (stat strip, Buy row headline and body, spec table,
two-clicks FAQ + its JSON-LD copy, homepage extension blurb). The video's 7.9s counter now
sits under the claim.
Pipeline for the rest: Screen Studio export MP4/4K/60fps/Studio → raw folder → Claude
compresses (1600w, 30fps, crf 23, faststart, muted) + poster + frame-by-frame privacy check.

### 2. Copy numbers to re-verify before a traffic push

Not assets, but stale-prone: "636 gold restocks in July 2026" (stat strip + `#get` section),
"8s average" (moved from 7s on 2026-08-28), "3s faster", "5s+ saved".

### Where to drop raw captures

Put raw captures (and video takes) in `design_handoff_extension_landing/raw/` — untracked, never
deployed; Claude crops from there. Screenshots at 2× (retina) PNG.

---

## ✅ DONE

### Screenshot reshoots (2026-08-26)

- `panel-market-data.png` — re-cut at native retina from the in-stock product-page capture.
- `panel-quantity.png` — re-cut from the same capture.
- `panel-limit-tracker.png` — NEW, from the same capture: the expanded daily-limit box
  ("8 of 8 units left today… you can order this again now"), added to tour row 03 Buy.
- `panel-fewer-left.png` — was already native retina, no reshoot needed.
- `panel-cart-guard.png` — re-cut at native retina from the cart-guard-state capture
  (2026-08-26 evening). Every screenshot on the page is now native resolution.
- Buy row media rearranged: quantity + cart-guard tiled 2-up, fewer-left + limit-tracker
  height-matched side by side; lightbox handles detail.

### Dashboard captures (2026-08-26)

- Watch-list capture → `extension/assets/dash/watchlist.webp`, replaced `dash/alert.webp` in
  tour row 01.
- Restock-feed capture (Payout/Restock Match chips) → `extension/assets/dash/restocks.webp`,
  added to row 01 with its own caption (sidebar cropped out — it showed admin-only menu items).

### Recrops for half-sliced screenshots (2026-08-26)

- Hero `01-market-data-hero.png` → 970×800 (half-cropped bar photo removed, panel ~30% larger);
  original wide version preserved as `og-hero.png` for the social share card.
- `02-category-grid.png` → 1045×800 (sliced filter sidebar removed).
- `03-card-vault.png` → 1074×800 (sliced sidebar numbers removed).
- `08-export-orders-dialog.png` → 930×620 spliced/cropped to match the dashboard image's ratio.
- `07-checkout-assist.png` → 1074×800 via whitespace splice, matching the vault image.

### Homepage share card (2026-08-26)

`assets/og-card.png` (1200×630, gold-ringed logo + tagline on the dark theme) generated and
wired to `og:image` with a `summary_large_image` Twitter card.

### Homepage revision (2026-08-26 — all shipped)

- Extension feature block (#3, "Learn more about the extension →"), Extension nav link.
- "From Restock to Checkout in Seconds" differentiator card (diff grid merged to one 10-card grid).
- Comparison rows: browser extension (links to `/extension/#spec`) + multi-retailer & rewards.
- FAQ: 3 rewrites + new "Does the dashboard only track Costco?"; FAQPage JSON-LD (9 Q&As).
- Copy touch-ups: hero subtext, security card, How It Works step 2, Mobile-First; Tampermonkey —
  turned out to have zero homepage mentions; the stale "export script" wording lived in
  privacy.html §9 and was rewritten instead.
- Head SEO: meta description, canonical, OG set, Organization/WebSite JSON-LD.
- Multi-retailer + rewards copy in the Profitability Dashboard block (Shop Cards / gift cards
  funding attribution, Gold-tier disclaimer extended).
- © 2026 footers (3 pages), "Nearly 3 years", survey asterisks removed, terms §2 refreshed,
  robots.txt hides dev/copy pages.
