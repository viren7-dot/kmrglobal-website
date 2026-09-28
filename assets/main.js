/* KMR Global - site scripts */

const WEB3FORMS_KEY = "434ab3c4-0db3-4d9e-999a-ac6d67910cdd";
const CONTACT_EMAIL = "info@kmrglobal.co.uk";

/* Mobile menu */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
    var open = menu.classList.contains('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* Forms -> Web3Forms. Field names derive from each label. */
(function () {
  var form = document.querySelector('#trade-form');
  if (!form) return;

  var successEl = form.querySelector('.form-success');
  var submitBtn = form.querySelector('[type="submit"]');
  var originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

  var honey = document.createElement('input');
  honey.type = 'checkbox';
  honey.name = 'botcheck';
  honey.style.display = 'none';
  honey.setAttribute('aria-hidden', 'true');
  honey.tabIndex = -1;
  form.appendChild(honey);

  function labelFor(el) {
    var wrap = el.closest('.form-field');
    var lbl = wrap && wrap.querySelector('label');
    if (lbl) return lbl.textContent.replace(/\*/g, '').trim();
    return el.placeholder || el.type || 'Field';
  }

  function fields() {
    return form.querySelectorAll('input:not([type=submit]):not([name=botcheck]), select, textarea');
  }

  function showMessage(text, isError) {
    if (!successEl) return;
    successEl.textContent = text;
    successEl.style.borderLeftColor = isError ? '#C0392B' : '';
    successEl.classList.add('visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (honey.checked) return;

    var ok = true, firstBad = null;
    form.querySelectorAll('[required]').forEach(function (el) {
      if (!el.value.trim()) {
        el.style.borderColor = '#7FB0A8';
        if (!firstBad) firstBad = el;
        ok = false;
      } else { el.style.borderColor = ''; }
    });
    if (!ok) { if (firstBad) firstBad.focus(); return; }

    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'Website enquiry - ' + document.title.split('-')[0].trim(),
      from_name: 'KMR Global website'
    };

    fields().forEach(function (el) {
      var value = (el.value || '').trim();
      if (!value) return;
      var key = labelFor(el);
      payload[key] = value;
      if (el.type === 'email') payload.email = value;
      if (/^(your name|contact name|name)$/i.test(key)) payload.name = value;
    });

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.success) throw new Error(data.message || 'Submission failed');
        showMessage('Thanks - your enquiry has been received. Our team will review it and be in touch shortly.', false);
        fields().forEach(function (el) { el.value = ''; });
        if (submitBtn) submitBtn.textContent = 'Sent';
      })
      .catch(function () {
        showMessage('Sorry - we could not send that. Please email us directly at ' + CONTACT_EMAIL + ' and we will pick it up right away.', true);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
      });
  });
})();

/* Brand banner is a pure-CSS marquee - no JS needed */

/* Reveal on scroll */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || '0') + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();