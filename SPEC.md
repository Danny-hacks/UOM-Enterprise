# UoME Website Rebuild — End-to-End Spec (v2)

> **Art-direction update (after first client-side review of the demo):** the cream-paper / serif / italic-gold look was dropped as too generic. The build now uses the **original site's yellow as the lead colour** (yellow header, page headers, stats and CTA bands; navy for contrast and footer; crimson for primary actions), **Montserrat + Source Sans 3**, no utility bar above the header, a larger logo (navy lock-up on yellow), a full-bleed cycling hero, a pre-loader, page transitions, continuous and entrance animations, and a back-to-top button with scroll-progress ring. See README.md for the motion inventory.

## 1. Context

UoME (UOM Enterprise Ltd, Ebene, Mauritius — established 2010 by the UOM Trust, HEC-registered, delivering University of Lancashire awards since 2011) needs a **ground-up rebuild**, not a migration or polish. Brief: *look like Melbourne, navigate like UCL, tell stories like King's, recruit like Gulf Medical University, convert like Universal College Lanka.*

**Deliverables, in order**
1. **Client demo site** — finished-looking, fully populated, bespoke static site (HTML/CSS/JS) on a preview URL. Not a template, not a mockup: real content, real imagery, working interactions.
2. **Production build** — WordPress + native Elementor, converted from the approved demo (`wordpress-elementor-builder` agent pipeline).

**Content policy (revised per client direction):** no lorem ipsum, no `[TBC]` placeholders anywhere in the demo.
- Use real content from uomenterprise.mu wherever it exists (facts listed in §2).
- Where the current site is thin (modules, entry requirements, careers, outcomes), **research and write new content** from official University of Lancashire course pages, APM/CIOB/IDM pages, QAA/HEC, and Mauritian sources; write original copy in UoME's voice.
- Anything we could not verify from a public source is phrased conservatively (no invented statistics, rankings, salaries, testimonials, or named people). The client reviews everything and tells us what to change. A separate **Client Review Sheet** lists every claim sourced externally, with its source URL, so confirmation is a tick-box exercise.

---

## 2. Verified source content (from current site)

| Area | Facts |
|---|---|
| Institution | UOM Enterprise Ltd; est. 2010 by UOM Trust; registered with Higher Education Commission (HEC) as post-secondary institution; all programmes accredited by HEC; UoLancashire courses delivered in Mauritius recognised under UK system regulated by QAA |
| Partnership | University of Lancashire (UK) since 2011; first delivered LLM International Business Law (3 yrs); Law + Project Management UG/PG from 2014; MSc Digital Marketing Communications from 2024 |
| Leadership | Prof. Raja Vinesh Sannassee (Chairman); Mr Vadish Horeessran, Mr Ashwan Domah, Ms Romina Koorja (Board Directors) |
| Campus | 1st Floor, The Core Building, Ebene. Modern classrooms; ~30-PC computer lab; library with short-term loans; UCLan e-books/e-databases/e-journals/research repository; student lunchroom (TV, board games); clubs: Law Society, Rotaract |
| Contact | (230) 467 8925 / 467 8926; Mon–Fri 09:00–16:30 (open through lunch 12–1); email on current site |
| Student services | Marketing/recruitment (1-to-1 counselling, prospectuses, open days, education fairs, road shows, free taster lectures, college presentations); admin & student support (mitigating circumstances, extensions, interruption/withdrawal, complaints, online enrolment, Blackboard help); finance team |
| Programmes (current site lists 28 Sep 2026 start, now past) | **LLB (Hons) English & Mauritian Law** — Qualifying Law Degree for England & Wales and Mauritius; leads to BPTC/LPC; recognised by CVLE; 3 yrs FT (Sep) / 2.5 yrs FT (Feb). **LLB (Hons) English Law** — same durations. **Graduate Diploma in Law (GDL)** — 1 yr FT / 2 yrs PT. **LLM Financial & Commercial Law** (pathway: Financial Investigation) — 1.5 yrs PT, Sep & Jan intakes. **MSc Digital Marketing** — 1.5 yrs PT. **MSc Construction Project Management** — 1.5 yrs PT. **MSc Project Management** — APM-accredited, 1.5 yrs PT |
| Accrediting/partner bodies | APM (Project Mgmt), CIOB (Construction PM), IDM (Digital Marketing) |
| Fees & payment | Local: MUR; cheque/banker's cheque/SBM transfer; **5% discount if paid in full by 31 Aug 2026** (Sep 2026 intake). International: GBP; SBM transfer only; 5% discount if paid in full on enrolment. Application fee Rs 1,000 (waived for international). Refund policy table by withdrawal date (fee schedule is image-only → obtain from client/office) |
| International | Application form + checklist, personal statement, transcripts, references (1 UG / 2 PG); visa processed after first tuition payment; medical (HIV, Hep B, chest X-ray within 1 month of arrival); accommodation lists (Ebene, Quatre Bornes, Rose-Hill); airport pickup; free government bus travel for students; cost of living ≈ £3,500/yr; climate 15–33°C |

