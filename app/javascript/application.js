// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import "@hotwired/turbo-rails"
// import "controllers"
import "slider"


 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)

  const certificates     = document.querySelectorAll(".certificate-container");
  const paginationPoints = document.querySelectorAll(".certificates-pagination-item");

  const mm = gsap.matchMedia()
  mm.add({
    isDesctop: "(min-width: 992px)"
  }, () => {
    gsap.fromTo("header", {
      height: 50,
    },
    {
      backgroundColor: 'var(--primary-color)',
      height: 80,
      scrollTrigger: {
        trigger: "section#services",
        start: "bottom-=160",
        end: "bottom+=80",
        scrub: true
      }
    });

    gsap.fromTo("header", {
      height: 80
    },
    {
      height: 50,
      backdropFilter: 'blur(20px)', // ; /* Adds blur effect */
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // '; /* Optional shadow for depth */
      scrollTrigger: {
        trigger: "section#home",
        start: "center",
        end: "+=300",
        scrub: true
      }
    })
  })

  gsap.to("#section-1-bg", {
    scale: 1.4,
    scrollTrigger: {
      trigger: "#section-1-bg",
      start: "top top",
      scrub: true
    }
  });


  gsap.to("#home-content", {
    y: "70%",
    scale: 1.2,
    opacity: 0,
    scrollTrigger: {
      trigger: "section#home",
      start: "top top",
      scrub: true
    }
  });

  document.querySelectorAll('.slide-left-to-right-wrapper').forEach((el) => {
    gsap.fromTo(el,
      {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
      },
      {
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        // delay: 1.0,
        scrollTrigger: {
          trigger: el,
          start: "20% bottom",
          end: 'center center+=30%',
          scrub: true
        }
      }
    );
  })

  document.querySelectorAll('.slide-right-to-left-wrapper').forEach((el) => {
    gsap.fromTo(el,
      {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      },
      {
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        // delay: 1.0,
        scrollTrigger: {
          trigger: el,
          start: "20% bottom",
          end: 'center center+=30%',
          scrub: true
        }
      }
    );
  })

  document.querySelectorAll('.education-separator.line').forEach((el) => {
    gsap.fromTo(el,
      {
        width: 0
      },
      {
        width: '50%',
        scrollTrigger: {
          trigger: '.education-card-wrapper',
          start: "center center+=30%",
          end: 'center+=150% center+=150%',
          scrub: true
        }
      }
    );
  })

  document.querySelectorAll('.services-content-list-line').forEach((el) => {
    gsap.fromTo(el,
      {
        y: 100,
        opacity: 0
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "bottom bottom",
          end: '+=30',
          scrub: true
        }
      }
    );
  })

  gsap.fromTo(document.querySelector('.services-separator.line'),
    {
      bottom: '90%'
    },
    {
      bottom: '10%',
      scrollTrigger: {
        trigger: '#services',
        start: "top top+=350",
        end: 'center center',
        scrub: true,
      }
    }
  );


  // gsap.fromTo(document.querySelector('.services-separator.circle'),
  //   {
  //     clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
  //   },
  //   {
  //     clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  //     scrollTrigger: {
  //       trigger: '#services',
  //       start: "center center-=50vh",
  //       end: '+=36px',
  //       scrub: true,
  //       markers: true
  //     }
  //   }
  // );

