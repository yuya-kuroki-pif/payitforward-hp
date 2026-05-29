/* =========================================================
   Pay it Forward — main.js
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('is-hidden'), 700);
  });

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById('header');
  const pagetop = document.getElementById('pagetop');
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (pagetop) pagetop.classList.toggle('is-show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hamburger / Mobile Nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll Reveal ----------
     Mark candidate elements, then animate when in view. */
  const revealSelectors = [
    '.section__head',
    '.intro__copy',
    '.intro__text',
    '.intro__media',
    '.movie__wrap',
    '.phil-card',
    '.biz',
    '.shop',
    '.gal',
    '.num-card',
    '.recruit__hero',
    '.rec-card',
    '.company__row',
    '.contact__inner',
    // recruit subpage
    '.page-hero__inner',
    '.rec-message__copy',
    '.rec-message__media',
    '.reason',
    '.pay__group',
    '.case',
    '.req-row',
    '.flow-step',
    '.value-card',
    '.apply__inner',
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    // 同じ親に並ぶ要素には連番ディレイ
    const sibIdx = Array.from(el.parentElement?.children || []).indexOf(el);
    if (sibIdx > 0 && sibIdx < 5) el.setAttribute('data-reveal-delay', String(sibIdx));
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const start = performance.now();
    const startVal = 0;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(startVal + (target - startVal) * eased).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => co.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Smooth-scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Hero Slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow--prev');
  const nextBtn = document.querySelector('.hero-arrow--next');
  const heroEl = document.querySelector('.hero');

  if (slides.length > 1) {
    let activeIdx = 0;
    let timer = null;
    const INTERVAL = 5000;

    const show = (idx) => {
      const n = slides.length;
      const next = ((idx % n) + n) % n; // 負数も安全に
      slides.forEach((s, i) => s.classList.toggle('is-active', i === next));
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === next);
        d.setAttribute('aria-selected', String(i === next));
      });
      activeIdx = next;
    };

    const startAutoplay = () => {
      stopAutoplay();
      timer = setInterval(() => show(activeIdx + 1), INTERVAL);
    };
    const stopAutoplay = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    // ドットクリック
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { show(i); startAutoplay(); });
    });
    // 矢印
    if (prevBtn) prevBtn.addEventListener('click', () => { show(activeIdx - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { show(activeIdx + 1); startAutoplay(); });

    // ホバーで一時停止
    if (heroEl) {
      heroEl.addEventListener('mouseenter', stopAutoplay);
      heroEl.addEventListener('mouseleave', startAutoplay);
    }

    // タブ非表示時は止める（リソース節約）
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });

    // タッチスワイプ対応（簡易）
    if (heroEl) {
      let startX = null;
      heroEl.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      heroEl.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = (e.changedTouches[0].clientX - startX);
        if (Math.abs(dx) > 50) {
          show(activeIdx + (dx < 0 ? 1 : -1));
          startAutoplay();
        }
        startX = null;
      }, { passive: true });
    }

    // キーボード（矢印キー）対応
    document.addEventListener('keydown', (e) => {
      // ヒーローが画面内にあるときだけ反応
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === 'ArrowLeft')  { show(activeIdx - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { show(activeIdx + 1); startAutoplay(); }
    });

    startAutoplay();
  }
})();
