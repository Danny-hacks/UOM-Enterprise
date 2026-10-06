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
- Nav: Study · Apply · International · **Careers & outcomes** · Life at UoME · About (Parents and Schools & partners live under About). Simple dropdowns, 4–5 plain links each (see `layout.js` `DD`).
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

## 9. Added after the brief audit (Oct 2026)
- **Careers & outcomes** (`/outcomes/`): stats, six sectors with typical routes (stand-in), law-route diagram, 3 graduate stories, careers support (real published services). Data: `build/outcomes-data.js`.
- **Stories:** story card (`.scard`) = photo or initials tile, quote, name, programme, outcome; filter chips; home **story rotator** (3 slides, 9s, dots, pauses off-screen). Stand-ins carry `sample: true`; `SHOW_SAMPLE_TAGS=1` shows a "Sample" tag; the build prints the stand-in list.
- **Parents page** (`/parents/`): four reassurance tiles, six FAQs, school-leaver programmes, visit/callback CTA.
- **Conversion:** `miniForm()` (name, phone/email, programme, consent) on Home and each programme page next to a graduate story; **callback form** at `/contact/#callback`; **WhatsApp** link (`waLink()`, stand-in number); default secondary CTA is "Request a callback".
- **Study by level:** chips above results drive the Level filter (`data-levels` in `finder.js`).
- **News & achievements:** 3 news posts added to `build/news.js` (cat `News`).
- **Events:** "Coming up" tiles (no invented dates). **Partners:** industry & professional partners tiles.
- **Visual calm:** angled corners now only on buttons, tags and chips; tiles, nodes, side card, estimator output and tour stage are rectangular.

## 10. Brief-to-10 round (Oct 2026)
- **Online application** `/apply/online/` (`build/pages/application.js`, `demo/assets/js/application.js`): 7 steps (programme+intake, about you, education, statement, referees [1 for UG, 2 for PG], documents checklist [local vs overseas], review+consent). Autosaves to localStorage (`uome.app`) with a resume banner; validates per step; success shows a reference `UOME-YYYY-#####` and a 3-step "what happens next". Prefills from `?programme=`, `?intake=2027-01|02|09`, `?who=intl`. **Demo only** → in WP use a multi-step form plugin/Elementor Forms with file upload, CRM + email confirmation, and server-side reference numbers. All "Apply now" CTAs point here; `/apply/start/` is now "Register your interest".
- **Apply page** opens with three route cards: Apply online · Register interest · Download the form.
- **Factsheet gate:** programme-page factsheet link opens a name+email modal once per session (skip allowed), then downloads. Events: `factsheet_gate_open`, `factsheet_download`.
- **WhatsApp float** (desktop) + WhatsApp links; **stand-in number** in `data.js` `site.whatsapp`.
- **Story detail pages** `/life/stories/<slug>/`: quote, Q&A, programme box, more stories. Story cards link to them.
- **Programme pages:** "Where it can lead" sector chips; on phones Structure / Entry / Fees / How-to-apply are accordions (`data-accm`).
- **Search results page** `/search/?q=`; Enter in the overlay goes there.
- **Performance/QA:** assets minified by esbuild (`npm install` then `node build/build.js` writes `*.min.*`; pages link the min files); headings split lazily; fonts self-hosted; hero images pre-brightened (`*-hero.webp`). Lighthouse mobile (local, throttled, gzip): Accessibility 100, Best practices 100, SEO 100, Performance ≈ 83–90 (LCP 2.4–3.4 s). Host with brotli/gzip + long cache headers + CDN for best results. axe: 0 violations across 43 pages.
