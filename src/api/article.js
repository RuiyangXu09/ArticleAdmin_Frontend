import request from "@/utils/request.js";

/**
 * 文章列表查询的接口
 */
export const getArticleListService = (params) =>{
    //需要携带page和pageSize给后端做分页参数传递
    return request.get('/article/pageArticleList', {params: params})
}