<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
            <div   v-if='!loading'>
                <el-tabs  v-model="activeName"  v-if='!loading'>
                    <el-tab-pane :label="'短息配置'" name="first">
                    <el-form ref="sms_form" :model="sms_form" :rules="sms_form_rules" >
                        <el-form-item label="appid" prop="appid">
                            <el-input v-model="sms_form.appid"></el-input>
                        </el-form-item>
                        <el-form-item label="appkey" prop="appkey">
                            <el-input v-model="sms_form.appkey"></el-input>
                        </el-form-item>
                        <el-form-item label="短信模板ID" prop="templateId">
                            <el-input v-model="sms_form.templateId"></el-input>
                        </el-form-item>
                        <el-form-item label="短信签名内容" prop="smsSign">
                            <el-input v-model="sms_form.smsSign" ></el-input>
                        </el-form-item>
                        <el-form-item label="验证码长度" prop="code_lenght">
                            <el-input v-model="sms_form.code_lenght"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码有效时间" prop="time">
                            <el-input v-model="sms_form.time"></el-input>
                        </el-form-item>
                        
                    
                        <el-form-item>
                            <el-button type="primary" @click="create_sms" class="animated pulse" :disabled="isDisableAdd">添加</el-button>
                            <el-button @click="handle_test_sms">短信测试</el-button>
                        </el-form-item>
                        <p style="text-align:center;color:#f00" v-if="add_loading"><i class="el-icon-loading"></i>添加中...</p>
                        </el-form>
                         </el-tab-pane>
                <el-tab-pane :label="`暂无`" name="second">
                    暂无
                </el-tab-pane>
            </el-tabs>
                    </div>
                    <el-dialog title="短信发送测试" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="testform" :model="testform" :rules="testform_rules" >
                           
                            <el-form-item label="手机号码"  prop="phone">
                                <el-input v-model="testform.phone"  width="80%"></el-input>
                            </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                
                                <el-button @click="editVisible = false">取 消</el-button>
                                <el-button type="primary" @click="test_sms" :disabled="isDisable">确 定</el-button>
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
        sms_form: {
            appid  : '',
            appkey : '',
            templateId  : '',
            smsSign : 'ssl',
            code_lenght  : '',
            time : '',
        },
        testform:{
            phone  : '',
        },
   
      sms_form_rules: {
          appid: [
             { required: true, message: '请输入appid', trigger: 'blur'  }
          ],
           appkey: [
             { required: true, message: '请输入appkey', trigger: 'blur'  }
          ],
           templateId: [
             { required: true, message: '请输入短信模板id', trigger: 'blur'  }
          ],
           smsSign: [
             { required: true, message: '请输入短信签名内容', trigger: 'blur'  }
          ],
           code_lenght: [
             { required: true, message: '请输入验证码长度', trigger: 'blur'  }
          ],
           time: [
             { required: true, message: '请输入验证码有效时间', trigger: 'blur'  }
          ],
           email_password: [
             { required: true, message: '请输入发件箱密码', trigger: 'blur'  }
          ],
         
     },
     testform_rules:{
          phone: [
             { required: true, message: '请输入手机号码', trigger: 'blur'  }
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
            this.$http('get', '/api/admin/sms/sms_option_fetch').then(res => {
                    this.loading = false
                    this.sms_form.appid = res.data.data.appid
                    this.sms_form.appkey = res.data.data.appkey
                    this.sms_form.time = res.data.data.time
                    this.sms_form.code_lenght = res.data.data.code_lenght
                    this.sms_form.smsSign = res.data.data.smsSign
                    this.sms_form.templateId = res.data.data.templateId
                })
        },
      
        create_sms(){
                this.$refs['sms_form'].validate((valid) => {
                    if(valid){
                        this.isDisableAdd = true
                        this.add_loading = true
                        this.$http('post', '/api/admin/sms/sms_option',{
                            appid  : this.sms_form.appid,
                            appkey : this.sms_form.appkey,
                            time  : this.sms_form.time,
                            code_lenght : this.sms_form.code_lenght,
                            smsSign  : this.sms_form.smsSign,
                            templateId : this.sms_form.templateId,
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
       handle_test_sms(){
            this.editVisible = true;
        },
        test_sms(){
                this.$refs['testform'].validate((valid) => {
                    if(valid){
                        this.send_loading = true
                        this.isDisable = true
                        this.$http('post', '/api/admin/sms/test',{
                            phone  : this.testform.phone,
                           
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.send_loading = false
                                this.isDisable = false
                                this.editVisible = false
                                this.testform.phone =''
                            }else{
                                this.send_loading = false
                                this.isDisable = false
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg+',原因：'+res.data.data
                                });
                            }
                        })
                    }
                })
        },
  }
  
}
</script>