const D = require('../data');
const L = require('../layout');
const { icon, esc, progUrl } = L;

const reqList = (arr) => `<ul class="checks">${arr.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>`;

function applyPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Apply', null]], eyebrow: 'Admissions', title: 'Apply to UoME <em>with confidence.</em>', lede: 'Clear steps, published fees and a team that treats every applicant as an individual. Here is everything you need — from entry requirements to your first payment.', extra: `<div style="margin-top:30px;display:flex;gap:14px;flex-wrap:wrap"><a class="btn btn--gold" href="apply/online/">Start your application ${icon('arrow')}</a><a class="btn btn--ghost-light" href="#forms">Download the forms</a></div>` , image: 'grad-stage'})}

<nav class="subnav" aria-label="On this page" data-subnav><div class="wrap subnav__in"><a href="#steps">How to apply</a><a href="#requirements">Entry requirements</a><a href="#forms">Forms</a><a href="#intakes">Key dates</a><a href="#fees">Fees</a><a href="#instalments">Payment</a><a href="#refund">Refunds</a></div></nav>

<section class="section--tight routes" data-elementor="container:apply-routes"><div class="wrap"><div class="rt3">
  <a class="rt" href="apply/online/" data-reveal><span class="num">01</span><b>Apply online</b><span>Seven short steps, saved as you go. About 10 minutes.</span>${icon('arrow')}</a>
  <a class="rt" href="apply/start/" data-reveal style="--d:.07s"><span class="num">02</span><b>Register your interest</b><span>Not ready yet? Two minutes and an adviser will guide you.</span>${icon('arrow')}</a>
  <a class="rt" href="#forms" data-reveal style="--d:.14s"><span class="num">03</span><b>Download the form</b><span>Prefer paper? Take the pack and send it by email or in person.</span>${icon('arrow')}</a>
</div></div></section>

<section class="section" id="steps" data-elementor="container:apply-steps"><div class="wrap">
  <div class="split split--head"><div data-reveal><span class="eyebrow">How to apply</span><h2 class="h2">Six steps to <em>your offer letter.</em></h2></div>
  <div class="tabs" role="tablist" data-tabs style="align-self:end;justify-content:flex-start"><button class="chip is-on" role="tab" aria-selected="true" data-t="local">Mauritian applicants</button><button class="chip" role="tab" aria-selected="false" data-t="intl">International applicants</button></div></div>
  <div class="tabpanel is-on" data-p="local"><div class="whys">
    <div class="why"><span class="num" style="font-size:1.6rem">01</span><div><h3>Complete the application form</h3><p>Fill in every section — qualifications (Section 6), your personal statement on why you want the course (Section 9) and your referees (Section 12): one for an undergraduate course, two for graduate and postgraduate courses.</p></div></div>
    <div class="why"><span class="num" style="font-size:1.6rem">02</span><div><h3>Gather your documents</h3><p>See the checklist below. Bring your originals to the office for verification.</p></div></div>
    <div class="why"><span class="num" style="font-size:1.6rem">03</span><div><h3>Submit &amp; pay the application fee</h3><p>Submit in person to the Admissions Office, or email the scanned form and documents to ${esc(D.site.email)}. The application fee is Rs 1,000 (non-refundable), payable by bank transfer to the UoME SBM account.</p></div></div>
    <div class="why"><span class="num" style="font-size:1.6rem">04</span><div><h3>Receive your letter of offer</h3><p>If you are selected, you receive a letter of offer within 3 working days of a complete application.</p></div></div>
    <div class="why"><span class="num" style="font-size:1.6rem">05</span><div><h3>Accept your offer</h3><p>Email ${esc(D.site.supportEmail)} to accept the offer.</p></div></div>
    <div class="why"><span class="num" style="font-size:1.6rem">06</span><div><h3>Pay your first instalment</h3><p>Make a first payment of 50% of your annual or total course fees to confirm your seat. Payment details are in your offer letter.</p></div></div>
  </div></div>
  <div class="tabpanel" data-p="intl"><div class="notice"><b>Applying from abroad?</b> International applicants follow the same form and checklist, with no application fee, an offer within one week, and visa support once the first payment is received. <a href="international/#journey"><b>See the seven-step journey →</b></a></div><p style="margin-top:22px"><a class="btn" href="international/#journey">Your journey to Mauritius ${icon('arrow')}</a></p></div>
