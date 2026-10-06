/* UoME — online application (demo: validates, autosaves locally, shows a reference; sends nothing) */
(function () {
  'use strict';
  var C = window.UOMEcore, $ = C.$, $$ = C.$$, store = C.store, track = C.track;
  var form = $('[data-app]');
  if (!form) return;
  var KEY = 'uome.app', steps = $$('[data-step]', form), stepper = $$('[data-appsteps] li'), cur = 0;
  var next = $('[data-next]', form), prev = $('[data-prev]', form), submit = $('[data-submit]', form), saved = $('[data-saved]', form);
  var prog = $('#a-prog'), intake = $('#a-int'), docList = $('[data-doclist]', form);
  var LABEL = { Jan: 'January 2027', Feb: 'February 2027', Sep: 'September 2027' };
  var DOCS = {
    local: ['“O” Level / SC statement of results or certificate', '“A” Level / HSC statement of results, French Bac or International Bac', 'Degree certificate and transcript (if applicable)', 'National Identity Card (NIC) and birth certificate', 'Proof of address (recent utility bill)', 'Passport-size photographs'],
    intl: ['“O” Level and “A” Level results or equivalent, French Bac or International Bac', 'Degree certificate and transcript (if required)', 'Copy of your passport and birth certificate', 'Passport-size photographs', 'Evidence of English language competence (if required)']
  };
  var params = new URLSearchParams(location.search);

  function who() { var r = form.querySelector('input[name=who]:checked'); return r ? r.value : 'local'; }
  function level() { var o = prog.options[prog.selectedIndex]; return o ? o.getAttribute('data-level') : ''; }
  function fillIntakes(keep) {
    var o = prog.options[prog.selectedIndex], list = o && o.getAttribute('data-intakes') ? o.getAttribute('data-intakes').split(',') : [];
    intake.innerHTML = '<option value="">Choose an intake…</option>' + list.map(function (k) { return '<option>' + LABEL[k] + '</option>'; }).join('');
    if (keep) intake.value = keep; else if (list.length === 1) intake.value = LABEL[list[0]];
    var note = $('[data-entry-note]', form);
    if (o && o.value) { note.hidden = false; note.innerHTML = '<b>Typical entry:</b> ' + o.getAttribute('data-entry') + ''; } else note.hidden = true;
    var pg = level(), two = pg && pg !== 'undergraduate';
    $$('[data-ref="2"]', form)[0].hidden = !two;
    $$('#a-r2n,#a-r2e,#a-r2r', form).forEach(function (i) { if (two) i.setAttribute('required', ''); else i.removeAttribute('required'); });
    $('[data-ref-note]', form).textContent = two ? 'Graduate and postgraduate courses need two referees.' : 'Undergraduate courses need one referee.';
  }
  function fillDocs(ticked) {
    var list = DOCS[who()];
    docList.innerHTML = list.map(function (d, i) { return '<li><label class="doc"><input type="checkbox" name="doc' + i + '"' + (ticked && ticked.indexOf(d) > -1 ? ' checked' : '') + ' data-doc="' + d.replace(/"/g, '&quot;') + '"><span>' + d + '</span></label></li>'; }).join('');
    $('[data-fee]', form).textContent = who() === 'intl' ? 'waived for international students' : 'Rs 1,000 (non-refundable)';
  }

  /* autosave */
  function collect() {
    var d = { step: cur, f: {}, docs: [] };
    $$('input, select, textarea', form).forEach(function (i) {
      if (!i.name) return;
      if (i.type === 'radio') { if (i.checked) d.f[i.name] = i.value; }
      else if (i.type === 'checkbox') { if (/^doc/.test(i.name)) { if (i.checked) d.docs.push(i.getAttribute('data-doc')); } else d.f[i.name] = i.checked; }
      else d.f[i.name] = i.value;
    });
    return d;
  }
  var saveT;
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { var d = collect(); store.set(KEY, d); saved.textContent = 'Progress saved on this device'; }, 350); }
  function restore(d) {
    if (!d) return;
    Object.keys(d.f).forEach(function (n) {
      var els = form.querySelectorAll('[name="' + n + '"]');
      els.forEach(function (i) { if (i.type === 'radio') i.checked = i.value === d.f[n]; else if (i.type === 'checkbox') i.checked = !!d.f[n]; else i.value = d.f[n]; });
    });
    fillIntakes(d.f.intake); fillDocs(d.docs);
    var cnt = $('[data-count]', form); if (cnt) updCount();
  }

  /* validation */
  function validate(i) {
    var s = steps[i], ok = true;
    $$('input[required],select[required],textarea[required]', s).forEach(function (f) {
      var fld = f.closest('.field'), err = fld && $('.err', fld), bad = false, msg = '';
      if (f.closest('[hidden]')) return;
      if (f.type === 'checkbox') { bad = !f.checked; var ce = $('[data-consent-err]', s); if (ce) ce.textContent = bad ? 'Please tick to confirm.' : ''; }
      else if (!f.value.trim()) { bad = true; msg = 'This field is required.'; }
      else if (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) { bad = true; msg = 'Please enter a valid email address.'; }
      else if (f.minLength > 0 && f.value.trim().length < f.minLength) { bad = true; msg = 'Please write at least ' + f.minLength + ' characters.'; }
      else if (f.name === 'year' && !/^(19|20)\d\d$/.test(f.value.trim())) { bad = true; msg = 'Enter a four-digit year.'; }
      if (fld) { fld.classList.toggle('is-bad', bad); if (err) err.textContent = msg; }
      if (bad) ok = false;
    });
    if (!ok) { var first = $('.is-bad input, .is-bad select, .is-bad textarea', s); if (first) first.focus(); }
    return ok;
  }

  function review() {
    var d = collect().f, rows = [['Programme', prog.options[prog.selectedIndex].text], ['Intake', d.intake], ['Applying from', d.who === 'intl' ? 'Overseas' : 'Mauritius'], ['Name', d.first + ' ' + d.last], ['Email', d.email], ['Phone', d.phone], ['Date of birth', d.dob], ['Nationality', d.nationality], ['Highest qualification', d.qualification + (d.institution ? ' — ' + d.institution : '') + (d.year ? ' (' + d.year + ')' : '')], ['Referee 1', d.ref1name + ' · ' + d.ref1email]];
    if (!$('[data-ref="2"]', form).hidden) rows.push(['Referee 2', d.ref2name + ' · ' + d.ref2email]);
    rows.push(['Documents ready', collect().docs.length + ' of ' + DOCS[who()].length]);
    $('[data-review]', form).innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + String(r[1] || '—').replace(/</g, '&lt;') + '</dd></div>'; }).join('');
  }

  function show(i) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); });
    stepper.forEach(function (li, k) { li.classList.toggle('is-on', k === cur); li.classList.toggle('done', k < cur); });
    var sn = $('[data-stepname]'); if (sn) sn.textContent = 'Step ' + (cur + 1) + ' of ' + steps.length + ' · ' + $('b', stepper[cur]).textContent;
    prev.hidden = cur === 0; next.hidden = cur === steps.length - 1; submit.hidden = cur !== steps.length - 1;
    if (cur === steps.length - 1) review();
    form.scrollIntoView({ block: 'start', behavior: 'smooth' });
    var f = steps[cur].querySelector('input:not([type=radio]):not([type=checkbox]), select, textarea'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 350);
    save();
  }

  function updCount() { var t = $('[data-count]', form), c = $('[data-counter]', form); if (t && c) c.textContent = t.value.length + ' / 4000 · minimum 150 characters'; }

  next.addEventListener('click', function () { if (validate(cur)) { track('application_step', { step: cur + 1 }); show(cur + 1); } });
  prev.addEventListener('click', function () { show(cur - 1); });
  stepper.forEach(function (li, k) { li.addEventListener('click', function () { if (k < cur) show(k); }); });
  prog.addEventListener('change', function () { fillIntakes(); });
  $$('input[name=who]', form).forEach(function (r) { r.addEventListener('change', function () { fillDocs(collect().docs); save(); }); });
  form.addEventListener('input', function (e) { if (e.target.matches('[data-count]')) updCount(); save(); });
  form.addEventListener('change', save);
  form.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') { e.preventDefault(); if (cur < steps.length - 1) next.click(); } });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(cur)) return;
    var ref = 'UOME-' + new Date().getFullYear() + '-' + String(Math.floor(10000 + Math.random() * 90000));
    track('application_submit', { programme: prog.value });
    store.set(KEY, null);
    $$('.fstep, .appnav', form).forEach(function (n) { n.hidden = true; n.classList.remove('is-on'); });
    $('[data-appsteps]').hidden = true;
    var ok = $('[data-success]', form); $('[data-refno]', ok).textContent = ref; ok.hidden = false; ok.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  /* init */
  fillIntakes(); fillDocs();
  var d = store.get(KEY, null), hasData = d && d.f && Object.keys(d.f).some(function (k) { return k !== 'who' && k !== 'mode' && d.f[k] && d.f[k] !== true; });
  var banner = $('[data-resume]');
  if (hasData && !params.get('programme')) {
    banner.hidden = false;
    $('[data-resume-go]').addEventListener('click', function () { banner.hidden = true; restore(d); show(d.step || 0); });
    $('[data-resume-clear]').addEventListener('click', function () { banner.hidden = true; store.set(KEY, null); });
  }
  if (params.get('programme')) { var o = $$('option', prog).filter(function (x) { return x.value === params.get('programme'); })[0]; if (o) { prog.value = o.value; fillIntakes(); } }
  var ip = params.get('intake'), map = { '2027-01': 'January 2027', '2027-02': 'February 2027', '2027-09': 'September 2027' };
  if (ip && map[ip]) { var oo = $$('option', intake).filter(function (x) { return x.value === map[ip] || x.text === map[ip]; })[0]; if (oo) intake.value = oo.value; }
  if (params.get('who') === 'intl') { var rr = form.querySelector('input[name=who][value=intl]'); if (rr) { rr.checked = true; fillDocs(); } }
})();
