<template>
  <el-card class="article-container">
      <!-- 新增文章的按钮 -->
      <template #header>
          <div class="header">
              <span>Article Management</span>
              <!-- 点击添加文章的button后，将addArticleVisible事件的值设为true -->
              <el-button type="primary" @click="addArticleVisible = true">Publish Article</el-button>
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
              <!-- 回显图片 -->
              <el-table-column label="Cover Image" prop="coverImg">
                  <template #default="scope">
                      <div style="display: flex; align-items: center">
                          <el-image :src="scope.row.coverImg"/>
                      </div>
                  </template>
              </el-table-column>
              <el-table-column label="Category" prop="categoryName"/>
              <el-table-column label="Create Time" prop="createTime"/>
              <el-table-column label="Create User" prop="username"/>
              <el-table-column label="State" prop="state"/>
              <el-table-column label="Operation" width="130px">
                  <!-- #default="{row}"用于获取当前点击的row所在的数据内容，也就能获取row对应的数据的id -->
                  <template #default="{row}">
                      <!-- 绑定编辑弹窗的单击事件 -->
                      <el-button :icon="Edit" circle plain type="primary" @click="editArticleById(row)"/>
                      <el-button :icon="Delete" circle plain type="danger" @click="deleteArticleById(row)"/>
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
      <div>
          <!-- 添加文章的页面 -->
          <!-- 抽屉组件 -->
          <el-drawer v-model="addArticleVisible" title="Add Article" class="add-article">
              <!-- 添加文章的表单 -->
              <el-form v-model="articleDetails">
                  <el-form-item label="Title">
                      <el-input v-model="articleDetails.title" placeholder="Please input Article Title"/>
                  </el-form-item>
                  <!-- 文章分类选择器 -->
                  <el-form-item label="Category">
                      <el-select placeholder="Please Select Category" v-model="articleDetails.categoryId">
                          <el-option v-for="c in categories" :key="c.id" :label="c.categoryName" :value="c.id"/>
                      </el-select>
                  </el-form-item>
                  <!-- 文章封面图上传控制器 -->
                  <el-form-item label="Cover Image">
                      <!-- 上传图片组件的属性说明
                      :auto-upload：设置是否自动上传
                      action：设置服务器接口路径
                      name：设置上传的文件字段名
                      headers：设置上传的请求头
                      on-success：设置上传成功的回调函数
                       -->
                      <el-upload :auto-upload="true"
                                 :show-file-list="false"
                                 action="/api/upload/coverImg"
                                 name="file"
                                 :headers="{'token': tokenStore.token}"
                                 :on-success="uploadCoverImg"
                                 class="coverImg-uploader">
                          <img :src="articleDetails.coverImg" v-if="articleDetails.coverImg" class="coverImg">
                          <el-icon v-else class="avatar-uploader-icon">
                              <Plus />
                          </el-icon>
                      </el-upload>
                  </el-form-item>
                  <!-- 内容文本编辑 -->
                  <el-form-item label="Article Content">
                      <div class="editor">
                          <quill-editor theme="snow" v-model:content="articleDetails.summary" contentType="html"/>
                      </div>
                  </el-form-item>
                  <!-- 按钮框 -->
                  <el-form-item>
                      <el-button type="primary" @click="addArticle('Published')">Published</el-button>
                      <el-button type="info" @click="addArticle('Unpublished')">Unpublished</el-button>
                      <el-button type="default" @click="addArticleVisible = false">Cancel</el-button>
                  </el-form-item>
              </el-form>
          </el-drawer>
      </div>
      <!-- 编辑框 -->
      <div>
          <el-drawer v-model="editArticleVisible" title="Edit Article" class="add=article">
              <el-form v-model="articleDetails">
                  <el-form-item label="Title">
                      <el-input v-model="articleDetails.title" placeholder="Please input Article Title"/>
                  </el-form-item>
                  <!-- 文章封面图上传控制器 -->
                  <el-form-item label="Cover Image">
                      <!-- 上传图片组件的属性说明
                      :auto-upload：设置是否自动上传
                      action：设置服务器接口路径
                      name：设置上传的文件字段名
                      headers：设置上传的请求头
                      on-success：设置上传成功的回调函数
                       -->
                      <el-upload :auto-upload="true"
                                 :show-file-list="false"
                                 action="/api/upload/coverImg"
                                 name="file"
                                 :headers="{'token': tokenStore.token}"
                                 :on-success="editCoverImg"
                                 class="coverImg-uploader">
                          <img :src="articleDetails.coverImg" v-if="articleDetails.coverImg" class="coverImg">
                          <el-icon v-else class="avatar-uploader-icon">
                              <Plus />
                          </el-icon>
                      </el-upload>
                  </el-form-item>
                  <!-- 内容文本编辑 -->
                  <el-form-item label="Article Content">
                      <div class="editor">
                          <quill-editor theme="snow" v-model:content="articleDetails.summary" contentType="html"/>
                      </div>
                  </el-form-item>
                  <!-- 按钮框 -->
                  <el-form-item>
                      <el-button type="primary" @click="editArticle('Published')">
                          Published
                      </el-button>
                      <el-button type="info" @click="editArticle('Unpublished')">
                          Unpublished
                      </el-button>
                      <el-button type="default" @click="editArticleVisible = false">
                          Cancel
                      </el-button>
                  </el-form-item>
              </el-form>
          </el-drawer>
      </div>
  </el-card>
