
module.exports = () => {
  return async(ctx, next) => {


    
    //处理首页
    if(ctx.url === '/'){
      ctx.url = '/web/index';
    }

    await next();
  }
}