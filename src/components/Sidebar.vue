<template>
<div>
    <div class="sidebar" >
        <el-menu class="sidebar-el-menu" :default-active="$route.path" :collapse="collapse"  :active-text-color="active_color" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.name" :key="item.id" >
                        <template slot="title" >
                            <!-- 多行的，一级菜单 -->
                            <i :class="item.icon" ></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.name" :key="subItem.id">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.name">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.name" :key="subItem.id">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- 只有一行的,一级菜单 -->
                <template v-else>
                    <el-menu-item :index="item.name" :key="item.id">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                collapse: false,
                items:[],
                active_color:''
            }
        },
        computed:{
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            eventBus.$on('collapse', msg => {
                this.collapse = msg;
            })
             this.getMenu()
        },
        methods:{
            getMenu(){
                this.$http('get', '/api/admin/menu/admin_menu',).then(res => {
                    this.items = res.data.data
                })
              // this.active_color = localStorage.getItem('theme') ? '#'+localStorage.getItem('theme'):'#2bb889';
               
            },
            
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
        color:#fff;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar_icon{
        color:#000;
    }
    .el-menu{
        color:rgb(49, 10, 122)
    }
    .iconfont{
        margin-right:10px;
        font-size:19px;
    }
</style>