//调用后台接口，发送异步请求
import request from "@/utils/request.js";
//调用pinia共享资源
import {useTokenStore} from "@/stores/token.js";

/**
 * 提供文章分类的列表查询接口，不需要请求参数
 */
export const categoryListService = () =>{
    //在调用后台api请求获得数据前，获取token
    const tokenStore = useTokenStore();
    const token = tokenStore.token;
    //后台api的请求路径，method为get，在请求头中携带token，在pinia中定义的响应式数据，不需要.value
    //return request.get('/category/getCategoryList', {headers:{'token': token}});
    //在请求拦截器中验证了token
    return request.get('/category/getCategoryList');
}

/**
 * 新增文章分类
 * @param categoryData 前端传入的数据模型，json格式
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addCategoryService = (categoryData) => {
    //将参数传递给后端
  return request.post('/category/addCategory', categoryData);
}

/**
 * 修改文章分类名
 * @param categoryData 前端传入的数据模型，json格式
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const updateCategoryService = (categoryData) =>{
    return request.put('/category/updateCategory', categoryData);
}