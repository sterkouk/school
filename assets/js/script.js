// Alumni data
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
  
  // Show pages (navigation)
  function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
  }
  
  // Display alumni
  function displayAlumni(list) {
    const container = document.getElementById("alumniList");
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
  
  // Search function
  function searchAlumni() {
    const search = document.getElementById("search").value.toLowerCase();
  
    const filtered = alumni.filter(a =>
      a.name.toLowerCase().includes(search)
    );
  
    displayAlumni(filtered);
  }
  
  // Load data on start
  displayAlumni(alumni);
