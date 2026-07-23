// Mobile menu toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const open = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }
})();

// Trade inquiry form (front-end demo; wire to your backend / mailer)
(function () {
  const form = document.querySelector('#trade-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.querySelector('.form-success');
    // Basic validation
    const required = form.querySelectorAll('[required]');
    let ok = true;
    required.forEach(el => {
      if (!el.value.trim()) { el.style.borderColor = '#B8846A'; ok = false; }
      else { el.style.borderColor = ''; }
    });
    if (!ok) return;
    // Show success state — replace with real POST to your endpoint
    if (success) success.classList.add('visible');
    form.querySelectorAll('input, select, textarea').forEach(el => { el.value = ''; });
  });
})();

// Brand banner is a pure-CSS marquee — no JS needed

// Simple reveal on scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.delay || '0') + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();
