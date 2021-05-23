import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Order from "@/views/order/Order.vue";
import Transactions from "@/views/transactions/Transactions.vue";
import Login from "@/views/Login.vue";
import { walletModule } from "@/store/wallet";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/order",
    name: "Order",
    component: Order
  },
  {
    path: "/tx",
    name: "Transactions",
    component: Transactions
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !walletModule.isAuthenticated) next({ name: 'Login' });
  else next();
});

export default router;
