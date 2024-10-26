const { app, BrowserWindow } = require('electron');
const path = require('path');

// Global variables
let mainWindow;

// Functions
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
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
}