</template>

<script setup>
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import {getArticleListService, deleteArticleService, addArticleService, editArticleService} from "@/api/article.js";
//导入富文本编辑器
import {QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
//导入token
import {useTokenStore} from "@/stores/token.js";
//调用函数
const tokenStore = useTokenStore();

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
import {ElMessage, ElMessageBox} from "element-plus";
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

/**
 * 删除文章的功能
 * @param row 数据所在的row
 */
const deleteArticleById = (row) =>{
    ElMessageBox.confirm(
        'Do you want to delete this Article?',
        'Warning',
        {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () =>{
            //调用后台api的删除文章接口，row所在行的id值传入
            let result = await deleteArticleService(row.id);
            //删除成功或失败的响应
            if (result.code === 1){
                ElMessage.error(result.msg ? result.msg : 'Update Category Failed.')
            }else {
                ElMessage.success(result.msg ? result.msg : 'Success.');
            }
            //执行后，刷新列表数据
            await articleList();
        })
        .catch(() =>{
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

/**
 * 添加文章的功能
 */
//添加文章的表单的数据模型
const articleDetails = ref({
    title: '',
    summary: '',
    categoryId: '',
    coverImg: '',
    state: ''
})
//控制添加文章的抽屉UI的显示，默认为false不展示
const addArticleVisible = ref(false);
//上传封面图片成功的回调函数，result是api调用成功后响应的结果，内含data，data中包含图片的url地址
const uploadCoverImg = (result) =>{
    //将data中的url地址赋值给coverImg
    articleDetails.value.coverImg = result.data;
    console.log(result.data)
}
//调用后台api，完成文章的添加，接收参数clickState确定点击的是Published，如果点击的是Unpublished则state将会设置为Unpublished
const addArticle = async (clickState) =>{
    //将发布状态赋值给文章的数据模型
    articleDetails.value.state = clickState;
    //调用api
    let result = await addArticleService(articleDetails.value);
    //判断响应状态码和对应的信息
    if (result.code === 1){
        ElMessage.error(result.msg? result.msg: 'Add Category Failed.')
    }else {
        ElMessage.success(result.msg? result.msg: 'Success.');
    }
    //让抽屉UI关闭
    addArticleVisible.value = false;
    //刷新列表
    await articleList();
    //重新对文章的数据模型赋值
    articleDetails.value = '';
}

/**
 * 编辑文章的功能
 */
//编辑弹窗默认为关闭，只有除法编辑按钮才将value设置为true
const editArticleVisible = ref(false);
//获取row所在的数据中包含的id，将row作为参数传入，用于获取该row所显示的data
const editArticleById = (row) => {
    editArticleVisible.value = true;
    //数据拷贝，获取对应row的值
    articleDetails.value.title = row.title;
    articleDetails.value.summary = row.summary;
    articleDetails.value.coverImg = row.coverImg;
    //扩展响应数据的model，将id作为额外参数传入api
    articleDetails.value.id = row.id;
}
//上传封面图片成功的回调函数，result是api调用成功后响应的结果，内含data，data中包含图片的url地址
const editCoverImg = (result) =>{
    //将data中的url地址赋值给coverImg
    articleDetails.value.coverImg = result.data;
    console.log(result.data)
}
//修改文章的api调用
const editArticle = async (clickState) =>{
    //将发布状态赋值给文章的数据模型
    articleDetails.value.state = clickState;
    //调用api
    let result = await editArticleService(articleDetails.value);
    if (result.code === 1) {
        ElMessage.error(result.msg ? result.msg : 'Update Article Failed.')
    } else {
        ElMessage.success(result.msg ? result.msg : 'Success.');
    }
    //隐藏弹窗
    editArticleVisible.value = false;
    //刷新列表
    await articleList();
    //清空数据模型
    articleDetails.value = '';
}
</script>

<style lang="less" scoped>
.article-container{
  min-height: 100%;
  box-sizing: border-box;
    .add-article{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .coverImg-uploader{
        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
        }
        .coverImg{
            width: 178px;
            height: 178px;
            display: block;
        }
    }
    .editor{
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 300px;
        overflow: auto;
    }
}
</style>