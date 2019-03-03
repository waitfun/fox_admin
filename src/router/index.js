import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home/dashboard'
    },
    {
      path: '/',
      name: 'home',
      component:() => import('@/components/Home'),
      children:[
        {
            path: '/home/dashboard',
            name:'dashboard',
            component: () => import('../views/Dashboard'),
            meta: { title: '系统首页' ,requireAuth: true }
        },{
          
            path: '/home/menu',
            name:'menu',
            component: () => import('../views/auth/Menu'),
            meta: { title: '后台菜单' ,requireAuth: true}
        },{
          
          path: '/home/rules',
          name:'rules',
          component: () => import('../views/auth/Rules'),
          meta: { title: '权限规则' ,requireAuth: true }
        },{
          path: '/home/rabc',
          name:'rabc',
          component: () => import('../views/auth/Rabc'),
          meta: { title: '角色管理' ,requireAuth: true}
        },{
          path: '/home/auth',
          name:'auth',
          component: () => import('../views/auth/Auth'),
          meta: { title: '权限设置' ,requireAuth: true}
        },{
          path: '/home/man_user',
          name:'user',
          component: () => import('../views/auth/User'),
          meta: { title: '管理员' ,requireAuth: true}
        },{
          path: '/home/setting',
          name:'setting',
          component: () => import('../views/my/Setting'),
          meta: { title: '设置' ,requireAuth: true}
        },{
          path: '/home/article',
          name:'article',
          component: () => import('../views/portal/Article'),
          meta: { title: '文章管理' ,requireAuth: true}
        },{
          path: '/home/article_category',
          name:'article_category',
          component: () => import('../views/portal/Category'),
          meta: { title: '分类管理' ,requireAuth: true}
        },{
          path: '/home/website_setup',
          name:'website_setup',
          component: () => import('../views/website/Website'),
          meta: { title: '网站信息' ,requireAuth: true}
        },{
          path: '/home/email',
          name:'email',
          component: () => import('../views/email/Index'),
          meta: { title: '邮箱信息' ,requireAuth: true}
        },{
          path: '/home/sms',
          name:'sms',
          component: () => import('../views/sms/Index'),
          meta: { title: '短信配置' ,requireAuth: true}
        }
      ]
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/404',
        name:'404',
        component: () => import('../views/404'),
        meta: { title: '404' }
    },{
      path: '/login',
      name:'login',
      component:() => import('../views/Login'),
      meta: { title: '登录' }
  },
  {
    path: '/chat/index',
    redirect: '/chat'
  },
  {
    path: '/chat/index',
    name:'chat_index',
    component:() => import('../views/chat/Index'),
    children:[
      {
          path: '/chat',
          name:'chat',
          component: () => import('../views/chat/Chat'),
          meta: { title: '消息',requireAuth: true}
      },
      {
        path: '/contacts',
        name:'contacts',
        component: () => import('../views/chat/Contacts'),
        meta: { title: '联系人',requireAuth: true}
    },
    {
      path: '/group',
      name:'group',
      component: () => import('../views/chat/Group'),
      meta: { title: '群组',requireAuth: true}
    },
    ]
   
  },
  ]
})
