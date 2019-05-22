<template>
  <div class="header">
    <div class="menu-btn">
      <div class="menu"></div>
    </div>
    <h1 class="logo">
      <router-link to="/">
        <span>MYBLOG</span>
        <img src="../assets/img/logo.png">
      </router-link>
    </h1>
    <div class="nav">
      <router-link to="/web/index">文章</router-link>
      <router-link to="/web/whisper">微语</router-link>
      <router-link to="/web/leacots">留言</router-link>
      <router-link to="/web/album">相册</router-link>
      <router-link to="/web/about">关于</router-link>
    </div>
    <ul class="layui-nav header-down-nav">
      <li class="layui-nav-item"><router-link to="/web/index">文章</router-link></li>
      <li class="layui-nav-item"><router-link to="/web/whisper">微语</router-link></li>
      <li class="layui-nav-item"><router-link to="/web/leacots">留言</router-link></li>
      <li class="layui-nav-item"><router-link to="/web/album">相册</router-link></li>
      <li class="layui-nav-item"><router-link to="/web/about">关于</router-link></li>
    </ul>
    <p class="welcome-text">
      欢迎来到<span class="name">HSL</span>的博客~
    </p>
  </div>
</template>

<script>
  export default {
    name: 'TheHeader',
    components: {
      
    }
  }
</script>
<!-- 添加“scoped”属性以仅将CSS限制到此组件 -->
<style scoped>
  
</style>

