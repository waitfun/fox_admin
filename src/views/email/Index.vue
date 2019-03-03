<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
            <div   v-if='!loading'>
                <el-tabs  v-model="activeName"  v-if='!loading'>
                    <el-tab-pane :label="'邮箱配置'" name="first">
                    <el-form ref="emailform" :model="emailform" :rules="emailform_rules">
                        <el-form-item label="发件人" prop="from_name">
                            <el-input v-model="emailform.from_name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址" prop="from">
                            <el-input v-model="emailform.from"></el-input>
                        </el-form-item>
                        <el-form-item label="SMTP服务器" prop="smtp_host">
                            <el-input v-model="emailform.smtp_host"></el-input>
                        </el-form-item>
                        <el-form-item label="连接方式" prop="stmp_secure">
                            <el-input v-model="emailform.stmp_secure" ></el-input>
                        </el-form-item>
                        <el-form-item label="SMTP服务器端口" prop="smtp_port">
                            <el-input v-model="emailform.smtp_port"></el-input>
                        </el-form-item>
                        <el-form-item label="发件箱帐号" prop="email_username">
                            <el-input v-model="emailform.email_username"></el-input>
                        </el-form-item>
                        <el-form-item label="发件箱密码" prop="email_password">
                            <el-input v-model="emailform.email_password" type="password"></el-input>
                        </el-form-item>
                    
                        <el-form-item>
                            <el-button type="primary" @click="create_email" class="animated pulse" :disabled="isDisableAdd">添加</el-button>
                            <el-button @click="handle_test_email">邮件测试</el-button>
                        </el-form-item>
                        <p style="text-align:center;color:#f00" v-if="add_loading"><i class="el-icon-loading"></i>添加中...</p>
                        </el-form>
                         </el-tab-pane>
                <el-tab-pane :label="`验证码模板配置`" name="second">
                    <el-form ref="template_email" :model="template_email" :rules="template_email_rules" >
                        <el-form-item label="邮件标题" prop="title">
                                <el-input v-model="template_email.title" ></el-input>
                            </el-form-item>
                        <el-form-item label="邮件模板(模板内容用{$code}代替)" prop="message" >
                            <el-input v-model="template_email.message" :row='5' type="textarea"></el-input>
                        </el-form-item>
                         <div style="text-align:center;color:#515151"></div>
                    </el-form>
                    <el-button class="editor-btn" type="primary" @click="create_template">提交</el-button>
                </el-tab-pane>
            </el-tabs>
                    </div>
                    <el-dialog title="邮件发送测试" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="testform" :model="testform" :rules="testform_rules" >
                            <el-form-item >
                            <el-alert
                                    title="需要保存邮箱配置后，才能测试"
                                    type="success"
                                    :closable="false">
                                </el-alert>
                            </el-form-item>
                            <el-form-item label="收件箱"  prop="address">
                                <el-input v-model="testform.address"  width="80%"></el-input>
                            </el-form-item>
                            <el-form-item label="标题"  prop="title">
                                <el-input v-model="testform.title" ></el-input>
                            </el-form-item>
                            <el-form-item label="内容"  prop="message">
                                <el-input v-model="testform.message" type="textarea" :row="4"></el-input>
                            </el-form-item>
                               
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                
                                <el-button @click="editVisible = false">取 消</el-button>
                                <el-button type="primary" @click="test_email" :disabled="isDisable">确 定</el-button>
                                <p style="text-align:center;color:#f00" v-if="send_loading"><i class="el-icon-loading"></i>发送中...</p>
                            </span>
                        </el-dialog>
               
  </div>
</template>

<script>
import spinner from '@/components/Spinner.vue';


