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
  alert('Cita creada con éxito');
});
