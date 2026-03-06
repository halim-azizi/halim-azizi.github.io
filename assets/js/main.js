/**
 * Main JS File
 */
(function() {
  "use strict";

  /* =======================================
   * Navbar Scroll Effect
   * ======================================= */
  const selectHeader = document.querySelector('.custom-navbar');
  if (selectHeader) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        selectHeader.classList.add('scrolled');
      } else {
        selectHeader.classList.remove('scrolled');
      }
    };
    document.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
  }

  /* =======================================
   * Mobile Menu Toggle
   * ======================================= */
  const hamburger = document.querySelector('.hamburger i');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu i');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (hamburger && mobileMenu && closeMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* =======================================
   * Smooth Scrolling
   * ======================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        // Adjust for sticky header
        const headerHeight = selectHeader ? selectHeader.offsetHeight : 0;
        
        window.scrollTo({
          top: offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  /* =======================================
   * Intersection Observer for Fade-Ins
   * ======================================= */
  const faders = document.querySelectorAll('.fade-in-up');
  if (faders.length > 0) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }

  /* =======================================
   * Typing Effect
   * ======================================= */
  const typedSpan = document.querySelector('.type-effect');
  if (typedSpan) {
    const textArray = ["Front-End Developer", "UI/UX Enthusiast", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
      }
    }

    // Initiate typing effect
    document.addEventListener("DOMContentLoaded", function() {
      if(textArray.length) {
        typedSpan.textContent = "";
        setTimeout(type, newTextDelay / 2);
      }
    });
  }

  /* =======================================
   * Active Link Highlighting on Scroll
   * ======================================= */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const headerHeight = selectHeader ? selectHeader.offsetHeight : 0;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  /* =======================================
   * Custom Animated Cursor
   * ======================================= */
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Follower has a slight delay via CSS transitions, but we update its position
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn-custom, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
        cursorFollower.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
  }

  /* =======================================
   * 3D Tilt Effect on Cards
   * ======================================= */
  const tiltCards = document.querySelectorAll('.card-rotate');
  if (tiltCards.length > 0) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
        card.style.zIndex = '1';
      });
    });
  }

  /* =======================================
   * Timeline Line Animation on Scroll
   * ======================================= */
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scrolled');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    timelineObserver.observe(timeline);
  }

})();