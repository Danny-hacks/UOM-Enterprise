# UoME website — demo build

Bespoke static site (no template, no framework) for client review, built to be converted to **WordPress + Elementor**.

**Design v3 (crimson-led, calm):** white header, crimson primary actions and bands, yellow only as accent, navy for contrast; no slanted section edges, simple dropdown menus, light inner-page headers with a photo bleeding to the right edge, no news-style tickers, accreditation marks as a static row; Montserrat (headlines/UI) + Source Sans 3 (body); full-bleed cycling hero (Ken Burns), slanted edges/buttons, marker-highlight headlines, continuous marquee tickers, rotating rings, parallax band, cursor-following programme previews, gold page-transition curtain, once-per-session pre-loader, scroll-progress bar and back-to-top ring.

```
build/            Node generator (single source of truth)
  data.js         programmes, fees, intakes, accreditations, news, events… (all real content)
  layout.js       header / mega-menu / footer / CTA band / icons
  pages/*.js      one module per page type
  build.js        writes /demo, uome-data.js, sitemap.xml, robots.txt
demo/             generated site — open demo/index.html via any static server
  assets/css/main.css      design system (tokens → Elementor Global Colours/Fonts)
  assets/js/core.js        nav, search, tabs, forms, tour, gallery, countdown…
  assets/js/finder.js      course finder, compare tray, programme quiz
  assets/js/estimator.js   fees & savings estimator, cost-of-living calculator
  assets/img/              optimised webp (from uomenterprise.mu) + logos
  assets/docs/             factsheets, checklists, application form (from the live site)
research/         screenshots of current site + benchmarks, source PDFs
CLIENT-REVIEW.md  what the client must confirm
SPEC.md           full specification
```

## Run

```
node build/build.js                 # regenerate /demo
cd demo && python -m http.server 8000
```
Deploy `demo/` to Netlify / Vercel / any static host for the client preview link.

## Elementor mapping

Every section carries a `data-elementor="container:…"` hint. Mapping:

| Demo component | Elementor build |
|---|---|
| Header + mega menus | Theme Builder header, Nested/Mega Menu |
| Hero, stats, CTA band, logo strip | Containers + Heading/Counter/Image widgets; saved as global templates |
| Programme list / finder cards | Loop Grid on CPT `programme` + filter plugin (URL params: area, level, mode, intake, accred) |
| Programme page | Single-template on CPT with ACF fields (duration, intakes, modules, entry, fees, accreditations, factsheet) |
| Fees estimator, cost calculator, quiz, compare, tour, journey | Small JS in child theme/mu-plugin, mounted via HTML widget; data from ACF options |
| Forms | Elementor Forms (+ webhook to CRM), UTM hidden fields |
| Events / Guides / Stories | CPTs `event`, `post`, `story` with Loop Grid |

## Analytics events pushed to `dataLayer`

`cta_click`, `form_start`, `form_step`, `form_submit`, `finder_filter`, `compare_add`, `compare_open`, `quiz_complete`, `estimator_use`.

## Motion inventory (all respect `prefers-reduced-motion`)

| Effect | Where | File |
|---|---|---|
| Pre-loader (counter + double wipe, once per session) | every page, first visit | `core.js`, `.pre` in CSS |
| Pre-loader skipped when navigating between pages (flag in sessionStorage) | internal links | `core.js` |
| Split-word headline reveals + marker highlight | all `.display/.h1/.h2` | `core.js` |
| Cycling hero with Ken Burns, captions, progress dots | home | `core.js` `[data-hero]` |
| Parallax band | home | `[data-parallax]` |
| Cursor-following programme preview | programme list | `core.js` |
| Image wipe reveals, staggered grids, count-ups | site-wide | `core.js` / CSS |
| Rotating dashed rings, floating shapes, nudging arrows | headers, CTA, estimator | CSS keyframes |
| Back-to-top with scroll-progress ring + top progress bar | site-wide | `core.js` |
| Magnetic buttons | desktop pointers | `core.js` |

Elementor note: slanted edges (`clip-path`), the marker highlight, tickers and the effects above are delivered as a small child-theme stylesheet + script; sections themselves are native containers.
