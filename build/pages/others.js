const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl, byslug } = L;

function careersPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Careers & accreditation', null]], eyebrow: 'Recognition & routes', title: 'Qualifications the <em>profession recognises.</em>', lede: 'See what each accreditation and recognition means for your career — and how UoME’s law programmes connect to practice in England & Wales and Mauritius.' , image: 'grad-honour'})}

<section class="section section--navy grain" id="accreditation" data-elementor="container:accreditation-explorer"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Accreditation explorer</span><h2 class="h2">Six bodies. <em>One standard of quality.</em></h2></div>
  <div class="acc" data-explorer>
    <div class="acc__list" role="tablist" aria-label="Accreditation bodies">${D.accreditations.map((a, i) => `<button class="acc__btn" role="tab" aria-selected="${i === 0}" data-i="${i}"><b>${esc(a.abbr)}</b><small>${esc(a.name)}</small></button>`).join('')}</div>
    <div>${D.accreditations.map((a, i) => `<div class="acc__pane ${i === 0 ? 'is-on' : ''}" data-i="${i}" role="tabpanel">
      ${a.logo ? `<img class="lg" src="assets/img/logos/${a.logo}" alt="${esc(a.name)}">` : ''}
      <span class="eyebrow">${esc(a.short)}</span><h3 class="h2" style="font-size:2.2rem">${esc(a.name)}</h3>
      <p style="margin-top:14px">${esc(a.what)}</p>
      <div class="matters"><b>What it means for you.</b> ${esc(a.matters)}</div>
      ${a.programmes ? `<p style="margin-top:22px"><b>Programmes:</b></p><ul class="checks">${a.programmes.map((s) => { const p = byslug(s); return `<li><a href="${progUrl(p)}">${esc(p.title)}</a></li>`; }).join('')}</ul>` : ''}
    </div>`).join('')}</div>
  </div>
  <p class="fn">Accreditation by professional bodies is available on selected postgraduate courses. Terms and conditions apply.</p>
</div></section>

<section class="section section--paper2" id="law-route" data-elementor="container:law-pathway"><div class="wrap">
  <div class="split split--wide-r split--top" style="margin-bottom:48px"><div data-reveal><span class="eyebrow">Law career routes</span><h2 class="h2">From UoME to the <em>Bar.</em></h2></div><p class="lede" data-reveal style="margin:0">Two jurisdictions, one clear path for each starting point.</p></div>
  <div class="route" data-route>
    <div class="route__tabs" role="tablist"><button class="chip is-on" role="tab" aria-selected="true" data-t="a">LLB route</button><button class="chip" role="tab" aria-selected="false" data-t="b">GDL route</button></div>
    <div class="route__panel is-on" data-p="a"><div class="route__flow">
      <div class="node"><small>01 · Qualifying law degree</small><h3>LLB (Hons) at UoME</h3><p>English &amp; Mauritian Law, or English Law. A Qualifying Law Degree for England &amp; Wales and Mauritius.</p></div><div class="arrow-c">${icon('arrow')}</div>
      <div class="node"><small>02 · Vocational stage</small><h3>BPC · LPC · CVLE</h3><div class="node__split"><div><b>Barrister</b>Bar Professional Course (England &amp; Wales)</div><div><b>Solicitor</b>Legal Practice Course (England &amp; Wales only)</div><div><b>Mauritius</b>CVLE vocational examination</div></div></div><div class="arrow-c">${icon('arrow')}</div>
      <div class="node node--end"><small>03 · Practice</small><h3>Join the profession</h3><p>Over 100 UoME LLB and GDL graduates are practising Barristers and Attorneys.</p></div>
    </div></div>
    <div class="route__panel" data-p="b"><div class="route__flow">
      <div class="node"><small>01 · Conversion</small><h3>Graduate Diploma in Law</h3><p>For graduates in any subject (2:2+) or overseas law graduates. Apply for your COAS from the Bar Standards Board first.</p></div><div class="arrow-c">${icon('arrow')}</div>
      <div class="node"><small>02 · Vocational stage</small><h3>BPC · LPC · CVLE</h3><div class="node__split"><div><b>Barrister</b>Bar Professional Course (England &amp; Wales)</div><div><b>Solicitor</b>Legal Practice Course (England &amp; Wales only)</div><div><b>Mauritius</b>CVLE vocational examination</div></div></div><div class="arrow-c">${icon('arrow')}</div>
      <div class="node node--end"><small>03 · Practice</small><h3>A second career in law</h3><p>Built on contract, criminal, tort, public, trusts &amp; equity, land and EU law.</p></div>
    </div></div>
  </div>
</div></section>

