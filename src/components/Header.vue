<template>
    <div class="header ">
   
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo" v-show="logo_name==true">{{website_name}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <!-- <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="iconfont icon-skin" style="color:#fff"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span> -->
                    <el-dropdown class="user-name"  @command="changeTheme">
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-skin "></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  command="ea1935"><i class="iconfont icon-fangkuai " style="color:#ea1935;margin-right:2px;"></i>红色</el-dropdown-item>
                        <el-dropdown-item  command="27a009"> <i class="iconfont icon-fangkuai" style="color:#27a009;margin-right:2px;"></i>绿色</el-dropdown-item>
                        <el-dropdown-item  command="2571dc"> <i class="iconfont icon-fangkuai" style="color:#2571dc;margin-right:2px;"></i>蓝色</el-dropdown-item>
                         <el-dropdown-item  command="2bb889"> <i class="iconfont icon-fangkuai" style="color:#2bb889;margin-right:2px;"></i>默认</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator" v-if="avatar_show"><img :src="user_info.avatar"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name"  @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{user_info.username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  command="setting">设置</el-dropdown-item>
                        <!-- <a href="" target="_blank">
                            <el-dropdown-item>清除缓存</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item divided  command="login_out"> <span >退出登录</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
       
    </div>
</template>
<script>
import { Loading } from 'element-ui';
    export default {
        data() {
            return {
                logo_name: true,
                avatar_show:true,
                collapse: false,
                fullscreen: false,
                message: 2,
                user_info:'',
                website_name:''
            }
        },
        computed:{
          
           
        },
        methods:{
            changeTheme(command){
                 if(command == 'ea1935'){
                      localStorage.setItem('theme','ea1935')
                      this.setTheme('../static/theme/ea1935/main.css')
                      const loading = this.$loading({
                        lock: true,
                        text: '正在切换皮肤',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                     
                 }else if(command == '27a009'){
                        localStorage.setItem('theme','27a009')
                        this.setTheme('../static/theme/27a009/main.css')
                        const loading = this.$loading({
                        lock: true,
                        text: '正在切换皮肤',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                 }else if(command == '2571dc'){
                        localStorage.setItem('theme','2571dc')
                        this.setTheme('../static/theme/2571dc/main.css')
                        const loading = this.$loading({
                        lock: true,
                        text: '正在切换皮肤',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                 }else{
                      localStorage.setItem('theme','default')
                      this.setTheme('../static/theme/default/main.css')
                      const loading = this.$loading({
                        lock: true,
                        text: '正在切换皮肤',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                 }
            },
            //切换link
           setTheme(path){
                this.delTheme()
                let head = document.getElementsByTagName('head')[0]
                let link = document.createElement('link')
                link.href = path
                link.rel = 'stylesheet'
                link.style = 'text/css'
                head.appendChild(link)
           },
           //删除存在的link
           delTheme(){
             let link_list = document.getElementsByTagName('link')
             for(let i = 0;i<link_list.length;i++){
                let string = link_list[i].href
                if(string.indexOf('/static/theme')!=-1){
                    link_list[i].remove(link_list[i])
                }
             }
            
           },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'login_out'){
                    this.$http('get', '/api/admin/login/login_out').then(res => {
                         
                        if(res.data.code ==200){
                            localStorage.removeItem('user_token');
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                           this.$router.push('/login');
                        }else{
                             this.$message({
                                type: 'warning',
                                message: res.data.msg
                            });
                        }
                   
                    })
                }
                if(command =='setting'){
                    this.$router.push({
                        name: 'setting',
                    })
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                eventBus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            get_userinfo(){
                 this.$http('get', '/api/admin/user/get_user').then(res => {
                           this.user_info = res.data.data
                   
                })
            },
            
        },
        mounted(){
            this.get_userinfo()
            if(document.body.clientWidth < 1300){
                this.collapseChage();
            }
            if(document.body.clientWidth < 650){
                this.logo_name = false
                this.avatar_show = false
            }
            this.$http('get', '/api/admin/setting/fetch_website').then(res => {
                localStorage.setItem('website_name',res.data.data.site_name)
                this.website_name = res.data.data.site_name ? res.data.data.site_name:'后台管理系统'
                let head = document.getElementsByTagName('head')
                let meta = document.createElement('meta')
                meta.content = res.data.data.site_seo_description
                meta.name = 'description'
                head[0].appendChild(meta)

            })  
            
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        border-bottom:1px solid #f1f1f1;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>