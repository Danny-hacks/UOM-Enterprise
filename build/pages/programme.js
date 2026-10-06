const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl, byslug } = L;

const mur = (n) => 'Rs ' + n.toLocaleString('en-GB');
const gbp = (n) => '£' + n.toLocaleString('en-GB');
const FACT = {
  'llb-english-mauritian-law': 'factsheet-llb-english-mauritian-law.pdf',
  'graduate-diploma-in-law': 'factsheet-graduate-diploma-in-law.pdf',
  'llm-financial-commercial-law': 'factsheet-llm-financial-commercial-law.pdf',
  'msc-project-management': 'factsheet-msc-project-management.pdf',
  'msc-construction-project-management': 'factsheet-msc-construction-project-management.pdf',
  'msc-digital-marketing': 'factsheet-msc-digital-marketing.pdf',
};

function feeBlock(p, R) {
  const f = D.fees[p.fee];
  const variants = f.variants || [{ id: 'main', label: '', unit: f.unit, mur: f.mur, gbp: f.gbp, inst: f.inst, instGbp: f.instGbp }];
  const rows = variants.map((v) => {
    const intakes = Object.entries(v.inst).map(([k, arr]) => [k, arr, v.instGbp ? v.instGbp[k] : null]);
    const names = { sep: 'September intake', feb: 'February intake', jan: 'January intake' };
    const sched = intakes.map(([k, arr, g]) => {
      const dates = p.fee === 'gdl' && k === 'jan' ? ['On acceptance of offer', 'By 31 August'] : D.instalmentDates[k];
      return `<div style="margin-top:22px"><h3 class="lab" style="margin-bottom:6px">${names[k] || ''}</h3><table class="reftable"><tbody>${arr.map((a, i) => (a ? `<tr><td>${i + 1}. ${dates[i]}</td><td>${mur(a)}${g ? ` <span class="small" style="font-family:var(--sans);font-size:.85rem"> · ${gbp(g[i])}</span>` : ''}</td></tr>` : '')).join('')}</tbody></table></div>`;
    }).join('');
    return `<div class="tile" style="border-top-color:var(--gold)">${v.label ? `<span class="tag" style="margin-bottom:12px">${esc(v.label)}</span>` : ''}<div style="display:flex;flex-wrap:wrap;gap:6px 36px;align-items:baseline"><div><span class="lab">Local students</span><span class="h2" style="font-size:2.4rem">${mur(v.mur)}</span><small class="small"> ${esc(v.unit)}</small></div><div><span class="lab">International</span><span class="h2" style="font-size:2.4rem">${v.gbp ? gbp(v.gbp) : 'On request'}</span>${v.gbp ? `<small class="small"> ${esc(v.unit)}</small>` : ''}</div></div>${sched}</div>`;
  }).join('');
  return `<div class="grid" style="gap:20px">${rows}</div>
  <div class="notice" style="margin-top:22px"><b>Save 5%.</b> Local students who pay full fees by the early-payment deadline receive a 5% discount; international students receive 5% when full fees are paid on enrolment. Local payments: cheque, banker’s cheque or transfer to SBM. International: bank transfer only.</div>
  <p style="margin-top:20px"><a class="btn btn--navy" href="${R}apply/?programme=${p.slug}#fees">Open the fees estimator ${icon('arrow')}</a></p>`;
}

