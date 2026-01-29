# Gold Restock Bot Website Improvement Plan

**Last Updated:** January 23, 2026  
**Status:** In Progress  
**Website:** restockbotalerts.com

---

## Executive Summary

This document outlines actionable improvements to increase conversion rates on the Gold Restock Bot landing page. The analysis was conducted from the perspective of a potential customer evaluating whether to subscribe.

**Overall Assessment:** The website has a strong foundation with clear value proposition and professional design. However, gaps in messaging clarity and unanswered customer questions may create friction before signup.

---

## Priority Matrix

| Priority | Impact | Effort |
|----------|--------|--------|
| 🔴 High | High conversion impact | Usually low effort |
| 🟡 Medium | Moderate impact | Medium effort |
| 🟢 Low | Polish/optimization | Variable effort |

---

## 🔴 High Priority Issues

### [x] 1. Brand Confusion (Tremscol vs Gold Restock Bot)

**Problem:** The page `<title>` says "Tremscol – Costco Gold Command Center" but the logo/nav says "Gold Restock Bot." Visitors may wonder if they're on the correct site.

**Location:** `index.html` line 7

**Current:**
```html
<title>Tremscol – Costco Gold Command Center</title>
```

**Recommended:**
```html
<title>Gold Restock Bot – The Costco Gold Command Center</title>
```

**Impact:** Reduces confusion, improves brand recognition, better SEO for "Gold Restock Bot" searches.

---

### [x] 2. Slack Dependency Is Unclear

**Problem:** Slack is mentioned throughout (community, authentication, alerts) but visitors don't know if it's required or optional. Non-Slack users may hesitate to subscribe.

**Location:** FAQ section (line 1306+)

**Recommended:** Add a new FAQ item:

```html
<div class="faq-item">
    <button class="faq-question">Do I need Slack to use Gold Restock Bot?</button>
    <div class="faq-answer">
        <p>Yes. All alerts, tools, and community features are delivered through our private Slack workspace. 
        Joining takes under 2 minutes and works on desktop, mobile, or web browser. No prior Slack experience needed.</p>
    </div>
</div>
```

---

### [x] 3. Geographic Scope Never Stated

**Problem:** The comparison table says "any zipcode nationwide" which implies US-only, but this is never confirmed. International visitors may assume it works for their country.

**Location:** Hero section or FAQ

**Option A - Hero subtext (line 920-923):**
Add to subtext: "Currently serving all 50 US states."

**Option B - New FAQ item:**
```html
<div class="faq-item">
    <button class="faq-question">Is Gold Restock Bot available in Canada or other countries?</button>
    <div class="faq-answer">
        <p>Not yet. Gold Restock Bot currently supports US Costco locations only. 
        We're exploring international expansion — join our Slack to stay updated.</p>
    </div>
</div>
```

---

### [x] 4. Mobile Experience Not Mentioned

**Problem:** In-store hunting is inherently mobile, yet the website doesn't mention mobile apps, PWA, or mobile-optimized experience. This is a major missed opportunity.

**Location:** "Super Simple UI" feature section (line 1048-1063) or new dedicated section

**Recommended copy addition:**
```
Mobile-ready for gold runs — check inventory, receive instant push notifications, 
and access all tools right from your phone. No app download required.
```

**Also consider:** Adding a mobile screenshot to one of the feature sections.

---

## 🟡 Medium Priority Issues

### [~] 5. Target Audience Unclear — SKIPPED

**Original Problem:** The page never explicitly states who this is designed for.

**Decision:** Intentionally skipped. The product is for *anyone* buying gold at Costco — stackers, travel hackers, hobbyists, and resellers alike. Adding a qualifier would either exclude some users or add more text for visitors to parse without clear benefit. The current hero copy already speaks to the universal need ("never miss an opportunity") rather than a specific persona.

---

### [x] 6. Trial Specifics Vague

**Problem:** Silver tier shows "Start Trial" but Gold says "Subscribe." Visitors wonder:
- Can I trial Gold features?
- What's included in the trial?
- Does it auto-charge after the trial?

**Location:** FAQ section

**Recommended:** Add FAQ item:
```html
<div class="faq-item">
    <button class="faq-question">Is there a free trial?</button>
    <div class="faq-answer">
        <p>Yes! The Silver tier includes a free trial so you can experience the core features risk-free. 
        After the trial ends, you can continue with Silver or upgrade to Gold for the full suite. Cancel anytime.</p>
    </div>
</div>
```

---

### [x] 7. "How It Works" Too Vague

**Problem:** Current steps are generic ("Set Preferences") and don't tell users what to expect.

**Location:** How It Works section (line 1223-1243)

**Current Step 2:**
```html
<h3><span class="how-num">2.</span> Join Slack & Set Preferences</h3>
<p>No technical setup required</p>
```

**Recommended Step 2:**
```html
<h3><span class="how-num">2.</span> Connect & Configure</h3>
<p>Join our Slack workspace, set your zip code for in-store alerts, and customize your tracking list — all in under 2 minutes.</p>
```

---

### [x] 8. No Risk Reversal / Money-Back Messaging

**Problem:** "Cancel anytime" exists in FAQ but isn't prominent. No money-back guarantee messaging.

**Location:** Near pricing section or as a trust element

