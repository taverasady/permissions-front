import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import ManageTypes from '../views/manage-types.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage-types',
    name: 'ManageTypes',
    component: ManageTypes
  },
]

const router = new VueRouter({
  routes
})

export default router
