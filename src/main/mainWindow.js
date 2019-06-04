import { app, BrowserWindow } from 'electron'
import { ResourcesDirectory, Env } from './util/env'
import { config } from '../shared/config'
import windowStyles from '../shared/windowStyles'

let _mainWindow,
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
            if (_mainWindow === null) {
                this._CreateWindow()
            }
        })
    }

    _CreateWindow() {

        _mainWindow = new BrowserWindow({
            width: Env.isDev()? windowStyles.MAX_WIDTH : parseInt(windowStyles.WINDOW_WIDTH),
            height: parseInt(windowStyles.WINDOW_HEIGHT),
    
            backgroundColor:windowStyles.BACKGROUND_COLOR,

            show: false,
            resizable:false,
            movable:true,
            maximizable:false,
            fullscreenable:false,
            autoHideMenuBar:true,
            titleBarStyle:'hiddenInset',
            frame: false

        })

        _mainWindow.loadURL(resourcesDirectory.getIndexURL())

        if (Env.isDev()) {
            _mainWindow.webContents.openDevTools()
        }

        _mainWindow.once('ready-to-show', () => {
            if (!_mainWindow) {
                throw new Error('"mainWindow" is not defined')
            }

            if (config.START_MINIMIZED === 'true') {
                _mainWindow.minimize()
            } else {
                _mainWindow.show()
                _mainWindow.focus()
            }
        })

        _mainWindow.on('closed', () => {
            _mainWindow = null
        })
    }
}