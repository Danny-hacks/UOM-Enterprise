const D = require('../data');
const L = require('../layout');
const { icon, esc } = L;

const TOUR = [
  ['Arrive in Ebene', 'core-night', 'The Core Building', 'UoME is on the first floor of The Core Building, at the doorstep of Ebene Cybercity — the financial, banking and BPO-ICT hub of Mauritius — and just opposite the Ebene Commercial Centre.'],
  ['Step inside', 'campus-atrium', 'The Core Building', 'Within walking distance you’ll find a practical shopping mall with small shops, a pharmacy and a food court with modern restaurants and cafés. The metro station is about ten minutes away on foot.'],
  ['Learn in modern classrooms', 'campus-classroom', 'Classrooms', 'State-of-the-art classrooms with modern equipment. Teaching is led by experienced academics and practitioners, supported on every module by the University’s virtual learning environment.'],
  ['Work in the computer laboratory', 'campus-lab', 'Computer laboratory & library', 'A computer laboratory with around 30 high-performance computers gives access to the University of Lancashire’s online resources — e-books, e-journals, e-databases, e-newspapers and a research repository. The library holds textbooks for every module, many available on short-term loan.'],
  ['Get advice on tap', 'campus-advice', 'Admissions & student support', 'One-to-one counselling for prospective students, and a student support team for everything from assignment extensions to Blackboard.'],
  ['Take a break, join a club', 'life-group-1', 'Lunchroom & clubs', 'A cosy lunchroom with a big smart TV, with board games available on request. Student-led clubs — the Law Society and the Rotaract Club — organise community, social and cultural activities.'],
];

function lifePage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Life at UoME', null]], eyebrow: 'Campus & community', title: 'Life at <em>UoME.</em>', lede: 'A compact, connected campus in the heart of Ebene — and a community of students, graduates and academics who look out for each other.' , image: 'campus-atrium'})}

<section class="section" id="tour" data-elementor="container:campus-tour"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Campus tour</span><h2 class="h2">Walk the campus, <em>scroll by scroll.</em></h2></div>
  <div class="tour" data-tour>
    <div class="tour__stage" aria-hidden="true">${TOUR.map(([, img], i) => `<img src="assets/img/${img}.webp" alt="" ${i === 0 ? 'class="is-on"' : 'loading="lazy"'}>`).join('')}<span class="tour__loc" data-loc>${esc(TOUR[0][2])}</span></div>
    <div class="tour__steps">${TOUR.map(([t, img, loc, d], i) => `<div class="tstep ${i === 0 ? 'is-on' : ''}" data-i="${i}" data-loc="${esc(loc)}"><span class="num">0${i + 1}</span><h3 class="h3">${esc(t)}</h3><p>${esc(d)}</p><img class="m" src="assets/img/${img}-s.webp" alt="" loading="lazy"></div>`).join('')}</div>
  </div>
  <p style="margin-top:32px"><a class="btn btn--navy" href="${L.byslug ? 'contact/?topic=visit' : ''}">Book a campus visit ${icon('arrow')}</a></p>
</div></section>

<section class="section" id="clubs" data-elementor="container:clubs"><div class="wrap split">
  <div data-reveal><span class="eyebrow">Clubs &amp; societies</span><h2 class="h2">Student-led, <em>community-minded.</em></h2><div class="prose" style="margin-top:20px"><p>Two student-led clubs bring the cohort together: the <b>Law Society</b> and the <b>Rotaract Club</b>. Members organise diverse activities to help the community and address important social issues, alongside cultural activities and competitions that contribute to a fun and positive student experience.</p></div><p style="margin-top:24px;display:flex;gap:26px;flex-wrap:wrap"><a class="link-arrow" href="gallery/">See student life in the gallery ${icon('arrow')}</a><a class="link-arrow" href="life/student-support/">Student support hub ${icon('arrow')}</a></p></div>
  <div class="collage" data-reveal><div class="c1 media"><img src="assets/img/life-diversity.webp" alt="Students celebrating together" loading="lazy"></div><div class="c2 media"><img src="assets/img/life-clubs-s.webp" alt="Students at a club event" loading="lazy"></div><div class="c3 media"><img src="assets/img/life-group-2-s.webp" alt="A UoME class group" loading="lazy"></div><div class="c4 media"><img src="assets/img/life-celebrate-s.webp" alt="Celebrations on campus" loading="lazy"></div></div>
</div></section>