function build(p) {
  const depth = 3;
  const R = '../../../';
  const acc = (p.accred || []).map((id) => D.accreditations.find((a) => a.id === id)).filter(Boolean);
  const accAll = D.accreditations.filter((a) => (a.programmes || []).includes(p.slug));
  const badges = accAll.map((a) => `<span class="badge">${icon('award')}${esc(a.abbr)} ${a.id === 'cvle' ? 'recognised' : 'accredited'}</span>`).join('');
  const mods = p.modules ? `<div class="mods ${p.modules.length >= 3 ? 'mods--3' : p.modules.length === 2 ? 'mods--2' : ''}">${p.modules.map(([h, l]) => `<div class="mod" data-reveal><h3>${esc(h)}</h3><ul>${l.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div>`).join('')}</div>${p.modulesNote ? `<p class="small" style="margin-top:18px">${esc(p.modulesNote)}</p>` : ''}` : `<div class="notice">${esc(p.modulesNote)} <a href="${R}contact/?topic=factsheet&programme=${p.slug}"><b>Request the syllabus →</b></a></div>`;
  const rel = p.related.map((s) => byslug(s)).filter(Boolean).slice(0, 3).map((q) => `<a class="rcard" href="${R}${progUrl(q)}" data-reveal><div class="media"><img src="${R}assets/img/${q.img}-s.webp" alt="" loading="lazy"></div><small>${esc(q.levelLabel)} · ${esc(q.durationLabel)}</small><h3>${esc(q.title)}</h3></a>`).join('');
  const doc = FACT[p.slug];
  const factBtn = doc ? `<a class="btn btn--ghost-light" href="${R}assets/docs/${doc}" download>Download factsheet ${icon('arrow')}</a>` : `<a class="btn btn--ghost-light" href="${R}contact/?topic=factsheet&programme=${p.slug}">Request the factsheet ${icon('arrow')}</a>`;

  const body = `
<section class="phead phead--img" data-elementor="container:course-hero">
  <div class="wrap phead__in"><div class="phead__copy">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="${R}">Home</a></li><li><a href="${R}study/">Study</a></li><li><a href="${R}study/?area=${p.area}">${esc(p.areaLabel)}</a></li><li aria-current="page">${esc(p.short)}</li></ol>
    <span class="eyebrow">${esc(p.levelLabel)} · ${esc(p.award)}</span>
    <h1 class="h1">${esc(p.title)}${p.sub ? `<span class="h1__sub">${esc(p.sub)}</span>` : ''}</h1>
    <p class="lede">${esc(p.lede)}</p>
    ${badges ? `<div class="badges">${badges}</div>` : ''}
  </div></div>
  <div class="phead__art" aria-hidden="true"><img src="${R}assets/img/${p.hero}.webp" alt="" loading="eager"></div>
</section>
<div class="factbar"><div class="wrap chero__facts">
  <div class="fact"><small>Duration</small><b>${esc(p.durationLabel)}</b></div>
  <div class="fact"><small>Study mode</small><b>${esc(p.mode)}</b></div>
  <div class="fact"><small>Intakes</small><b>${esc(p.intakeLabel)}</b></div>
  <div class="fact"><small>Awarded by</small><b>University of Lancashire</b></div>
  <div class="fact"><small>Campus</small><b>The Core Building, Ebene</b></div>
</div></div>

<nav class="subnav" aria-label="On this page" data-subnav><div class="wrap subnav__in">
  <a href="#overview">Overview</a><a href="#why">Why this programme</a><a href="#structure">Structure</a><a href="#careers">Careers</a><a href="#entry">Entry requirements</a><a href="#fees">Fees</a><a href="#apply">How to apply</a><a href="#faqs">FAQs</a>
</div></nav>

<div class="wrap cbody">
  <div>
    <section id="overview" data-elementor="container:course-overview">
      <span class="eyebrow">Overview</span><h2 class="h2">${esc(p.tagline)}</h2>
      <div class="prose">${p.overview.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
    </section>

    <section id="why" data-elementor="container:course-why">
      <span class="eyebrow">Why this programme</span><h2 class="h2">What sets it <em>apart.</em></h2>
      <div class="whys">${p.why.map(([h, t], i) => `<div class="why" data-reveal><span class="num" style="font-size:1.6rem">0${i + 1}</span><div><h3>${esc(h)}</h3><p>${esc(t)}</p></div></div>`).join('')}</div>
    </section>

    <section id="structure" data-elementor="container:course-structure">
      <span class="eyebrow">Programme structure</span><h2 class="h2">What you’ll <em>study.</em></h2>
      ${mods}
      <h3 class="h3" style="margin:44px 0 12px">How you’re assessed</h3><p class="prose">${esc(p.assessment)}</p>
    </section>

    <section id="careers" data-elementor="container:course-careers">
      <span class="eyebrow">Careers &amp; next steps</span><h2 class="h2">Where it can <em>take you.</em></h2>
      <ul class="checks">${p.careers.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
      <div class="notice" style="margin-top:26px">${esc(p.careersNote)}</div>
      ${accAll.length ? `<div style="margin-top:36px"><h3 class="h3" style="margin-bottom:14px">Accreditation &amp; recognition</h3>${accAll.map((a) => `<p><b>${esc(a.name)} (${esc(a.abbr)}).</b> ${esc(a.what)}</p>`).join('')}<a class="link-arrow" href="${R}careers-accreditation/">How accreditation works ${icon('arrow')}</a></div>` : ''}
    </section>

    <section id="entry" data-elementor="container:course-entry">
      <span class="eyebrow">Entry requirements</span><h2 class="h2">Who can <em>apply.</em></h2>
      <div class="tabs" role="tablist" data-tabs><button class="chip is-on" role="tab" aria-selected="true" data-t="local">Local applicants</button><button class="chip" role="tab" aria-selected="false" data-t="intl">International applicants</button></div>
      <div class="tabpanel is-on" data-p="local"><ul class="checks">${p.entry.local.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>
      <div class="tabpanel" data-p="intl"><ul class="checks">${p.entry.international.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>
      <p class="small" style="margin-top:20px">${esc(p.entry.note)}</p>
    </section>

    <section id="fees" data-elementor="container:course-fees">
      <span class="eyebrow">Fees</span><h2 class="h2">Clear, published <em>tuition.</em></h2>
      ${feeBlock(p, R)}
    </section>

    <section id="apply" data-elementor="container:course-apply">
      <span class="eyebrow">How to apply</span><h2 class="h2">Four steps to <em>your offer.</em></h2>
      <div class="whys">
        <div class="why"><span class="num" style="font-size:1.6rem">01</span><div><h3>Submit your application</h3><p>Complete the application form with your personal statement and certificates, with ${p.level === 'undergraduate' ? 'one referee' : 'two referees'}. Local applicants pay the Rs 1,000 application fee; it is waived for international students.</p></div></div>
        <div class="why"><span class="num" style="font-size:1.6rem">02</span><div><h3>Receive your offer</h3><p>If selected, you receive a letter of offer within 3 working days of a complete application (within 1 week for international applicants).</p></div></div>
        <div class="why"><span class="num" style="font-size:1.6rem">03</span><div><h3>Accept &amp; confirm your seat</h3><p>Email ${esc(D.site.supportEmail)} to accept, then make the first payment — 50% of annual or total course fees — to confirm your place.</p></div></div>
        <div class="why"><span class="num" style="font-size:1.6rem">04</span><div><h3>Begin your studies</h3><p>International students: your student visa is processed once the first payment is received. Welcome to UoME.</p></div></div>
      </div>
    </section>

    <section id="faqs" data-elementor="container:course-faq">
      <span class="eyebrow">FAQs</span><h2 class="h2">Good <em>questions.</em></h2>
      <div>${p.faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    </section>
  </div>

  <aside class="aside" aria-label="Programme summary">
    <div class="aside__card">
      <span class="eyebrow" style="color:var(--gold-2)">Ready?</span>
      <h3>Apply or ask</h3>
      <a class="btn btn--gold" href="${R}apply/start/?programme=${p.slug}">Apply now ${icon('arrow')}</a>
      <a class="btn btn--ghost-light" href="${R}apply/start/?programme=${p.slug}&enquire=1">Ask a question ${icon('arrow')}</a>
      ${factBtn}
      <button class="btn btn--ghost-light" data-shortlist="${p.slug}" aria-pressed="false">${icon('compare')}<span>Add to compare</span></button>
    </div>
    <div class="aside__help"><b>Talk to a person.</b><br>Call <a href="tel:${D.site.tel}">${D.site.phone1}</a> or <a href="mailto:${D.site.email}">email admissions</a>.<br><span class="small">${esc(D.site.hours)}</span></div>
  </aside>
</div>

<section class="section" data-elementor="container:graduate-voice"><div class="wrap split split--top">
  <div><span class="eyebrow">Why it matters</span><h2 class="h2">What studying this <em>can mean for you.</em></h2>
    ${(() => { const O = require('./outcomes'); const m = O.allStories().filter((x) => x.programme === p.slug)[0] || D.sampleStories.filter((x) => x.area === p.area)[0] || D.sampleStories[0]; return O.storyCard(m).replace('<article class="scard"', '<article class="scard scard--wide" style="margin-top:28px"'); })()}
  </div>
  ${L.miniForm({ programme: p.slug, id: 'pq', title: `Ask about <em>${esc(p.short)}.</em>` })}
</div></section>

<section class="section section--paper2" data-elementor="container:related"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Keep exploring</span><h2 class="h2">Related <em>programmes.</em></h2></div>
  <div class="related">${rel}</div>
</div></section>

${L.ctaBand(depth, { title: `Ready to apply for <em>${esc(p.short)}?</em>`, text: 'Register your interest in two minutes — or ask an adviser about entry requirements, fees and intakes.', primary: ['Apply now', 'apply/start/?programme=' + p.slug], secondary: ['Ask a question', 'apply/start/?programme=' + p.slug + '&enquire=1'] })}
`;
  const schema = JSON.stringify([{ '@context': 'https://schema.org', '@type': 'Course', name: p.title, description: p.lede, provider: { '@type': 'EducationalOrganization', name: 'UOM Enterprise Ltd', sameAs: 'https://uomenterprise.mu/' } }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }]);
  return { path: `${progUrl(p)}index.html`, html: L.page({ depth, active: 'study', title: `${p.title}${p.sub ? ' ' + p.sub : ''}`, desc: `${p.lede} ${p.durationLabel}, ${p.mode.toLowerCase()}, University of Lancashire award, Ebene, Mauritius.`, body, scripts: [], ogimg: p.hero, schema }) };
}

module.exports = () => D.programmes.map(build);
