import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// styles
import "@/assets/css/base.css";
import "@/assets/css/tailwind.css";

// plugins
import "@/plugins/idle-vue";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");