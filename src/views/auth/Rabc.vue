<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
       <el-tabs  v-model="activeName" v-if='!loading'>
            <el-tab-pane :label="'角色管理'" name="first">
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
                        <el-button type="text" icon="el-icon-setting" disabled @click="goToAuth(scope.row.id,scope.row.name)">权限设置</el-button>
                        <el-button type="text" icon="el-icon-edit" disabled @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"  disabled class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </span>
                        <span v-else>
                            <el-button type="text" icon="el-icon-setting"  @click="goToAuth(scope.row.id,scope.row.name)">权限设置</el-button>
                        <el-button type="text" icon="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"   class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </span>
                    </template>
                </el-table-column>
                </tree-table>

     <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="editform" :model="editform" :rules="editrules" >
                           
                            <el-form-item label="角色名称" prop="name">
                                <el-input v-model="editform.name"></el-input>
                            </el-form-item>
                            <el-form-item label="角色描述" prop="remark">
                                <el-input v-model="editform.remark" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                             <el-form-item label="状态" prop="status" >
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
                <el-tab-pane :label="`添加角色`" name="second">
                     <el-alert
                        title="此处为添加权限规则菜单的操作，请在开发者的监督下填写或者开发者填写。"
                        type="success"
                        :closable="false">
                    </el-alert>
                   <el-form ref="addform" :model="addform" :rules="addrules" style="margin-top:20px;">
                       
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="addform.name"></el-input>
                    </el-form-item>
                     <el-form-item label="角色描述" prop="remark">
                        <el-input v-model="addform.remark" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" >
                        <el-radio-group v-model="addform.status">
                            <el-radio  label="0" >开启</el-radio>
                            <el-radio label="-1">禁用</el-radio>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addRole" class="animated pulse">立即添加</el-button>
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
        editform: {
            name:'',
            remark: '',
            status: '',
            id:'', 
        },
         addform: {
            name:'',
            remark: '',
            status: '0',
            id:'',
        },
        idx: -1,
       columns: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "角色名称",
          value: "name"
        },
        {
          text: "角色描述",
          value: "remark"
        }
      ],

     data: [],
     editrules: {
          name: [
             { required: true, message: '请输入角色名称', trigger: 'blur'  }
          ],
          remark: [
              { required: true, message: '请输入角色描述', trigger: 'blur'  }
          ],
          status:[
                { required: true, message: '请设置状态', trigger: 'blur'  }
          ]
         
     },
      addrules: {
           name: [
             { required: true, message: '请输入角色名称', trigger: 'blur'  }
          ],
          remark: [
              { required: true, message: '请输入角色描述', trigger: 'blur'  }
          ],
          status:[
                { required: true, message: '请设置状态', trigger: 'blur'  }
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
            this.$http(
                'get', 
                '/api/admin/rabc/get_all_role'
            ).then(res => {
                this.data = res.data.data;
                this.loading = false
            })
        },
         handleDelete(index, row) {
                this.$confirm(
                    '此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http(
                        'post',
                        '/api/admin/rabc/del_role',
                        {id:row.id}).then(res => {
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
                    name: item.name,
                    remark: item.remark,
                    id: item.id
                }
           
                this.editVisible = true;
            },
     // 保存编辑
        saveEdit() {
                 let data = {}
                this.$refs['editform'].validate((valid) => {
                    if(valid){
                        this.$http(
                            'post', 
                            '/api/admin/rabc/edit_rabc',
                            {
                                name   : this.editform.name,
                                remark : this.editform.remark,
                                status : this.editform.status,
                                id     : this.editform.id
                            }
                        ).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.editVisible = false;
                                this.getData();
                                this.editform.name = ''
                                this.editform.remark = ''
                                
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
        addRole(){
             let data = {}
                this.$refs['addform'].validate((valid) => {
                    if(valid){
                        data.name = this.addform.name
                        data.remark = this.addform.remark
                        data.status = this.addform.status
                        this.$http(
                            'post', 
                            '/api/admin/rabc/add_role',
                            {
                                name   : this.addform.name,
                                remark : this.addform.remark,
                                status : this.addform.status,
                            }
                        ).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.getData();
                                this.addform.name = ''
                                this.addform.remark = ''
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
        //权限设置
        goToAuth (id,name) {
            this.$router.push({
            name: 'auth',
            params: {
                id: id,
                name: name
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
