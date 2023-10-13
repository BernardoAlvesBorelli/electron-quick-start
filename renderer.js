const { ipcRenderer } = require('electron')

document.querySelector("#dialog-1").onclick = () => {
    ipcRenderer.send("dialog-1")
}

document.querySelector("#dialog-2").onclick = () => {
    ipcRenderer.send("dialog-2")
}

document.querySelector("#dialog-3").onclick = () => {
    ipcRenderer.send("dialog-3")
}

document.querySelector("#dialog-4").onclick = () => {
    ipcRenderer.send("dialog-4")
}