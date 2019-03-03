<template>
    <div class=" animated pulse">
        <el-row :gutter="20" type="flex" >
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" style="min-height:252px;height:auto;">
                    <div class="user-info">
                        <img :src="user_info.avatar" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user_info.username}}</div>
                            <div> {{user_info.role_name}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>{{user_info.login_time}}</span></div>
                    <div class="user-info-list">上次登录IP：<span>{{user_info.login_ip}}</span></div>
                    <div class="user-info-list">上次登录地点：<span>{{user_info.login_address}}</span></div>
                </el-card>
            </el-col>
           
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'dashboard',
        data() {
            return {
                user_info : '',
            }
        },
        components: {
            Schart
        },
        computed: {
           
        },
        created(){
            this.get_userinfo()
        },
        activated(){
        },
        deactivated(){
           
        },
        methods: {
            get_userinfo(){
                 this.$http('get', '/api/admin/user/get_user').then(res => {
                           this.user_info = res.data.data
                   
                })
            }
        }
    }
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }
    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }
    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }
    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }
    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }
    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }
    .user-info-list span {
        margin-left: 10px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    .todo-item {
        font-size: 14px;
    }
    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }
    .schart {
        width: 100%;
        height: 300px;
    }
</style>