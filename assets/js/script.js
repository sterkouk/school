// ============================
// DATA
// ============================

const alumni = [
  { name: "Μαρία Παπαδοπούλου", year: 2016, job: "Καθηγήτρια" },
  { name: "Νίκος Γεωργίου",     year: 2018, job: "Προγραμματιστής" },
  { name: "Ελένη Δημητρίου",    year: 2015, job: "Γιατρός" },
  { name: "Γιώργος Νικολάου",   year: 2017, job: "Πολιτικός Μηχανικός" },
  { name: "Άννα Κώστα",         year: 2019, job: "Δικηγόρος" },
  { name: "Δημήτρης Ιωάννου",   year: 2014, job: "Αρχιτέκτονας" },
  { name: "Σοφία Μάρκου",       year: 2020, job: "Γραφίστρια" },
  { name: "Κώστας Πέτρου",      year: 2013, job: "Επιχειρηματίας" },
  { name: "Χριστίνα Βλάχου",    year: 2016, job: "Νοσηλεύτρια" },
  { name: "Πάνος Αλεξίου",      year: 2018, job: "Αναλυτής Δεδομένων" }
];

const images = [
  { src: "assets/images/school-1.jpg", caption: "Το Γυμνάσιο Δικαίων" },
  { src: "assets/images/school-2.jpg", caption: "Σχολική αυλή" }
];


// ============================
// INIT
// ============================

document.addEventListener("DOMContentLoaded", () => {

  // Active nav link
  document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href ||
        link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      link.classList.add("active");
    }
  });

  // Alumni page
  if (document.getElementById("alumniList")) {
    displayAlumni(alumni);
  }

  // Carousel
  if (document.getElementById("carousel-image")) {
    renderDots();
    startCarousel();
  }

  // Stats counter
  if (document.querySelectorAll(".stat-number").length) {
    animateCounters();
  }

  // Gallery lightbox
  setupLightbox();

});


// ============================
// ALUMNI
// ============================

function displayAlumni(list) {
  const container = document.getElementById("alumniList");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p style='color:var(--text-muted); padding: 20px 0;'>Δεν βρέθηκαν απόφοιτοι 😢</p>";
    return;
  }

  container.innerHTML = list.map(person => `
    <div class="card">
      <h3>${person.name}</h3>
      <p>🎓 Έτος αποφοίτησης: <strong>${person.year}</strong></p>
      <p>💼 ${person.job}</p>
    </div>
  `).join('');
}

function searchAlumni() {
  const input = document.getElementById("search");
  if (!input) return;
  const search = input.value.toLowerCase().trim();

  const filtered = alumni.filter(a =>
    a.name.toLowerCase().includes(search) ||
    a.job.toLowerCase().includes(search) ||
    String(a.year).includes(search)
  );

  displayAlumni(filtered);
}


// ============================
// CAROUSEL
// ============================

let currentIndex = 0;
let carouselInterval;

function showImage(index) {
  const img = document.getElementById("carousel-image");
  if (!img) return;
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = images[index].src;
    img.style.opacity = "1";
  }, 250);
  updateDots(index);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  resetCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
  resetCarousel();
}

function startCarousel() {
  carouselInterval = setInterval(nextImage, 4000);
}

function resetCarousel() {
  clearInterval(carouselInterval);
  startCarousel();
}

function renderDots() {
  const dotsContainer = document.querySelector(".carousel-dots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = images.map((_, i) =>
    `<div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`
  ).join('');
}

function updateDots(index) {
  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(index) {
  currentIndex = index;
  showImage(index);
  resetCarousel();
}


// ============================
// STATS COUNTER ANIMATION
// ============================

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}


// ============================
// GALLERY LIGHTBOX
// ============================

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.parentElement.addEventListener("click", () => {
      document.getElementById("lightbox-img").src = img.src;
      lightbox.classList.add("open");
    });
  });

  document.getElementById("lightbox-close").addEventListener("click", () => {
    lightbox.classList.remove("open");
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.classList.remove("open");
  });
}
