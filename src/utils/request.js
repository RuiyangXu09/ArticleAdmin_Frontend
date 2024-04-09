/**
 * 定制请求实例
 */
//引入axios
import axios from "axios";
import {ElMessage} from "element-plus";
import {useTokenStore} from "@/stores/token.js";
//定义一个变量记录公共前缀
const baseURL = '/api';
const instance = axios.create({baseURL})

//添加响应拦截器
instance.interceptors.response.use(
    result =>{
        //成功响应，直接返回数据
        return result.data;
    },
    error => {
        //失败响应
        ElMessage.error('Server Error.')
        //将异步的状态转换成失败的状态
        return Promise.reject(error);
    }
)

//添加请求拦截器，简化api接口中的return request.get('/category/getCategoryList', {headers:{'token': token}}); 请求头部分的内容
instance.interceptors.request.use(
    //请求前的回调
    (config) =>{
        //需要获取到token并添加到config变量
        const tokenStore = useTokenStore();
        //判断是否包含token
        if (tokenStore.token){
            //有，就将tokenStore中保存的token值赋值给config中的请求头，config.headers.token中 token需要与后端api的请求中的名对应
            config.headers.token = tokenStore.token;
        }
        //返回config
        return config;
    },
    //请求发生错误后的回调
    (error) =>{
        //请求错误将异步转换为失败
        return Promise.reject(error);
    }
)


//抛出instance
export default instance;