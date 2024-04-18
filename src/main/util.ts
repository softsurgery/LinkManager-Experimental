// import type {
//   FavlistJsonExport,
//   JsonExport,
//   LegacyJsonExport,
//   LegacyFavlistJsonExport,
// } from "./db";

// type FavlistJsonExportWithProperties = {
//   title: unknown;
//   data: unknown;
// };

// type JsonExportWithProperties = {
//   favlists: unknown;
// };

// type LegacyFavlistJsonExportWithProperties = {
//   title: unknown;
//   columns: unknown;
//   data: unknown;
// };

// type LegacyJsonExportWithProperties = { favlists: unknown };

// /**
//  * Validates that the given value is a valid JSON export.
//  */
// export function validateJson(value: unknown): value is JsonExport {
//   if (!validateProperties(value)) {
//     return false;
//   }
//   const { favlists } = value;
//   if (!Array.isArray(favlists)) {
//     return false;
//   }
//   return favlists.every(validateFavlistJson);
// }

// /**
//  * Validates that a value is a valid JSON import/export object representing a
//  * single favlist.
//  */
// export function validateFavlistJson(value: unknown): value is FavlistJsonExport {
//   if (!validateFavlistProperties(value)) {
//     return false;
//   }
//   if (typeof value.title !== "string" || !Array.isArray(value.data)) {
//     return false;
//   }
//   const { data } = value;
//   if (data.length === 0) {
//     return true;
//   }
//   // TODO Reduce duplicate iterations
//   const validValues = data.every((row) =>
//     Object.values(row).every((value) => typeof value === "string"),
//   );
//   const [firstRow, ...rest] = data;
//   const firstRowKeys = new Set(Object.keys(firstRow));
//   return (
//     validValues &&
//     rest.every((row) => setEquality(new Set(Object.keys(row)), firstRowKeys))
//   );
// }

// function validateProperties(value: unknown): value is JsonExportWithProperties {
//   if (value == null || typeof value !== "object") {
//     return false;
//   }
//   return "favlists" in value;
// }

// function validateFavlistProperties(
//   value: unknown,
// ): value is FavlistJsonExportWithProperties {
//   if (value == null || typeof value !== "object") {
//     return false;
//   }
//   return "title" in value && "data" in value;
// }

// /**
//  * Validates that the given value is a valid legacy JSON import/export.
//  */
// export function validateLegacyJson(value: unknown): value is LegacyJsonExport {
//   if (!validateLegacyProperties(value)) {
//     return false;
//   }
//   const { favlists } = value;
//   if (!Array.isArray(favlists)) {
//     return false;
//   }
//   return favlists.every(validateLegacyFavlistJson);
// }

// /**
//  * Validates that a value is a valid legacy JSON import/export object representing a
//  * single Favlist.
//  */
// export function validateLegacyFavlistJson(
//   value: unknown,
// ): value is LegacyFavlistJsonExport {
//   if (!validateLegacyFavlistProperties(value)) {
//     return false;
//   }
//   if (
//     typeof value.title !== "string" ||
//     !Array.isArray(value.columns) ||
//     !Array.isArray(value.data)
//   ) {
//     return false;
//   }
//   if (value.columns.some((column) => typeof column !== "string")) {
//     return false;
//   }
//   const dataIsValid = value.data.every((row) => {
//     if (!Array.isArray(row)) {
//       return false;
//     }
//     return row.every((cell) => typeof cell === "string");
//   });
//   return dataIsValid;
// }

// function validateLegacyProperties(
//   value: unknown,
// ): value is LegacyJsonExportWithProperties {
//   if (value == null || typeof value !== "object") {
//     return false;
//   }
//   return "favlists" in value;
// }

// function validateLegacyFavlistProperties(
//   value: unknown,
// ): value is LegacyFavlistJsonExportWithProperties {
//   if (value == null || typeof value !== "object") {
//     return false;
//   }
//   return "title" in value && "columns" in value && "data" in value;
// }

// export function pivotArray<T>(arr: T[][]): T[][] {
//   if (arr.length < 1) {
//     return [];
//   }
//   return arr[0].map((_, rowIndex) => arr.map((column) => column[rowIndex]));
// }

// function setEquality<T>(a: Set<T>, b: Set<T>): boolean {
//   return a.size === b.size && Array.from(a).every((value) => b.has(value));
// }
