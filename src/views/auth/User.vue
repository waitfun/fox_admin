<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
       <el-tabs  v-model="activeName" v-if='!loading'>
            <el-tab-pane :label="'管理员'" name="first">
                <tree-table :data="data" :columns="columns" border>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                             <span v-if="scope.row.status == 0">
                                <span ><i class="el-icon-success icon_success"></i>启用</span>
                            </span>
                            <span v-else>
                                 <span ><i class="el-icon-error icon_error"></i>禁用</span>
                            </span>
                        </template>
                    </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                            <span v-if="scope.row.id == 1">
                        <el-button type="text" icon="el-icon-edit" disabled @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"  disabled class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </span>
                        <span v-else>
                        <el-button type="text" icon="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"   class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </span>
                    </template>
                </el-table-column>
                </tree-table>

     <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="editform" :model="editform" :rules="editrules" >
                           
                            <el-form-item label="用户名" prop="name">
                        <el-input v-model="editform.name" ></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="password">
                        <el-input v-model="editform.password" ></el-input>
                    </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editform.email" ></el-input>
                    </el-form-item>
                     <el-form-item label="角色:" prop="role_id" >
                        
                        <el-radio-group v-model="editform.role_id">
                            <span v-for="role_item in role_list" :key="role_item.id">
                            <el-radio  :label="role_item.id" style="margin-right:8px;">{{role_item.name}}</el-radio>
                           </span>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item label="状态:" prop="status" >
                        <el-radio-group v-model="editform.status">
                            <el-radio  label="0" >开启</el-radio>
                            <el-radio label="-1">禁用</el-radio>
                        </el-radio-group >
                    </el-form-item>

                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveEdit">确 定</el-button>
                        </span>
                        
                    </el-dialog>
       
                </el-tab-pane>
                <el-tab-pane :label="`管理员添加`" name="second">
                    
                   <el-form ref="addform" :model="addform" :rules="addrules" style="margin-top:20px;">
                       
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="addform.name" ></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="password">
                        <el-input v-model="addform.password" ></el-input>
                    </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addform.email" ></el-input>
                    </el-form-item>
                     <el-form-item label="角色:" prop="role_id" >
                        
                        <el-radio-group v-model="addform.role_id">
                            <span v-for="role_item in role_list" :key="role_item.id">
                            <el-radio  :label="role_item.id" style="margin-right:8px;">{{role_item.name}}</el-radio>
                           </span>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item label="状态:" prop="status" >
                        <el-radio-group v-model="addform.status">
                            <el-radio  label="0" >开启</el-radio>
                            <el-radio label="-1">禁用</el-radio>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addManUser" class="animated pulse">立即添加</el-button>
                    </el-form-item>
                    </el-form>
                     
                </el-tab-pane>
            </el-tabs>

  </div>
</template>

<script>
import treeTable from "./TreeTable"
import spinner from '@/components/Spinner.vue';
export default {
    name:'Menu',
    components: { treeTable,spinner },

    data() {
      return {
        loading:true,
        dialogwidth:'40%',
        activeName: 'first',
        editVisible: false,
        delVisible: false,
        addVisible: false,
        role_list:[],
        editform: {
            name:'',
            password: '',
            status: '1',
            email:'',
            role_id:'',
            id:''
           
        },
         addform: {
            name:'',
            password: '',
            status: '0',
            email:'',
            role_id:''
        },
        idx: -1,
       columns: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "用户名",
          value: "name"
        },
        {
          text: "邮箱",
          value: "email"
        }, 
        {
          text: "角色名称",
          value: "role_name"
        }
      ],

     data: [],
     editrules: {
           name: [
             { required: true, message: '请输入用户名', trigger: 'blur'  }
          ],
          
          email: [
              { required: true, message: '请输入邮箱', trigger: 'blur'  }
          ],
          status:[
                { required: true, message: '请设置状态', trigger: 'blur'  }
          ],
           role_id:[
                { required: true, message: '请设置角色', trigger: 'blur'  }
          ]
         
     },
      addrules: {
           name: [
             { required: true, message: '请输入用户名', trigger: 'blur'  }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur'  }
          ], 
          email: [
              { required: true, message: '请输入邮箱', trigger: 'blur'  }
          ],
          status:[
                { required: true, message: '请设置状态', trigger: 'blur'  }
          ],
           role_id:[
                { required: true, message: '请设置角色', trigger: 'blur'  }
          ]
     },


    }
  },
  mounted() {
            this.getData();
             if(document.body.clientWidth < 750){
                this.dialogwidth = '90%'
            }
        },
    methods: {
        getData() {
            this.$http('get', '/api/admin/user/get_all_man_user').then(res => {
                     this.data = res.data.data;
                     this.loading = false
                })
            this.$http('get', '/api/admin/rabc/get_auth_role').then(res => {
                     this.role_list = res.data.data;
                })
               
        },
        //删除
         handleDelete(index, row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http('post', '/api/admin/user/del_man_user',{id:row.id}).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                             this.getData();
                           
                        }else{
                             this.$message({
                                type: 'warning',
                                message: res.data.msg
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        //操作编辑
         handleEdit(index, row) {
                const item = row;
                this.editform = {
                    name     : item.name,
                    password : item.password,
                    role_id  : item.role_id,
                    email    : item.email,
                    id       : item.id,
                }
                this.editVisible = true;
            },
            // 保存编辑
        saveEdit() {
                this.$refs['editform'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/user/edit_man_user',{
                            name     : this.editform.name,
                            password : this.editform.password,
                            status   : this.editform.status,
                            role_id  : this.editform.role_id,
                            email    : this.editform.email,
                            id       : this.editform.id
                        }).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.editVisible = false;
                            this.getData();
                            this.editform.name = ''
                            this.editform.password = ''
                            this.editform.role = ''
                            this.editform.status = ''
                            
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
        //添加
        addManUser(){
             let data = {}
                this.$refs['addform'].validate((valid) => {
                    if(valid){
                       
                        this.$http('post', '/api/admin/user/add_man_user',{
                            name     : this.addform.name,
                            password : this.addform.password,
                            status   : this.addform.status,
                            role_id  : this.addform.role_id,
                            email    : this.addform.email,
                        }).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.getData();
                            this.addform.name = ''
                            this.addform.email = ''
                            this.addform.password = ''
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
<style>
.icon_success{
    color:#2bb889;
    margin-right:5px;
}
.icon_error{
    color:rgb(255, 0, 0);
    margin-right:5px;
}
</style>
