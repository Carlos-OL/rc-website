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

| # | Tour row | Length | Clip | Where it goes |
|---|---|---|---|---|
| 1 | 01 · Detect | ~8 s | Firefox container fan-out: one click, four account tabs open. Two test accounts are enough to film it. | Media column of row 01, below `ext/15-auto-open.png` |
| 2 | 02 · Decide | ~15 s | Reading the panel on a live item: spot → item value → Costco's markup → history → payouts. Filmable any day, no restock needed. | Media column of row 02, below `ext/02-category-grid.png` |
| 3 | 03 · Buy | ~12 s | Quantity → Costco checkout: tap 4, total updates, checkout loads. The single most convincing loop on the page. | Media column of row 03, below the screenshot tiles |

### 2. Cart-guard reshoot (last soft screenshot)

`extension/assets/ext/panel-cart-guard.png` is still a 492×256, 2× upscale of `05-cart-guard.png`.
Needs a retina capture of the cart-guard state (one-click checkout held back until the cart is
cleared). Everything else on the page is native resolution now.

### 3. Copy numbers to re-verify before a traffic push

Not assets, but stale-prone: "636 gold restocks in July 2026" (stat strip + `#get` section),
"7s average", "3s faster", "5s+ saved".

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
