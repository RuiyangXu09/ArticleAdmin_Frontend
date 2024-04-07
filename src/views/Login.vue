<template>
    <el-container class="login-page">
        <el-aside class="el-aside">Article Management Admin System</el-aside>
        <el-main>
            <el-header height="200px" class="el-header">Article Management Login</el-header>
            <!-- :model绑定数据表单 -->
            <el-form :model="loginData">
                <el-form-item class="el-form-item">
                    <el-input placeholder="Username" v-model="loginData.username"/>
                </el-form-item>
                <el-form-item class="el-form-item">
                    <el-input placeholder="Password" v-model="loginData.password"/>
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
import {useRouter} from "vue-router";
//调用路由器跳转到其他页面
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
    }else {
        //如果返回msg则显示响应体中msg内容，如果不是则返回自定义内容
        ElMessage.error(result.msg? result.msg: 'Login Failed.');
    }
}

//路由跳转到register页面
const register = async () =>{
    await router.push('/register');
}
</script>

<style lang="scss" scoped>
.login-page{
    height: 100vh;
    background-color: white;
    font-family: "Arial",fantasy;
    font-size: larger;
    .el-aside{
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-header{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-form-item{
        margin-left: 80px;
    }
}
</style>