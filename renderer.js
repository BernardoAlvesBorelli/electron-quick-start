const { ipcRenderer } = require('electron')

let result = ipcRenderer.sendSync("sync-ipcmain", "Olá ipcrender")
console.log(result)

// ipc render - async

ipcRenderer.on("async-ipcrender", (event, args) => {
    console.log("ipcrender", args)
})

ipcRenderer.send("async-ipcmain", {msg: "Oiii"})