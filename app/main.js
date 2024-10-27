const { app, BrowserWindow } = require('electron');
const path = require('path');

// Global variables
let mainWindow;

// Functions
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 780,
        minWidth: 800,
        minHeight: 600,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'frontend/index.html'));

    mainWindow.on('ready-to-show', async () => {
        mainWindow.show();
        mainWindow.webContents.openDevTools(); // dev mode
    });

    ipcMain.on('minApp', () => {
        mainWindow.minimize();
    });

    ipcMain.on('maxApp', () => {
        if(mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on('closeApp', () => {
        mainWindow.close();
    });
};


//MAIN PROCESS
app.whenReady().then(() => {
    createMainWindow();

    mainWindow.on('closed', () => (mainWindow = null));

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

    app.on('window-all-closed', () => {
        if (!isMac) app.quit()
    });
});