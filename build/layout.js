const D = require('./data');
const { site, programmes } = D;

// ---------- icons (inline SVG, stroke-based, one family) ----------
const P = {
  arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
  arrowUR: '<path d="M7 17L17 7M8 7h9v9"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 7 9-7"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M4 12.5l5 5 11-12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  compare: '<path d="M4 7h11M4 12h7M4 17h11M18 5v14M15 8l3-3 3 3"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  ig: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM6 19h13"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor" stroke="none"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5z"/>',
};
const icon = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const stars3 = `<span class="crest-stars" aria-hidden="true">${icon('star').replace('<svg class=""', '<svg width="12" height="12"')}${icon('star').replace('<svg class=""', '<svg width="12" height="12"')}${icon('star').replace('<svg class=""', '<svg width="12" height="12"')}</span>`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const byslug = (s) => programmes.find((p) => p.slug === s);
const AREA_DIR = { law: 'law', pm: 'business-management', digital: 'digital' };
const progUrl = (p) => `study/${AREA_DIR[p.area]}/${p.slug}/`;
const rel = (depth) => '../'.repeat(depth);
const img = (name, size = '') => `assets/img/${name}${size}.webp`;

function navData() {
  const law = programmes.filter((p) => p.area === 'law');
  const other = programmes.filter((p) => p.area !== 'law');
  return {
    study: {
      cols: [
        ['Law', law.map((p) => [progUrl(p), p.short, `${p.levelLabel} · ${p.durationLabel}`])],
        ['Project management & digital', other.map((p) => [progUrl(p), p.short, `${p.levelLabel} · ${p.durationLabel}`])],
        ['Find your fit', [['study/', 'Course finder', 'Filter by level, mode and intake'], ['study/#quiz', 'Which programme is right for me?', 'A 2-minute guided quiz'], ['study/#compare', 'Compare programmes', 'Side by side'], ['careers-accreditation/', 'Accreditation & career routes', 'APM · CIOB · IDM · CVLE']]],
      ],
      feat: ['study/#quiz', 'Not sure where to start?', 'Take the 2-minute programme quiz', 'campus-advice-s'],
    },
    apply: {
      cols: [
        ['How to apply', [['apply/#steps', 'Application steps', 'From form to offer letter'], ['apply/#requirements', 'Entry requirements', 'Undergraduate, graduate & postgraduate'], ['apply/#forms', 'Forms & checklists', 'Download the application pack']]],
        ['Fees', [['apply/#fees', 'Fees & savings estimator', 'MUR and GBP, by intake'], ['apply/#instalments', 'Instalment plans', 'Three payments a year'], ['apply/#refund', 'Refund policy', 'Withdrawal terms']]],
        ['Dates', [['apply/#intakes', 'Intakes', 'January · February · September'], ['events/', 'Meet us', 'Open days, fairs & taster lectures'], ['contact/', 'Speak to admissions', 'Mon – Fri, 09:00 – 16:30']]],
      ],
      feat: ['apply/start/', 'Start your application', 'Register your interest in 2 minutes', 'grad-hall-s'],
    },
    international: {
      cols: [
        ['Before you come', [['international/#journey', 'Your journey to Mauritius', 'Seven steps, interactive'], ['international/#visa', 'Student visa', 'What we handle for you'], ['international/#health', 'Health requirements', 'Medical checks on arrival']]],
        ['Living here', [['international/#accommodation', 'Accommodation', 'Ebene · Quatre Bornes · Rose-Hill'], ['international/#cost', 'Cost of living', 'Interactive calculator'], ['international/#about', 'About Mauritius', 'Climate, culture, transport']]],
        ['Apply from abroad', [['apply/#fees', 'Fees in GBP', 'Pay by bank transfer'], ['apply/#requirements', 'Entry requirements', 'International criteria'], ['apply/start/', 'Start an enquiry', 'An adviser replies during office hours']]],
      ],
      feat: ['international/', 'Study in the Indian Ocean', 'Your complete guide to UoME from abroad', 'core-night-s'],
    },
    life: {
      cols: [
        ['Campus', [['life/#tour', 'Take the campus tour', 'Ebene, scroll by scroll'], ['life/#facilities', 'Facilities', 'Classrooms, lab, library, lunchroom'], ['life/#clubs', 'Clubs & societies', 'Law Society · Rotaract']]],
        ['Community', [['life/stories/', 'Student stories', 'In their own words'], ['life/alumni/', 'Alumni', '900+ graduates'], ['gallery/', 'Gallery', 'Graduation & student life']]],
        ['Support', [['life/student-support/', 'Student support hub', 'Extensions, finance, Blackboard'], ['events/', 'Events', 'Past and upcoming'], ['news/', 'Guides & news', 'Practical reading']]],
      ],
      feat: ['life/#tour', 'Walk the campus', 'A scroll-through tour of The Core, Ebene', 'campus-atrium-s'],
    },
    partners: {
      cols: [
        ['Schools & colleges', [['partners/#schools', 'Taster lectures', 'Free, in your classroom or ours'], ['partners/#schools', 'College presentations', 'Guidance on pathways'], ['partners/#schools', 'Fairs & road shows', 'Where to meet us']]],
        ['Employers', [['partners/#employers', 'Hire UoME graduates', 'Law, project management, marketing'], ['partners/#employers', 'Develop your team', 'Part-time, hybrid study'], ['careers-accreditation/', 'Professional bodies', 'APM · CIOB · IDM · CVLE']]],
        ['Get in touch', [['contact/', 'Contact the marketing team', 'One-to-one counselling'], ['events/', 'Where we are next', 'Event calendar']]],
      ],
      feat: ['partners/', 'Partner with UoME', 'Schools, colleges and employers', 'fair-2-s'],
    },
    about: {
      cols: [
        ['Who we are', [['about/', 'Our story', '2010 to today'], ['about/#partnership', 'University of Lancashire', 'A partnership since 2011'], ['about/#leadership', 'Leadership', 'Board of directors']]],
        ['Quality', [['careers-accreditation/', 'Accreditation & recognition', 'HEC · QAA · APM · CIOB · IDM · CVLE'], ['about/#quality', 'Quality assurance', 'UK and Mauritian oversight']]],
        ['Connect', [['contact/', 'Contact & visit', 'The Core Building, Ebene'], ['news/', 'Guides & news', ''], ['legal/', 'Privacy & legal', '']]],
      ],
      feat: ['about/', 'Shaping tomorrow’s leaders', 'Our story, 2010 to today', 'about-uol-s'],
    },
  };
}

