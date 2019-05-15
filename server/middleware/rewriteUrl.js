
module.exports = () => {
  return async(ctx, next) => {

    if(ctx.url.startsWith('/uploadFiles')){
      ctx.url = ctx.url.replace('/uploadFiles', '');
    }
    
    //处理首页
    if(ctx.url === '/'){
      ctx.url = '/web/index';
    }

    await next();
  }
}