<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
  import LoginForm from '../components/login-form'

  export default {
    components:{
      LoginForm
    },
    method: {
      handleSubmit(){

      }
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

</style>
