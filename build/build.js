// node build/build.js — generates the static demo into /demo
const fs = require('fs');
const path = require('path');
const D = require('./data');
const L = require('./layout');

const OUT = path.join(__dirname, '..', 'demo');
const pages = [
  ...[require('./pages/home')()],
  ...require('./pages/programme')(),
  require('./pages/study')(),
  ...require('./pages/apply')(),
  require('./pages/international')(),
  ...require('./pages/life')(),
  ...require('./pages/others')(),
  ...require('./pages/outcomes')(),
  ...require('./pages/application')(),
  ...require('./pages/faq')(),
];

for (const p of pages) {
  const f = path.join(OUT, p.path);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, p.html);
}

// ---- client-side data -----------------------------------------------------
const quizTags = {
  'llb-english-mauritian-law': { goal: ['first'], field: ['law'], qual: ['school'], mode: ['ft'] },
  'llb-english-law': { goal: ['first'], field: ['law'], qual: ['school'], mode: ['ft'] },
  'graduate-diploma-in-law': { goal: ['switch'], field: ['law'], qual: ['degree-other', 'degree-law'], mode: ['ft', 'pt'] },
  'llm-financial-commercial-law': { goal: ['advance', 'specialise'], field: ['law', 'finance'], qual: ['degree-law', 'degree-other', 'degree-exp'], mode: ['pt'] },
  'msc-project-management': { goal: ['advance', 'switch'], field: ['pm'], qual: ['degree-other', 'degree-exp', 'degree-law'], mode: ['pt'] },
  'msc-construction-project-management': { goal: ['advance', 'specialise'], field: ['pm', 'construction'], qual: ['degree-other', 'degree-exp'], mode: ['pt'] },
  'msc-digital-marketing': { goal: ['advance', 'switch', 'specialise'], field: ['digital'], qual: ['degree-other', 'degree-exp', 'degree-law'], mode: ['pt'] },
};
const slim = D.programmes.map((p) => ({ slug: p.slug, title: p.title, short: p.short, area: p.area, areaLabel: p.areaLabel, level: p.level, levelLabel: p.levelLabel, durationLabel: p.durationLabel, mode: p.mode, modeKey: p.modeKey, intakeLabel: p.intakeLabel, intakes: p.intakes, award: p.award, url: L.progUrl(p), fee: p.fee, months: p.months, lede: p.lede, accred: D.accreditations.filter((a) => (a.programmes || []).includes(p.slug)).map((a) => a.abbr), entry: p.entry.local[0], quiz: quizTags[p.slug] }));
const search = [
  ...D.programmes.map((p) => ({ t: p.title, u: L.progUrl(p), k: 'Programme', x: `${p.areaLabel} ${p.levelLabel} ${p.lede} ${p.award}` })),
  { t: 'How to apply', u: 'apply/', k: 'Apply', x: 'application admissions steps offer letter checklist form documents' },
  { t: 'Fees & savings estimator', u: 'apply/#fees', k: 'Fees', x: 'tuition fees cost price instalment 5% discount mur gbp pay' },
  { t: 'Entry requirements', u: 'apply/#requirements', k: 'Apply', x: 'entry a-levels ielts degree 2:2 requirements' },
  { t: 'Refund policy', u: 'apply/#refund', k: 'Fees', x: 'refund withdraw withdrawal money back' },
  { t: 'Apply online', u: 'apply/online/', k: 'Apply', x: 'start your application apply now online form personal statement referees' },
  { t: 'Register your interest', u: 'apply/start/', k: 'Apply', x: 'enquire enquiry register interest' },
  { t: 'International students', u: 'international/', k: 'International', x: 'visa accommodation airport pick-up abroad overseas student' },
  { t: 'Cost of living in Mauritius', u: 'international/#cost', k: 'International', x: 'rent food budget living cost calculator' },
  { t: 'Student visa', u: 'international/#visa', k: 'International', x: 'visa passport sponsor immigration' },
  { t: 'Campus tour', u: 'life/#tour', k: 'Campus', x: 'ebene core building classroom library lab lunchroom facilities' },
  { t: 'Student support hub', u: 'life/student-support/', k: 'Support', x: 'extension blackboard complaints enrolment finance help' },
  { t: 'Student stories', u: 'life/stories/', k: 'Life', x: 'testimonial story student digital marketing yaniish' },
  { t: 'Alumni', u: 'life/alumni/', k: 'Life', x: 'alumni graduates network barrister attorney' },
  { t: 'Accreditation & recognition', u: 'careers-accreditation/', k: 'Quality', x: 'apm ciob idm cvle hec qaa accredited recognised' },
  { t: 'About UoME', u: 'about/', k: 'About', x: 'history story university of lancashire partnership leadership board' },
  { t: 'Schools, colleges & employers', u: 'partners/', k: 'Partners', x: 'taster lecture school college employer fair road show' },
  { t: 'Events & visits', u: 'events/', k: 'Events', x: 'open day fair expo visit taster lecture counselling' },
  { t: 'Gallery', u: 'gallery/', k: 'Life', x: 'photos graduation images' },
  { t: 'Careers & outcomes', u: 'outcomes/', k: 'Careers', x: 'jobs employers sectors graduates stories careers support routes' },
  { t: 'For parents', u: 'parents/', k: 'Parents', x: 'parent guardian recognised fees support safe campus visit' },
  { t: 'FAQs', u: 'faq/', k: 'Help', x: 'frequently asked questions help how do I apply documents fees visa accommodation refund instalments' },
  { t: 'Contact', u: 'contact/', k: 'Contact', x: 'phone email address map hours location' },
  ...D.news.map((n) => ({ t: n.title, u: `news/${n.slug}/`, k: 'Guide', x: n.dek })),
];
const clientData = { site: D.site, programmes: slim, fees: D.fees, instalmentDates: D.instalmentDates, intakes: D.intakes, costOfLiving: D.costOfLiving, search };
fs.mkdirSync(path.join(OUT, 'assets/js'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'assets/js/uome-data.js'), 'window.UOME=' + JSON.stringify(clientData) + ';');

// ---- sitemap & robots -----------------------------------------------------
const base = 'https://uomenterprise.mu/';
const urls = pages.filter((p) => p.path !== '404.html').map((p) => base + p.path.replace(/index\.html$/, ''));
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);

// stand-in content report
const samples = [];
(function scan(name, arr) { (arr || []).forEach((x) => { if (x && x.sample) samples.push(name + ': ' + (x.name || x.title || x.id || x.slug)); }); })('story', D.sampleStories);
D.sectors.forEach((x) => x.sample && samples.push('sector: ' + x.title));
Object.values(D.videos).forEach((v) => samples.push('video: ' + v.title + ' (placeholder slideshow)'));
samples.push('site.whatsapp (stand-in number ' + D.site.whatsappLabel + ')');
// minified assets (esbuild); pages link the .min files, sources stay editable
try {
  const esbuild = require('esbuild');
  const out = (f, o) => esbuild.buildSync({ entryPoints: [path.join(OUT, f)], outfile: path.join(OUT, o), minify: true, allowOverwrite: true, logLevel: 'error' });
  out('assets/css/main.css', 'assets/css/main.min.css');
  ['core', 'finder', 'estimator', 'application', 'uome-data'].forEach((n) => out(`assets/js/${n}.js`, `assets/js/${n}.min.js`));
} catch (e) { console.warn('esbuild not installed — run `npm install` to emit minified assets'); }
console.log(`Built ${pages.length} pages`);
console.log(`Stand-in content to replace (${samples.length}):\n  - ` + samples.join('\n  - '));
