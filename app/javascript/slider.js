const OPEN_MODAL_TIMEOUT = 200;

document.addEventListener("DOMContentLoaded", () => {
  let position = 0;
  let currentSlideIndex = 0;
  let isVisible = false;

  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImage');
  const backdrop = modal.querySelector('.cert-modal-backdrop');
  const modalContent = modal.querySelector('.cert-modal-content');

  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const pagination = document.querySelector('.pagination');
  let intervalId = null;

  // Create pagination dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'pagination-dot';
    dot.onclick = () => {
      stopAutoSlide();
      goToSlide(i);
      startAutoSlide();
    };
    pagination.appendChild(dot);
    if (i === 0) { dot.classList.add('active'); }
  });

  const dots = document.querySelectorAll('.pagination-dot');

  const goToSlide = (index) => {
    // Ensure index is within bounds
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlideIndex = index;
    position = slides[index].offsetLeft;
    track.style.transform = `translateX(-${position}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  };

  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      track.style.transition = 'transform .5s ease-out';
      const nextIndex = (currentSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 2000);
  };

  const stopAutoSlide = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Drag handling variables
  let isDragging = false;
  let dragTimer = 0;
  let startX = 0;
  let lastX = 0;

  // Mouse/Touch down handler
  const mouseDownFn = (e) => {
    stopAutoSlide();
    isDragging = true;

    startX = e.pageX || e.touches[0].pageX;
    lastX = startX;
    dragTimer = Date.now();

    track.style.transition = 'none';
    e.preventDefault();
  };

  track.addEventListener('mousedown', mouseDownFn);
  track.addEventListener('touchstart', mouseDownFn, { passive: false });

  // Mouse/Touch move handler
  const mouseMoveFn = (e) => {
    if (!isDragging) return;

    const currentX = e.pageX || e.touches[0].pageX;
    const delta = currentX - startX;

    track.style.transform = `translateX(-${position - delta}px)`;
    lastX = currentX;

    e.preventDefault();
  };

  track.addEventListener('mousemove', mouseMoveFn);
  track.addEventListener('touchmove', mouseMoveFn, { passive: false });

  // Modal opening function
  const openModal = (src) => {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    stopAutoSlide();
  }


  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalImg.src = '';
    if (isVisible) { startAutoSlide() };
  }

  backdrop.addEventListener('click', closeModal);
  modalContent.addEventListener('click', closeModal);
  document.querySelector('.close-modal-icon').addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // Mouse/Touch up handler
  const mouseUpFn = (e) => {
    if (Date.now() - dragTimer < OPEN_MODAL_TIMEOUT) {
      const slide = e.target.closest('.slide img');
      if (!slide) return;

      openModal(slide.src);
      isDragging = false;
    }

    if (!isDragging) return;
    isDragging = false;

    const deltaX = lastX - startX;
    const currentPosition = position - deltaX;

    // Find the nearest slide
    let nearestIndex = 0;
    let minDistance = Math.abs(currentPosition - slides[0].offsetLeft);

    slides.forEach((slide, index) => {
      const distance = Math.abs(currentPosition - slide.offsetLeft);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    // Go to the nearest slide
    goToSlide(nearestIndex);

    // Restart auto-sliding after a delay
    // setTimeout(() => {
      startAutoSlide();
    // }, 1000);
  };

  track.addEventListener('mouseup', mouseUpFn);
  track.addEventListener('touchend', mouseUpFn);

  // Handle mouse leave to stop dragging
  track.addEventListener('mouseleave', mouseUpFn);

  // Prevent context menu on long press
  track.addEventListener('contextmenu', (e) => {
    if (isDragging || Date.now() - dragTimer < 500) {
      e.preventDefault();
    }
  });

  document.querySelectorAll('.education-block img').forEach(img => {
    img.addEventListener('click', () => { openModal(img.src); });
  })

  const sliderSection = document.querySelector('.cert-slider');

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible) startAutoSlide();
      else stopAutoSlide();
    },
    {
      threshold: 0.25 // start when 25% of slider is visible
    }
  );

  observer.observe(sliderSection);
});