</div></section>

<section class="section section--paper2" id="requirements" data-elementor="container:entry-requirements"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Entry requirements</span><h2 class="h2">What we look for — <em>and how flexible we are.</em></h2><p class="lede" style="margin-top:16px">UoME operates a flexible admissions policy. We consider your educational achievements, predicted grades, work experience and personal statement together.</p></div>
  <div class="tabs" role="tablist" data-tabs><button class="chip is-on" role="tab" aria-selected="true" data-t="ug">Undergraduate (LLB)</button><button class="chip" role="tab" aria-selected="false" data-t="g">Graduate (GDL)</button><button class="chip" role="tab" aria-selected="false" data-t="pg">Postgraduate (LLM, MSc)</button></div>
  <div class="tabpanel is-on" data-p="ug"><div class="split split--top"><div><h3 class="h3" style="margin-bottom:12px">Mauritian applicants</h3>${reqList(D.programmes[0].entry.local)}</div><div><h3 class="h3" style="margin-bottom:12px">International applicants</h3>${reqList(D.programmes[0].entry.international)}</div></div></div>
  <div class="tabpanel" data-p="g"><div class="split split--top"><div><h3 class="h3" style="margin-bottom:12px">Mauritian applicants</h3>${reqList(D.programmes[2].entry.local)}</div><div><h3 class="h3" style="margin-bottom:12px">International applicants</h3>${reqList(D.programmes[2].entry.international)}</div></div></div>
  <div class="tabpanel" data-p="pg"><div class="split split--top"><div><h3 class="h3" style="margin-bottom:12px">All postgraduate programmes</h3>${reqList(['A bachelor degree of 2:2 classification or higher in a relevant area, or appropriate professional experience', 'English: Grade C at O/SC level, or IELTS 6.0 – 6.5 (International: 6.5; MSc Digital Marketing 6.5; MSc Project Management and MSc Construction Project Management 6.0)'])}</div><div><h3 class="h3" style="margin-bottom:12px">Programme-specific</h3>${reqList(['MSc Project Management: honours degree in a management discipline', 'MSc Construction Project Management: honours degree in a construction or engineering discipline', 'MSc Digital Marketing: honours degree, 2:2 or higher', 'LLM Financial & Commercial Law: Honours degree (lower second or above) or equivalent professional qualification'])}</div></div></div>
  <p style="margin-top:28px"><a class="link-arrow" href="study/">Check a specific programme ${icon('arrow')}</a></p>
</div></section>

<section class="section" id="forms" data-elementor="container:apply-forms"><div class="wrap">
  <div class="split split--wide-r split--top">
    <div data-reveal><span class="eyebrow">Forms &amp; checklists</span><h2 class="h2">Your <em>application pack.</em></h2><p class="lede" style="margin-top:18px">Prefer to do it on paper? Download, complete, and send it to us — or start with a two-minute enquiry and we will guide you.</p></div>
    <div>
      <a class="big-link" href="assets/docs/uome-application-form.docx" download><span>Application form<small>For undergraduate and postgraduate taught courses (Word)</small></span>${icon('arrow')}</a>
      <a class="big-link" href="assets/docs/application-checklist-local.pdf" download><span>Application checklist — Mauritian applicants<small>Documents, entry requirements and steps (PDF)</small></span>${icon('arrow')}</a>
      <a class="big-link" href="assets/docs/application-checklist-international.pdf" download><span>Application checklist — International applicants<small>Documents, entry requirements and steps (PDF)</small></span>${icon('arrow')}</a>
    </div>
  </div>
  <div class="split split--top hide-m" style="margin-top:64px">
    <div><h3 class="h3" style="margin-bottom:14px">Documents to prepare <em style="font-size:.7em">(Mauritian applicants)</em></h3><ul class="checks"><li>“O” Level / SC statement of results or certificate</li><li>“A” Level / HSC statement of results or certificate, French Bac or International Bac</li><li>Undergraduate / postgraduate degree certificate and transcript</li><li>National Identity Card (NIC) and birth certificate</li><li>Personal statement</li><li>1 reference letter (undergraduate) or 2 (postgraduate)</li><li>2 passport-size photographs (undergraduate) or 1 (graduate / postgraduate)</li><li>A recent utility bill as proof of address</li></ul></div>
    <div><h3 class="h3" style="margin-bottom:14px">Documents to prepare <em style="font-size:.7em">(International applicants)</em></h3><ul class="checks"><li>“O” Level and “A” Level results or equivalent, French Bac or International Bac</li><li>Degree certificate and transcript (if required)</li><li>A copy of your passport and your birth certificate</li><li>Personal statement</li><li>1 reference letter (undergraduate) or 2 (postgraduate)</li><li>Passport-size photographs: 2 (undergraduate) or 1 (graduate / postgraduate)</li><li>Originals to be brought to Mauritius for verification</li></ul></div>
  </div>
