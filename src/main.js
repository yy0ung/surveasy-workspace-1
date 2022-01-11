import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import browserDetect from 'vue-browser-detect-plugin'
// import VueGtag from "vue-gtag"



createApp(App).use(store).use(router).mount('#app')


