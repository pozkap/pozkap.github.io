// POZKAP sitesi: karakter güçleri çarkı, erdem düğmeleri, kaydırınca belirme.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Çark: güç listesi (#field) kaynak alınır; liste ekran okuyucular için yerinde kalır.
  var field = document.getElementById('field');
  var wrap = document.querySelector('.wheel-wrap');
  var virtueNames = {};
  document.querySelectorAll('.virtues button').forEach(function (b) { virtueNames[b.dataset.v] = b.textContent.trim(); });

  if (field && wrap) {
    var items = Array.prototype.map.call(field.querySelectorAll('li'), function (li) {
      return { name: li.textContent.trim(), v: li.className.split(' ')[0] };
    });
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '-120 -120 240 240');
    svg.setAttribute('class', 'wheel' + (reduce ? '' : ' intro'));
    svg.setAttribute('aria-hidden', 'true');
    var R = 116, r = 66, n = items.length, step = 2 * Math.PI / n, gap = 0.014;
    function pt(a, rad) { return [Math.sin(a) * rad, -Math.cos(a) * rad]; }
    var center = wrap.querySelector('.wheel-center');
    var idle = center.innerHTML;

    items.forEach(function (it, i) {
      var a0 = i * step + gap, a1 = (i + 1) * step - gap;
      var p0 = pt(a0, R), p1 = pt(a1, R), p2 = pt(a1, r), p3 = pt(a0, r);
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', 'M' + p0 + 'A' + R + ' ' + R + ' 0 0 1 ' + p1 + 'L' + p2 + 'A' + r + ' ' + r + ' 0 0 0 ' + p3 + 'Z');
      path.setAttribute('class', it.v);
      path.style.transitionDelay = reduce ? '0s' : (i * 0.03) + 's';
      path.addEventListener('mouseenter', function () {
        path.classList.add('hot');
        center.innerHTML = '<b>' + it.name + '</b><span>' + (virtueNames[it.v] || '') + '</span>';
      });
      path.addEventListener('mouseleave', function () {
        path.classList.remove('hot');
        center.innerHTML = currentVirtue ? virtueLabel(currentVirtue) : idle;
      });
      svg.appendChild(path);
    });
    var ring = document.createElementNS(ns, 'circle');
    ring.setAttribute('r', r - 8); ring.setAttribute('class', 'ring');
    svg.appendChild(ring);
    wrap.insertBefore(svg, center);

    if (!reduce) {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        svg.classList.remove('intro');
        setTimeout(function () { svg.querySelectorAll('path').forEach(function (p) { p.style.transitionDelay = '0s'; }); }, 1400);
      }); });
    }
  }

  // 2. Erdem düğmeleri: seçilen erdemin dilimlerini öne çıkarır.
  var currentVirtue = null;
  function virtueLabel(v) {
    var count = field ? field.querySelectorAll('li.' + v).length : 0;
    var unit = document.documentElement.lang === 'en' ? 'strengths' : 'güç';
    return '<b>' + virtueNames[v] + '</b><span>' + count + ' ' + unit + '</span>';
  }
  var buttons = document.querySelectorAll('.virtues button');
  function select(v) {
    currentVirtue = v;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === v)); });
    var wheel = document.querySelector('.wheel');
    [wheel, field].forEach(function (el) {
      if (!el) return;
      if (v) el.setAttribute('data-active', v); else el.removeAttribute('data-active');
      el.querySelectorAll('path, li').forEach(function (x) { x.classList.toggle('on', !!v && x.classList.contains(v)); });
    });
    var center = document.querySelector('.wheel-center');
    if (center) center.innerHTML = v ? virtueLabel(v) : center.dataset.idle;
  }
  var c0 = document.querySelector('.wheel-center');
  if (c0) c0.dataset.idle = c0.innerHTML;
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      select(b.getAttribute('aria-pressed') === 'true' ? null : b.dataset.v);
    });
  });

  // 3. Kaydırınca belirme
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }
})();
