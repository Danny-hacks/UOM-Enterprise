# WordPress + Elementor build notes

Quick reference for converting the approved demo (`demo/`) to a native Elementor site. Source of truth for content: `build/data.js`, `build/news.js`. Tokens: `:root` in `demo/assets/css/main.css`.

## 1. Global setup
- **Colours:** navy `#0a1142`, crimson `#a3162a` (primary action), gold `#f7b500` (accent), gold-tint `#fff4cc`, soft `#f5f3ec`, mute `#555a7c`, white.
- **Fonts:** Montserrat 500–800 (headings/UI, uppercase+tracking for buttons/eyebrows), Source Sans 3 400–700 (body). Self-hosted in `assets/fonts/`.
- **Buttons:** angled right edge (clip-path), crimson default, sweep-fill hover (navy; gold on dark/hero). Variants: navy, gold, ghost, ghost-light (on dark), white (on red).
- **Eyebrow:** small uppercase label with a gold skewed bar. **Accent words** in headings: plain crimson (gold on dark/red). No highlighter effect.
- **Containers:** max-width 1320, gutters `clamp(18px, 4vw, 56px)`, section padding `clamp(72px, 9vw, 132px)`.
- Child-theme CSS/JS needed for: clip-path corners, split-text reveals, pre-loader, count-up, magnetic buttons, scroll progress, hero slider, dropdown scrollspy.

## 2. Header & navigation
- White sticky header, logo (navy lockup) ~68px desktop / 66px mobile, shrinks when stuck. Search icon, Enquire (ghost), Apply now (crimson).
- Nav: Study · Apply · International · Life at UoME · Schools & Partners (no dropdown) · About. Simple dropdowns, 4–5 plain links each (see `layout.js` `DD`).
- **Underline:** 4px crimson bar close under the label (bottom 24px; 17px when stuck) on hover/active.
- **Active states:** parent tab underlined for its section. Dropdown item gets crimson text + left bar when it matches current path+query+hash, **and follows scroll** (scrollspy: item whose target section is above 38% of viewport). Falls back to the hashless link at page top (About → "Our story"). In Elementor use Nav Menu + small JS (`core.js`: `markDD`, scrollspy block).
- Mobile: hamburger + search icons 40px; drawer with accordions; sticky bottom bar (Apply / Call / Enquire) under 900px.
- Search overlay opened by icon or `/` key; results from `uome-data.js` `search` array → in WP use a search plugin or Elementor search form.
- Back-to-top: round navy button with gold progress ring (shows after 500px) + 5px top progress bar.

## 3. Home (`index.html`)
Order: Hero + finder bar → Four ways in → Accreditation logo row → Stats (soft background) → Programme list → Student story → Campus → Guides → Closing CTA.
- **Hero:** full-bleed cycling photos (5 slides, 6.5s, Ken-Burns, per-slide focal point `--fx`), shade lighter than first draft (brightened images), headline, 2 buttons, next-intake countdown, caption card + progress dots. **Pause only on click** (not hover).
- **Hero finder bar** (red): Subject / Level / Study mode → GET `study/?area=&level=&mode=`.
- **Mobile hero = same structure, fewer elements:** images limited to top 310px and fade to navy, headline below, **hide** caption card, countdown, both buttons; finder bar stacks (full-width dropdowns). Implement as one container + Elementor "hide on mobile" toggles.
- Stats end with three text links (About, Alumni, Partnership). Removed from home on purpose: law pathway, "Why UoME", international steps, rankings, discount bar, alumni band.
- Programme rows: no hover image (removed). Filter chips Law / PM / Digital filter rows via `[hidden]` (global rule `[hidden]{display:none!important}` is required).

