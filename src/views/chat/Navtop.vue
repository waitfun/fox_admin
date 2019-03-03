<template>
  <div class="particles">
    <div class="navtop">  
      <div >
        <span class="">
            <!-- <div><i class="iconfont icon-video video-icon" ></i></div> -->
            <div><img src="./../../../static/img/img.jpg" style="height:32px;width:32px;margin:10px 0px 0px 10px;border-radius:50%"></div>
           
        </span> 
      </div> 
      <div >
        <span class="">
            
        </span> 
      </div> 
      <div >
        <span class="">
            <el-button round class="btn-search el-icon-search" size="small" @click="search()">搜索</el-button>
        </span> 
      </div> 
      <!-- <div style="height:40px;width:100%;background:#f00"></div> -->
  </div>

  </div>
</template>

<script>


export default {
 
  data () {
    return {
      

    }
  },
    created(){
    },
    mounted(){
      
	},
	methods:{
     search(){
            this.$router.push('/search')
        },
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.navtop{ 
  background:#fff; 
  position:fixed; 
  height:3rem; 
  border-bottom:.05rem solid #f1f1f1;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 818;

}
 .navtop>div{
    width:33%;
    height:100%; 
    float:left; 
    align-items:center; 
    /* border-right:.05rem solid #f7f5f5; */
    /* text-align: center; */
}
.navtop > div a{ 
  width:100%;
  height:100%; 
  display:flex; 
  justify-content:center; 
  float:left; 
  align-items:center; 
  flex-direction:row; 
  color:#000;
  font-size:.3rem;
  text-decoration: none;
}  
.navtop>div:last-child{border-right:0} 
.active{ color:#f00}
.video-icon{
    color: #f00;
}
.btn-search{
    color: #6ED56C;
    border-color: #6ED56C;
    margin-top:8px;
    float: right;
    border:none;
    background:#fff;
}
</style>
