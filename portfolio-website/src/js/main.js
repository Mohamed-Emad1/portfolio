/* ===============================================
   ADVANCED PORTFOLIO JAVASCRIPT - MOHAMED EMAD
   =============================================== */

class PortfolioApp {
  constructor() {
    this.currentFilter = "all";
    this.isScrolling = false;
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.startAnimations();
  }

  setupEventListeners() {
    // Navigation
    this.setupNavigation();

    // Scroll effects
    this.setupScrollEffects();

    // Portfolio filtering
    this.setupPortfolioFiltering();

    // Skills animation
    this.setupSkillsAnimation();

    // Contact form
    this.setupContactForm();

    // Smooth scrolling
    this.setupSmoothScrolling();

    // Theme switching
    this.setupThemeToggle();

    // Typing animation
    this.setupTypingAnimation();
  }

  setupNavigation() {
    const nav = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    // Hamburger menu toggle
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking on links
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger?.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  setupScrollEffects() {
    // Back to top button
    const backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop?.classList.add("visible");
      } else {
        backToTop?.classList.remove("visible");
      }
    });

    backToTop?.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      if (!this.isScrolling) {
        requestAnimationFrame(() => {
          this.handleParallax();
          this.isScrolling = false;
        });
        this.isScrolling = true;
      }
    });
  }

  handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-shape");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.2;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  setupPortfolioFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter items
        this.filterPortfolioItems(filter, portfolioItems);
      });
    });
  }

  filterPortfolioItems(filter, items) {
    items.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filter === "all" || itemCategory === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }

  setupSkillsAnimation() {
    const skillBars = document.querySelectorAll(".skill-progress");
    const skillsSection = document.querySelector("#skills");

    const observerOptions = {
      threshold: 0.7,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateSkillBars(skillBars);
        }
      });
    }, observerOptions);

    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }

  animateSkillBars(skillBars) {
    skillBars.forEach((bar, index) => {
      const percentage = bar.getAttribute("data-percentage");

      setTimeout(() => {
        bar.style.width = percentage + "%";

        // Add counter animation
        const counter = bar.parentElement.querySelector(".skill-percentage");
        if (counter) {
          this.animateCounter(counter, percentage);
        }
      }, index * 200);
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.round(current) + "%";

      if (current >= target) {
        element.textContent = target + "%";
        clearInterval(timer);
      }
    }, 20);
  }

  setupContactForm() {
    const form = document.querySelector("#contact-form");
    const submitBtn = form?.querySelector('button[type="submit"]');

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!this.validateForm(form)) {
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }

      try {
        await this.sendMessage(new FormData(form));
        this.showNotification("Message sent successfully!", "success");
        form.reset();
      } catch (error) {
        this.showNotification(
          "Failed to send message. Please try again.",
          "error"
        );
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.disabled = false;
        }
      }
    });

    // Real-time form validation
    const inputs = form?.querySelectorAll("input, textarea");
    inputs?.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = "";

    // Remove existing error
    this.clearFieldError(field);

    if (field.hasAttribute("required") && !value) {
      errorMessage = "This field is required";
      isValid = false;
    } else if (type === "email" && value && !this.isValidEmail(value)) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    field.classList.add("error");

    let errorElement = field.parentNode.querySelector(".field-error");
    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.className = "field-error";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove("error");
    const errorElement = field.parentNode.querySelector(".field-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  async sendMessage(formData) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            }"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add("show"), 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  setupThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", savedTheme);

    themeToggle?.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  setupTypingAnimation() {
    const typingElement = document.querySelector(".typing-text");
    if (!typingElement) return;

    const texts = [
      "Flutter Developer",
      "Mobile App Developer",
      "Full Stack Developer",
      "UI/UX Enthusiast",
      "Problem Solver",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, speed);
    };

    type();
  }

  initializeComponents() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    }

    // Initialize any other third-party libraries
    this.initializeParticles();
  }

  initializeParticles() {
    // Simple particle system for hero background
    const canvas = document.querySelector("#particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 144, 226, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }

  startAnimations() {
    // Add entrance animations
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add("animate-in");
      }, 500);
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});

// Utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  getRandomFloat: (min, max) => {
    return Math.random() * (max - min) + min;
  },

  lerp: (start, end, factor) => {
    return start + (end - start) * factor;
  },
};
