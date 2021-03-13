import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Order from '@/views/Order.vue'
import Items from '@/views/Items.vue'
import Transactions from '@/views/Transactions.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/order',
    alias: '/',
    name: 'Order',
    component: Order,
    children: [
      {
        path: ':id',
        component: Items
      }
    ]
  },
  {
    path: '/tx',
    name: 'Transactions',
    component: Transactions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
