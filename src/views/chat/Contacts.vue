<template>
    <div  class="chat_content " >
       <!-- <ul>
            <li class="list-item " v-for="(item,index) in list " :key="item.time" data-type="0">
                <div class="list-box" 
                 @touchstart='touchStart'
                
                 @touchend='touchEnd'
                 @click="skip"
                  :style="deleteSlider">
                    <img class="list-img" :src="item.imgUrl" alt="">
                    <div class="list-content">
                        <p class="title">{{item.title}}</p>
                        <p class="tips">{{item.tips}}</p>
                        <p class="time">{{item.time}}</p>
                        
                    </div>
                    
                </div>
                <div class="delete"  ref='remove' @click="deleteItem" :data-index="index">删除</div>
            </li>
         </ul> -->
            <div class="list-item " v-for="(item) in list " :key="item.time" >
              <leftSlider >
                 <div class="list-box"  >
                    <img class="list-img" :src="item.imgUrl" alt="">
                    <div class="list-content">
                        <p class="title">{{item.title}}</p>
                        <p class="tips">{{item.tips}}</p>
                        <p class="time">{{item.time}}</p>
                        
                    </div>
                    
                </div>
                <!-- <div class="delete"  ref='remove' @click="deleteItem" :data-index="index">删除</div> -->
            </leftSlider>
          </div>

    </div>
</template>
<script type="text/ecmascript-6">

 import leftSlider from "./Slide.vue"

    export default {
       components: {
            leftSlider,
        },
        props: {
            index: Number
        },
        data() {
            return {
                startX: 0,   //触摸位置
                endX: 0,     //结束位置
                moveX: 0,   //滑动时的位置
                disX: 0,    //移动距离
                deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
                lastIndex: "",
                startY: 0,   //触摸位置
                endY: 0,     //结束位置
                moveY: 0,   //滑动时的位置
                 list : [
					{
						title : 'Chrome更新了' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '不再支持Flash视频播放' ,
						time : '上午 8:30'
					},
					{
						title : '电影新资讯' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
						time : '上午 12:00'
					},
                    {
						title : '聚焦两会·共筑中国梦' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '习近平代表的两会故事' ,
						time : '下午 17:45'
                    },
                    {
						title : '微信团队' ,
						imgUrl : 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198458799,3572664891&fm=27&gp=0.jpg' ,
						tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
						time : '昨天'
                    }
				],
            }
 
        },
        methods: {
          	skip(e){
              if( this.checkSlide() ){
                this.restSlide();
                      }else{
                          let index = e.currentTarget.dataset.index;
                          console.log(index) 
                //alert('你点击了'+index+'条item')
                      }
            },
             
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                console.log(listItems);
                // 复位
                for (let i = 0; i < listItems.length; i++) {
                      listItems[i].firstChild.style = "transform:translateX(0" + "px)";
                    	listItems[i].dataset.type = 0;
                }
            },
             //判断当前是否有滑块处于滑动状态
            checkSlide(){
              let listItems = document.querySelectorAll('.list-item');
              for( let i = 0 ; i < listItems.length ; i++){
                if( listItems[i].dataset.type == 1 ) {
                  return true;
                }
              }
              return false;
            },
          
           deleteItem(e){
            let index = e.currentTarget.dataset.index;
            this.restSlide();
            this.list.splice(index,1);
            console.log(index)
          },
           
        }
    }
</script>
<style scoped >
.chat_content{ 
  background:#fff; 
  margin-top:48px;
  min-height: 736px;
  height:auto;
  width:100%;
}
 
 .list-item{
    position: relative;
    user-select: none;
    height: 3.7rem;
    width:100%;
    
}


.list-box{
        padding: .4rem;
        background: #fff;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        z-index: 9999;
    }
    .list-item .list-img{
        display: block;
        width: 1.8rem;
        height: 1.8rem;
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
     .list-item .delete{
        display: flex;
           
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 3rem;
            height: 3rem;
            right: 0;
            top: 0;
            color: #fff;
            text-align: center;
            font-size: .16rem;
            background: #f00;
            z-index: 1000;
    
    }
</style>
