//导入导入vue router
import {createRouter, createWebHistory} from "vue-router";
//导入需要展示的组件
import Register from "@/views/Register.vue";
import Login from '@/views/Login.vue';
import Home from "@/views/Home.vue";

//定义路由路径关系
const routes = [
    //路径名为空时，跳转home页面
    {path: '/', component: Home},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/home', component: Home}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//抛出路由
export default router;