${L.ctaBand(0, { title: 'See it <em>for yourself.</em>', text: 'Book a campus visit, join a taster lecture, or find the programme that fits.', primary: ['Book a campus visit', 'events/#visit'], secondary: ['Find your programme', 'study/'] })}
`;
  return { path: 'life/index.html', html: L.page({ depth: 1, active: 'life', title: 'Life at UoME — campus, facilities and clubs', desc: 'Explore the UoME campus in Ebene: modern classrooms, a computer laboratory, library, lunchroom, the Law Society and Rotaract Club — plus student support.', body, scripts: [] }) };
}

function storiesPage() {
  const O = require('./outcomes');
  const s = D.stories[0];
  const more = D.sampleStories;
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Life at UoME', 'life/'], ['Student stories', null]], eyebrow: 'In their own words', title: 'Student <em>stories.</em>', lede: 'What it’s really like to study at UoME, told by the people doing it — and where it has taken them.' })}
<section class="section" data-elementor="container:story-feature"><div class="wrap">
  <div class="story">
    <div class="story__img" data-reveal><div class="arch"><img src="assets/img/${s.img}.webp" alt="${esc(s.name)}" width="800" height="800"></div></div>
    <div data-reveal>
      <span class="eyebrow">${esc(s.course)} · ${esc(s.year)}</span>
      <h2 class="h2" style="margin-bottom:26px">${esc(s.name)}</h2>
      <blockquote class="quote" style="margin:0 0 28px">${esc(s.quote)}</blockquote>
      <div class="prose">${s.more.map((m) => `<p>${esc(m)}</p>`).join('')}</div>
      <p style="margin-top:24px;display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn--navy" href="life/stories/${s.slug}/">Read the full story ${icon('arrow')}</a><a class="btn btn--ghost" href="study/digital/msc-digital-marketing/">Explore the MSc</a></p>
    </div>
  </div>
</div></section>
<section class="section section--soft" data-elementor="container:more-stories"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">More voices</span><h2 class="h2">From law to <em>project management.</em></h2></div>
  <div class="plist__filters" role="group" aria-label="Filter stories" data-cat-filter><button class="chip is-on" data-f="all" aria-pressed="true">All</button><button class="chip" data-f="law" aria-pressed="false">Law</button><button class="chip" data-f="pm" aria-pressed="false">Project management</button></div>
  <div class="scards" data-cat-list>${more.map((m, i) => O.storyCard(m, i).replace('<article class="scard"', `<article class="scard" data-cat="${m.area}"`)).join('')}</div>
</div></section>
${L.ctaBand(0, { title: 'Your story could <em>be next.</em>', text: 'Ready to start your own chapter at UoME — or already a student or graduate with a story to share?', primary: ['Start your application', 'apply/online/'], secondary: ['Share your story', 'contact/?topic=story'] })}
`;
  return { path: 'life/stories/index.html', html: L.page({ depth: 2, active: 'life', title: 'Student stories', desc: 'Hear from UoME students and graduates about studying law, project management and digital marketing with the University of Lancashire in Mauritius.', body, scripts: [] }) };
}

function alumniPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Life at UoME', 'life/'], ['Alumni', null]], eyebrow: 'The community', title: 'More than <em>900 graduates.</em>', lede: 'An influential network contributing to law, government, engineering, business and technology across Mauritius and beyond.' , image: 'grad-group'})}

<section class="section" data-elementor="container:alumni-impact"><div class="wrap">
  <div class="split split--wide-r split--top">
    <div data-reveal><span class="eyebrow">Alumni impact</span><h2 class="h2">Careers that <em>shape a nation.</em></h2></div>
    <div class="prose" data-reveal><p>The alumni community of UOM Enterprise, in partnership with the University of Lancashire, reflects the strength and impact of its academic programmes. With more than 900 graduates, the institution has developed a dynamic network of professionals contributing to key sectors in Mauritius and beyond.</p><p>Many alumni have built distinguished careers in law, government, engineering, business and technology — including over 100 LLB and GDL graduates who are now practising Barristers and Attorneys.</p></div>
  </div>
  <div class="tiles" style="margin-top:56px">
    <div class="tile" data-reveal><span class="num">Law</span><h3>A leading name for law education in Mauritius</h3><p>More than 100 alumni practise as barristers and attorneys. The dual-qualified LLB equips students for legal practice locally and in the UK.</p></div>
    <div class="tile" data-reveal style="--d:.08s"><span class="num">Government</span><h3>Leaders and policymakers</h3><p>The alumni community includes the former President of the Republic and the current Minister of ICT.</p></div>
    <div class="tile" data-reveal style="--d:.16s"><span class="num">Engineering</span><h3>Building Mauritius</h3><p>Engineering graduates play key roles in design, project supervision and technical sales across the island’s built environment.</p></div>
    <div class="tile" data-reveal style="--d:.24s"><span class="num">Digital</span><h3>The digital economy</h3><p>In 2026 the first cohort of the MSc Digital Marketing graduates, ready for digital strategy, branding and data-driven marketing.</p></div>
  </div>
