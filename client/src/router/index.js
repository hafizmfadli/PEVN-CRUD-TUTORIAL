import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import EmployeeRegistration from '../views/EmployeeRegistration.vue'
import EmployeeEdit from '../views/EmployeeEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/details/:id/:name',
    component: EmployeeDetails
  },
  {
    path: '/register-new-employee',
    component: EmployeeRegistration
  },
  {
    path: '/edit/:id/:name',
    component: EmployeeEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
