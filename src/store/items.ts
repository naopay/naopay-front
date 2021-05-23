import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import store from "@/store";
import { http } from "@/services/http";
import { Category } from "@/models/category";
import { Item } from "@/models/item";
import { Extra } from "@/models/extra";

@Module
class ItemsModule extends VuexModule {
  currentCategory: Category | undefined = undefined;
  currentItem: Item | undefined = undefined;
  categories: Category[] = [];

  get currentItems(): Item[] {
    return this.currentCategory?.items ?? [];
  }

  get currentExtras(): Extra[] {
    return this.currentItem?.extras ?? [];
  }

  @Mutation
  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Mutation
  setCategoryItems(params: { categoryId: string; items: Item[] }) {
    const category = this.categories.find(cat => cat._id === params.categoryId);
    if (category) {
      category.items = params.items;
      this.currentCategory = category;
    }
  }

  @Mutation
  setCurrentItem(item: Item | undefined) {
    this.currentItem = item;
  }

  @Action
  async fetchCategories() {
    if (this.categories?.length) return;
    
    const res = await http.get('/categories');
    if (res.status === 200) {
      this.setCategories(res.data);
    }
  }

  @Action
  async selectCategory(categoryId: string) {
    const res = await http.get<Item[]>(`/categories/${categoryId}`);
    if (res.status === 200) {
      this.setCurrentItem(undefined);
      this.setCategoryItems({ categoryId: categoryId, items: res.data });
    }
  }

  @Action
  selectItem(itemId: string) {
    const selected = this.currentCategory?.items.find(it => it._id === itemId);
    if (!selected) return;
    this.setCurrentItem(selected);
  }
}

export const itemsModule = new ItemsModule({ store, name: "items" })