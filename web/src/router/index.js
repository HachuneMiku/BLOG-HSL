import Vue from 'vue'
import Router from 'vue-router'


const Home = () => import('@/components/Home')
const Whisper = () => import('@/components/Whisper')
const Leacots = () => import('@/components/Leacots')
const Album = () => import('@/components/Album')
const About = () => import('@/components/About')
const Detail= () => import('@/components/Detail')


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
      path: '/web/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/web/whisper',
      name: 'Whisper',
      component: Whisper
    },
    {
      path: '/web/leacots',
      name: 'Leacots',
      component: Leacots
    },
    {
      path: '/web/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/web/about',
      name: 'About',
      component: About
    }
    
  ]
})