export default {
    name:'Index',
    components: { spinner},

    data() {
      return {
        isDisableAdd:false,
        add_loading:'',
        loading:true,
        activeName: 'first',
        isDisable: false,
        send_loading:false,
        editVisible: false,
        dialogwidth:'40%',
        emailform: {
            from_name  : '',
            from : '',
            smtp_host  : '',
            stmp_secure : 'ssl',
            smtp_port  : '',
            email_username : '',
            email_password  : '',
        },
        testform:{
            address  : '',
            title : '',
            message  : '',
        },
    template_email:{
        title:'',
        message:'',
       editorOption: {
            placeholder: '请输入内容'
        },
    },
      emailform_rules: {
          from_name: [
             { required: true, message: '请输入发件人名', trigger: 'blur'  }
          ],
           from: [
             { required: true, message: '请输入邮箱地址', trigger: 'blur'  }
          ],
           smtp_host: [
             { required: true, message: '请输入SMTP服务器', trigger: 'blur'  }
          ],
           stmp_secure: [
             { required: true, message: '请输入连接方式', trigger: 'blur'  }
          ],
           smtp_port: [
             { required: true, message: '请输入SMTP服务器端口', trigger: 'blur'  }
          ],
           email_username: [
             { required: true, message: '请输入发件箱帐号', trigger: 'blur'  }
          ],
           email_password: [
             { required: true, message: '请输入发件箱密码', trigger: 'blur'  }
          ],
         
     },
     testform_rules:{
          address: [
             { required: true, message: '请输入收件箱', trigger: 'blur'  }
          ],
           title: [
             { required: true, message: '请输入标题', trigger: 'blur'  }
          ],
           message: [
             { required: true, message: '请输入内容', trigger: 'blur'  }
          ],
     },
      template_email_rules:{
          title: [
             { required: true, message: '请邮件标题', trigger: 'blur'  }
          ],
           message: [
             { required: true, message: '请输入内容', trigger: 'blur'  }
          ],
     },
    }
  },
  created() {
            this.fetach_data()
            if(document.body.clientWidth < 650){
                this.dialogwidth = '90%'
            }
        },
    methods: {
        fetach_data() {
            this.$http('get', '/api/admin/mailer/fetch_email').then(res => {
                    this.loading = false
                    this.emailform.from_name = res.data.data.from_name
                    this.emailform.from = res.data.data.from
                    this.emailform.smtp_host = res.data.data.smtp_host
                    this.emailform.stmp_secure = res.data.data.stmp_secure
                    this.emailform.smtp_port = res.data.data.smtp_port
                    this.emailform.email_username = res.data.data.email_username
                })
             this.$http('get', '/api/admin/mailer/template_fetch').then(res => {
                    this.template_email.title = res.data.data.title
                    this.template_email.message = res.data.data.message
                  
                })
        },
      
        create_email(){
                this.$refs['emailform'].validate((valid) => {
                    if(valid){
                        this.isDisableAdd = true
                        this.add_loading = true
                        this.$http('post', '/api/admin/mailer/email_post',{
                            from_name  : this.emailform.from_name,
                            from : this.emailform.from,
                            smtp_host  : this.emailform.smtp_host,
                            stmp_secure : this.emailform.stmp_secure,
                            smtp_port  : this.emailform.smtp_port,
                            email_username : this.emailform.email_username,
                            email_password  : this.emailform.email_password,
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.fetach_data();
                                this.isDisableAdd = false
                                this.add_loading = false
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                });
                                this.isDisableAdd = false
                                this.add_loading = false
                            }
                        })
                    }
                })
        },
       handle_test_email(){
            this.editVisible = true;
        },
         test_email(){
                this.$refs['testform'].validate((valid) => {
                    if(valid){
                        this.send_loading = true
                        this.isDisable = true
                        this.$http('post', '/api/admin/mailer/test',{
                            title  : this.testform.title,
                            address : this.testform.address,
                            message  : this.testform.message,
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.send_loading = false
                                this.isDisable = false
                                this.editVisible = false
                                this.testform.title =''
                                this.testform.address = ''
                                this.testform.message = ''
                            }else{
                                this.send_loading = false
                                this.isDisable = false
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg+'原因：'+res.data.data
                                });
                            }
                        })
                    }
                })
        },
       
        create_template(){
               
                this.$refs['template_email'].validate((valid) => {
                    if(valid){
                         console.log(this.template_email.message);
                          this.$http('post', '/api/admin/mailer/template_post',{
                            title  : this.template_email.title,
                            message  : this.template_email.message,
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                });
                            }
                        })
                    }
                })
            }
         
  }
  
}
</script>