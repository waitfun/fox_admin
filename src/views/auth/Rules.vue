<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
       <el-tabs  v-model="activeName"  v-if='!loading'>
            <el-tab-pane :label="'权限规则'" name="first">
    <tree-table :data="data" :columns="columns" border>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleAdd(scope.$index, scope.row)">添加下属权限</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

     <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="form1" :model="form" :rules="rules1" >
                           
                            <el-form-item label="权限名称" prop="title">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <el-form-item label="应用" prop="app">
                                <el-input v-model="form.app"></el-input>
                            </el-form-item>
                            <el-form-item label="控制器" prop="controller">
                                <el-input v-model="form.controller"></el-input>
                            </el-form-item>
                            <el-form-item label="方法" prop="action">
                                <el-input v-model="form.action"></el-input>
                            </el-form-item>
                            <el-form-item label="参数" >
                                <el-input v-model="form.param"></el-input>
                            </el-form-item>

                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveEdit">确 定</el-button>
                        </span>
                        
                    </el-dialog>
        <!-- 添加弹出框 -->
                    <el-dialog title="添加下属权限" :visible.sync="addVisible" :width="dialogwidth">
                        <el-form ref="form2" :model="form2" :rules="rules2">
                           
                           <el-form-item label="权限名称" prop="title">
                                <el-input v-model="form2.title"></el-input>
                            </el-form-item>
                            <el-form-item label="应用" prop="app">
                                <el-input v-model="form2.app"></el-input>
                            </el-form-item>
                            <el-form-item label="控制器" prop="controller">
                                <el-input v-model="form2.controller"></el-input>
                            </el-form-item>
                            <el-form-item label="方法" prop="action">
                                <el-input v-model="form2.action"></el-input>
                            </el-form-item>
                            <el-form-item label="参数" >
                                <el-input v-model="form2.param"></el-input>
                            </el-form-item>
                            </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveAdd">确 定</el-button>
                        </span>
                         
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane :label="`添加规则`" name="second">
                     <el-alert
                        title="此处为添加权限规则菜单的操作，请在开发者的监督下填写或者开发者填写。"
                        type="success"
                        :closable="false">
                    </el-alert>
                   <el-form ref="form3" :model="form3" :rules="rules3" style="margin-top:20px;">
                       <el-form-item label="上级名称" >
                    <select-tree v-model="form3.select_value" :options="select_data"  :props="defaultProps" />
                     </el-form-item>
                    <el-form-item label="权限名称" prop="title">
                        <el-input v-model="form3.title"></el-input>
                    </el-form-item>
                     <el-form-item label="应用" prop="app">
                        <el-input v-model="form3.app"></el-input>
                    </el-form-item>
                     <el-form-item label="控制器" prop="controller">
                        <el-input v-model="form3.controller"></el-input>
                    </el-form-item>
                     <el-form-item label="方法" prop="action">
                        <el-input v-model="form3.action"></el-input>
                    </el-form-item>
                     <el-form-item label="参数" >
                        <el-input v-model="form3.param"></el-input>
                    </el-form-item>
                   
                    <el-form-item>
                        <el-button type="primary" @click="addRule" class="animated pulse">立即添加</el-button>
                    </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

  </div>
</template>

