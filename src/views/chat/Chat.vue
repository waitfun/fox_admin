<template>
  <div class="chat_content "  >
    <div class="navtop">  
      <div >
        <span class="">
            <div><img src="./../../../static/img/img.jpg" @click="handleToggleDrawer" style="height:32px;width:32px;margin:10px 0px 0px 10px;border-radius:50%"></div>
           
        </span> 
      </div> 
      <div >
        <span class="">
            {{title}}
        </span> 
      </div> 
      <div >
        <span class="">
            <el-button round class="btn-search el-icon-search" size="small" @click="search()">搜索</el-button>
        </span> 
      </div> 
  </div>
            <div class="list-item " v-for="(item) in list " :key="item.title" data-type="0">
                <div class="list-box" @touchstart.capture="touchStart(item.id)"    @touchmove.capture='touchMove(item.id)' @touchend.capture="touchEnd(item.id)" >
                    <img class="list-img" :src="item.imgUrl" alt="">
                    <div class="list-content">
                        <p class="title">{{item.title}}</p>
                        <p class="tips">{{item.tips}}</p>
                        <p class="time">{{item.time}}</p>
                    </div>
                </div>
            </div>
        
  </div>
  
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  data () {
    return {
       list : [
					{
						title : 'Chrome更新了' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '不再支持Flash视频播放' ,
                        time : '上午 8:30',
                        id:1
					},
					{
						title : '电影新资讯' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
                        time : '上午 12:00',
                        id:2
					},
                    {
						title : '聚焦两会·共筑中国梦' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '习近平代表的两会故事' ,
                        time : '下午 17:45',
                         id:3
                    },
                    {
						title : '微信团队' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
                        time : '昨天',
                         id:4
                    }
				],
                 timeOutEvent:'0',
                 visible:false,
                 title:'消息'

    }
  },
  created(){
      // 禁用右键
       // document.oncontextmenu = new Function("event.returnValue=false");
        // 禁用选择
        document.onselectstart = new Function("event.returnValue=false");
        
  },
	mounted(){
     
     
	},
	methods:{
       	//跳转
			skip(e){
                 console.log(e) 
                 alert('点击')
			},
			////开始按
			touchStart(e){
				  this.timeOutEvent = setTimeout(()=>{
                      this.longPress(e)
                      
                  },500);//这里设置定时器，定义长按500毫秒触发长按事件
                  return false;
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
			touchMove(e){
                clearTimeout(this.timeOutEvent);//清除定时器
                this.timeOutEvent = 0;
			},
			  //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			touchEnd(e){
                 clearTimeout(this.timeOutEvent);//清除定时器
                  if(this.timeOutEvent!=0){
                      //这里写要执行的内容（如onclick事件）
                     this.skip(e)
                  }
                  return false;
			},
           longPress(e){
               this.timeOutEvent = 0;
               this.visible = !this.visible 
               alert('长按')
              console.log(e)
              let part = ""
           },
			//删除
			deleteItem(e){
				let index = e.currentTarget.dataset.index;
				this.restSlide();
				this.list.splice(index,1);
            },
             handleToggleDrawer() {
                 eventBus.$emit('toggle', true);
                 console.log(23333)
            }
		
      
    },
     watch: { 
       
 }  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.chat_content{ 
  background:#fff; 
  margin-top:48px;
  height: 1000px;
  width:100%;
}
 
 
.list-item{
    position: relative;
    height: 3.5rem;
    width:100%;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    /* 禁止复制 */
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
}
.list-item[data-type="0"]{
    transform: translate3d(0,0,0);
}
.list-item[data-type="1"]{
    transform: translate3d(-2rem,0,0);
}
.list-item:after{
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
    }
.list-box{
        padding: 0.2rem;
        background: #fff;
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
    }
    .list-item .list-img{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
    }
    .list-item .list-content{
        padding: 0.1rem 0 0.1rem 0.2rem;
        position: relative;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        overflow: hidden;
    }
    .list-item .title{
        display: block;
        color: #333;
        overflow: hidden;
        font-size: 15px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .tips{
        display: block;
        overflow: hidden;
        font-size: 12px;
        color: #999;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .time{
        display: block;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 0.1rem;
        color: #666;
    }
    

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
