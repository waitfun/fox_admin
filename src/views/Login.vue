
<template>
    <div class="login-wrap animated pulse">
        <div class="ms-login">
            <div class="ms-title">{{website_name}}</div>
            <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="ms-content">
                <el-form-item v-if="error_status">
                        <el-alert
                            :title="error"
                            type="error"
                            :closable="false">
                        </el-alert>
                        </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="Form.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-edit"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="Form.password" @keyup.enter.native="submitForm('Form')">
                        <el-button slot="prepend" icon="el-icon-edit"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('Form')" :disabled="isDisable">登录</el-button>
                </div>
                <p style="text-align:center;color:#fff" v-show="login_loading==true"><i class="el-icon-loading"></i>拼命登录中...</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {

        data: function(){
            return {
                website_name:'',
                isDisable: false,
                login_loading:false,
                error_status:false,
                error:'',
                Form: {
                    username: 'admin',
                    password: '1234567890'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.website_name = localStorage.getItem('website_name') ? localStorage.getItem('website_name'):'后台管理系统'
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.isDisable = true
                       this.login_loading = true
                        this.error_status = false
                         this.$http('post', '/api/admin/login/login',{
                            username : this.Form.username,
                            password : this.Form.password
                         }).then(res => {
                            if(res.data.code == 200){
                                localStorage.setItem("user_token",res.data.data)
                                this.$message({
                                        type: 'success',
                                        message: res.data.msg
                                    });
                                this.login_loading = false
                                this.$router.push('/');
                            }else{
                                    this.error = res.data.msg
                                    this.error_status = true
                                    this.login_loading = false
                                    this.isDisable = false
                            }
                   
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
