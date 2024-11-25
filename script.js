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

// Set initial theme based on localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
} else {
  document.body.classList.remove("dark-mode");
  themeToggle.textContent = "🌙";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  console.log("Theme toggle clicked!");
  console.log("Current classes on body:", document.body.classList);
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});

// Initialize Particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 100 },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});