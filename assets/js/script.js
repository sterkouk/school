// ============================
// DATA
// ============================

const alumni = [
  { name: "Μαρία Παπαδοπούλου", year: 2016, job: "Καθηγήτρια" },
  { name: "Νίκος Γεωργίου", year: 2018, job: "Προγραμματιστής" },
  { name: "Ελένη Δημητρίου", year: 2015, job: "Γιατρός" },
  { name: "Γιώργος Νικολάου", year: 2017, job: "Πολιτικός Μηχανικός" },
  { name: "Άννα Κώστα", year: 2019, job: "Δικηγόρος" },
  { name: "Δημήτρης Ιωάννου", year: 2014, job: "Αρχιτέκτονας" },
  { name: "Σοφία Μάρκου", year: 2020, job: "Γραφίστρια" },
  { name: "Κώστας Πέτρου", year: 2013, job: "Επιχειρηματίας" },
  { name: "Χριστίνα Βλάχου", year: 2016, job: "Νοσηλεύτρια" },
  { name: "Πάνος Αλεξίου", year: 2018, job: "Αναλυτής Δεδομένων" }
];

const images = [
  "assets/images/school-1.jpg",
  "assets/images/school-2.jpg"
];


// ============================
// INIT (runs after page loads)
// ============================

document.addEventListener("DOMContentLoaded", () => {

  // Load alumni ONLY if page has it
  if (document.getElementById("alumniList")) {
    displayAlumni(alumni);
  }

  // Start carousel ONLY if exists
  if (document.getElementById("carousel-image")) {
    startCarousel();
  }

});


// ============================
// ALUMNI FUNCTIONS
// ============================

function displayAlumni(list) {
  const container = document.getElementById("alumniList");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Δεν βρέθηκαν απόφοιτοι 😢</p>";
    return;
  }

  list.forEach(person => {
    container.innerHTML += `
      <div class="card">
        <h3>${person.name}</h3>
        <p>🎓 Έτος αποφοίτησης: ${person.year}</p>
        <p>💼 ${person.job}</p>
      </div>
    `;
  });
}

function searchAlumni() {
  const input = document.getElementById("search");

  if (!input) return;

  const search = input.value.toLowerCase();

  const filtered = alumni.filter(a =>
    a.name.toLowerCase().includes(search)
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

  img.src = images[index];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    nextImage();
  }, 3000);
}