import { app, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";
import * as events from "./events";
import db from "./app/db";

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Favlist",
    show: false,
    modal: true,
    width: 800,
    height: 500,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  });

  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    const rendererPort = process.env.PORT || process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
  mainWindow.show();
  mainWindow.webContents.openDevTools();
}

const main = async () => {
  app.enableSandbox();
  try {
    await Promise.all([app.whenReady(), db.sync()]);
  } catch (e) {
    console.error(e);
    app.exit(1);
  }

  ipcMain.on("set-window-title", events.setWindowTitle);
  ipcMain.on("open-externally", events.openExternally);
  ipcMain.handle("category:all", events.categoryController.getAllCategories);
  ipcMain.handle("category:get", events.categoryController.getCategoryById);
  ipcMain.handle("category:add", events.categoryController.createCategory);
  ipcMain.handle("category:delete", events.categoryController.deleteCategory);
  ipcMain.handle("link:all", events.linkController.getAllLinks);
  ipcMain.handle("link:get", events.linkController.getLinkById);
  ipcMain.handle("link:getLinksByCategoryId", events.linkController.getLinksByCategoryId);
  ipcMain.handle("link:update", events.linkController.updateLink);
  ipcMain.handle("link:add", events.linkController.createLink);
  ipcMain.handle("link:delete", events.linkController.deleteLink);

  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
};

main();

app.on("ready", function updater() {
  autoUpdater.checkForUpdatesAndNotify();
  
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});