<section class="section" id="employability" data-elementor="container:employability"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Employability</span><h2 class="h2">Skills built into <em>every programme.</em></h2></div>
  <div class="tiles">
    <div class="tile" data-reveal><span class="num">Law</span><h3>Professional skills, every year</h3><p>The LLB includes Professional Skills and Employability modules in Years 1, 2 and 3, with moots, debates and seminar advocacy.</p></div>
    <div class="tile" data-reveal style="--d:.08s"><span class="num">Project management</span><h3>Leadership &amp; delivery</h3><p>Project team and leadership development alongside planning, control, risk and value management.</p></div>
    <div class="tile" data-reveal style="--d:.16s"><span class="num">Digital marketing</span><h3>Real challenges</h3><p>An Impact Project and a Future Leaders’ Challenge put your learning to work on real problems.</p></div>
    <div class="tile" data-reveal style="--d:.24s"><span class="num">Financial law</span><h3>Negotiation &amp; dispute resolution</h3><p>Transferable skills essential in the modern workplace and crucial to effective leadership.</p></div>
  </div>
</div></section>
${L.ctaBand(0, { title: 'Choose a programme with <em>the profession behind it.</em>', text: 'Accredited and recognised routes in law, project management, construction and digital marketing.', primary: ['Find your programme', 'study/'], secondary: ['Start your application', 'apply/start/'] })}
`;
  return { path: 'careers-accreditation/index.html', html: L.page({ depth: 1, active: 'study', title: 'Accreditation, recognition and career routes', desc: 'What HEC, QAA, CVLE, APM, CIOB and IDM recognition means for your UoME qualification — plus the routes from an LLB or GDL to the Bar in England & Wales and Mauritius.', body, scripts: [] }) };
}

function aboutPage() {
  const initials = (n) => n.replace(/^(Professor|Mr|Ms|Mrs|Dr)\s+/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['About', null]], eyebrow: 'About UoME', title: 'Shaping tomorrow’s <em>leaders.</em>', lede: 'Since 2010, UOM Enterprise has brought University of Lancashire education to Mauritius — and built a community of more than 900 graduates.', image: 'about-uol' })}

<section class="section--tight glance" data-elementor="container:at-a-glance"><div class="wrap"><div class="stats">
  <div class="stat"><b>2010</b><span>established by the UOM Trust</span></div>
  <div class="stat"><b>2011</b><span>partnership with the University of Lancashire begins</span></div>
  <div class="stat"><b data-count="900">900<sup>+</sup></b><span>graduates and growing</span></div>
  <div class="stat"><b data-count="7">7</b><span>programmes in law, project management and digital marketing</span></div>
</div></div></section>

<section class="section" id="story" data-elementor="container:story-timeline"><div class="wrap split split--top">
  <div class="stickycol">
    <span class="eyebrow">Our story</span><h2 class="h2">Sixteen years, <em>five milestones.</em></h2>
    <p class="lede" style="margin:18px 0 28px">From a first LLM delivered under the UOM Trust to a campus in Ebene Cybercity teaching law, project management and digital marketing.</p>
    <div class="media media--16x10"><img src="assets/img/grad-hall-s.webp" alt="UoME graduation ceremony" loading="lazy"></div>
  </div>
  <div class="tl" data-timeline>${D.timeline.map(([y, t, d]) => `<div class="tl__item" data-reveal><span class="tl__y">${y}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
</div></section>

<section class="section section--navy" id="partnership" data-elementor="container:partnership"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">In partnership with</span><img src="assets/img/logos/uol-white.png" alt="University of Lancashire" style="height:64px;width:auto;margin:4px 0 26px"><h2 class="h2">A modern university with <em>nearly two centuries</em> of experience.</h2><p class="lede" style="margin:20px 0 28px">UoME entered into a partnership with the University of Lancashire in 2011 to deliver numerous courses in Mauritius. Your degree is awarded by the University and taught on the Ebene campus.</p><a class="btn" href="study/">Explore the programmes ${icon('arrow')}</a></div>
  <div><div class="statcards">
    <div class="statcard" data-reveal><b>7%</b><span>Among the top 7% of universities in the world — Center for World University Rankings 2025</span></div>
    <div class="statcard" data-reveal style="--d:.08s"><b>20%</b><span>Ranked in the top 20% in the UK for engagement with industry and the public sector</span></div>
    <div class="statcard" data-reveal style="--d:.16s"><b>5★</b><span>The maximum 5 QS Stars (Excellent) for teaching, 2025</span></div>
  </div><p class="fn">University of Lancashire rankings and ratings, as published by the University. Accreditation by professional bodies on selected postgraduate courses; terms and conditions apply.</p></div>
</div></section>

<section class="section" id="quality" data-elementor="container:quality"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Quality &amp; regulation</span><h2 class="h2">Registered. <em>Accredited. Recognised.</em></h2></div>
  <div class="tiles">
    <div class="tile"><span class="num">HEC</span><h3>Registered in Mauritius</h3><p>UOM Enterprise was established in 2010 by the UOM Trust and is registered with the Higher Education Commission as a post-secondary educational institution.</p></div>
    <div class="tile"><span class="num">7 of 7</span><h3>Every programme accredited</h3><p>All programmes delivered at UoME have gone through the rigorous process of accreditation by the HEC.</p></div>
    <div class="tile"><span class="num">QAA</span><h3>Inside the UK system</h3><p>All University of Lancashire courses delivered in Mauritius are recognised under the UK system regulated by the Quality Assurance Agency for Higher Education.</p></div>
  </div>
  <p style="margin-top:28px"><a class="link-arrow" href="careers-accreditation/">See every accreditation ${icon('arrow')}</a></p>
