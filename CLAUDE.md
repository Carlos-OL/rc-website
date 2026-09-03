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