</div></section>

<section class="section section--paper2" id="intakes" data-elementor="container:intakes"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Key dates</span><h2 class="h2">Three <em>intakes</em> a year.</h2></div>
  <div class="tiles">
    ${D.intakes.map((it, i) => `<div class="tile" data-reveal style="--d:${i * 0.08}s"><span class="num">0${i + 1}</span><h3>${esc(it.label)}</h3><p>${it.programmes.map((s) => esc(L.byslug(s).short)).join(' · ')}</p><p style="margin-top:14px"><a class="link-arrow" href="apply/online/?intake=${it.id}">Apply for ${esc(it.label.split(' ')[0])} ${icon('arrow')}</a></p></div>`).join('')}
  </div>
  <p class="small hide-m" style="margin-top:24px">Instalment due dates follow your intake: September intake — on acceptance, by 30 January, by 30 April. February intake — on acceptance, by 30 April, by 31 July. January intake — on acceptance, by 30 April, by 31 August.</p>
</div></section>

<section class="section" id="fees" data-elementor="container:fees-estimator"><div class="wrap">
  <div class="sec-head" data-reveal><span class="eyebrow">Fees &amp; savings estimator</span><h2 class="h2">See exactly what you’d <em>pay — and save.</em></h2><p class="lede" style="margin-top:16px">Choose your programme and intake. Local students pay in Mauritian rupees; international students in pounds sterling.</p></div>
  <div class="est" data-est>
    <div class="est__ctl">
      <div><label class="lab" for="e-prog">Programme</label><select class="select" id="e-prog">${D.programmes.map((p) => `<option value="${p.fee}|${p.slug}">${esc(p.short)}</option>`).join('')}</select></div>
      <div data-gdl style="display:none"><label class="lab" for="e-var">Study mode</label><select class="select" id="e-var"><option value="ft">Full-time (1 year)</option><option value="pt">Part-time (2 years)</option></select></div>
      <div><span class="lab">I am a</span><div class="seg" role="group" aria-label="Student type"><button type="button" data-seg="who" data-v="local" aria-pressed="true">Mauritian student · MUR</button><button type="button" data-seg="who" data-v="intl" aria-pressed="false">International · GBP</button></div></div>
      <div><label class="lab" for="e-int">Intake</label><select class="select" id="e-int"></select></div>
      <div><span class="lab">Payment</span><div class="seg" role="group" aria-label="Payment option"><button type="button" data-seg="pay" data-v="inst" aria-pressed="true">Three instalments</button><button type="button" data-seg="pay" data-v="full" aria-pressed="false">Pay in full · save 5%</button></div></div>
    </div>
    <div class="est__out" aria-live="polite">
      <span class="eyebrow" style="color:var(--gold-2)" data-e-title>Your estimate</span>
      <div class="est__big"><span data-e-amount>Rs 0</span><small data-e-unit>per year</small></div>
      <div class="est__save" data-e-save hidden>You save <b data-e-saving>Rs 0</b> by paying in full. <span class="small" style="color:rgba(255,255,255,.75)" data-e-savenote></span></div>
      <div class="insts" data-e-insts></div>
      <p class="small" style="color:rgba(255,255,255,.7);margin-top:18px" data-e-note></p>
      <p style="margin-top:22px;position:relative"><a class="btn btn--gold" data-e-apply href="apply/online/">Apply for this programme ${icon('arrow')}</a></p>
    </div>
  </div>
