-- Website tracking: one row per page visit or file download on restockbotalerts.com landing pages
-- (first user: the Chicago Points Travel Festival 2026 slides page, campaign 'ptf2026').
-- Reusable: a new talk, lead magnet or download page is a new `campaign` value, no schema change.
-- Written only by the website-track edge function (service role). No IPs, no user agents, no personal data.
create table if not exists public.website_events (
    id          bigint generated always as identity primary key,
    created_at  timestamptz not null default now(),
    campaign    text not null check (campaign ~ '^[a-z0-9_-]{1,40}$'),      -- e.g. 'ptf2026'
    event       text not null check (event in ('visit', 'download')),
    page        text not null check (char_length(page) <= 200),          -- path only, e.g. '/ptf2026/'
    asset       text check (asset ~ '^[a-z0-9_-]{1,40}$'),                -- downloads only, e.g. 'slides'
    via         text not null check (via in ('page', 'link', 'fallback')),
    src         text not null default 'direct' check (src ~ '^[a-z0-9_-]{1,32}$'), -- 'qr', 'direct', 'email'...
    device      text not null check (device in ('mobile', 'desktop')),
    is_test     boolean not null default false,
    check ((event = 'download') = (asset is not null))
);

create index if not exists website_events_campaign_created_idx
    on public.website_events (campaign, created_at);

comment on table public.website_events is
    'Visits and downloads on restockbotalerts.com tracked pages. Written by the website-track edge function only.';
comment on column public.website_events.via is
    'page = page-load visit; link = tracked download redirect; fallback = direct file link on the page.';

-- Locked down: RLS on with no policies, and no grants to the public API roles.
alter table public.website_events enable row level security;
revoke all on public.website_events from anon, authenticated;
