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
  navLinks.classList.toggle('active');
});

// Dark Mode
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Set initial them based on localStorage
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark-theme');
  themeToggle.checked = "☀️";
} else {
  root.classList.remove('dark-theme');
  themeToggle.checked = "🌙";
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  if (root.classList.contains('dark-theme')) {
    root.classList.remove('dark-theme');
    themeToggle.checked = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    root.classList.add('dark-theme');
    themeToggle.checked = "☀️";
    localStorage.setItem("theme", "dark");
  }
});