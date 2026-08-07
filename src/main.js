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

  // ==================== COMBINED SCROLL HANDLER (rAF optimized) ====================
  const aboutSection = document.getElementById('about');
  const col1 = document.querySelector('.col-1');
  const col2 = document.querySelector('.col-2');
  const parallaxBg = document.getElementById('parallax-bg');
  const topNav = document.querySelector('.top-nav');
  
  let scrollTicking = false;
  let lastScrollY = window.scrollY;
  
  const onScroll = () => {
    const currentScrollY = window.scrollY;

    // Smart Navbar Logic
    if (topNav) {
      if (currentScrollY > 50) {
        topNav.classList.add('scrolled');
      } else {
        topNav.classList.remove('scrolled');
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        topNav.classList.add('nav-hidden'); // Scrolling down, hide
      } else {
        topNav.classList.remove('nav-hidden'); // Scrolling up, show
      }
    }
    
    lastScrollY = currentScrollY;

    // About reverse parallax
    if (aboutSection && col1 && col2) {
      const rect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (rect.top - windowHeight / 2 + rect.height / 2) / windowHeight;
      
      if (progress > -2 && progress < 2) {
        col1.style.transform = `translateY(${(progress - 1) * 75}px)`;
        col2.style.transform = `translateY(${(-progress - 1) * 75}px)`;
      }
    }
    
    // Hero parallax
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${currentScrollY * 0.4}px)`;
    }

    // Section dots scroll spy
    if (sectionDots && dots.length > 0) {
      const windowHeight = window.innerHeight;
      let currentSection = 'hero';
      let isDark = false;
      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4) {
            currentSection = sec.id;
            isDark = sec.dark;
          }
        }
      });
      dots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-section') === currentSection);
      });
      sectionDots.classList.toggle('dark', isDark);
    }
    
    scrollTicking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

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
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  setTimeout(() => {
    document.querySelectorAll('.slide-hidden-left, .slide-hidden-right, .slide-hidden-bottom, .img-card').forEach(el => {
      revealObserver.observe(el);
    });
  }, 100);

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

  // ==================== SECTION DOTS NAVIGATION ====================
  const sectionDots = document.getElementById('section-dots');
  const dots = document.querySelectorAll('.section-dots .dot');
  const sections = [
    { id: 'hero', dark: false },
    { id: 'about', dark: true },
    { id: 'services', dark: true },
    { id: 'how-it-works', dark: true },
    { id: 'faq', dark: true }
  ];

  if (sectionDots && dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('data-section');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==================== HOW IT WORKS TABS ====================
  const hiwTabs = document.querySelectorAll('.hiw-tab');
  const hiwImages = document.querySelectorAll('.hiw-showcase-img');

  if (hiwTabs.length > 0 && hiwImages.length > 0) {
    hiwTabs.forEach((tab) => {
      tab.addEventListener('mouseenter', () => {
        const step = tab.getAttribute('data-step');
        
        // Remove active from all tabs and images
        hiwTabs.forEach(t => t.classList.remove('active'));
        hiwImages.forEach(img => img.classList.remove('active'));
        
        // Add active to current tab
        tab.classList.add('active');
        
        // Add active to corresponding image
        const targetImg = document.querySelector(`.hiw-showcase-img[data-img-step="${step}"]`);
        if (targetImg) {
          targetImg.classList.add('active');
        }
      });
    });
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
