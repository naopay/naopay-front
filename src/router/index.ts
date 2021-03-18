import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Order from '@/views/Order.vue'
import Items from '@/views/Items.vue'
import Signup from '@/views/Signup.vue'
import Transactions from '@/views/Transactions.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/order',
    alias: '/',
    name: 'Order',
    component: Order
  },
  {
    path: '/tx',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