function header(depth, active) {
  const R = rel(depth);
  const nd = navData();
  const DD = {
    study: [['study/', 'Course finder'], ['study/?area=law', 'Law'], ['study/?area=pm', 'Project management'], ['study/?area=digital', 'Digital marketing'], ['study/#quiz', 'Programme quiz']],
    apply: [['apply/#steps', 'How to apply'], ['apply/#requirements', 'Entry requirements'], ['apply/#fees', 'Fees & estimator'], ['events/#visit', 'Book a visit'], ['faq/', 'FAQs'], ['contact/#callback', 'Request a callback']],
    international: [['international/#journey', 'Your journey'], ['international/#visa', 'Visa & health'], ['international/#accommodation', 'Accommodation'], ['international/#cost', 'Cost of living']],
    life: [['life/#tour', 'Campus tour'], ['life/stories/', 'Student stories'], ['life/alumni/', 'Alumni'], ['life/student-support/', 'Student support'], ['gallery/', 'Gallery']],
    outcomes: [['outcomes/#sectors', 'Where graduates work'], ['outcomes/#stories', 'Graduate stories'], ['outcomes/#support', 'Careers support'], ['careers-accreditation/', 'Accreditation & routes']],
    about: [['about/', 'Our story'], ['parents/', 'For parents'], ['partners/', 'Schools & partners'], ['about/#leadership', 'Leadership'], ['contact/', 'Contact']],
  };
  const items = D.nav.map((n) => {
    const dd = DD[n.id] || [];
    const menu = dd.length ? `<ul class="dd">${dd.map(([u, t]) => `<li><a href="${R}${u}">${esc(t)}</a></li>`).join('')}</ul>` : '';
    return `<li class="nav__item"><a class="nav__link" href="${R}${n.href}"${active === n.id ? ' aria-current="page"' : ''}${dd.length ? ' aria-haspopup="true"' : ''}>${esc(n.label)}${dd.length ? icon('chev') : ''}</a>${menu}</li>`;
  }).join('');
  const drawer = D.nav.map((n) => {
    const dd = DD[n.id] || [];
    if (!dd.length) return `<a class="drawer__plain" href="${R}${n.href}">${esc(n.label)}</a>`;
    return `<details><summary>${esc(n.label)}${icon('chev')}</summary>${dd.map(([u, t]) => `<a href="${R}${u}">${esc(t)}</a>`).join('')}</details>`;
  }).join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-elementor="header"><div class="wrap hdr__in">
  <a class="logo" href="${R}" aria-label="UOM Enterprise — home"><img src="${R}assets/img/logos/uome-navy.png" alt="UOM Enterprise — Shaping tomorrow’s Leaders" width="260" height="68"></a>
  <nav class="nav" aria-label="Primary"><ul class="nav__list">${items}</ul></nav>
  <div class="hdr__cta"><button class="icon-btn" data-search-open aria-label="Search">${icon('search')}</button><a class="btn btn--ghost btn--sm" href="${R}contact/">Enquire</a><a class="btn btn--sm" href="${R}apply/online/">Apply now ${icon('arrow')}</a></div>
  <button class="icon-btn hdr__sm" data-search-open aria-label="Search" style="margin-left:auto">${icon('search')}</button>
  <button class="icon-btn burger" data-drawer-open aria-label="Open menu" style="margin-left:0">${icon('menu')}</button>
</div></header>
<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__top"><a class="logo" href="${R}"><img src="${R}assets/img/logos/uome-white.png" alt="UOM Enterprise" height="40"></a><button class="icon-btn" data-drawer-close aria-label="Close menu">${icon('close')}</button></div>
  <div class="drawer__body">${drawer}<a class="drawer__plain" href="${R}contact/">Contact</a></div>
  <div class="drawer__foot"><a class="btn btn--gold btn--block" href="${R}apply/online/">Apply now ${icon('arrow')}</a><a class="btn btn--ghost-light btn--block" href="tel:${site.tel}">Call ${site.phone1}</a></div></div>
<div class="search" id="search" role="dialog" aria-label="Search the site"><button class="icon-btn search__close" data-search-close aria-label="Close search">${icon('close')}</button><div class="search__in"><input class="search__field" id="q" type="search" placeholder="Search programmes, fees, visas…" autocomplete="off"><div class="search__list" id="qres"></div></div></div>`;
}

function footer(depth) {
  const R = rel(depth);
  return `
<footer class="ftr" data-elementor="footer"><div class="wrap">
  <div class="ftr__top">
    <div class="ftr__brand"><img src="${R}assets/img/logos/uome-white.png" alt="UOM Enterprise" width="200" height="52">
      <p>${esc(site.address)}.<br>${esc(site.hours)} — ${esc(site.hoursNote.toLowerCase())}.</p>
      <p><a href="tel:${site.tel}">${site.phone1}</a> · ${site.phone2}<br><a href="mailto:${site.email}">${site.email}</a></p>
      <div class="ftr__uol"><img src="${R}assets/img/logos/uol-white.png" alt="University of Lancashire" width="144" height="38"><span>Delivering University of Lancashire awards in Mauritius</span></div>
      <div class="social"><a href="https://www.facebook.com/Uclaninmauritius" aria-label="Facebook">${icon('fb')}</a><a href="https://www.instagram.com/uclan_mauritius/" aria-label="Instagram">${icon('ig')}</a></div>
    </div>
    <div><p class="ftr-h" role="heading" aria-level="2">Study</p><ul>${programmes.map((p) => `<li><a href="${R}${progUrl(p)}">${esc(p.short)}</a></li>`).join('')}<li><a href="${R}study/">Course finder</a></li></ul></div>
    <div><p class="ftr-h" role="heading" aria-level="2">Apply &amp; visit</p><ul><li><a href="${R}apply/">How to apply</a></li><li><a href="${R}apply/#fees">Fees &amp; estimator</a></li><li><a href="${R}international/">International students</a></li><li><a href="${R}events/">Events &amp; taster lectures</a></li><li><a href="${R}life/">Campus &amp; student life</a></li><li><a href="${R}faq/">FAQs</a></li><li><a href="${R}contact/">Contact</a></li></ul></div>
    <div><p class="ftr-h" role="heading" aria-level="2">UoME</p><ul><li><a href="${R}about/">About us</a></li><li><a href="${R}careers-accreditation/">Accreditation</a></li><li><a href="${R}outcomes/">Careers &amp; outcomes</a></li><li><a href="${R}life/stories/">Student stories</a></li><li><a href="${R}life/alumni/">Alumni</a></li><li><a href="${R}news/">Guides &amp; news</a></li><li><a href="${R}parents/">For parents</a></li><li><a href="${R}partners/">Schools &amp; partners</a></li></ul></div>
  </div>
  <div class="ftr__bot"><span>© 2010 – 2026 UOM Enterprise Ltd. Registered with the Higher Education Commission, Mauritius.</span><nav aria-label="Legal"><a href="${R}legal/">Privacy</a><a href="${R}legal/#cookies">Cookies</a><a href="${R}legal/#complaints">Complaints</a></nav></div>
</div></footer>
<aside class="wa-wrap" aria-label="Chat with UoME"><a class="wa" href="${waLink()}" aria-label="Chat with UoME on WhatsApp" data-elementor="widget:whatsapp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/></svg><span>Chat with us</span></a></aside>
<div class="modal gate" id="gate" role="dialog" aria-modal="true" aria-label="Get the factsheet"><div class="modal__box"><button class="modal__x" data-gate-close aria-label="Close">×</button><form class="form" data-gate-form novalidate><span class="eyebrow">Free download</span><h2 class="h3">Get the <em>factsheet.</em></h2><p class="small" style="margin:-4px 0 6px">Tell us who you are and the download starts straight away — an adviser may follow up during office hours.</p><div class="field"><label class="lab" for="gn">Name</label><input class="input" id="gn" name="name" required autocomplete="name"><span class="err"></span></div><div class="field"><label class="lab" for="ge">Email</label><input class="input" id="ge" name="email" type="email" required autocomplete="email"><span class="err"></span></div><label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may contact me about this programme, in line with its <a href="${R}legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span><div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn" type="submit">Download ${icon('arrow')}</button><button class="btn btn--ghost" type="button" data-gate-skip>Skip, just download</button></div></form></div></div>
<div class="modal vmodal" id="vplayer" role="dialog" aria-modal="true" aria-label="Video player"><div class="vmodal__box"><button class="modal__x vmodal__x" data-vclose aria-label="Close video">×</button><video id="vtag" controls playsinline preload="none"></video><p class="vmodal__t" data-vtitle-out></p></div></div>
<div class="topbar" id="topbar" aria-hidden="true"></div>
<button class="totop" id="totop" aria-label="Back to top"><svg class="ring" viewBox="0 0 64 64" aria-hidden="true"><circle class="bg" cx="32" cy="32" r="29"/><circle class="fg" cx="32" cy="32" r="29" stroke-dasharray="182.2" stroke-dashoffset="182.2"/></svg><svg class="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
<div class="mbar" role="navigation" aria-label="Quick actions"><a href="${R}apply/online/">${icon('arrow')}Apply now</a><a href="tel:${site.tel}">${icon('phone')}Call</a><a href="${R}contact/">${icon('mail')}Enquire</a></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

const SHOW_SAMPLE = process.env.SHOW_SAMPLE_TAGS === '1';
const sampleTag = (x) => (SHOW_SAMPLE && x && x.sample ? '<span class="sample-tag">Sample</span>' : '');
const waLink = (msg = 'Hello UoME, I would like to know more about your programmes.') => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

// short enquiry form (home + programme pages). Wired by core.js [data-form][data-single]
function miniForm({ programme = '', id = 'q', title = 'Ask us <em>anything.</em>', text = 'Leave your details and an adviser will get back to you during office hours.' } = {}) {
  const opts = programmes.map((p) => `<option value="${p.slug}"${p.slug === programme ? ' selected' : ''}>${esc(p.short)}</option>`).join('');
  return `<div class="formcard formcard--mini" data-elementor="widget:form"><form class="form" data-form data-single novalidate>
    <h3 class="h3">${title}</h3><p class="small" style="margin:-4px 0 4px">${text}</p>
    <div class="row2"><div class="field"><label class="lab" for="${id}n">Name</label><input class="input" id="${id}n" name="name" autocomplete="name" required><span class="err"></span></div><div class="field"><label class="lab" for="${id}p">Phone or email</label><input class="input" id="${id}p" name="contact" autocomplete="tel" required><span class="err"></span></div></div>
    <div class="field"><label class="lab" for="${id}i">I’m interested in</label><select class="select" id="${id}i" name="programme"><option value="">Not sure yet</option>${opts}</select></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may contact me about this enquiry, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
    <div><button class="btn" type="submit">Send enquiry ${icon('arrow')}</button></div>
    <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Thank you — <em>we’ve got it.</em></h3><p>An adviser will be in touch during office hours (${esc(site.hours)}).</p></div>
  </form></div>`;
}

// video card: poster + play button; opens the shared player modal (core.js [data-video])
function videoCard(v, { big = false, label = '', cls = '' } = {}) {
  return `<button class="vcard ${big ? 'vcard--big' : ''} ${cls}" type="button" data-video="${esc(v.src)}" data-poster="${esc(v.poster)}" data-vtitle="${esc(v.title)}" aria-label="Play video: ${esc(v.title)}"><img src="${v.poster}" alt="" loading="lazy"><span class="vcard__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span><span class="vcard__cap">${label ? `<small>${esc(label)}</small>` : ''}<b>${esc(v.title)}</b></span>${sampleTag(v)}</button>`;
}

// FAQ list (accordion); cat filters to one category, limit trims
function faqList(cat, limit) {
  let items = require('./data').faqs.filter((f) => !cat || (Array.isArray(cat) ? cat.includes(f.cat) : f.cat === cat));
  if (limit) items = items.slice(0, limit);
  return items.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
}

function ctaBand(depth, o = {}) {
  const R = rel(depth);
  const eyebrow = o.eyebrow || 'Admissions are open';
  const title = o.title || 'Your next chapter <em>starts here.</em>';
  const text = o.text || 'Speak to our admissions team, book a campus visit, or start your application today — an adviser will get back to you during office hours.';
  const p = o.primary || ['Start your application', 'apply/online/'];
  const s = o.secondary || ['Request a callback', 'contact/#callback'];
  const href = (u) => (/^(https?:|mailto:|tel:)/.test(u) ? u : R + u);
  return `
<section class="cta" data-elementor="container:cta-band"><div class="wrap cta__in">
  <div><span class="eyebrow">${esc(eyebrow)}</span><h2 class="display">${title}</h2><p class="lede" style="margin-top:22px">${text}</p></div>
  <div class="cta__acts"><a class="btn btn--navy" href="${href(p[1])}">${esc(p[0])} ${icon('arrow')}</a><a class="btn btn--white" href="${href(s[1])}">${esc(s[0])} ${icon('arrow')}</a><small>Or call <a class="tel" href="tel:${site.tel}">${site.phone1}</a> · <a href="${waLink()}">WhatsApp</a><br>${esc(site.hours)}</small></div>
</div></section>`;
}

// "Where next?" strip — hands the visitor to the natural next page in their journey
function nextStrip(items, title = 'Where <em>next?</em>') {
  return `<section class="section section--soft nextstrip" data-elementor="container:next-step"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Keep going</span><h2 class="h2">${title}</h2></div>
  <div class="nstep">${items.map(([t, d, u], i) => `<a class="nstep__i" href="${u}" data-reveal style="--d:${i * 0.08}s"><span class="num">0${i + 1}</span><b>${esc(t)}</b><span class="small">${esc(d)}</span>${icon('arrow')}</a>`).join('')}</div>
</div></section>`;
}

function discountBar(depth) {
  const R = rel(depth);
  return `<aside class="disc" data-elementor="container:announcement"><div class="wrap disc__in"><b>Save 5%</b><span>Pay your tuition in full by the early-payment deadline and the discount applies automatically.</span><a href="${R}apply/#fees">See the fees estimator →</a></div></aside>`;
}

const FONTS = '<link rel="preload" as="font" type="font/woff2" href="${R}assets/fonts/montserrat.woff2" crossorigin><link rel="preload" as="font" type="font/woff2" href="${R}assets/fonts/sourcesans3.woff2" crossorigin>';

// bodies are authored as if the page sat at the site root; relative URLs are re-based for nested pages
function fixPaths(html, depth) {
  const R = '../'.repeat(depth);
  return html
    .replace(/(href|action)="(?!https?:|#|mailto:|tel:|\.\.\/|\/)([^"]*)"/g, `$1="${R}$2"`)
    .replace(/(src)="(?!https?:|data:|\.\.\/|\/)([^"]*)"/g, `$1="${R}$2"`);
}

