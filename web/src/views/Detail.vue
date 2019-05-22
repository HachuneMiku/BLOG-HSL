<template>

  <div class="post-template mobile">
    
    <!------------ 手机端菜单 ------------>
    <Header :bingImg="bingImg" :show="show" :dropdown="dropdown"></Header>
    <!------------ ↑↑↑↑↑↑ ------------>
    
    <div class="content-wrapper animated slideInRight">
      <div class="content-wrapper__inner">
            
        <article class="post-container post-container--single">
          <!-- 文章头部 -->
          <header class="post-header">
            <div class="post-meta">
              <time class="post-meta__date date">{{article.cdate}}</time>  
              <span class="post-meta__tags tags"></span>
            </div>
            <h1 class="post-title">{{article.title}}</h1>
          </header>
          <!-- 文章内容部分 -->
          <section class="post">
            <div v-html="article.content"></div>
          </section>

        </article>
  
        <!-- <div class="read-more">
           <div class="read-more-item read-more-item-left">
             <span class="read-more-item-dim">上一篇文章</span>
             <h2 class="post-list__post-title post-title"><a href="">给一台腾讯云服务器配上4/12/20个免费外网弹性IP</a></h2>
           </div>
         
           <div class="read-more-item read-more-item-right">
              <span class="read-more-item-dim">下一篇文章</span>
              <h2 class="post-list__post-title post-title"><a href="">利用原生JS实现类似浏览器查找高亮功能</a></h2>
           </div>
        </div> -->
        <!-- 占位块 -->
        <section class="post-comments"></section>


        <Footer></Footer>

      </div>
    </div>

  </div>

</template>
<script>
  import Footer from '../components/Footer';
  import Header from '../components/Header';

  export default {
    name: 'detail',
    components: {
      Footer,
      Header
    },
    data(){
      return{
        bingImg:{
        },
        show:false,
        dropdown:false,
        article:{},

      }
    },
    methods:{

      async showDetail(){
        let id = this.$route.params.id;
        let res = await this.$hslApi.post('/detail', {id});
        console.log(res.data.data[0]);
        if(res.data.code == 'yes'){
          this.article = res.data.data[0];
        }else{

        }
      }
    },
    async created(){
      /** 获得bing的壁纸 **/
      let res = await this.$hslApi.get('/wallpaper', {});
      this.bingImg = res.data;

      this.showDetail();


    },
    mounted(){
      let that = this;
      setTimeout(()=>{
        that.show = true;
      },600)
    },
  }
</script>
<style>
  .navigation__item {
    display: inline-block;
    margin: 5px 6px 0 0;
    line-height: 1em;
  }
</style>


