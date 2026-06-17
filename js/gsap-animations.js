// ── GSAP ANIMATIONS ──
document.addEventListener("DOMContentLoaded", (event) => {
  // Register plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Hide hero reveal elements immediately so there's no flash before the animation
  gsap.set('.gsap-hero-reveal', { y: 30, opacity: 0 });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 60 },
          ease: "power3.inOut"
        });
      }
    });
  });

  // 1. HERO TIMELINE (Load Sequence)
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Make body visible (if we hid it for FOUC, but we didn't, so just start)
  
  // Split hero title into chars
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const eName = heroTitle.querySelector('.name-e');
    const gName = heroTitle.querySelector('.name-g');
    const ampersand = heroTitle.querySelector('.hero-and');

    // Simple char wrap
    const splitText = (el) => {
      const text = el.innerText;
      el.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.innerText = char === ' ' ? '\u00A0' : char;
        // set initial state for GSAP
        gsap.set(span, { y: 100, opacity: 0, rotateX: -90 });
        el.appendChild(span);
      });
    };

    if(eName) splitText(eName);
    if(gName) splitText(gName);
    if(ampersand) {
      gsap.set(ampersand, { scale: 0, opacity: 0, rotation: -180 });
    }

    heroTl
      .to('.name-e .char', { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }, "+=0.2")
      .to('.hero-and', { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
      .to('.name-g .char', { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }, "-=0.6")
      .to('.gsap-hero-reveal',
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
      );
  }

  // Hero Parallax
  gsap.to('.hero-petals', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 2. GLOBAL SCROLL REVEALS
  // Basic fade & slide up for elements with .gsap-reveal
  gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    gsap.fromTo(elem,
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%", // Triggers when top of element hits 85% of viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Left Reveal (Story Image)
  gsap.utils.toArray('.gsap-reveal-left').forEach(elem => {
    gsap.fromTo(elem,
      { x: -50, opacity: 0 },
      {
        x: 0, 
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 80%"
        }
      }
    );
  });

  // Right Reveal (Story Text)
  gsap.utils.toArray('.gsap-reveal-right').forEach(elem => {
    gsap.fromTo(elem,
      { x: 50, opacity: 0 },
      {
        x: 0, 
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 80%"
        }
      }
    );
  });

  // 3. STAGGERED GRIDS (Events, Places, Gifts, Forms)
  const grids = ['.events-grid', '.places-grid', '.gifts-grid', '.forms-grid', '.hotel-grid'];
  grids.forEach(gridClass => {
    const grid = document.querySelector(gridClass);
    if (grid) {
      const cards = grid.querySelectorAll('.gsap-stagger-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, 
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%"
            }
          }
        );
      }
    }
  });

  // 4. TIMELINE STRIP ANIMATION
  const tlItems = gsap.utils.toArray('.tl-item');
  if (tlItems.length > 0) {
    gsap.fromTo(tlItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".timeline-strip",
          start: "top 85%"
        }
      }
    );
  }

});