</div></section>

<section class="section section--soft" id="leadership" data-elementor="container:leadership"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Leadership</span><h2 class="h2">The <em>board.</em></h2></div>
  <div class="people">${D.leadership.map(([n, r]) => `<div class="person" data-reveal><div class="person__img" role="img" aria-label="Portrait placeholder for ${esc(n)}"><span aria-hidden="true">${esc(initials(n))}</span></div><div class="person__txt"><b>${esc(n)}</b><span>${esc(r)}</span></div></div>`).join('')}</div>
</div></section>

<section class="section" data-elementor="container:visit"><div class="wrap split">
  <div class="media media--16x10"><img src="assets/img/campus-atrium.webp" alt="The Core Building atrium, Ebene" loading="lazy"></div>
  <div data-reveal><span class="eyebrow">Visit us</span><h2 class="h2">Find us in <em>Ebene.</em></h2><p class="lede" style="margin:16px 0 22px">${esc(D.site.address)}. Opposite the Ebene Commercial Centre, with the metro about ten minutes away on foot.</p><div class="chips-static"><span class="chip">${esc(D.site.hours)}</span><span class="chip">Open through lunch</span></div><p style="margin-top:26px;display:flex;gap:22px;flex-wrap:wrap"><a class="btn btn--navy" href="events/#visit">Book a visit ${icon('arrow')}</a><a class="link-arrow" href="${D.site.map}">Open in Maps ${icon('arrow')}</a></p></div>
