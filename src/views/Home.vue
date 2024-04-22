<template>
    <el-container class="el-container-home">
        <!-- 左侧容器 -->
        <el-aside class="el-aside-home">
            <!-- 标签 -->
            <div class="icon-home">Icon Here</div>
            <!-- 菜单 子路由设置 router -->
            <el-menu background-color="burlywood" class="el-menu-home" router>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Document/>
                    </el-icon>
                    <span>Article Management</span>
                </el-menu-item>

                <el-menu-item index="/article/category">
                    <el-icon>
                        <Notebook/>
                    </el-icon>
                    <span>Article Category</span>
                </el-menu-item>
                <!-- 子菜单 -->
                <el-sub-menu class="el-sub-menu-home">
                    <template #title>
                        <el-icon>
                            <UserFilled/>
                        </el-icon>
                        <span>User</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User/>
                        </el-icon>
                        <span>User Info</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen/>
                        </el-icon>
                        <span>Reset Password</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Avatar/>
                        </el-icon>
                        <span>Update Avatar</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧容器 -->
        <el-container>
            <!-- 头部 -->
            <el-header class="el-header-home">
                <!-- 当前登录用户信息 -->
                <div>User: <strong>{{userInfoStore.info.nickname}}</strong></div>
                <!-- 下拉菜单显示 -->
                <el-dropdown placement="bottom-end">
                    <span>
                        <el-avatar :src="userInfoStore.info.avatarUrl"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu class="dropDown-menu">
                            <el-dropdown-item command="profile" :icon="User">User Information</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Avatar">Update Avatar</el-dropdown-item>
                            <el-dropdown-item command="profile" :icon="EditPen">Reset Password</el-dropdown-item>
                            <el-dropdown-item command="profile" :icon="SwitchButton">Log out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 内容展示区 -->
            <el-main>
                <!-- 设置好后在对应的menu-item中设置index属性，同时需要在el-menu中打开router，直接在后面写router即可 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import {Avatar, CaretBottom, Document, EditPen, Notebook, User, UserFilled, SwitchButton} from "@element-plus/icons-vue";
import {getUserInfoByIdService} from "@/api/user.js";
import {useUserInfoStore} from "@/stores/userInfo.js";

//调用pinia存储
const userInfoStore = useUserInfoStore();
/**
 * 调用函数，获取用户的详细信息
 */
const getUserInfo = async () =>{
    let result = await getUserInfoByIdService();
    //获取到的数据，存入pinia中，调用userInfoStore函数中的方法，存储result中获取的data数据
    userInfoStore.setInfo(result.data);
}
//调用api
getUserInfo();
</script>

<style lang="less">
.el-container-home{
  height: 100vh;
  background-color: white;
  font-family: "Arial",fantasy;
  font-size: 18px;

    .el-aside-home{
        width: 200px;
        background-color: burlywood;
        .icon-home{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            background-color: white;
        }
        .el-menu-home{
            justify-content: center;
            align-items: center;
            border-right: none;
        }
        .el-sub-menu-home{
            justify-content: center;
            align-items: center;
            border-right: none;
        }
    }

    .el-header-home{
        background-color: burlywood;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        .dropDown-menu{
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Arial",fantasy;
        }
    }

}
</style>