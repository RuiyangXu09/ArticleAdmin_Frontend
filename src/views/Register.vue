<template>
    <el-container class=login-page>
        <el-aside class="el-aside">Article Management Admin System</el-aside>
        <el-main>
            <el-header height="200px" class="el-header">Article Management Register</el-header>
            <!-- :model绑定数据表单 -->
            <el-form :model = "registerData">
                <el-form-item class="el-form-item">
                    <el-input placeholder="Username" v-model = "registerData.username"/>
                </el-form-item>
                <el-form-item class="el-form-item">
                    <el-input placeholder="Password" v-model="registerData.password"/>
                </el-form-item>
                <el-form-item class="el-form-item">
                    <el-input placeholder="Nickname" v-model="registerData.nickname"/>
                </el-form-item>
                <el-form-item class="el-form-item">
                    <el-input placeholder="Email" v-model="registerData.email"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click ="register">
                        Register
                    </el-button>
                    <el-button @click="login">
                        Login
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script setup>
import {User, Lock} from "@element-plus/icons-vue";
import {ref} from "vue";
import {userRegisterService} from "@/api/user.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
//调用路由器跳转到其他页面
const router = useRouter();

//定义数据模型用于接收表单中的数据
const registerData = ref({
    username: "",
    password: "",
    nickname: "",
    email: ""
})

//点击register按钮后通过click事件调用后台接口完成注册
const register = async () =>{
    //异步等待调用，直接调用封装好的数据模型registerData中，但是registerData是一个响应式对象，如果需要获取值，需要.value
    let result = await userRegisterService(registerData.value)
    //判断result的响应数据中，是否包含code，如果包含code是否等于0
    if (result.code === 0){
        //code等于0，成功响应，前端返回响应体中msg
        ElMessage.success(result.msg? result.msg: 'Success!');
    }else {
        //code等于-1或其他，失败响应，前端返回响应体中msg
        ElMessage.error(result.msg? result.msg: 'Failed Register.');
    }
}

//点击login按钮，页面跳转到login page，使用router
const login = async () =>{
    await router.push('/login');
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