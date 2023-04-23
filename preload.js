const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
 
  setTitle: (fname, lname) => ipcRenderer.send('set-title', fname, lname)
})

