const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
 // setTitle: (title) => ipcRenderer.send('set-title', title)
  setTitle: (fname, lname) => ipcRenderer.send('set-title', fname, lname)
})

