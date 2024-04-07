//调用后台接口，发送异步请求
import request from "@/utils/request.js";

//提供注册接口函数，export到处到外部使用，接收外部的传参registerData
export const userRegisterService = (registerData)=>{
    //请求路径和参数，需要借助URLSearchParams将json格式封装到变量中
    const params = new URLSearchParams()
    for (let key in registerData){
        params.append(key, registerData[key]);
    }
    //将遍历后的数据封装到params中return给login.vue
    return request.post("/user/registerUser", params)
}
