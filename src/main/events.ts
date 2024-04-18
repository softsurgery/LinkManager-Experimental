import type { IpcMainEvent as Event } from "electron";
import { BrowserWindow } from "electron";
import { categoryController } from "./app/controller/CategoryController";
import { linkController } from "./app/controller/LinkController";
import { shell } from "electron";

function setWindowTitle(event: Event, title: string) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win?.setTitle(title);
}

function openExternally(event: Event, url: string) {
  shell.openExternal(url);
}

export { setWindowTitle, openExternally, categoryController, linkController };
