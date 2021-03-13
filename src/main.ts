import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store'
import '@/assets/css/base.css'
import '@/assets/css/tailwind.css'
import './plugins/vue-tailwind'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
