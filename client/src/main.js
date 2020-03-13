import Vue from 'vue'

import store from './store';

import axios from 'axios';

import { routes } from './routes';

import App from './App.vue'
import VueRouter from 'vue-router';


Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthenticate)) {
        if (!store.getters.isLoggedIn) {
              next('/login');
        }
        else {
              next();
        }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isLoggedIn) {
              next('/profile');
        }
        else {
              next();
        }
  }
  else {
        next();
  }
})

Vue.prototype.$http = axios;
const token = localStorage.getItem("token");

if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
