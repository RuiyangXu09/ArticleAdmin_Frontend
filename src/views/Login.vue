<template>
    <el-container class="login-page">
        <el-aside class="el-aside-login">Article Management Admin System</el-aside>
        <el-main>
            <el-header height="200px" class="el-header-login">Article Management Login</el-header>
            <!-- :model绑定数据表单 -->
            <el-form :model="loginData" class="el-form-login">
                <el-form-item>
                    <el-input placeholder="Username" :prefix-icon="User" v-model="loginData.username"/>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="Password" :prefix-icon="Lock" v-model="loginData.password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">
                        Login
                    </el-button>
                    <el-button @click="register">
                        Register
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script setup>
import {ref} from "vue";
import {userLoginService} from "@/api/user.js";
import {ElMessage} from "element-plus";
import {User, Lock} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
//导入pinia定义的token共享方法
import {useTokenStore} from "@/stores/token.js";

//调用useTokenStore函数得到的内容，由变量tokenStore接收
const tokenStore = useTokenStore();
//调用useRouter函数得到的内容，由变量router接收
const router = useRouter();

//封装响应数据模型
const loginData = ref({
    username: "",
    password: ""
})

//调用登录接口
const login = async () =>{
    //调用接口，传入数据模型.value的数据，赋值给变量result
    let result = await userLoginService(loginData.value);
    //判断code值和成功/失败响应
    if (result.code === 0){
        //如果返回msg则显示响应体中msg内容，如果不是则返回自定义内容
        ElMessage.success(result.msg? result.msg: 'Login Success.');
        //登录成功后，得到了token，应该放入pinia中共享在资源库，在需要携带token的地方使用
        tokenStore.setToken(result.data);

        await router.push('/home');
    }else {
        //如果返回msg则显示响应体中msg内容，如果不是则返回自定义内容
        ElMessage.error(result.msg? result.msg: 'Login Failed.');
    }
}

//路由跳转到register页面
const register = async () => {
    await router.push('/register');
}
</script>

<style lang="less" scoped>
.login-page{
    height: 100vh;
    background-color: white;
    font-family: "Arial",fantasy;
    font-size: 25px;
    .el-aside-login{
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-header-login{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .el-form-login{
        justify-content: center;
        align-items: center;
        margin-left: 80px;
    }
}
</style>