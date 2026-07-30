import './style.css'
import './i18n.js'

document.addEventListener('DOMContentLoaded', () => {

  // ==================== HAMBURGER MENU ====================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuContainer = document.getElementById('menu-container');
  if (hamburgerBtn && menuContainer) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      menuContainer.classList.toggle('open');
    });
  }

  // ==================== LOADING SCREEN ====================
  const loader = document.getElementById('loading-screen');
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 1200);

  // ==================== BACKGROUND SLIDER ====================
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 10000);
  }

  // ==================== ABOUT REVERSE PARALLAX ====================
  const aboutSection = document.getElementById('about');
  const col1 = document.querySelector('.col-1');
  const col2 = document.querySelector('.col-2');

  if (aboutSection && col1 && col2) {
    window.addEventListener('scroll', () => {
      const rect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when center of section is at center of screen
      const progress = (rect.top - windowHeight / 2 + rect.height / 2) / windowHeight;
      
      if (progress > -2 && progress < 2) {
        // col-1 starts at 0 (top visible) and moves UP to -150px (bottom visible)
        col1.style.transform = `translateY(${(progress - 1) * 75}px)`;
        // col-2 starts at -150px (bottom visible) and moves DOWN to 0 (top visible)
        col2.style.transform = `translateY(${(-progress - 1) * 75}px)`;
      }
    });
  }

  // ==================== SCROLL REVEAL ANIMATION ====================
  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-visible');
      } else {
        entry.target.classList.remove('slide-visible');
      }
    });
  }, revealOptions);

  // Allow time for initial render, then observe
  setTimeout(() => {
    document.querySelectorAll('.slide-hidden-left, .slide-hidden-right, .slide-hidden-bottom, .img-card').forEach(el => {
      revealObserver.observe(el);
    });
  }, 100);

  // ==================== SCROLL PARALLAX (HERO) ====================
  const parallaxBg = document.getElementById('parallax-bg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Move background down as user scrolls down (slower than scroll)
      parallaxBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    });
  }

  // ==================== FAQ SLIDER ====================
  const faqCards = document.querySelectorAll('.faq-card');
  const prevBtn = document.getElementById('faq-prev');
  const nextBtn = document.getElementById('faq-next');
  
  if (faqCards.length > 0) {
    let currentIndex = 1;

    const updateSlider = () => {
      faqCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'hidden');
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === currentIndex - 1) {
          card.classList.add('prev');
        } else if (index === currentIndex + 1) {
          card.classList.add('next');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < faqCards.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });
    }

    faqCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (card.classList.contains('prev') || card.classList.contains('next')) {
          currentIndex = index;
          updateSlider();
        }
      });
    });

    updateSlider();
  }

});

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 150, fill: "forwards" });
  });

  // Re-query interactables after slight delay to ensure dynamic elements are caught
  setTimeout(() => {
    const interactables = document.querySelectorAll('a, button, input, textarea, .faq-card, .faq-nav-btn, .lang-btn, .hiw-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
      });
    });
  }, 500);
}