</div></section>

<section class="section section--navy grain" data-elementor="container:alumni-stay"><div class="wrap split">
  <div data-reveal><span class="eyebrow">Staying in touch</span><h2 class="h2">Ambassadors <em>and mentors.</em></h2><p class="lede" style="margin-top:18px">We cherish our alumni and make it a priority to stay in touch. Alumni are invited to graduation ceremonies, networking sessions, guest lectures, open days, activities during Induction Week and the annual Alumni Event — and they counsel and guide current students on their career paths.</p></div>
  <div class="whys" data-reveal><div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">01</span><div><h3>One platform</h3><p style="color:rgba(255,255,255,.7)">Regroup all alumni in one community.</p></div></div><div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">02</span><div><h3>A stronger database</h3><p style="color:rgba(255,255,255,.7)">Keep our alumni records current so nobody misses out.</p></div></div><div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">03</span><div><h3>Always informed</h3><p style="color:rgba(255,255,255,.7)">Follow the University’s major activities on the University of Lancashire in Mauritius Facebook page, connect with each other and with current students.</p></div></div></div>
</div></section>

<section class="section" data-elementor="container:alumni-gallery"><div class="wrap">
  <div class="sec-head sec-head--row" data-reveal><div><span class="eyebrow">Moments</span><h2 class="h2">Celebrations &amp; <em>reunions.</em></h2></div><a class="link-arrow" href="gallery/">Full gallery ${icon('arrow')}</a></div>
  <div class="collage" style="grid-auto-rows:60px"><div class="c1 media"><img src="assets/img/alumni-1.webp" alt="Alumni evening with the UoME banner" loading="lazy"></div><div class="c2 media"><img src="assets/img/alumni-6-s.webp" alt="Graduates at an evening reception" loading="lazy"></div><div class="c3 media"><img src="assets/img/alumni-4-s.webp" alt="A group of alumni" loading="lazy"></div><div class="c4 media"><img src="assets/img/alumni-3-s.webp" alt="Alumni socialising" loading="lazy"></div></div>
</div></section>

<section class="section section--paper2" data-elementor="container:alumni-form"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">Join the network</span><h2 class="h2">Update your <em>details.</em></h2><p class="lede" style="margin-top:16px">Graduated from UoME? Tell us where you are now so we can keep you informed about events, guest lectures and the annual Alumni Event.</p></div>
  <div class="formcard">
    <form class="form" data-form data-single novalidate>
      <div class="row2"><div class="field"><label class="lab" for="a1">Full name</label><input class="input" id="a1" name="name" required><span class="err"></span></div><div class="field"><label class="lab" for="a2">Email</label><input class="input" id="a2" name="email" type="email" required><span class="err"></span></div></div>
      <div class="row2"><div class="field"><label class="lab" for="a3">Programme</label><select class="select" id="a3" name="programme">${D.programmes.map((p) => `<option>${esc(p.short)}</option>`).join('')}<option>Other / earlier programme</option></select></div><div class="field"><label class="lab" for="a4">Year of graduation</label><input class="input" id="a4" name="year" inputmode="numeric" maxlength="4"></div></div>
      <div class="field"><label class="lab" for="a5">Where are you now? (optional)</label><input class="input" id="a5" name="role" placeholder="Role and organisation"></div>
      <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may store these details to keep me informed, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
      <div><button class="btn" type="submit">Join the alumni network ${icon('arrow')}</button></div>
      <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Welcome <em>back.</em></h3><p>Thank you — we’ll keep you in the loop.</p></div>
    </form>
  </div>
