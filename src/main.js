import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://43.138.75.58:8080'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
