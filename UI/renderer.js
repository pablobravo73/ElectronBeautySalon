

// POST request to create a new appointment
const formulario = document.getElementById('apointRegisterForm');

formulario.addEventListener('submit', async(e) => {
  e.preventDefault();
  const formData = {
    name: fname.value,
    lastname: lastname.value,
    phone: phone.value,
    email: email.value,
    appointmentType: service.value,
    appointmentDate: date.value,
    appointmentTime: time.value
  };
  const formDataJSON = JSON.stringify(formData);
  window.api.setFormData(formDataJSON)  
});

// search request to search appointments

// prueba2 inicia
const searchButton = document.getElementById("search-button");
const searchCategory = document.getElementById("search-category");
const searchKeyword = document.getElementById("search-keyword");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", async(e) => {
  e.preventDefault();
  const Searchvalues = {
    category: searchCategory.value,
    keyword: searchKeyword.value
  };
  const JSONSearchValues = JSON.stringify(Searchvalues);
  console.log(JSONSearchValues);
  window.api.searchAppointments(JSONSearchValues); 
});




const counter = document.getElementById('search-results')

window.api.searchReply((event, rows) => {
   const ParseRows = JSON.parse(rows);
  
 // borrar el contenido anterior del div de resultados
  resultsDiv.innerHTML = "";

  // crear una lista no ordenada para mostrar los resultados
  const resultList = document.createElement("ul");
  for (const row of parseRows) {
    const listItem = document.createElement("li");
    listItem.textContent = `${row.name}, ${row.email}, ${row.phone}`;
    resultList.appendChild(listItem);
  }
  resultsDiv.appendChild(resultList);
});







