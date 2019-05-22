<template>

  <div class="panel-cover" v-bind:style="{backgroundImage:'url(' + bingImg.imgUrl + ')'}">
    <div class="panel-main">
      <div class="panel-main__inner panel-inverted">
        <div class="panel-main__content">
          <!-- 此处为图片logo -->
          <!-- <router-link to="/web/index">
            <img src="" class="panel-cover__logo iUp up">
          </router-link> -->
          
          <div class="navigation-wrapper iUp" :class="{'up':this.show}">
            
            <nav class="cover-navigation cover-navigation--primary">
              <ul class="navigation">
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
                </ul>
              </nav>
            </div> -->
          </div>
        </div>
      </div>
      <div class="panel-cover--overlay cover-slate"></div>
    </div>
    <div class="bg-copyright iUp" :class="{'up':this.show}">
      <span class="icp">{{bingImg.copyright}}</span>
    </div>
    <!-- <div class="beian iUp up">
      <a class="icp" href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">渝ICP备XXXXXXX号-1</a>
      <a class="gwab" href="http://www.beian.gov.cn/portal/recordQuery" target="_blank">渝公网安备XXXXXXXX号</a>
    </div> -->
  </div>

</template>
<script>
  export default {
    name: 'home',
    data(){
      return{
        bingImg:{
        },
        show:false,
      }
    },
    components: {
      
    },
    methods:{

    },
    async created(){
      let res = await this.$hslApi.get('wallpaper', {})
      console.log(res.data);
      this.bingImg = res.data;
    },
    mounted(){
      let that = this;
      setTimeout(()=>{
        that.show = true;
      },600)
    },
  }
</script>
<!-- 添加“scoped”属性以仅将CSS限制到此组件 -->
<style>
  .navigation__item {
    display: inline-block;
    margin: 5px 6px 0 0;
    line-height: 1em;
  }
  .beian {
    position: absolute;
    z-index: 900;
    bottom: 5px;
    right: 5px;
    text-align: center;
    color: #fff;
    opacity: .25 !important;
    padding-bottom: 3px;
    letter-spacing: -3px;
    font-size: 0;
  }
  .bg-copyright{
    position: absolute;
    z-index: 900;
    bottom: 5px;
    left: 5px;
    text-align: center;
    color: #fff;
    opacity: .25 !important;
    padding-bottom: 3px;
    letter-spacing: -3px;
    font-size: 0;
  }
  @media screen and (max-width: 960px){
    .beian {
      display: none;
    }
  }
  .gwab, .icp {
    display: inline-block;
    color: #fff !important;
    letter-spacing: 0;
    font-size: 12px;
    line-height: 16px;
    margin: 0;
    vertical-align: middle;
  }
  /* .gwab {
    background: url(index/img/beian.png) no-repeat;
    background-size: 12px 12px;
    background-position: 3px 2px;
    padding-left: 18px;
  } */
</style>