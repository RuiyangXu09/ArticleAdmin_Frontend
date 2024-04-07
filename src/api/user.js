//调用后台接口，发送异步请求
import request from "@/utils/request.js";

/**
 * 提供注册接口函数，export到处到外部使用，接收外部的传参registerData
 */
export const userRegisterService = (registerData)=>{
    //请求路径和参数，需要借助URLSearchParams将json格式封装到变量中
    const params = new URLSearchParams()
    for (let key in registerData){
        //遍历并添加到params中，返回给前端页面
        params.append(key, registerData[key]);
    }
    //将遍历后的数据封装到params中return给login.vue
    return request.post("/user/registerUser", params)
}

/**
 * 提供登录功能的接口函数
 */
export const userLoginService = (loginData)=>{
    //请求格式不是json，需要转换并封装
    const params = new URLSearchParams();
    for (let key in loginData){
        //遍历并添加到params中，返回给前端页面
        params.append(key, loginData[key]);
    }
    //将结果return给页面处理
    return request.post("/user/login", params);
}
