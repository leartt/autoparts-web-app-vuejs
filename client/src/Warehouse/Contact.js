import axios from 'axios';
import { router } from '../main';

const state = {
    contactError: null,
    contactMsg: null,
};

const getters = {
    contactError: state => state.contactError,
    contactMsg: state => state.contactMsg,
};

const actions = {
    
    async submitContact({ commit }, contact) {
        try {
            let response = await axios.post('http://localhost:5500/contact/add', contact);
            if (response.data.success) {
                commit('set_contact_success', response.data.msg);
                setTimeout(() => {
                    commit('set_contact_success', null);
                }, 3000)
            }
            return response;
        }
        catch (err) {
            commit('set_contact_error', err.response.data.msg);
        }
    },


};

const mutations = {
    set_contact_error(state, err) {
        state.contactError = err;
    },
    set_contact_success(state, msg) {
        state.contactMsg = msg;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
