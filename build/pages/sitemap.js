// Visual site map for client review — every page in the demo, generated from the same data as the site.
const D = require('../data');
const L = require('../layout');
const { esc, progUrl } = L;

const AREAS = [
  ['law', 'Law'],
  ['pm', 'Business & Management'],
  ['digital', 'Digital Marketing'],
];

function sitemapPage() {
  const link = (href, label, note = '') => ({ href, label, note });
  const stories = [...D.stories, ...D.sampleStories];

  const groups = [
    { title: 'Main pages', items: [
      link('', 'Home'),
      link('about/', 'About UoME'),
      link('international/', 'International students'),
      link('parents/', 'Parents'),
      link('outcomes/', 'Careers & outcomes'),
      link('careers-accreditation/', 'Accreditation & recognition'),
      link('partners/', 'Schools, colleges & employers'),
      link('events/', 'Events & visits'),
      link('gallery/', 'Gallery'),
      link('faq/', 'FAQs'),
      link('contact/', 'Contact'),
      link('search/', 'Search'),
      link('legal/', 'Privacy, cookies & legal'),
    ] },
    { title: 'Study', items: [
      link('study/', 'Course finder', 'all programmes, quiz and compare'),
      ...AREAS.flatMap(([area, label]) => [
        { heading: label },
        ...D.programmes.filter((p) => p.area === area).map((p) => link(progUrl(p), p.title)),
      ]),
    ] },
    { title: 'Apply', items: [
      link('apply/', 'How to apply', 'fees, entry requirements, refund policy'),
      link('apply/start/', 'Register your interest'),
      link('apply/online/', 'Apply online'),
    ] },
    { title: 'Student life', items: [
      link('life/', 'Life at UoME', 'campus and community'),
      link('life/student-support/', 'Student support'),
      link('life/alumni/', 'Alumni'),
      link('life/stories/', 'Student stories'),
      ...stories.map((s) => ({ ...link(`life/stories/${s.slug}/`, s.name || s.title), sub: true, note: s.sample ? 'example story, to be replaced' : '' })),
    ] },
    { title: 'News & guides', items: [
      link('news/', 'News & guides'),
      ...D.news.map((n) => ({ ...link(`news/${n.slug}/`, n.title), sub: true })),
    ] },
    { title: 'Other', items: [
      link('404.html', 'Page not found (404)', 'shown for broken links'),
    ] },
  ];

  const total = groups.reduce((n, g) => n + g.items.filter((i) => i.href !== undefined).length, 0);

  const li = (i) => i.heading
    ? `<li class="sm__h">${esc(i.heading)}</li>`
    : `<li class="${i.sub ? 'sm__sub' : ''}"><a href="${i.href}">${esc(i.label)}</a>${i.note ? ` <span class="sm__note">${esc(i.note)}</span>` : ''}</li>`;

  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Site map', null]], eyebrow: 'Site map', title: 'Every page, <em>in one place.</em>', lede: `All ${total} pages in the current build, including the ones that are not in the main menu. Click any page to open it.` })}
<style>
.sm{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px}
.sm__card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:28px 28px 20px}
.sm__card h2{font-size:1.5rem;margin:0 0 6px}
.sm__count{font-size:.85rem;color:var(--ink-soft,#5a5f7a);margin:0 0 14px}
.sm ul{list-style:none;margin:0;padding:0}
.sm li{padding:8px 0;border-bottom:1px solid var(--line)}
.sm li:last-child{border-bottom:0}
.sm a{font-weight:600;color:var(--crimson);text-decoration:none}
.sm a:hover{text-decoration:underline}
.sm__sub{padding-left:18px}
.sm__sub a{font-weight:500}
.sm__h{font-size:.95rem;color:var(--gold-deep);font-weight:700;padding-top:16px!important}
.sm__note{display:block;font-size:.85rem;color:var(--ink-soft,#5a5f7a);font-weight:400}
</style>
<section class="section"><div class="wrap">
  <div class="sm">
${groups.map((g) => {
    const n = g.items.filter((i) => i.href !== undefined).length;
    return `    <div class="sm__card"><h2 class="h2">${esc(g.title)}</h2><p class="sm__count">${n} page${n === 1 ? '' : 's'}</p><ul>${g.items.map(li).join('')}</ul></div>`;
  }).join('\n')}
  </div>
</div></section>`;

  return { path: 'sitemap/index.html', html: L.page({ depth: 1, title: 'Site map', desc: 'Every page in the UoME website build, in one place.', body, scripts: [] }) };
}

module.exports = sitemapPage;
