(function() {
  var WEB3FORMS_KEY = '33f74391-7271-4a62-9c4c-fbb792761be8';
  var WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  var FORMSUBMIT_URL = 'https://formsubmit.co/ajax/nqdefenceveteransgc@gmail.com';
  var FETCH_TIMEOUT_MS = 20000;

  window.escapeHtml = function(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  function fetchWithTimeout(url, options, ms) {
    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, ms || FETCH_TIMEOUT_MS);
    return fetch(url, Object.assign({}, options, { signal: controller.signal }))
      .finally(function() { clearTimeout(timer); });
  }

  function isHoneypotTripped(form) {
    var honeypot = form.querySelector('[name="botcheck"]');
    return honeypot && honeypot.value.trim() !== '';
  }

  function buildPayload(form, options) {
    options = options || {};
    var data = { access_key: WEB3FORMS_KEY };
    if (options.subject) data.subject = options.subject;
    var lines = [];
    var fd = new FormData(form);
    fd.forEach(function(value, key) {
      if (key.charAt(0) === '_') return;
      if (key === 'botcheck') return;
      if (!value) return;
      data[key] = value;
      lines.push(key + ': ' + value);
    });
    if (data.Email && !data.email) data.email = data.Email;
    if (data['Full Name'] && !data.name) data.name = data['Full Name'];
    if (data.Name && !data.name) data.name = data.Name;
    if (!data.message && lines.length) data.message = lines.join('\n');
    return { data: data, formData: fd };
  }

  function submitFormSubmit(fd, subject) {
    if (subject) fd.append('_subject', subject);
    fd.append('_template', 'table');
    return fetchWithTimeout(FORMSUBMIT_URL, {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    }).then(function(r) {
      if (!r.ok) throw new Error('FormSubmit failed');
      return r.json().catch(function() { return { success: true }; });
    });
  }

  function submitWeb3Forms(data) {
    return fetchWithTimeout(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function(r) { return r.json(); }).then(function(res) {
      if (!res.success) throw new Error(res.message || 'Web3Forms failed');
      return res;
    });
  }

  window.web3formsSubmit = function(form, options) {
    if (isHoneypotTripped(form)) {
      return Promise.reject(new Error('Invalid submission'));
    }
    var payload = buildPayload(form, options);
    return submitWeb3Forms(payload.data).catch(function() {
      return submitFormSubmit(payload.formData, options.subject);
    });
  };
})();