</div></section>

<section class="section section--paper2" id="instalments" data-elementor="container:payment-info"><div class="wrap"><div class="split split--top">
  <div data-reveal><span class="eyebrow">How to pay</span><h2 class="h2">Flexible, <em>transparent</em> payment.</h2></div>
  <div class="prose" data-reveal><p><b>Mauritian students (MUR).</b> Pay by office cheque, banker’s cheque or bank transfer to the UoME account at SBM. A 5% discount applies when full fees are paid by the early-payment deadline for your intake.</p><p><b>International students (GBP).</b> Pay by bank transfer to the State Bank of Mauritius only. A 5% discount applies when full fees are paid on enrolment.</p><p>Questions about instalments or payment arrangements? Email the finance team at <a href="mailto:${D.site.financeEmail}">${D.site.financeEmail}</a>.</p></div>
</div></div></section>

<section class="section" id="refund" data-elementor="container:refund"><div class="wrap wrap--narrow">
  <span class="eyebrow">Refund policy</span><h2 class="h2" style="margin-bottom:26px">If your plans <em>change.</em></h2>
  <table class="reftable"><tbody>
    <tr><td>Withdraw before the start of the semester</td><td>100%</td></tr>
    <tr><td>Withdraw within two weeks after the start of the semester</td><td>70%</td></tr>
    <tr><td>Withdraw between three and eight weeks after the start</td><td>50%</td></tr>
    <tr><td>Withdraw more than eight weeks after the start of the first semester</td><td>No refund</td></tr>
  </tbody></table>
</div></section>