---

### 2b. Visual audit (Playwright screenshots, desktop 1440 + mobile 390, scratchpad `shots/`)

**Current UoME site** — gold header bar + navy footer, full-width campus photo (The Core building) with overlaid "ADMISSIONS OPEN" text, then dense text-only boxes; ~2010s WordPress theme. Findings: (a) **stale** — still promoting the Sept 2026 intake/31 Aug 2026 deadline though today is Oct 2026 → new site must lead with the next intake (Feb 2027 for LLB; Jan 2027 for LLM; dates pulled from site/UCLan and flagged for client); (b) wall-of-text "Why choose" with stats buried; (c) one testimonial (Yaniish Engutsamy, MSc Digital Marketing Communications Yr 1 — real, reusable); (d) course pages = one paragraph + factsheet/form downloads, no modules/outcomes/fees; (e) "Take tour" has no destination; (f) tiny stock imagery on course pages; (g) PDF-driven application (factsheet, checklist, form).
**Real, reusable assets/claims on the site:** UoME crest + "Shaping tomorrow's Leaders" + UOM Trust shield; UCLan logo; APM logo; graduation photography; The Core building photo; course thumbnails; 900+ alumni; 100+ practising barristers/attorneys among alumni; alumni include a former President of the Republic and the current ICT Minister (client to confirm wording before publishing); engineering alumni in construction; first MSc Digital Marketing graduating cohort in 2026; UCLan claims (nearly two centuries of experience; top 7% of world universities per CWUR 2025; top 20% in UK for engagement with industry & public sector; 5 QS Stars for teaching 2025) — presented as UCLan facts with "terms apply" footnote as on current site.
**Benchmarks viewed:** *Melbourne* — navy hero with editorial serif headline + photo, big search bar, 4 audience tiles, rankings band (#1 / #22 / #1) in outlined boxes, news mosaic, collapsible campus panel, tabbed student stories, quiet contact grid; lots of whitespace. *King's* — hero with rotating key message + course search, 4 colour-coded study pathways, extracurricular storytelling, events with date chips. *Gulf Medical* — stats band (29 yrs, 111 countries, 5K students), promo videos, programmes in tabs (UG/PG), colleges grid, student feedback with names, news, working-hours footer, WhatsApp float. *UC Lanka* — category selector, counters, video success stories, short enquiry form on the homepage, named lecture panel, separate admission/general phone lines, partner logos. *UCL* — Cloudflare-blocked for automated capture; use as IA reference only (audience pathways, task-based nav, course search-first).

## 3. Audiences, Goals, KPIs

**Audiences:** (1) working professionals seeking part-time Master's (PM, Digital Marketing, LLM); (2) school-leavers/parents choosing law; (3) international students; (4) employers / professional bodies; (5) alumni & current students (Blackboard, support).

**Goals → KPIs:** enquiry conversion ≥ 3–4%; application starts tracked end-to-end; mobile Lighthouse ≥ 90; course-finder/quiz completion; open-day registrations; brochure/factsheet downloads; WhatsApp/call taps.

---

## 4. Beyond polish: what's genuinely new

Not in current site; each is a real, working feature in the demo:

1. **"Find my programme" guided quiz** (4 questions: goal, background, schedule, interest → ranked matches with reasons).
2. **Course finder + compare** (filter by level, discipline, mode, intake, accreditation; shortlist up to 3; side-by-side comparison table; shortlist persists via localStorage).
3. **Intake countdown** — live countdown to the *next open intake* (auto-rolls from a JSON of intake dates: Feb 2027 LLB, Jan 2027 LLM, Sep 2027 all; exact dates confirmed with client); urgency banner tied to the **5% early-payment discount** (real incentive). Replaces the stale "Sept 2026 / 31 Aug" banner.
4. **Fee & savings estimator** — pick programme, local vs international, pay-in-full → shows 5% saving, currency (MUR/GBP), and links to fee schedule. (Fee amounts loaded from client's fee schedule; until supplied the estimator shows the discount logic and "request fee schedule" action.)
5. **Law pathway visual** — interactive journey: LLB (Eng & Mau) → CVLE (Mauritius) / BPTC or LPC (England & Wales); GDL route for non-law graduates.
6. **Accreditation explorer** — APM / CIOB / IDM / HEC / QAA / CVLE, each with what it means for your career.
7. **International relocation hub** — interactive "Your journey to Mauritius" timeline (apply → offer → first payment → visa → medical → arrival), cost-of-living calculator (£3,500/yr baseline), accommodation areas map (Ebene, Quatre Bornes, Rose-Hill), climate widget.
8. **Virtual campus tour** — scroll-driven walkthrough: classrooms, computer lab, library, lunchroom, clubs (replaces dead "Take Tour"), with Ebene map & "how to get here".
9. **Our story timeline** 2010 → 2011 → 2014 → 2024 with animated progress.
10. **Admissions step-tracker + smart enquiry form** — multi-step, pre-filled from shortlist/quiz, routes to right adviser; "Book a call" slot picker; WhatsApp deep-link with pre-filled message including the course.
11. **Student hub** for current students — support topics (extensions, mitigating circumstances, withdrawal, complaints, Blackboard, finance) as searchable accordions; clubs.
12. **Site-wide search** with course/news/event suggestions; **audience switcher**.
13. **Events engine** — open days, taster lectures, fairs, road shows with registration + add-to-calendar.
14. **Stories** — student/alumni stories format built; populated with the real, consented content the client supplies; until then, the demo uses "Why students choose UoME" editorial pieces written from verified programme facts (no fabricated quotes).

---

## 5. Art Direction — must NOT look like a generic build

Rejected: default AI-site look (purple/blue gradients, Inter + centred hero + three identical rounded cards, glassmorphism, emoji icons, stock-photo grid).

**Concept: "Island, Interior" — editorial university magazine meets Mauritian light.** Calm authority (Melbourne) with a distinct sense of place.
- **Palette — evolve the existing brand, don't discard it.** The crest is crimson/gold/navy and the current site is gold + navy; keep that heritage but make it premium: *Trust Navy* `#0B1245` (deep, from current footer navy, darkened; dark sections/text); *Crest Gold* `#C99A1B` (refined from current `#D49C00`; rules, numerals, accreditation marks, secondary highlights); *Crest Crimson* `#A3162A` (from the shield; primary CTA / key accent, used sparingly); *Parchment* `#F7F3EA` warm paper background; *Lagoon* `#2F7F86` a single Mauritian-sea tint for info panels/pathway diagrams. AA contrast checked (white on Navy/Crimson; Navy on Gold). Final values sampled from the logo files during build.
- **Type:** display serif with character (e.g. *Fraunces* variable w/ optical sizing, tight tracking, italic accents for emphasis words) + clear grotesk (e.g. *Instrument Sans* / *Geist*) for UI and body; oversized numerals (stats, step numbers) as a signature. Not Inter, not Playfair.
- **Layout language:** asymmetric editorial grids, offset image crops, large pull-quotes, hairline rules and index numbers (01/02/03), full-bleed type-led sections, varied section rhythm (no repeating card grids), sticky scroll storytelling, oversized course titles as typographic features.
- **Imagery:** real photography — (a) harvest UoME-owned images from current site (campus, events, gallery); (b) supplement with properly licensed Mauritius/Ebene/education imagery (Unsplash/Pexels licence, credited in Review Sheet) cropped consistently with one grade (warm, slightly desaturated); (c) no AI-generated people. Custom SVG graphics: island outline, pathway diagrams, accreditation seals redrawn from official logos where usage allowed.
- **Motion:** purposeful only — reveal-on-scroll, parallax on hero crop, number count-ups, timeline draw, page-load text mask. `prefers-reduced-motion` honoured.
- **Details:** custom cursor-free (mobile-first), tactile buttons (offset shadow shift), grain overlay on dark panels, custom focus rings, branded 404, branded favicon.
- **Logo:** reuse current UoME logo (pulled from site); lockup with "in partnership with University of Lancashire".

---

## 6. Information Architecture (UCL-style, task-based)

**Primary nav (mega-menu):** **Study** · **Apply** · **International** · **Life at UoME** · **Business & Services** · **About** · [Apply now] [Enquire]
**Utility bar:** I am a → Prospective · International · Parent · Employer · Current student/Alumni; Search; Call; WhatsApp.

**Sitemap**
```
/                       Home
/study/                 Finder + compare + quiz
  /study/law/  llb-english-mauritian-law · llb-english-law · graduate-diploma-in-law · llm-financial-commercial-law
  /study/business-management/  msc-project-management · msc-construction-project-management
  /study/digital/  msc-digital-marketing
/apply/                 How to apply · key dates · entry · fees & savings estimator · forms & checklists · start application
/international/         Journey timeline · visa · health · accommodation · cost of living · enquire
/life/                  Campus tour · facilities · clubs · student support hub · stories · alumni
/careers-accreditation/ Accreditation explorer · law pathways · employability
/business-services/     Marketing & recruitment partnerships, corporate/educational outreach (from Services)
/about/                 Story timeline · UoLancashire partnership · governance/leadership · quality (HEC, QAA)
/events/  /gallery/  /news/
/contact/               Form · book a call · WhatsApp · map · hours
/legal/                 Privacy · cookies · terms · complaints
```
301 map from old URLs (e.g. `/course/msc-project-management/` → `/study/business-management/msc-project-management`).

---

## 7. Page Specs (all fully written, no placeholders)

**Homepage** (non-slider): ① cinematic hero — headline in editorial serif, e.g. "A British degree. Rooted in Mauritius." sub-copy on UoLancashire partnership; CTAs *Find your programme* / *Book a call*; live countdown chip to the next open intake ② "Where do you start?" audience paths ③ finder strip + quiz entry ④ accreditation/partners band (UoLancashire, HEC, QAA, APM, CIOB, IDM, CVLE) ⑤ founding story timeline teaser ⑥ featured programmes (7) as large typographic list rows, not cards ⑦ law pathway visual ⑧ outcomes/why-UoME panel (verified facts: UK award, dual qualification, part-time for professionals, accreditation, Ebene location, free student bus) ⑨ campus tour teaser ⑩ international hub teaser with journey strip ⑪ events + news ⑫ early-payment discount banner ⑬ final conversion band + footer (address, hours, map link, socials, quick links).

**Course template** (×7): hero w/ key-facts bar (duration, mode, next intake from the intake data, location Ebene, awarding body) → sticky in-page nav → overview (original copy from verified facts) → why this programme → structure/modules (sourced from UCLan course specs, flagged in Review Sheet) → teaching & assessment → careers & next steps → accreditation/recognition → entry requirements (UCLan standard for programme; flagged) → fees & savings estimator → how to apply stepper → FAQs → related programmes → sticky Apply/Enquire/WhatsApp/Download factsheet.

**Other pages:** Apply hub; International hub; Campus & Life; Student support hub; Accreditation & pathways; About/story; Business & Services; Events; Gallery (filterable lightbox); News (3–6 original articles on verified topics e.g. "What 'Qualifying Law Degree' means", "APM accreditation explained", "Applying from abroad: your step-by-step"); Contact; Legal; 404.

---

## 8. Conversion System
- CTA hierarchy: **Apply now** (crimson) › Enquire › Book a call › Download factsheet › WhatsApp/Call.
- Sticky mobile action bar (Apply · Call · WhatsApp); desktop sticky course sidebar.
- Short multi-step forms (≤5 first-step fields), inline validation, success states, consent text aligned with Mauritius Data Protection Act 2017.
- Context-aware: forms pre-fill course, intake, local/international.
- Trust beside forms: accreditation marks, response-time promise, office hours.
- Tracking: GA4 events (`cta_click`, `quiz_complete`, `compare_add`, `estimator_use`, `form_start/submit`, `whatsapp_click`, `factsheet_download`, `event_register`), UTM capture into hidden fields.
- Forms in demo: front-end validated with success state; for production → Elementor Forms + email/CRM webhook.

---

## 9. Mobile-First, Performance, A11y, SEO
- Design from 360px up; breakpoints 480/768/1024/1280; ≥44px targets; drawers instead of long scrolls.
- LCP < 2.5s on 4G; AVIF/WebP + srcset; self-hosted fonts subset; minimal vanilla JS; no heavy libraries.
- WCAG 2.2 AA: landmarks, skip link, keyboard mega-menu, focus states, labelled forms, alt text, reduced motion.
- SEO: single H1, clean URLs, JSON-LD (`EducationalOrganization`, `Course`, `Event`, `FAQPage`, `BreadcrumbList`), OG/Twitter cards, XML sitemap, redirects, local SEO (Ebene).

---

## 10. Demo Build Spec (Phase 1)

- **Stack:** hand-written HTML/CSS/JS (no template, no framework); CSS custom properties for tokens; data-driven via `data/programmes.json`, `events.json`, `news.json` so finder/compare/quiz/estimator share one source.
- **Structure** (in `c:\Users\obief\Desktop\UoM Project\demo\`):
```
index.html · study/ · apply/ · international/ · life/ · careers-accreditation/ · business-services/ · about/ · events/ · gallery/ · news/ · contact/ · legal/ · 404.html
assets/css/ (tokens, base, layout, components, pages)
assets/js/ (nav, finder, compare, quiz, estimator, countdown, timeline, tour, forms, reveal, search)
assets/img/ · assets/fonts/ · data/*.json · CLIENT-REVIEW.md (sourced claims + sources)
```
- Every section is a self-contained block with `data-elementor="container|widget-type"` comments to guide the Elementor conversion.
- **Hosting for review:** Netlify/Vercel preview URL.
- **Process:** (1) crawl current site for all text/images/logo (harvest assets); (2) research UCLan course specs + accreditor pages for gaps, log sources; (3) write copy; (4) build design system page then pages; (5) QA; (6) deploy; (7) Client Review Sheet.

---

## 11. WordPress + Elementor Production Spec
- WP + Elementor Pro (Theme Builder, Loop Grid, Forms, Popups, Dynamic Tags) on Hello Elementor child theme; managed hosting + CDN + cache.
- Tokens → Elementor Global Colours/Fonts; Theme Builder header/footer/mega-menu (Nested), templates for Single Programme, Single Event, Single News, Archive Programmes (finder), 404.
- CPTs/taxonomies (ACF/Pods): `programme` (level, discipline, mode, accreditation; fields: duration, intakes, modules, entry, careers, fees, factsheet), `event`, `story`, `news`; filtering via JetSmartFilters/Filter Everything (AJAX + URL params).
- Custom features (quiz, compare, estimator, countdown, journey timeline, tour) → small, documented JS in a mu-plugin/child theme, mounted in Elementor HTML widgets with config exposed in WP-editable fields.
- Forms → Elementor Forms + SMTP + CRM webhook + reCAPTCHA/Turnstile; Complianz cookies; Rank Math; WP Rocket/LiteSpeed; Redirection; backups; Site Kit/GTM.
- Pipeline: approved demo → `wordpress-elementor-builder` converts to native containers/widgets (no raw-HTML pages), staging first, then production + redirects + handover training.

---

## 12. Delivery Plan
| Phase | Output |
|---|---|
| 0 Content harvest & research | Crawl, assets, UCLan/accreditor research, source log |
| 1 Demo build | Full site per §10, deployed preview |
| 2 Client review | Walkthrough + CLIENT-REVIEW sheet → one consolidated feedback round |
| 3 Revisions | Apply client confirmations/changes |
| 4 Elementor build | §11 on staging |
| 5 QA & launch | Cross-device, a11y, perf, redirects, DNS, analytics, 30-day support |

---

## 13. QA & Acceptance
- Renders at 360/768/1024/1440; Safari iOS, Chrome Android, desktop Chrome/Edge/Firefox/Safari.
- Lighthouse mobile ≥ 90 perf (demo ≥ 85), a11y ≥ 95, SEO ≥ 95; axe no critical issues; keyboard-only pass.
- Every CTA, form, quiz, finder, compare, estimator and countdown works; no dead links, no placeholder text, no console errors.
- Visual gate: side-by-side vs the five reference sites confirms each lesson (Melbourne feel, UCL IA, King's story, GMU achievements, UCL-Lanka conversion) — without copying any text, layout or assets.
- Fact gate: every statistic/claim traceable to site or logged source.

## 14. Risks / items to flag to client
Fee schedule is image-only (need figures); modules/entry requirements sourced externally pending confirmation; no verified student testimonials/outcome stats on current site (we will not invent them — provide consented stories); photography licensing; CRM/application-system integration; French-language need; domain/hosting access.

## 15. Verification
1. Open preview on phone + desktop; complete quiz → shortlist → compare → estimator → enquiry on each.
2. Lighthouse + axe on Home, Finder, Course, Apply, International.
3. Review Sheet audit: every external fact has a source.
4. After Elementor build: edit heading/card/programme in WP admin to confirm GUI editability; visual diff vs demo.

## 16. Next steps on approval
Scaffold `demo/`, harvest assets from uomenterprise.mu, research gap content, build design system + Home, then remaining pages, deploy preview.
