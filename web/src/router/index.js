import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import('@/views/Home')
const Note = () => import('@/views/Note')
const Detail = () => import('@/views/Detail')



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/web/index',
      name: 'Home',
      component: Home
    },
    {
      //动态路由参数，以冒号开头
      path: '/web/note/:page',
      name: 'Note',
      component: Note
    },
    {
      path: '/web/detail/:id',
      name: 'Detail',
      component: Detail
    },
    
    
  ]
})