</div></section>
${L.ctaBand(0, { title: 'See what you <em>could study.</em>', text: 'Seven University of Lancashire programmes, taught in Ebene. Filter, compare and find the one that fits.', primary: ['Explore programmes', 'study/'], secondary: ['Talk to admissions', 'contact/'] })}
`;
  return { path: 'about/index.html', html: L.page({ depth: 1, active: 'about', title: 'About UoME — our story and partnership', desc: 'Established in 2010, UOM Enterprise has partnered with the University of Lancashire since 2011. Our story, quality framework and board.', body, scripts: [] }) };
}

function partnersPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Schools & partners', null]], eyebrow: 'Schools, colleges & employers', title: 'Partner with <em>UoME.</em>', lede: 'Free taster lectures and guidance for schools and colleges; part-time, accredited study for employers developing their teams.', image: 'campus-advice' })}

<section class="section" id="schools" data-elementor="container:schools"><div class="wrap">
  <div class="split split--wide-r split--top" style="margin-bottom:48px"><div data-reveal><span class="eyebrow">Schools &amp; colleges</span><h2 class="h2">Help students <em>choose with confidence.</em></h2></div><p class="lede" style="margin:0" data-reveal>Our marketing and recruitment team communicates the University’s value, listens to the needs of students and guides them towards the pathway that will shape their future.</p></div>
  <div class="tiles">
    <div class="tile" data-reveal><span class="num">01</span><h3>Free taster lectures</h3><p>Let students experience a University of Lancashire lecture before they apply.</p></div>
    <div class="tile" data-reveal style="--d:.06s"><span class="num">02</span><h3>Presentations in colleges</h3><p>We come to you with a clear guide to programmes, entry routes and fees.</p></div>
    <div class="tile" data-reveal style="--d:.12s"><span class="num">03</span><h3>Education &amp; career fairs</h3><p>Meet us at fairs such as the SVICC Career Expo and Le Bocage International School Education Fair.</p></div>
    <div class="tile" data-reveal style="--d:.18s"><span class="num">04</span><h3>One-to-one counselling</h3><p>Personal guidance for prospective undergraduate and postgraduate students, with prospectuses and key documents.</p></div>
    <div class="tile" data-reveal style="--d:.24s"><span class="num">05</span><h3>Open days &amp; road shows</h3><p>Open days on campus and road shows across the island.</p></div>
  </div>
</div></section>

<section class="section section--navy grain" id="employers" data-elementor="container:employers"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">Employers &amp; professional bodies</span><h2 class="h2">Develop your people <em>without pausing delivery.</em></h2><p class="lede" style="margin-top:18px">Our MSc and LLM programmes are part-time over 1.5 years and delivered in a hybrid format, so professionals can study while they work. Several carry accreditation from APM, CIOB or IDM.</p></div>
  <div class="whys" data-reveal>
    <div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">01</span><div><h3>Part-time, hybrid study</h3><p style="color:rgba(255,255,255,.7)">Online and on-campus learning around the working week.</p></div></div>
    <div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">02</span><div><h3>Applied dissertations</h3><p style="color:rgba(255,255,255,.7)">Research suited to the participant’s own working environment.</p></div></div>
    <div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">03</span><div><h3>Recognised by the profession</h3><p style="color:rgba(255,255,255,.7)">APM and CIOB accreditation for project and construction management; IDM for digital marketing.</p></div></div>
    <div class="why" style="border-color:var(--line-light)"><span class="num" style="font-size:1.6rem">04</span><div><h3>Alumni across sectors</h3><p style="color:rgba(255,255,255,.7)">Graduates in law, public service, government, engineering, business and technology.</p></div></div>
  </div>
</div></section>

<section class="section section--soft" id="industry" data-elementor="container:industry-partners"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Industry &amp; professional partners</span><h2 class="h2">Backed by <em>recognised bodies.</em></h2><p class="lede" style="margin-top:14px">UoME works with the University of Lancashire and professional and regulatory bodies so qualifications carry weight with employers.</p></div>
  <div class="tiles">
    <div class="tile"><span class="num">UoL</span><h3>University of Lancashire</h3><p>Awarding partner since 2011.</p></div>
    <div class="tile"><span class="num">APM</span><h3>Association for Project Management</h3><p>Accredits the MSc Project Management and MSc Construction Project Management.</p></div>
    <div class="tile"><span class="num">CIOB</span><h3>Chartered Institute of Building</h3><p>Accredits the MSc Construction Project Management.</p></div>
    <div class="tile"><span class="num">IDM</span><h3>Institute of Data &amp; Marketing</h3><p>Certification route for the MSc Digital Marketing.</p></div>
    <div class="tile"><span class="num">CVLE</span><h3>Council for Vocational Legal Education</h3><p>Recognises the LLB and GDL for the vocational examination in Mauritius.</p></div>
    <div class="tile"><span class="num">HEC</span><h3>Higher Education Commission</h3><p>Registers UoME and accredits every programme.</p></div>
  </div>
</div></section>

<section class="section" id="enquire" data-elementor="container:partner-form"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">Get in touch</span><h2 class="h2">Tell us what you <em>have in mind.</em></h2><p class="lede" style="margin-top:16px">Request a taster lecture, a college presentation, or a conversation about developing your team.</p></div>
  <div class="formcard"><form class="form" data-form data-single novalidate>
    <div class="field"><span class="lab">I represent</span><div class="opt"><label><input type="radio" name="org" value="School" checked><span>A school</span></label><label><input type="radio" name="org" value="College"><span>A college</span></label><label><input type="radio" name="org" value="Employer"><span>An employer</span></label></div></div>
    <div class="row2"><div class="field"><label class="lab" for="p1">Your name</label><input class="input" id="p1" name="name" required><span class="err"></span></div><div class="field"><label class="lab" for="p2">Organisation</label><input class="input" id="p2" name="organisation" required><span class="err"></span></div></div>
    <div class="row2"><div class="field"><label class="lab" for="p3">Email</label><input class="input" id="p3" name="email" type="email" required><span class="err"></span></div><div class="field"><label class="lab" for="p4">Phone</label><input class="input" id="p4" name="phone" type="tel"></div></div>
    <div class="field"><label class="lab" for="p5">What would you like to arrange?</label><textarea class="textarea" id="p5" name="message"></textarea></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may contact me about this request, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
    <div><button class="btn" type="submit">Send request ${icon('arrow')}</button></div>
    <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Request <em>received.</em></h3><p>Our marketing team will be in touch.</p></div>
  </form></div>
</div></section>
`;
  return { path: 'partners/index.html', html: L.page({ depth: 1, active: 'partners', title: 'Schools, colleges and employers', desc: 'Free taster lectures, college presentations, fairs and one-to-one counselling for schools — plus accredited part-time study for employers.', body, scripts: [] }) };
}

