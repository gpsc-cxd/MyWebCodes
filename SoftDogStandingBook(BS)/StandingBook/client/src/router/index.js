import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Insert from '@/components/Insert'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title:'加密锁台账管理',
        keepAlive: true
      }
    },
    {
      path: '/insert',
      name: 'Insert',
      component: Insert,
      meta: {
        title:'新增加密锁记录',
        keepAlive: true
      }
    }
  ]
})