<script>
import treeTable from "./TreeTable"
import spinner from '@/components/Spinner'
import SelectTree from '@/components/SelectTree';
export default {
    name:'Menu',
    components: { treeTable ,spinner,SelectTree},

    data() {
      return {
        loading:true,
        dialogwidth:'40%',
        activeName: 'first',
        editVisible: false,
        delVisible: false,
        addVisible: false,
        defaultProps: {
            parent: 'parent_id',   // 父级唯一标识
            value: 'id',          // 唯一标识
            label: 'title',       // 标签显示
            children: 'children', // 子级
        },
        form: {
            select_value:'',
            title: '',
            app:'',
            controller:'',
            action :'',
            param:'',
            id :''
        },
        form2: {
            title: '',
            app:'',
            controller:'',
            action :'',
            param:'',
            id :''
        },
         form3: {
            select_value:'',
            title: '',
            app:'',
            controller:'',
            action :'',
            param:''
        },
        idx: -1,
       columns: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "权限规则名称",
          value: "title"
        },
        {
          text: "权限规则路径",
          value: "name"
        }
      ],

      data: [],
      select_data: [
         {
            parent_id:'0',
            id: '0',         
            title: '作为一级',
            children:''  
         }
     ],
     rules1: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          select_value: [
              { required: true, message: '请选择上级名称', trigger: 'blur'  }
          ],
          app:[
               { required: true, message: '请输入模块名称', trigger: 'blur'  }
          ],
         controller:[
               { required: true, message: '请输入控制器名称', trigger: 'blur'  }
          ],
         action:[
               { required: true, message: '请输入方法名称', trigger: 'blur'  }
          ],
     },
      rules2: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          app:[
               { required: true, message: '请输入模块名称', trigger: 'blur'  }
          ],
         controller:[
               { required: true, message: '请输入控制器名称', trigger: 'blur'  }
          ],
         action:[
               { required: true, message: '请输入方法名称', trigger: 'blur'  }
          ],
     },
      rules3: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          app:[
               { required: true, message: '请输入模块名称', trigger: 'blur'  }
          ],
         controller:[
               { required: true, message: '请输入控制器名称', trigger: 'blur'  }
          ],
         action:[
               { required: true, message: '请输入方法名称', trigger: 'blur'  }
          ],
     },


    }
  },
  mounted() {
            this.getData()
            this.get_treeselect()
            if(document.body.clientWidth < 750){
                this.dialogwidth = '90%'
            }
        },
    methods: {
        getData() {
            this.$http('get', '/api/admin/rules/get_all_rules').then(res => {
                      this.data = res.data.data;
                      this.loading = false
                })
        },
        get_treeselect(){
             this.$http('get', '/api/admin/rules/get_all_rules').then(res => {
                      for(let key in res.data.data){
                          let single = {}
                          single.id = res.data.data[key].id
                          single.parent_id = res.data.data[key].parent_id
                          single.title = res.data.data[key].title
                          single.children = res.data.data[key].children
                          this.select_data.push(single)
                          
                      }
                       //console.log(this.select_data)
                })
        },
         handleDelete(index, row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http('post', '/api/admin/rules/del_rules',{id:row.id}).then(res => {
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
         handleEdit(index, row) {
                const item = row;
                this.form = {
                    app: item.name.split("/")[0],
                    title: item.title,
                    id : row.id,
                    controller : item.name.split("/")[1],
                    action : item.name.split("/")[2],
                    param : ''
                }
                this.editVisible = true;
            },
            // 保存编辑
        saveEdit() {
                this.$refs['form1'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/rules/edit_rules',{
                            title      : this.form.title,
                            app        : this.form.app,
                            controller : this.form.controller,
                            action     : this.form.action,
                            param      : this.form.param,
                            id         : this.form.id
                        }).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.editVisible = false;
                            this.getData();
                            this.form.title = ''
                            this.form.app = ''
                            this.form.controller = ''
                            this.form.action = ''
                            this.form.param = ''
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
    //添加下属规则
        handleAdd(index, row) {
                const item = row;
                this.form2 = {
                    app: '',
                    title: '',
                    id : row.id,
                    controller :'',
                    action : '',
                    param : ''
                }
                this.addVisible = true;
            },
        saveAdd(){
                this.$refs['form2'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/rules/add_subrules',{
                            title      : this.form2.title,
                            app        : this.form2.app,
                            controller : this.form2.controller,
                            action     : this.form2.action,
                            param      : this.form2.param,
                            parent_id  : this.form2.id
                        }).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.addVisible = false;
                            this.getData();
                            this.form2.title = ''
                            this.form2.app = ''
                            this.form2.controller = ''
                            this.form2.action = ''
                            this.form2.param = ''
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
        //添加规则
        addRule(){
                this.$refs['form3'].validate((valid) => {
                    if(valid){
                        console.log(this.form3.select_value)
                        this.$http('post', '/api/admin/rules/add_rules',{
                            title      : this.form3.title,
                            app        : this.form3.app,
                            controller : this.form3.controller,
                            action     : this.form3.action,
                            param      : this.form3.param,
                            parent_id  : this.form3.select_value
                        }).then(res => {
                        if(res.data.code ==200){
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.getData();
                            this.form3.select_value = ''
                            this.form3.title = ''
                            this.form3.app = ''
                            this.form3.controller = ''
                            this.form3.action = ''
                            this.form3.param = ''
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