<template>

  <div class="about-content">
    <div class="w1000">
      <div class="item info">
        <div class="title">
          <h3>我的介绍</h3>
        </div>
        <div class="cont">
          <img src="../assets/img/xc_img1.jpg">
          <div class="per-info">
            <p>
              <span class="name">小明</span><br />
              <span class="age">24岁</span><br />
              <span class="Career">设计师, 前端工程师</span><br />
              <span class="inteassetst">爱好旅游,打游戏</span>
            </p>
          </div>
        </div>
      </div>
      <div class="item tool">
        <div class="title">
          <h3>我的技能</h3>
        </div>
        <div class="layui-fluid">
          <div class="layui-row">
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../assets/img/gr_img2.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../assets/img/gr_img3.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../assets/img/gr_img4.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../assets/img/gr_img5.jpg">
                <p>80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item contact">
        <div class="title">
          <h3>联系方式</h3>
        </div>
        <div class="cont">
          <img src="../assets/img/erweima.jpg">
          <div class="text">
            <p class="WeChat">微信：<span>1234567890</span></p>
            <p class="qq">qq：<span>123456789</span></p>
            <p class="iphone">电话：<span>123456789</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'whisper',
  components: {
    
  }
}
</script>
<!-- 添加“scoped”属性以仅将CSS限制到此组件 -->
<style>

</style>