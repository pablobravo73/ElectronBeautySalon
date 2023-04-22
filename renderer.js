setEvent = window.electronAPI


//const submitButton = document.getElementById('submit')

const formulario = document.querySelector('#miFormulario');

// formulario.addEventListener('submit', function(event) {
//     event.preventDefault(); // evita que se envíe el formulario
//     // código para tomar los elementos del formulario
//     const inputNombre = document.getElementById('fname');
//     const inputApellido = document.getElementById('lname');
//     // código para tomar los valores del formulario
//     const nombre = inputNombre.value;
//     const apellido = inputApellido.value;
//     // código para enviar los valores al proceso principal
//     setEvent.setTitle(nombre, apellido);
//   });

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // evita que se envíe el formulario

    const formValues = {
        name: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value
    }
    //const formValues = Array.from(new FormData(formulario).entries())
      

    setEvent.setTitle(formValues);
    });
  
  





// submitButton.addEventListener('click', () => {
//   const title = titleInput.value

//   setEvent.setTitle(title)
// })

