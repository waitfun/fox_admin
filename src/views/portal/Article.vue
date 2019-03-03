
<template>
    <div class="">
        <div class="container">
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
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
    export default {
        name:'Article',
        components: {
            quillEditor
        },
        data: function(){
            return {
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
        methods: {
           onEditorChange({ editor, html, text }) {
                this.form1.content= html;
            },
            submit(){
               
                this.$refs['form1'].validate((valid) => {
                    if(valid){
                         console.log(this.form1.content);
                    }
                })
            }
        }
    }
</script>

<style scoped>
   
</style>
