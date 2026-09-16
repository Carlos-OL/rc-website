---
metadata:
  last_updated: "2026-09-15T20:55:00-06:00"
---

# rc-website

## Do-Work Numbering & Cross-Repo Provenance (MANDATORY — Carlos, 2026-09-03)

1. **URs and REQs are numbered per repo, sequentially.** The next number is the highest existing
   number in THIS repo's `do-work/` — the **queue, `working/`, AND `archive/` (including
   `archive/UR-*/`)** — plus one. **Always scan the archive.** A later UR/REQ is often finished and
   archived before an earlier one is started, so looking only at pending/open work produces
   duplicate numbers. Re-check immediately before writing the file; two sessions may be capturing
   at once.
2. **Never create a UR or REQ in another repo for cross-repo work.** The request lives in the repo
   where the session started. No mirror REQs, no shared ledger, no cross-repo number allocation.
3. **Provenance lives in the commit message of the implementing repo.** When work for a REQ lands
   in a different repo, that commit message must cite the origin, e.g.
   `[from Costco Orders Dashboard v2 UR-136 / REQ-346] <summary>`. The originating REQ file
   records the implementing repo's commit hash on completion.
4. **The next number is always the HIGHEST existing number + 1 — never the lowest unused number.**
   Gaps are never back-filled: a number missing in this repo is usually a live REQ in another repo
   (all four shared one interleaved sequence until 2026-09-03), so reusing it collides in commit
   tags and cross-references. Archived or committed REQs are never renumbered.

This rule is identical in all four linked repos: Costco_Bot, Costco Orders Dashboard v2,
costco-extension, and the RC website.

## Analytics Snippet on Every New Page (MANDATORY — Carlos, 2026-09-09)

**Every new page added to this site ships with the Cloudflare Web Analytics beacon.** No
exceptions, no reminders needed: a page without it is invisible in traffic reporting, and
backfilling means the launch-window numbers are lost for good.

Paste this immediately before the closing `</body>` tag:

```html
    <!-- Cloudflare Web Analytics: cookieless page views. Token is a public site identifier,
         not a secret. Stats live at Cloudflare dashboard > Analytics & Logs > Web Analytics. -->
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "e79a71574679418ea506fba0b05a0014"}'></script>
```

- **Applies to:** every page served to visitors — new blog posts under `blog/`, landing pages,
  legal pages, tutorials.
- **Does not apply to:** dev and design scratch files that are never linked publicly
  (`index-dev*.html`, `design-*.html`, `index copy.html`, `design_handoff_*/`).
- **The token is the same on every page** and is safe to commit. It identifies the site to
  Cloudflare; it grants nothing and is public by design in client-side HTML.
- Stats break down by path, so each post shows as its own line without any extra setup.
- When adding a page, also add it to `sitemap.xml`.

## Stripe Pricing Table Feature Lists (MANDATORY — Carlos, 2026-09-15)

**The Silver and Gold bullet lists under the pricing table are not in this repo.** They are
`marketing_features` on live Stripe products, rendered at runtime by `<stripe-pricing-table>` in
`index.html`. Everything about them, product IDs, the live lists, and how to write them, lives in
`STRIPE-PRICING-FEATURES.md` at the repo root. **Read that file instead of re-deriving the lists
from the Stripe API.** Re-deriving them costs a multi-repo research pass every time and is the
exact waste this rule exists to prevent.

⚠️ **That file is gitignored and local-only, on purpose. This repo is PUBLIC.** The ledger holds
subscriber counts, private backend `file:line` references and notes on which tier gates are
enforced versus not. None of it is a credential; all of it is business information that must not
be world-readable. **Never commit it, never move its contents into a tracked file, and never paste
its internals into a commit message.** If it is missing (fresh clone, another machine), do not
recreate it from guesswork: read the current lists from Stripe with `stripe_api_read` /
`GetProducts` and ask Carlos for the rest.

**Whenever you change the homepage (`index.html`) or the extension page (`extension/index.html`)
in a way that touches what the product can do, you must, in the same session:**

1. **Ask Carlos** whether the Stripe feature list should be updated too. Ask in one line, naming
   the specific bullet you would add or reword. Do not ask a vague "should we update Stripe?".
2. **Log it in `STRIPE-PRICING-FEATURES.md` under "Pending updates" either way.** The log is not
   conditional on him saying yes. A "not now" still gets a row, so the tally survives until he
   wants to publish. This is the whole point: he should never have to reconstruct what changed.
3. **If he says yes, make the change yourself.** Claude can write `marketing_features` directly
   through the Stripe MCP (`stripe_api_write` / `PostProductsId`), so Carlos does not have to
   hand-edit the pricing table.
   **The write applies immediately.** Measured 2026-09-15: a product update on this account did
   NOT trigger the tool's human-confirmation step, despite the tool description implying it might.
   Do not tell Carlos an approval link is coming, and do not treat the approval flow as a safety
   net. His spoken "yes" in the conversation is the only gate, which is why the rule below is
   absolute. After applying, verify on the live page rather than trusting the API echo, then update
   the "Current live lists" snapshot and its capture date in the (untracked) ledger and clear the
   pending row.

Applies to feature, capability, tier, limit, and pricing copy. Does not apply to purely visual
changes: a new screenshot, a carousel reorder, styling, or a typo fix with no capability claim.

**Never write to Stripe without explicit approval from Carlos in the conversation.** It is a live
payments account and the pricing table is public. Reading is always fine.
