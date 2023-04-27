const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('api', {
//   send: (channel, dataForm) => {
//     let validChannels = ['setFormData'];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, dataForm);
//     }
//     console.log('done to Main!')
//   },  
//   receive: (channel, func) => {
//     let validChannels = ['fromMain'];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.on(channel, (event, ...args) => func(...args)); 
//     }
//     console.log('done from Main!')
//   } 
// });

contextBridge.exposeInMainWorld('api', {
  setFormData: (formDataJSON) => ipcRenderer.invoke('setFormData', formDataJSON),

  
});





