import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueSimpleScroller from 'vue-simple-scroll'
Vue.use(VueSimpleScroller)

import './assets/reset.css';

import axios from 'axios'
Vue.prototype.$http = axios

// Vue.config.silent = true

import App from './App.vue'

import Index from './components/Index.vue'
import RefreshAndInfinite from './components/RefreshAndInfinite.vue'
import TabRefreshAndInfinite from './components/TabRefreshAndInfinite.vue'
import LoadMore from './components/LoadMore.vue'
import CustomSpinner from './components/CustomSpinner.vue'
import prestrainLoad from './components/prestrainLoad.vue'

const routes = [
  { path: '/', component: Index }
  ,{ path: '/refreshAndInfinite', component: RefreshAndInfinite }
  ,{ path: '/tabRefreshAndInfinite', component: TabRefreshAndInfinite }
  ,{ path: '/customSpinner', component: CustomSpinner }
  ,{ path: '/LoadMore', component: LoadMore }
  ,{ path: '/prestrainLoad', component: prestrainLoad }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})

