const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  setFormData: (formDataJSON) => ipcRenderer.invoke('setFormData', formDataJSON),
  //searchAppointments: (SearchValuesJSON) => ipcRenderer.invoke('searchAppointments', SearchValuesJSON),
  searchAppointments: (SearchValuesJSON) => ipcRenderer.invoke('search-appointments', SearchValuesJSON),
  //handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
});













