// website-track: visit/download logging and private stats for tracked pages on restockbotalerts.com.
// Deployed to Supabase project nzcbrnvrutvacaaxypzb with verify_jwt = false (pages call it anonymously).
// Writes public.website_events. To track a new page or file, add it to CAMPAIGNS and redeploy.
//
// Routes:
//   GET  /website-track/download?c=<campaign>&a=<asset>&src=<src>&test=0|1  log, then 302 to the file
//   POST /website-track/event  {campaign, event, page, asset?, src, test}      sendBeacon: visit or fallback download
//   POST /website-track/stats  {password, campaign?}                          totals, by day, by source
//
// Privacy: the User-Agent is read only to pick mobile/desktop and is never stored. No IPs, no personal data.

import { createClient } from "npm:@supabase/supabase-js@2";

// Allow-list: download redirects can only go to these URLs, so the endpoint is not an open redirect.
const CAMPAIGNS: Record<string, { page: string; assets: Record<string, string> }> = {
  ptf2026: {
    page: "/ptf2026/",
    assets: { slides: "https://restockbotalerts.com/ptf2026/slides.pdf" },
  },
};

const TIMEZONE = "America/Chicago";
const SLUG = /^[a-z0-9_-]{1,40}$/;
const ALLOWED_ORIGINS = new Set([
  "https://restockbotalerts.com",
  "http://localhost:8123",
  "http://127.0.0.1:8123",
]);

const db = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

type EventRow = {
  campaign: string;
  event: "visit" | "download";
  page: string;
  asset: string | null;
  via: "page" | "link" | "fallback";
  src: string;
  device: "mobile" | "desktop";
  is_test: boolean;
};

/**
 * Classify a request as mobile or desktop from its User-Agent. The UA itself is discarded.
 *
 * Args:
 *     req (Request): Incoming request.
 *
 * Returns:
 *     "mobile" | "desktop": Rough device type (iPadOS Safari reports a desktop UA and counts as desktop).
 *
 * Called by: handleDownload(), handleEvent().
 */
function deviceOf(req: Request): "mobile" | "desktop" {
  const ua = req.headers.get("user-agent") ?? "";
  return /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "mobile" : "desktop";
}

/**
 * Normalize a traffic-source tag ("qr", "email", ...). Anything unexpected becomes "direct".
 *
 * Args:
 *     v (unknown): Raw ?src value.
 *
 * Returns:
 *     string: Lowercase slug of at most 32 chars, or "direct".
 *
 * Called by: handleDownload(), handleEvent().
 */
function srcOf(v: unknown): string {
  const s = String(v ?? "").toLowerCase();
  return /^[a-z0-9_-]{1,32}$/.test(s) ? s : "direct";
}

/**
 * Normalize a page path: path only (no query or fragment), capped at 200 chars.
 *
 * Args:
 *     v (unknown): Raw path from the page (location.pathname).
 *     fallback (string): Campaign's configured page, used when v is missing or malformed.
 *
 * Returns:
 *     string: A path starting with "/".
 *
 * Called by: handleEvent().
 */
function pageOf(v: unknown, fallback: string): string {
  const p = String(v ?? "").split(/[?#]/)[0];
  return p.startsWith("/") && p.length <= 200 ? p : fallback;
}

/**
 * Insert one event row without delaying the response. Failures are logged, never thrown.
 *
 * Args:
 *     row (EventRow): Event to store.
 *
 * Returns:
 *     void. Uses EdgeRuntime.waitUntil so the redirect/response goes out immediately.
 *
 * Called by: handleDownload(), handleEvent().
 * Calls: supabase-js insert into public.website_events.
 */
function logEvent(row: EventRow): void {
  const p = db.from("website_events").insert(row).then(({ error }) => {
    if (error) console.error("website_events insert failed:", error.message);
  });
  // deno-lint-ignore no-explicit-any
  const rt = (globalThis as any).EdgeRuntime;
  if (rt?.waitUntil) rt.waitUntil(p);
}

/**
 * CORS headers for the site and the local preview server.
 *
 * Args:
 *     req (Request): Incoming request; its Origin is echoed back only if allowed.
 *
 * Returns:
 *     Record<string, string>: Headers to merge into the response.
 *
 * Called by: handleEvent(), handleStats(), the OPTIONS branch.
 */
function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  return ALLOWED_ORIGINS.has(origin)
    ? {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      "Vary": "Origin",
    }
    : { "Vary": "Origin" };
}

/**
 * Log a download from a tracked button, then redirect to the file. Always redirects, even if logging fails.
 *
 * Args:
 *     req (Request): GET with ?c=<campaign>&a=<asset>, optional ?src= and ?test=1.
 *
 * Returns:
 *     Response: 302 to the allow-listed file (not cacheable, so every tap reaches this function);
 *     404 if the campaign/asset pair is unknown.
 *
 * Called by: router (Deno.serve).
 * Calls: logEvent(), deviceOf(), srcOf().
 */
function handleDownload(req: Request): Response {
  const q = new URL(req.url).searchParams;
  const campaign = q.get("c") ?? "";
  const asset = q.get("a") ?? "";
  const target = CAMPAIGNS[campaign]?.assets[asset];
  if (!target) return new Response("not found", { status: 404 });
  try {
    logEvent({
      campaign,
      event: "download",
      page: CAMPAIGNS[campaign].page,
      asset,
      via: "link",
      src: srcOf(q.get("src")),
      device: deviceOf(req),
      is_test: q.get("test") === "1",
    });
  } catch (e) {
    console.error("website-track download log error:", e);
  }
  return new Response(null, { status: 302, headers: { "Location": target, "Cache-Control": "no-store" } });
}

/**
 * Log a page visit or a fallback-link download sent by navigator.sendBeacon (text/plain JSON body).
 *
 * Args:
 *     req (Request): POST body {campaign, event: "visit"|"download", page, asset?, src, test}.
 *
 * Returns:
 *     Promise<Response>: 204 on success; 400 on a malformed body or unknown campaign/asset.
 *
 * Called by: router (Deno.serve).
 * Calls: logEvent(), deviceOf(), srcOf(), pageOf(), cors().
 */
async function handleEvent(req: Request): Promise<Response> {
  const bad = (why: string) => new Response(why, { status: 400, headers: cors(req) });
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(await req.text());
  } catch {
    return bad("bad body");
  }
  const campaign = String(b.campaign ?? "");
  const cfg = CAMPAIGNS[campaign];
  if (!cfg) return bad("unknown campaign");
  const event = b.event === "download" ? "download" : b.event === "visit" ? "visit" : null;
  if (!event) return bad("bad event");
  const asset = event === "download" ? String(b.asset ?? "") : null;
  if (asset !== null && !(asset in cfg.assets)) return bad("unknown asset");

  logEvent({
    campaign,
    event,
    page: pageOf(b.page, cfg.page),
    asset,
    via: event === "visit" ? "page" : "fallback",
    src: srcOf(b.src),
    device: deviceOf(req),
    is_test: b.test === "1" || b.test === true,
  });
  return new Response(null, { status: 204, headers: cors(req) });
}

