const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl, byslug } = L;

const allStories = () => [...D.stories.map((s) => ({ ...s, real: true })), ...D.sampleStories];
const mono = (s) => (s.init || s.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')).toUpperCase();

// story card used on Outcomes, Stories and programme pages
function storyCard(s, i = 0) {
  const p = byslug(s.programme);
  const img = s.real ? `<div class="scard__img"><img src="assets/img/${s.img}-s.webp" alt="${esc(s.name)}" loading="lazy"></div>` : `<div class="scard__img scard__img--mono" role="img" aria-label="Portrait placeholder"><span aria-hidden="true">${esc(mono(s))}</span></div>`;
  return `<article class="scard" data-area="${esc(s.area || (p && p.area) || '')}" data-reveal style="--d:${(i % 3) * 0.08}s">${img}<div class="scard__b">${L.sampleTag(s)}<blockquote>${esc(s.short ? s.short : s.quote.length > 190 ? s.quote.slice(0, 187).replace(/\s+\S*$/, '') + '…' : s.quote)}</blockquote><div class="scard__who"><b>${esc(s.name)}</b><span>${esc(s.course)}${s.year ? ' · ' + esc(s.year) : s.yearLabel ? ' · ' + esc(s.yearLabel) : ''}</span>${s.outcome ? `<em class="scard__out">${esc(s.outcome)}</em>` : ''}</div><a class="link-arrow" href="life/stories/${s.slug}/">Read their story ${icon('arrow')}</a></div></article>`;
}

function outcomesPage() {
  const stories = allStories();
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Careers & outcomes', null]], eyebrow: 'Why UoME', title: 'A degree that <em>moves your career.</em>', lede: 'See where UoME programmes can take you — the professions they lead to, the people who have taken them, and the support that gets you there.', image: 'grad-hall', extra: `<div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap"><a class="btn" href="study/">Find your programme ${icon('arrow')}</a><a class="btn btn--ghost" href="#stories">Read graduate stories</a></div>` })}

<section class="section--tight glance" data-elementor="container:outcomes-stats"><div class="wrap"><div class="stats">
  <div class="stat"><b data-count="900">900<sup>+</sup></b><span>graduates building careers in Mauritius and beyond</span></div>
  <div class="stat"><b data-count="100">100<sup>+</sup></b><span>LLB and GDL graduates now practising as Barristers and Attorneys</span></div>
  <div class="stat"><b>3</b><span>professional bodies accrediting our MSc programmes: APM, CIOB, IDM</span></div>
  <div class="stat"><b>2</b><span>jurisdictions open to LLB graduates: England &amp; Wales and Mauritius</span></div>
</div></div></section>

<section class="section" id="sectors" data-elementor="container:sectors"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Where graduates work</span><h2 class="h2">Six sectors, <em>many routes.</em></h2><p class="lede" style="margin-top:14px">Typical routes into each sector from UoME programmes. Select a sector to see the programmes behind it.</p></div>
  <div class="sectors">${D.sectors.map((s, i) => `<article class="sector" data-reveal style="--d:${(i % 3) * 0.07}s"><span class="num">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><ul class="routes">${s.routes.map((r) => `<li>${esc(r)}</li>`).join('')}</ul><p class="sector__p">${s.programmes.map((slug) => { const q = byslug(slug); return `<a href="${progUrl(q)}">${esc(q.short)}</a>`; }).join('')}</p></article>`).join('')}</div>
  <p class="fn" style="margin-top:26px">Sectors and routes are illustrative of where UoME programmes typically lead and are not employment statistics.</p>
</div></section>

<section class="section section--navy" id="law-route" data-elementor="container:law-route"><div class="wrap">
  <div class="split split--head"><div><span class="eyebrow">The route to the Bar</span><h2 class="h2">One degree, <em>two jurisdictions.</em></h2></div><p class="lede" style="margin:0">Whatever your starting point, here is how UoME law programmes connect to practice in England &amp; Wales and in Mauritius.</p></div>
  <div class="route__flow">
    <div class="node"><small>01 · Study at UoME</small><h3>LLB or GDL</h3><p>LLB (Hons) with English &amp; Mauritian Law or English Law; or the Graduate Diploma in Law if your first degree is in another subject.</p></div>
    <div class="arrow-c">${icon('arrow')}</div>
    <div class="node"><small>02 · Professional training</small><h3>Choose your jurisdiction</h3><div class="node__split"><div><b>England &amp; Wales</b>Bar Professional Course (barristers) or Legal Practice Course (solicitors)</div><div><b>Mauritius</b>CVLE vocational examination</div></div></div>
    <div class="arrow-c">${icon('arrow')}</div>
    <div class="node node--end"><small>03 · Practise</small><h3>Barrister, solicitor or attorney</h3><p>Over 100 UoME LLB and GDL graduates are now practising Barristers and Attorneys.</p></div>
  </div>
  <p style="margin-top:28px"><a class="link-arrow" href="study/?area=law" style="color:#fff">Explore law programmes ${icon('arrow')}</a></p>
</div></section>

<section class="section" id="stories" data-elementor="container:graduate-stories"><div class="wrap">
  <div class="sec-head sec-head--row"><div><span class="eyebrow">Graduate stories</span><h2 class="h2">In their <em>own words.</em></h2></div><a class="link-arrow" href="life/stories/">All stories ${icon('arrow')}</a></div>
  <div class="scards">${stories.slice(0, 3).map(storyCard).join('')}</div>
</div></section>

<section class="section section--soft" id="support" data-elementor="container:careers-support"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Careers support</span><h2 class="h2">Help that goes <em>beyond the classroom.</em></h2></div>
  <div class="tiles tiles--3 tiles--badge">${D.careersSupport.map(([t, d], i) => `<div class="tile"><span class="num">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
</div></section>

${L.ctaBand(0, { title: 'Start building <em>your next chapter.</em>', text: 'Tell us where you want your career to go and an adviser will suggest the programme and route.', primary: ['Find your programme', 'study/'], secondary: ['Talk to an adviser', 'contact/'] })}
`;
  return { path: 'outcomes/index.html', html: L.page({ depth: 1, active: 'outcomes', title: 'Careers & outcomes — where UoME can take you', desc: 'See the sectors and professions UoME programmes lead to, graduate stories, the route to the Bar and the careers support available.', body, scripts: [], ogimg: 'grad-hall' }) };
}

function parentsPage() {
  const faqs = [
    ['Is a UoME degree properly recognised?', 'UoME is registered with the Higher Education Commission in Mauritius, every programme is accredited by the HEC, and all University of Lancashire courses delivered in Mauritius are recognised under the UK system regulated by the QAA. The LLB and GDL are also recognised by the CVLE for the vocational examination in Mauritius.'],
    ['Will my child be supported?', 'A student support team helps with extensions, mitigating circumstances, enrolment, Blackboard and complaints, and a finance team handles payment questions. Students are encouraged to contact the team for anything that may affect their studies.'],
    ['How are fees paid?', 'Fees are published in Mauritian rupees and are paid in three instalments; the first confirms the place. A 5% discount applies when full fees are paid by the early-payment deadline. Payment can be made by office cheque, banker’s cheque or bank transfer to SBM.'],
    ['Where is the campus and how easy is it to reach?', 'On the first floor of The Core Building in Ebene Cybercity, opposite the Ebene Commercial Centre. A mall, pharmacy and food court are within walking distance and the metro station is about ten minutes away on foot. Students benefit from free bus transport to and from the university under government support programmes.'],
    ['What can my child do afterwards?', 'The LLB leads to the Bar Professional Course, the Legal Practice Course or the CVLE examination. Postgraduate programmes in project management, construction and digital marketing carry professional accreditation. See Careers & outcomes for typical routes.'],
    ['Can we visit first?', 'Yes. The team offers open days, taster lectures and one-to-one counselling for students and parents — book a visit or call during office hours.'],
  ];
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['For parents', null]], eyebrow: 'Parents & guardians', title: 'Choosing a degree <em>together.</em>', lede: 'Straight answers on recognition, fees, support and what your child can do next — so the decision feels clear for everyone.', image: 'campus-atrium', extra: `<div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap"><a class="btn" href="events/#visit">Book a visit ${icon('arrow')}</a><a class="btn btn--ghost" href="contact/">Talk to an adviser</a></div>` })}