**Recommended:** Add a trust badge or line near CTA buttons:
```html
<p class="risk-free-text" style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem;">
    ✓ Try free · ✓ Cancel anytime with one click · ✓ No long-term commitment
</p>
```

---

### [ ] 9. Testimonials Could Be Stronger

**Problem:** Labels like "Subscriber" and "Slack User" feel anonymous and less credible.

**Location:** Testimonials section (line 1271-1303)

**Recommended changes:**
- Replace "Subscriber" → "J.T., California" or "Member since 2023"
- Replace "Long-time User" → "Alex M., 18-month member"
- Add at least one testimonial with specific results: "Made back my subscription cost in the first week"

---

## 🟢 Low Priority Issues

### [~] 10. Results Section Buried — SKIPPED

**Original Problem:** The "Results From Our Users" section appears after pricing. Stats should prime visitors before they see the price.

**Decision:** Intentionally skipped. The Trust Strip directly below the hero already displays key social proof stats (58% bought via alerts, 52% make $1,000+/month, 50% save 3+ hours). This addresses the original intent — visitors see compelling results before reaching the pricing section. Moving the Results section would be redundant.

---

### [ ] 11. Missing Final CTA

**Problem:** After the FAQ, the page just ends with the footer. No final conversion push.

**Location:** After FAQ section, before footer

**Recommended:** Add a closing CTA section:
```html
<section class="final-cta-section" style="padding: 3rem 1.5rem; text-align: center; background: var(--bg-card);">
    <h2 class="section-title">Ready to Start Tracking?</h2>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
        Join hundreds of active gold buyers already using Gold Restock Bot.
    </p>
    <a href="#pricing" class="cta-btn">Start Tracking</a>
</section>
```

---

### [x] 12. Missing Alert Screenshot — COMPLETE

All screenshots have been updated to the new PWA/web UI.

---

### [~] 13. Add "Support" to Navigation — SKIPPED

**Decision:** Keeping support in footer as-is. No change needed.

---

## Additional Unanswered Customer Questions

These questions were identified during analysis. Consider addressing them via copy updates or new FAQ items:

- [ ] How many people are in the Slack community? (Social proof opportunity)
- [ ] How soon after subscribing do I get my first alert?
- [ ] What's the difference between Silver and Gold tiers? (Make visible without scrolling)
- [ ] What products beyond gold does this track? (Silver, platinum mentioned in features)
- [ ] Will you add new buyers to the payout comparison tool?

---

## Implementation Checklist

### Phase 1: Quick Wins (< 1 hour total)
- [x] Fix page title (Tremscol → Gold Restock Bot)
- [x] Add Slack requirement FAQ
- [x] Add US-only clarification
- [x] Update "How It Works" Step 2 copy

### Phase 2: Content Updates (2-3 hours)
- [x] Add mobile-friendly messaging (Mobile-First Experience section + hero teaser)
- [ ] Add target audience qualifier
- [x] Add trial FAQ
- [x] Add risk-free messaging near CTAs
- [x] ~~Move Results section above pricing~~ (removed — keeping current structure)

### Phase 3: Asset Creation (4+ hours)
- [x] Create/add mobile UI screenshot (Restocks + push notifications.webp)
- [x] ~~Create Slack alert notification mockup~~ (removed — all images now from PWA)
- [ ] Update testimonials with names/specifics
- [x] Add final CTA section
- [x] Add profitability dashboard images carousel

### Phase 4: New Feature Messaging (from discussion)
- [ ] **Live In-Store Searches** — Highlight that searches hit Costco's backend live (not cached). Add to In-Store Checker section or comparison table
- [ ] **Homegrown Infrastructure** — Messaging about owning all core code, no third-party dependencies for key features. Add to differentiators section
- [ ] **Gold + Silver Alerts** — Highlight that we track both gold and silver restocks
- [x] **Price Mistakes** — Added Gold-only callout to Online Restock Tracking section

### Stripe / Backend Updates
- [ ] Update Stripe pricing table to add "Mobile Dashboard (Early Access)" to Gold tier
- [ ] Update Stripe pricing table to add "Profitability Analytics (Early Access)" to Gold tier

### Post-Beta Launch
- [ ] Update all "Gold Early Access" badges to "Gold Only" once out of beta

### Image Updates (Ongoing)
- [ ] **Update all website images** — Replace remaining old screenshots with new PWA/web interface images

---

## Changelog

| Date | Changes Made | Items Completed |
|------|--------------|-----------------|
| 2026-01-23 | Initial analysis and plan created | — |
| 2026-01-23 | Fixed title, updated How It Works, added trial FAQ, added risk-free messaging, changed CTAs to "Start Your Free Trial", updated comparison table to say "any US zipcode" | #1, #3, #6, #7, #8 |
| 2026-01-24 | Added Mobile-First Experience section, Profitability Dashboard section with carousel, hero teaser, comparison table rows for mobile app and analytics | Mobile messaging, profitability dashboard |
| 2026-01-25 | Updated all "Gold" → "Precious Metals" terminology, added Stock Search carousel (3 images), Profit Calculator carousel (2 images), updated differentiators (All-in-One, Faster Alerts, Built for Buyers), hero subtext to "discovery, tracking, and profitability" with teal highlight, updated image links (Online Restocks, Buyer Payouts, Gold Alerts) | Terminology updates, carousels, differentiators |

---

*This document should be updated as improvements are implemented.*
