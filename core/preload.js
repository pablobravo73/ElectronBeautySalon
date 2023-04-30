const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  setFormData: (formDataJSON) => ipcRenderer.invoke('setFormData', formDataJSON),
  searchAppointments: (SearchValuesJSON) => ipcRenderer.invoke('search-appointments', SearchValuesJSON), 
  searchReply: (callback) => ipcRenderer.on('search-appointments-reply', callback)
});












  













