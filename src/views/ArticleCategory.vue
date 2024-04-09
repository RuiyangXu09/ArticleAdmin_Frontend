<template>
  <el-card class="category-container">
      <template #header>
          <div class="header">
              <span>Article Category Management</span>
              <div>
                  <el-button type="primary">Add Category</el-button>
              </div>
          </div>
      </template>
      <el-table :data="categories" border>
          <el-table-column label="ID" prop="id" width="110px"/>
          <el-table-column label="Category Name" prop="categoryName"/>
          <el-table-column label="Create User" prop="createUser"/>
          <el-table-column label="Operation" width="130px">
              <template #default="{row}">
                  <el-button :icon="Edit" circle plain type="primary"></el-button>
                  <el-button :icon="Delete" circle plain type="danger"></el-button>
              </template>
          </el-table-column>
          <template #empty>
              <el-empty description="No Data..."/>
          </template>
      </el-table>
  </el-card>
</template>

<script setup>
import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
//调用文章分类的api接口
import {categoryListService} from "@/api/category.js";

//定义分类名的响应式数据模型
const categories = ref([
    {
        "id": 1,
        "categoryName": "category1",
        "createUser": "user1"
    },
    {
        "id": 2,
        "categoryName": "category2",
        "createUser": "user1"
    },
    {
        "id": 3,
        "categoryName": "category3",
        "createUser": "user2"
    }
])

//声明一个异步函数，因为调用时需要同步等待调用结果
const articleCategory = async () =>{
    //get方法请求，不需要传入参数，赋值给result变量使用
    let result =  await categoryListService()
    //将result.data赋值给数据模型的value进行渲染
    categories.value = result.data;
}
//调用对应方法
articleCategory();
</script>

<style lang="less" scoped>
.category-container{
  min-height: 100%;
  box-sizing: border-box;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>