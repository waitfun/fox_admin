<template>
  <div>
    <!-- <nav-top>
      <div slot="menu">23232</div>
      <div slot="content">
        <transition :name="transitionName" >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
    </transition>
     <footer-nav :routerList="routerList" :default_active_router="default_active_router" ref="change_router"></footer-nav> 
      </div>
    </nav-top> -->
    
     <drawer-layout
        ref="drawer"
      :drawer-width="300"
      :enable="true"
      :animatable="true"
      :z-index="0"
      :drawable-distance="Math.floor(600/3)"
      :content-drawable="true"
      :backdrop="true"
      :backdrop-opacity-range="[0,0.4]"
     
      @mask-click="MaskClick">
        <div class="drawer" slot="menu">
          <div class="text" >This is drawer</div>
        </div>
       
        <div class="" slot="content">
          <div class="text">
             <transition :name="transitionName" >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
    </transition>
     <footer-nav :routerList="routerList" :default_active_router="default_active_router" ref="change_router"></footer-nav> 
          </div>
        </div>
      </drawer-layout>
  </div>
  
</template>

<script>
import NavTop from './NavTop'
import FooterNav from './Footer'
import DrawerLayout from './DrawerLayout'
import router from '../../router'
export default {
   name:'Index',
   components:{FooterNav,NavTop,DrawerLayout},
  data () {
   
    return {
      //当前路由
      nowPath: '',
      //记录点击坐标
      startX: '',
      //滑动类型
      transitionName: '',
       //默认激活的路由
      default_active_router: 'chat',
      routerList:[
        {title:'消息',name:'chat',icon:'iconfont icon-pinglun',},
        {title:'联系人', name:"contacts",icon:'iconfont icon-my',},
        {title:'群', name:"group",icon:'iconfont icon-qunzu',}
      ],
      //路由名称数组, ['chat','contacts','group'];
      router_name :[],
   
    }
  },
  computed: {
    },
  created(){
       this.initRouter()
    },
  mounted () {
    //获取当前路由
      this.nowPath = this.$route.name
    //  this.initTouchedEvent()
    },
  methods: {
      initRouter () {
          this.routerList.forEach((v, index) => {
              let path_name ={}
              path_name = v.name
              this.router_name.push(path_name)
          });
      },
      //初始化touch时间
       initTouchedEvent() {
            this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
            this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
        },
        //start touch
        touchedstartHandler(e) {
          //记录点击坐标
            this.startX = e.changedTouches[0].pageX;
        },
        //end touch
        touchendHandler(e) {
          //坐标改变的距离
            let direction = this.startX - e.changedTouches[0].pageX;
            //当前路由索引
            let nowRouteIndex = 0;
            this.router_name.forEach((v, index) => {
                if (v == this.nowPath) {
                    nowRouteIndex = index;
                }
                
            });
            //屏幕滑动，从左往右是负数（-50），从右往左是正数（50）
            if (direction > 50  && nowRouteIndex <this.router_name.length - 1) {
               //调用子组件中的方法
                let path = this.router_name[nowRouteIndex + 1]
              //  console.log(path)
                this.$refs.change_router.change_router(path)
            
            } 
            if (direction < -50  && nowRouteIndex > 0) {
                let path = this.router_name[nowRouteIndex - 1]
                this.$refs.change_router.change_router(path)
            }
        },
       
      MaskClick() {
          console.log(333)
       eventBus.$emit('toggle', false);
       console.log(333)
       // this.$refs.drawer.toggle(false);
      }
  },
  watch: { 
    '$route' (to, from) { 
      let compare = this.router_name.indexOf(to.name) > this.router_name.indexOf(from.name);
      this.transitionName = compare ? 'slide-left' : 'slide-right';
      //获取当前路由
      this.nowPath = to.name;
  } 
 }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  width:100%;
  transition: all 500ms ;
  position: absolute;
}

.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
   transform: translateX(100%);
}
.slide-left-enter {
    transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}


</style>



