import axios from 'axios';
import { router } from '../main';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    postedUser: {},
    status: '',
    successMessage: null,
    error: null,
    users: [],
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    postedUser: state => state.postedUser,
    successMessage: state => state.successMessage,
    error: state => state.error,
    users: state => state.users
};

const actions = {
    //Login action
    async login({ commit }, user) {
        commit('auth_request')
        try {
            let res = await axios.post('http://localhost:5500/user/login', user);

            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                //Ruajtja e token ne localstorage
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }

            return res;
        }
        catch (err) {
            commit('auth_error', err);
        }
    },



    //Register
    async register({ commit }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5500/user/register', userData);
            if (res.data.success) {
                commit('register_success', res.data.msg);
            }
            return res;
        }
        catch (err) {
            commit('register_error', err);
        }
    },

    //Logout the user
    async logout({ commit }) {
        localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return;
    },

    async getProfile({ commit }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:5500/user/profile');
        commit('user_profile', res.data.user);
        return res;
    },

    async getUserById({ commit }, id) {
        let res = await axios.get('http://localhost:5500/user/find/' + id);
        commit('get_user', res.data);
        return res;
    },

    async getUsers({ commit }) {
        let res = await axios.get('http://localhost:5500/user');
        commit('set_users', res.data);
    }
};

const mutations = {
    auth_request(state) {
        state.error = null;
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success';
        state.error = null;
    },
    auth_error(state, err) {
        state.error = err.response.data.msg;
    },
    register_request(state) {
        state.error = null;
        state.status = 'loading'
    },
    register_error(state, err) {
        state.error = err.response.data.msg;
    },
    register_success(state, message) {
        state.error = null;
        state.successMessage = message;
        state.status = 'success'
    },
    logout(state) {
        state.error = null;
        state.token = '';
        state.user = {};
        state.status = '';
    },
    profile_request(state) {
        state.status = 'loading';
    },
    user_profile(state, user) {
        state.user = user;
    },
    get_user(state, user) {
        state.postedUser = user;
    },
    set_users(state, users) {
        state.users = users;
    }
};

export default {
    state,
    getters,
    actions,
    mutations

}
