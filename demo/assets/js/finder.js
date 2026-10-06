/* UoME — course finder, compare tray and "which programme is right for me?" quiz */
(function () {
  'use strict';
  var C = window.UOMEcore, $ = C.$, $$ = C.$$, SL = window.UOMEshortlist, DATA = window.UOME;
  var ROOT = document.body.getAttribute('data-root') || '';
  var byslug = function (s) { return DATA.programmes.filter(function (p) { return p.slug === s; })[0]; };
  var money = function (n, c) { return c === 'gbp' ? '£' + n.toLocaleString('en-GB') : 'Rs ' + n.toLocaleString('en-GB'); };

  /* ---------- finder ---------- */
  var box = $('[data-filters]');
  if (box) {
    var cards = $$('.fcard'), results = $('[data-results]'), cnt = $('[data-found]'), empty = $('[data-empty]'), sort = $('#sort');
    var params = new URLSearchParams(location.search);
    ['area', 'level', 'mode', 'intake', 'accred'].forEach(function (k) {
      (params.get(k) || '').split(',').filter(Boolean).forEach(function (v) { var i = $('input[name=' + k + '][value="' + v + '"]', box); if (i) i.checked = true; });
    });
    function active(name) { return $$('input[name=' + name + ']:checked', box).map(function (i) { return i.value; }); }
    function apply() {
      var f = { area: active('area'), level: active('level'), mode: active('mode'), intake: active('intake'), accred: active('accred') }, n = 0;
      cards.forEach(function (c) {
        var ok = true;
        if (f.area.length && f.area.indexOf(c.dataset.area) < 0) ok = false;
        if (f.level.length && f.level.indexOf(c.dataset.level) < 0) ok = false;
        if (f.mode.length) { var m = c.dataset.mode; if (!f.mode.some(function (x) { return m === x || m === 'both'; })) ok = false; }
        if (f.intake.length) { var it = c.dataset.intake.split(' '); if (!f.intake.some(function (x) { return it.indexOf(x) > -1; })) ok = false; }
        if (f.accred.length) { var ac = (c.dataset.accred || '').split(' '); if (!f.accred.some(function (x) { return ac.indexOf(x) > -1; })) ok = false; }
        c.hidden = !ok; if (ok) n++;
      });
      cnt.textContent = n; empty.hidden = n > 0;
      var act = Object.keys(f).reduce(function (a, k) { return a + f[k].length; }, 0), an = $('[data-active-n]', box); if (an) an.textContent = act ? '(' + act + ' active)' : '';
      var q = new URLSearchParams(); Object.keys(f).forEach(function (k) { if (f[k].length) q.set(k, f[k].join(',')); });
      history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
      C.track('finder_filter', { count: n });
    }
    function order() {
      var v = sort.value, arr = cards.slice();
      if (v === 'az') arr.sort(function (a, b) { return a.dataset.title.localeCompare(b.dataset.title); });
      if (v === 'short') arr.sort(function (a, b) { return a.dataset.months - b.dataset.months; });
      arr.forEach(function (c) { results.appendChild(c); });
    }
    var tg = $('[data-filter-toggle]', box);
    if (tg) tg.addEventListener('click', function () { var o = box.classList.toggle('is-open'); tg.setAttribute('aria-expanded', o); });
    var lv = $('[data-levels]');
    if (lv) {
      var syncLv = function () { var on = active('level'); $$('[data-lv]', lv).forEach(function (b) { var v = b.getAttribute('data-lv'); b.classList.toggle('is-on', v ? (on.length === 1 && on[0] === v) : on.length === 0); }); };
      $$('[data-lv]', lv).forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-lv'); $$('input[name=level]', box).forEach(function (i) { i.checked = v && i.value === v; }); apply(); syncLv(); }); });
      box.addEventListener('change', syncLv); setTimeout(syncLv, 0);
    }
    box.addEventListener('change', apply); sort.addEventListener('change', order);
    $('[data-reset]', box).addEventListener('click', function () { $$('input', box).forEach(function (i) { i.checked = false; }); apply(); });
    apply();
  }

  /* ---------- compare tray + modal ---------- */
  var dock = $('#cmpDock'), modal = $('#cmpModal');
  function fmtEntry(p) { return p.entry; }
  function feeFor(p, cur) {
    var f = DATA.fees[p.fee]; if (!f) return '—';
    if (f.variants) return f.variants.map(function (v) { var a = cur === 'gbp' ? v.gbp : v.mur; return a ? money(a, cur) + ' ' + v.unit + ' (' + v.label.split(' (')[0].toLowerCase() + ')' : '—'; }).join('<br>');
    var a = cur === 'gbp' ? f.gbp : f.mur; return a ? money(a, cur) + ' ' + f.unit : 'On request';
  }
  function renderCompare() {
    var l = SL.list().map(byslug).filter(Boolean);
    if (dock) {
      dock.classList.toggle('is-on', l.length > 0);
      $('[data-n]', dock).textContent = l.length;
      $('[data-items]', dock).innerHTML = l.map(function (p) { return '<span>' + p.short + '</span>'; }).join('');
    }
    var body = $('#cmpBody'); if (!body) return;
    if (l.length < 1) { body.innerHTML = '<p class="lede">Add programmes with the Compare button on any card.</p>'; return; }
    var rows = [
      ['Level', function (p) { return p.levelLabel; }], ['Award', function (p) { return p.award; }], ['Duration', function (p) { return p.durationLabel; }],
      ['Study mode', function (p) { return p.mode; }], ['Intakes', function (p) { return p.intakeLabel; }], ['Recognition', function (p) { return p.accred.length ? p.accred.join(', ') : '—'; }],
      ['Typical entry', fmtEntry], ['Fees — local', function (p) { return feeFor(p, 'mur'); }], ['Fees — international', function (p) { return feeFor(p, 'gbp'); }]
    ];
    body.innerHTML = '<table class="cmp"><thead><tr><th></th>' + l.map(function (p) { return '<th>' + p.title + '<br><a class="link-arrow" style="font-size:.85rem;margin-top:8px" href="' + ROOT + p.url + '">View programme</a></th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th>' + l.map(function (p) { return '<td>' + r[1](p) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>' +
      '<p style="margin-top:24px"><a class="btn" href="' + ROOT + 'apply/start/?programme=' + l[0].slug + '">Enquire about ' + l[0].short + '</a></p>';
  }
  function openCompare() { if (SL.list().length < 2) { C.toast('Add at least two programmes to compare.'); return; } renderCompare(); modal.classList.add('is-open'); C.track('compare_open'); }
  $$('[data-open-compare]').forEach(function (b) { b.addEventListener('click', openCompare); });
  $$('[data-clear-compare]').forEach(function (b) { b.addEventListener('click', function () { SL.clear(); }); });
  $$('[data-close-compare]').forEach(function (b) { b.addEventListener('click', function () { modal.classList.remove('is-open'); }); });
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('is-open'); });
  document.addEventListener('shortlist:change', renderCompare); renderCompare();

  /* ---------- quiz ---------- */
  var qbox = $('[data-quiz]');
  if (qbox) {
    var Q = [
      { k: 'goal', q: 'What are you looking to do next?', o: [['first', 'Start my first degree'], ['switch', 'Change career direction'], ['advance', 'Advance in my current career'], ['specialise', 'Specialise in a field I already know']] },
      { k: 'field', q: 'Which field excites you most?', o: [['law', 'Law and justice'], ['pm', 'Managing projects and construction delivery'], ['digital', 'Digital marketing and data'], ['finance', 'Finance, banking and regulation']] },
      { k: 'qual', q: 'Where are you in your education?', o: [['school', 'Finishing school (A-levels / HSC or equivalent)'], ['degree-law', 'I hold a degree in law'], ['degree-other', 'I hold a degree in another subject'], ['degree-exp', 'I hold a degree and have work experience']] },
      { k: 'mode', q: 'How would you like to study?', o: [['ft', 'Full-time, on campus'], ['pt', 'Part-time, alongside work'], ['either', 'Either works for me']] }
    ];
    var ans = {}, step = 0;
    function render() {
      var pct = (step / Q.length) * 100;
      if (step >= Q.length) return results();
      var q = Q[step];
      qbox.innerHTML = '<div class="qbar"><i style="width:' + pct + '%"></i></div><div class="qq"><span class="eyebrow">Question ' + (step + 1) + ' of ' + Q.length + '</span><h3>' + q.q + '</h3><div class="qopts">' +
        q.o.map(function (o, i) { return '<button class="qopt' + (ans[q.k] === o[0] ? ' is-on' : '') + '" data-v="' + o[0] + '"><span class="num">0' + (i + 1) + '</span><span>' + o[1] + '</span></button>'; }).join('') +
        '</div>' + (step > 0 ? '<p style="margin-top:22px"><button class="link-arrow" style="background:none;border-width:0 0 1.5px;cursor:pointer;font-size:inherit" data-back>← Back</button></p>' : '') + '</div>';
      $$('.qopt', qbox).forEach(function (b) { b.addEventListener('click', function () { ans[q.k] = b.getAttribute('data-v'); step++; setTimeout(render, 160); }); });
      var back = $('[data-back]', qbox); if (back) back.addEventListener('click', function () { step--; render(); });
    }
    function score(p) {
      var t = p.quiz, s = 0, why = [], q = ans.qual;
      if (q === 'school' && t.qual.indexOf('school') < 0) return null;
      if (q !== 'school' && t.qual.indexOf('school') > -1) return null;
      if (q !== 'school' && t.qual.indexOf(q) < 0) { if (!(q === 'degree-exp' && t.qual.indexOf('degree-other') > -1)) return null; }
      s += 20; why.push('Fits your background');
      if (t.goal.indexOf(ans.goal) > -1) { s += 20; why.push(ans.goal === 'first' ? 'A route into your first degree' : ans.goal === 'switch' ? 'Supports a change of direction' : ans.goal === 'advance' ? 'Built for career progression' : 'Deepens specialist expertise'); }
      if (t.field.indexOf(ans.field) > -1) { s += 35; why.push('Matches your field of interest'); }
      if (ans.mode === 'either' || t.mode.indexOf(ans.mode) > -1) { s += 25; why.push(ans.mode === 'ft' ? 'Full-time on campus' : ans.mode === 'pt' ? 'Part-time, alongside work' : p.durationLabel); }
      if (p.slug === 'msc-construction-project-management' && q !== 'school') why.push('Requires a construction or engineering degree');
      return { p: p, s: s, why: why };
    }
    function results() {
      var r = DATA.programmes.map(score).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);
      C.track('quiz_complete', { top: r[0] && r[0].p.slug });
      qbox.innerHTML = '<div class="qbar"><i style="width:100%"></i></div><span class="eyebrow">Your best matches</span><h3 class="h2" style="margin-bottom:12px">Here’s where <em>we’d start.</em></h3>' +
        (r.length ? r.map(function (m) { return '<div class="qmatch"><span class="pct">' + m.s + '%</span><div><h3>' + m.p.title + '</h3><ul>' + m.why.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--sm" href="' + ROOT + m.p.url + '">View programme</a><button class="cmpbtn" data-shortlist="' + m.p.slug + '" aria-pressed="false"><span>Compare</span></button></div></div>'; }).join('') :
          '<p class="lede">We couldn’t find a perfect match — an adviser can help you find a route.</p>') +
        '<p style="margin-top:28px;display:flex;gap:16px;flex-wrap:wrap"><a class="btn" href="' + ROOT + 'apply/start/?programme=' + (r[0] ? r[0].p.slug : '') + '">Enquire about ' + (r[0] ? r[0].p.short : 'a programme') + '</a><button class="btn btn--ghost" data-retake>Retake the quiz</button></p>';
      $$('[data-shortlist]', qbox).forEach(function (b) { b.addEventListener('click', function () { SL.toggle(b.getAttribute('data-shortlist')); }); });
      document.dispatchEvent(new CustomEvent('shortlist:change'));
      $('[data-retake]', qbox).addEventListener('click', function () { ans = {}; step = 0; render(); });
    }
    render();
  }
})();
