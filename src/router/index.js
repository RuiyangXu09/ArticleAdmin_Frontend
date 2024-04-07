//导入导入vue router
import {createRouter, createWebHistory} from "vue-router";
//导入需要展示的组件
import Register from "@/views/Register.vue";
import Login from '@/views/Login.vue';

//定义路由路径关系
const routes = [
    {path: '/register', component: Register},
    {path: '/login', component: Login}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//抛出路由
export default router;