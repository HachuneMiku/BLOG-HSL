<template>

  <div class="home-template mobile">
   
    <!------------ 手机端菜单 ------------>
    <Header :bingImg="bingImg" :show="show" :dropdown="dropdown"></Header>
    <!------------ ↑↑↑↑↑↑ ------------>
    
    <div class="content-wrapper animated slideInRight">
      <div class="content-wrapper__inner">      
        <div class="main-post-list">
          <!-------- 文章列表 -------->
          <ol class="post-list">

            <li v-for="item in articleData">
              <h2 class="post-list__post-title post-title">
                <router-link :to="{name:'Detail', params:{id: item.id}}">
                  {{item.title}}
                </router-link>
              </h2>
              <p class="excerpt">
                
              </p>
              <div class="post-list__meta">
                <time class="post-list__meta--date date">{{item.cdate}}</time>  
                <span class="post-list__meta--tags tags"></span>
                <router-link :to="{name:'Detail', params:{id: item.id}}">阅读全文</router-link>
              </div>
              <hr class="post-list__divider">
            </li>
            <!-- <li>
              <h2 class="post-list__post-title post-title">
                <a href="https://i.congm.in/tencent-cloud-eip/" title="link to 给一台腾讯云服务器配上4/12/20个免费外网弹性IP">给一台腾讯云服务器配上4/12/20个免费外网弹性IP</a>
              </h2>
              <p class="excerpt">一、申请弹性网卡与弹性IP：根据腾讯云服务器网卡相关的限制规则：https://cloud.tencent.com/document/product/213/15379#.E7.BD.91.E5.8D.A1.E7.9B.B8.E5.85.B3.E9.99.90.E5.88.B6根据 CPU 和内存配置不同，云服务器可以绑定的弹性网卡数和单网卡绑定 IP 数如下表所示： 云服务器配置 弹性网卡数 网卡绑定 IP 数 单台机器总计 IP 数 CPU: 1核 内存: 1G 2 2 4 CPU: 1核…</p>
              <div class="post-list__meta">
                <time datetime="2019年03月10日" class="post-list__meta--date date">2019年03月10日</time>  <span class="post-list__meta--tags tags"></span>
                <a class="btn-border-small" href="https://i.congm.in/tencent-cloud-eip/">阅读全文</a>
              </div>
              <hr class="post-list__divider">
            </li> -->
            
          </ol>

          <hr class="post-list__divider ">

          <!-- 分页 -->
          <nav class="pagination">
            <router-link :to="{name:'Note',params:{page: this.pageNow-1}}" v-if="pageNow > 1" class="newer-posts pagination__newer btn btn-small btn-tertiary">
             <i class="fa fa-chevron-left"></i> 上一页
            </router-link>
            <span class="pagination__page-number">当前第 {{pageNow}} 页 / 共 {{allPage}} 页</span>
            <router-link :to="{name:'Note',params:{page: Number(this.pageNow)+1}}" v-if="pageNow < allPage" class="older-posts pagination__older btn btn-small btn-tertiary">
              下一页 <i class="fa fa-chevron-right"></i>
            </router-link>
          </nav>
          

        </div>

        <Footer></Footer>
      </div>
    </div>

	</div>

</template>
<script>
  import Footer from '../components/Footer';
  import Header from '../components/Header';

  export default {
    name: 'home',
    components: {
      Footer,
      Header
    },
    watch: {
      '$route' (to, from) {
        this.paging(to.params.page, this.pageNumber);
        this.pageNow = to.params.page
      }
    },
    data(){
      return{
        bingImg:{
        },
        show:false,
        dropdown:false,
        total:0,   // 总数量
        articleData: [ 
        ],
        pageNumber:3,  //每页数量
        pageNow:1, //当前页码
        allPage:0, //总页数
      }
    },
    methods:{
      
      /** 分页 **/
      async paging(page, number){
        const res = await this.$hslApi.post('article/list', {
          'page': page,
          'number': number
        });
        console.log(res.data);
        this.total = res.data.total;
        this.articleData = res.data.items;
        /** 计算总页数 **/
        this.allPage = Math.ceil(this.total/this.pageNumber);
      },

    },
    async created(){
      let res = await this.$hslApi.get('wallpaper', {})
      this.bingImg = res.data;

      
      this.pageNow = this.$route.params.page; //获取路由中的页数

      /** 初始化分页 **/
      this.paging(this.pageNow, this.pageNumber);
      
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
