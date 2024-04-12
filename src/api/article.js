import request from "@/utils/request.js";

/**
 * 文章列表查询的接口
 */
export const getArticleListService = (params) =>{
    //需要携带page和pageSize给后端做分页参数传递
    return request.get('/article/pageArticleList', {params: params})
}

/**
 * 删除文章的接口
 */
export const deleteArticleService = (id) =>{
    return request.delete('/article/deleteArticle?id=' + id);
}

/**
 * 新增文章的接口
 * @param articleData 前端传的json格式的article数据模型
 */
export const addArticleService = (articleData) =>{
    return request.post('/article/addArticle', articleData);
}