</div></section>
${L.ctaBand(0, { title: 'Know someone who should <em>study here?</em>', text: 'Alumni are our best ambassadors. Point a colleague, friend or relative to the programmes.', primary: ['Explore programmes', 'study/'], secondary: ['Book a campus visit', 'events/#visit'] })}
`;
  return { path: 'life/alumni/index.html', html: L.page({ depth: 2, active: 'life', title: 'Alumni — 900+ graduates and counting', desc: 'Join the UoME alumni community: over 900 graduates in law, government, engineering, business and technology — including more than 100 practising barristers and attorneys.', body, scripts: [] }) };
}

function supportPage() {
  const T = [
    ['Mitigating circumstances & extensions', 'extension mitigating circumstances assignment', 'If something is affecting your studies and you need an extension to an assignment submission, contact the student support team as early as possible. They will guide you through the process and relay your request to the right department.'],
    ['Interrupting or withdrawing from your course', 'interruption withdrawal change circumstances', 'A change of circumstances — an interruption of studies or a withdrawal from the course — should be discussed with the student support team first. See the refund policy on the Apply page for how withdrawal dates affect tuition refunds.'],
    ['Complaints', 'complaint complaints feedback', 'If you have a complaint, the student support team will listen and guide you through the procedure. You can reach them by phone or email below.'],
    ['Online enrolment guidance', 'enrolment enrollment registration online', 'Need help completing your online enrolment? The student support team will walk you through each step and answer your questions.'],
    ['Blackboard & the online learning platform', 'blackboard online learning platform vle', 'For help navigating Blackboard, the University’s online learning platform, contact the student support team. Your programme is supported on each module by the virtual learning environment.'],
    ['Tuition payments & payment arrangements', 'fees payment tuition finance instalment', 'Questions about paying tuition fees, or need payment facilities? Email the finance team at ' + D.site.financeEmail + '. Fees are paid in three instalments; a 5% discount applies when paying in full by the early-payment deadline (local) or on enrolment (international).'],
    ['Library & online resources', 'library books ebooks journals databases research', 'Textbooks for each module are in the campus library (many on short-term loan). Online, the University of Lancashire’s Learning Information Services provides e-books, e-databases A–Z, e-images, e-journals A–Z, e-newspapers and a research repository.'],
    ['Clubs & societies', 'clubs law society rotaract activities', 'Join the student-led Law Society or Rotaract Club for community work, social activities and cultural competitions.'],
  ];
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Life at UoME', 'life/'], ['Student support', null]], eyebrow: 'Student support hub', title: 'How can we <em>help?</em>', lede: 'The student support team works closely with every department. Search the topics below — or call us.' , image: 'campus-classroom'})}
<section class="section"><div class="wrap split split--wide-l split--top">
  <div data-elementor="widget:accordion" data-filter-list>
    <div class="field" style="margin-bottom:24px"><label class="lab" for="sq">Search support topics</label><input class="input" id="sq" type="search" placeholder="e.g. extension, Blackboard, fees…" data-filter-input></div>
    <div>${T.map(([t, k, d]) => `<details class="faq" data-keys="${esc(k)} ${esc(t.toLowerCase())}"><summary>${esc(t)}</summary><p>${esc(d)}</p></details>`).join('')}</div>
    <p class="small" data-filter-empty hidden style="margin-top:20px">No topics match. Call us on ${D.site.phone1} and we’ll help directly.</p>
  </div>
  <aside class="stack"><div class="aside__card"><span class="eyebrow" style="color:var(--gold-2)">Contact the team</span><p class="h3" style="margin:0 0 6px">Student support</p><dl><div><dt>Phone</dt><dd><a href="tel:${D.site.tel}">${D.site.phone1}</a></dd></div><div><dt>Alt.</dt><dd>${D.site.phone2}</dd></div><div><dt>Email</dt><dd style="font-size:.85rem;word-break:break-all">${D.site.supportEmail}</dd></div><div><dt>Finance</dt><dd style="font-size:.85rem;word-break:break-all">${D.site.financeEmail}</dd></div><div><dt>Hours</dt><dd>Mon – Fri<br>09:00 – 16:30</dd></div></dl><a class="btn btn--gold" href="mailto:${D.site.supportEmail}">Email student support ${icon('arrow')}</a></div></aside>
</div></section>
${L.ctaBand(0, { title: 'Still need <em>a hand?</em>', text: 'Our team is open Monday to Friday, 09:00 – 16:30 — including through lunchtime.' })}
`;
  return { path: 'life/student-support/index.html', html: L.page({ depth: 2, active: 'life', title: 'Student support hub', desc: 'Get help with extensions, mitigating circumstances, withdrawals, Blackboard, online enrolment, tuition payments and more from the UoME student support team.', body, scripts: [] }) };
}

module.exports = () => [lifePage(), storiesPage(), alumniPage(), supportPage()];
