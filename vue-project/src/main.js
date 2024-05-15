import './assets/main.css'

import { createApp } from 'vue' //function used for the creation of app
import { createPinia } from 'pinia'

import App from './App.vue' //this is the main component that is imported i.e. root component, which contains all other components
import router from './router'

const app = createApp(App) //App = root component

app.use(createPinia())
app.use(router)

app.mount('#app') //renders the component which essentially means its where contents are loaded into web page when called.
