<template>
<el-row>
    <el-form :model="loginData">
        <el-form-item>Login</el-form-item>
        <el-form-item>
            <el-input placeholder="Username" v-model="loginData.username"/>
        </el-form-item>
        <el-form-item>
            <el-input placeholder="Password" v-model="loginData.password"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">
                Login
            </el-button>
            <el-button>
                Register
            </el-button>
        </el-form-item>
    </el-form>
</el-row>
</template>

<script setup>
import {ref} from "vue";
import {userLoginService} from "@/api/user.js";
import {ElMessage} from "element-plus";
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
</script>

<style lang="scss" scoped>

</style>