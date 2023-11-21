import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://1.15.30.244:5000'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
