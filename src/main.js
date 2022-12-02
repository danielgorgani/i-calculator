import { createApp } from 'vue'
import App from './App.vue'

import CalcComp from './components/CalcComp.vue'

const app = createApp(App)

app.component('calc-comp', CalcComp)

app.mount('#app')