/**
 * Constant-time string comparison, so response timing does not leak the password.
 *
 * Args:
 *     a (string): Supplied value.
 *     b (string): Expected value.
 *
 * Returns:
 *     boolean: True when equal.
 *
 * Called by: handleStats().
 */
function safeEqual(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

/**
 * Return one campaign's totals, by-day rows (Chicago time) and by-source rows, after checking the password.
 *
 * Args:
 *     req (Request): POST body {password, campaign?}. campaign defaults to the most recent one with events.
 *
 * Returns:
 *     Promise<Response>: 200 JSON {campaigns, campaign, timezone, totals, days[], sources[]};
 *     401 wrong password; 503 secret not set.
 *
 * Called by: router (Deno.serve).
 * Calls: safeEqual(), cors(), supabase-js selects on public.website_events.
 */
async function handleStats(req: Request): Promise<Response> {
  const headers = { ...cors(req), "Content-Type": "application/json", "Cache-Control": "no-store" };
  const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
  const secret = Deno.env.get("TRACKING_STATS_PASSWORD");
  if (!secret) return json(503, { error: "not configured" });

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(await req.text());
  } catch { /* falls through to 401 */ }
  if (!safeEqual(String(body.password ?? ""), secret)) return json(401, { error: "unauthorized" });

  // Campaign list: every configured campaign, newest config last.
  const campaigns = Object.keys(CAMPAIGNS);
  const requested = String(body.campaign ?? "");
  const campaign = SLUG.test(requested) && campaigns.includes(requested) ? requested : campaigns[campaigns.length - 1];

  const { data, error } = await db
    .from("website_events")
    .select("created_at, event, via, src, device, is_test")
    .eq("campaign", campaign)
    .order("created_at", { ascending: true })
    .limit(50000);
  if (error) return json(500, { error: error.message });

  const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }); // YYYY-MM-DD
  const blank = () => ({
    visits: 0, downloads: 0, downloads_mobile: 0, downloads_desktop: 0,
    downloads_fallback: 0, test_visits: 0, test_downloads: 0,
  });
  const days = new Map<string, ReturnType<typeof blank>>();
  const sources = new Map<string, { visits: number; downloads: number }>();
  const totals = blank();

  for (const r of data ?? []) {
    const day = dayFmt.format(new Date(r.created_at));
    if (!days.has(day)) days.set(day, blank());
    for (const t of [days.get(day)!, totals]) {
      if (r.is_test) {
        if (r.event === "visit") t.test_visits++;
        else t.test_downloads++;
      } else if (r.event === "visit") {
        t.visits++;
      } else {
        t.downloads++;
        if (r.device === "mobile") t.downloads_mobile++;
        else t.downloads_desktop++;
        if (r.via === "fallback") t.downloads_fallback++;
      }
    }
    if (!r.is_test) {
      if (!sources.has(r.src)) sources.set(r.src, { visits: 0, downloads: 0 });
      sources.get(r.src)![r.event === "visit" ? "visits" : "downloads"]++;
    }
  }

  return json(200, {
    campaigns,
    campaign,
    timezone: TIMEZONE,
    totals,
    days: [...days.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([day, c]) => ({ day, ...c })),
    sources: [...sources.entries()].sort((a, b) => b[1].visits - a[1].visits).map(([src, c]) => ({ src, ...c })),
  });
}

Deno.serve(async (req) => {
  const path = new URL(req.url).pathname;
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
  if (req.method === "GET" && path.endsWith("/download")) return handleDownload(req);
  if (req.method === "POST" && path.endsWith("/event")) return await handleEvent(req);
  if (req.method === "POST" && path.endsWith("/stats")) return await handleStats(req);
  return new Response("not found", { status: 404 });
});
