const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
 
  setTitle: (fname, lname, phone, email, date, time) => ipcRenderer.send('set-title', fname, lname, phone, email, date, time)
})

