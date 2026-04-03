/* ══════════════════════════════════════════════════════════════
   BUILDMASTER CONSTRUCTION – MAIN SCRIPT
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── LOAD HEADER & FOOTER ──
  async function loadComponent(containerId, filePath) {
    try {
      const response = await fetch(filePath);
      const html = await response.text();
      document.getElementById(containerId).innerHTML = html;
    } catch (error) {
      console.warn(`Could not load ${filePath}`, error);
    }
  }

  // Wait for DOM to ensure headers/footers are loaded before initializing scripts
  function initializeApp() {
    initNavbar();
    initHamburger();
    initRevealOnScroll();
    initStatsCounter();
    initProjectModal();
    initTestimonialCarousel();
    initContactForm();
    initLoadMoreProjects();
  }

  // Expose initializeApp globally so it can be called after dynamic loading
  window.initializeApp = initializeApp;

  // ── NAV SCROLL ──
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const sections = document.querySelectorAll('section[id], #hero');
    const navLinks = document.querySelectorAll('.nav-link:not(.mobile-link)');

    let lastScrollTop = 0;

    function onScroll() {
      // sticky bg and scrolled style
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // hide on scroll down, show on scroll up
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop && currentScroll > 120) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

      // active link
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });

      // mobile menu links
      const mobileLinks = document.querySelectorAll('.mobile-link');
      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + current || (current === '' && href === '#hero'));
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── HAMBURGER ──
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburgerIcon.className = open ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburgerIcon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }

  // ── REVEAL ON SCROLL ──
  function initRevealOnScroll() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!revealEls.length) return;

    // Fallback for browsers where IntersectionObserver is unavailable or failed
    if (typeof IntersectionObserver === 'undefined') {
      revealEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    // In case there is a race and no intersection events fire, keep UI accessible
    window.setTimeout(() => {
      revealEls.forEach(el => {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible');
        }
      });
    }, 600);
  }

  // ── STATS COUNTER ──
  function initStatsCounter() {
    const statsArea = document.getElementById('stats-area');
    if (!statsArea) return;

    let statsDone = false;
    const statsData = [
      { id: 'stat-years',    target: 20,  suffix: '+' },
      { id: 'stat-projects', target: 350, suffix: '+' },
      { id: 'stat-clients',  target: 280, suffix: '+' },
    ];

    function animateCount(el, target, suffix, duration) {
      if (!el) return;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsDone) {
        statsDone = true;
        statsData.forEach(s => {
          const el = document.getElementById(s.id);
          animateCount(el, s.target, s.suffix, 2000);
        });
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsArea);
  }

  // ── PROJECT MODAL ──
  function initProjectModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');
    const modalCta = document.getElementById('modal-cta');

    function openModal(card) {
      modalImg.src = card.dataset.img;
      modalImg.alt = card.dataset.title;
      modalTitle.textContent = card.dataset.title;
      modalCategory.textContent = card.dataset.category;
      modalDesc.textContent = card.dataset.desc;
      overlay.classList.add('open');
      overlay.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    if (modalCta) modalCta.addEventListener('click', closeModal);
  }

  // ── TESTIMONIAL CAROUSEL ──
  function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 340 + 24; // card + gap

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  // ── CONTACT FORM ──
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    const errorText = document.getElementById('form-error-text');
    const submitBtn = form.querySelector('button[type="submit"]');

    const emailjsServiceId = 'service_fxz2iuv'; // replace with your EmailJS service ID
    const emailjsTemplateId = 'template_sfvkftb'; // replace with your EmailJS template ID

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(id, show) {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('show', show);
    }

    function setFieldError(input, hasError) {
      input.classList.toggle('error', hasError);
    }

    function showStatus(type, message) {
      if (type === 'success') {
        if (successMsg) successMsg.classList.remove('hidden');
        if (errorMsg) errorMsg.classList.add('hidden');
      } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (successMsg) successMsg.classList.add('hidden');
        if (errorText) errorText.textContent = message;
      }
    }

    function setSubmitState(isSending) {
      if (!submitBtn) return;
      submitBtn.disabled = isSending;
      submitBtn.innerHTML = isSending
        ? '<i class="fa-solid fa-spinner fa-spin"></i> Sending...'
        : '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      showStatus('idle', '');

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const projectType = document.getElementById('project-type');
      const message = document.getElementById('message');

      const nameOk = name && name.value.trim().length >= 2;
      const emailOk = email && validateEmail(email.value.trim());
      const phoneOk = phone && phone.value.trim().length >= 7;
      const messageOk = message && message.value.trim().length >= 10;

      if (name) setFieldError(name, !nameOk);
      if (email) setFieldError(email, !emailOk);
      if (phone) setFieldError(phone, !phoneOk);
      if (message) setFieldError(message, !messageOk);

      showError('err-name', !nameOk);
      showError('err-email', !emailOk);
      showError('err-phone', !phoneOk);
      showError('err-message', !messageOk);

      if (!nameOk || !emailOk || !phoneOk || !messageOk) {
        return;
      }

      const templateParams = {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        phone: phone.value.trim(),
        project_type: projectType ? projectType.value : '',
        message: message.value.trim(),
      };

      if (typeof emailjs === 'undefined' || !emailjs.send) {
        showStatus('error', 'Email service is unavailable. Please try again later.');
        return;
      }

      setSubmitState(true);

      emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
        .then(() => {
          form.reset();
          showStatus('success', '');
          if (successMsg) {
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        })
        .catch(error => {
          console.error('EmailJS error:', error);
          showStatus('error', 'Unable to send message. Please try again or contact us directly.');
        })
        .finally(() => {
          setSubmitState(false);
        });
    });

    // Clear errors on input
    ['name', 'email', 'phone', 'message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', function () {
          this.classList.remove('error');
          showError('err-' + id, false);
          if (errorMsg) errorMsg.classList.add('hidden');
        });
      }
    });
  }

  // ── LOAD MORE PROJECTS ──
  function initLoadMoreProjects() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const projectsGrid = document.querySelector('.grid');
    const projectsCount = document.getElementById('projects-count');

    if (!loadMoreBtn || !projectsGrid) return;

    const additionalProjects = [
      {
        title: 'Green Valley Eco-Resort',
        category: 'Ongoing',
        desc: 'Sustainable resort development with eco-friendly materials and renewable energy systems, currently in construction phase.',
        img: 'https://t3.ftcdn.net/jpg/03/23/69/52/360_F_323695209_ErM9qi3G6RbRRqroR0vj2B2IG0fzyCi2.jpg',
        delay: '0.05s'
      },
      {
        title: 'Metro Line Extension',
        category: 'Ongoing',
        desc: 'Urban rail expansion project connecting downtown areas with modern transit infrastructure, 60% complete.',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/050/625/119/small/construction-workers-standing-on-a-reinforced-concrete-slab-photo.jpeg',
        delay: '0.15s'
      },
      {
        title: 'Solar Farm Initiative',
        category: 'Ongoing',
        desc: 'Large-scale solar energy installation providing clean power to the grid, with advanced monitoring and maintenance systems.',
        img: 'https://cdn.prod.website-files.com/6526831553e9ac5aa0dedf46/652fb7de938b8807fb2ef19c_commercial%20solar%20panels.jpg',
        delay: '0.25s'
      }
    ];

    let loaded = false;

    loadMoreBtn.addEventListener('click', () => {
      if (loaded) return;
      loaded = true;

      additionalProjects.forEach(project => {
        const projectHTML = `
          <div class="project-card reveal" style="transition-delay:${project.delay}"
               role="button" tabindex="0" aria-label="${project.title} project"
               data-title="${project.title}" data-category="${project.category}" 
               data-desc="${project.desc}"
               data-img="${project.img}">
            <img src="${project.img}" alt="${project.title}" loading="lazy" />
            <div class="project-overlay">
              <div>
                <p class="font-display font-800 text-white text-xl uppercase leading-tight">${project.title}</p>
                <span class="font-body text-brand-amber text-sm font-500">${project.category}</span>
              </div>
              <i class="fa-solid fa-expand text-white/60 ml-auto text-lg"></i>
            </div>
          </div>
        `;
        projectsGrid.insertAdjacentHTML('beforeend', projectHTML);
      });

      // Update the count text
      projectsCount.textContent = 'Showing 12 of 350+ projects';

      // Re-initialize modal for new cards
      initProjectModal();

      // Trigger reveal for new cards
      const newCards = projectsGrid.querySelectorAll('.project-card.reveal:not(.visible)');
      newCards.forEach(card => {
        if (typeof IntersectionObserver !== 'undefined') {
          const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
              }
            });
          }, { threshold: 0.12 });
          revealObserver.observe(card);
        } else {
          card.classList.add('visible');
        }
      });

      // Hide the button after loading
      loadMoreBtn.style.display = 'none';
    });
  }

  // ── PROJECT FILTERING ──
  window.filterProjects = function(category) {
    const cards = document.querySelectorAll('.project-card');
    const btns = document.querySelectorAll('.filter-btn');

    if (category === 'all') {
      cards.forEach(card => card.style.display = '');
    } else {
      cards.forEach(card => {
        const cardCat = card.dataset.category.toLowerCase();
        card.style.display = cardCat === category.toLowerCase() ? '' : 'none';
      });
    }

    btns.forEach(btn => {
      btn.classList.toggle('active', (btn.dataset.filter || 'all') === category);
    });
  };

  // Initialize components when DOM is ready
  // Note: Now called manually after dynamic component loading
})();
