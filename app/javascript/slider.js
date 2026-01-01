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
  viewport.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX;
    lastX = e.pageX;
    velocity = 0;
    dragTimer = Date.now();

    console.log('MOUSEDOWN');
  });

  viewport.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const delta = e.pageX - lastX;
    position -= delta;
    lastX = e.pageX;
    prevVelocity = velocity;

    console.log('MOVEMOVE');
  });

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  viewport.addEventListener('mouseup', e => {
    if (Date.now() - dragTimer < openModalTimeout) {
      const slide = e.target.closest('.slide img');
      if (!slide) return;

      openModal(slide.src);
    } else {
      velocity = 1 //(startX - e.pageX) * 0.02;
    }

    console.log('UPMOUSE');
    if (!isDragging) return;
    isDragging = false;
  });

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

    requestAnimationFrame(animate);
  }

  animate();


  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
    velocity = 1;
  }

  backdrop.addEventListener('click', closeModal);
  modalContent.addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('.education-block img').forEach(img => {
    img.addEventListener('click', () => { openModal(img.src); });
  })


});
