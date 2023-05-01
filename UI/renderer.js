// POST request to create a new appointment
const formulario = document.getElementById('apointRegisterForm');

function limpiarFormulario(formulario) {
  formulario.reset();
}

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

  limpiarFormulario(formulario);
});

// search request to search appointments
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




// Create a table with the results of the search
window.api.searchReply((event, rows) => {
  try {
    const citas = JSON.parse(rows);

    // Creamos una tabla en memoria
    var tabla = document.createElement('table');

    // Agregamos la fila de encabezado
    var encabezado = tabla.createTHead();
    var filaEncabezado = encabezado.insertRow();
    filaEncabezado.insertCell().innerHTML = "Nombre";
    filaEncabezado.insertCell().innerHTML = "Apellido";
    filaEncabezado.insertCell().innerHTML = "Teléfono";
    filaEncabezado.insertCell().innerHTML = "Email";
    filaEncabezado.insertCell().innerHTML = "Tipo de cita";
    filaEncabezado.insertCell().innerHTML = "Fecha de la cita";
    filaEncabezado.insertCell().innerHTML = "Hora de la cita";

    // Agregamos las filas de datos
    var cuerpo = tabla.createTBody();
    for (var i = 0; i < citas.length; i++) {
      var fila = cuerpo.insertRow();
      fila.insertCell().innerHTML = citas[i].name;
      fila.insertCell().innerHTML = citas[i].lastname;
      fila.insertCell().innerHTML = citas[i].phone;
      fila.insertCell().innerHTML = citas[i].email;
      fila.insertCell().innerHTML = citas[i].appointmentType;
      fila.insertCell().innerHTML = citas[i].appointmentDate;
      fila.insertCell().innerHTML = citas[i].appointmentTime;
    }

    // Agregamos la tabla completa al DOM del navegador
    var divResultados = document.querySelector("#search-results");
    divResultados.innerHTML = "";
    divResultados.appendChild(tabla);
  } catch(error) {
    console.error(error);
    // Aquí puedes agregar un mensaje de error o cualquier otra acción que consideres necesaria.
  }
});







