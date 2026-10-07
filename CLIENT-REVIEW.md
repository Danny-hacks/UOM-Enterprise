# UoME demo site — client review sheet

Everything on the demo site is either **(A) taken directly from uomenterprise.mu** (pages, course factsheets, application checklists, fee tables), **(B) written by us from those facts**, or **(C) needs information from UoME**. This sheet lists everything in B and C so confirmation is a tick-box exercise. Please mark each ✔ keep / ✎ change.

## 1. Facts used as published by UoME (please spot-check)

| # | Item | Source |
|---|---|---|
| 1 | Est. 2010 by UOM Trust; HEC-registered; UoLancashire partnership 2011; LLM International Business Law first; Law & PM programmes 2014; MSc Digital Marketing 2024; first DM cohort graduating 2026 | About Us, home page |
| 2 | Board: Prof. Raja Vinesh Sannassee (Chairman); Mr Vadish Horeessran, Mr Ashwan Domah, Ms Romina Koorja | About Us |
| 3 | 7 programmes: durations, intakes, modes, modules, entry requirements, accreditation, assessment | Course pages + factsheet PDFs |
| 4 | Tuition fees (MUR local / GBP international), 3 instalments and due dates per intake | Tuition Fees page — screenshots dated Apr 2025 |
| 5 | 5% early-payment discount; refund policy table (100 / 70 / 50 / 0%) | Tuition Fees page |
| 6 | Application steps, Rs 1,000 fee (waived international), offer letter in 3 working days (local) / 1 week (international), 50% first payment, referees, documents, visa/medical/accommodation/airport pick-up | Apply Now, International, application checklists |
| 7 | Campus facilities, clubs, student support contacts, finance contact | Services page |
| 8 | 900+ graduates; 100+ practising barristers & attorneys; alumni incl. former President of the Republic and current Minister of ICT; engineering alumni | Home + Alumni pages |
| 9 | University of Lancashire claims: ~two centuries, top 7% (CWUR 2025), top 20% UK engagement with industry & public sector, 5 QS Stars (2025) | Home page |
| 10 | Yaniish Engutsamy testimonial + photo | Home page |
| 11 | Cost-of-living table (rent, food, transport, clothing) and £3,500/year | International page |
| 12 | Events: SVICC Career Expo 14–16 Feb 2025 (Pailles); Le Bocage International School Education Fair 13 Feb 2025 | Events page |
| 13 | Facebook and Instagram links | Current site footer |

## 2. Content we wrote (editorial) — please confirm tone and accuracy

- Hero headline and all section headings/lede copy; audience-path copy.
- Programme "why this programme" bullets and **careers lists** (the factsheets give career prospects only for the LLM; the others are written conservatively from programme aims).
- Five guides in *Guides & news* (qualifying law degree, applying from abroad, fees, APM accreditation, campus life), including their key-takeaway and key-facts boxes.
- About page copy: at-a-glance row, timeline intro, quality tiles.
- Closing call-to-action headings and text on each page.
- Accreditation explorer "What it means for you" lines.
- Neighbourhood descriptions for Quatre Bornes and Rose-Hill; "ten minutes' walk to the metro" (from the Services page) used in marketing copy.
- Law pathway diagram wording (BPC / LPC / CVLE routes taken from factsheets).
- Student-support topic answers (expanded from the Services page).
- Privacy / cookies / complaints / terms text — **generic draft; needs UoME legal review**.
- The "Which programme is right for me?" quiz scoring rules (can be tuned).

## 3. Assumptions to confirm

