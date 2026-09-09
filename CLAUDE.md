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
