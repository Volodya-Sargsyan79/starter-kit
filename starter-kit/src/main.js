import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@core/utils/plugins'
import axios from './axios' // Import the Axios instance
import VueAxios from "vue-axios"

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'

// Create vue app
const app = createApp(App)
app.use(VueAxios, axios)

// Register plugins
registerPlugins(app)

app.provide("axios", axios)

// Mount vue app
app.mount('#app')
