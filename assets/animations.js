(function () {
  'use strict';
  var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(pointer: fine)').matches;

  function ready() { return document.querySelector('#top h1') && document.querySelector('#build-4') && window.gsap && window.ScrollTrigger; }
  (function wait() { if (ready()) setTimeout(init, 60); else requestAnimationFrame(wait); })();

  /* ---------- helpers ---------- */
  function isGradientText(el) {
    var cs = getComputedStyle(el);
    return (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text');
  }
  // wrap every word of el in masked spans; gradient-text spans are kept whole
  function splitWords(el) {
    var out = [], seen = new Set();
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      if (!n.nodeValue.trim()) return;
      var p = n.parentElement;
      if (p !== el && isGradientText(p)) {
        if (seen.has(p)) return; seen.add(p);
        var wrap = document.createElement('span'); wrap.className = 'hz-w';
        p.parentNode.insertBefore(wrap, p); wrap.appendChild(p);
        p.style.display = 'inline-block'; out.push(p); return;
      }
      var frag = document.createDocumentFragment(), first = true;
      var prev = n.previousSibling, glue = prev && prev.classList && prev.classList.contains('hz-w') ? prev : null;
      n.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (first && glue && !/^\s/.test(part)) { first = false; var gi = document.createElement('span'); gi.textContent = part; glue.appendChild(gi); out.push(gi); return; }
        first = false;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span'); w.className = 'hz-w';
        var i = document.createElement('span'); i.textContent = part; w.appendChild(i);
        frag.appendChild(w); out.push(i);
      });
      n.parentNode.replaceChild(frag, n);
    });
    return out;
  }
  function scramble(el) {
    var final = el.textContent, chars = '!<>-_\\/[]{}=+*^?#01', obj = { p: 0 };
    gsap.to(obj, { p: 1, duration: 1.1, ease: 'power2.out', onUpdate: function () {
      var n = Math.floor(obj.p * final.length), s = final.slice(0, n);
      for (var k = n; k < final.length; k++) s += final[k] === ' ' ? ' ' : chars[(Math.random() * chars.length) | 0];
      el.textContent = s;
    }, onComplete: function () { el.textContent = final; } });
  }
  function typeInto(el, text, dur) {
    var o = { n: 0 };
    return gsap.to(o, { n: text.length, duration: dur || text.length * 0.035, ease: 'none', onUpdate: function () { el.textContent = text.slice(0, Math.round(o.n)); } });
  }
  function onEnter(el, fn, start) { ScrollTrigger.create({ trigger: el, start: start || 'top 85%', once: true, onEnter: fn }); }

  /* ================================================================ */
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('hz-on');

    /* ---------- smooth scroll ---------- */
    var lenis = null;
    if (!REDUCE && window.Lenis) {
      try {
        lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
        document.addEventListener('click', function (e) {
          var a = e.target.closest && e.target.closest('a[href^="#"]');
          if (!a) return; var h = a.getAttribute('href'); if (h.length < 2) return;
          var t = document.querySelector(h); if (!t) return;
          e.preventDefault(); lenis.scrollTo(t, { offset: -72, duration: 1.6 });
        });
        setInterval(function () { document.querySelectorAll('[data-chat-scroll]:not([data-lenis-prevent])').forEach(function (el) { el.setAttribute('data-lenis-prevent', ''); }); }, 400);
      } catch (e) { lenis = null; }
    }

    var hero = document.getElementById('top');
    var heroContent = hero.children[3];
    var heroMain = hero.querySelector('main');

    /* ---------- HERO: neural orb (pure code) ---------- */
    if (window.THREE && !REDUCE) buildOrb(hero, heroContent);

    /* ---------- HERO intro ---------- */
    var h1 = hero.querySelector('h1');
    var full = h1.textContent; h1.textContent = '';
    var letters = [];
    full.split('').forEach(function (c) {
      var w = document.createElement('span'); w.className = 'hz-w';
      var s = document.createElement('span'); s.textContent = c === ' ' ? ' ' : c; w.appendChild(s); h1.appendChild(w); letters.push(s);
    });
    var intro = gsap.timeline({ delay: 0.15 });
    intro.from('header', { yPercent: -100, opacity: 0, duration: 1, ease: 'expo.out' })
      .from(heroMain.children[0].children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, 0.2)
      .from(letters, { yPercent: 115, rotate: 8, stagger: 0.035, duration: 1.2, ease: 'expo.out' }, 0.3)
      .from([heroMain.children[2], heroMain.children[3]], { y: 24, opacity: 0, filter: 'blur(8px)', stagger: 0.12, duration: 1, ease: 'power3.out' }, 0.8)
      .from(heroMain.children[4].children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.6)' }, 1.0)
      .from(heroMain.children[5], { opacity: 0, duration: 0.8 }, 1.2)
      .from(heroContent.children[1].children, { y: 60, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out' }, 1.1);

    // hero scroll-out parallax
    gsap.to(heroMain, { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(hero.children[0], { y: 220, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(hero.children[1], { y: -160, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });

    /* ---------- mono section labels: scramble ---------- */
    document.querySelectorAll('section div').forEach(function (d) {
      if (d.children.length === 0 && /^0\d — /.test(d.textContent.trim())) {
        d.dataset.hzLabel = '1'; var txt = d.textContent; d.textContent = '';
        onEnter(d, function () { d.textContent = txt; scramble(d); }, 'top 92%');
      }
    });

    /* ---------- headings: masked word reveal ---------- */
    document.querySelectorAll('section h2').forEach(function (h) {
      var words = splitWords(h);
      gsap.from(words, { yPercent: 115, duration: 1.15, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: h, start: 'top 86%' } });
    });

    /* ---------- 02 why i exist: words light up with scroll ---------- */
    var why = document.querySelector('section[data-screen-label="02 Why I Exist"] p');
    if (why) {
      var ww = splitWords(why);
      gsap.set(ww, { opacity: 0.12 });
      gsap.to(ww, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: why, start: 'top 78%', end: 'bottom 45%', scrub: 1 } });
    }

    /* ---------- generic reveals for [data-reveal] ---------- */
    var groupReveal = function (els, opts) {
      gsap.from(els, Object.assign({ y: 70, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: els[0].parentElement, start: 'top 85%' } }, opts || {}));
    };
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.id && el.id.indexOf('layer-') === 0) {
        gsap.from(el.children[1], { x: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
      } else if (el.querySelector('#build-2')) {
        groupReveal(el.children, { y: 110, rotate: 2 });
      } else if (el.closest('section[data-screen-label="06 Principles"]')) {
        groupReveal(el.children, { x: -50, y: 0 });
      } else if (el.closest('section[data-screen-label="08 Now"]')) {
        gsap.from(el, { y: 80, opacity: 0, scale: 0.97, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
        var rows = el.children[1] && el.children[1].children;
        if (rows) gsap.from(rows, { x: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } });
      } else if (el.id === 'build-1') {
        gsap.from(el, { y: 120, opacity: 0, scale: 0.96, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      } else if (el.closest('#about')) {
        // handled by photo
      } else {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
      }
    });

    /* ---------- STACK: travelling request packet ---------- */
    var track = document.querySelector('#stack div[style*="width:2px"]') || document.querySelector('#stack div[style*="width: 2px"]');
    if (track) {
      var fill = track.firstElementChild;
      var packet = document.createElement('div'); packet.className = 'hz-packet';
      packet.innerHTML = '<i></i><b>request</b>';
      track.appendChild(packet);
      var lastH = -1;
      gsap.ticker.add(function () {
        var h = fill ? fill.offsetHeight : 0;
        if (h !== lastH) { lastH = h; packet.style.transform = 'translate(-50%,' + h + 'px)'; packet.style.opacity = h > 2 && h < track.offsetHeight - 2 ? 1 : 0; }
      });
    }

    /* ---------- BUILDS: code-drawn product mockups ---------- */
    mockLedgerly(document.querySelector('#build-1 > div'));
    mockDocuMind(document.querySelector('#build-2 > div'));
    mockShopPilot(document.querySelector('#build-3 > div'));
    mockTripwise(document.querySelector('#build-4 > div'));
    // metric count-ups
    ['#build-1', '#build-2', '#build-3', '#build-4'].forEach(function (id) {
      var a = document.querySelector(id); if (!a) return;
      a.querySelectorAll('span').forEach(function (s) {
        var t = s.textContent.trim();
        if (s.children.length === 0 && /^[−+]?[\d,]+%?$/.test(t)) {
          var num = parseFloat(t.replace(/[^\d.]/g, '')), pre = t.match(/^[−+]/) ? t[0] : '', suf = t.endsWith('%') ? '%' : '', comma = t.indexOf(',') > -1;
          var o = { v: 0 };
          onEnter(s, function () { gsap.to(o, { v: num, duration: 1.8, ease: 'power3.out', onUpdate: function () { var v = Math.round(o.v); s.textContent = pre + (comma ? v.toLocaleString('en-US') : v) + suf; } }); }, 'top 96%');
          s.textContent = pre + '0' + suf;
        }
      });
    });

    /* ---------- LAB cards ---------- */
    var lab = document.getElementById('lab');
    var labCards = lab ? lab.querySelectorAll('a[style*="border-radius:20px"], a[style*="border-radius: 20px"]') : [];
    if (labCards.length) gsap.from(labCards, { y: 90, opacity: 0, rotate: function (i) { return (i % 2 ? 3 : -3); }, duration: 1.2, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: labCards[0], start: 'top 88%' } });

    /* ---------- tilt + spotlight on cards ---------- */
    if (FINE && !REDUCE) {
      var tiltEls = Array.prototype.slice.call(labCards).concat([].slice.call(document.querySelectorAll('#build-2,#build-3,#build-4')));
      tiltEls.forEach(function (el) {
        el.style.transition = 'box-shadow .3s, border-color .3s';
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        var spot = document.createElement('span'); spot.className = 'hz-spot'; el.appendChild(spot);
        el.addEventListener('mousemove', function (e) {
          var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
          gsap.to(el, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 8, transformPerspective: 900, duration: 0.5, ease: 'power2.out' });
        });
        el.addEventListener('mouseenter', function () { spot.style.opacity = 1; });
        el.addEventListener('mouseleave', function () { spot.style.opacity = 0; gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' }); });
      });
    }

    /* ---------- tech marquee (velocity reactive) ---------- */
    if (lab) {
      var mq = document.createElement('div'); mq.className = 'hz-marquee';
      var items = ['AI agents', 'Next.js', 'Go', 'Python', 'RAG', 'PostgreSQL', 'LLMs', 'WordPress', 'Redis', 'TypeScript'];
      var row = '<div class="hz-mq-row">' + [0, 1, 2].map(function () { return items.map(function (t, i) { return '<span class="' + (i % 2 ? 'o' : '') + '">' + t + '</span><em>✦</em>'; }).join(''); }).join('') + '</div>';
      mq.innerHTML = row; lab.appendChild(mq);
      var mrow = mq.firstChild, mx = 0, vel = 0;
      if (lenis) lenis.on('scroll', function (e) { vel = e.velocity || 0; });
      gsap.ticker.add(function () {
        mx -= 0.6 + Math.abs(vel) * 0.5; var w = mrow.scrollWidth / 3; if (-mx > w) mx += w;
        mrow.style.transform = 'translate3d(' + mx + 'px,0,0) skewX(' + gsap.utils.clamp(-10, 10, -vel * 0.35) + 'deg)'; vel *= 0.9;
      });
    }

    /* ---------- ABOUT: photo ---------- */
    var aboutCard = document.querySelector('#about [data-reveal] > div');
    if (aboutCard && window.__HZ_PHOTO) {
      aboutCard.style.position = 'relative'; aboutCard.style.overflow = 'hidden';
      var ph = document.createElement('div'); ph.className = 'hz-photo';
      ph.innerHTML = '<img alt="M E Hasareli" src="' + window.__HZ_PHOTO + '"><span class="hz-tint"></span><span class="hz-scan"></span>';
      aboutCard.appendChild(ph);
      var img = ph.querySelector('img'), scan = ph.querySelector('.hz-scan');
      gsap.set(ph, { clipPath: 'inset(100% 0% 0% 0%)' });
      var tl = gsap.timeline({ scrollTrigger: { trigger: aboutCard, start: 'top 80%' } });
      tl.to(ph, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
        .fromTo(scan, { top: '100%', opacity: 1 }, { top: '-10%', duration: 1.5, ease: 'expo.inOut' }, 0)
        .to(scan, { opacity: 0, duration: 0.3 })
        .from(img, { scale: 1.3, duration: 2, ease: 'expo.out' }, 0);
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: aboutCard, start: 'top bottom', end: 'bottom top', scrub: true } });
      var badge = aboutCard.nextElementSibling; if (badge) gsap.from(badge, { x: 40, opacity: 0, duration: 1, delay: 1.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: aboutCard, start: 'top 80%' } });
      var aboutText = document.querySelector('#about [data-reveal]').nextElementSibling;
      if (aboutText) gsap.from(aboutText.children, { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: aboutText, start: 'top 80%' } });
    }

    /* ---------- CONTACT ---------- */
    var contact = document.getElementById('contact');
    if (contact) {
      var rows2 = contact.querySelectorAll('a[style*="justify-content:space-between"], a[style*="justify-content: space-between"]');
      if (rows2.length) gsap.from(rows2, { x: -40, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: rows2[0], start: 'top 90%' } });
      var form = contact.querySelector('form');
      if (form) gsap.from(form, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: form, start: 'top 88%' } });
    }

    /* ---------- magnetic buttons ---------- */
    if (FINE && !REDUCE) {
      var mags = [].slice.call(heroMain.children[4].children);
      var nb = document.querySelector('header nav a[href="#contact"]'); if (nb) mags.push(nb);
      mags.forEach(function (b) {
        b.style.display = b.style.display || 'inline-block';
        b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: 'power3.out' }); });
        b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' }); });
      });
      // cursor glow
      var cg = document.createElement('div'); cg.id = 'hz-cursor'; document.body.appendChild(cg);
      var qx = gsap.quickTo(cg, 'x', { duration: 0.6, ease: 'power3' }), qy = gsap.quickTo(cg, 'y', { duration: 0.6, ease: 'power3' });
      addEventListener('pointermove', function (e) { qx(e.clientX); qy(e.clientY); });
    }

    // footer-ish section glows parallax
    document.querySelectorAll('section > div[style*="blur("]').forEach(function (b, i) {
      gsap.to(b, { y: i % 2 ? -120 : 120, ease: 'none', scrollTrigger: { trigger: b.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    setTimeout(function () { ScrollTrigger.refresh(); }, 800);
    addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ================================================================
     HERO ORB — a glowing neural network drawn with Three.js
     ================================================================ */
  function buildOrb(hero, before) {
    var canvas = document.createElement('canvas'); canvas.id = 'hz-orb';
    hero.insertBefore(canvas, before);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100); camera.position.z = 7.5;
    var group = new THREE.Group(); scene.add(group);
    var R = 2.3, uni = { uTime: { value: 0 }, uProg: { value: 0 }, uPR: { value: renderer.getPixelRatio() } };

    // dust points
    var N = 2600, pos = [], rnd = [];
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i, j = 1 + (Math.random() - 0.5) * 0.12;
      pos.push(Math.cos(th) * r * R * j, y * R * j, Math.sin(th) * r * R * j); rnd.push(Math.random());
    }
    // neurons
    var nodes = [];
    for (var k = 0; k < 150; k++) {
      var u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, q = Math.sqrt(1 - u * u), rr = R * (0.55 + Math.random() * 0.5);
      var v = new THREE.Vector3(q * Math.cos(t) * rr, u * rr, q * Math.sin(t) * rr); nodes.push(v);
      pos.push(v.x, v.y, v.z); rnd.push(1.4 + Math.random());
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1));
    var pm = new THREE.ShaderMaterial({ uniforms: uni, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'attribute float aRand;uniform float uTime,uProg,uPR;varying float vR;varying float vY;' +
        'void main(){vR=aRand;vec3 p=position*(1.0+uProg*(0.6+fract(aRand*7.0)*0.9));p+=normalize(position)*sin(uTime*1.2+aRand*40.0)*0.03;vY=normalize(position).y;' +
        'vec4 mv=modelViewMatrix*vec4(p,1.0);float s=aRand>1.0?(5.0+aRand*2.0):(1.2+aRand*2.0);gl_PointSize=s*uPR*(6.0/-mv.z);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'uniform float uTime,uProg;varying float vR;varying float vY;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;float a=smoothstep(0.5,0.0,d);' +
        'vec3 c=mix(vec3(0.49,0.33,1.0),vec3(0.56,0.89,1.0),vY*0.5+0.5);if(vR>1.0){c=mix(c,vec3(1.0),0.45);a*=0.9+0.4*sin(uTime*3.0+vR*20.0);}else{a*=0.45+0.35*sin(uTime*2.0+vR*50.0);}' +
        'gl_FragColor=vec4(c,a*(1.0-uProg*0.75));}' });
    group.add(new THREE.Points(g, pm));

    // synapses with travelling pulses
    var lp = [], lt = [], lph = [];
    for (var a = 0; a < nodes.length; a++) for (var b = a + 1; b < nodes.length; b++) {
      if (nodes[a].distanceTo(nodes[b]) < 1.05) {
        var ph = Math.random();
        lp.push(nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z); lt.push(0, 1); lph.push(ph, ph);
      }
    }
    var lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
    lg.setAttribute('aT', new THREE.Float32BufferAttribute(lt, 1));
    lg.setAttribute('aPh', new THREE.Float32BufferAttribute(lph, 1));
    var lm = new THREE.ShaderMaterial({ uniforms: uni, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'attribute float aT,aPh;uniform float uProg;varying float vT;varying float vPh;void main(){vT=aT;vPh=aPh;vec3 p=position*(1.0+uProg*0.9);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}',
      fragmentShader: 'uniform float uTime,uProg;varying float vT;varying float vPh;void main(){float h=fract(uTime*0.35+vPh);float pulse=smoothstep(0.12,0.0,abs(vT-h));' +
        'vec3 c=mix(vec3(0.55,0.42,1.0),vec3(0.56,0.89,1.0),pulse);gl_FragColor=vec4(c,(0.07+pulse*0.8)*(1.0-uProg));}' });
    group.add(new THREE.LineSegments(lg, lm));

    function size() {
      var w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      group.position.y = w < 700 ? 0.6 : 0.35; var s = w < 700 ? 0.72 : 1; group.scale.setScalar(s);
    }
    size(); addEventListener('resize', size);
    var st = { p: 0 };
    gsap.to(st, { p: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.from(canvas, { opacity: 0, scale: 0.85, duration: 2.4, delay: 0.2, ease: 'expo.out' });
    var mx = 0, my = 0, tx = 0, ty = 0;
    addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
    var visible = true;
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(hero);
    var clock = new THREE.Clock();
    gsap.ticker.add(function () {
      if (!visible) return;
      var t = clock.getElapsedTime(); uni.uTime.value = t; uni.uProg.value = st.p;
      tx += (mx - tx) * 0.04; ty += (my - ty) * 0.04;
      group.rotation.y = t * 0.08 + tx * 0.6 + st.p * 1.2; group.rotation.x = 0.25 + ty * 0.4;
      renderer.render(scene, camera);
    });
  }

  /* ================================================================
     MOCKUPS (no images — all HTML/CSS/SVG)
     ================================================================ */
  function mount(host, html) {
    if (!host) return null;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.overflow = 'hidden';
    var m = document.createElement('div'); m.className = 'hz-mock'; m.innerHTML = html; host.appendChild(m);
    var badge = host.querySelector(':scope > span'); if (badge) { badge.style.zIndex = 3; }
    return m;
  }

  function mockLedgerly(host) {
    var bars = '', heights = [38, 52, 44, 63, 58, 72, 66, 81, 74, 88, 79, 94];
    heights.forEach(function (h) { bars += '<i style="height:' + h + '%"></i>'; });
    var m = mount(host, '' +
      '<div class="lg">' +
      ' <div class="lg-top"><span></span><span></span><span></span><em>ledgerly.app / dashboard</em></div>' +
      ' <div class="lg-body">' +
      '  <aside><b class="on"></b><b></b><b></b><b></b><b></b></aside>' +
      '  <main>' +
      '   <div class="lg-kpis">' +
      '    <div><small>Outstanding</small><strong data-n="48240" data-p="$">$0</strong><u>+12%</u></div>' +
      '    <div><small>Overdue</small><strong data-n="7">0</strong><u class="bad">3 new</u></div>' +
      '    <div><small>Auto-matched</small><strong data-n="132">0</strong><u>this week</u></div>' +
      '   </div>' +
      '   <div class="lg-chart"><small>Payments matched · 12 weeks</small><div class="lg-bars">' + bars + '</div>' +
      '    <svg viewBox="0 0 300 80" preserveAspectRatio="none"><path d="M0,62 C30,55 45,58 70,46 S120,40 150,34 S210,22 240,18 S285,8 300,6" /></svg></div>' +
      '   <div class="lg-rows">' +
      '    <div><span>Northwind Studio</span><span>$4,800</span><em class="ok">Matched</em></div>' +
      '    <div><span>Blue Fern Agency</span><span>$2,150</span><em class="bad">Overdue 14d</em></div>' +
      '    <div><span>Kite &amp; Co.</span><span>$6,920</span><em class="ok">Paid</em></div>' +
      '    <div><span>Atlas Creative</span><span>$1,375</span><em class="bad">Overdue 9d</em></div>' +
      '   </div>' +
      '  </main>' +
      ' </div>' +
      ' <div class="lg-ai"><div class="lg-ai-h"><i>✦</i> Copilot</div><p></p><div class="lg-ai-b"><span>Send all</span><span>Review</span></div></div>' +
      '</div>');
    if (!m) return;
    var tl = gsap.timeline({ paused: true });
    tl.from(m.querySelector('.lg'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from(m.querySelectorAll('.lg-kpis > div'), { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, 0.3)
      .add(function () {
        m.querySelectorAll('[data-n]').forEach(function (el) {
          var n = +el.dataset.n, p = el.dataset.p || '', o = { v: 0 };
          gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: function () { el.textContent = p + Math.round(o.v).toLocaleString('en-US'); } });
        });
      }, 0.4)
      .from(m.querySelectorAll('.lg-bars i'), { scaleY: 0, transformOrigin: 'bottom', stagger: 0.05, duration: 0.8, ease: 'expo.out' }, 0.5)
      .fromTo(m.querySelector('.lg-chart path'), { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.7)
      .from(m.querySelectorAll('.lg-rows > div'), { x: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 1)
      .from(m.querySelector('.lg-ai'), { y: 40, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.7)' }, 1.8)
      .add(typeInto(m.querySelector('.lg-ai p'), '2 invoices are overdue. I drafted friendly reminders and matched 3 new payments. Send them?', 2.6), 2.3)
      .from(m.querySelectorAll('.lg-ai-b span'), { y: 10, opacity: 0, stagger: 0.1, duration: 0.4 }, '>-0.1');
    onEnter(host, function () { tl.play(); }, 'top 75%');
    gsap.to(m.querySelectorAll('.lg-rows em.bad'), { opacity: 0.45, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' });
  }

  function mockDocuMind(host) {
    var m = mount(host, '<div class="dm"><div class="dm-search"><i>⌕</i><span class="q"></span><b class="caret"></b></div>' +
      '<div class="dm-ans"><small>✦ Answer</small><p><span class="l"></span><span class="l w2"></span><span class="l w3"></span></p>' +
      '<div class="dm-cite"><em>[1] Admin guide p.14</em><em>[2] wiki/auth-reset</em></div></div></div>');
    if (!m) return;
    var q = m.querySelector('.q');
    var loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
    loop.set(m.querySelectorAll('.l, .dm-cite em'), { scaleX: 0, opacity: 0 }).set(q, { textContent: '' })
      .add(typeInto(q, 'How do I reset 2FA for a customer?', 1.4))
      .to(m.querySelectorAll('.l'), { scaleX: 1, opacity: 1, transformOrigin: 'left', stagger: 0.18, duration: 0.5, ease: 'power3.out' }, '+=0.3')
      .to(m.querySelectorAll('.dm-cite em'), { scaleX: 1, opacity: 1, stagger: 0.15, duration: 0.4, ease: 'back.out(2)' }, '-=0.1')
      .to(m.querySelectorAll('.dm-cite em'), { boxShadow: '0 0 18px rgba(143,227,255,.6)', yoyo: true, repeat: 1, duration: 0.4 }, '+=0.3')
      .to({}, { duration: 1.4 });
    onEnter(host, function () { loop.play(); });
  }

  function mockShopPilot(host) {
    var m = mount(host, '<div class="sp"><div class="sp-thumb"><i></i></div><div class="sp-txt"><small>Product · Ceramic pour-over set</small>' +
      '<div class="sp-old"><span></span><span></span></div><p class="sp-new"></p><div class="sp-act"><span class="gen">✦ Generated</span><span class="ok">Approve ✓</span></div></div></div>');
    if (!m) return;
    var p = m.querySelector('.sp-new'), ok = m.querySelector('.ok');
    var loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true });
    loop.set(p, { textContent: '' }).set(m.querySelector('.sp-old'), { opacity: 1, height: 'auto' }).set(ok, { background: 'rgba(255,255,255,.06)', color: '#c9c6e0' }).set(m.querySelector('.gen'), { opacity: 0 })
      .to(m.querySelector('.sp-old'), { opacity: 0.25, duration: 0.4 }, 0.6)
      .to(m.querySelector('.gen'), { opacity: 1, duration: 0.3 })
      .add(typeInto(p, 'Hand-thrown stoneware that brews a slow, even cup. Matte glaze, fits any mug.', 2.2))
      .to(ok, { background: '#7ee0a4', color: '#07160d', duration: 0.3 }, '+=0.3')
      .fromTo(ok, { scale: 1 }, { scale: 1.12, yoyo: true, repeat: 1, duration: 0.15 })
      .to({}, { duration: 1.2 });
    onEnter(host, function () { loop.play(); });
  }

  function mockTripwise(host) {
    var m = mount(host, '<div class="tw"><svg viewBox="0 0 200 150"><g class="grid"></g>' +
      '<path class="rt" d="M30,115 C60,60 90,120 115,70 S170,40 175,30"/>' +
      '<circle cx="30" cy="115" r="5"/><circle cx="115" cy="70" r="5"/><circle cx="175" cy="30" r="5"/></svg>' +
      '<div class="tw-log"><p>› searching 38 flights…</p><p>› comparing 14 hotels…</p><p>› rain on day 2, re-planning…</p><p class="ok">✓ itinerary ready · 3 days</p></div></div>');
    if (!m) return;
    var gr = m.querySelector('.grid'), s = '';
    for (var i = 0; i < 10; i++) s += '<line x1="' + i * 22 + '" y1="0" x2="' + i * 22 + '" y2="150"/><line x1="0" y1="' + i * 17 + '" x2="200" y2="' + i * 17 + '"/>';
    gr.innerHTML = s;
    var loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
    loop.set(m.querySelectorAll('.tw-log p'), { opacity: 0, x: -10 }).set(m.querySelectorAll('.tw circle'), { scale: 0, transformOrigin: 'center' })
      .fromTo(m.querySelector('.rt'), { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0)
      .to(m.querySelectorAll('.tw circle'), { scale: 1, stagger: 0.7, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0)
      .to(m.querySelectorAll('.tw-log p'), { opacity: 1, x: 0, stagger: 0.55, duration: 0.35 }, 0.1)
      .to({}, { duration: 1.6 });
    onEnter(host, function () { loop.play(); });
  }
})();
