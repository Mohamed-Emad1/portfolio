/* ===============================================
   PORTFOLIO APP — MOHAMED EMAD
   Cleaned-up main controller
   =============================================== */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
  }

  /* ── Navigation ── */
  setupNavigation() {
    const nav = document.querySelector(".navbar");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const links = menu?.querySelectorAll(".nav-link");

    // Mobile toggle
    toggle?.addEventListener("click", () => {
      const isActive = toggle.classList.toggle("active");
      menu.classList.toggle("active");
      toggle.setAttribute("aria-expanded", isActive);
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Close menu on link click
    links?.forEach((link) => {
      link.addEventListener("click", () => {
        toggle?.classList.remove("active");
        menu?.classList.remove("active");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Navbar scroll effect
    window.addEventListener(
      "scroll",
      () => {
        nav?.classList.toggle("scrolled", window.scrollY > 80);
      },
      { passive: true },
    );

    // Active link highlighting
    this.setupActiveLinks(links);
  }

  setupActiveLinks(links) {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links?.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`,
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ── Scroll Effects ── */
  setupScrollEffects() {
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener(
      "scroll",
      () => {
        backToTop?.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Skills bar animation
    this.setupSkillsAnimation();
  }

  setupSkillsAnimation() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = skillsSection.querySelectorAll(".skill-progress");
            bars.forEach((bar, i) => {
              const width = bar.style.width;
              bar.style.width = "0";
              setTimeout(() => {
                bar.style.width = width;
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(skillsSection);
  }

  /* ── Smooth Scrolling ── */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  /* ── Notifications ── */
  static notify(message, type = "success") {
    const el = document.createElement("div");
    el.className = `notification notification-${type}`;
    el.innerHTML = `
      <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));

    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 4000);
  }
}

// Boot
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PortfolioApp();
});
