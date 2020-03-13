import axios from 'axios';
import { router } from '../main';

const state = {
    products: [],
    singleProduct: {},
    search: '',
    error_message: null,
    success_message: null,
    categories: [
        'Wheel', 'Transimissions', 'Lights', 'Tires', 'Mirrors', 'Brakes', 'Air Filters', 'Car Care', 'Others'
    ]
};

const getters = {
    products: state => state.products,
    singleProduct: state => state.singleProduct,
    search: state => state.search,
    error_message: state => state.error_message,
    success_message: state => state.success_message,
    categories: state => state.categories,
};

const actions = {
    //Login action
    async fetchProducts({ commit }) {
        const response = await axios.get('http://localhost:5500/product');
        commit('set_products', response.data);
    },

    async addProduct({ commit }, product) {
        try {
            let response = await axios.post('http://localhost:5500/product/add', product);
            
            if (response.data.success) {
                commit('set_success_message', response.data.msg)
                setTimeout(() => {
                    commit('set_success_message', null)
                }, 3000)    
            }
            
            return response;
        }
        catch (err) {
            commit('set_error_message', err.response.data.msg);
            setTimeout(() => {
                commit('set_error_message', null);
            }, 3000)
        }
    },

    async editProduct({ commit }, product) {
        try {
            const response = await axios.put(`http://localhost:5500/product/${product._id}`, product);
            if (response.data.success) {
                commit('set_success_message', response.data.msg)
                setTimeout(() => {
                    commit('set_success_message', null)
                }, 3000)    
            }
            return response;
        }
        catch (err) {
            commit('set_error_message', err.response.data.msg);
            setTimeout(() => {
                commit('set_error_message', null);
            }, 3000)
        }
    },

    async deleteProduct({ commit }, id) {
        const response = await axios.delete(`http://localhost:5500/product/${id}`);
        commit('delete_product', id)
        return response;
    },

    async getProductById({ commit }, id) {
        const response = await axios.get('http://localhost:5500/product/' + id);
        commit('set_single_product', response.data.product);
        return response;
    },

    async searchProduct({ commit }, search) {
        commit('set_search', search);
    },

    async sortProduct({ commit }, prop) {
        const sortedProducts = state.products.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
        commit('set_sort_product', sortedProducts);
    },

};

const mutations = {
    set_products(state, products) {
        state.products = products;
        state.filteredProducts = products;
    },
    set_single_product(state, singleProduct) {
        state.singleProduct = singleProduct;
    },
    delete_product(state, id) {
        state.products = state.products.filter(p => {
            return p._id != id;
        });
    },
    set_search(state, search) {
        state.search = search;
    },
    set_sort_product(state, sortedProducts) {
        state.products = sortedProducts;
    },
    set_error_message(state, msg) {
        state.error_message = msg
    },
    set_success_message(state, msg) {
        state.success_message = msg;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
