import { app, BrowserWindow, ipcMain } from 'electron';
import { ResourcesDirectory, Env } from './env';
import { config } from '../../shared/config';
import windowStyles from '../../shared/windowStyles';

let mainWindow: BrowserWindow | null = null;
const resourcesDirectory: ResourcesDirectory = new ResourcesDirectory();

export class ElectronWindow {
    private static instance: ElectronWindow;

    static getInstance(): ElectronWindow {
        if (!this.instance) {
            this.instance = new ElectronWindow();
        }
        return this.instance;
    }

    public init() {
        this.baseEnvironment();
        this.bindEvents();
    }

    public getBrowserWindow() {
        return mainWindow;
    }

    private baseEnvironment() {
        app.on('ready', this.createWindow);
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
        app.on('activate', () => {
            if (mainWindow === null) {
                this.createWindow();
            }
        });
    }

    private bindEvents() {
        // window
        ipcMain.on('closeWindow', () => {
            if (!mainWindow) return;
            mainWindow.close();
        });

        ipcMain.on('minimizeWindow', () => {
            if (!mainWindow) return;
            mainWindow.minimize();
        });

        ipcMain.on('fullScreenWindow', (event: any, isFullScreen: any) => {
            if (!mainWindow) return;
            mainWindow.setKiosk(isFullScreen);
        });

        // isWindowTop
        ipcMain.on('setAlwaysOnTop', (event: any, isPushpin: boolean) => {
            if (!mainWindow) return;
            mainWindow.setAlwaysOnTop(isPushpin);
        });
    }

    private createWindow() {
        mainWindow = new BrowserWindow({
            width: Env.isDev() ? windowStyles.MAX_WIDTH : windowStyles.WINDOW_WIDTH,
            height: windowStyles.WINDOW_HEIGHT,

            backgroundColor: windowStyles.BACKGROUND_COLOR,

            webPreferences: {
                devTools: Env.isDev(),
                nodeIntegration: true,
            },
            alwaysOnTop: false,
            show: false,
            skipTaskbar: false,

            /*
             * FullScreen:
             * fullscreen or kiosk
             */
            fullscreen: false,
            kiosk: false,

            focusable: true,
            resizable: false,
            movable: true,
            maximizable: false,
            fullscreenable: true,
            autoHideMenuBar: true,
            titleBarStyle: 'hiddenInset',
            frame: false,
        });

        mainWindow.loadURL(resourcesDirectory.getIndexURL());

        if (Env.isDev()) {
            mainWindow.webContents.openDevTools();
        }

        mainWindow.once('ready-to-show', () => {
            if (!mainWindow) {
                throw new Error('"mainWindow" is not defined');
            }

            if (config.START_MINIMIZED) {
                mainWindow.minimize();
            } else {
                mainWindow.show();
                mainWindow.focus();
            }
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }
}
