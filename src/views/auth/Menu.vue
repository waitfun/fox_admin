<template>
  <div class="container ">
       <spinner v-if='loading'></spinner>
       <el-tabs  v-model="activeName"  v-if='!loading'>
            <el-tab-pane :label="'后台菜单'" name="first">
    <tree-table :data="data" :columns="columns" border>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleAdd(scope.$index, scope.row)">添加子菜单</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>

     <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" :visible.sync="editVisible" :width="dialogwidth">
                        <el-form ref="form1" :model="form" :rules="rules1" >
                           
                            <el-form-item label="菜单名称"  prop="title">
                                <el-input v-model="form.title"  width="80%"></el-input>
                            </el-form-item>
                            <el-form-item label="菜单路径"  prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>

                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveEdit">确 定</el-button>
                        </span>
                        
                    </el-dialog>
        <!-- 添加弹出框 -->
                    <el-dialog title="添加子菜单" :visible.sync="addVisible" :width="dialogwidth">
                        <el-form ref="form2" :model="form2" :rules="rules2">
                           
                            <el-form-item label="菜单名称"  prop="title">
                                <el-input v-model="form2.title"></el-input>
                            </el-form-item>
                            <el-form-item label="菜单路径" prop="name">
                                <el-input v-model="form2.name"></el-input>
                            </el-form-item>
                            </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveAdd">确 定</el-button>
                        </span>
                         
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane :label="`添加菜单`" name="second">
                     <el-alert
                        title="此处是添加菜单操作"
                        type="success"
                        :closable="false">
                    </el-alert>
                   <el-form ref="form3" :model="form3" :rules="rules3">
                        <el-form-item label="上级名称" >
                    <select-tree v-model="form3.select_value" :options="select_data"  :props="defaultProps" />
                     </el-form-item>
                    <el-form-item label="菜单名称" prop="title">
                        <el-input v-model="form3.title"></el-input>
                    </el-form-item>
                     <el-form-item label="菜单路径" prop="name">
                        <el-input v-model="form3.name"></el-input>
                    </el-form-item>
                     <el-form-item label="图标" prop="icon">
                        <el-input v-model="form3.icon"></el-input>
                    </el-form-item>
                   
                    <el-form-item>
                        <el-button type="primary" @click="addMenu" class="animated pulse">立即添加</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

  </div>
</template>

<script>
import treeTable from "./TreeTable"
import spinner from '@/components/Spinner.vue';
import SelectTree from '@/components/SelectTree';
export default {
    name:'Menu',
    components: { treeTable,spinner,SelectTree },

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
        select_data: [
         {
            parent_id:'0',
            id: '0',         
            title: '作为一级',
            children:''  
         }
        ],
        form: {
            name: '',
            title: '',
            id :''
        },
        form2: {
            name: '',
            title: '',
            id :''
        },
         form3: {
            name: '',
            title: '',
            icon :'',
            select_value:''
        },
        idx: -1,
       columns: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "菜单名称",
          value: "title"
        },
        {
          text: "菜单路径",
          value: "name"
        }
      ],

     data: [],
     rules1: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          name: [
              { required: true, message: '请输入菜单路径', trigger: 'blur'  }
          ],
     },
      rules2: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          name: [
              { required: true, message: '请输入菜单路径', trigger: 'blur'  }
          ],
     },
      rules3: {
          title: [
             { required: true, message: '请输入菜单名称', trigger: 'blur'  }
          ],
          name: [
              { required: true, message: '请输入菜单路径', trigger: 'blur'  }
          ],
          icon:[
               { required: true, message: '请输入图标', trigger: 'blur'  }
          ],
     },


    }
  },
  mounted() {
            this.getData()
            this. get_treeselect()
            if(document.body.clientWidth < 750){
                this.dialogwidth = '90%'
            }
        },
    methods: {
        getData() {
            this.$http('get', '/api/admin/menu/get_all_menu').then(res => {
                     this.data = res.data.data;
                     this.loading = false
                })
        },
        get_treeselect(){
             this.$http('get', '/api/admin/menu/get_all_menu').then(res => {
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
                    this.$http('post', '/api/admin/menu/del_menu',{id:row.id}).then(res => {
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
                    name: item.name,
                    title: item.title,
                    id : row.id
                }
                this.editVisible = true;
            },
            // 保存编辑
        saveEdit() {
                this.$refs['form1'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/menu/edit_menu',{
                            name  : this.form.name,
                            title : this.form.title,
                            id    : this.form.id
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.editVisible = false;
                                this.getData();
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
           
        handleAdd(index, row) {
                const item = row;
                this.form2 = {
                    name: '',
                    title: '',
                    id : row.id
                }
                this.addVisible = true;
            },
        //添加子菜单
        saveAdd(){
                this.$refs['form2'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/menu/add_submenu',{
                            name  : this.form2.name,
                            title : this.form2.title,
                            id    : this.form2.id
                        }).then(res => {
                            
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.addVisible = false;
                                this.getData();
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
        addMenu(){
                this.$refs['form3'].validate((valid) => {
                    if(valid){
                        this.$http('post', '/api/admin/menu/add_menu',{
                            name  : this.form3.name,
                            title : this.form3.title,
                            icon  : this.form3.icon,
                            parent_id : this.form3.select_value
                        }).then(res => {
                            if(res.data.code ==200){
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg
                                });
                                this.getData();
                                this.form3.name = ''
                                this.form3.title = ''
                                this.form3.icon = ''
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