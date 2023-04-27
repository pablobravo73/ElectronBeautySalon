
const formulario = document.getElementById('apointRegisterForm');

formulario.addEventListener('submit', async(e) => {
  const formData = {
    name: document.getElementById('name').value,
    lastname: document.getElementById('lastname').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    appointmentType: document.getElementById('service').value,
    appointmentDate: document.getElementById('date').value,
    appointmentTime: document.getElementById('time').value    
  }
  window.api.setFormData(formData)
  console.log(formData)
  
});

// const formulario = document.getElementById('apointRegisterForm');

// const nameInput = document.getElementById('name')
// const lastnameInput = document.getElementById('lastname')
// const phoneInput = document.getElementById('phone')
// const emailInput = document.getElementById('email')
// const appointmentTypeInput = document.getElementById('service')
// const appointmentDateInput = document.getElementById('date')
// const appointmentTimeInput = document.getElementById('time')

// formulario.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   const name = nameInput.value
//   const lastname = lastnameInput.value
//   const phone = phoneInput.value
//   const email = emailInput.value
//   const appointmentType = appointmentTypeInput.value
//   const appointmentDate = appointmentDateInput.value
//   const appointmentTime = appointmentTimeInput.value
  
//   const dataForm = {
//     name: name,
//     lastname: lastname,
//     phone: phone,
//     email: email,
//     appointmentType: appointmentType,
//     appointmentDate: appointmentDate,
//     appointmentTime: appointmentTime
//   }
//   window.api.setFormData(dataForm)
//   console.log(dataForm)
// })


// formulario.addEventListener('submit', async () => {
//   const formData = new FormData(formulario);
//   const dataForm = {
//     name: formData.get('name'),
//     lastname: formData.get('lastname'),
//     phone: formData.get('phone'),
//     email: formData.get('email'),
//     appointmentType: formData.get('appointmentType'),
//     appointmentDate: formData.get('appointmentDate'),
//     appointmentTime: formData.get('appointmentTime')
//   }
//   window.api.setFormData(dataForm)
// })

// const btnadd = document.getElementById('btnadd')
// const titleInput = document.getElementById('title')

// btnadd.addEventListener('click', async () => {
//     const title = await titleInput.value
//     window.api.setTitle(title)
// })


