/* UoME — shared behaviour. Vanilla JS, no dependencies.
   Each block is keyed off a data-attribute so it maps to an Elementor widget / HTML snippet. */
(function () {
  'use strict';
  var d = document, w = window;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var ROOT = d.body.getAttribute('data-root') || '';
  var DATA = w.UOME || { programmes: [], search: [], intakes: [] };
  var store = {
    get: function (k, f) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  w.dataLayer = w.dataLayer || [];
  var track = function (ev, extra) { w.dataLayer.push(Object.assign({ event: ev }, extra || {})); };
  w.UOMEcore = { $: $, $$: $$, store: store, track: track };

  d.documentElement.classList.add('js');
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* pre-loader: once per session; triggers entrance animations when it lifts */
  var pre = $('#pre'), preC = $('#pre-c'), html = d.documentElement;
  function markLoaded() { d.body.classList.add('loaded'); }
  if (pre && !html.classList.contains('no-pre') && !reduceMotion) {
    var nEl = $('[data-pre-n]', pre), barEl = $('[data-pre-bar]', pre), t0 = performance.now(), heroImg = $('.hero__slide.is-on img'), pageLoaded = d.readyState === 'complete' || !!(heroImg && heroImg.complete), finished = false, MIN = 750;
    if (heroImg && !heroImg.complete) heroImg.addEventListener('load', function () { pageLoaded = true; });
    w.addEventListener('load', function () { pageLoaded = true; });
    d.body.style.overflow = 'hidden';
    var finish = function () {
      pre.classList.add('is-done'); preC.classList.add('is-done');
      setTimeout(markLoaded, 650);
      setTimeout(function () { pre.remove(); preC.remove(); d.body.style.overflow = ''; }, 1700);
    };
    (function tick(now) {
      var p = Math.min((now - t0) / MIN, 1), shown = Math.round((pageLoaded ? p : Math.min(p, 0.9)) * 100);
      nEl.textContent = shown; barEl.style.width = shown + '%';
      if (shown >= 100 && !finished) { finished = true; finish(); return; }
      requestAnimationFrame(tick);
    })(t0);
    setTimeout(function () { if (!finished) { finished = true; finish(); } }, 6000);
  } else {
    if (pre) pre.remove();
    if (preC) preC.remove();
    requestAnimationFrame(function () { requestAnimationFrame(markLoaded); });
  }

  /* internal navigation: flag it so the pre-loader only plays on first visit / refresh */
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target || a.hasAttribute('download')) return;
    var u; try { u = new URL(a.href, w.location.href); } catch (err) { return; }
    if (u.origin !== w.location.origin) return;
    try { sessionStorage.setItem('uome.nav', String(Date.now())); } catch (err) { /* ignore */ }
  });

  /* toast */
  var toastEl = $('#toast'), toastT;
  function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2800); }
  w.UOMEcore.toast = toast;

  /* analytics: any CTA click */
  d.addEventListener('click', function (e) {
    var a = e.target.closest('.btn, .link-arrow, .mbar a');
    if (a) track('cta_click', { label: (a.textContent || '').trim().slice(0, 60), href: a.getAttribute('href') || '' });
  });

  /* sticky header shadow */
  var hdr = $('.hdr');
  if (hdr) { var onS = function () { hdr.classList.toggle('is-stuck', w.scrollY > 8); }; onS(); w.addEventListener('scroll', onS, { passive: true }); }

  /* dropdown items: active state for the current page / section / filter */
  var ddLinks = $$('.dd a');
  function markDD(target) {
    var loc = w.location, cur = target || { path: loc.pathname.replace(/index\.html$/, ''), search: loc.search, hash: loc.hash };
    ddLinks.forEach(function (a) {
      var u; try { u = new URL(a.href, loc.href); } catch (e) { return; }
      var p = u.pathname.replace(/index\.html$/, '');
      var on = p === cur.path && u.search === cur.search && (u.hash === cur.hash || (!u.hash && !cur.hash));
      a.classList.toggle('is-active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  markDD();
  w.addEventListener('hashchange', function () { markDD(); });
  ddLinks.forEach(function (a) {
    a.addEventListener('click', function () {
      var u; try { u = new URL(a.href, w.location.href); } catch (e) { return; }
      if (u.pathname.replace(/index\.html$/, '') === w.location.pathname.replace(/index\.html$/, '')) markDD({ path: u.pathname.replace(/index\.html$/, ''), search: u.search, hash: u.hash });
    });
  });

  /* dropdown scrollspy: highlight the item whose section is currently in view */
  (function () {
    var loc = w.location, here = loc.pathname.replace(/index\.html$/, '');
    var cands = ddLinks.map(function (a) {
      var u; try { u = new URL(a.href, loc.href); } catch (e) { return null; }
      if (u.pathname.replace(/index\.html$/, '') !== here || u.search !== loc.search) return null;
      return { a: a, el: u.hash ? d.getElementById(decodeURIComponent(u.hash.slice(1))) : null, hashless: !u.hash };
    }).filter(Boolean);
    var hashed = cands.filter(function (c) { return c.el; });
    if (hashed.length < 1) return;
    var base = cands.filter(function (c) { return c.hashless; })[0], tick = false;
    function spy() {
      tick = false;
      var line = w.innerHeight * 0.38, hit = null;
      hashed.forEach(function (c) { if (c.el.getBoundingClientRect().top <= line && (!hit || c.el.getBoundingClientRect().top >= hit.el.getBoundingClientRect().top)) hit = c; });
      var win = hit || base;
      ddLinks.forEach(function (a) { var on = !!win && a === win.a; a.classList.toggle('is-active', on); if (on) a.setAttribute('aria-current', 'page'); else if (!cands.some(function (c) { return c.a === a; }) === false) a.removeAttribute('aria-current'); });
    }
    w.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(spy); } }, { passive: true });
    w.addEventListener('hashchange', function () { requestAnimationFrame(spy); });
    spy();
  })();

  /* audience switcher */
  var aud = $('.aud');
  if (aud) {
    var btn = $('.aud__btn', aud), lab = $('[data-aud-label]', aud);
    var saved = store.get('uome.aud', null);
    if (saved && lab) lab.textContent = saved;
    btn.addEventListener('click', function (e) { e.stopPropagation(); var o = aud.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); });
    $$('.aud__menu a', aud).forEach(function (a) { a.addEventListener('click', function () { store.set('uome.aud', a.getAttribute('data-aud')); }); });
    d.addEventListener('click', function () { aud.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); });
  }

  /* mobile drawer */
  var drawer = $('#drawer');
  function drawerSet(open) { if (!drawer) return; drawer.classList.toggle('is-open', open); drawer.setAttribute('aria-hidden', !open); d.body.style.overflow = open ? 'hidden' : ''; }
  $$('[data-drawer-open]').forEach(function (b) { b.addEventListener('click', function () { drawerSet(true); }); });
  $$('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', function () { drawerSet(false); }); });

  /* search overlay */
  var sOv = $('#search'), q = $('#q'), qres = $('#qres');
  function searchSet(open) { if (!sOv) return; sOv.classList.toggle('is-open', open); d.body.style.overflow = open ? 'hidden' : ''; if (open) { setTimeout(function () { q.focus(); }, 30); renderSearch(''); } }
  function renderSearch(v) {
    var t = v.toLowerCase().split(/\s+/).filter(Boolean), items = DATA.search || [];
    var scored = items.map(function (it) {
      var hay = (it.t + ' ' + it.k + ' ' + it.x).toLowerCase(), s = 0;
      if (!t.length) return { it: it, s: it.k === 'Programme' ? 2 : 1 };
      t.forEach(function (tok) { if (it.t.toLowerCase().indexOf(tok) > -1) s += 3; else if (hay.indexOf(tok) > -1) s += 1; else s -= 10; });
      return { it: it, s: s };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 8);
    qres.innerHTML = scored.length ? scored.map(function (x) { return '<a href="' + ROOT + x.it.u + '"><small>' + x.it.k + '</small><strong>' + x.it.t + '</strong></a>'; }).join('') : '<p style="opacity:.7;margin-top:12px">No results — try “fees”, “visa” or “law”, or call ' + (DATA.site ? DATA.site.phone1 : '') + '.</p>';
  }
  $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', function () { searchSet(true); }); });
  $$('[data-search-close]').forEach(function (b) { b.addEventListener('click', function () { searchSet(false); }); });
  if (q) {
    q.addEventListener('input', function () { renderSearch(q.value); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); w.location.href = ROOT + 'search/?q=' + encodeURIComponent(q.value.trim()); } });
  }
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { searchSet(false); drawerSet(false); $$('.modal.is-open').forEach(function (m) { m.classList.remove('is-open'); }); var lb = $('#lb'); if (lb) lb.classList.remove('is-open'); }
    if (e.key === '/' && !/input|textarea|select/i.test((d.activeElement || {}).tagName || '')) { e.preventDefault(); searchSet(true); }
  });

  /* reveal on scroll */
  /* split headline text into animatable words (keeps <em> highlights) */
  function split(el) {
    var i = 0;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = d.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
            var o = d.createElement('span'), s = d.createElement('span');
            o.className = 'w'; s.textContent = p; s.style.setProperty('--i', i++); o.appendChild(s); frag.appendChild(o);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    })(el);
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    if (el.closest('.hero')) el.style.setProperty('--base', '.35s');
  }
  /* split headings lazily, just before they scroll into view (keeps first load light) */
  if (!reduceMotion) {
    var spIO = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { split(en.target); en.target.classList.add('sp'); spIO.unobserve(en.target); } }); }, { rootMargin: '400px 0px 400px 0px' }) : null;
    $$('.display, .h1, .h2').forEach(function (el) { if (spIO) spIO.observe(el); else el.classList.add('sp'); });
  }

  /* auto-stagger and reveal grids */
  ['.tiles', '.mods', '.leaders', '.related', '.paths', '.whys', '.news', '.stats'].forEach(function (sel) {
    $$(sel).forEach(function (box) {
      Array.prototype.forEach.call(box.children, function (c, i) {
        if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', '');
        if (!c.style.getPropertyValue('--d')) c.style.setProperty('--d', (i * 0.07).toFixed(2) + 's');
      });
    });
  });

  var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  $$('[data-reveal], .mask, .media, .story__img, .display, .h1, .h2, .h3, .tl__item, .cta, .hero__cap').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });

  /* count-up */
  function countUp(el) {
    var target = +el.getAttribute('data-count'), node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    var t0 = null, dur = 1600;
    if (reduceMotion) { node.nodeValue = target; return; }
    node.nodeValue = '0';
    function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4); node.nodeValue = Math.round(target * e); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var cio = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }); }, { threshold: 0.6 }) : null;
  $$('[data-count]').forEach(function (el) { if (cio) cio.observe(el); });

  /* countdown to the next open intake (rolls over automatically) */
  $$('[data-countdown]').forEach(function (c) {
    var now = new Date(), next = (DATA.intakes || []).map(function (i) { return { l: i.label, t: new Date(i.date + 'T00:00:00') }; }).filter(function (i) { return i.t > now; }).sort(function (a, b) { return a.t - b.t; })[0];
    if (!next) return;
    var days = Math.ceil((next.t - now) / 864e5);
    $('[data-cd-label]', c).textContent = next.l;
    $('[data-cd-days]', c).textContent = days + (days === 1 ? ' day to go' : ' days to go');
  });

  /* tabs (scoped to the nearest section) */
  $$('[data-tabs]').forEach(function (tabs) {
    var scope = tabs.closest('section') || d;
    $$('[data-t]', tabs).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-t]', tabs).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); });
        $$('.tabpanel', scope).forEach(function (p) { if (tabs.contains(p)) return; });
        var panels = $$('.tabpanel', scope).filter(function (p) { var k = p.getAttribute('data-p'); return $$('[data-t]', tabs).some(function (x) { return x.getAttribute('data-t') === k; }); });
        panels.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-p') === b.getAttribute('data-t')); });
      });
    });
  });

  /* law route */
  $$('[data-route]').forEach(function (r) {
    $$('.route__tabs [data-t]', r).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.route__tabs [data-t]', r).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); });
        $$('.route__panel', r).forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-p') === b.getAttribute('data-t')); });
      });
    });
  });

  /* programme list filter */
  $$('[data-plist-filter]').forEach(function (g) {
    var rows = $$('.prow', d);
    $$('[data-f]', g).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-f]', g).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
        var f = b.getAttribute('data-f');
        rows.forEach(function (r) { r.hidden = !(f === 'all' || r.getAttribute('data-area') === f); });
      });
    });
  });

  /* generic category filter (guides) */
  $$('[data-cat-filter]').forEach(function (g) {
    var list = $('[data-cat-list]');
    $$('[data-f]', g).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-f]', g).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
        var f = b.getAttribute('data-f');
        $$('[data-cat]', list).forEach(function (c) { c.hidden = !(f === 'all' || c.getAttribute('data-cat') === f); });
      });
    });
  });

  /* factsheet gate: ask for name + email once per session, then download */
  var gate = $('#gate'), gateHref = '';
  if (gate) {
    var gf = $('[data-gate-form]', gate);
    var goDl = function () { gate.classList.remove('is-open'); var a = d.createElement('a'); a.href = gateHref; a.download = ''; d.body.appendChild(a); a.click(); a.remove(); };
    var gateSeen = function () { try { return !!sessionStorage.getItem('uome.gate'); } catch (x) { return false; } };
    var gateMark = function () { try { sessionStorage.setItem('uome.gate', '1'); } catch (x) { /* ignore */ } };
    d.addEventListener('click', function (e) {
      var a = e.target.closest('[data-gate]'); if (!a || gateSeen()) return;
      e.preventDefault(); gateHref = a.href; gate.classList.add('is-open'); setTimeout(function () { $('#gn', gate).focus(); }, 60); track('factsheet_gate_open');
    });
    $$('[data-gate-close]', gate).forEach(function (b) { b.addEventListener('click', function () { gate.classList.remove('is-open'); }); });
    gate.addEventListener('click', function (e) { if (e.target === gate) gate.classList.remove('is-open'); });
    $('[data-gate-skip]', gate).addEventListener('click', function () { gateMark(); goDl(); });
    gf.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      $$('input[required]', gf).forEach(function (f) {
        var bad = f.type === 'checkbox' ? !f.checked : (!f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)));
        var fld = f.closest('.field'); if (fld) { fld.classList.toggle('is-bad', bad); var er = $('.err', fld); if (er) er.textContent = bad ? 'Please check this field.' : ''; }
        if (bad) ok = false;
      });
      var ce = $('[data-consent-err]', gf); if (ce) ce.textContent = $('input[name=consent]', gf).checked ? '' : 'Please tick to confirm.';
      if (!ok) return;
      track('factsheet_download'); gateMark(); goDl();
    });
  }

  /* search results page */
  $$('[data-searchpage]').forEach(function (f) {
    var inp = $('input', f), list = $('[data-sp-list]'), cnt = $('[data-sp-count]'), empty = $('[data-sp-empty]');
    function run(v) {
      var t = v.toLowerCase().split(/\s+/).filter(Boolean), items = DATA.search || [];
      var res = items.map(function (it) { var hay = (it.t + ' ' + it.k + ' ' + it.x).toLowerCase(), s = 0; if (!t.length) return null; t.forEach(function (tok) { if (it.t.toLowerCase().indexOf(tok) > -1) s += 3; else if (hay.indexOf(tok) > -1) s += 1; else s -= 10; }); return s > 0 ? { it: it, s: s } : null; }).filter(Boolean).sort(function (a, b) { return b.s - a.s; });
      list.innerHTML = res.map(function (x) { return '<li><a href="' + ROOT + x.it.u + '"><small>' + x.it.k + '</small><strong>' + x.it.t + '</strong><span>' + x.it.x.slice(0, 110) + '</span></a></li>'; }).join('');
      cnt.textContent = t.length ? res.length + (res.length === 1 ? ' result' : ' results') + ' for “' + v + '”' : '';
      empty.hidden = !t.length || res.length > 0;
    }
    f.addEventListener('submit', function (e) { e.preventDefault(); history.replaceState(null, '', '?q=' + encodeURIComponent(inp.value)); run(inp.value); track('search', { q: inp.value }); });
    inp.addEventListener('input', function () { run(inp.value); });
    var q0 = new URLSearchParams(location.search).get('q') || ''; inp.value = q0; run(q0); if (!q0) inp.focus();
  });

  /* programme sections become accordions on phones */
  if (matchMedia('(max-width: 700px)').matches) {
    $$('[data-accm]').forEach(function (s, i) {
      var h = $('h2', s); if (!h) return;
      var body = d.createElement('div'); body.className = 'accm__body';
      var after = false; Array.prototype.slice.call(s.childNodes).forEach(function (n) { if (n === h) { after = true; return; } if (after) body.appendChild(n); });
      s.appendChild(body); s.classList.add('accm'); h.setAttribute('role', 'button'); h.setAttribute('tabindex', '0'); h.setAttribute('aria-expanded', 'false');
      var tg = function () { var o = s.classList.toggle('is-open'); h.setAttribute('aria-expanded', o); };
      h.addEventListener('click', tg); h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tg(); } });
      if (location.hash === '#' + s.id) s.classList.add('is-open');
    });
    w.addEventListener('hashchange', function () { var s = d.getElementById(location.hash.slice(1)); if (s && s.classList.contains('accm')) s.classList.add('is-open'); });
    $$('.subnav a').forEach(function (a) { a.addEventListener('click', function () { var s = d.getElementById(a.getAttribute('href').slice(1)); if (s && s.classList.contains('accm')) s.classList.add('is-open'); }); });
  }

  /* video player modal */
  var vp = $('#vplayer'), vtag = $('#vtag'), vlast = null;
  function vclose() { if (!vp) return; vp.classList.remove('is-open'); try { vtag.pause(); vtag.removeAttribute('src'); vtag.load(); } catch (x) { /* ignore */ } d.body.style.overflow = ''; if (vlast) vlast.focus(); }
  if (vp) {
    d.addEventListener('click', function (e) {
      var c = e.target.closest('[data-video]'); if (!c) return;
      vlast = c; vtag.src = ROOT + c.getAttribute('data-video'); vtag.poster = c.getAttribute('data-poster') ? ROOT + c.getAttribute('data-poster') : ''; $('[data-vtitle-out]', vp).textContent = c.getAttribute('data-vtitle') || '';
      vp.classList.add('is-open'); d.body.style.overflow = 'hidden'; track('video_play', { title: c.getAttribute('data-vtitle') });
      var pr = vtag.play(); if (pr && pr.catch) pr.catch(function () { /* user can press play */ });
      $('[data-vclose]', vp).focus();
    });
    $('[data-vclose]', vp).addEventListener('click', vclose);
    vp.addEventListener('click', function (e) { if (e.target === vp) vclose(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && vtag.getAttribute('src')) vclose(); });
  }

  /* FAQ page: search + topic chips */
  $$('[data-faq-list]').forEach(function (box) {
    var inp = $('[data-faq-search]'), chips = $$('[data-faq-cats] [data-f]'), groups = $$('.faqgroup', box), empty = $('[data-faq-empty]', box), cat = 'all';
    function run() {
      var v = (inp.value || '').toLowerCase().trim(), any = false;
      groups.forEach(function (g) {
        var show = cat === 'all' || g.getAttribute('data-cat') === cat, n = 0;
        $$('details', g).forEach(function (dt) { var m = !v || dt.textContent.toLowerCase().indexOf(v) > -1; dt.hidden = !m; if (m) n++; if (v && m) dt.open = true; });
        g.hidden = !show || n === 0; if (!g.hidden) any = true;
      });
      if (empty) empty.hidden = any;
    }
    chips.forEach(function (b) { b.addEventListener('click', function () { cat = b.getAttribute('data-f'); chips.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); }); run(); }); });
    inp.addEventListener('input', run);
  });

  /* story rotator */
  $$('[data-rotator]').forEach(function (r) {
    var slides = $$('.rot__s', r), dots = $$('.rot__dots button', r), cur = 0, t;
    function go(n) { cur = (n + slides.length) % slides.length; slides.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); }); dots.forEach(function (b, k) { b.classList.toggle('is-on', k === cur); }); clearTimeout(t); if (!reduceMotion) t = setTimeout(function () { go(cur + 1); }, 9000); }
    dots.forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    var vis = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) go(cur); else clearTimeout(t); }); }) : null;
    if (vis) vis.observe(r); else go(0);
  });

  /* course sub-navigation scrollspy */
  var sub = $('[data-subnav]');
  if (sub && io) {
    var links = $$('a', sub), map = {};
    if (links[0]) links[0].classList.add('is-on');
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { links.forEach(function (l) { l.classList.remove('is-on'); }); var a = map[en.target.id]; if (a) { a.classList.add('is-on'); var s = sub.firstElementChild; s.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' }); } } }); }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = d.getElementById(id); if (s) spy.observe(s); });
  }

  /* shortlist / compare store (max 3) */
  var SL = w.UOMEshortlist = {
    list: function () { return store.get('uome.shortlist', []); },
    has: function (s) { return this.list().indexOf(s) > -1; },
    toggle: function (s) {
      var l = this.list(), i = l.indexOf(s);
      if (i > -1) l.splice(i, 1); else { if (l.length >= 3) { toast('You can compare up to three programmes — remove one first.'); return false; } l.push(s); track('compare_add', { programme: s }); }
      store.set('uome.shortlist', l); d.dispatchEvent(new CustomEvent('shortlist:change')); return true;
    },
    clear: function () { store.set('uome.shortlist', []); d.dispatchEvent(new CustomEvent('shortlist:change')); }
  };
  function syncShortlistBtns() {
    $$('[data-shortlist]').forEach(function (b) {
      var on = SL.has(b.getAttribute('data-shortlist')), sp = $('span', b);
      b.setAttribute('aria-pressed', on);
      if (sp) sp.textContent = b.classList.contains('cmpbtn') ? (on ? 'Added' : 'Compare') : (on ? 'Added to compare' : 'Add to compare');
    });
  }
  $$('[data-shortlist]').forEach(function (b) { b.addEventListener('click', function () { SL.toggle(b.getAttribute('data-shortlist')); }); });
  d.addEventListener('shortlist:change', syncShortlistBtns); syncShortlistBtns();

  /* forms: validation, multi-step, prefill, success state */
  var params = new URLSearchParams(w.location.search);
  $$('[data-form]').forEach(function (form) {
    var steps = $$('[data-step]', form), bar = $$('.steps i', form), cur = 0;
    var successEl = $('[data-success]', form);
    function show(i) {
      cur = i; steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
      bar.forEach(function (b, k) { b.classList.toggle('on', k <= i); });
      var f = steps[i] && $('input,select,textarea', steps[i]); if (f && i > 0) f.focus({ preventScroll: true });
      form.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function validate(scope) {
      var ok = true;
      $$('input[required],select[required],textarea[required]', scope).forEach(function (f) {
        var fld = f.closest('.field'), err = fld && $('.err', fld), bad = false, msg = '';
        if (f.type === 'checkbox') { bad = !f.checked; var ce = $('[data-consent-err]', form); if (ce) ce.textContent = bad ? 'Please tick to confirm.' : ''; }
        else if (!f.value.trim()) { bad = true; msg = 'This field is required.'; }
        else if (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) { bad = true; msg = 'Please enter a valid email address.'; }
        if (fld) { fld.classList.toggle('is-bad', bad); if (err) err.textContent = msg; }
        if (bad) ok = false;
      });
      return ok;
    }
    $$('[data-next]', form).forEach(function (b) { b.addEventListener('click', function () { if (validate(steps[cur])) { track('form_step', { step: cur + 1 }); show(cur + 1); } }); });
    $$('[data-prev]', form).forEach(function (b) { b.addEventListener('click', function () { show(cur - 1); }); });
    var started = false;
    form.addEventListener('input', function () { if (!started) { started = true; track('form_start', { form: d.title }); } });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(steps.length ? form : form)) return;
      track('form_submit', { form: d.title });
      $$('.fstep, .steps, .field, .row2, .consent, .err, h2, h3, .btn, button[type=submit], .shortlist-note, .notice', form).forEach(function (n) { if (!successEl.contains(n)) n.hidden = true; });
      $$('.fstep', form).forEach(function (n) { n.hidden = true; });
      successEl.hidden = false; successEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    // prefill from URL or shortlist
    var pg = form.querySelector('select[name=programme]');
    var want = params.get('programme') || (SL.list()[0] || '');
    if (pg && want) { var opt = $$('option', pg).filter(function (o) { return o.value === want; })[0]; if (opt) pg.value = want; }
    var intk = form.querySelector('select[name=intake]'), ip = params.get('intake');
    if (intk && ip) { var map = { '2027-01': 'January 2027', '2027-02': 'February 2027', '2027-09': 'September 2027' }; if (map[ip]) intk.value = map[ip]; }
    var msg = form.querySelector('textarea[name=message]');
    if (msg && params.get('enquire') && pg && pg.value) { var po = pg.options[pg.selectedIndex]; msg.value = 'I’d like to ask about the ' + (po ? po.text : 'programme') + ': '; }
    var topic = form.querySelector('select[name=topic]'); if (topic && params.get('topic')) topic.value = params.get('topic');
    var who = params.get('who'); if (who === 'intl') { var r = form.querySelector('input[name=who][value="International applicant"]'); if (r) r.checked = true; }
    var note = $('[data-shortlist-note]', form), sl = SL.list();
    if (note && sl.length) { var names = sl.map(function (s) { var p = DATA.programmes.filter(function (x) { return x.slug === s; })[0]; return p ? p.short : s; }); note.hidden = false; note.className = 'notice'; note.innerHTML = '<b>From your shortlist:</b> ' + names.join(' · '); }
  });

  /* support topic filter */
  $$('[data-filter-list]').forEach(function (box) {
    var inp = $('[data-filter-input]', box), items = $$('details', box), empty = $('[data-filter-empty]', box);
    inp.addEventListener('input', function () {
      var v = inp.value.toLowerCase().trim(), n = 0;
      items.forEach(function (it) { var m = !v || it.getAttribute('data-keys').indexOf(v) > -1; it.hidden = !m; if (m) n++; if (v && m) it.open = true; });
      empty.hidden = n > 0;
    });
  });

  /* accreditation explorer + journey (same tab/pane pattern) */
  function tabPane(root, btnSel, paneSel) {
    var bs = $$(btnSel, root), ps = $$(paneSel, root);
    function go(i) { bs.forEach(function (b, k) { b.setAttribute('aria-selected', k === i); }); ps.forEach(function (p, k) { p.classList.toggle('is-on', k === i); }); }
    bs.forEach(function (b, i) { b.addEventListener('click', function () { go(i); }); });
    return go;
  }
  $$('[data-explorer]').forEach(function (r) { tabPane(r, '.acc__btn', '.acc__pane'); });
  $$('[data-journey]').forEach(function (r) {
    var go = tabPane(r, '.jr__btn', '.jr__pane');
    $$('[data-next-step]', r).forEach(function (b) { b.addEventListener('click', function () { var i = +b.closest('.jr__pane').getAttribute('data-i'); go(i + 1); }); });
  });

  /* campus tour (sticky stage swaps with chapters) */
  $$('[data-tour]').forEach(function (t) {
    var imgs = $$('.tour__stage img', t), steps = $$('.tstep', t), loc = $('[data-loc]', t);
    if (!('IntersectionObserver' in w)) return;
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = +en.target.getAttribute('data-i');
        steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
        imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
        if (loc) loc.textContent = en.target.getAttribute('data-loc');
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { so.observe(s); });
  });

  /* gallery filter + lightbox */
  $$('[data-gallery]').forEach(function (g) {
    var figs = $$('figure', g), lb = $('#lb'), lbi = lb && $('img', lb), idx = 0, vis = figs;
    $$('[data-gallery-filter] [data-f]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-gallery-filter] [data-f]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
        var f = b.getAttribute('data-f'); figs.forEach(function (fg) { fg.hidden = !(f === 'all' || fg.getAttribute('data-cat') === f); });
        vis = figs.filter(function (fg) { return !fg.hidden; });
      });
    });
    function open(i) { idx = (i + vis.length) % vis.length; lbi.src = ROOT + vis[idx].getAttribute('data-full'); lb.classList.add('is-open'); }
    figs.forEach(function (f) { f.addEventListener('click', function () { open(vis.indexOf(f)); }); f.addEventListener('keydown', function (e) { if (e.key === 'Enter') open(vis.indexOf(f)); }); });
    if (lb) {
      $('.x', lb).addEventListener('click', function () { lb.classList.remove('is-open'); });
      $('.p', lb).addEventListener('click', function () { open(idx - 1); });
      $('.n', lb).addEventListener('click', function () { open(idx + 1); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('is-open'); });
      d.addEventListener('keydown', function (e) { if (!lb.classList.contains('is-open')) return; if (e.key === 'ArrowLeft') open(idx - 1); if (e.key === 'ArrowRight') open(idx + 1); });
    }
  });
  /* hero: full-bleed cycling slides with progress dots and captions */
  $$('[data-hero]').forEach(function (h) {
    var slides = $$('.hero__slide', h), caps = $$('.cap', h), dots = $$('.hero__dots button', h), cur = 0, DUR = 6500, timer;
    h.style.setProperty('--dur', DUR + 'ms');
    function go(n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); });
      caps.forEach(function (c, k) { c.classList.toggle('is-on', k === cur); });
      dots.forEach(function (b, k) { b.classList.remove('is-on'); b.classList.toggle('done', k < cur); });
      void h.offsetWidth; dots[cur].classList.add('is-on');
      var ni = $('img', slides[(cur + 1) % slides.length]); if (ni) ni.loading = 'eager';
      clearTimeout(timer); if (!reduceMotion) timer = setTimeout(function () { go(cur + 1); }, DUR);
    }
    dots.forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    h.addEventListener('click', function (e) {
      if (e.target.closest('a, button, form, select, label, .hero__cap')) return;
      if (h.classList.toggle('paused')) clearTimeout(timer); else go(cur);
    });
    go(0);
  });

  /* parallax, scroll progress ring and back-to-top (one rAF-throttled scroll handler) */
  var para = $$('[data-parallax]'), tt = $('#totop'), ring = tt && $('.fg', tt), topbar = $('#topbar'), CIRC = 2 * Math.PI * 29, ticking = false;
  function onScroll() {
    ticking = false;
    var max = d.documentElement.scrollHeight - w.innerHeight, p = max > 0 ? Math.min(w.scrollY / max, 1) : 0;
    if (ring) ring.style.strokeDashoffset = CIRC * (1 - p);
    if (topbar) topbar.style.width = (p * 100) + '%';
    if (tt) tt.classList.toggle('is-on', w.scrollY > 500);
    if (!reduceMotion) para.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > w.innerHeight + 200) return;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - w.innerHeight / 2) * -parseFloat(el.getAttribute('data-parallax'))).toFixed(1) + 'px,0)';
    });
  }
  w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  w.addEventListener('resize', onScroll); onScroll();
  if (tt) tt.addEventListener('click', function () { w.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* magnetic buttons (fine pointers only) */
  if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    $$('.btn:not(.btn--block)').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.14).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.22).toFixed(1) + 'px)'; });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }
})();
