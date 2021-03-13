import axios from "axios"

export const items = {
    namespaced: true,
    state: () => ({
        categories: []
    }),
    mutations: {
        setCategories(state: any, categories: any[]) {
            state.categories = categories
        }
    },
    actions: {
        async fetchCategories({ commit }: any) {
            const res = await axios.get('http://localhost:3000/categories');
            let categories = []
            if (res.status === 200) {
                categories = res.data
            }
            commit('setCategories', categories)
        }
    },
    getters: {

    }
}