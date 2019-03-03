
<template>
    <div class="">
        <div class="container">
             <spinner v-if='loading'></spinner>
            <el-tabs  v-model="activeName" v-if='!loading'>
                <el-tab-pane :label="'分类管理'" name="first">
                <el-form ref="form1" :model="form1" :rules="rules1" >
                    <el-form-item label="标题" prop="title">
                            <el-input v-model="form1.title" ></el-input>
                        </el-form-item>
                        <el-form-item label="内容"  >
                        </el-form-item>
                    <el-form-item label="" prop="content" >
                        <quill-editor ref="myTextEditor" v-model="form1.content" :options="form1.editorOption"></quill-editor>
                    </el-form-item>
                </el-form>
                <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
              </el-tab-pane>
               <el-tab-pane :label="`分类添加`" name="second">
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
import spinner from '@/components/Spinner.vue';
    export default {
       components: { spinner },
        data: function(){
            return {
                loading:true,
                activeName: 'first',
                form1:{
                    content: '',
                    editorOption: {
                        placeholder: '请输入内容'
                    },
                    title:''
                },
                rules1: {
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur'  }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur'  }
                    ],
                    status:[
                            { required: true, message: '请设置状态', trigger: 'blur'  }
                    ],
                    role:[
                            { required: true, message: '请设置角色', trigger: 'blur'  }
                    ]
         
     },
                
            }
        },
    mounted() {
            this.getData();
        },
    methods: {
        getData() {
            this.$http('get', '/api/admin/user/get_all_man_user').then(res => {
                     this.data = res.data;
                     this.loading = false
                    
                })
               
        },
           onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$refs['form1'].validate((valid) => {
                    if(valid){

                    }
                })
            }
        }
    }
</script>

<style scoped>
   
</style>
