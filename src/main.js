import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "@/router/index.js";

const app = createApp(App)
//导入element plus组件
app.use(ElementPlus);
//导入router
app.use(router);

app.mount('#app')
