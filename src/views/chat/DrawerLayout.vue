<template>
    <div class="drawer-layout">
        <div class="drawer-wrap" :class="animateStyle" :style="drawerStyle">
            <slot name="menu"/>
        </div>
        <div class="content-wrap" :class="contentDrawable?animateStyle:{}"
             :style="contentDrawable?contentStyle:{}">
            <div class="drawer-mask" @click="handleMaskClick" :style="{'opacity':backdropOpacity}"
                 v-show="backdrop && pos">
                 </div>
                  
            <slot name="content"/>
        </div>
    </div>
</template>
<script>
   //持续的时间
    const duration = 500;
    //判断PC端(false) or 移动端(true),
    const isTouch = ('ontouchstart' in window) ? true : false;
    console.log(isTouch)
    const mouseEvents = isTouch ?
        {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend'
        } :
        {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup'
        };
    let containerWidth;
    export default {
        name: 'drawer-layout',
        props: {
            //宽度
            drawerWidth: {
                type: Number
            },
            //距离
            drawableDistance: {
                type: Number
            },
            //遮罩显示距离
            zIndex: {
                type: Number,
                default: 99999
            },
            contentDrawable: {
                type: Boolean,
                default: false
            },
           
            backdrop: {
                type: Boolean,
                default: true
            },
             //遮罩颜色
            backdropOpacityRange: {
                type: Array,
                default: function () {
                    return [0, 0.4]
                },
                validator: function (value) {
                    let [min, max] = value;
                    return min < max && min >= 0 && max <= 1
                }
            },
            enable: {
                type: Boolean,
                default: true
            },
            animatable: {
                type: Boolean,
                default: true
            },
            //从左？右？边出来
            reverse: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                width: this.drawerWidth,
                distance: this.drawableDistance,
                pos: 0,
                //可见状态
                visible: false,
                //移动状态
                moving: false,
                willChange: false
            }
        },
        created(){
             // 通过 Event Bus 进行组件间通信，来折叠
            eventBus.$on('toggle', visible => {
                if (visible === undefined) visible = !this.visible;
                this.visible = visible;
                //点击关闭
                this.pos = visible ? this.width : 0;
                //移动速度
                this.moving = true
            })
        },
        methods: {
            //展开
            toggle(visible) {
                if (visible === undefined) visible = !this.visible;
                this.visible = visible;
                //点击关闭
                this.pos = visible ? this.width : 0;
                //移动速度
                this.moving = true
            },
           
           
            //处理抽屉外的点击事件
            handleMaskClick() {
                if (this.moving) return;
                //传递值给父组件，用于处理点击遮罩的事件
                this.$emit('mask-click')
            }
        },
        watch: {
            'moving'() {
                if (!this.animatable) this.moving = false;
            },
            'willChange'() {
                if (!this.animatable) this.willChange = false;
            }
        },
        computed: {
            //动画类型
            animateStyle() {
                return {'moving': this.moving, 'will-change': this.willChange};
            },
            //抽屉类型
            drawerStyle() {
                const {zIndex, width, moveRate, pos, reverse} = this;
                return {
                    zIndex: zIndex,
                    width: `${width}px`,
                    [reverse ? 'right' : 'left']: `-${Math.ceil(width * moveRate)}px`,
                    transform: `translate3d(${reverse ? '-' : ''}${Math.ceil(pos * moveRate)}px,0,0)`
                };
            },
            //内容
            contentStyle() {
                const {pos, reverse} = this;
                return {transform: `translate3d(${reverse ? '-' : ''}${pos}px,0,0)`};
            },
            //遮罩值
            backdropOpacity() {
                const {backdropOpacityRange, pos, width} = this,
                    [min, max] = backdropOpacityRange;
                return min + max * (pos / width) || 0;
            },
            //移动值
            moveRate() {
                const {width, distance} = this;
                return distance / width;
            }
        },
        mounted() {
            const container = this.$el, containerWidth = parseInt(window.getComputedStyle(this.$el.parentNode).width);
            //默认宽度
            let defaultWidth = containerWidth * 0.8;
            this.width = this.width || defaultWidth;
            //默认距离
            this.distance = this.distance || defaultWidth;
            const {width, reverse} = this;
            let t1, t2, speed, startX, startY, nowX, nowY, lastX, startPos, isVerticle;
            const initDrag = function (e) {
                if (!this.enable) return;
                this.willChange = true;
                isVerticle = undefined;
                nowX = startX = e.clientX || e.changedTouches[0].clientX;
                startY = e.clientY || e.changedTouches[0].clientY;
                t2 = +new Date();
                startPos = this.pos;
                document.addEventListener(mouseEvents.move, drag, isTouch  ? {passive: true} : false);
                document.addEventListener(mouseEvents.up, removeDrag, isTouch  ? {passive: true} : false);
                this.$emit('slide-start')
            }.bind(this);
            const drag = function (e) {
                t1 = t2;
                t2 = +new Date();
                lastX = nowX;
                nowX = e.clientX || e.changedTouches[0].clientX;
                nowY = e.clientY || e.changedTouches[0].clientY;
                speed = [1, -1][+reverse] * (nowX - lastX) / (t2 - t1);
                let pos = startPos + [1, -1][+reverse] * (nowX - startX);
                pos = Math.min(width, pos);
                pos = Math.max(0, pos);
                if (isVerticle === undefined) isVerticle = Math.abs(nowX - startX) / Math.abs(nowY - startY) < Math.sqrt(3);
                if (!isVerticle) {
                    if (!(isTouch )) e.preventDefault();
                    this.pos = pos;
                    this.$emit('slide-move', pos);
                }
            }.bind(this);
            const removeDrag = function (e) {
                if (isVerticle !== undefined) {
                    if (!isVerticle) {
                        let pos = this.pos;
                        if (speed > 0) {
                            this.visible = (width - pos) / speed < duration || pos > width * 3 / 5
                        } else {
                            this.visible = !((0 - pos) / speed < duration || pos < width * 3 / 5)
                        }
                        if (this.pos > 0 && this.pos < width) this.moving = true;
                    }
                    this.pos = this.visible ? width : 0;
                }
                if (!this.moving) {
                    this.willChange = false;
                    this.$emit('slide-end', this.visible);
                }
                isVerticle = undefined;
                document.removeEventListener(mouseEvents.move, drag, isTouch  ? {passive: true} : false);
                document.removeEventListener(mouseEvents.up, removeDrag, isTouch ? {passive: true} : false);
            }.bind(this);
            'transitionend webkitTransitionEnd msTransitionEnd otransitionend oTransitionEnd'.split(' ').forEach((e) => {
                this.$el.addEventListener(e, () => {
                    if (this.moving) {
                        this.moving = false;
                        this.willChange = false;
                        this.pos = this.visible ? width : 0;
                        this.$emit('slide-end', this.visible);
                    }
                }, false)
            });
            container.addEventListener(mouseEvents.down, initDrag, isTouch  ? {passive: true} : false);
        }
    }
</script>

<style >
.drawer-layout{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
}
 .drawer-layout .drawer-wrap{
        position: absolute;
        top: 0;
        bottom: 0;
        transform: translateZ(0);
    }
  .drawer-layout .content-wrap{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        transform :translateZ(0);
         border-left:1px solid #ccc;
    }
   .drawer-layout    .drawer-mask{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        z-index: 99999;
   }
    .moving{
        transition: transform .3s ease
    }
    .will-change{
        will-change: transform
    }
</style>