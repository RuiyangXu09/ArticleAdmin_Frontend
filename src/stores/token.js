//导入defineStore方法来定义store
import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * defineStore需要2个参数
 * 1，名字，唯一性
 * 2，函数，内部定义函数的所有内容
 *
 * 返回值是一个函数
 */
//导出token使用
export const useTokenStore = defineStore('token', ()=>{
    //定义状态内容
    //1，定义一个token，响应式变量
    const token = ref('');
    //2，定义一个函数，用于修改token值，接收传入的newToken参数
    const setToken = (newToken) =>{
        //token响应式变量被newToken传入的值赋值
        token.value = newToken;
    }
    //3，移除token
    const removeToken = () =>{
        //token的value直接赋值为空
        token.value = '';
    }
    //返回这三个变量
    return {
        token,
        setToken,
        removeToken
    }
});