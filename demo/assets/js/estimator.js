/* UoME — fees & savings estimator and cost-of-living calculator */
(function () {
  'use strict';
  var C = window.UOMEcore, $ = C.$, $$ = C.$$, DATA = window.UOME;
  var money = function (n, c) { return c === 'gbp' ? '£' + Math.round(n).toLocaleString('en-GB') : 'Rs ' + Math.round(n).toLocaleString('en-GB'); };

  /* ---------- fees estimator ---------- */
  var est = $('[data-est]');
  if (est) {
    var sel = $('#e-prog'), vsel = $('#e-var'), vwrap = $('[data-gdl]'), isel = $('#e-int');
    var st = { who: 'local', pay: 'inst' };
    var INT = {
      sep: 'September intake', feb: 'February intake (2.5-year LLB route)', jan: 'January intake'
    };
    var q = new URLSearchParams(location.search).get('programme');
    if (q) { var o = $$('option', sel).filter(function (x) { return x.value.split('|')[1] === q; })[0]; if (o) sel.value = o.value; }

    function entry() { var p = sel.value.split('|'); return { fee: p[0], slug: p[1], f: DATA.fees[p[0]] }; }
    function variant(e) { if (e.f.variants) return e.f.variants.filter(function (v) { return v.id === vsel.value; })[0]; return e.f; }
    function intakeKeys(e) { var v = variant(e); return Object.keys(v.inst); }
    function fillIntakes() {
      var e = entry(); vwrap.style.display = e.f.variants ? '' : 'none';
      var keys = intakeKeys(e), keep = isel.value;
      isel.innerHTML = keys.map(function (k) { return '<option value="' + k + '">' + INT[k] + '</option>'; }).join('');
      if (keys.indexOf(keep) > -1) isel.value = keep;
    }
    function dates(e, k) {
      if (e.fee === 'gdl' && k === 'jan') return ['On acceptance of offer', 'By 31 August'];
      return DATA.instalmentDates[k];
    }
    function render() {
      var e = entry(), v = variant(e), cur = st.who === 'local' ? 'mur' : 'gbp', amt = cur === 'mur' ? v.mur : v.gbp;
      var k = isel.value, parts = cur === 'mur' ? v.inst[k] : (v.instGbp ? v.instGbp[k] : null);
      $('[data-e-title]', est).textContent = sel.options[sel.selectedIndex].text + (e.f.variants ? ' · ' + vsel.options[vsel.selectedIndex].text : '');
      var save = $('[data-e-save]', est), insts = $('[data-e-insts]', est), note = $('[data-e-note]', est), apply = $('[data-e-apply]', est);
      apply.href = apply.getAttribute('href').split('?')[0] + '?programme=' + e.slug + '&who=' + (st.who === 'intl' ? 'intl' : 'local');
      if (!amt) {
        $('[data-e-amount]', est).textContent = 'On request'; $('[data-e-unit]', est).textContent = '';
        save.hidden = true; insts.innerHTML = ''; note.textContent = 'The international fee for this programme is confirmed by the admissions team — please get in touch.'; return;
      }
      var disc = st.pay === 'full' ? Math.round(amt * 0.05) : 0, payable = amt - disc;
      $('[data-e-amount]', est).textContent = money(payable, cur);
      $('[data-e-unit]', est).textContent = v.unit === 'per year' ? 'for the first year' : 'total programme fee';
      save.hidden = !disc;
      if (disc) { $('[data-e-saving]', est).textContent = money(disc, cur); $('[data-e-savenote]', est).textContent = st.who === 'local' ? 'Applies when full fees are paid by the early-payment deadline for your intake.' : 'Applies when full fees are paid on enrolment.'; }
      var dts = dates(e, k);
      if (st.pay === 'full') insts.innerHTML = '<div class="inst"><span class="num">1</span><div><b>' + money(payable, cur) + '</b><small>Pay once, in full' + (st.who === 'local' ? ' — by the early-payment deadline' : ' — on enrolment') + '</small></div><span></span></div>';
      else insts.innerHTML = parts.map(function (a, i) { return a ? '<div class="inst"><span class="num">' + (i + 1) + '</span><div><b>' + money(a, cur) + '</b><small>' + (dts[i] || '') + '</small></div><span></span></div>' : ''; }).join('');
      note.textContent = (v.unit === 'per year' ? 'Fees shown are per year of study. ' : '') + (st.who === 'local' ? 'Pay by office cheque, banker’s cheque or transfer to SBM. ' : 'Pay by bank transfer to the State Bank of Mauritius. ') + 'Fees are confirmed in your letter of offer.';
      C.track('estimator_use', { programme: e.slug, who: st.who, pay: st.pay });
    }
    sel.addEventListener('change', function () { fillIntakes(); render(); });
    vsel.addEventListener('change', function () { fillIntakes(); render(); });
    isel.addEventListener('change', render);
    $$('[data-seg]', est).forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.getAttribute('data-seg'); st[g] = b.getAttribute('data-v');
        $$('[data-seg="' + g + '"]', est).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        render();
      });
    });
    fillIntakes(); render();
  }

  /* ---------- cost-of-living calculator ---------- */
  var cost = $('[data-cost]');
  if (cost) {
    var RATE = 54, cur = 'gbp';
    var el = function (n) { return $('[data-o="' + n + '"]', cost); };
    function calc() {
      var rt = +$('#c-rent').value, ft = +$('#c-food').value, eat = +$('#c-eat').value, taxi = +$('#c-taxi').value;
      var m = { rent: 10000 + rt * 5000, food: 4000 + ft * 1000, eat: eat * 400, taxi: taxi * 550 };
      var tot = m.rent + m.food + m.eat + m.taxi, f = function (n) { return cur === 'gbp' ? money(n / RATE, 'gbp') : money(n, 'mur'); };
      el('rent').textContent = f(m.rent); el('food').textContent = f(m.food); el('eat').textContent = eat + ' meals'; el('taxi').textContent = taxi + ' journeys';
      el('t-rent').textContent = f(m.rent); el('t-food').textContent = f(m.food); el('t-eat').textContent = f(m.eat); el('t-taxi').textContent = f(m.taxi);
      el('month').textContent = f(tot); el('year').textContent = f(tot * 12);
    }
    $$('input[type=range]', cost).forEach(function (r) { r.addEventListener('input', calc); });
    $$('[data-cur]', cost).forEach(function (b) { b.addEventListener('click', function () { cur = b.getAttribute('data-cur'); $$('[data-cur]', cost).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); calc(); }); });
    calc();
  }
})();
