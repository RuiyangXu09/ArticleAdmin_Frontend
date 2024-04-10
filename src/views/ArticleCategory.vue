<template>
  <el-card class="category-container">
      <template #header>
          <div class="header">
              <span>Article Category Management</span>
              <div>
                  <el-button type="primary" @click = 'addCategoryDialogVisible = true'>Add Category</el-button>
              </div>
          </div>
      </template>
      <el-table :data="categories" border>
          <!-- prop将把数据模型中对应的数据响应给组件 -->
          <el-table-column label="ID" prop="id" width="110px"/>
          <el-table-column label="Category Name" prop="categoryName"/>
          <el-table-column label="Create User" prop="createUser"/>
          <el-table-column label="Operation" width="130px">
              <!-- #default="{row}"用于获取当前点击的row所在的数据内容，也就能获取row对应的数据的id -->
              <template #default="{row}">
                  <!-- 绑定编辑弹窗的单击事件 -->
                  <el-button :icon="Edit" circle plain type="primary" @click="editDialogById(row)"/>
                  <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"/>
              </template>
          </el-table-column>
          <!-- 空数据渲染 -->
          <template #empty>
              <el-empty description="No Data..."/>
          </template>
      </el-table>
      <!-- 添加分类按钮的弹窗 -->
      <el-dialog v-model="addCategoryDialogVisible" width="20%" title="Add Category">
          <!-- :rules="rules"绑定了表单校验规则 -->
          <el-form :model="category" :rules="rules">
              <!-- prop="categoryName"绑定了form中的rules的校验规则 -->
              <el-form-item label="Category Name" prop="categoryName">
                  <!-- v-model="category.categoryName"绑定了数据模型输入 -->
                  <el-input v-model="category.categoryName"/>
              </el-form-item>
          </el-form>
          <template #footer>
              <div>
                  <el-button type="primary" @click="addCategory">
                      Confirm
                  </el-button>
                  <!--  @click="addCategoryDialogVisible = false"取消按钮绑定了单击事件，将弹窗隐藏 -->
                  <el-button type="default" @click="addCategoryDialogVisible = false">
                      Cancel
                  </el-button>
              </div>
          </template>
      </el-dialog>
      <!-- 编辑分类名的弹窗 -->
      <el-dialog v-model="editDialog" width="20%" title="Edit Category">
          <el-form :model="category" :rules="rules">
              <el-form-item label="Category Name" prop="categoryName">
                  <el-input v-model="category.categoryName"/>
              </el-form-item>
          </el-form>
          <template #footer>
              <div>
                  <el-button type="primary" @click="updateCategory">
                      Update
                  </el-button>
                  <el-button type="default" @click="editDialog = false">
                      Cancel
                  </el-button>
              </div>
          </template>
      </el-dialog>
  </el-card>
</template>

<script setup>
import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
//调用文章分类的api接口
import {addCategoryService, categoryListService, updateCategoryService, deleteCategoryService} from "@/api/category.js";
import {ElMessage, ElMessageBox} from "element-plus";

/**
 * 获取分类列表的数据渲染
 */
//定义分类名列表响应的响应式数据模型
const categories = ref()
//声明一个异步函数，因为调用时需要同步等待调用结果
const articleCategory = async () =>{
    //get方法请求，不需要传入参数，赋值给result变量使用
    let result =  await categoryListService()
    //将result.data赋值给数据模型的value进行渲染
    categories.value = result.data;
}
//调用对应方法渲染数据
articleCategory();

/**
 * 添加分类的功能
 */
//控制添加分类的对话框的弹出，默认false不弹出
const addCategoryDialogVisible = ref(false);
//分类的数据响应模型
const category = ref({
    categoryName: ''
})
//分类名不能为空的规则校验
const rules = {
    categoryName:[
        {required: true, message: 'Please input category name.', trigger: 'blur'}
    ]
}
//调用后台api接口，完成分类的添加
const addCategory = async () =>{
    //调用接口，传入模型的.value值
    let result = await addCategoryService(category.value);
    //如果result中的code不等于1就提示成功信息，不然提示error信息
    if (result.code === 1){
        ElMessage.error(result.msg? result.msg: 'Add Category Failed.')
    }else {
        ElMessage.success(result.msg? result.msg: 'Success.');
    }
    //刷新列表，再次调用获取列表的方法
    await articleCategory();
    //添加分类的弹窗显示隐藏
    addCategoryDialogVisible.value = false;
    //重新对category模型中的参数进行赋值
    category.value.categoryName = '';
}

/**
 * 编辑分类名的功能
 */
//编辑弹窗的控制，用于编辑弹窗的数据回显
const editDialog = ref(false);
//获取row所在的数据中包含的id，将row作为参数传入，用于获取该row所显示的data
const editDialogById = (row) =>{
    editDialog.value = true;
    //数据拷贝，获取该row的数据
    category.value.categoryName = row.categoryName;
    //扩展model获取id属性，将id作为参数传递给后台api完成修改
    category.value.id = row.id;
}
//修改分类名的api调用
const updateCategory = async () => {
    //调用接口，传入模型的.value值
    let result = await updateCategoryService(category.value);
    //如果result中的code不等于1就提示成功信息，不然提示error信息
    if (result.code === 1) {
        ElMessage.error(result.msg ? result.msg : 'Update Category Failed.')
    } else {
        ElMessage.success(result.msg ? result.msg : 'Success.');
    }
    //刷新列表，再次调用获取列表的方法
    await articleCategory();
    //修改分类的弹窗显示隐藏
    editDialog.value = false;
    //重新对category模型中的参数进行赋值
    category.value.categoryName = '';
}

/**
 * 删除分类的功能
 */
//消息提示框的使用
const deleteCategory = (row) =>{
    ElMessageBox.confirm(
        'Do you want to Delete this Category?',
        'Warning',
        {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            //点击确认后调用后台api接口完成删除
            let result = await deleteCategoryService(row.id);
            //删除api执行后，返回相应信息
            if (result.code === 1){
                ElMessage.error(result.msg ? result.msg : 'Update Category Failed.')
            }else {
                ElMessage.success(result.msg ? result.msg : 'Success.');
            }
            //刷新列表，再次调用获取列表的方法
            await articleCategory();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}
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