//调用后台接口，发送异步请求
import request from "@/utils/request.js";

/**
 * 提供文章分类的列表查询接口，不需要请求参数
 */
export const categoryListService = () =>{
    //后台api的请求路径，method为get
    return request.get('/category/getCategoryList');
}