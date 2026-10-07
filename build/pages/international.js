const D = require('../data');
const L = require('../layout');
const { icon, esc } = L;

const STEPS = [
  ['Download the application form', 'Request the form by email or download it from the Apply page, together with the international checklist.', ['Complete every section of the form', 'Write your personal statement on why you want the course', 'Sign and date the form']],
  ['Gather your documents', 'Prepare copies of your academic certificates and transcripts from high school onwards.', ['Copy of your passport and birth certificate', 'One reference letter (undergraduate) or two (postgraduate)', 'Passport photographs: two (undergraduate) or one (postgraduate)']],
  ['Email your application', 'Send your application and supporting documents to the admissions office.', [D.site.email, 'International students are not required to pay the Rs 1,000 application fee']],
  ['Receive your letter of offer', 'If you are selected for the programme, you will receive a letter of offer within one week of a complete application.', ['Review the programme, fees and payment details in your offer']],
  ['Accept & make your first payment', 'Confirm your seat with a first payment of 50% of annual or total course fees, by bank transfer to the State Bank of Mauritius.', ['Fees are published in GBP', 'A 5% discount applies if full fees are paid on enrolment']],
  ['We process your student visa', 'Once your first payment is received, UoME applies for the student visa that lets you travel to Mauritius.', ['Passport copy and acceptance letter', 'Sponsor letter confirming financial responsibility', 'Proof of sufficient funds', 'Accommodation must be secured first']],
  ['Arrive & complete your medical', 'We can arrange airport pick-up. Within one month of arrival, complete the medical check required by the Passport and Immigration Office.', ['HIV and Hepatitis B tests and a chest X-ray at any private laboratory, clinic or hospital in Mauritius', 'Email your flight details at least five days before you travel']],
];

module.exports = function international() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['International', null]], eyebrow: 'International students', title: 'Study in the <em>Indian Ocean.</em>', lede: 'A University of Lancashire degree, a student visa handled for you, accommodation lists from dedicated landlords and airport pick-up — everything you need to move to Mauritius with confidence.', image: 'core-night', extra: `<div style="margin-top:30px;display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn--gold" href="apply/start/?who=intl">Start an enquiry ${icon('arrow')}</a><a class="btn btn--ghost-light" href="#journey">See the seven steps</a></div>` })}

<section class="section" id="journey" data-elementor="container:journey"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Your journey to Mauritius</span><h2 class="h2">Seven steps. <em>No surprises.</em></h2><p class="lede jr__hint" style="margin-top:14px">Select a step to see what happens and what we need from you.</p></div>
  <div class="jr" data-journey>
    <div class="jr__nav" role="tablist" aria-label="Journey steps">${STEPS.map(([t], i) => `<button class="jr__btn" role="tab" aria-selected="${i === 0}" data-i="${i}"><span class="num">0${i + 1}</span><b>${esc(t)}</b></button>`).join('')}</div>
    <div>${STEPS.map(([t, d, l], i) => `<div class="jr__pane ${i === 0 ? 'is-on' : ''}" data-i="${i}" role="tabpanel"><span class="eyebrow">Step ${i + 1} of 7</span><h3 class="h2" style="font-size:2.2rem">${esc(t)}</h3><p class="lede" style="margin-bottom:22px">${esc(d)}</p><ul>${l.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>${i < 6 ? `<p style="margin-top:26px"><button class="link-arrow" style="background:none;border-width:0 0 1.5px;cursor:pointer;font-size:inherit" data-next-step>Next step ${icon('arrow')}</button></p>` : `<p style="margin-top:26px"><a class="btn" href="apply/start/?who=intl">Start your enquiry ${icon('arrow')}</a></p>`}</div>`).join('')}</div>
  </div>
</div></section>


