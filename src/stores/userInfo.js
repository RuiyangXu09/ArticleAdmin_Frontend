/**
 * 导入pinia模块，存储个人信息，在多个页面中共享
 */
import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserInfoStore = defineStore('userInfo', () =>{
    //定义状态相关的内容
    const info = ref({})
    //设置info
    const setInfo = (newInfo) =>{
        info.value = newInfo;
    }
    //清除info
    const removeInfo = () =>{
        info.value = {};
    }

    return {
        info,
        setInfo,
        removeInfo
    };
},{
    persist:true
})