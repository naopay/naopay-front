import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Order from '@/views/order/Order.vue'
import Transactions from '@/views/transactions/Transactions.vue'
import Signup from '@/views/Signup.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/order',
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
    alias: '/',
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