//   <div class=""></div>
// <div class="services-separator circle "></div>


  document.querySelectorAll('.services-card-title').forEach((el, index) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        x: index == 0 ? -50 : 50
      },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: el,
          start: "bottom bottom",
          end: '+=200',
          scrub: true
        }
      }
    );
  })

  const scrollTo = (elements, links, container) => {
    elements = Array.from(elements)
    links    = Array.from(links)

    const setActive = (link) => {
      links.forEach((link) => link.classList.remove("active"))
      link.classList.add("active");
    }

    // Add onclick listener
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        container.scrollTo({ top: elements[index].offsetTop, behavior: "smooth" });
        // setActive(link)
      })
    })

    let currentTargetId // = window.location.hash ? window.location.hash.substring(1) : null;

    function activateLink() {
      let targetId;
      elements.forEach((el) => {
        if ((container.scrollY || container.scrollTop) >= el.offsetTop - 150) {
          targetId = el.getAttribute("id");
        }
      });

      if (targetId !== currentTargetId) {
        currentTargetId = targetId
        const link = links.find((l) => l.dataset.scrollTargetId === currentTargetId)
        if (link) setActive(link)
      }
    }

    // TODO: fix initial activation when page is loaded with hash
    // Initial activation based on current scroll position.
    // setTimeout(
    //   () => {
    //     links.forEach((link, index) => {
    //       if (link.dataset.scrollTargetId === currentTargetId) {
    //         container.scrollTo({ top: elements[index].offsetTop, behavior: "smooth" });
    //         setActive(link)
    //       }
    //     })

    //   }, 1000
    // )

    // Event listener for scroll
    container.addEventListener("scroll", activateLink);
  }

  const sections = document.querySelectorAll("section:not(#gallery)");
  const navLinks = document.querySelectorAll("nav a:not([href])");
  scrollTo(sections, navLinks, window)

  // Lasy load images on visit page
  const lazyLoadGallery = () => {
    document.querySelectorAll('.slider-item img:not(.loaded)').forEach((img) => {
      img.onload = (e) => {
        img.classList.add('loaded')
      }
      img.src = img.dataset.src
    })
  }

  // document.getElementById('show-gallery').addEventListener('click', () => {
  //   gallery.classList.toggle('active');
  //   document.querySelector('body').classList.add('no-scroll')
  //   lazyLoadGallery()
  // })

  // Show/Hide mobile menu on bar/cross click
  document.querySelectorAll('.toggle i').forEach((el) => {
    el.addEventListener('click', () => document.querySelector('header').classList.toggle('active'))
  })
  // Hide mobile menu on link click
  document.querySelectorAll('nav a').forEach((el) => el.addEventListener('click', () => document.querySelector('header').classList.remove('active')))

  const refreshPerPage = (elid) => {
    document.querySelectorAll('.slider-per-page-item').forEach((el) => el.classList.remove('active'))
    document.querySelector(`.slider-per-page-item[data-elid="${elid}"]`).classList.add('active')
  }


  // const perPageContainer = document.querySelector('.slider-per-page')
  // document.querySelectorAll('.slider-item').forEach((el, index) => {
  //   const perPageElement = document.createElement('div');
  //   perPageElement.classList.add('slider-per-page-item')
  //   perPageElement.dataset.elid = el.dataset.elid
  //   perPageContainer.append(perPageElement)
  // })
  // refreshPerPage(document.querySelectorAll('.slider-item')[0].dataset.elid)

  let message;
  try { message = `Somebody visited alionakirilenko site! -- ${navigator?.userAgent}\n\n${JSON.stringify(navigator?.userAgentData)}` } catch { message = `Somebody visited site!` }
  // fetch(`https://api.telegram.org/bot${atob('MTE5NTY0MDIyODpBQUhsR3lxOVBqTjU0LVhsVjM3UzBubkp2cGxlcmlMczNuNA==')}/sendMessage`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({chat_id: '676561081', text: message})})

  // *** Swipe effect ***
  // let startX, swipeElement;

  // const threshold = 100; // Minimum swipe distance in pixels
  // const mainItem = document.getElementById('slider')

  // Helper function to handle swipe to left (move to next item)
  // const nextItem = () => {
  //   const sliders = document.querySelectorAll('.slider-item')
  //   refreshPerPage(sliders[1].dataset.elid)
  //   mainItem.appendChild(sliders[0])
  // };

  // // Helper function to handle swipe to right (move to previous item)
  // const prevItem = () => {
  //   const sliders = document.querySelectorAll('.slider-item')
  //   mainItem.prepend(sliders[sliders.length - 1])
  //   refreshPerPage(sliders[sliders.length - 1].dataset.elid)
  // };

  // Add touch event listeners
  // mainItem.addEventListener('touchstart', (e) => {
  //   const touch = e.changedTouches[0];
  //   startX = touch.pageX;
  //   currentSwipeElement = e.target;
  //   swipeElement = mainItem.querySelector('.slider-item:nth-child(2)')
  //   swipeElement.style.transition = `0.7s, transform 0s`
  // }, false);

  // mainItem.addEventListener("touchmove", (e) => {
  //   const touch = e.changedTouches[0];
  //   swipeElement.style.transform = `translateX(${touch.pageX - startX}px)`
  // });

  // mainItem.addEventListener('touchend', (e) => {
  //   const touch = e.changedTouches[0];
  //   const distX = touch.pageX - startX; // Distance moved horizontally

  //   if (Math.abs(distX) >= threshold) {
  //     distX > 0 ? prevItem() : nextItem()
  //   }

  //   swipeElement.style.transition = `0.7s`
  //   swipeElement.style.transform = `translateX(0px)`
  // }, false);

  // document.querySelector('body').addEventListener('keydown', (e) => {
  //   if (document.getElementById('gallery').classList.contains('active')) {
  //     if (e.key == 'ArrowRight') { nextItem() }
  //     if (e.key == 'ArrowLeft') { prevItem() }
  //   }
  // })











});

import "trix"
import "@rails/actiontext"