document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var n = (document.getElementById('cName') || {}).value || '';
      var em = (document.getElementById('cEmail') || {}).value || '';
      n = n.trim(); em = em.trim();
      var msg = document.getElementById('formMsg');
      if (!n || !em) {
        msg.style.display = 'block'; msg.style.color = '#8b2020';
        msg.textContent = 'Please fill in your name and email.'; return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        msg.style.display = 'block'; msg.style.color = '#8b2020';
        msg.textContent = 'Please enter a valid email address.'; return;
      }
      var btn = this.querySelector('.f-submit');
      var origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      msg.style.display = 'block';
      msg.style.color = '#555';
      msg.textContent = 'Sending — please wait...';
      web3formsSubmit(this, { subject: 'New Contact Enquiry — NQDVGC Website' })
        .then(function() {
          msg.style.display = 'block'; msg.style.color = '#4a5d3a';
          msg.textContent = '\u2713 Thanks ' + n + '! We\'ll be in touch shortly.';
          form.reset();
        })
        .catch(function() {
          msg.style.display = 'block'; msg.style.color = '#8b2020';
          msg.textContent = 'Something went wrong. Please try emailing us directly at nqdefenceveteransgc@gmail.com';
        })
        .finally(function() { btn.textContent = origText; btn.disabled = false; });
    });
  }

  // ---- Event Registration Modal ----
  const modal = document.getElementById('regModal');
  const modalEventName = document.getElementById('regEventName');
  const modalEventInput = document.getElementById('regEventField');
  const regForm = document.getElementById('regForm');
  const regMsg = document.getElementById('regMsg');

  // Open modal when "Register" buttons are clicked
  document.querySelectorAll('.ev-register').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      if (modalEventName) modalEventName.textContent = eventName;
      if (modalEventInput) modalEventInput.value = eventName;
      if (regMsg) { regMsg.style.display = 'none'; regMsg.textContent = ''; }
      if (regForm) regForm.reset();
      if (modalEventInput) modalEventInput.value = eventName;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  const closeBtn = document.getElementById('regClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Registration form submission
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('#regName').value.trim();
      const email = this.querySelector('#regEmail').value.trim();

      if (!name || !email) {
        regMsg.style.display = 'block'; regMsg.style.color = '#8b2020';
        regMsg.textContent = 'Please fill in your name and email.'; return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        regMsg.style.display = 'block'; regMsg.style.color = '#8b2020';
        regMsg.textContent = 'Please enter a valid email address.'; return;
      }

      const submitBtn = this.querySelector('.modal-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      regMsg.style.display = 'block';
      regMsg.style.color = '#555';
      regMsg.textContent = 'Sending — please wait...';

      web3formsSubmit(this, { subject: 'New Event Registration — NQDVGC' })
      .then(() => {
        regMsg.style.display = 'block';
        regMsg.style.color = '#4a5d3a';
        regMsg.textContent = '\u2713 Thanks ' + name + '! You\'re registered. We\'ll be in touch with details.';
        this.reset();
        if (modalEventInput) modalEventInput.value = modalEventName.textContent;
      })
      .catch(() => {
        regMsg.style.display = 'block';
        regMsg.style.color = '#8b2020';
        regMsg.textContent = 'Something went wrong. Please try again or contact us directly at nqdefenceveteransgc@gmail.com';
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // Single "Add to Calendar" button per event, device-aware so it actually
  // lands in the user's calendar with one tap:
  //   iOS    -> webcal:// link (forces Apple Calendar to open; a plain https
  //             .ics just downloads to Files on iOS 13+).
  //   macOS  -> hosted .ics file (Safari opens Calendar cleanly).
  //   other  -> Google Calendar template URL.
  // The slug()/filename logic MUST stay in sync with _scripts/generate-ics.js.
  (function() {
    var cards = document.querySelectorAll('.ev-card[data-date]');
    if (!cards.length) return;

    var ua = navigator.userAgent || '';
    var isIOS = /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isMac = !isIOS && /Macintosh/.test(ua);

    // Directory the site is served from (handles custom domain and project pages).
    var baseDir = location.pathname.replace(/[^/]*$/, '');
    // Canonical apex host — iOS calendar subscription won't follow the www->apex
    // 301 redirect, so the webcal link must point straight at the apex domain.
    var icsHost = (location.host && location.host.indexOf('github.io') === -1)
      ? 'nqdefenceveteransgolf.com.au'
      : location.host;

    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function ymd(dateStr, addDays) {
      var p = dateStr.split('-');
      var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
      if (addDays) d.setUTCDate(d.getUTCDate() + addDays);
      return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
    }
    function slug(s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'event';
    }
    var calIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 7v10H5V9h14z"/></svg>';

    cards.forEach(function(card) {
      var actions = card.querySelector('.ev-actions');
      var dateStr = card.getAttribute('data-date');
      if (!actions || !dateStr) return;

      var titleEl = card.querySelector('h3');
      var title = titleEl ? titleEl.textContent.trim() : 'NQDVGC Event';
      var descEl = card.querySelector('.ev-body > p');
      var desc = descEl ? descEl.textContent.trim() : '';
      var metaSpan = card.querySelector('.ev-meta span');
      var location = metaSpan ? metaSpan.textContent.replace(/[^\x20-\x7E]/g, '').trim() : 'Tropics Golf Course';
      var summary = title + ' \u2014 NQDVGC';
      var icsPath = baseDir + 'events/' + slug(title) + '-' + dateStr + '.ics';

      var a = document.createElement('a');
      a.className = 'ev-cal';
      a.innerHTML = calIcon + 'Add to Calendar';

      if (isIOS) {
        a.href = 'webcal://' + icsHost + icsPath;
      } else if (isMac) {
        a.href = icsPath;
      } else {
        a.target = '_blank';
        a.rel = 'noopener';
        a.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
          '&text=' + encodeURIComponent(summary) +
          '&dates=' + ymd(dateStr) + '/' + ymd(dateStr, 1) +
          '&details=' + encodeURIComponent(desc) +
          '&location=' + encodeURIComponent(location);
      }

      actions.appendChild(a);
    });
  })();

  // Back to top button
  var btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '&#8593;';
  document.body.appendChild(btt);
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) btt.classList.add('visible');
    else btt.classList.remove('visible');
  }, { passive: true });
  btt.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Auto-hide past events
  (function() {
    var today = new Date();
    today.setHours(23, 59, 59, 999);
    var todayStr = today.toISOString().slice(0, 10);

    document.querySelectorAll('[data-date]').forEach(function(el) {
      var d = el.getAttribute('data-date');
      if (d < todayStr) el.style.display = 'none';
    });

    var visibleCards = [];
    document.querySelectorAll('.ev-card[data-date]').forEach(function(el) {
      if (el.style.display !== 'none') visibleCards.push(el);
    });
    for (var i = 5; i < visibleCards.length; i++) {
      visibleCards[i].style.display = 'none';
    }

    document.querySelectorAll('.schedule-month').forEach(function(heading) {
      var table = heading.nextElementSibling;
      if (!table || !table.classList.contains('schedule-table')) return;
      var visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])');
      if (visibleRows.length === 0) {
        heading.style.display = 'none';
        table.style.display = 'none';
      }
    });
  })();

  // Smooth scroll for anchor links on same page
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

});
