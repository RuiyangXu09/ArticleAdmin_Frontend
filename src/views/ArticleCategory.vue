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