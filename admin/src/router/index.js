import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home');
const CategoryEdit = () => import('@/views/CategoryEdit');
const CategoryList = () => import('@/views/CategoryList');
const ArticleEdit = () => import('@/views/ArticleEdit');
const ArticleList = () => import('@/views/ArticleList');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {path:'/categories/create', component:CategoryEdit},
        {path:'/categories/list', component:CategoryList},

        {path:'/articles/create', component:ArticleEdit},
        {path:'/articles/list', component:ArticleList},
      ]
    },
    
  ]
})
