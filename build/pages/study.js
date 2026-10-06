const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl } = L;

module.exports = function study() {
  const cnt = (fn) => D.programmes.filter(fn).length;
  const opt = (name, val, label, n) => `<label class="fopt"><input type="checkbox" name="${name}" value="${val}"><span>${label}</span><em>${n}</em></label>`;
  const cards = D.programmes.map((p) => `
  <article class="fcard" data-slug="${p.slug}" data-area="${p.area}" data-level="${p.level}" data-mode="${p.modeKey}" data-intake="${p.intakes.join(' ').toLowerCase()}" data-accred="${(L.byslug(p.slug) && D.accreditations.filter((a) => (a.programmes || []).includes(p.slug)).map((a) => a.id).join(' ')) || ''}" data-months="${p.months}" data-title="${esc(p.short)}">
    <div class="media"><img src="assets/img/${p.img}-s.webp" alt="" loading="lazy"></div>
    <div class="fcard__b">
      <div><span class="tag">${esc(p.areaLabel)}</span> <span class="tag tag--line" style="margin-left:6px">${esc(p.levelLabel)}</span></div>
      <h3><a href="${progUrl(p)}">${esc(p.title)}${p.sub ? ' <em style="font-size:.7em;color:var(--mute)">' + esc(p.sub) + '</em>' : ''}</a></h3>
      <p class="small" style="margin:0">${esc(p.lede)}</p>
      <div class="fcard__m"><span><b>${esc(p.durationLabel)}</b></span><span>${esc(p.mode)}</span><span>Intakes: <b>${esc(p.intakeLabel)}</b></span></div>
      <div class="fcard__a"><a class="btn btn--sm" href="${progUrl(p)}">View programme ${icon('arrow')}</a><button class="cmpbtn" data-shortlist="${p.slug}" aria-pressed="false">${icon('compare')}<span>Compare</span></button></div>
    </div>
  </article>`).join('');

  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Study', null]], eyebrow: 'Course finder', title: 'Find the programme <em>that fits your life.</em>', lede: 'Seven University of Lancashire programmes, taught in Ebene. Filter by subject, level, mode and intake — then compare up to three side by side.' })}

<div class="wrap finder" data-elementor="container:course-finder" id="finder">
  <aside class="filters" aria-label="Filters" data-filters>
    <h2 class="vh">Filter programmes</h2>
    <button class="filters__toggle" type="button" aria-expanded="false" data-filter-toggle>Filter programmes <span data-active-n></span></button><div class="filters__body">
    <div class="fgroup"><h3>Subject</h3>${opt('area', 'law', 'Law', cnt((p) => p.area === 'law'))}${opt('area', 'pm', 'Project management', cnt((p) => p.area === 'pm'))}${opt('area', 'digital', 'Digital marketing', cnt((p) => p.area === 'digital'))}</div>
    <div class="fgroup"><h3>Level</h3>${opt('level', 'undergraduate', 'Undergraduate', cnt((p) => p.level === 'undergraduate'))}${opt('level', 'graduate', 'Graduate conversion', cnt((p) => p.level === 'graduate'))}${opt('level', 'postgraduate', 'Postgraduate', cnt((p) => p.level === 'postgraduate'))}</div>
    <div class="fgroup"><h3>Study mode</h3>${opt('mode', 'full-time', 'Full-time', cnt((p) => p.modeKey === 'full-time' || p.modeKey === 'both'))}${opt('mode', 'part-time', 'Part-time', cnt((p) => p.modeKey === 'part-time' || p.modeKey === 'both'))}</div>
    <div class="fgroup"><h3>Intake</h3>${opt('intake', 'jan', 'January', cnt((p) => p.intakes.includes('Jan')))}${opt('intake', 'feb', 'February', cnt((p) => p.intakes.includes('Feb')))}${opt('intake', 'sep', 'September', cnt((p) => p.intakes.includes('Sep')))}</div>
    <div class="fgroup"><h3>Accredited / recognised by</h3>${['apm', 'ciob', 'idm', 'cvle'].map((a) => opt('accred', a, a.toUpperCase(), D.accreditations.find((x) => x.id === a).programmes.length)).join('')}</div>
    <button class="btn btn--ghost btn--sm btn--block" data-reset>Clear all filters</button></div>
  </aside>
  <div>
    <div class="levels" role="group" aria-label="Browse by level" data-levels><button class="chip is-on" data-lv="">All levels</button><button class="chip" data-lv="undergraduate">Undergraduate</button><button class="chip" data-lv="graduate">Graduate conversion</button><button class="chip" data-lv="postgraduate">Postgraduate</button></div>
    <div class="fbar"><div class="count" aria-live="polite"><span data-found>7</span> programmes</div>
      <div><label class="vh" for="sort">Sort</label><select class="select" id="sort" style="min-height:44px;padding:8px 40px 8px 14px"><option value="default">Sort: Recommended</option><option value="az">Name A – Z</option><option value="short">Shortest first</option></select></div></div>
    <div class="fcards" data-results>${cards}</div>
    <div class="empty" data-empty hidden><h3 class="h3">No programme matches every filter.</h3><p class="small">Loosen a filter, or talk to an adviser — we’ll help you find a route.</p><a class="btn" href="contact/">Talk to an adviser ${icon('arrow')}</a></div>
  </div>
</div>

<section class="section section--paper2" id="quiz" data-elementor="container:programme-quiz"><div class="wrap">
  <div class="split split--wide-r split--top" style="margin-bottom:48px">
    <div data-reveal><span class="eyebrow">Not sure yet?</span><h2 class="h2">Which programme is <em>right for me?</em></h2></div>
    <p class="lede" style="margin:0" data-reveal>Answer four quick questions and we’ll rank the programmes that fit your goals, background and schedule — with the reasons why.</p>
  </div>
  <div class="quiz" data-quiz aria-live="polite"></div>
</div></section>

<section class="section" id="compare" data-elementor="container:compare-help"><div class="wrap wrap--narrow" style="text-align:center">
  <span class="eyebrow" style="justify-content:center">Compare</span><h2 class="h2">Side by side, <em>in one view.</em></h2>
  <p class="lede" style="margin:20px auto 28px">Add up to three programmes with the Compare button on any card. Your shortlist stays with you as you browse — and pre-fills your enquiry form.</p>
  <button class="btn btn--navy" data-open-compare>Open my comparison ${icon('arrow')}</button>
</div></section>

<div class="modal" id="cmpModal" role="dialog" aria-modal="true" aria-label="Compare programmes"><div class="modal__box"><button class="modal__x" data-close-compare aria-label="Close">×</button><h2 class="h2" style="margin-bottom:26px">Compare <em>programmes</em></h2><div class="tscroll" id="cmpBody"></div></div></div>
<div class="cmpdock" id="cmpDock" role="region" aria-label="Compare tray"><b><span data-n>0</span> selected</b><div class="cmpdock__items" data-items></div><button class="btn btn--gold btn--sm" data-open-compare>Compare</button><button class="btn btn--ghost-light btn--sm" data-clear-compare>Clear</button></div>

${L.ctaBand(0, { title: 'Still deciding? <em>Talk it through.</em>', text: 'An adviser can help you compare programmes, entry requirements and fees.', primary: ['Book a call with an adviser', 'contact/'], secondary: ['Take the quiz', 'study/#quiz'] })}
`;
  return { path: 'study/index.html', html: L.page({ depth: 1, active: 'study', title: 'Find a programme — course finder', desc: 'Filter and compare UoME’s seven University of Lancashire programmes in law, project management and digital marketing — by level, mode, intake and accreditation.', body, scripts: ['finder'] }) };
};
