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
      var formData = new FormData(this);
      fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
        .then(function(r) {
          if (r.ok) {
            msg.style.display = 'block'; msg.style.color = '#4a5d3a';
            msg.textContent = '\u2713 Thanks ' + n + '! We\'ll be in touch shortly.';
            form.reset();
          } else { throw new Error('Failed'); }
        })
        .catch(function() {
          msg.style.display = 'block'; msg.style.color = '#8b2020';
          msg.textContent = 'Something went wrong. Please try emailing us directly at info@nqdefenceveteransgolf.org.au';
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

      // Submit via FormSubmit.co
      const formData = new FormData(this);
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          regMsg.style.display = 'block';
          regMsg.style.color = '#4a5d3a';
          regMsg.textContent = '\u2713 Thanks ' + name + '! You\'re registered. We\'ll be in touch with details.';
          this.reset();
          if (modalEventInput) modalEventInput.value = modalEventName.textContent;
        } else {
          throw new Error('Failed');
        }
      })
      .catch(() => {
        regMsg.style.display = 'block';
        regMsg.style.color = '#8b2020';
        regMsg.textContent = 'Something went wrong. Please try again or contact us directly at info@nqdefenceveteransgolf.org.au';
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

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
