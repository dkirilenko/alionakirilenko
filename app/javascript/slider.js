document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector('.slider-viewport');
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const pagination = document.querySelector('.pagination');

  // Modal elements
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImage');
  const backdrop = modal.querySelector('.cert-modal-backdrop');
  const modalContent = modal.querySelector('.cert-modal-content');

  const slideGap = 32;
  const openModalTimeout = 100;

  let dragTimer = 0;
  let slideWidth;
  let position = 0;
  let velocity = 1;       // auto-scroll speed
  let prevVelocity = velocity;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let isVisible = false;
  let animationId = null;

  // Duplicate slides for infinite loop
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  const allSlides = Array.from(track.children);

  function updateSizes() {
    slideWidth = slides[0].offsetWidth + slideGap;
  }

  updateSizes();
  window.addEventListener('resize', updateSizes);

  // Pagination
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'pagination-dot';
    dot.onclick = () => {
      velocity = 1;
      position = i * slideWidth;
    };
    pagination.appendChild(dot);
  });

  const dots = document.querySelectorAll('.pagination-dot');

  // Drag handling
  const mouseDownFn = (e) => {
    isDragging = true;
    const pageX = e.pageX || e.touches[0].pageX;
    startX = pageX;
    lastX = pageX;
    velocity = 0;
    dragTimer = Date.now();

    console.log('DOWNMOUSE');

  }

  viewport.addEventListener('mousedown', mouseDownFn)
  viewport.addEventListener('touchstart', mouseDownFn)


  const mouseMoveFn = (e) => {
    if (!isDragging) return;

    const pageX = e.pageX || e.touches[0].pageX;
    const delta = pageX - lastX;
    console.log('delta', delta);
    position -= delta;
    lastX = pageX;
    prevVelocity = velocity;

    console.log('MOVEMOUSE');
  }

  viewport.addEventListener('mousemove', mouseMoveFn);
  viewport.addEventListener('touchmove', mouseMoveFn);

  const mouseUpFn = (e) => {
    if (Date.now() - dragTimer < openModalTimeout) {
      const slide = e.target.closest('.slide img');
      if (!slide) return;

      openModal(slide.src);
    } else {
      velocity = 1 //(startX - (e.pageX || e.changedTouches[0].pageX)) * 0.02;
    }

    console.log('UPMOUSE');
    if (!isDragging) return;

    isDragging = false;
  }

  viewport.addEventListener('mouseup', mouseUpFn);
  viewport.addEventListener('touchend', mouseUpFn);


  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }



  // Animation loop
  function animate() {
    if (!isDragging) {
      position += velocity;
    }

    // Infinite wrap
    if (position >= slideWidth * slides.length) {
      position -= slideWidth * slides.length;
    }

    track.style.transform = `translateX(${-position}px)`;

    // Active pagination
    const activeIndex = Math.round(position / slideWidth) % slides.length;
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));

    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!animationId) {
      animationId = requestAnimationFrame(animate);
    }
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
    velocity = 1;
  }

  backdrop.addEventListener('click', closeModal);
  modalContent.addEventListener('click', closeModal);
  document.querySelector('.close-modal-icon').addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('.education-block img').forEach(img => {
    img.addEventListener('click', () => { openModal(img.src); });
  })



  const sliderSection = document.querySelector('.cert-slider');

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startAnimation();
      else stopAnimation();
    },
    {
      threshold: 0.25 // start when 25% of slider is visible
    }
  );

  observer.observe(sliderSection);


});
