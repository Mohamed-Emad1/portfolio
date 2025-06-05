const portfolioContainer = document.getElementById('portfolio-container');

async function fetchProjects() {
    try {
        const response = await fetch('../data/projects.json');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

function renderProjects(projects) {
    portfolioContainer.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        projectCard.innerHTML = `
            <img src="${project.imageURL}" alt="${project.title}" class="project-image">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.githubURL}" target="_blank" class="btn">View Code</a>
                <a href="${project.demoURL}" target="_blank" class="btn">View Demo</a>
            </div>
        `;

        portfolioContainer.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', fetchProjects);