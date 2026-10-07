const D = require('../data');
const L = require('../layout');
const { icon, esc } = L;

function faqPage() {
  const cats = [...new Set(D.faqs.map((f) => f.cat))];
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['FAQs', null]], eyebrow: 'Help centre', title: 'Frequently asked <em>questions.</em>', lede: 'Applying, fees, studying, international students and campus life — answered from UoME’s published information.', image: 'campus-classroom' })}
<section class="section" data-elementor="container:faq-page"><div class="wrap split split--wide-r split--top">
  <aside class="stickycol faqnav"><div class="field"><label class="lab" for="fq">Search the FAQs</label><input class="input" id="fq" type="search" placeholder="e.g. visa, fees, documents…" data-faq-search></div>
    <div class="plist__filters" role="group" aria-label="Filter by topic" data-faq-cats style="margin-top:18px"><button class="chip is-on" data-f="all" aria-pressed="true">All</button>${cats.map((c) => `<button class="chip" data-f="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div>
    <div class="aside__help" style="margin-top:26px"><b>Can’t find it?</b><br>Call <a href="tel:${D.site.tel}">${D.site.phone1}</a>, <a href="${L.waLink()}">WhatsApp us</a> or <a href="contact/">contact us</a>.</div></aside>
  <div data-faq-list>${cats.map((c) => `<section class="faqgroup" data-cat="${esc(c)}"><h2 class="h3 faqgroup__h">${esc(c)}</h2>${L.faqList(c)}</section>`).join('')}<p class="small" data-faq-empty hidden>No matching questions. Try another word, or call ${D.site.phone1}.</p></div>
</div></section>
${L.ctaBand(0, { title: 'Ready to <em>take the next step?</em>', text: 'Apply online in about ten minutes, or talk to an adviser first.', primary: ['Apply online', 'apply/online/'], secondary: ['Book a campus visit', 'events/#visit'] })}
`;
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: D.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  return { path: 'faq/index.html', html: L.page({ depth: 1, active: 'apply', title: 'FAQs — applying, fees, studying and campus life', desc: 'Answers to the most common questions about applying to UoME, fees and instalments, studying, international students and the Ebene campus.', body, scripts: [], schema }) };
}

module.exports = () => [faqPage()];
