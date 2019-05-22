<template>
  <div>

    <span class="mobile btn-mobile-menu">
      <router-link to="/index" class="go-back-fixed"><i class="fa fa-home"></i></router-link>
			<i @click="downMenu" class="fa fa-bars btn-mobile-menu__icon" :class="{'fa-list':this.dropdown, 'fa-angle-up':this.dropdown , 'animated':this.dropdown , 'fadeIn':this.dropdown ,}"></i>
			<!-- <i class="fa fa-angle-up btn-mobile-close__icon hidden"></i> -->
    </span>
    <header class="panel-cover panel-cover--collapsed" v-bind:style="{backgroundImage:'url(' + bingImg.imgUrl + ')'}">
      <div class="panel-main">
  			<div class="panel-main__inner panel-inverted">
          <div class="panel-main__content">
            <!-- <a href="javascript:;" title="首屏" class="index-button" target="_blank"><img src="" class="panel-cover__logo iUp up">
            </a> -->
            <div class="navigation-wrapper iUp " :class="{'up':this.show, 'visible':this.dropdown, 'animated':this.dropdown, 'bounceInDown':this.dropdown}">
              <nav class="cover-navigation cover-navigation--primary">
                <ul class="navigation navigation--btns">
                  <li class="navigation__item">
                    <router-link :to="{name:'Home'}">主页</router-link>
                  </li>
                  <li class="navigation__item">
                    <router-link :to="{name:'Note',params:{page:1}}">笔记</router-link>
                  </li>
                  <li class="navigation__item">
                    <a href="https://www.hsl.wiki/admin/resume" target="_self">简历</a>
                  </li>
                  <li class="navigation__item">
                    <router-link to="/about">关于</router-link>
                  </li>
                </ul>
              </nav>
              <!-- <div class="iUp up">
                <nav class="cover-navigation navigation--social">
                  <ul class="navigation">
                		<li class="navigation__item">
                			<a href="" title="Github" target="_blank">
                				<i class="social iconfont"></i>
                				<span class="label">Github</span>
                			</a>
                		</li>
                		<li class="navigation__item">
                			<a href="" title="微信" target="_blank">
                				<i class="social iconfont"></i>
                				<span class="label">Wechat</span>
                			</a>
                		</li>
                		<li class="navigation__item">
                			<a href="" title="QQ" target="_blank">
                				<i class="social iconfont"></i>
                				<span class="label">QQ</span>
                			</a>
                		</li>
                		<li class="navigation__item">
                			<a href="" title="邮箱" target="_blank">
                				<i class="social iconfont"></i>
                				<span class="label">Email</span>
                			</a>
                		</li>
                		<li class="navigation__item">
                			<a href="" title="知乎" target="_blank">
                				<i class="social iconfont"></i>
                				<span class="label">Zhihu</span>
                			</a>
                		</li>
                  </ul>
                </nav>
              </div> -->
            </div>
          </div>
  			</div>
  			<div class="panel-cover--overlay cover-slate"></div>
  		</div>
      <router-link to="/index" class="go-back">
        <i class="fa fa-home"></i>
      </router-link>
		</header>
  
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: ['bingImg','show','dropdown'],
  methods:{
    downMenu(){
      this.dropdown = !this.dropdown;
    },
  }
}
</script>
<style>

</style>
