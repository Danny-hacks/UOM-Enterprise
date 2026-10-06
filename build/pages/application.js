const D = require('../data');
const L = require('../layout');
const { icon, esc } = L;

const STEPS = ['Programme', 'About you', 'Education', 'Statement', 'Referees', 'Documents', 'Review'];

function applicationPage() {
  const progOpts = D.programmes.map((p) => `<option value="${p.slug}" data-level="${p.level}" data-intakes="${p.intakes.join(',')}" data-entry="${esc(p.entry.local[0])}">${esc(p.title)}</option>`).join('');
  const body = `
${L.pageHead({ crumbs: [['Home', ''], ['Apply', 'apply/'], ['Online application', null]], eyebrow: 'Apply online', title: 'Your <em>application.</em>', lede: 'Seven short steps. Your progress saves automatically on this device, so you can stop and come back whenever you like.', image: 'grad-stage' })}

<section class="section" data-elementor="container:online-application"><div class="wrap split split--wide-l split--top">
  <div>
    <div class="resume" data-resume hidden><b>Welcome back.</b> We saved your progress on this device. <button type="button" class="link-arrow" data-resume-go>Continue where you left off</button> · <button type="button" class="link-arrow" data-resume-clear>Start again</button></div>
    <p class="stepname" data-stepname aria-live="polite">Step 1 of 7 · Programme</p>
    <ol class="appsteps" data-appsteps aria-label="Application progress" tabindex="0">${STEPS.map((s, i) => `<li${i === 0 ? ' class="is-on"' : ''}><span>${i + 1}</span><b>${esc(s)}</b></li>`).join('')}</ol>
    <form class="form app" data-app novalidate>
      <div class="fstep is-on" data-step="1">
        <h2 class="h3">Which programme and <em>which intake?</em></h2>
        <div class="field"><label class="lab" for="a-prog">Programme</label><select class="select" id="a-prog" name="programme" required><option value="">Choose a programme…</option>${progOpts}</select><span class="err"></span></div>
        <div class="row2"><div class="field"><label class="lab" for="a-int">Intake</label><select class="select" id="a-int" name="intake" required><option value="">Choose an intake…</option></select><span class="err"></span></div>
        <div class="field"><label class="lab" for="a-mode">Study mode</label><select class="select" id="a-mode" name="mode"><option>As published for the programme</option><option>Full-time</option><option>Part-time</option></select></div></div>
        <div class="field"><span class="lab">I am applying from</span><div class="opt"><label><input type="radio" name="who" value="local" checked><span>Mauritius</span></label><label><input type="radio" name="who" value="intl"><span>Overseas</span></label></div></div>
        <div class="notice" data-entry-note hidden></div>
      </div>
      <div class="fstep" data-step="2">
        <h2 class="h3">About <em>you.</em></h2>
        <div class="row2"><div class="field"><label class="lab" for="a-fn">First name</label><input class="input" id="a-fn" name="first" autocomplete="given-name" required><span class="err"></span></div><div class="field"><label class="lab" for="a-ln">Last name</label><input class="input" id="a-ln" name="last" autocomplete="family-name" required><span class="err"></span></div></div>
        <div class="row2"><div class="field"><label class="lab" for="a-dob">Date of birth</label><input class="input" id="a-dob" name="dob" type="date" required><span class="err"></span></div><div class="field"><label class="lab" for="a-nat">Nationality</label><input class="input" id="a-nat" name="nationality" autocomplete="country-name" required><span class="err"></span></div></div>
        <div class="row2"><div class="field"><label class="lab" for="a-em">Email</label><input class="input" id="a-em" name="email" type="email" autocomplete="email" required><span class="err"></span></div><div class="field"><label class="lab" for="a-ph">Phone / WhatsApp</label><input class="input" id="a-ph" name="phone" type="tel" autocomplete="tel" required><span class="err"></span></div></div>
        <div class="field"><label class="lab" for="a-ad">Address</label><input class="input" id="a-ad" name="address" autocomplete="street-address" required><span class="err"></span></div>
      </div>
      <div class="fstep" data-step="3">
        <h2 class="h3">Your <em>education.</em></h2>
        <div class="field"><label class="lab" for="a-hq">Highest qualification so far</label><select class="select" id="a-hq" name="qualification" required><option value="">Choose…</option><option>A-levels / HSC / equivalent</option><option>French Baccalauréat</option><option>International Baccalaureate</option><option>Bachelor degree</option><option>Master’s degree</option><option>Professional qualification</option></select><span class="err"></span></div>
        <div class="row2"><div class="field"><label class="lab" for="a-inst">Institution</label><input class="input" id="a-inst" name="institution" required><span class="err"></span></div><div class="field"><label class="lab" for="a-yr">Year completed (or expected)</label><input class="input" id="a-yr" name="year" inputmode="numeric" maxlength="4" required><span class="err"></span></div></div>
        <div class="row2"><div class="field"><label class="lab" for="a-gr">Result / classification</label><input class="input" id="a-gr" name="grade" placeholder="e.g. 2:1, 3 A-levels, 12/20"><span class="err"></span></div><div class="field"><label class="lab" for="a-ie">English: O/SC grade C or IELTS score</label><input class="input" id="a-ie" name="english" placeholder="e.g. IELTS 6.5"><span class="err"></span></div></div>
      </div>
      <div class="fstep" data-step="4">
        <h2 class="h3">Your personal <em>statement.</em></h2>
        <p class="small" style="margin:-6px 0 4px">Tell us why you want this programme and what skills or experience will help you succeed. A few paragraphs is plenty.</p>
        <div class="field"><label class="lab" for="a-ps">Personal statement</label><textarea class="textarea" id="a-ps" name="statement" rows="9" required minlength="150" maxlength="4000" data-count></textarea><span class="small" data-counter>0 / 4000 · minimum 150 characters</span><span class="err"></span></div>
        <div class="field"><label class="lab" for="a-we">Work experience (optional)</label><textarea class="textarea" id="a-we" name="experience" rows="4" maxlength="1500"></textarea></div>
      </div>
      <div class="fstep" data-step="5">
        <h2 class="h3">Your <em>referees.</em></h2>
        <p class="small" style="margin:-6px 0 4px" data-ref-note>Undergraduate courses need one referee; graduate and postgraduate courses need two.</p>
        <div class="refbox" data-ref="1"><b>Referee 1</b><div class="row2"><div class="field"><label class="lab" for="a-r1n">Name</label><input class="input" id="a-r1n" name="ref1name" required><span class="err"></span></div><div class="field"><label class="lab" for="a-r1e">Email</label><input class="input" id="a-r1e" name="ref1email" type="email" required><span class="err"></span></div></div><div class="field"><label class="lab" for="a-r1r">Role and relationship</label><input class="input" id="a-r1r" name="ref1role" required><span class="err"></span></div></div>
        <div class="refbox" data-ref="2" hidden><b>Referee 2</b><div class="row2"><div class="field"><label class="lab" for="a-r2n">Name</label><input class="input" id="a-r2n" name="ref2name"><span class="err"></span></div><div class="field"><label class="lab" for="a-r2e">Email</label><input class="input" id="a-r2e" name="ref2email" type="email"><span class="err"></span></div></div><div class="field"><label class="lab" for="a-r2r">Role and relationship</label><input class="input" id="a-r2r" name="ref2role"><span class="err"></span></div></div>
      </div>
      <div class="fstep" data-step="6">
        <h2 class="h3">Your <em>documents.</em></h2>
        <p class="small" style="margin:-6px 0 4px">Tick what you have ready. You will email the files with your confirmation, and bring originals to be verified.</p>
        <ul class="doclist" data-doclist></ul>
        <div class="notice">Application fee: <b data-fee>Rs 1,000 (non-refundable)</b>. Payment details are sent with your confirmation.</div>
      </div>
      <div class="fstep" data-step="7">
        <h2 class="h3">Review and <em>submit.</em></h2>
        <dl class="review" data-review></dl>
        <label class="consent"><input type="checkbox" name="consent" required><span>I confirm the information is accurate and agree that UOM Enterprise may process my details to assess my application, in line with its <a href="legal/">privacy notice</a> and the Data Protection Act 2017 (Mauritius).</span></label><span class="err" data-consent-err></span>
      </div>
      <div class="appnav"><button type="button" class="btn btn--ghost" data-prev hidden>Back</button><span class="appnav__save small" data-saved>Progress saves automatically</span><button type="button" class="btn" data-next>Continue ${icon('arrow')}</button><button type="submit" class="btn btn--gold" data-submit hidden>Submit application ${icon('arrow')}</button></div>
      <div class="success appdone" data-success hidden>${icon('check')}<h2 class="h3">Application <em>received.</em></h2><p class="lede" style="margin:10px auto 6px">Your reference is</p><p class="refno" data-refno>UOME-0000</p><p class="small">Keep this for any correspondence.</p>
        <ol class="next3"><li><b>Confirmation</b><span>You will receive an email with your reference and how to send your documents.</span></li><li><b>Review</b><span>The admissions team reviews your application and contacts you with a letter of offer — within 3 working days for local applicants, 1 week for international applicants.</span></li><li><b>Accept &amp; confirm</b><span>Accept your offer and pay the first instalment (50% of annual or total fees) to confirm your place.</span></li></ol>
        <p style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><a class="btn" href="assets/docs/application-checklist-local.pdf" download>Download the checklist ${icon('arrow')}</a><a class="btn btn--ghost" href="study/">Keep exploring</a></p></div>
    </form>
  </div>
  <aside class="stack">
    <div class="aside__card"><span class="eyebrow" style="color:var(--gold-light)">Before you start</span><p class="h3" style="margin:0 0 10px">What you’ll need</p><ul class="checks" style="color:#fff"><li style="border-color:var(--line-light)">About 10 minutes</li><li style="border-color:var(--line-light)">Your qualification details</li><li style="border-color:var(--line-light)">A short personal statement</li><li style="border-color:var(--line-light)">One or two referees’ contact details</li></ul></div>
    <div class="aside__help"><b>Prefer paper?</b><br><a href="assets/docs/uome-application-form.docx" download>Download the application form</a> and send it with your documents to <a href="mailto:${D.site.email}">${D.site.email}</a>.<br><br><b>Questions?</b> <a href="tel:${D.site.tel}">${D.site.phone1}</a> · <a href="${L.waLink()}">WhatsApp</a></div>
  </aside>
</div></section>
`;
  return { path: 'apply/online/index.html', html: L.page({ depth: 2, active: 'apply', title: 'Apply online', desc: 'Apply to a University of Lancashire programme at UoME in seven short steps. Your progress saves automatically.', body, scripts: ['application'] }) };
}

module.exports = () => [applicationPage()];