function eventsPage() {
  const ways = [['Open days', 'Visit the campus, meet the team and tour the facilities.'], ['Free taster lectures', 'Experience a University of Lancashire lecture first-hand.'], ['Education & career fairs', 'Find us at fairs and expos across Mauritius.'], ['Road shows & college talks', 'We bring the programmes to your school or college.']];
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Events', null]], eyebrow: 'Meet UoME', title: 'Come and <em>meet us.</em>', lede: 'Open days, taster lectures, fairs and one-to-one counselling — the best way to know whether UoME is right for you is to see it for yourself.' , image: 'life-diversity'})}

<section class="section" id="visit" data-elementor="container:visit-booking"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">Book a visit</span><h2 class="h2">See the campus, <em>talk to a human.</em></h2><div class="whys" style="margin-top:32px">${ways.map(([t, d], i) => `<div class="why"><span class="num" style="font-size:1.6rem">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div>
  <div class="formcard"><form class="form" data-form data-single novalidate>
    <h3 class="h3">Request a <em>visit or taster lecture.</em></h3>
    <div class="field"><span class="lab">I’d like to</span><div class="opt"><label><input type="radio" name="kind" value="Campus visit" checked><span>Visit the campus</span></label><label><input type="radio" name="kind" value="Taster lecture"><span>Attend a taster lecture</span></label><label><input type="radio" name="kind" value="One-to-one counselling"><span>One-to-one counselling</span></label></div></div>
    <div class="field"><label class="lab" for="v0">Programme of interest</label><select class="select" id="v0" name="programme"><option>Not sure yet</option>${D.programmes.map((p) => `<option>${esc(p.short)}</option>`).join('')}</select></div>
    <div class="row2"><div class="field"><label class="lab" for="v1">Your name</label><input class="input" id="v1" name="name" required><span class="err"></span></div><div class="field"><label class="lab" for="v2">Phone</label><input class="input" id="v2" name="phone" type="tel" required><span class="err"></span></div></div>
    <div class="row2"><div class="field"><label class="lab" for="v3">Email</label><input class="input" id="v3" name="email" type="email" required><span class="err"></span></div><div class="field"><label class="lab" for="v4">Preferred day</label><select class="select" id="v4" name="day"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option></select></div></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may contact me to arrange my visit, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
    <div><button class="btn" type="submit">Request my visit ${icon('arrow')}</button></div>
    <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Request <em>received.</em></h3><p>The team will confirm a time with you, Monday to Friday between 09:00 and 16:30.</p></div>
  </form></div>
</div></section>

<section class="section section--soft" id="upcoming" data-elementor="container:upcoming-events"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Coming up</span><h2 class="h2">Where to <em>meet us next.</em></h2></div>
  <div class="tiles">
    <div class="tile"><span class="num">Open day</span><h3>Campus open days</h3><p>See the classrooms, lab and library and meet the team. Dates are announced by email and on the University of Lancashire in Mauritius Facebook page.</p><p style="margin-top:14px"><a class="link-arrow" href="#visit">Register your interest ${icon('arrow')}</a></p></div>
    <div class="tile"><span class="num">Taster</span><h3>Free taster lectures</h3><p>Sit in on a University of Lancashire lecture before you apply — in our classroom or yours.</p><p style="margin-top:14px"><a class="link-arrow" href="#visit">Request a taster ${icon('arrow')}</a></p></div>
    <div class="tile"><span class="num">Fairs</span><h3>Education &amp; career fairs</h3><p>We exhibit at fairs such as the SVICC Career Expo. Follow our Facebook page for the next dates.</p><p style="margin-top:14px"><a class="link-arrow" href="https://www.facebook.com/Uclaninmauritius">Follow on Facebook ${icon('arrow')}</a></p></div>
  </div>
</div></section>

<section class="section section--paper2" id="past" data-elementor="container:events-list"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Where we’ve been</span><h2 class="h2">Recent <em>events.</em></h2><p class="lede" style="margin-top:14px">New dates are announced here and on the University of Lancashire in Mauritius Facebook page.</p></div>
  ${D.events.past.map((e) => `<article class="ev" data-reveal><div class="ev__d">${esc(e.date)}${e.time ? `<br><span style="font-size:1rem">${esc(e.time)}</span>` : ''}<small>${esc(e.kind)}</small></div><div><h3 class="h3">${esc(e.title)}</h3><p>${esc(e.text)}</p><p class="small"><b>${esc(e.place)}</b></p></div><div class="media"><img src="assets/img/${e.img}-s.webp" alt="" loading="lazy"></div></article>`).join('')}
</div></section>
${L.ctaBand(0, { title: 'Can’t make an event? <em>We’ll come to you.</em>', text: 'Ask for a one-to-one call, a taster lecture or a college presentation.', primary: ['Request a call', 'contact/?topic=visit'], secondary: ['Start your application', 'apply/start/'] })}
`;
  return { path: 'events/index.html', html: L.page({ depth: 1, active: 'apply', title: 'Events — open days, taster lectures and fairs', desc: 'Meet the UoME team: book a campus visit, a free taster lecture or one-to-one counselling, and see where we’ve been recently.', body, scripts: [] }) };
}

function galleryPage() {
  const G = [];
  const add = (cat, label, names) => names.forEach((n) => G.push([cat, label, n]));
  add('graduation', 'Graduation', ['grad-hall', 'grad-portrait', 'grad-group', 'grad-stage', 'grad-crowd', 'grad-address', 'grad-honour', 'about-uol']);
  add('campus', 'Campus', ['campus-atrium', 'core-night', 'campus-lab', 'campus-classroom', 'classroom-lecture', 'moot-1', 'moot-2', 'student-exam']);
  add('life', 'Student life', ['life-group-1', 'life-group-2', 'life-group-3', 'life-celebrate', 'life-food', 'life-diversity', 'life-clubs', 'life-food-2']);
  add('events', 'Fairs & events', ['fair-1', 'fair-2', 'fair-3', 'fair-4', 'fair-5', 'fair-6', 'fair-radio', 'campus-advice']);
  add('alumni', 'Alumni evenings', Array.from({ length: 16 }, (_, i) => `alumni-${i + 1}`));
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Gallery', null]], eyebrow: 'Moments', title: 'The UoME <em>gallery.</em>', lede: 'Graduations, classrooms, fairs and celebrations — a glimpse of life at UoME.' , image: 'grad-hall'})}
<section class="section" data-elementor="container:gallery"><div class="wrap">
  <div class="plist__filters" role="group" aria-label="Filter gallery" data-gallery-filter><button class="chip is-on" data-f="all" aria-pressed="true">All</button><button class="chip" data-f="graduation" aria-pressed="false">Graduation</button><button class="chip" data-f="campus" aria-pressed="false">Campus</button><button class="chip" data-f="life" aria-pressed="false">Student life</button><button class="chip" data-f="events" aria-pressed="false">Fairs &amp; events</button><button class="chip" data-f="alumni" aria-pressed="false">Alumni evenings</button></div>
  <div class="gal" data-gallery>${G.map(([c, l, n]) => `<figure data-cat="${c}" tabindex="0" data-full="assets/img/${n}.webp"><img src="assets/img/${n}-s.webp" alt="${esc(l)} at UoME" loading="lazy"><figcaption>${esc(l)}</figcaption></figure>`).join('')}</div>
</div></section>
<div class="lightbox" id="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><button class="n" aria-label="Next">›</button></div>
${L.ctaBand(0, { title: 'Picture yourself <em>here.</em>', text: 'Book a campus visit or find the programme that fits.', primary: ['Book a campus visit', 'events/#visit'], secondary: ['Find your programme', 'study/'] })}
`;
  return { path: 'gallery/index.html', html: L.page({ depth: 1, active: 'life', title: 'Gallery — graduation, campus and student life', desc: 'Photos from UoME graduation ceremonies, campus, student life, fairs and alumni evenings.', body, scripts: [] }) };
}

