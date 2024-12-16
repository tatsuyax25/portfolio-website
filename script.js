// Example: Smooth Scroll to section
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        console.error(`Element with ID ${targetId} not found.`);
      }
    }
  });
});

// Carousel
const carousel = document.querySelector(".carousel");
const projectContainer = document.createElement("div");
carousel.appendChild(projectContainer);

// Utility function to create a project item
function createProjectItem(project) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("carousel-item");
  projectItem.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" target="_blank" rel="noopener">View Project</a>
  `;
  return projectItem;
}

fetch("projects.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch project data.");
    }
    return response.json();
  })
  .then((data) => {
    if (!data.length) {
      projectContainer.innerHTML = `<p>No projects available at the moment.</p>`;
      return;
    }
    data.forEach((project) => {
      projectContainer.appendChild(createProjectItem(project));
    });
  })
  .catch((error) => {
    console.error("Error fetching projects:", error);
    projectContainer.innerHTML = `<p>Failed to load projects. Please try again later.</p>`;
  });

// Hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isActive);
  navLinks.setAttribute("aria-hidden", !isActive);

  // Focus trap for accessibility
  if (isActive) {
    navLinks.querySelector("a")?.focus();
  }
});

// Close menu on pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
    navLinks.setAttribute("aria-hidden", true);
  }
});

// Dark Mode
const themeToggle = document.getElementById("theme-toggle");

// Set initial theme based on localStorage
const setTheme = (theme) => {
  document.body.classList.toggle("dark-mode", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
};

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "light");

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  const newTheme = isDarkMode ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Initialize Particles.js
if (window.innerWidth > 768) {
  // Disable particles for smaller viewports
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
} else {
  console.log("Particles.js disabled for small screen sizes.");
}
