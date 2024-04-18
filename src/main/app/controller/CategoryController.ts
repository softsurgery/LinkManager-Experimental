
import type { IpcMainInvokeEvent as InvokeEvent } from "electron";
import { Category } from "../db";

async function getAllCategories(_event: InvokeEvent) {
    const categories = await Category.findAll();
    return categories.map((category) => category.toJSON());
  }
  
async function getCategoryById(_event: InvokeEvent, id: number) {
    const category = await Category.findByPk(id);
    return category ? category.toJSON() : null;
  }
  
async function createCategory(_event: InvokeEvent, newCategoryData: any) {
    const category = await Category.create(newCategoryData);
    return category.toJSON();
  }
  
async function updateCategory(_event: InvokeEvent, id: number, newData: any) {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update(newData);
      return category.toJSON();
    }
    return null;
  }
  
async function deleteCategory(_event: InvokeEvent, id: number) {
    const deletedCount = await Category.destroy({ where: { id } });
    return deletedCount > 0;
  }

export const categoryController = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}