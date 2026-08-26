# Extension landing page — assets owed

Tracks media the `/extension/` page wants but doesn't have yet. The page shipped without them
on purpose; each item below says exactly where it goes back in.

## Videos to film (placeholders removed 2026-08-26)

All three: H.264 MP4, 8–15 s, no audio, `<video autoplay muted loop playsinline poster="…">`.
The original dashed-placeholder markup is in the handoff bundle
(`design_handoff_extension_landing/index.html`) and in git history if you want to restore a slot.

| # | Tour row | Length | Clip | Where it goes |
|---|---|---|---|---|
| 1 | 01 · Detect | ~8 s | Firefox container fan-out: one click, four account tabs open. Two test accounts are enough to film it. | Media column of row 01, below `ext/15-auto-open.png` |
| 2 | 02 · Decide | ~15 s | Reading the panel on a live item: spot → item value → Costco's markup → history → payouts. Filmable any day, no restock needed. | Media column of row 02, below `ext/02-category-grid.png` |
| 3 | 03 · Buy | ~12 s | Quantity → Costco checkout: tap 4, total updates, checkout loads. The single most convincing loop on the page. | Media column of row 03, below the 2-up fewer-left / cart-guard pair |

Each video also needs a poster frame (first-frame PNG/WebP works).

## Homepage share card (1200×630)

Design a proper Open Graph share image for the homepage — logo + tagline on the dark theme
background, 1200×630 PNG — and point `og:image` in `index.html` at it (currently the round
512px logo, which works but looks plain in link previews). Do during the homepage revision pass.

## Screenshots to reshoot (currently shipped soft)

Three crops are 2× upscales and noticeably softer than the rest. One 2× retina capture of a
**product** page with the panel open lets all three be re-cut at native resolution:

| File | Current state | Fix |
|---|---|---|
| `extension/assets/ext/panel-market-data.png` | 622×704, 2× upscale of a 311px region | Re-cut from a retina capture |
| `extension/assets/ext/panel-quantity.png` | 622×256, same upscale | Re-cut from the same capture |
| `extension/assets/ext/panel-cart-guard.png` | 492×256, 2× upscale of `05-cart-guard.png` | Re-cut from a retina capture of the cart-guard state |

Carlos will capture the panel open on a product page when items are next in stock (blocked
2026-08-26: nothing available). Done so far: watch-list capture delivered 2026-08-26, cropped to
`extension/assets/dash/watchlist.webp`, replacing `dash/alert.webp` in tour row 01.

`ext/panel-fewer-left.png` is already native retina — no reshoot needed.

## Where to drop raw captures

Put raw reshoot captures (and video takes) in `design_handoff_extension_landing/raw/` — it's
untracked, never deployed, and Claude will crop/resize from there. Capture screenshots at 2×
(retina) PNG, full product page with the panel open.

## Homepage follow-up (planned 2026-08-27, after the extension page ships)

- Add an extension block/section to the homepage as its own feature block, linking to `/extension/`
- Add "Extension" to the homepage nav
- Remove all Tampermonkey script mentions from the homepage
- Fix the homepage FAQ answer "No installation needed. Everything runs directly through Slack and
  the Gold Restock Bot platform." — it contradicts the extension
- Consider a homepage `<head>` SEO pass: it has no meta description, canonical, or Open Graph tags

## Copy numbers to re-verify before a traffic push

Not assets, but stale-prone: "636 gold restocks in July 2026" (stat strip + `#get` section),
"7s average", "3s faster", "5s+ saved".
