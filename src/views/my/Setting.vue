<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
       <el-tabs  v-model="activeName" v-if='!loading'>
            <el-tab-pane :label="'资料设置'" name="first">
               
       
                </el-tab-pane>
                <el-tab-pane :label="`更改密码`" name="second">
                    
                   <el-form ref="form1" :model="form1" :rules="rules1" style="margin-top:20px;">
                       <el-form-item v-if="error_status">
                        <el-alert
                            :title="error"
                            type="error"
                            :closable="false">
                        </el-alert>
                        </el-form-item>
                    <el-form-item label="旧密码" prop="old_password">
                        <el-input v-model="form1.old_password" type="password"></el-input>
                    </el-form-item>
                     <el-form-item label="新密码" prop="new_password">
                        <el-input v-model="form1.new_password" type="password"></el-input>
                    </el-form-item>
                      <el-form-item label="再次输入新密码" prop="new_again_password">
                        <el-input v-model="form1.new_again_password" type="password" ></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="changePswd" class="animated pulse">修改</el-button>
                    </el-form-item>
                    </el-form>
                     
                </el-tab-pane>
            </el-tabs>

  </div>
</template>

<script>
import spinner from '@/components/Spinner.vue';
export default {
    name:'Setting',
    components: { spinner },

    data() {
      return {
        error:'',
        error_status:false,
        loading:true,
        activeName: 'first',
        form1: {
            old_password:'',
            new_password: '',
            new_again_password:'',
           
        },
         

     data: [],
     rules1: {
           old_password: [
             { required: true, message: '请输入旧密码', trigger: 'blur'  }
          ],
          
          new_password: [
              { required: true, message: '请输入新密码', trigger: 'blur'  }
          ],
          new_again_password:[
                { required: true, message: '请再次输入新密码', trigger: 'blur'  }
          ]
         
     },
    }
  },
  mounted() {
            this.getData();
            
        },
    methods: {
        getData() {
            setTimeout(() => {
                   this.loading = false
                }, 3000);
        },
        
        changePswd(){
             let data = {}
                this.$refs['form1'].validate((valid) => {
                    if(valid){
                        data.old_password = this.form1.old_password
                        data.new_password = this.form1.new_password
                        data.new_again_password = this.form1.new_again_password
                        this.error_status = false
                        if(this.form1.new_password != this.form1.new_again_password){
                            this.error = '输入两次密码不一样'
                            this.error_status = !this.error_status
                            return false
                        }
                         if(this.form1.new_password.length <8){
                            this.error = '密码长度至少8位'
                            this.error_status = !this.error_status
                            return false
                        }
                        this.$http('post', '/api/admin/setting/change_password',{data}).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.data
                            });
                            this.form1.old_password = ''
                            this.form1.new_password = ''
                            this.form1.new_again_password = ''
                            localStorage.removeItem('token');
                            //this.$router.push('/login')
                        }else{
                            this.error = res.data.data
                            this.error_status = !this.error_status
                        }
                    })
                   
                    }
                })
        },
  }
  
}
</script>
<style>
.icon_success{
    color:#2bb889;
}
.icon_error{
    color:rgb(255, 0, 0);
}
</style>