## 4. Page patterns
- **Inner page header:** light (soft) background, thin crimson top rule, breadcrumb, eyebrow, H1 (one crimson word), lede; **photo bleeds to the right edge, 46% width** (≥1000px). Hidden on mobile.
- **Programme page:** header + navy **facts bar** (duration, mode, intakes, awarded by, campus) → sticky sub-nav (scrollspy) → content + sticky side card ("Apply or ask" buttons; on mobile only buttons) → related → closing CTA with programme name. No "At a glance" list in the card (duplicate). Fees from `data.js` `fees`; JSON-LD `Course` + `FAQPage`.
- **Closing CTA:** crimson band, contextual title/text/buttons per page (`ctaBand(depth, {title,text,primary,secondary})`). "Where next" strips were removed (duplicate).
- **Apply:** sticky sub-nav; international tab is a short note + link to International journey (no duplicate steps); document lists hidden on mobile (`.hide-m`).
- **International:** journey = list+panel on desktop; **on mobile the list is hidden and all steps stack**. Health section removed (step 7 covers it).
- **Accreditation:** explorer = list+panel on desktop; **mobile stacks all six panels**, list hidden.
- **About:** at-a-glance stats → two-column timeline (sticky left) → partnership (navy, stat cards) → quality tiles → board → visit → CTA. **Board = square portrait tiles** (initials on navy with crimson corner) — swap in real photos (`.person__img img` fills the square).
- **Guides:** index = featured guide + category chips + grid. Article = key takeaways box, auto TOC (sticky), key-facts card, sections, related programmes, 2 more guides, contextual CTA. Content in `build/news.js` (sections[]).
- **Life:** sticky scroll campus tour (swap stage image per step); facilities tiles removed (duplicate).
- **Stories / Alumni / Events / Gallery / Partners / Contact / Legal / 404:** see `build/pages/*.js`.

## 5. Interactive widgets (JS; mount in HTML widgets, data from ACF/options)
| Widget | File | Notes |
|---|---|---|
| Course finder + compare tray + quiz | `finder.js` | URL params `area, level, mode, intake, accred`; shortlist in localStorage (max 3) |
| Fees estimator + cost-of-living | `estimator.js` | fees in `data.js`; early-pay 5%; RATE 54 Rs/£ (confirm) |
| Countdown | `core.js` | next date from `intakes` |
| Enquiry form | `core.js` | 3 steps; prefill from `?programme=`, `?intake=2027-01|02|09`, `?enquire=1`, `?who=intl`, shortlist; **demo only — wire to Elementor Forms + CRM + UTM hidden fields** |
| Tour, journey, accreditation explorer, tabs, gallery lightbox, category filter, support topic filter | `core.js` | |
| Pre-loader | `core.js` | counter + two-layer wipe, 1.2s min, **first visit/refresh only** (flag `uome.nav` in sessionStorage skips it on internal navigation) |
| Reveal/split-text/count-up/parallax/magnetic | `core.js` | all off under `prefers-reduced-motion` |

## 6. Responsive rules learned (apply in Elementor breakpoints)
- Breakpoints: 480 / 700 / 900–960 / 1000 / 1200 (nav switches to hamburger <1200; hero simplifies <1000; stacked list+panel widgets <960).
- Stats <700px: 2×2 grid, numbers `clamp(2.1rem, 11vw, 3rem)`, no wrapping; label small.
- Buttons wrap text <520px; grids use `minmax(min(Npx,100%),1fr)`; grid children `min-width:0`; long emails need `overflow-wrap:anywhere` (support email breaks at `@`).
- Contact tiles (Call/Email) stack on mobile.
- Tap targets ≥44px; header icons 40px.
- Contrast: gold only as accent; text on crimson/navy is white; `--gold-text #a87800` for gold text on light.

## 7. WordPress structure
- CPTs: `programme` (tax: area, level, mode, accreditation; ACF: duration, intakes, modules, entry local/intl, careers, fees, factsheet, FAQs, related), `event`, `story`, `person` (board), `post` for guides (ACF: takeaways, key facts, related programmes, CTA).
- Redirects: `/course/<slug>/` → `/study/<area>/<slug>/`; `/tuition-fees/` → `/apply/#fees`; `/international/`, `/alumni/` → `/life/alumni/`, `/events/`, `/gallery/`, `/about-us/` → `/about/`, `/contact-us/` → `/contact/`, `/apply-now/` → `/apply/`.
- SEO: titles ≤62, descriptions ≤158 (auto-clipped in `layout.js`), JSON-LD, sitemap.xml.
- Plugins: Elementor Pro, ACF/Pods, filter plugin, SMTP, cookie consent, caching, Redirection, analytics (GTM events listed in README).

## 8. Open items before build
Fees (Apr 2025 schedule), 2027 intake dates, GBP fee for LLB English & Mauritian Law, LLB English Law syllabus, WhatsApp number, CRM/form destination, official logos (HEC, QAA, IDM, CVLE, navy UoME/UoL art), newer photography (old "Central Lancashire" banners in fair/gallery images), board portraits, more student stories, privacy/legal text. See `CLIENT-REVIEW.md`.