${L.ctaBand(0, { title: 'Ready when <em>you are.</em>', text: 'Register your interest in two minutes — an adviser will confirm requirements and send your application pack.', primary: ['Start your application', 'apply/online/'], secondary: ['Book a campus visit', 'events/#visit'] })}
`;
  return { path: 'apply/index.html', html: L.page({ depth: 1, active: 'apply', title: 'How to apply — admissions, fees and entry requirements', desc: 'Apply to UoME: six clear steps, entry requirements, application forms, published tuition fees in MUR and GBP, instalment plans and a savings estimator.', body, scripts: ['estimator'] }) };
}

function startPage() {
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Apply', 'apply/'], ['Start', null]], eyebrow: 'Register your interest', title: 'Register your <em>interest.</em>', lede: 'Three short steps. We’ll use your answers to point you to the right adviser, share the right forms, and answer the questions that matter to you.', depth: 0 })}
<section class="section"><div class="wrap split split--wide-l split--top">
  <div class="formcard" data-elementor="widget:form">
    <form class="form" data-form novalidate>
      <div class="steps" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
      <div class="fstep is-on" data-step="1">
        <h2 class="h3">First, a little about <em>you.</em></h2>
        <div class="row2"><div class="field"><label class="lab" for="fn">First name</label><input class="input" id="fn" name="first" autocomplete="given-name" required><span class="err"></span></div><div class="field"><label class="lab" for="ln">Last name</label><input class="input" id="ln" name="last" autocomplete="family-name" required><span class="err"></span></div></div>
        <div class="row2"><div class="field"><label class="lab" for="em">Email</label><input class="input" id="em" name="email" type="email" autocomplete="email" required><span class="err"></span></div><div class="field"><label class="lab" for="ph">Phone</label><input class="input" id="ph" name="phone" type="tel" autocomplete="tel" required><span class="err"></span></div></div>
        <div class="field"><span class="lab">I am</span><div class="opt"><label><input type="radio" name="who" value="Mauritian applicant" checked><span>Applying from Mauritius</span></label><label><input type="radio" name="who" value="International applicant"><span>Applying from abroad</span></label></div></div>
        <div><button type="button" class="btn" data-next>Continue ${icon('arrow')}</button></div>
      </div>
      <div class="fstep" data-step="2">
        <h2 class="h3">What would you like to <em>study?</em></h2>
        <div class="field"><label class="lab" for="pg">Programme</label><select class="select" id="pg" name="programme" required><option value="">Choose a programme…</option>${D.programmes.map((p) => `<option value="${p.slug}">${esc(p.title)}</option>`).join('')}<option value="undecided">I’m not sure yet — help me choose</option></select><span class="err"></span></div>
        <div class="row2"><div class="field"><label class="lab" for="in">Preferred intake</label><select class="select" id="in" name="intake"><option>January 2027</option><option>February 2027</option><option>September 2027</option><option>Not sure yet</option></select></div>
        <div class="field"><label class="lab" for="qual">Highest qualification so far</label><select class="select" id="qual" name="qualification"><option>A-levels / HSC / equivalent</option><option>Bachelor degree in law</option><option>Bachelor degree in another subject</option><option>Degree plus work experience</option></select></div></div>
        <div class="shortlist-note" data-shortlist-note hidden></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><button type="button" class="btn btn--ghost" data-prev>Back</button><button type="button" class="btn" data-next>Continue ${icon('arrow')}</button></div>
      </div>
      <div class="fstep" data-step="3">
        <h2 class="h3">How can we <em>help?</em></h2>
        <div class="field"><label class="lab" for="msg">Your questions (optional)</label><textarea class="textarea" id="msg" name="message" maxlength="400" placeholder="Fees, entry requirements, study while working, visas…"></textarea></div>
        <div class="field"><span class="lab">Best way to reach you</span><div class="opt"><label><input type="radio" name="contact" value="Phone call" checked><span>Phone call</span></label><label><input type="radio" name="contact" value="Email"><span>Email</span></label><label><input type="radio" name="contact" value="Campus visit"><span>Visit the campus</span></label></div></div>
        <label class="consent"><input type="checkbox" name="consent" required> <span>I agree that UOM Enterprise may contact me about my enquiry and store my details in line with its <a href="legal/">privacy notice</a> and the Data Protection Act 2017 (Mauritius).</span></label><span class="err" data-consent-err></span>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><button type="button" class="btn btn--ghost" data-prev>Back</button><button type="submit" class="btn btn--gold">Send my enquiry ${icon('arrow')}</button></div>
      </div>
      <div class="success" data-success hidden>${icon('check')}<h2 class="h3">Thank you — <em>we’ve got it.</em></h2><p class="lede" style="margin:12px auto 24px">An adviser from the UoME admissions team will be in touch using your preferred method.</p><ol class="next3"><li><b>We contact you</b><span>During office hours, using the method you chose.</span></li><li><b>You apply</b><span>Apply online or send the application pack — we confirm requirements first.</span></li><li><b>You receive an offer</b><span>Within 3 working days of a complete application (1 week for international applicants).</span></li></ol><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn" href="apply/online/">Apply online</a><a class="btn btn--ghost" href="study/">Keep exploring</a></div></div>
    </form>
  </div>
  <aside class="stack" data-reveal>
    <div class="aside__card" style="background:var(--navy)"><span class="eyebrow" style="color:var(--gold-2)">What happens next</span><ul class="checks" style="color:#fff"><li style="border-color:var(--line-light)">An admissions adviser contacts you during office hours</li><li style="border-color:var(--line-light)">We confirm entry requirements for your programme</li><li style="border-color:var(--line-light)">You submit your application and receive an offer letter within 3 working days of a complete application</li></ul></div>
    <div class="aside__help"><b>Prefer to talk?</b><br>Call <a href="tel:${D.site.tel}">${D.site.phone1}</a><br>${esc(D.site.hours)}<br><span class="small">${esc(D.site.hoursNote)}</span></div>
  </aside>
</div></section>
`;
  return { path: 'apply/start/index.html', html: L.page({ depth: 2, active: 'apply', title: 'Register your interest', desc: 'Register your interest in a University of Lancashire programme at UoME in three short steps and an adviser will be in touch.', body, scripts: [] }) };
}

module.exports = () => [applyPage(), startPage()];
