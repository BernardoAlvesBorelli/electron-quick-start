// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, globalShortcut , Menu, MenuItem, Tray } = require('electron')
const url = require('url')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 450,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    minimizable: false,
    maximizable: false,
    icon: './icon.png'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  globalShortcut.register('CmdOrCtrl+j', () => {
    console.log(new Date().toISOString())
  })
  globalShortcut.register('Alt+j', () => {
    dialog.showMessageBox({title: 'Teste', message: 'Teste de Mensagem'})
  })

  const tray = new Tray(icon)

  let trayMenu = Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: () => {
        dialog.showErrorBox("Error settings", "erro ao acessar settings")
      }
    },
    {
      label: 'Help',
      click: () => {

      }
    },
    {
      label: 'Close',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(trayMenu)

}

const menu = Menu.buildFromTemplate([
  {
    label: "File",
    sublabel: "sublabel"
  },
  {
    label: "Edit",
    submenu: [
      {
        label: 'Desfazer',
        role: 'undo'
      },
      {
        label: 'Refazer',
        role: 'Redo'
      },
      {
        label: 'Recarregar',
        role: 'reload'
      },
      {
        role: 'separator'
      },
      {
        label: 'Recortar',
        role: 'cut'
      },
      {
        label: 'Copiar',
        role: 'copy'
      },
      {
        label: 'Colar',
        role: 'paste'
      }
    ]
  }
])
Menu.setApplicationMenu(menu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("dialog-1", (event, args) => {
  dialog.showErrorBox("404", "File not found")
})

ipcMain.on("dialog-2", (event, args) => {
  dialog.showMessageBox({
    title: "Titulo",
    message: "Mensagem simples",
    detail: "Detalhamento da mensagem",
    buttons: ["OK", "Cancelar", "Teste 1"]
  }, (response, checkboxChecked) => {
    console.log(response);
  })
})

ipcMain.on("dialog-3", (event, args) => {
  dialog.showOpenDialog({
    title: "Abrir Imagens",
    buttonLabel: "Abrir Imagens",
    message: "mensagem",
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: "Imagens",
        extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif']
      }
    ]
  }, (filePaths, bookmarks) => {
    console.log(filePaths, bookmarks)
  })
})

ipcMain.on("dialog-4", (event, args) => {
  dialog.showSaveDialog({
    title: "Salvando arquivo html",
    message: "mensagem",
    buttonLabel: "Salvar Arquivo",
    nameFieldLabel: "Nome Arquivo",
    filters: ['html', 'htm']
  }, (filename, bookmarks) => {
    console.log(filename)
  });
})