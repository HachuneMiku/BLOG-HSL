<template>
  <div class="login" v-bind:style="{backgroundImage:'url(' + bingImg.imgUrl + ')'}">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
    <!-- 壁纸来源说明 -->
    <div class="copyright">
      {{bingImg.copyright}}
    </div>  
  </div>
</template>
<script>
  import LoginForm from '../components/login-form'

  export default {
    data(){
      return{
        bingImg:{
        }
      }
    },
    components:{
      LoginForm
    },
    methods: {
      async handleSubmit({ userName, password }){
        let that = this;
        let res = await that.$hslApi.post('/login', {'username':userName, 'password':password});
        console.log(res);
        if(res.data.code == 'yes'){
          //存储到ls
          localStorage.setItem('hslToken', res.data.token);
          that.$Message.success({
            content:res.data.msg,
            onClose(){
              that.$router.push('/home');
            }
          });
        }else{
          this.$Message.error(res.data.msg);
        }
      }
    },
    async created(){
      let res = await this.$hslApi.get('/wallpaper', {})
      console.log(res.data);
      this.bingImg = res.data;
    }
  }
</script>
<style>
  .login {
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translatey(-60%);
    width: 300px;
  }
  .login-con-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }
  .login-con .form-con {
    padding: 10px 0 0;
  }
  .login-con .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
  .copyright{
    background-color: #fff;
    font-size: 13px;
    color: #000;
    font-weight: bolder;
    position: absolute;
    bottom: 0;
  }
</style>
