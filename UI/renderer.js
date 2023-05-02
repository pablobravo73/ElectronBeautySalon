// POST request to create a new appointment
const formulario = document.getElementById('apointRegisterForm');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function limpiarFormulario(formulario) {
  formulario.reset();
}

formulario.addEventListener('submit', async(e) => {
  e.preventDefault();
  const formData = {
    name: capitalizeFirstLetter(fname.value),
    lastname: capitalizeFirstLetter(lastname.value),
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





// Manejador de eventos para la respuesta de búsqueda


// Manejador de eventos para el botón de búsqueda de citas por fecha

// Manejador de eventos para la respuesta de búsqueda
window.api.searchReply((event, rows) => {
  try {
    const citas = JSON.parse(rows);
    if (citas.length === 0) {
      alert("No hay resultados");
    } else {    
      // Creamos una tabla en memoria
      var tabla = document.createElement('table');
      tabla.classList.add('tableclass');

      // Agregamos la fila de encabezado
      var encabezado = tabla.createTHead();
      var filaEncabezado = encabezado.insertRow();
      filaEncabezado.insertCell().innerHTML = "Nombre";
      filaEncabezado.insertCell().innerHTML = "Teléfono";
      filaEncabezado.insertCell().innerHTML = "Email";
      filaEncabezado.insertCell().innerHTML = "Tipo de cita";
      filaEncabezado.insertCell().innerHTML = "Fecha de la cita";
      filaEncabezado.insertCell().innerHTML = "Hora de la cita";

      // Agregamos las filas de datos
      var cuerpo = tabla.createTBody();
      for (var i = 0; i < citas.length; i++) {
        var fila = cuerpo.insertRow();
        fila.insertCell().innerHTML = citas[i].name + " " + citas[i].lastname;
        fila.insertCell().innerHTML = citas[i].phone;
        fila.insertCell().innerHTML = citas[i].email;
        fila.insertCell().innerHTML = citas[i].appointmentType;
        fila.insertCell().innerHTML = citas[i].appointmentDate;
        fila.insertCell().innerHTML = citas[i].appointmentTime;
      }

      // Agregamos la tabla completa al DOM del navegador
      var divResultados = document.getElementById("Response");
      divResultados.innerHTML = "";
      divResultados.appendChild(tabla);
    }

  } catch (error) {
    console.error(error);
    // Aquí puedes agregar un mensaje de error o cualquier otra acción que consideres necesaria.
  }
});

// Manejador de eventos para el botón de búsqueda de citas por fecha
const DateButton = document.getElementById("submitDate");
const DateInput = document.getElementById("findDate");

DateButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const searchDate = DateInput.value;

  // Convertir la fecha a JSON
  const JSONDateValue = JSON.stringify(searchDate);

  // Llamar a la API con la fecha de búsqueda
  window.api.todayAppoints(JSONDateValue);
});








window.api.todayAppointsReply((event, rows) => {
  const cardContainer = document.getElementById("insert-today-date");
  try {
    const usersDate = JSON.parse(rows);
    cardContainer.innerHTML = ""; // Limpiar el contenedor de tarjetas antes de agregar nuevas
    
    // Obtener el tiempo actual en milisegundos Unix
    const nowUnix = new Date().getTime();

    usersDate.forEach((user) => {
      const { name, lastname, appointmentType, appointmentTime, appointmentDate } = user;

      // Convertir la fecha y hora de la cita en milisegundos Unix
      const appointmentDateTime = appointmentDate + ' ' + appointmentTime;
      const appointmentDateTimeUnix = new Date(appointmentDateTime).getTime();
      console.log(appointmentDateTimeUnix);

      if (appointmentDateTimeUnix >= nowUnix) {
        // crear elementos HTML
        const card = document.createElement("div");
        const cardImage = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardContent = document.createElement("div");
        const cardName = document.createElement("h3");
        const cardAppointment = document.createElement("p");
        const cardTime = document.createElement("p");

        // establecer atributos y contenido
        card.classList.add("card");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", "./img/user.png");
        cardImage.setAttribute("alt", "Imagen de la cita");
        cardName.classList.add("card-name");
        cardName.textContent = name+ " " +lastname;
        cardAppointment.classList.add("card-appointment");
        cardAppointment.textContent = appointmentType;
        cardTime.classList.add("card-time");
        cardTime.textContent = appointmentTime;

        // agregar elementos al DOM
        cardContent.appendChild(cardName);
        cardContent.appendChild(cardAppointment);
        cardContent.appendChild(cardTime);
        cardBody.appendChild(cardContent);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
      } else {
        console.log("No hay citas disponibles");
      }
    });
    if (cardContainer.innerHTML === "") {
      const noAppointments = document.createElement("h2");
      noAppointments.textContent = "No hay citas agendadas";
      cardContainer.appendChild(noAppointments);
    }
  } catch (error) {
    console.error(error);
  }
});

