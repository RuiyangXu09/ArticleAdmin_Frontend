import { createApp } from 'vue'
//导入UI组件库
import ElementPlus from 'element-plus'
//导入路由
import router from "@/router/index.js";
//导入pinia实现状态共享库
import {createPinia} from "pinia";
import 'element-plus/dist/index.css'
import App from './App.vue'
//导入pinia持久化插件
import {createPersistedState} from "pinia-persistedstate-plugin";

const app = createApp(App)
//定义一个实例来使用createPinia方法，使用persist持久化pinia，因为pinia默认为内存存储，刷新浏览器就会丢失数据
const pinia = createPinia();
//使用pinia持久化插件
const persist = createPersistedState();
pinia.use(persist);

//在vue应用中使用element plus组件
app.use(ElementPlus);
//在vue应用中使用router
app.use(router);
//在vue应用中使用pinia实例，然后在stores文件夹中新建一个store.js来定义store
app.use(pinia);

app.mount('#app')
