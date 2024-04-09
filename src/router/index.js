//导入导入vue router
import {createRouter, createWebHistory} from "vue-router";
//导入需要展示的组件
import Register from "@/views/Register.vue";
import Login from '@/views/Login.vue';
import Home from "@/views/Home.vue";
//引入子路由需要展示的页面
import ArticleCategory from "@/views/ArticleCategory.vue";
import ArticleManagement from "@/views/ArticleManagement.vue";
import UserAvatar from "@/views/UserAvatar.vue";
import UserInfo from "@/views/UserInfo.vue";
import UserResetPassword from "@/views/UserResetPassword.vue";


//定义路由路径关系
const routes = [
    //路径名为空时，跳转home页面
    {path: '/', component: Home,
        //redirect将会访问url空字符串时重定向到article管理页面
        redirect: '/article/manage',
        //引入子路由
        children:[
            //设置映射关系，设置好后，去home页面中的main部分，设置router-view标签
            {path: '/article/category', component: ArticleCategory},
            {path: '/article/manage', component: ArticleManagement},
            {path: '/user/info', component: UserInfo},
            {path: '/user/resetPassword', component: UserResetPassword},
            {path: '/user/avatar', component: UserAvatar}
        ]
    },
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/home', component: Home,
        //redirect将会访问url空字符串时重定向到article管理页面
        redirect: '/article/manage',
        //引入子路由
        children:[
            //设置映射关系，设置好后，去home页面中的main部分，设置router-view标签
            {path: '/article/category', component: ArticleCategory},
            {path: '/article/manage', component: ArticleManagement},
            {path: '/user/info', component: UserInfo},
            {path: '/user/resetPassword', component: UserResetPassword},
            {path: '/user/avatar', component: UserAvatar}
        ]
    },
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//抛出路由
export default router;