<section class="section section--navy grain" id="visa" data-elementor="container:visa"><div class="wrap split split--top">
  <div data-reveal><span class="eyebrow">Student visa</span><h2 class="h2">We handle the <em>visa process</em> with you.</h2></div>
  <div class="prose on-dark" data-reveal style="color:rgba(255,255,255,.85)">
    <p>Once you notify us of your acceptance and your first payment is received, UoME applies for your student visa to enter Mauritius.</p>
    <p><b style="color:#fff">What’s required:</b> copies of your passport, your acceptance letter, a sponsor letter confirming financial responsibility, and proof of sufficient funds. A student visa cannot be processed until accommodation has been secured.</p>
    <p><b style="color:#fff">How long it lasts:</b> a minimum of one year, renewable every year provided you remain registered with UoME the following year.</p>
  </div>
</div></section>

<section class="section section--paper2" id="accommodation" data-elementor="container:accommodation"><div class="wrap">
  <div class="split split--top">
    <div data-reveal><span class="eyebrow">Accommodation &amp; arrival</span><h2 class="h2">A place to live <em>before you land.</em></h2><div class="prose" style="margin-top:20px"><p>UoME works with dedicated landlords who offer a range of private accommodation at reasonable prices. We send you the available options with prices and photos so you can choose — and you may share an apartment or house with other students. We can help with your negotiations with the landlord and with the lease agreement.</p><p><b>Airport pick-up.</b> We can arrange for you to be collected from the airport and delivered safely to your accommodation. Email us your flight details at least five days before travel (taxi fare payable by the student).</p></div></div>
    <div class="tiles" style="grid-template-columns:1fr">
      <div class="tile" data-reveal><span class="num">Ebene</span><h3>Walking distance to campus</h3><p>Ebene Cybercity — the financial, banking and BPO-ICT hub of Mauritius.</p></div>
      <div class="tile" data-reveal><span class="num">Quatre Bornes</span><h3>A short journey away</h3><p>Established residential area with shops and transport links.</p></div>
      <div class="tile" data-reveal><span class="num">Rose-Hill</span><h3>Connected by metro and bus</h3><p>A lively town with markets, food and student-friendly housing.</p></div>
    </div>
  </div>
</div></section>

${L.filmBand(D.videos.mauritius, { eyebrow: 'Welcome', title: 'Your new home, <em>in two minutes.</em>', text: 'See Ebene, the campus and everyday life in Mauritius before you pack.', chips: ['Ebene', 'Campus', 'Student life', 'Getting around'], dur: '2:00' })}

<section class="section" id="cost" data-elementor="container:cost-of-living"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Cost of living</span><h2 class="h2">Build your <em>monthly budget.</em></h2><p class="lede" style="margin-top:14px">Approximate costs from UoME. Adjust the sliders to see a monthly and annual picture — the yearly cost of living is estimated at around £3,500.</p></div>
  <div class="est" data-cost>
    <div class="est__ctl">
      <div><label class="lab" for="c-rent">Monthly rent (shared apartment, utilities &amp; wifi included): <b data-o="rent"></b></label><input class="range" id="c-rent" type="range" min="0" max="1" step="0.05" value="0.5"><p class="small" style="margin:4px 0 0">Approx. £250 · Rs 10,000 – 15,000</p></div>
      <div><label class="lab" for="c-food">Food — groceries for one person: <b data-o="food"></b></label><input class="range" id="c-food" type="range" min="0" max="1" step="0.05" value="0.5"><p class="small" style="margin:4px 0 0">Approx. £83 · Rs 4,000 – 5,000 a month</p></div>
      <div><label class="lab" for="c-eat">Meals out per month: <b data-o="eat"></b></label><input class="range" id="c-eat" type="range" min="0" max="16" step="1" value="4"><p class="small" style="margin:4px 0 0">Approx. £8 a meal · Rs 300 – 500</p></div>
      <div><label class="lab" for="c-taxi">Private taxi journeys per month: <b data-o="taxi"></b></label><input class="range" id="c-taxi" type="range" min="0" max="20" step="1" value="2"><p class="small" style="margin:4px 0 0">Approx. £8 a journey · Rs 500 – 600. Buses are under £2 (Rs 70) — and students benefit from free bus transport to and from the university under government support programmes.</p></div>
      <div class="seg" role="group" aria-label="Currency"><button type="button" data-cur="gbp" aria-pressed="true">Pounds (£)</button><button type="button" data-cur="mur" aria-pressed="false">Rupees (Rs)</button></div>
    </div>
    <div class="est__out">
      <span class="eyebrow" style="color:var(--gold-2)">Your estimated budget</span>
      <div class="est__big"><span data-o="month">£0</span><small>per month</small></div>
      <table class="col"><tbody><tr><th>Rent</th><td data-o="t-rent"></td></tr><tr><th>Groceries</th><td data-o="t-food"></td></tr><tr><th>Meals out</th><td data-o="t-eat"></td></tr><tr><th>Taxis</th><td data-o="t-taxi"></td></tr><tr class="col__tot"><th>Over 12 months</th><td data-o="year"></td></tr></tbody></table>
      <p class="small" style="color:rgba(255,255,255,.7);margin-top:16px">Excludes tuition, clothing and leisure. A T-shirt costs around £7 (Rs 350 – 500) and a pair of jeans around £15 (Rs 500 – 1,000).</p>
    </div>
  </div>
