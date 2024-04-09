import { createApp } from 'vue'
//导入UI组件库
import ElementPlus from 'element-plus'
//导入路由
import router from "@/router/index.js";
//导入pinia实现状态共享库
import {createPinia} from "pinia";
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
//定义一个实例来使用createPinia方法
const pinia = createPinia();

//在vue应用中使用element plus组件
app.use(ElementPlus);
//在vue应用中使用router
app.use(router);
//在vue应用中使用pinia实例，然后在stores文件夹中新建一个store.js来定义store
app.use(pinia);

app.mount('#app')
