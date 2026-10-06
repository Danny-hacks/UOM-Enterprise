const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl } = L;

const SLIDES = [
  ['grad-hall', 'Graduation', '900+ graduates and a growing alumni community', 'life/alumni/', 'Meet our alumni'],
  ['grad-portrait', 'Law', 'Qualifying law degrees for England & Wales and Mauritius', 'study/?area=law', 'Explore law'],
  ['core-night', 'Campus', 'The Core Building — the heart of Ebene Cybercity', 'life/#tour', 'Take the campus tour'],
  ['about-uol', 'University of Lancashire', 'A UK degree, awarded and recognised — studied in Mauritius', 'about/#partnership', 'Our partnership'],
  ['grad-crowd', 'Accredited', 'Part-time MSc programmes accredited by APM, CIOB and IDM', 'careers-accreditation/', 'See accreditation'],
];

const FOCUS = { 'core-night': 68, 'about-uol': 38, 'grad-portrait': 55 };

module.exports = function home() {
  const progRows = D.programmes.map((p, i) => `
    <a class="prow" href="${progUrl(p)}" data-area="${p.area}" data-reveal style="--d:${(i % 4) * 0.05}s">
      <span class="prow__n">0${i + 1}</span>
      <span class="prow__t">${esc(p.title)}${p.sub ? `<small>${esc(p.sub)}</small>` : `<small>${esc(p.lede)}</small>`}</span>
      <span class="prow__m"><span><b>${esc(p.levelLabel)}</b></span><span>${esc(p.durationLabel)}</span><span>${esc(p.mode)}</span></span>
      <span class="prow__m"><span>Next intake</span><span><b>${esc(p.intakeLabel)}</b></span></span>
      <span class="prow__go">${icon('arrow')}</span>
    </a>`).join('');

  const body = `
<section class="hero" data-hero data-elementor="container:hero-slider">
  <div class="hero__slides" aria-hidden="true">${SLIDES.map(([img], i) => `<div class="hero__slide ${i === 0 ? 'is-on' : ''}"><img style="--fx:${FOCUS[img] || 50}%" src="assets/img/${img}-hero.webp" srcset="assets/img/${img}-hero-s.webp 800w, assets/img/${img}-hero.webp 2000w" sizes="100vw" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}></div>`).join('')}</div>
  <div class="hero__shade"></div>
  <a class="hero__scroll" href="#start">Scroll</a>
  <div class="wrap hero__in">
    <div class="hero__copy">
      <span class="eyebrow">University of Lancashire · Ebene, Mauritius</span>
      <h1 class="display" style="margin-bottom:36px">A British degree, <em>rooted in</em> Mauritius.</h1>
      <div class="hero__cta">
        <a class="btn" href="study/">Find your programme ${icon('arrow')}</a>
        <a class="btn btn--ghost-light" href="apply/online/">Start your application ${icon('arrow')}</a>
      </div>
      <div class="hero__meta"><div class="countdown" data-countdown aria-live="off"><span class="countdown__lab">Next intake</span><span class="countdown__v"><span data-cd-label>January 2027</span><small data-cd-days></small></span></div></div>
    </div>
    <aside class="hero__cap" aria-label="Featured">
      ${SLIDES.map(([, tag, t, u, l], i) => `<div class="cap ${i === 0 ? 'is-on' : ''}"><span class="tag">${esc(tag)}</span><b>${esc(t)}</b><a class="link-arrow" href="${u}" style="color:#fff">${esc(l)} ${icon('arrow')}</a></div>`).join('')}
      <div class="hero__dots" role="tablist" aria-label="Slides">${SLIDES.map(([, tag], i) => `<button role="tab" aria-label="${esc(tag)}" class="${i === 0 ? 'is-on' : ''}"><i></i></button>`).join('')}</div>
    </aside>
  </div>
  <div class="hero__bar" data-elementor="container:quick-finder"><div class="wrap"><form class="hero__bar-in" action="study/" method="get" data-quick>
    <h2>Find your programme</h2>
    <div class="quick__fields">
      <div><label class="lab" for="qa">Subject</label><select class="select" id="qa" name="area"><option value="">Any subject</option><option value="law">Law</option><option value="pm">Project management</option><option value="digital">Digital marketing</option></select></div>
      <div><label class="lab" for="ql">Level</label><select class="select" id="ql" name="level"><option value="">Any level</option><option value="undergraduate">Undergraduate</option><option value="graduate">Graduate conversion</option><option value="postgraduate">Postgraduate</option></select></div>
      <div><label class="lab" for="qm">Study mode</label><select class="select" id="qm" name="mode"><option value="">Any mode</option><option value="full-time">Full-time</option><option value="part-time">Part-time</option></select></div>
    </div>
    <button class="btn btn--navy" type="submit">Show programmes ${icon('arrow')}</button>
  </form></div></div>
</section>

<section class="section" id="start" data-elementor="container:audience-paths"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Where do you start?</span><h2 class="h2">Four ways in. <em>One clear next step</em> for each.</h2></div>
  <div class="paths">
    <a class="path" href="study/?level=postgraduate" data-reveal><span class="num">01</span><h3>A master’s that fits around work</h3><p>Part-time, hybrid MSc and LLM programmes in project management, digital marketing and financial law.</p><span class="path__go">Postgraduate options ${icon('arrow')}</span></a>
    <a class="path" href="study/?area=law" data-reveal style="--d:.08s"><span class="num">02</span><h3>Law — from school to the Bar</h3><p>Qualifying law degrees recognised for England &amp; Wales and by the CVLE in Mauritius, plus a graduate conversion course.</p><span class="path__go">Explore law ${icon('arrow')}</span></a>
    <a class="path" href="international/" data-reveal style="--d:.16s"><span class="num">03</span><h3>Studying from abroad</h3><p>Visa support, accommodation lists, airport pick-up and a clear cost of living — for applicants joining us from overseas.</p><span class="path__go">Plan your move ${icon('arrow')}</span></a>
    <a class="path" href="parents/" data-reveal style="--d:.24s"><span class="num">04</span><h3>Parents &amp; guardians</h3><p>Recognition, fees, support and what your child can do next — answered plainly, with a visit if you’d like one.</p><span class="path__go">For parents ${icon('arrow')}</span></a>
  </div>
</div></section>

${L.logoStrip(0)}

<section class="section section--soft" data-elementor="container:stats"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Proof, not promises</span><h2 class="h2">A fifteen-year partnership, measured in <em>people.</em></h2></div>
  <div class="stats">
    <div class="stat" data-reveal><b data-count="900">900<sup>+</sup></b><span>graduates building careers in Mauritius and beyond</span></div>
    <div class="stat" data-reveal style="--d:.08s"><b data-count="100">100<sup>+</sup></b><span>LLB and GDL graduates now practising as Barristers and Attorneys</span></div>
    <div class="stat" data-reveal style="--d:.16s"><b data-count="7">7</b><span>University of Lancashire programmes in law, project management and digital marketing</span></div>
    <div class="stat" data-reveal style="--d:.24s"><b data-count="15">15<sup>yrs</sup></b><span>delivering University of Lancashire awards in Mauritius since 2011</span></div>
  </div>
  <ul class="creds"><li><b>Top 7%</b><span>of universities worldwide — CWUR 2025</span></li><li><b>Top 20%</b><span>in the UK for industry &amp; public-sector engagement</span></li><li><b>5 QS Stars</b><span>for teaching, 2025</span></li></ul><p class="fn">University of Lancashire ratings, as published by the University; terms and conditions apply.</p><p style="margin-top:36px;display:flex;gap:28px;flex-wrap:wrap"><a class="link-arrow" href="about/">Read our story ${icon('arrow')}</a><a class="link-arrow" href="life/alumni/">Meet the alumni ${icon('arrow')}</a><a class="link-arrow" href="about/#partnership">Our University of Lancashire partnership ${icon('arrow')}</a></p>
</div></section>

<section class="section" data-elementor="container:programmes"><div class="wrap">
  <div class="sec-head sec-head--row"><div><span class="eyebrow">Programmes</span><h2 class="h2">Seven programmes. <em>Three directions.</em></h2></div><a class="link-arrow" href="study/">Open the full course finder ${icon('arrow')}</a></div>
  <div class="plist__filters" role="group" aria-label="Filter programmes" data-plist-filter>
    <button class="chip is-on" data-f="all" aria-pressed="true">All programmes</button><button class="chip" data-f="law" aria-pressed="false">Law</button><button class="chip" data-f="pm" aria-pressed="false">Project management</button><button class="chip" data-f="digital" aria-pressed="false">Digital marketing</button>
  </div>
  <div class="plist" id="plist">${progRows}</div>
</div></section>

<section class="section" data-elementor="container:student-story"><div class="wrap">
  <div class="sec-head sec-head--row"><div><span class="eyebrow">Student voices</span><h2 class="h2">Why people <em>choose UoME.</em></h2></div><a class="link-arrow" href="outcomes/#stories">More graduate stories ${icon('arrow')}</a></div>
  <div class="rot" data-rotator>
    <div class="rot__s is-on"><div class="story">
      <div class="story__img"><div class="arch"><img src="assets/img/person-yaniish.webp" alt="Yaniish Engutsamy, MSc Digital Marketing Communications student" loading="lazy" width="800" height="800"></div></div>
      <div><blockquote class="quote" style="margin:0 0 8px">The MSc exceeded all my expectations. We didn’t just learn about strategies — we applied them through hands-on projects, case studies and simulations that mirrored real-world challenges.</blockquote><div class="cite"><b>Yaniish Engutsamy</b><span>MSc Digital Marketing Communications · Year 1</span></div><p style="margin-top:28px"><a class="link-arrow" href="study/digital/msc-digital-marketing/">See the programme ${icon('arrow')}</a></p></div>
    </div></div>
    ${D.sampleStories.slice(0, 2).map((m) => `<div class="rot__s"><div class="story"><div class="story__img"><div class="arch arch--mono" role="img" aria-label="Portrait placeholder"><span aria-hidden="true">${esc(m.init)}</span></div></div><div>${L.sampleTag(m)}<blockquote class="quote" style="margin:0 0 8px">${esc(m.quote)}</blockquote><div class="cite"><b>${esc(m.name)}</b><span>${esc(m.course)} · ${esc(m.yearLabel)}</span><span style="color:var(--crimson);font-weight:600">${esc(m.outcome)}</span></div><p style="margin-top:28px"><a class="link-arrow" href="study/${m.area === 'pm' ? 'business-management' : 'law'}/${m.programme}/">See the programme ${icon('arrow')}</a></p></div></div></div>`).join('')}
    <div class="rot__dots" role="tablist" aria-label="Choose a story"><button role="tab" class="is-on" aria-label="Story 1"></button><button role="tab" aria-label="Story 2"></button><button role="tab" aria-label="Story 3"></button></div>
  </div>
</div></section>

<section class="section section--soft" data-elementor="container:home-enquiry"><div class="wrap split split--top">
  <div><span class="eyebrow">Talk to a person</span><h2 class="h2">Questions? <em>Ask an adviser.</em></h2><p class="lede" style="margin:18px 0 26px">Fees, entry requirements, study while working, visas — our team answers every weekday.</p><ul class="checks"><li>Replies during office hours, ${esc(D.site.hours)}</li><li>No obligation, no pressure</li><li>Parents welcome on every call</li></ul><p style="margin-top:24px;display:flex;gap:18px;flex-wrap:wrap"><a class="link-arrow" href="${L.waLink()}">Chat on WhatsApp ${icon('arrow')}</a><a class="link-arrow" href="tel:${D.site.tel}">Call ${D.site.phone1} ${icon('arrow')}</a></p></div>
  ${L.miniForm({ id: 'hq' })}
</div></section>

<section class="section" data-elementor="container:campus-teaser"><div class="wrap">
  <div class="split">
    <div class="collage">
      <div class="c1 media"><img src="assets/img/campus-atrium.webp" alt="The Core Building atrium, Ebene" loading="lazy"></div>
      <div class="c2 media"><img src="assets/img/campus-classroom-s.webp" alt="A UoME classroom" loading="lazy"></div>
      <div class="c3 media"><img src="assets/img/campus-lab-s.webp" alt="Students at the computer laboratory" loading="lazy"></div>
      <div class="c4 media"><img src="assets/img/life-group-1-s.webp" alt="UoME students together" loading="lazy"></div>
    </div>
    <div data-reveal><span class="eyebrow">The campus</span><h2 class="h2">Right in the heart of <em>Ebene.</em></h2><p class="lede" style="margin:20px 0 32px">First floor, The Core Building — modern classrooms, a computer laboratory of around 30 high-performance PCs, a library, and a lunchroom where board games are available on request.</p><a class="btn btn--navy" href="life/#tour">Take the campus tour ${icon('arrow')}</a></div>
  </div>
</div></section>

<section class="section" data-elementor="container:events-news"><div class="wrap">
  <div class="sec-head sec-head--row"><div><span class="eyebrow">Meet us &amp; read on</span><h2 class="h2">Guides, events and <em>practical answers.</em></h2></div><a class="link-arrow" href="news/">All guides ${icon('arrow')}</a></div>
  <div class="news">
    ${D.news.slice(0, 3).map((n, i) => `<a class="ncard ${i === 0 ? 'lead' : ''}" href="news/${n.slug}/" data-reveal style="--d:${i * 0.1}s"><div class="media"><img src="assets/img/${n.img}${i === 0 ? '' : '-s'}.webp" alt="" loading="lazy"></div><span class="tag" style="align-self:flex-start">${esc(n.kind)} · ${esc(n.cat)}</span><h3>${esc(n.title)}</h3><p>${esc(n.dek)}</p></a>`).join('')}
  </div>
  </div></section>

${L.ctaBand(0)}
`;
  return {
    path: 'index.html', html: L.page({
      depth: 0, active: '', title: 'UOM Enterprise — University of Lancashire in Mauritius',
      desc: 'Study law, project management and digital marketing with the University of Lancashire in Ebene, Mauritius. Qualifying law degrees, APM, CIOB and IDM accredited MSc programmes.',
      body, scripts: [], preload: 'assets/img/grad-hall-hero.webp', preloadSet: 'assets/img/grad-hall-hero-s.webp 800w, assets/img/grad-hall-hero.webp 2000w', schema: JSON.stringify({ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'UOM Enterprise Ltd', alternateName: 'UoME', url: 'https://uomenterprise.mu/', telephone: '+230 467 8925', email: D.site.email, address: { '@type': 'PostalAddress', streetAddress: '1st Floor, The Core Building', addressLocality: 'Ebene', addressCountry: 'MU' }, foundingDate: '2010' }),
    }),
  };
};
