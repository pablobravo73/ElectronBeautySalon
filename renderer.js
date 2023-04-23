setEvent = window.electronAPI



const formulario = document.querySelector('#miFormulario');



formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // evita que se envíe el formulario

    const formValues = {
        name: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value
    }
    //const formValues = Array.from(new FormData(formulario).entries())


    setEvent.setTitle(formValues);
});













