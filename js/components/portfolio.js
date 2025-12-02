const portfolioContainer = document.getElementById("portfolio-list");
let allProjects = [];
let currentFilter = "all";

class PortfolioManager {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.init();
  }

  async init() {
    await this.fetchProjects();
    this.setupFilters();
    this.renderProjects(this.projects);
    this.setupProjectAnimations();
  }

  async fetchProjects() {
    try {
      const response = await fetch("data/projects.json");
      this.projects = await response.json();
      this.filteredProjects = this.projects;
      allProjects = this.projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter");
        this.filterProjects(filter);
        this.updateActiveFilter(e.target);
      });
    });
  }

  filterProjects(category) {
    currentFilter = category;

    if (category === "all") {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) => {
        // Check if project has multiple categories or single category
        if (project.categories && Array.isArray(project.categories)) {
          return project.categories.includes(category);
        }
        return project.category === category;
      });
    }

    this.animateFilterTransition(() => {
      this.renderProjects(this.filteredProjects);
    });
  }

  updateActiveFilter(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
  }

  animateFilterTransition(callback) {
    const projectCards = document.querySelectorAll(".portfolio-item");

    // Fade out current projects
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8) translateY(20px)";
      }, index * 50);
    });

    // After fade out, render new projects
    setTimeout(() => {
      callback();
      this.setupProjectAnimations();
    }, projectCards.length * 50 + 200);
  }

  renderProjects(projects) {
    if (!portfolioContainer) return;

    portfolioContainer.innerHTML = "";

    projects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      portfolioContainer.appendChild(projectCard);
    });
  }

  createProjectCard(project, index) {
    const projectCard = document.createElement("div");
    projectCard.classList.add("portfolio-item");
    projectCard.setAttribute("data-category", project.category);
    projectCard.setAttribute("data-aos", "fade-up");
    projectCard.setAttribute("data-aos-delay", (index * 100).toString());

    const statusBadge = project.featured
      ? '<span class="featured-badge">Featured</span>'
      : "";
    const statusIndicator = project.status
      ? `<span class="status-badge status-${project.status
          .toLowerCase()
          .replace(" ", "-")}">${project.status}</span>`
      : "";

    projectCard.innerHTML = `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.imageURL}" alt="${
      project.title
    }" class="project-image" 
                         onerror="this.src='assets/images/projects/placeholder.jpg'">
                    <div class="project-overlay">
                        <div class="project-year">${project.year}</div>
                        ${statusBadge}
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        ${statusIndicator}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies
                          .map(
                            (tech) => `<span class="tech-badge">${tech}</span>`
                          )
                          .join("")}
                    </div>
                    <div class="project-links">
                        ${this.createProjectLinks(project)}
                    </div>
                </div>
            </div>
        `;

    return projectCard;
  }

  createProjectLinks(project) {
    let links = "";

    if (project.githubURL && project.githubURL !== "#") {
      links += `<a href="${project.githubURL}" target="_blank" class="btn btn-secondary" rel="noopener">
                        <i class="fab fa-github"></i> Code
                      </a>`;
    }

    if (project.demoURL && project.demoURL !== "#") {
      links += `<a href="${project.demoURL}" target="_blank" class="btn btn-primary" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Demo
                      </a>`;
    }

    if (!links) {
      links = '<span class="project-status">In Development</span>';
    }

    return links;
  }

  setupProjectAnimations() {
    const projectCards = document.querySelectorAll(".portfolio-item");

    projectCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "scale(0.8) translateY(20px)";

      // Add click event for lightbox
      const projectImageContainer = card.querySelector(
        ".project-image-container"
      );
      projectImageContainer.style.cursor = "pointer";
      projectImageContainer.addEventListener("click", () => {
        const projectTitle = card.querySelector(".project-title").textContent;
        const project = this.projects.find((p) => p.title === projectTitle);
        if (project && project.images) {
          window.lightbox.open(project.images);
        } else if (project) {
          // Fallback if images array doesn't exist yet
          window.lightbox.open([project.imageURL]);
        }
      });

      setTimeout(() => {
        card.style.transition =
          "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        card.style.opacity = "1";
        card.style.transform = "scale(1) translateY(0)";
      }, index * 100 + 100);
    });
  }
}

// Initialize portfolio manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.lightbox = new Lightbox();
  new PortfolioManager();
});
