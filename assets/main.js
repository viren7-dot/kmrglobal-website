/* ===================================================================
   KMR Global — site scripts
   =================================================================== */

/* Web3Forms access key.
   Get a free key at https://web3forms.com (enter info@kmrglobal.co.uk,
   they email the key instantly). Paste it below between the quotes. */
const WEB3FORMS_KEY = "434ab3c4-0db3-4d9e-999a-ac6d67910cdd";

const CONTACT_EMAIL = "info@kmrglobal.co.uk";


/* ---------- Mobile menu toggle ---------- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

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
})();


/* ---------- Forms → Web3Forms ----------
   Field names are derived from each field's <label> text, so the email
   you receive reads "Company Name: Acme Ltd" rather than "field_1: Acme Ltd".
   Works for the trade application, brand enquiry and contact forms.        */
(function () {
  const form = document.querySelector('#trade-form');
  if (!form) return;

  const successEl = form.querySelector('.form-success');
  const submitBtn = form.querySelector('[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

  // Honeypot — bots fill this, humans never see it.
  const honey = document.createElement('input');
  honey.type = 'checkbox';
  honey.name = 'botcheck';
  honey.style.display = 'none';
  honey.setAttribute('aria-hidden', 'true');
  honey.tabIndex = -1;
  form.appendChild(honey);

  function labelFor(el) {
    const wrap = el.closest('.form-field');
    const lbl = wrap && wrap.querySelector('label');
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

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (honey.checked) return; // bot

    // Validate required fields
    let ok = true;
    let firstBad = null;
    form.querySelectorAll('[required]').forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#B8846A';
        if (!firstBad) firstBad = el;
        ok = false;
      } else {
        el.style.borderColor = '';
      }
    });
    if (!ok) {
      if (firstBad) firstBad.focus();
      return;
    }

    // Build a readable payload
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'Website enquiry — ' + document.title.split('—')[0].trim(),
      from_name: 'KMR Global website'
    };

    fields().forEach(el => {
      const value = (el.value || '').trim();
      if (!value) return;
      const key = labelFor(el);
      payload[key] = value;
      // Surface the sender's address to Web3Forms so replies work
      if (el.type === 'email') payload.email = value;
      if (/^(your name|contact name|name)$/i.test(key)) payload.name = value;
    });

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'WEB3FORMS_ACCESS_KEY_HERE') {
        throw new Error('Form is not configured yet.');
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || 'Submission failed');

      showMessage(
        'Thanks — your enquiry has been received. Our team will review it and be in touch shortly.',
        false
      );
      fields().forEach(el => { el.value = ''; });
      if (submitBtn) submitBtn.textContent = 'Sent ✓';

    } catch (err) {
      showMessage(
        'Sorry — we couldn’t send that. Please email us directly at ' + CONTACT_EMAIL + ' and we’ll pick it up right away.',
        true
      );
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
})();


/* ---------- Brand banner is a pure-CSS marquee — no JS needed ---------- */


/* ---------- Reveal on scroll ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || '0') + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();