</div></section>

<section class="section section--white" id="about" data-elementor="container:about-mauritius"><div class="wrap">
  <div class="split split--top">
    <div data-reveal><span class="eyebrow">Living in Mauritius</span><h2 class="h2">An island <em>that welcomes</em> the world.</h2></div>
    <div class="prose" data-reveal><p>Mauritius sits in the middle of the Indian Ocean, about 2,400 km off the east coast of Africa. Over 150 kilometres of white sandy beaches surround it, and its lagoons are protected by the world’s third largest coral reef.</p><p>The country is multi-ethnic and multicultural, with a population of about 1.2 million. Its government system is closely modelled on the British Westminster parliamentary system, and the country is highly ranked for democracy and for economic and political freedom. The capital is Port Louis.</p></div>
  </div>
  <div class="stats stats--sm" style="margin-top:56px"><div class="stat stat--sm"><b>15–33<sup>°C</sup></b><span style="color:var(--mute)">year-round tropical climate</span></div><div class="stat stat--sm"><b>1.2<sup>m</sup></b><span style="color:var(--mute)">people in a multicultural island nation</span></div><div class="stat stat--sm"><b>150<sup>km</sup></b><span style="color:var(--mute)">of white sandy beaches</span></div><div class="stat stat--sm"><b>10<sup>min</sup></b><span style="color:var(--mute)">on foot from campus to the metro station</span></div></div>
</div></section>

<section class="section section--soft" id="faqs" data-elementor="container:intl-faq"><div class="wrap split split--top">
  <div><span class="eyebrow">FAQs</span><h2 class="h2">Moving to Mauritius: <em>your questions.</em></h2><p style="margin-top:20px"><a class="link-arrow" href="faq/">All FAQs ${icon('arrow')}</a></p></div>
  <div>${L.faqList('International')}</div>
</div></section>
${L.ctaBand(0, { title: 'Ready to <em>make the move?</em>', text: 'Tell us where you’re applying from and which programme interests you — an adviser will guide you through every step.', primary: ['Start your enquiry', 'apply/start/?who=intl'], secondary: ['Download the international checklist', 'assets/docs/application-checklist-international.pdf'] })}
`;
  return { path: 'international/index.html', html: L.page({ depth: 1, active: 'international', title: 'International students — visa, accommodation and cost of living', desc: 'Study at UoME from abroad: a seven-step journey from application to arrival, student visa support, accommodation in Ebene, airport pick-up and a cost-of-living calculator.', body, scripts: ['estimator'] }) };
};