<section class="section" data-elementor="container:parent-reassurance"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">What matters most</span><h2 class="h2">Four things <em>parents ask first.</em></h2></div>
  <div class="tiles">
    <div class="tile"><span class="num">01</span><h3>Recognised qualifications</h3><p>University of Lancashire awards, HEC-accredited programmes and QAA-regulated UK standards.</p></div>
    <div class="tile"><span class="num">02</span><h3>Clear, published fees</h3><p>Three instalments, an early-payment saving and a refund policy set out in advance.</p></div>
    <div class="tile"><span class="num">03</span><h3>Support when it counts</h3><p>A dedicated student support team and a finance team to talk to.</p></div>
    <div class="tile"><span class="num">04</span><h3>Study close to home</h3><p>A central Ebene campus, metro nearby and free student bus travel.</p></div>
  </div>
</div></section>

<section class="section section--soft" data-elementor="container:parent-faq"><div class="wrap split split--wide-r split--top">
  <div><span class="eyebrow">Questions</span><h2 class="h2">Good questions, <em>honest answers.</em></h2><p class="lede" style="margin-top:16px">Still unsure? Speak to an adviser — parents are welcome on every call and visit.</p></div>
  <div>${faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</div></section>

<section class="section" data-elementor="container:parent-programmes"><div class="wrap">
  <div class="sec-head sec-head--row"><div><span class="eyebrow">For school-leavers</span><h2 class="h2">Where your child could <em>start.</em></h2></div><a class="link-arrow" href="study/?level=undergraduate">All undergraduate programmes ${icon('arrow')}</a></div>
  <div class="related">${['llb-english-mauritian-law', 'llb-english-law'].map((s) => { const q = byslug(s); return `<a class="rcard" href="${progUrl(q)}" data-reveal><div class="media"><img src="assets/img/${q.img}-s.webp" alt="" loading="lazy"></div><small>${esc(q.levelLabel)} · ${esc(q.durationLabel)}</small><h3>${esc(q.title)}</h3></a>`; }).join('')}</div>
</div></section>

${L.ctaBand(0, { title: 'Come and <em>see it together.</em>', text: 'Book a campus visit, a taster lecture or a conversation with an adviser.', primary: ['Book a visit', 'events/#visit'], secondary: ['Book a campus visit', 'events/#visit'] })}
`;
  return { path: 'parents/index.html', html: L.page({ depth: 1, active: 'about', title: 'For parents and guardians', desc: 'Answers for parents on recognition, fees, student support, campus location and what happens after graduation at UoME.', body, scripts: [] }) };
}

function storyPage(s) {
  const p = byslug(s.programme);
  const others = allStories().filter((x) => x.slug !== s.slug).slice(0, 3);
  const qa = s.real ? [['Why this programme?', s.quote], ...s.more.map((m, i) => [i === 0 ? 'What stood out?' : 'What has changed?', m])] : s.qa;
  const area = p ? p.area : s.area;
  const art = s.real ? `<div class="story__img"><div class="arch"><img src="assets/img/${s.img}.webp" alt="${esc(s.name)}" width="800" height="800"></div></div>` : `<div class="story__img"><div class="arch arch--mono" role="img" aria-label="Portrait placeholder"><span aria-hidden="true">${esc(mono(s))}</span></div></div>`;
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Life at UoME', 'life/'], ['Student stories', 'life/stories/'], [s.name, null]], eyebrow: `${s.course}`, title: `${esc(s.name)}: <em>${esc(s.outcome || 'in their own words')}.</em>`, lede: '' })}
<section class="section" data-elementor="container:story-detail"><div class="wrap">
  <div class="story">${art}<div><blockquote class="quote" style="margin:0 0 8px">${esc(s.quote)}</blockquote><div class="cite"><b>${esc(s.name)}</b><span>${esc(s.course)}${s.year ? ' · ' + esc(s.year) : s.yearLabel ? ' · ' + esc(s.yearLabel) : ''}</span></div>${L.sampleTag(s)}</div></div>
  <div class="qa">${qa.map(([q, a]) => `<div class="qa__i" data-reveal><h2 class="h3">${esc(q)}</h2><p>${esc(a)}</p></div>`).join('')}</div>
  ${p ? `<div class="routebox" data-reveal><div><span class="eyebrow">Their programme</span><h2 class="h3" style="margin:0 0 8px">${esc(p.title)}</h2><p class="small" style="margin:0">${esc(p.durationLabel)} · ${esc(p.mode)} · Intakes: ${esc(p.intakeLabel)}</p></div><div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="${progUrl(p)}">View the programme ${icon('arrow')}</a><a class="btn btn--ghost" href="apply/online/?programme=${p.slug}">Apply now</a></div></div>` : ''}
</div></section>
<section class="section section--soft"><div class="wrap"><div class="sec-head sec-head--row"><div><span class="eyebrow">More voices</span><h2 class="h2">Read <em>more stories.</em></h2></div><a class="link-arrow" href="life/stories/">All stories ${icon('arrow')}</a></div><div class="scards">${others.map(storyCard).join('')}</div></div></section>
${L.ctaBand(0, { title: 'Write <em>your own chapter.</em>', text: 'Apply online in about ten minutes, or talk to an adviser first.', primary: ['Apply online', 'apply/online/' + (p ? '?programme=' + p.slug : '')], secondary: ['Book a campus visit', 'events/#visit'] })}
`;
  return { path: `life/stories/${s.slug}/index.html`, html: L.page({ depth: 3, active: 'life', title: `${s.name} — ${s.course}`, desc: `${s.name}, ${s.course}: ${s.outcome || 'their story'}.`, body, scripts: [] }) };
}

module.exports = () => [outcomesPage(), parentsPage(), ...allStories().map(storyPage)];
module.exports.storyCard = storyCard;
module.exports.allStories = allStories;
