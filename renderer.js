setEvent = window.electronAPI // this is the object exposed by preload.js



const formulario = document.querySelector('#miFormulario'); // selecciona el formulario



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
  











