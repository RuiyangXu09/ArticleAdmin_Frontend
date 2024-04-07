/**
 * 定制请求实例
 */
//引入axios
import axios from "axios";
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
        alert("Server Error.");
        //将异步的状态转换成失败的状态
        return Promise.reject(error);
    }
)
//抛出instance
export default instance;