| # | Assumption | Why it matters |
|---|---|---|
| 1 | Next intakes shown as **January 2027** (GDL, LLM), **February 2027** (LLBs), **September 2027** (all). The countdown counts to the 1st of the month. | The current site still advertises Sept 2026 (28 Sep) — now past. Need exact start dates. |
| 2 | Fees are as per the April 2025 schedule. | Confirm 2026/27 and 2027 fees. |
| 3 | Early-payment discount deadline for each 2027 intake is not published; copy says "by the early-payment deadline". | Provide dates. |
| 4 | LLB (Hons) English & Mauritian Law has no published GBP fee; estimator shows "On request". | Provide GBP fee. |
| 5 | LLB English Law factsheet download is broken on the live site; modules are not listed. | Provide syllabus. |
| 6 | MSc Digital Marketing (UCLan title) = MSc Digital Marketing Communications (UoME 2024 launch). | Confirm naming. |
| 7 | The alumni "former President / current Minister of ICT" statement is reproduced as published (unnamed). | Confirm you are happy to keep it. |
| 8 | Cost-of-living calculator converts at ≈ Rs 54 = £1 (derived from UoME's table). | Confirm or provide rate. |
| 9 | "Alumni & Community Evenings 2024–2025" label inferred from photo files. | Confirm event names/dates. |
| 10 | "Schools & Partners" replaces the current "Services" menu (Services content is split between Life/Support and Partners). | Confirm structure. |
| 11 | CVLE/HEC/QAA/IDM shown as typographic marks (no logos supplied); APM, CIOB and UoLancashire logos come from the current site. | Supply approved logos. |

## 4. Missing from UoME (needed before launch)

- WhatsApp number (the sticky bar currently offers Apply · Call · Enquire), live chat preference.
- Where form submissions should go (email addresses / CRM) and whether to integrate an online application system.
- Google Analytics / Tag Manager IDs, cookie-consent provider preference.
- LinkedIn page, YouTube/video assets, campus video for the tour.
- Photography: all images are from the current site. Several fair-stand photos show the older "University of Central Lancashire" banners — we recommend newer photography. No stock imagery is used.
- 4–8 more consented student/alumni stories (we do not invent testimonials).
- Staff/lecturer profiles (Universal College Lanka-style "lecture panel") if desired.
- Approval to quote University of Lancashire rankings (shown on the About page).
- Board member portrait photos.

## 4b. Design decisions to confirm

- Palette: white header, crimson as the main action colour, navy for contrast sections and footer, gold as an accent.
- Fonts: Montserrat and Source Sans 3 (free, self-hosted) — swap if UoME has brand fonts.
- Navy versions of the UoME and University of Lancashire logos were produced from the white originals — please supply official artwork.
- Pre-loader plays on a first visit or refresh only (not when moving between pages); it can be shortened or switched off.
- Hero: full-screen cycling photos on desktop; on phones the same structure with the caption card, countdown and hero buttons hidden.
- Board profile tiles use initials as placeholders — please supply portrait photos.

## 4a. STAND-IN content to replace with real content

These items were written as realistic stand-ins so the demo reads as finished. They are **not verified facts or real people**. Build with `SHOW_SAMPLE_TAGS=1 node build/build.js` to show a "Sample" tag on each one. The build prints this list every time.

| What | Where | Needed from UoME |
|---|---|---|
| 5 graduate stories (Aisha M., Kevin R., Priya S., Daniel T., Nadia K.) — quotes, outcomes, initial-only portraits | Outcomes, Student stories, Home rotator, programme pages (`build/outcomes-data.js`) | Real, consented stories with photo, programme, year and one-line outcome |
| 6 career sectors and typical routes | Careers & outcomes (`build/outcomes-data.js`) | Real graduate destinations / employers (logos need permission) |
| WhatsApp number `+230 5000 0000` | CTA band, Contact, Home (`build/data.js`) | UoME's real WhatsApp line |
| Enquiry forms | Home, programme pages, Contact | Form destination / CRM; callback hours |
| "Coming up" events (open days, taster lectures) show no dates | Events | Real upcoming dates |
| Board portraits (initials) | About | Photos |
| Parents page answers | Parents | Review wording; all points come from published UoME information |
| Online application (7-step form) | `/apply/online/` | Decision: online application vs. enquiry + downloadable form; where submissions go; fee-payment instructions; document upload method |
| Factsheet download gate (name + email) | Programme pages | Confirm you want to capture leads before download |
| Per-story Q&A pages for the five stand-in stories | `/life/stories/<name>/` | Real, consented interviews |

## 4c. Features added beyond the current site

Careers & outcomes hub with sectors, route to the Bar and graduate stories; parents page; callback form, WhatsApp link and short enquiry forms on Home and every programme page; news and achievements posts; course finder, compare tray and programme quiz; fees and savings estimator; next-intake countdown; three-step enquiry form that pre-fills; full programme pages; accreditation explorer; international journey and cost calculator; campus tour; student support hub; guides; alumni, events, gallery, schools and partners pages; site-wide search; back-to-top with progress ring.

## 5. What is demo-only

- Forms validate and show a success state but send nothing.
- Shortlist, audience choice are stored in the visitor's browser only.
- Map embed uses Google Maps search for The Core Building, Ebene.
