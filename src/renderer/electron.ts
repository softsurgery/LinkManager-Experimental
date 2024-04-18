const electron = (window as any).electron;

// Link operations
export const getAllLinks = electron.getAllLinks;
export const getLinkById = electron.getLinkById;
export const getLinksByCategoryId = electron.getLinksByCategoryId;
export const createLink = electron.createLink;
export const updateLink = electron.updateLink;
export const deleteLink = electron.deleteLink;

// Category operations
export const getAllCategories = electron.getAllCategories;
export const getCategory = electron.getCategory;
export const createCategory = electron.createCategory;
export const updateCategory = electron.updateCategory;
export const deleteCategory = electron.deleteCategory;

// Common function to set window title
export const setWindowTitle = (title: string): void => {
  electron.setWindowTitle(title);
  window.document.title = title;
};

export const openExternally = (url: string): void => {
  electron.openExternally(url);
};
