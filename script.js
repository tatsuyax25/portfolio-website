// Example: Smooth Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Carousel
const carousel = document.querySelector('.carousel');
const projectContainer = document.createElement('div');
carousel.appendChild(projectContainer);

fetch('projects.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch project data.');
    }
    return response.json();
  })
  .then(data => {
    if (!data.length) {
      projectContainer.innerHTML = `<p>No projects available at the moment.</p>`;
      return;
    }
    data.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.classList.add('carousel-item');
      projectItem.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" rel="noopener">View Project</a>
      `;
      projectContainer.appendChild(projectItem);
    });
  })
  .catch(error => {
    console.error('Error fetching projects:', error);
    projectContainer.innerHTML = `<p>Failed to load projects. Please try again later.</p>`;
  });

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isActive = navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
  navLinks.setAttribute('aria-hidden', !isActive);
});

// Dark Mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.textContent = "☀️";
} else {
  body.classList.remove('dark-theme');
  themeToggle.textContent = "🌙";
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});