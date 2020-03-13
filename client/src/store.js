import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Warehouse/Auth';
import Products from './Warehouse/Products';
import Contact from './Warehouse/Contact';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        Products,
        Contact
    },
    getters: {

    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})