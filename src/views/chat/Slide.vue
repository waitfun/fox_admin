<template>
       
        <div class="slider" data-type="0">
            <div class=""  
                 @touchstart='touchStart'
                 @touchmove='touchMove'
                 @touchend='touchEnd'
                :style="deleteSlider"
                 >
                  <slot> </slot>
            </div>
            <div class="remove" ref='remove' @click.prevent="deleteItem(index)">
                <span>删除</span>
            </div>
        </div>
</template>
<script type="text/ecmascript-6">
    export default {
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
                
            }
 
        },
        methods: {
            touchStart(ev){
                ev = ev || event
                this.restSlide()
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
 
                if (ev.touches.length == 1) {
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                    this.startY = ev.touches[0].clientY;
                }
            },
            touchMove(ev){
                ev = ev || event;
                let parentElement = ev.currentTarget.parentElement;
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd = 48;
                console.log('width：'+wd)
                if (ev.touches.length == 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveY = ev.touches[0].clientY
                    this.moveX = ev.touches[0].clientX
                    if (Math.abs(this.moveY - this.startY) < 30) {
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if (this.disX < wd / 2 || this.disX == 0) {
                            this.deleteSlider = "transform:translateX(0px)";
                            parentElement.dataset.type = 0;
                            // 大于0，表示左滑了，此时滑块开始滑动
                        } else if (this.disX > wd / 2) {
                            //具体滑动距离我取的是 手指偏移距离*5。
                            parentElement.dataset.type = 1;
                            this.deleteSlider = "transform:translateX(-" + this.disX + "px)";
 
                            // 最大也只能等于删除按钮宽度
                            if (this.disX*1.5 >= wd) {
                                parentElement.dataset.type = 1;
                                this.deleteSlider = "transform:translateX(-" + wd + "px)";
 
                            }
                        }
                    }
                }
            },
            touchEnd(ev){
                ev = ev || event;
                let parentElement = ev.currentTarget.parentElement;
                let wd = 48;
                if (ev.changedTouches.length == 1) {
 
                    let endY = ev.changedTouches[0].clientY;
                    if (Math.abs(this.startY - endY) < 30) {
                        let endX = ev.changedTouches[0].clientX;
                        this.disX = this.startX - endX;
                        console.log("touchEndthis.disX:", this.disX)
                        //如果距离小于删除按钮一半,强行回到起点
 
                        if (this.disX < (wd /2 )) {
                            parentElement.dataset.type = 0;
                            this.deleteSlider = "transform:translateX(0px)";
                        } else {
                            //大于一半 滑动到最大值
                            parentElement.dataset.type = 1;
                            this.deleteSlider = "transform:translateX(-" + wd + "px)";
                        }
                        console.log("touchEnd:dataset", parentElement.dataset.type);
                    }
                }
            },
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                console.log(listItems)
                // 复位
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].firstChild.style = "transform:translateX(0px)";
                    listItems[i].firstChild.dataset.type = 0;
                 }                                                                                                                                                                                                                                                                                                 }
            },
            deleteItem: function (index) {
                // this.$emit('deleteItem', index);
                // this.deleteSlider = "transform:translateX(0" + "rem)";
                console.log(index)
            }, //判断当前是否有滑块处于滑动状态
            checkSlide(){
				let listItems = document.querySelectorAll('.list-item');
				for( let i = 0 ; i < listItems.length ; i++){
					if( listItems[i].dataset.type == 1 ) {
						return true;
                    }
				}
				return false;
            },//跳转
			skip(e){
				if( this.checkSlide() ){
					this.restSlide();
                }else{
                    let index = e.currentTarget.dataset.index;
                    console.log(index) 
					//alert('你点击了'+index+'条item')
                }
			},
    }
</script>
<style scoped >
/* .chat_content{ 
  background:#fff; 
  margin-top:48px;
  min-height: 736px;
  height:auto;
  width:100%;
} */
 
  
   .remove {
            display: flex;
           
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 3rem;
            height: 3.3rem;
            right: 0;
            top: 0;
            color: #fff;
            text-align: center;
            font-size: .16rem;
            background: #f00;
            z-index: -9999;
            padding:.15rem 0rem .15rem 0rem;
            border-bottom: 1px solid #ccc;
    }
    .remove   span {
                display: block;
                color: #fff;
                font-size: .875rem;
    }

 
</style>
