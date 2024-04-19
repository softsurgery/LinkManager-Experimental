import { makeAutoObservable, action, observable } from 'mobx';
import { getAllCategories,createCategory,getCategory,deleteCategory } from "../electron";

class CategoryModel {
    categories = [];
    selectedCategory = null;

    constructor() {
        makeAutoObservable(this,{
            categories: observable,
            fetchCategories: action,
            createCategory: action,
            getCategory: action,
            deleteCategory: action,
        });
    }

    async fetchCategories() {
        const res = await getAllCategories();
        this.categories = res;
    }

    async createCategory(title, color) {
        const res = await createCategory(title, color);
        this.categories.push(res);
    }

    async getCategory(id) {
        const res = await getCategory(id);
        this.selectedCategory = res;
    }

    async deleteCategory(id) {
        await deleteCategory(id);
        this.categories = this.categories.filter((category) => category.id!== id);
    }
}

const categoryModel = new CategoryModel();
export default categoryModel;