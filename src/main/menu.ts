// import { readFile, writeFile } from "fs/promises";
// import { resolve } from "path";
// import { Menu, app, dialog, shell } from "electron";
// import { dbPath, asJson, asLegacyJson, fromJson, fromLegacyJson } from "./db";
// import type { MenuItemConstructorOptions, FileFilter } from "electron";

// const fileItems: MenuItemConstructorOptions[] = [
//   {
//     label: "View data file",
//     click: () => shell.showItemInFolder(dbPath),
//   },
//   {
//     label: "Import from...",
//     submenu: [
//       {
//         label: "JSON",
//         click: async (_menuItem, browserWindow) => {
//           const filePath = await getDataImportPath("Import from JSON", [
//             { name: "JSON", extensions: ["json"] },
//           ]);
//           if (filePath == null) return;

//           const success = await importData(filePath, JSON.parse, fromJson);
//           if (success) {
//             browserWindow?.reload();
//           }
//         },
//       },
//       {
//         label: "JSON (Legacy)",
//         click: async (_menuItem, browserWindow) => {
//           const filePath = await getDataImportPath("Import from JSON (legacy)", [
//             { name: "JSON", extensions: ["json"] },
//           ]);
//           if (filePath == null) return;

//           const success = await importData(filePath, JSON.parse, fromLegacyJson);
//           if (success) {
//             browserWindow?.reload();
//           }
//         },
//       },
//     ],
//   },
//   {
//     label: "Export as...",
//     submenu: [
//       {
//         label: "JSON",
//         click: async () => {
//           const filePath = await getDataExportPath("Export as JSON", [
//             { name: "JSON", extensions: ["json"] },
//           ]);
//           if (filePath == null) return;

//           const json = await asJson();
//           await writeData(filePath, JSON.stringify(json, null, 2));
//         },
//       },
//       {
//         label: "Minified JSON",
//         click: async () => {
//           const filePath = await getDataExportPath("Export as JSON", [
//             { name: "JSON", extensions: ["json"] },
//           ]);
//           if (filePath == null) return;

//           const json = await asJson();
//           await writeData(filePath, JSON.stringify(json));
//         },
//       },
//       {
//         label: "JSON (Legacy)",
//         click: async () => {
//           const filePath = await getDataExportPath("Export as JSON (Legacy)", [
//             { name: "JSON", extensions: ["json"] },
//           ]);
//           if (filePath === null) return;

//           const json = await asLegacyJson();
//           await writeData(filePath, JSON.stringify(json, null, 2));
//         },
//       },
//     ],
//   },
//   { type: "separator" },
//   { role: "quit" },
// ];

// const fileMenu: MenuItemConstructorOptions = {
//   label: "File",
//   submenu: fileItems,
// };

// const viewMenu: MenuItemConstructorOptions = { role: "viewMenu" };

// const windowMenu: MenuItemConstructorOptions = { role: "windowMenu" };

// const helpItems: MenuItemConstructorOptions[] = [
//   {
//     label: "Version Info",
//     click: () =>
//       dialog.showMessageBox({
//         type: "info",
//         title: "Version Info",
//         message: [
//           ["Version", app.getVersion()],
//           ["Chrome", process.versions.chrome],
//           ["Node", process.versions.node],
//           ["Electron", process.versions.electron],
//         ]
//           .map(([label, value]) => `${label}: ${value}`)
//           .join("\n"),
//       }),
//   },
// ];
// const helpMenu: MenuItemConstructorOptions = {
//   label: "Help",
//   submenu: helpItems,
// };

// const template = [fileMenu, viewMenu, windowMenu, helpMenu];

// /**
//  * Return value is null if the user cancelled the dialog.
//  */
// async function getDataImportPath(
//   title: string,
//   filters: FileFilter[],
// ): Promise<string | null> {
//   const {
//     canceled,
//     filePaths: [filePath],
//   } = await dialog.showOpenDialog({
//     title,
//     buttonLabel: "Import",
//     properties: ["openFile"],
//     filters,
//   });
//   if (canceled) return null;
//   return filePath as string;
// }

// /**
//  * Is null if the user cancelled the dialog.
//  */
// async function getDataExportPath(
//   title: string,
//   filters: FileFilter[],
// ): Promise<string | null> {
//   const { canceled, filePath } = await dialog.showSaveDialog({
//     title,
//     buttonLabel: "Export",
//     defaultPath: resolve(app.getPath("documents"), "favlist.json"),
//     filters,
//   });
//   if (canceled) return null;
//   return filePath as string;
// }

// /**
//  * Imports the data from the given file.
//  *
//  * @returns if the import was successful.
//  */
// async function importData<Parsed>(
//   path: string,
//   parser: (data: string) => Parsed,
//   importer: (data: Parsed) => void | Promise<void>,
// ): Promise<boolean> {
//   try {
//     const data = await readFile(path, "utf8");
//     const parsed = parser(data);
//     await importer(parsed);
//   } catch (err: any) {
//     dialog.showErrorBox("Error during import", err.message);
//     return false;
//   }
//   dialog.showMessageBox({
//     title: "Import complete",
//     message: "Import complete",
//   });
//   return true;
// }

// /**
//  * Writes data and shows either a success message or a failure message.
//  */
// async function writeData(path: string, data: string): Promise<void> {
//   try {
//     await writeFile(path, data);
//   } catch (err: any) {
//     dialog.showErrorBox("Error exporting", err.message);
//     return;
//   }
//   dialog.showMessageBox({
//     title: "Export successful",
//     message: `Exported to ${path}`,
//   });
// }

// export default Menu.buildFromTemplate(template);
