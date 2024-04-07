<template>
<el-row>
    <!-- model绑定数据表单 -->
    <el-form :model = "registerData">
        <el-form-item>Register</el-form-item>
        <el-form-item>
            <el-input placeholder="Username" v-model = "registerData.username"/>
            <el-input placeholder="Password" v-model="registerData.password"/>
            <el-input placeholder="Nickname" v-model="registerData.nickname"/>
            <el-input placeholder="Email" v-model="registerData.email"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click =" register">
                Register
            </el-button>
        </el-form-item>
    </el-form>
</el-row>
</template>

<script setup>
import {User, Lock} from "@element-plus/icons-vue";
import {ref} from "vue";
import {userRegisterService} from "@/api/user.js";

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
        alert(result.msg? result.msg: 'Success!');
    }else {
        //code等于-1或其他，失败响应，前端返回响应体中msg
        alert(result.msg? result.msg: 'Failed Register.')
    }
}
</script>

<style scoped>

</style>