function newsPages() {
  const mins = (n) => Math.max(2, Math.round(n.sections.flatMap((s) => s.p).join(' ').split(/\s+/).length / 190));
  const cats = [...new Set(D.news.slice(1).map((n) => n.cat))];
  const feat = D.news[0], rest = D.news.slice(1);
  const card = (n, i) => `<a class="ncard" href="news/${n.slug}/" data-cat="${esc(n.cat)}" data-reveal style="--d:${(i % 3) * 0.08}s"><div class="media"><img src="assets/img/${n.img}-s.webp" alt="" loading="lazy"></div><span class="tag" style="align-self:flex-start">${esc(n.cat)} · ${mins(n)} min</span><h3>${esc(n.title)}</h3><p>${esc(n.dek)}</p><span class="link-arrow">Read the guide ${icon('arrow')}</span></a>`;
  const idx = `
${L.pageHead({ crumbs: [['Home', ''], ['Guides & news', null]], eyebrow: 'Read', title: 'Guides &amp; <em>practical answers.</em>', lede: 'Straightforward guides to qualifications, fees, applying from abroad and life on campus.', image: 'life-group-1' })}
<section class="section" data-elementor="container:guides"><div class="wrap">
  <a class="featured" href="news/${feat.slug}/" data-reveal><div class="media"><img src="assets/img/${feat.img}.webp" alt="" loading="eager"></div><div><span class="tag">Start here · ${esc(feat.cat)}</span><h2 class="h2" style="margin:16px 0 12px">${esc(feat.title)}</h2><p class="lede">${esc(feat.dek)}</p><span class="link-arrow">Read the guide ${icon('arrow')}</span></div></a>
  <div class="plist__filters" role="group" aria-label="Filter guides" data-cat-filter style="margin-top:56px"><button class="chip is-on" data-f="all" aria-pressed="true">More guides</button>${cats.map((c) => `<button class="chip" data-f="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div>
  <div class="news news--grid" data-cat-list>${D.news.slice(1).map(card).join('')}</div>
</div></section>
${L.ctaBand(0, { title: 'Still have <em>a question?</em>', text: 'Our admissions team answers questions about programmes, fees, visas and campus life every weekday.', primary: ['Ask admissions', 'contact/'], secondary: ['Find your programme', 'study/'] })}`;
  const pages = [{ path: 'news/index.html', html: L.page({ depth: 1, title: 'Guides & news', desc: 'Practical guides from UoME on qualifying law degrees, applying from abroad, fees, accreditation and campus life.', body: idx, scripts: [] }) }];
  D.news.forEach((n) => {
    const others = D.news.filter((m) => m.slug !== n.slug && (m.cat !== n.cat)).slice(0, 2);
    const progs = (n.related || []).map((s) => L.byslug(s)).filter(Boolean);
    const toc = n.sections.map((s, i) => `<li><a href="#s${i + 1}">${esc(s.h)}</a></li>`).join('');
    const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Guides & news', 'news/'], [n.cat, null]], eyebrow: `${n.kind} · ${n.cat} · ${mins(n)} min read`, title: esc(n.title), lede: esc(n.dek), image: n.img, depth: 0 })}
<div class="wrap artwrap">
  <article class="article" data-elementor="widget:post-content">
    <div class="takeaways"><b>Key takeaways</b><ul class="checks">${n.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
    ${n.sections.map((s, i) => `<section id="s${i + 1}"><h2 class="h2">${esc(s.h)}</h2>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('')}
  </article>
  <aside class="artaside">
    <div class="tocard"><b>In this guide</b><ol>${toc}</ol></div>
    <div class="factcard"><b>${esc(n.facts.title)}</b><dl>${n.facts.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>
  </aside>
</div>
${progs.length ? `<section class="section section--soft"><div class="wrap"><div class="sec-head"><span class="eyebrow">Related programmes</span><h2 class="h2">Where this <em>leads.</em></h2></div><div class="related">${progs.map((q) => `<a class="rcard" href="${L.progUrl(q)}" data-reveal><div class="media"><img src="assets/img/${q.img}-s.webp" alt="" loading="lazy"></div><small>${esc(q.levelLabel)} · ${esc(q.durationLabel)}</small><h3>${esc(q.title)}</h3></a>`).join('')}</div></div></section>` : ''}
<section class="section"><div class="wrap"><div class="sec-head sec-head--row"><div><span class="eyebrow">Keep reading</span><h2 class="h2">More <em>guides.</em></h2></div><a class="link-arrow" href="news/">All guides ${icon('arrow')}</a></div><div class="news news--two">${others.map(card).join('')}</div></div></section>
${L.ctaBand(0, { title: n.cta.title, text: n.cta.text, primary: n.cta.primary, secondary: n.cta.secondary })}`;
    pages.push({ path: `news/${n.slug}/index.html`, html: L.page({ depth: 2, title: n.title, desc: n.dek, body, scripts: [], ogimg: n.img }) });
  });
  return pages;
}

function contactPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Contact', null]], eyebrow: 'Get in touch', title: 'Let’s <em>talk.</em>', lede: 'Questions about a programme, fees, entry requirements or visiting the campus? The admissions team is here Monday to Friday — including through lunchtime.' , image: 'core-night'})}
<section class="section"><div class="wrap split split--wide-l split--top">
  <div class="formcard" data-elementor="widget:form"><form class="form" data-form data-single novalidate>
    <h2 class="h3">Send us a <em>message.</em></h2>
    <div class="field"><label class="lab" for="c0">Topic</label><select class="select" id="c0" name="topic"><option value="admissions">Admissions &amp; programmes</option><option value="fees">Fees &amp; payments</option><option value="international">International applicants</option><option value="visit">Book a campus visit</option><option value="factsheet">Request a factsheet</option><option value="story">Share my story</option><option value="other">Something else</option></select></div>
    <div class="row2"><div class="field"><label class="lab" for="c1">Name</label><input class="input" id="c1" name="name" autocomplete="name" required><span class="err"></span></div><div class="field"><label class="lab" for="c2">Email</label><input class="input" id="c2" name="email" type="email" autocomplete="email" required><span class="err"></span></div></div>
    <div class="field"><label class="lab" for="c3">Phone (optional)</label><input class="input" id="c3" name="phone" type="tel"></div>
    <div class="field"><label class="lab" for="c4">Message</label><textarea class="textarea" id="c4" name="message" maxlength="400" required></textarea><span class="err"></span></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may contact me about my enquiry, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
    <div><button class="btn" type="submit">Send message ${icon('arrow')}</button></div>
    <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Message <em>sent.</em></h3><p>Thank you — we’ll reply during office hours.</p></div>
  </form></div>
  <aside><div class="contact-cards">
    <a class="ccard" href="tel:${D.site.tel}">${icon('phone')}<div><b>${D.site.phone1}</b><span>${D.site.phone2} · ${esc(D.site.hours)}</span></div></a>
    <a class="ccard" href="${L.waLink()}">${icon('chat')}<div><b>Chat on WhatsApp</b><span>${D.site.whatsappLabel} · replies during office hours</span></div></a>
    <a class="ccard" href="mailto:${D.site.email}">${icon('mail')}<div><b style="font-size:1.15rem;word-break:break-all">${D.site.email}</b><span>Admissions &amp; general enquiries</span></div></a>
    <a class="ccard" href="mailto:${D.site.supportEmail}">${icon('mail')}<div><b style="font-size:1.15rem;word-break:break-all">${D.site.supportEmail}</b><span>Current students — student support</span></div></a>
    <a class="ccard" href="mailto:${D.site.financeEmail}">${icon('mail')}<div><b style="font-size:1.15rem;word-break:break-all">${D.site.financeEmail}</b><span>Tuition payments &amp; finance</span></div></a>
    <a class="ccard" href="${D.site.map}">${icon('pin')}<div><b>${esc(D.site.address)}</b><span>Opposite the Ebene Commercial Centre · metro 10 minutes’ walk</span></div></a>
    <div class="ccard">${icon('clock')}<div><b>${esc(D.site.hours)}</b><span>${esc(D.site.hoursNote)}</span></div></div>
  </div></aside>
</div></section>
<section class="section section--soft" id="callback" data-elementor="container:callback"><div class="wrap split split--top">
  <div><span class="eyebrow">Request a callback</span><h2 class="h2">Prefer us to <em>call you?</em></h2><p class="lede" style="margin:16px 0 0">Leave your number and a good time. An adviser will ring you back during office hours — ${esc(D.site.hours)}.</p></div>
  <div class="formcard"><form class="form" data-form data-single novalidate>
    <div class="row2"><div class="field"><label class="lab" for="cb1">Name</label><input class="input" id="cb1" name="name" autocomplete="name" required><span class="err"></span></div><div class="field"><label class="lab" for="cb2">Phone</label><input class="input" id="cb2" name="phone" type="tel" autocomplete="tel" required><span class="err"></span></div></div>
    <div class="row2"><div class="field"><label class="lab" for="cb3">Best time</label><select class="select" id="cb3" name="time"><option>Morning (09:00 – 12:00)</option><option>Lunchtime (12:00 – 13:00)</option><option>Afternoon (13:00 – 16:30)</option></select></div><div class="field"><label class="lab" for="cb4">About</label><select class="select" id="cb4" name="programme"><option>Not sure yet</option>${D.programmes.map((p) => `<option>${esc(p.short)}</option>`).join('')}</select></div></div>
    <label class="consent"><input type="checkbox" name="consent" required><span>I agree that UOM Enterprise may call me about this request, in line with its <a href="legal/">privacy notice</a>.</span></label><span class="err" data-consent-err></span>
    <div><button class="btn" type="submit">Request my callback ${icon('arrow')}</button></div>
    <div class="success" data-success hidden>${icon('check')}<h3 class="h3">Callback <em>booked.</em></h3><p>We’ll ring you at your chosen time.</p></div>
  </form></div>
</div></section>
<section class="section section--paper2"><div class="wrap"><div class="mapbox"><iframe title="Map of The Core Building, Ebene" loading="lazy" src="https://www.google.com/maps?q=The+Core+Building+Ebene+Mauritius&output=embed"></iframe></div></div></section>
`;
  return { path: 'contact/index.html', html: L.page({ depth: 1, active: '', title: 'Contact UoME — admissions, support and visits', desc: 'Contact UOM Enterprise in Ebene, Mauritius: admissions, student support, finance, and how to visit The Core Building.', body, scripts: [] }) };
}

function legalPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Privacy & legal', null]], eyebrow: 'Legal', title: 'Privacy &amp; <em>legal.</em>', lede: 'How UOM Enterprise handles your information, uses cookies and handles complaints.' })}
<section class="section"><div class="wrap wrap--narrow prose">
  <h2 class="h2" id="privacy">Privacy notice</h2>
  <p>UOM Enterprise Ltd (“UoME”) collects the personal information you give us through enquiry, application and event forms — such as your name, contact details, qualifications and programme of interest — to respond to your request, process your application and keep you informed about UoME activities.</p>
  <p>We handle personal data in line with the Data Protection Act 2017 of Mauritius. We keep your information only as long as necessary for these purposes, do not sell it, and share it only with the University of Lancashire and service providers where needed to deliver your application or studies.</p>
  <p>You may ask to see, correct or delete the information we hold about you, or withdraw your consent to be contacted, at any time by emailing <a href="mailto:${D.site.email}">${D.site.email}</a>.</p>
  <h2 class="h2" id="cookies" style="margin-top:56px">Cookies</h2>
  <p>This website uses essential cookies and local storage to make features work — for example, to remember your programme shortlist or audience choice. Where we use analytics or marketing cookies, we ask for your consent first. You can change your choice in your browser settings at any time.</p>
  <h2 class="h2" id="complaints" style="margin-top:56px">Complaints</h2>
  <p>If you are not satisfied with any aspect of our service, please contact the student support team on ${D.site.phone1} / ${D.site.phone2} or at <a href="mailto:${D.site.supportEmail}">${D.site.supportEmail}</a>. They will guide you through the complaints procedure.</p>
  <h2 class="h2" id="terms" style="margin-top:56px">Website terms</h2>
  <p>The information on this website is provided for general guidance. Programme details, fees and dates are confirmed in your letter of offer. University of Lancashire rankings and ratings are quoted as published by the University. Accreditation by professional bodies is available on selected postgraduate courses; terms and conditions apply.</p>
</div></section>
`;
  return { path: 'legal/index.html', html: L.page({ depth: 1, title: 'Privacy, cookies and legal', desc: 'UoME privacy notice, cookie information, complaints procedure and website terms.', body, scripts: [] }) };
}

function notFound() {
  const body = `<section class="section section--navy grain" style="min-height:70vh;display:grid;align-items:center"><div class="wrap"><span class="eyebrow">404</span><h1 class="display">That page has <em>left campus.</em></h1><p class="lede" style="margin:22px 0 34px">The page you’re looking for may have moved. Try the course finder, or call us on ${D.site.phone1}.</p><div style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn--gold" href="./">Back to the homepage ${icon('arrow')}</a><a class="btn btn--ghost-light" href="study/">Find a programme</a></div></div></section>`;
  return { path: '404.html', html: L.page({ depth: 0, title: 'Page not found', desc: 'Page not found.', body, scripts: [] }) };
}

function partnersAndRest() {
  return [careersPage(), aboutPage(), partnersPage(), eventsPage(), galleryPage(), ...newsPages(), contactPage(), legalPage(), notFound()];
}
module.exports = partnersAndRest;
