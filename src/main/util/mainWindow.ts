import { app, BrowserWindow, ipcMain } from 'electron';
import { ResourcesDirectory, Env } from './env';
import { config } from '../../shared/config';
import windowStyles from '../../shared/windowStyles';

let mainWindow: any = null;
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
        this.initBaseEnvironment();
        this.bindEvents();
    }

    public getBrowserWindow() {
        return mainWindow;
    }

    private initBaseEnvironment() {
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
        ipcMain.on('setAlwaysOnTop', (event: any, isPushpin: boolean) => {
            mainWindow.setAlwaysOnTop(isPushpin);
        });

        ipcMain.on('closeWindow', (event: any, arg: any) => {
            mainWindow.close();
        });

        ipcMain.on('minimizeWindow', (event: any, arg: any) => {
            mainWindow.minimize();
        });

        ipcMain.on('setWindowSize', (event: any, arg: any) => {
            mainWindow.setSize(arg.width, arg.height, true);
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

            show: false,
            resizable: false,
            movable: true,
            maximizable: false,
            fullscreenable: false,
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
