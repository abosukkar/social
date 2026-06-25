/* NAVBAR */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

  /* MOBILE MENU */
  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobileMenu').classList.toggle('open'));
  function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

  /* SCROLL REVEAL */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* FILTER */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.product-card').forEach(c => {
        c.style.display = (f === 'all' || c.dataset.category === f) ? 'flex' : 'none';
      });
    });
  });

  /* CARD SLIDERS */
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const slides    = slider.querySelector('.card-slides');
    const allSlides = slider.querySelectorAll('.card-slide');
    const prevBtn   = slider.querySelector('.card-arrow.prev');
    const nextBtn   = slider.querySelector('.card-arrow.next');
    const dotsWrap  = slider.querySelector('.card-dots');
    const curEl     = slider.querySelector('.cur');
    const totEl     = slider.querySelector('.tot');
    const total     = allSlides.length;
    let current     = 0;

    totEl.textContent = total;

    /* Build dots — max 20 visible dots */
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'card-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
    const dots = dotsWrap.querySelectorAll('.card-dot');

    function goTo(n) {
      current = Math.max(0, Math.min(n, total - 1));
      slides.style.transform = `translateX(${current * 100}%)`;
      curEl.textContent = current + 1;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });

    /* Touch swipe */
    let tx = 0;
    slider.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    });

    goTo(0);
  });