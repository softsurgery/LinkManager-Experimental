import { contextBridge, ipcRenderer } from "electron";
import { openExternally } from "./events";

interface LinkData {
  id: number;
  title: string;
  url: string;
}

interface CategoryData {
  id: number;
  title: string;
}


contextBridge.exposeInMainWorld("electron", {
  message: (message: string) => ipcRenderer.send("message", message),
  getAllCategories: (): Promise<CategoryData[]> => ipcRenderer.invoke("category:all"),
  getCategory: (id: number): Promise<CategoryData | null> =>
    ipcRenderer.invoke("category:get", id),
  createCategory: (title: string): Promise<CategoryData> =>
    ipcRenderer.invoke("category:add", title),
  updateCategory: (id: number, newData: CategoryData): Promise<CategoryData | null> =>
    ipcRenderer.invoke("category:update", id, newData),
  deleteCategory: (id: number): Promise<void> =>
    ipcRenderer.invoke("category:delete", id),
  allLinks: (): Promise<LinkData[]> => ipcRenderer.invoke("link:all"),
  getLink: (id: number): Promise<LinkData | null> => ipcRenderer.invoke("link:get", id),
  getLinksByCategoryId: (id: number): Promise<LinkData | null> => ipcRenderer.invoke("link:getLinksByCategoryId", id),
  addLink: (linkData: LinkData): Promise<LinkData> =>
    ipcRenderer.invoke("link:add", linkData),
  updateLink: (id: number, newData: LinkData): Promise<LinkData | null> =>
    ipcRenderer.invoke("link:update", id, newData),
  deleteLink: (id: number): Promise<void> => ipcRenderer.invoke("link:delete", id),
  setWindowTitle: (title: string) => ipcRenderer.send("set-window-title", title),
  openExternally: (url: string) => ipcRenderer.send("open-externally", url),
});
