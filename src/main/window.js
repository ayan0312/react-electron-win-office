import { app, BrowserWindow } from 'electron'
import { ResourcesDirectory } from './util/env'

let win,
    resourcesDirectory = new ResourcesDirectory()

export class ElectronWindow {
    static getInstance() {
        if (this.instance) {
            return this.instance
        } else {
            this.instance = new ElectronWindow()
            return this.instance
        }
    }

    constructor() {
        this.instance = null
    }

    main() {
        this._InitBaseEnvironment()
    }

    _InitBaseEnvironment() {
        app.on('ready', this._CreateWindow)
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })
        app.on('activate', () => {
            if (win === null) {
                this._CreateWindow()
            }
        })
    }

    _CreateWindow() {
        let indexUrl = resourcesDirectory.getIndex()

        win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })

        win.loadURL(indexUrl)

        win.webContents.openDevTools()
        win.on('closed', () => {
            win = null
        })
    }
}