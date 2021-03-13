import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { http } from "@/plugins/http";
import { Category } from "@/models/category";
import { Item } from "@/models/item";
import store from "@/store/store";

@Module
class ItemsModule extends VuexModule {
    categories: Category[] = []

    @Mutation
    setCategories(categories: Category[]) {
        this.categories = categories
    }

    @Mutation
    setCategoryItems(params: { categoryId: string, items: Item[] }) {
        const category = this.categories.find(cat => cat._id === params.categoryId)
        if (category) {
            category.items = params.items
        }
    }

    @Action
    async fetchCategories() {
        const res = await http.get('/categories');
        if (res.status === 200) {
            this.setCategories(res.data)
        }
    }

    @Action
    async fetchItems(categoryId: string) {
        const res = await http.get<Item[]>(`/categories/${categoryId}`)
        if (res.status === 200) {
            this.setCategoryItems({ categoryId: categoryId, items: res.data })
        }
    }
}

export const itemsModule = new ItemsModule({ store, name: "items" });