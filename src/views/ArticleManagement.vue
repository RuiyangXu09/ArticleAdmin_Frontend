<template>
  <el-card class="article-container">
      <!-- 新增文章的按钮 -->
      <template #header>
          <div class="header">
              <span>Article Management</span>
              <el-button type="primary">Publish Article</el-button>
          </div>
      </template>
      <!-- 条件搜索的下拉框 -->
      <el-form inline>
          <!-- 分类选择的下拉框 -->
<!--          <el-form-item label="Category">-->
<!--              <el-select placeholder="Please Select" v-model="categoryId" style="width: 200px">-->
<!--                  <el-option-->
<!--                          v-for="c in categories"-->
<!--                          :key="c.id"-->
<!--                          :label="c.categoryName"-->
<!--                          :value="c.id"-->
<!--                  />-->
<!--              </el-select>-->
<!--          </el-form-item>-->
          <!-- 发布状态的下拉选择框 -->
          <el-form-item label="State">
              <el-select placeholder="Please Select" v-model="state" style="width: 200px">
                  <el-option label="Published" value="Published"/>
                  <el-option label="Unpublished" value="Unpublished"/>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">Searching</el-button>
              <el-button>Reset</el-button>
          </el-form-item>
      </el-form>
      <!-- 搜索框 -->
      <el-form>
          <el-form-item>
              <el-input :prefix-icon="Search" placeholder="Please input Article Title..." style="width: 250px" clearable/>
              <el-button  type="primary" :icon="Search">Searching</el-button>
          </el-form-item>
      </el-form>
      <div>
          <!-- 文章数据渲染表格 -->
          <el-table border :data="articles">
              <!-- prop将把数据模型中对应的数据响应给组件 -->
              <el-table-column label="ID" prop="id" width="110px"/>
              <el-table-column label="Title" prop="title"/>
              <el-table-column label="Category" prop="categoryName"/>
              <el-table-column label="Create Time" prop="createTime"/>
              <el-table-column label="State" prop="state"/>
              <el-table-column label="Operation" width="130px">
                  <!-- #default="{row}"用于获取当前点击的row所在的数据内容，也就能获取row对应的数据的id -->
                  <template #default="{row}">
                      <!-- 绑定编辑弹窗的单击事件 -->
                      <el-button :icon="Edit" circle plain type="primary"/>
                      <el-button :icon="Delete" circle plain type="danger"/>
                  </template>
              </el-table-column>
              <!-- 空数据渲染 -->
              <template #empty>
                  <el-empty description="No Data..."/>
              </template>
          </el-table>
          <!-- 分页条渲染 -->
          <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-size="[3, 5, 10, 15]"
                         layout="jumper, total, sizes, prev, pager, next" background :total="totalRows" @size-change="onSizeChange"
                         @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end"/>
      </div>
  </el-card>
</template>

<script setup>
import {Delete, Edit, Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import {getArticleListService} from "@/api/article.js";
//用户搜索时选择的发布状态
const state = ref('');
/**
 * 分页条数据模型
 */
//当前页码
const page = ref(1);
//总数据条数
const totalRows = ref(20)
//每页显示的条数
const pageSize = ref(5);

/**
 * 当每页显示的数据条数发生变化，调用此函数
 * @param size 条数
 */
const onSizeChange = (size) =>{
    pageSize.value = size;
    //每页显示的数据条数发生变化后，调用获取文章列表的数据渲染的函数刷新渲染
    articleList();
}
/**
 * 当前页码发生变化，调用此函数
 * @param num 页码数
 */
const onCurrentChange = (num) =>{
    page.value = num;
    //页码发生变化后，调用获取文章列表的数据渲染的函数刷新渲染
    articleList();
}

/**
 * 获取文章列表的数据渲染
 */
//在数据表格中，获取的时categoryId而不是name，需要调用查询所有分类名的接口，通过本接口中找到的id查找对应的分类名名字
import {categoryListService} from "@/api/category.js";
//文章的数据响应模型
const articles = ref()
//获取文章的api的调用
const articleList = async () => {
    //向api接口中的参数params中需要传递的参数组，page和pageSize需要传递的时.value数据
    let params = {page: page.value, pageSize: pageSize.value}
    let result = await getArticleListService(params);
    //渲染结果视图 totalRows和rows需要与后端pageBean中保持一致
    totalRows.value = result.data.totalRows;
    articles.value = result.data.rows;
}
//调用函数回显数据
articleList();
</script>

<style lang="less" scoped>
.article-container{
  min-height: 100%;
  box-sizing: border-box;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>