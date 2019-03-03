<template>
  <div class="">
    <footer class="footer">  
      <div  v-for ="item in routerList" :key="item.name" @click="change_router(item.name)">
          <router-link :to="{name:isSelect}"  mode="out-in"> 
             <span :class="isSelect == item.name ? 'tab-active' : ''">
                <div><i :class="item.icon"></i></div>
                <div>{{item.title}}</div>
             </span> 
          </router-link>
      </div> 
  </footer>
  </div>
</template>

<script>
export default {
  props: {
    //数据源
    routerList: Array,
    //默认激活的路由
    default_active_router: String
  },
  data () {
    return {
      isSelect:'',
    }
  },
	created(){
      this.isSelect = sessionStorage.getItem('routerIsSelect') ?  sessionStorage.getItem('routerIsSelect') : this.default_active_router;
      this.change_router(this.isSelect );  
		},
		methods:{
      change_router(path_name){
          this.isSelect = path_name
          this.$router.push({name:path_name})
          sessionStorage.setItem('routerIsSelect',path_name);  
        }
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.footer{ 
  background:#fff; 
  position:fixed; 
  height:3rem; 
  border-top:.05rem solid #f1f1f1;
  left: 0px;
  bottom: 0px;
  width: 100%;
  z-index: 9999;
}
 .footer>div{
    width:33%;
    height:100%; 
    float:left; 
    align-items:center; 
    text-align: center;
}
 
.footer > div a{ 
  width:100%;
  height:100%; 
  display:flex; 
  justify-content:center; 
  float:left; 
  align-items:center; 
  flex-direction:row; 
  color:#000;
  font-size:.75rem;
  text-decoration: none;
}  
.footer>div:last-child{border-right:0} 

.tab-active{ 
  color:#f00;
   /* border-bottom: 3px solid #f90; */
  }


</style>
