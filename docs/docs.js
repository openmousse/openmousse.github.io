// OpenMousse docs: language and reader switches, the agent view (the page's Markdown), copy actions, search, mobile menu, TOC.
(function () {
  var d = document, R = d.documentElement;
  var $ = function (s, el) { return (el || d).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || d).querySelectorAll(s)); };
  var lang = function () { return R.getAttribute('data-lang') === 'zh' ? 'zh' : 'en'; };
  var mode = function () { return R.getAttribute('data-mode') === 'agent' ? 'agent' : 'human'; };
  var store = function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage may be blocked */ } };
  var S = $('#gb-strings');
  var str = function (k) { return S ? S.getAttribute('data-' + k + '-' + lang()) || '' : ''; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function mdText(l) { var el = $('#md-' + (l || lang())); return el ? el.textContent.replace(/<\\\//g, '</') : ''; }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(fallback);
    return Promise.resolve(fallback());
    function fallback() {
      var ta = d.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); } catch (e) { /* nothing more to try */ } d.body.removeChild(ta);
    }
  }
  function flash(btn, done) {
    var label = btn.querySelector('span') || btn, old = label.textContent;
    label.textContent = done; clearTimeout(btn._t);
    btn._t = setTimeout(function () { label.textContent = old; }, 1600);
  }

  // ---------- the agent view: the page's Markdown, styled like the board's mdLines
  function mdRuns(t) {
    return String(t).split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\[[^\]]{4,}\](?!\())/).map(function (x) {
      if (!x) return '';
      var m = x.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) return '<span class="lk">[</span><span class="lt">' + esc(m[1]) + '</span><span class="lk">](</span><span class="lu">' + esc(m[2]) + '</span><span class="lk">)</span>';
      if (x[0] === '`') return '<span class="cd">' + esc(x) + '</span>';
      if (x === '[即将推出]' || x === '[Coming soon]') return '<span class="sn">' + esc(x) + '</span>';
      if (x[0] === '[') return '<span class="nt">' + esc(x) + '</span>';
      return esc(x);
    }).join('');
  }
  function renderAgent() {
    var box = $('.gb-md'); if (!box || mode() !== 'agent') return;
    var src = $('#md-' + lang()), text = mdText(), fence = false;
    if (box._k === lang()) return; box._k = lang();
    box.innerHTML = text.split('\n').map(function (t) {
      if (/^\s*```/.test(t)) { fence = !fence; return '<span class="f">' + esc(t) + '</span>'; }
      if (fence) return '<span class="fc">' + (esc(t) || ' ') + '</span>';
      var c = /^# /.test(t) ? 'h1' : (/^#{2,4} /.test(t) ? 'h' : (/^>/.test(t) ? 'q' : ''));
      return '<span class="' + c + '">' + (t ? mdRuns(t) : ' ') + '</span>';
    }).join('');
    $('.gb-url').textContent = src ? src.getAttribute('data-url') : '';
    $('.gb-type').textContent = src ? src.getAttribute('data-type') : '';
    var cb = $('.gb-copy[data-copy="agent"]'); if (cb) cb.textContent = cb.getAttribute('data-l-copy-' + lang());
  }

  function setLang(l) {
    R.setAttribute('data-lang', l); R.lang = l === 'zh' ? 'zh-CN' : 'en'; store('om-lang', l);
    var t = R.getAttribute('data-title-' + l); if (t) d.title = t;
    var inp = $('.gb-sdlg input'); if (inp) inp.placeholder = inp.getAttribute('data-ph-' + l);
    var bu = $('.gb-burger'); if (bu) bu.setAttribute('aria-label', str(R.classList.contains('nav-open') ? 'close' : 'menu'));
    renderAgent(); observeToc();
  }
  function setMode(m) { R.setAttribute('data-mode', m); store('om-docs-mode', m); renderAgent(); if (m === 'human') observeToc(); }

  // ---------- headings: the two languages share anchors (Chinese ids carry a zh- prefix)
  function target(hash) {
    var id = decodeURIComponent((hash || '').replace(/^#/, '')); if (!id) return null;
    var alt = lang() === 'zh' ? (id.indexOf('zh-') === 0 ? id : 'zh-' + id) : id.replace(/^zh-/, '');
    return d.getElementById(alt) || d.getElementById(id);
  }
  function goHash() { var el = target(location.hash); if (el) el.scrollIntoView(); }

  var io = null;
  function observeToc() {
    if (io) io.disconnect();
    var toc = $('.gb-toc[data-l="' + lang() + '"]'); if (!toc || !('IntersectionObserver' in window)) return;
    var links = $$('a[data-toc]', toc), heads = links.map(function (a) { return d.getElementById(a.getAttribute('data-toc')); }).filter(Boolean);
    if (!heads.length) return;
    var on = function (id) { links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-toc') === id); }); };
    on(heads[0].id);
    io = new IntersectionObserver(function () {
      var cur = heads[0];
      heads.forEach(function (h) { if (h.getBoundingClientRect().top < 120) cur = h; });
      on(cur.id);
    }, { rootMargin: '-80px 0px -60% 0px', threshold: [0, 1] });
    heads.forEach(function (h) { io.observe(h); });
  }

  // ---------- search
  var index = null, loading = null, sel = 0;
  function loadIndex() {
    if (index || loading) return loading;
    loading = fetch(R.getAttribute('data-docs') + 'search.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) { index = j; }).catch(function () { index = false; });
    return loading;
  }
  function openSearch() {
    var dlg = $('.gb-sdlg'); if (!dlg) return;
    dlg.hidden = false; var inp = $('input', dlg); inp.placeholder = inp.getAttribute('data-ph-' + lang()); inp.value = ''; $('.gb-sres').innerHTML = '';
    setTimeout(function () { inp.focus(); }, 0); loadIndex();
  }
  function closeSearch() { var dlg = $('.gb-sdlg'); if (dlg) dlg.hidden = true; }
  function search(q) {
    var res = $('.gb-sres'), l = lang();
    q = q.trim().toLowerCase(); if (!q) { res.innerHTML = ''; return; }
    if (index === false) { res.innerHTML = '<div class="e">' + esc(str('fail')) + '</div>'; return; }
    if (!index) { loadIndex().then(function () { search($('.gb-sdlg input').value); }); return; }
    var terms = q.split(/\s+/).filter(Boolean), hits = [];
    index.pages.forEach(function (p) {
      var P = p[l]; if (!P) return;
      var score = 0, best = null, all = (P.t + ' ' + P.d + ' ' + P.x).toLowerCase();
      if (!terms.every(function (t) { return all.indexOf(t) >= 0; })) return;
      terms.forEach(function (t) { if (P.t.toLowerCase().indexOf(t) >= 0) score += 10; if (P.d.toLowerCase().indexOf(t) >= 0) score += 3; });
      P.h.forEach(function (h) { var s = 0; terms.forEach(function (t) { if (h[1].toLowerCase().indexOf(t) >= 0) s += 5; }); if (s && (!best || s > best.s)) best = { s: s, id: h[0], t: h[1] }; });
      if (best) score += best.s;
      var i = P.x.toLowerCase().indexOf(terms[0]), snip = i >= 0 ? P.x.slice(Math.max(0, i - 40), i + 90) : P.d;
      hits.push({ score: score + 1, href: R.getAttribute('data-docs') + p.slug + '.html' + (best ? '#' + best.id : ''), title: P.t + (best ? ' › ' + best.t : ''), snip: snip });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    sel = 0;
    res.innerHTML = hits.length ? hits.slice(0, 12).map(function (h, i) {
      var s = esc(h.snip); terms.forEach(function (t) { s = s.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
      return '<a href="' + esc(h.href) + '"' + (i === 0 ? ' class="on"' : '') + ' role="option"><span class="t">' + esc(h.title) + '</span><span class="s">' + s + '</span></a>';
    }).join('') : '<div class="e">' + esc(str('none')) + '</div>';
  }

  // ---------- events
  d.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-act],[data-copy],.gb-menubtn,.gb-check'); if (!el) {
      $$('.gb-menu').forEach(function (m) { if (!m.hidden) { m.hidden = true; m.parentNode.querySelector('.gb-menubtn').setAttribute('aria-expanded', 'false'); } });
      if (ev.target.classList && ev.target.classList.contains('gb-sdlg')) closeSearch();
      return;
    }
    var act = el.getAttribute('data-act'), cp = el.getAttribute('data-copy');
    if (el.classList.contains('gb-menubtn')) {
      var m = el.parentNode.parentNode.querySelector('.gb-menu'); m.hidden = !m.hidden; el.setAttribute('aria-expanded', String(!m.hidden)); return;
    }
    if (el.classList.contains('gb-check')) { el.setAttribute('aria-pressed', el.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); return; }
    if (act === 'lang') setLang(lang() === 'zh' ? 'en' : 'zh');
    else if (act === 'mode') setMode(el.getAttribute('data-v'));
    else if (act === 'nav') {
      var open = !R.classList.contains('nav-open'); R.classList.toggle('nav-open', open);
      var bu = $('.gb-burger'); bu.setAttribute('aria-expanded', String(open)); bu.setAttribute('aria-label', str(open ? 'close' : 'menu'));
    } else if (act === 'search') openSearch();
    else if (act === 'copy-page' || act === 'copy-ai') {
      var md = mdText(); if (act === 'copy-ai') md += '\n\n---\n' + (lang() === 'zh' ? '完整的文档索引：' : 'Full docs index: ') + 'https://openmousse.ai/llms.txt';
      copyText(md); var menu = el.closest('.gb-menu'); menu.hidden = true; flash(menu.parentNode.querySelector('.gb-copypage'), menu.parentNode.querySelector('.gb-copypage').getAttribute('data-l-done'));
    } else if (act === 'print') { el.closest('.gb-menu').hidden = true; window.print(); }
    else if (act === 'helpful') { var h = el.closest('.gb-helpful'); $$('.gb-pill', h).forEach(function (b) { b.hidden = true; }); $('.gb-thanks', h).hidden = false; }
    else if (cp === 'page') { copyText(mdText()); flash(el, el.getAttribute('data-l-done')); }
    else if (cp === 'code') { var pre = el.closest('.gb-codebox').querySelector('pre'); copyText($$('span', pre).map(function (s) { return s.textContent.replace(/^ $/, ''); }).join('\n')); flash(el, el.getAttribute('data-l-done')); }
    else if (cp === 'agent') { copyText(mdText()); flash(el, el.getAttribute('data-l-done-' + lang())); }
  });
  d.addEventListener('keydown', function (ev) {
    var dlg = $('.gb-sdlg'), openD = dlg && !dlg.hidden;
    if ((ev.metaKey || ev.ctrlKey) && (ev.key === 'k' || ev.key === 'K')) { ev.preventDefault(); openD ? closeSearch() : openSearch(); return; }
    if (!openD && ev.key === '/' && !/^(INPUT|TEXTAREA)$/.test((ev.target || {}).tagName || '')) { ev.preventDefault(); openSearch(); return; }
    if (ev.key === 'Escape') { if (openD) closeSearch(); else if (R.classList.contains('nav-open')) $('.gb-burger').click(); $$('.gb-menu').forEach(function (m) { m.hidden = true; }); return; }
    if (openD && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp' || ev.key === 'Enter')) {
      var items = $$('.gb-sres a'); if (!items.length) return;
      if (ev.key === 'Enter') { ev.preventDefault(); location.href = items[sel].getAttribute('href'); closeSearch(); return; }
      ev.preventDefault(); sel = (sel + (ev.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
      items.forEach(function (a, i) { a.classList.toggle('on', i === sel); }); items[sel].scrollIntoView({ block: 'nearest' });
    }
  });
  var inp = $('.gb-sdlg input'); if (inp) inp.addEventListener('input', function () { search(inp.value); });
  var sres = $('.gb-sres'); if (sres) sres.addEventListener('click', function (ev) { if (ev.target.closest('a')) closeSearch(); });
  window.addEventListener('hashchange', goHash);
  $$('.gb-side a').forEach(function (a) { a.addEventListener('click', function () { R.classList.remove('nav-open'); }); });

  setLang(lang()); if (location.hash) goHash();
})();