function page({ path, title, desc, body, depth = 0, active = '', scripts = [], ogimg = 'grad-hall', schema = '', bodyClass = '', preload = '', preloadSet = '' }) {
  const R = rel(depth);
  const clip = (t, n) => (t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
  let full = title.includes('UoME') ? title : `${title} | UoME`;
  if (full.length > 62) full = clip(title, 62);
  desc = clip(desc, 158);
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:image" content="assets/img/${ogimg}-s.webp">
<meta name="theme-color" content="#a3162a">
<link rel="icon" type="image/png" href="${R}assets/img/logos/favicon.png">
${FONTS.replace(/\$\{R\}/g, R)}
${preload ? `<link rel="preload" as="image" href="${R}${preload}"${preloadSet ? ` imagesrcset="${preloadSet}" imagesizes="100vw"` : ''}>` : ''}
<link rel="stylesheet" href="${R}assets/css/main.min.css">
${schema ? `<script type="application/ld+json">${schema}</script>` : ''}
</head>
<body class="${bodyClass}" data-root="${R}">
<script>document.documentElement.classList.add('js');try{var n=+sessionStorage.getItem('uome.nav');if(n&&Date.now()-n<6000)document.documentElement.classList.add('no-pre');sessionStorage.removeItem('uome.nav')}catch(e){}</script>
<div class="pre" id="pre" aria-hidden="true"><div class="pre__in"><img class="pre__logo" src="${R}assets/img/logos/uome-white.png" alt="" width="290" height="76"><div class="pre__row"><span>Shaping tomorrow’s leaders</span><span class="pre__n" data-pre-n>0</span></div><div class="pre__bar"><i data-pre-bar></i></div></div></div><div class="pre-c" id="pre-c"></div>
${header(depth, active)}
<main id="main">
${(depth ? fixPaths(body, depth) : body).replace(/<span class="num">(?!\d)([^<]*)<\/span>/g, '<span class="num num--lbl">$1</span>')}
</main>
${footer(depth)}
<script src="${R}assets/js/uome-data.min.js"></script>
<script src="${R}assets/js/core.min.js"></script>
${scripts.map((s) => `<script src="${R}assets/js/${s}.min.js"></script>`).join('\n')}
</body>
</html>
`;
}

// reusable blocks -------------------------------------------------------
function pageHead({ crumbs, eyebrow, title, lede, image, depth = 0, extra = '' }) {
  const R = rel(depth);
  const c = crumbs.map(([t, u]) => (u ? `<li><a href="${R}${u}">${esc(t)}</a></li>` : `<li aria-current="page">${esc(t)}</li>`)).join('');
  return `<section class="phead ${image ? 'phead--img' : ''}" data-elementor="container:page-header">
  <div class="wrap phead__in"><div class="phead__copy"><ol class="crumbs" aria-label="Breadcrumb">${c}</ol>${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}<h1 class="h1">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}${extra}</div></div>
  ${image ? `<div class="phead__art" aria-hidden="true"><img src="${R}assets/img/${image}.webp" alt="" loading="eager"></div>` : ''}
</section>`;
}

const logoStrip = (depth, lab = 'Delivered with · Accredited by · Recognised by') => {
  const R = rel(depth);
  return `<section class="proof" data-elementor="container:logo-strip" aria-label="Partners and accreditation"><div class="wrap"><span class="proof__lab">${lab}</span><div class="proof__row">
  <div class="proof__item"><img src="${R}assets/img/logos/uol-navy.png" alt="University of Lancashire"></div>
  <div class="proof__item"><span class="proof__abbr">HEC</span><small>Higher Education Commission</small></div>
  <div class="proof__item"><span class="proof__abbr">QAA</span><small>UK quality framework</small></div>
  <div class="proof__item"><img src="${R}assets/img/logos/apm.png" alt="Association for Project Management" style="height:54px"></div>
  <div class="proof__item"><img src="${R}assets/img/logos/ciob.png" alt="Chartered Institute of Building" style="height:44px"></div>
  <div class="proof__item"><span class="proof__abbr">IDM</span><small>Institute of Data &amp; Marketing</small></div>
  <div class="proof__item"><span class="proof__abbr">CVLE</span><small>Council for Vocational Legal Education</small></div>
</div></div></section>`;
};

const tickerBand = (words, gold = true) => {
  const star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor"/></svg>';
  const row = words.map((w) => `<span class="ticker__item">${w}${star}</span>`).join('');
  return `<div class="ticker ${gold === true ? 'ticker--gold' : gold === 'red' ? 'ticker--red' : ''}" aria-hidden="true" data-elementor="widget:marquee"><div class="ticker__track">${row}${row}</div></div>`;
};

module.exports = { videoCard, faqList, sampleTag, waLink, miniForm, page, pageHead, ctaBand, nextStrip, discountBar, logoStrip, tickerBand, icon, esc, rel, byslug, progUrl, img, stars3 };
