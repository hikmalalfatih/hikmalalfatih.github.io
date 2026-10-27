/* Portfolio Hikmal Alfatih — motion di-clone dari template PRIOR
   (vanilla HTML/CSS/JS + GSAP ScrollTrigger), isi dari intro ke bawah punya Hikmal.
   Supabase: proyek portofolio (functions comments/contact) — kunci publishable
   ini memang dirancang publik (sama seperti di bundle situs lama) dan dipakai
   sebagai header apikey + Authorization, seperti client Supabase situs lama. */
(() => {
  'use strict';

  var SUPABASE_URL = 'https://ldqhflpjhjrtmesuatim.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_cJRWyHDau6nJf3I0OpAZ4w_jSpKLAGz';
  var PAGE_STARTED_AT = Date.now();

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  var HERO_FRAME_COUNT = 37;
  var VT_FRAME_COUNT = 42;
  var HERO_CRITICAL_COUNT = 15;
  var VT_CRITICAL_COUNT = 15;
  var FRAME_EVICT_WINDOW = 20;

  var heroFrameSet = null;
  var vtFrameSet = null;

  function requestIdle(cb) {
    if (window.requestIdleCallback) return window.requestIdleCallback(cb);
    return setTimeout(function () { cb({ timeRemaining: function () { return 10; } }); }, 100);
  }

  function buildFrameArray(folderPrefix, count) {
    var frames = [];
    for (var i = 0; i < count; i++) frames.push(new Image());

    function srcFor(index) {
      return folderPrefix + String(index + 1).padStart(3, '0') + '.jpg';
    }
    function load(index) {
      var img = frames[index];
      if (img && !img.getAttribute('src')) img.src = srcFor(index);
    }
    function evictOutsideWindow(centerIndex, windowSize) {
      var lo = centerIndex - windowSize, hi = centerIndex + windowSize;
      for (var i = 0; i < frames.length; i++) {
        if (i < lo || i > hi) {
          if (frames[i].getAttribute('src')) frames[i].removeAttribute('src');
        } else load(i);
      }
    }
    function loadRemainingIdle(fromIndex) {
      var nextIndex = fromIndex;
      function step(deadline) {
        var processed = 0;
        while (nextIndex < frames.length && (deadline.timeRemaining() > 0 || processed < 2)) {
          load(nextIndex); nextIndex++; processed++;
        }
        if (nextIndex < frames.length) requestIdle(step);
      }
      requestIdle(step);
    }
    return { frames: frames, load: load, evictOutsideWindow: evictOutsideWindow, loadRemainingIdle: loadRemainingIdle };
  }

  function initHero() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var frameSet = heroFrameSet || buildFrameArray('photos/vr/frame-', HERO_FRAME_COUNT);
    var frames = frameSet.frames;
    var currentFrame = 0;
    frameSet.loadRemainingIdle(HERO_CRITICAL_COUNT);

    function resizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrame);
    }
    function drawFrame(index) {
      var img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      var cw = canvas.clientWidth, ch = canvas.clientHeight;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale, dh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    var waitForFirst = setInterval(function () {
      if (frames[0] && frames[0].complete) { clearInterval(waitForFirst); drawFrame(0); }
    }, 50);

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero__tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      .fromTo('.hero__line', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, 0.5)
      .fromTo('.hero__sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.0)
      .fromTo('.hero .btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)
      .fromTo('.hero__scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.6);

    ScrollTrigger.create({
      trigger: '.hero', start: 'top top', end: 'bottom bottom',
      pin: '.hero__pin', pinSpacing: false,
    });

    var frameObj = { frame: 0 };
    gsap.to(frameObj, {
      frame: HERO_FRAME_COUNT - 1, ease: 'none', snap: 'frame',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: true },
      onUpdate: function () {
        var idx = Math.round(frameObj.frame);
        if (idx !== currentFrame) {
          currentFrame = idx; drawFrame(currentFrame);
          frameSet.evictOutsideWindow(currentFrame, FRAME_EVICT_WINDOW);
        }
      },
    });

    gsap.fromTo('.hero__overlay',
      { background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.8) 100%)' },
      { background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.4) 100%)',
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true } }
    );

    gsap.to('.hero__content', {
      y: -120, opacity: 0, scale: 0.92, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '5% top', end: '18% top', scrub: true },
    });

    gsap.to('.hero__scroll-indicator', {
      opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '2% top', end: '8% top', scrub: true },
    });
  }

  function initVideoTransition() {
    var section = document.querySelector('.video-transition');
    if (!section) return;
    var canvas = document.getElementById('vtCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    vtFrameSet = buildFrameArray('photos/vt/frame-', VT_FRAME_COUNT);
    var vtFrames = vtFrameSet.frames;
    var vtCurrentFrame = 0;
    var vtCriticalCount = Math.min(VT_CRITICAL_COUNT, VT_FRAME_COUNT);
    for (var i = 0; i < vtCriticalCount; i++) vtFrameSet.load(i);
    vtFrameSet.loadRemainingIdle(vtCriticalCount);

    function resizeVtCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawVtFrame(vtCurrentFrame);
    }
    function drawVtFrame(index) {
      if (index < 0 || index >= vtFrames.length) return;
      var img = vtFrames[index];
      if (!img.complete || !img.naturalWidth) return;
      var cw = canvas.clientWidth, ch = canvas.clientHeight;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale, dh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      vtCurrentFrame = index;
    }
    window.addEventListener('resize', resizeVtCanvas);
    resizeVtCanvas();
    var waitForVtFirst = setInterval(function () {
      if (vtFrames[0] && vtFrames[0].complete) { clearInterval(waitForVtFirst); drawVtFrame(0); }
    }, 50);

    var vtScrub = { frame: 0 };
    gsap.to(vtScrub, {
      frame: VT_FRAME_COUNT - 1, snap: 'frame', ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      onUpdate: function () {
        var idx = Math.round(vtScrub.frame);
        drawVtFrame(idx);
        vtFrameSet.evictOutsideWindow(idx, FRAME_EVICT_WINDOW);
      },
    });

    var isLowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    var tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.8, pin: '.video-transition__inner' },
    });
    tl.fromTo('.video-transition__frame',
      { clipPath: 'inset(30% 25% 30% 25% round 20px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'none' }, 0);
    if (!isLowEnd) {
      tl.fromTo('#vtCanvas', { scale: 1.3 }, { scale: 1, duration: 1, ease: 'none' }, 0);
    }
    tl.to('.video-transition__overlay', { opacity: 0.15, duration: 0.6, ease: 'none' }, 0.3)
      .fromTo('.vt-word', { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out' }, 0.35)
      .fromTo('.vt-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15, stagger: 0.08, ease: 'back.out(3)' }, 0.4)
      .to(['.vt-word', '.vt-dot'], { opacity: 0, y: -30, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, 0.75)
      .to('.video-transition__frame', { clipPath: 'inset(5% 5% 5% 5% round 12px)', duration: 0.25, ease: 'none' }, 0.8)
      .to('.video-transition__overlay', { opacity: 0.7, duration: 0.2, ease: 'none' }, 0.8);
  }

  function initIntro() {
    var introImg = document.querySelector('.intro__video');
    if (introImg) {
      gsap.fromTo(introImg, { opacity: 0.3 },
        { opacity: 0.6, ease: 'none',
          scrollTrigger: { trigger: '.intro', start: 'top 60%', end: 'bottom 40%', scrub: true } });
    }
    gsap.fromTo('.intro__label', { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.intro__label', start: 'top 85%' } });
    var introHeading = document.querySelector('.intro__heading');
    if (introHeading) {
      splitTextIntoSpans(introHeading);
      var words = introHeading.querySelectorAll('.word');
      gsap.fromTo(words, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: introHeading, start: 'top 80%' } });
    }
    gsap.utils.toArray('.intro__col').forEach(function (col, i) {
      gsap.fromTo(col, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: col, start: 'top 85%' } });
    });
    gsap.utils.toArray('.stat').forEach(function (stat, i) {
      gsap.fromTo(stat, { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.intro__stats', start: 'top 85%' } });
    });
  }

  function initServices() {
    var items = gsap.utils.toArray('.service-item');
    var numberEl = document.querySelector('.services__number');
    items.forEach(function (item, i) {
      ScrollTrigger.create({
        trigger: item, start: 'top 70%', end: 'bottom 30%',
        onEnter: function () { activate(item, i); },
        onEnterBack: function () { activate(item, i); },
        onLeave: function () { deactivate(item); },
        onLeaveBack: function () { deactivate(item); },
      });
    });
    function activate(item, index) {
      item.classList.add('is-active');
      if (numberEl) numberEl.textContent = String(index + 1).padStart(2, '0');
    }
    function deactivate(item) { item.classList.remove('is-active'); }
  }

  function initGallery() {
    var track = document.querySelector('.gallery-track');
    if (!track) return;
    gsap.to(track, {
      xPercent: -55, ease: 'none',
      scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  }

  function initCinematic() {
    var section = document.querySelector('.cinematic');
    if (!section) return;
    var countEl = section.querySelector('.cinematic__count');
    var lines = section.querySelectorAll('.cin-line');
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6, pin: '.cinematic__sticky',
        onUpdate: function (self) {
          if (countEl) countEl.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
        },
      },
    });
    tl.fromTo('.cinematic__counter', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
      .fromTo('.cinematic__video-frame',
        { clipPath: 'inset(48% 40% 48% 40% round 8px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6, ease: 'none' }, 0)
      .fromTo('.cinematic__img', { scale: 1.6 }, { scale: 1, duration: 0.6, ease: 'none' }, 0)
      .fromTo(lines, { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.2, stagger: 0.06, ease: 'power3.out' }, 0.45)
      .to(lines, { y: -40, opacity: 0, duration: 0.15, stagger: 0.03, ease: 'power2.in' }, 0.8)
      .to('.cinematic__video-frame', { clipPath: 'inset(10% 10% 10% 10% round 16px)', duration: 0.2, ease: 'none' }, 0.85)
      .to('.cinematic__counter', { opacity: 0, duration: 0.1 }, 0.9);
  }

  function initContact() {
    gsap.fromTo('.contact__label', { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '.contact__label', start: 'top 85%' } });
    var contactHeading = document.querySelector('.contact__heading');
    if (contactHeading) {
      splitTextIntoSpans(contactHeading);
      var words = contactHeading.querySelectorAll('.word');
      gsap.fromTo(words, { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: contactHeading, start: 'top 80%' } });
    }
    gsap.fromTo('.contact__email', { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__email', start: 'top 85%' } });
    gsap.utils.toArray('.contact .reveal-up').forEach(function (el, i) {
      gsap.fromTo(el, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
  }

  function splitTextIntoSpans(element) {
    var html = element.innerHTML;
    var fragments = html.split(/(<[^>]+>)/);
    var result = '';
    fragments.forEach(function (fragment) {
      if (fragment.startsWith('<')) result += fragment;
      else {
        fragment.split(/(\s+)/).forEach(function (word) {
          if (word.trim()) result += '<span class="word" style="display:inline-block">' + word + '</span>';
          else result += word;
        });
      }
    });
    element.innerHTML = result;
    element.style.opacity = '1';
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' });
      });
    });
  }

  function initPreloader(onComplete) {
    var preloader = document.getElementById('preloader');
    var bar = document.getElementById('preloaderBar');
    var pctEl = document.getElementById('preloaderPct');
    if (!preloader) { onComplete(); return; }
    document.body.classList.add('is-loading');
    var loaded = 0, total = 0, displayPct = 0, targetPct = 0, rafId;
    var resources = [];
    heroFrameSet = buildFrameArray('photos/vr/frame-', HERO_FRAME_COUNT);
    var criticalCount = Math.min(HERO_CRITICAL_COUNT, HERO_FRAME_COUNT);
    for (var i = 0; i < criticalCount; i++) {
      heroFrameSet.load(i); total++;
      resources.push({ type: 'image', el: heroFrameSet.frames[i] });
    }
    document.querySelectorAll('img[src]').forEach(function (img) {
      total++; resources.push({ type: 'image', el: img });
    });
    if (document.fonts && document.fonts.ready) {
      total++; resources.push({ type: 'fonts' });
    }
    if (total === 0) total = 1;
    function tick() { targetPct = Math.min(Math.round((loaded / total) * 100), 100); }
    function markLoaded() { loaded++; tick(); }
    resources.forEach(function (r) {
      if (r.type === 'image') {
        var img = r.el;
        if (img.complete && img.naturalWidth > 0) markLoaded();
        else {
          img.addEventListener('load', markLoaded, { once: true });
          img.addEventListener('error', markLoaded, { once: true });
        }
      } else if (r.type === 'fonts') document.fonts.ready.then(markLoaded);
    });
    function animateCounter() {
      displayPct += (targetPct - displayPct) * 0.15;
      var rounded = Math.round(displayPct);
      pctEl.textContent = rounded;
      bar.style.width = rounded + '%';
      if (rounded >= 100 && targetPct >= 100) {
        cancelAnimationFrame(rafId);
        pctEl.textContent = '100';
        bar.style.width = '100%';
        setTimeout(revealSite, 400);
        return;
      }
      rafId = requestAnimationFrame(animateCounter);
    }
    rafId = requestAnimationFrame(animateCounter);
    var maxWait = setTimeout(function () { targetPct = 100; loaded = total; }, 12000);
    function revealSite() {
      clearTimeout(maxWait);
      document.body.classList.remove('is-loading');
      var tlOut = gsap.timeline({
        onComplete: function () { preloader.remove(); onComplete(); },
      });
      tlOut
        .to('.preloader__counter', { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
        .to('.preloader__bar-wrap', { scaleX: 0, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.1)
        .to('.preloader__logo', { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.15)
        .to(preloader, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, 0.4);
    }
  }

  /* ---------- Supabase: komentar & kontak (skema sama dengan situs lama) ---------- */
  function supaHeaders() {
    return {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
    };
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function loadComments() {
    var box = document.getElementById('commentList');
    if (!box) return;
    if (!SUPABASE_ANON_KEY) {
      box.innerHTML = '<p class="form-msg">Komentar diaktifkan saat situs ini tayang (butuh kunci Supabase).</p>';
      return;
    }
    fetch(SUPABASE_URL + '/functions/v1/comments?limit=20', { headers: supaHeaders() })
      .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, d: d }; }); })
      .then(function (r) {
        if (!r.ok) throw new Error((r.d && r.d.error) || 'Gagal memuat komentar.');
        if (!r.d.comments || !r.d.comments.length) {
          box.innerHTML = '<p class="form-msg">Belum ada komentar. Jadilah yang pertama.</p>';
          return;
        }
        box.innerHTML = r.d.comments.map(function (c) {
          return '<div class="comment-item"><b>' + esc(c.name) + '</b><p>' + esc(c.message) + '</p></div>';
        }).join('');
      })
      .catch(function (e) {
        box.innerHTML = '<p class="form-msg">Komentar belum bisa dimuat: ' + esc(e.message) + '</p>';
      });
  }
  function wireForm(formId, msgId, buildBody, endpoint, okText) {
    var form = document.getElementById(formId);
    if (!form) return;
    var msg = document.getElementById(msgId);
    if (!SUPABASE_ANON_KEY) {
      form.querySelectorAll('input,textarea,button').forEach(function (el) { el.disabled = true; });
      if (msg) msg.textContent = 'Form aktif setelah situs tayang (kunci Supabase belum diisi). Sementara itu, hubungi via WhatsApp.';
      return;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var body = buildBody(fd);
      body.website = '';
      body.startedAt = PAGE_STARTED_AT;
      if (msg) msg.textContent = 'Mengirim…';
      fetch(SUPABASE_URL + endpoint, { method: 'POST', headers: supaHeaders(), body: JSON.stringify(body) })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (d) { return { ok: res.ok, d: d }; }); })
        .then(function (r) {
          if (!r.ok) throw new Error((r.d && r.d.error) || 'Gagal mengirim.');
          if (msg) msg.textContent = okText;
          form.reset();
          if (formId === 'commentForm') loadComments();
        })
        .catch(function (err) { if (msg) msg.textContent = 'Gagal: ' + err.message; });
    });
  }
  function initForms() {
    loadComments();
    wireForm('contactForm', 'contactMsg', function (fd) {
      return { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };
    }, '/functions/v1/contact', 'Pesan terkirim. Saya balas secepatnya lewat email/WhatsApp.');
    wireForm('commentForm', 'commentMsg', function (fd) {
      return { name: fd.get('name'), message: fd.get('comment') };
    }, '/functions/v1/comments', 'Komentar terkirim.');
    var note = document.getElementById('supabaseNote');
    if (note && !SUPABASE_ANON_KEY) {
      note.textContent = 'Catatan draft: form pesan & komentar memakai Supabase Functions yang sama dengan situs lama, dan akan aktif begitu kunci anon diisi saat publish.';
    }
  }

  function init() {
    initPreloader(function () {
      initHero();
      initVideoTransition();
      initIntro();
      initServices();
      initGallery();
      initCinematic();
      initContact();
      initForms();
      requestIdle(function () { initSmoothAnchors(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
