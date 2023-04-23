setEvent = window.electronAPI



const formulario = document.querySelector('#miFormulario');



// formulario.addEventListener('submit', function (event) {
//     event.preventDefault(()=> {
        

//     }); // evita que se envíe el formulario

//     const formValues = {
//         name: document.getElementById('fname').value,
//         lastname: document.getElementById('lname').value
//     }
//     //const formValues = Array.from(new FormData(formulario).entries())


//     setEvent.setTitle(formValues);
// });

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Captura los valores del formulario
    const formValues = {
      name: document.getElementById('fname').value,
      lastname: document.getElementById('lname').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      apoointmentDate: document.getElementById('date').value,
      apointmentTime: document.getElementById('time').value
    };
    setEvent.setTitle(formValues);
    });
  
//     // Valida los datos del formulario
//     if (!validateName(formValues.name)) {
//       alert("Por favor ingrese un nombre válido");
//       return;
//     }
  
//     if (!validateEmail(formValues.email)) {
//       alert("Por favor ingrese una dirección de correo electrónico válida");
//       return;
//     }
  
//     // Envía el formulario
//     formulario.submit();
//   });
  
//   // Función para validar el campo de nombre
//   function validateName(name) {
//     const regex = /^[a-zA-Z\s]+$/; // Expresión regular que valida solo letras y espacios
//     return regex.test(name);
//   }
  
//   // Función para validar el campo de correo electrónico
//   function validateEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular que valida una dirección de correo electrónico
//     return regex.test(email);
//   }

//   // Función para validar el campo de fecha
//   function validateDate(date) {
//     const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/; // Expresión regular que valida una fecha
//     return regex.test(date);
//   }

//   // Función para validar el campo de hora
//   function validateTime(time) {
//     const regex = /^[0-9]{2}:[0-9]{2}$/; // Expresión regular que valida una hora
//     return regex.test(time);
//   }

//   // Función para validar el campo de teléfono
//   function validatePhone(phone) {
//     const regex = /^[0-9]{10}$/; // Expresión regular que valida un número de teléfono
//     return regex.test(phone);
//   }












