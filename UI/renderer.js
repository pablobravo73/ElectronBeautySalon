

const botonAgendarCitas = document.querySelector("#agendar-citas");

botonAgendarCitas.addEventListener("click", async (e) => {
  e.preventDefault();
  window.api.openApointmentWindow();

});




// search request to search appointments
const searchButton = document.getElementById("search-button");
const searchCategory = document.getElementById("search-category");
const searchKeyword = document.getElementById("search-keyword");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", async(e) => {
  e.preventDefault();
  try {
    const Searchvalues = {
      category: searchCategory.value,
      keyword: searchKeyword.value,
    }; 
    if (Searchvalues.keyword.trim() === "") {
      alert("Ingrese un valor de búsqueda");
      return;
    }
    const JSONSearchValues = JSON.stringify(Searchvalues);
    window.api.searchAppointments(JSONSearchValues);
  } catch (error) {
    console.error(error);
  }
});





// Manejador de eventos para la respuesta de búsqueda
window.api.searchReply((event, rows) => {
  try {
    const citas = JSON.parse(rows);
    if (citas.length === 0) {
      alert("No hay resultados");
    } else {    
      // Creamos una tabla en memoria
      let tabla = document.createElement('table');
      tabla.classList.add('tableclass');

      // Agregamos la fila de encabezado
      let encabezado = tabla.createTHead();
      let filaEncabezado = encabezado.insertRow();
      filaEncabezado.insertCell().innerHTML = "Nombre";
      filaEncabezado.insertCell().innerHTML = "Teléfono";
      filaEncabezado.insertCell().innerHTML = "Email";
      filaEncabezado.insertCell().innerHTML = "Tipo de cita";
      filaEncabezado.insertCell().innerHTML = "Fecha de la cita";
      filaEncabezado.insertCell().innerHTML = "Hora de la cita";

      // Agregamos las filas de datos
      let cuerpo = tabla.createTBody();
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
      let divResultados = document.getElementById("Response");
      let divButton = document.getElementById("insert-button");
      divButton.innerHTML = "";
      divResultados.innerHTML = "";
      divResultados.appendChild(tabla);

      divButton.innerHTML = `
      <br />
      <div class = "button-container">
        
        <button id="delete-button" class="btn-danger">cerrar</button>       
      </div>
      `;
      
      // divButton.innerHTML = `
      // <br />
      // <div class = "button-container">
      //   <button id="download-button" class="download-button" icon="./img/money.png">Descargar</button>
      //   <button id="delete-button" class="btn-danger">cerrar</button>       
      // </div>
      // `;
      // Manejador de eventos para el botón de descarga
      // const downloadButton = document.getElementById("download-button");
      // downloadButton.addEventListener("click", async(e) => {
      //   const JSONSearchValues = JSON.stringify(citas);
      //   window.api.downloadAppointments(JSONSearchValues);
      // });



      const deleteButton = document.getElementById("delete-button");
      deleteButton.addEventListener("click", async(e) => {
        
        divResultados.innerHTML = "";
        divButton.innerHTML = "";
      });



    }

  } catch (error) {
    console.error(error);
    
  }
});

// Manejador de eventos para el botón de búsqueda de citas por fecha
const DateButton = document.getElementById("submitDate");
const DateInput = document.getElementById("findDate");

DateButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const searchDate = DateInput.value;

  
  const JSONDateValue = JSON.stringify(searchDate);

  window.api.todayAppoints(JSONDateValue);
});

window.api.downloadAppointmentsReply((event, rows) => {
  
  const usersDate = JSON.parse(rows);
  
  const csv = usersDate.map((row) => Object.values(row));
  csv.unshift(Object.keys(usersDate[0]));
  const csvArray = csv.join("\n");
  const a = document.createElement("a");
  a.href = "data:attachment/csv," + encodeURIComponent(csvArray);
  a.target = "_blank";
  a.download = "citas.csv";
  document.body.appendChild(a);
  a.click();
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

