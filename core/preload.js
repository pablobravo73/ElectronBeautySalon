const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  setFormData: (formDataJSON) => ipcRenderer.invoke('setFormData', formDataJSON),
  searchAppointments: (SearchValuesJSON) => ipcRenderer.invoke('search-appointments', SearchValuesJSON), 
  searchReply: (callback) => ipcRenderer.on('search-appointments-reply', callback),
  todayAppoints: (JSONDateValues) => ipcRenderer.invoke('today-appoints', JSONDateValues),
  todayAppointsReply: (callback) => ipcRenderer.on('today-appoints-reply', callback),
  downloadAppointments:(JSONSearchValues) => ipcRenderer.invoke('download-appointments', JSONSearchValues),
  downloadAppointmentsReply: (callback) => ipcRenderer.on('download-appointments-reply', callback),
  openApointmentWindow: () => ipcRenderer.invoke('open-appointment-window'),
});















  













