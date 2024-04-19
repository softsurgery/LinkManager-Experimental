import { makeAutoObservable, action, observable } from 'mobx';
import { getAllCategories,createCategory,getCategory } from "../electron";

class CategoryModel {
    categories = [];
    selectedCategory = null;

    constructor() {
        makeAutoObservable(this,{
            categories: observable,
            fetchCategories: action,
            createCategory: action,
            getCategory: action,
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
}

const categoryModel = new CategoryModel();
export default categoryModel;