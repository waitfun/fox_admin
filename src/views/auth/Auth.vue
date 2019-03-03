<template>
    <div class="container animated pulse">
         <spinner v-if='loading'></spinner>
         <div  v-if='!loading'>
          <div style="margin:10px 0px 10px 0px;">
              <el-alert
                title="操作提示"
                type="success"
                :closable="false"
                description="菜单授权是后台显示的菜单，权限授权为用户可以操作的节点的权限">
            </el-alert>
              <el-button type="success" @click="handGetAuth" style="margin-top:10px;">查看权限</el-button>
          </div>
        <el-form ref="form" :model="form" >
            <el-form-item label="角色名称">
                <el-input v-model="form.name" disabled ></el-input>
            </el-form-item>
             <el-form-item label="菜单授权">
             </el-form-item>
             <div style="border:1px dotted #2bb889;padding:20px;margin-bottom:20px;">
               <el-tree :data="menu" node-key="id" :props="menutProps"  show-checkbox ref="menuTree" check-strictly highlight-current default-expand-all></el-tree>
             </div>
             <el-form-item label="规则授权">
             </el-form-item>
             <div style="border:1px dotted #2bb889;padding:20px;margin-bottom:20px;">
               <el-tree :data="rules" node-key="id" :props="ruletProps"  show-checkbox ref="ruleTree"  highlight-current></el-tree>
             </div>
              <el-form-item>
                        <el-button type="primary" @click="handAddAuth" class="animated pulse">立即添加</el-button>
                    </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
 import spinner from '@/components/Spinner.vue'
    export default {
        components: { spinner },
        data() {
            return {
                loading:true,
                menu:[],
                rules:[],
                menu_access:[],
                rule_access:[],
                form:{
                    name:''
                }, 
                menutProps: {
                    label: 'title',
                    id:'id'
                },
                ruletProps:{
                    label: 'title',
                    id:'id'
                }
            }
        },
       created(){
           this.get_data()
       },
        mounted(){
            
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
           get_data(){
               this.form.name = this.$route.params.name
               if(this.$route.params.name == null){
                    this.$router.push('rabc');
               }
               this.$http(
                   'get', 
                   '/api/admin/menu/get_all_menu'
                ).then(res => {
                    this.menu = res.data.data;
                    this.loading = false
                })
                
                this.$http(
                    'get', 
                    '/api/admin/rules/get_all_rules'
                ).then(res => {
                    this.rules = res.data.data;
                    this.loading = false
                })
           },
        //添加
            handAddAuth(){
                
                this.$http(
                     'post', 
                     '/api/admin/rabc/add_auth',
                     {
                        id: this.$route.params.id,
                        menu_data : this.$refs.menuTree.getCheckedNodes(),
                        rule_data : this.$refs.ruleTree.getCheckedNodes()
                     }
                 ).then(res => {
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
            },
        //手动查看权限
        handGetAuth(){
            this.$nextTick(function(){
                this.$refs.menuTree.setCheckedNodes(this.menu_access);
                this.$refs.ruleTree.setCheckedNodes(this.rule_access);
             })
            }
        },
        updated (){
           this.$http(
               'post',
                '/api/admin/menu/access_menu',
                {
                    id : this.$route.params.id
                }).then(res => {
                    this.menu_access = res.data.data.menu_access;
                    this.rule_access = res.data.data.rule_access;
                })
            this.$nextTick(function(){
                this.$refs.menuTree.setCheckedNodes(this.menu_access);
                this.$refs.ruleTree.setCheckedNodes(this.rule_access);
             })
        }
    }
</script>
<style scoped>
    
</style>