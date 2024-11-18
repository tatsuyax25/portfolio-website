// Example: Smooth Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Carousel
const carousel = document.querySelector('.carousel');
let currentIndex = 0;

function showNextItem() {
  currentIndex = (currentIndex + 1) % carousel.children.length;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextItem, 3000);

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