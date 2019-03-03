<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
            <div   v-if='!loading'>
                  <el-form ref="websiteform" :model="websiteform" :rules="websiteform_rules">
                    <el-form-item label="网站名称(后台)" prop="site_name">
                        <el-input v-model="websiteform.site_name"></el-input>
                    </el-form-item>
                    <el-form-item label="SEO标题(前台名称)" >
                        <el-input v-model="websiteform.site_seo_title"></el-input>
                    </el-form-item>
                     <el-form-item label="SEO关键字" >
                        <el-input v-model="websiteform.site_seo_keywords"></el-input>
                    </el-form-item>
                     <el-form-item label="SEO描述" >
                        <el-input v-model="websiteform.site_seo_description" type="textarea" :row="3"></el-input>
                    </el-form-item>
                     <el-form-item label="ICP备" >
                        <el-input v-model="websiteform.website_icp"></el-input>
                    </el-form-item>
                     <el-form-item label="公网安备" >
                        <el-input v-model="websiteform.website_beian"></el-input>
                    </el-form-item>
                     <el-form-item label="站长邮箱" >
                        <el-input v-model="websiteform.website_email"></el-input>
                    </el-form-item>
                    <el-form-item label="统计代码" >
                        <el-input v-model="websiteform.website_count" type="textarea" :row="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="create_website" class="animated pulse">添加</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>
               </div>
  </div>
</template>

<script>
import spinner from '@/components/Spinner.vue';
export default {
    name:'Website',
    components: { spinner },

    data() {
      return {
        loading:true,
        websiteform: {
            site_name  : '',
            site_seo_title : '',
            site_seo_keywords  : '',
            site_seo_description : '',
            website_icp  : '',
            website_email : '',
            website_count  : '',
            website_beian : ''
        },
      websiteform_rules: {
          site_name: [
             { required: true, message: '请输入网站名称', trigger: 'blur'  }
          ]
     },
    }
  },
  created() {
            this.fetach_data()
        },
    methods: {
        fetach_data() {
            this.$http('get', '/api/admin/setting/fetch_website').then(res => {
                    this.loading = false
                    this.websiteform.site_name = res.data.data.site_name
                    this.websiteform.site_seo_title = res.data.data.site_seo_title
                    this.websiteform.site_seo_keywords = res.data.data.site_seo_keywords
                    this.websiteform.site_seo_description = res.data.data.site_seo_description
                    this.websiteform.website_icp = res.data.data.website_icp
                    this.websiteform.website_email = res.data.data.website_email
                    this.websiteform.website_count = res.data.data.website_count
                    this.websiteform.website_beian = res.data.data.website_beian
                    localStorage.setItem('website_name',res.data.data.site_name)
                })
        },
        create_website(){
                this.$refs['websiteform'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/setting/create_website',{
                            site_name  : this.websiteform.site_name,
                            site_seo_title : this.websiteform.site_seo_title,
                            site_seo_keywords  : this.websiteform.site_seo_keywords,
                            site_seo_description : this.websiteform.site_seo_description,
                            website_icp  : this.websiteform.website_icp,
                            website_email : this.websiteform.website_email,
                            website_count  : this.websiteform.website_count,
                            website_beian : this.websiteform.website_beian
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.fetach_data();
                            }else{
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                });
                            }
                        })
                    }
                })
        },
         
  }
  
}
</script>