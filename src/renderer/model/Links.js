import { makeAutoObservable, action, observable } from 'mobx';
import { getLinksByCategoryId, createLink } from "../electron";

class LinkModel {
    links = [];

    constructor() {
        makeAutoObservable(this,{
            links: observable,
            fetchLinksByCategoryId: action,
            createLink: action
        });
    }

    async fetchLinksByCategoryId(id) {
        const res = await getLinksByCategoryId(id);
        this.links = res;
    }

    async createLink(title, color, categoryId) {
        const res = await createLink({
            title: title,
            color: color,
            categoryId: categoryId
        });
        this.links.push(res);
    }

}

const linkModel = new LinkModel();
export default linkModel;