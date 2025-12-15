const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

let nodeEnv = 'production'
let startAppUrl = 'localhost'
let startFrameless = false
let startFullscreen = true
let startDevTools = false
let startRotated = false
let startMouseAsTouch = false

if (process.env.hasOwnProperty('NODE_ENV'))
  nodeEnv = process.env.NODE_ENV // prettier-ignore
if (process.env.hasOwnProperty('START_APPURL'))
  startAppUrl = process.env.START_APPURL
if (process.env.hasOwnProperty('START_FRAMELESS'))
  startFrameless = parseInt(process.env.START_FRAMELESS)
if (process.env.hasOwnProperty('START_FULLSCREEN'))
  startFullscreen = parseInt(process.env.START_FULLSCREEN)
if (process.env.hasOwnProperty('START_DEVTOOLS'))
  startDevTools = parseInt(process.env.START_DEVTOOLS)
if (process.env.hasOwnProperty('START_ROTATED'))
  startRotated = parseInt(process.env.START_ROTATED)
if (process.env.hasOwnProperty('START_MOUSEASTOUCH'))
  startMouseAsTouch = parseInt(process.env.START_MOUSEASTOUCH)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: startRotated ? 1024 : 600,
    height: startRotated ? 600 : 1024,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      spellcheck: false
    },
    icon: __dirname + '/public/app.png',
    frame: !startFrameless,
    fullscreen: startFullscreen
  })

  if (startMouseAsTouch) {
    try {
      mainWindow.webContents.debugger.attach('1.2')
    } catch (err) {
      console.log('Debugger attach failed: ', err)
    }
    const isDebuggerAttached = mainWindow.webContents.debugger.isAttached()
    console.log('debugger attached? ', isDebuggerAttached)
    mainWindow.webContents.debugger.on('detach', (event, reason) => {
      console.log('Debugger detached due to: ', reason)
    })
    mainWindow.webContents.debugger.sendCommand(
      'Emulation.setEmitTouchEventsForMouse',
      { enabled: true }
    )
  }

  mainWindow.loadURL(nodeEnv === 'dev' ? `http://${startAppUrl}:3000/` : `http://${startAppUrl}/`) // prettier-ignore

  mainWindow.on('closed', () => (mainWindow = null))

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    if (startDevTools) {
      mainWindow.webContents.openDevTools()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
