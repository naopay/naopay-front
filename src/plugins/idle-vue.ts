import Vue from "vue";
import store from "@/store";
// @ts-ignore
import IdleVue from 'idle-vue';

Vue.use(IdleVue, {
  startAtIdle: false,
  idleTime: 10 * 60000, // 10 minutes
  store 
});
