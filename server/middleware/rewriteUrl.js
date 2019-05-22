
module.exports = () => {
  return async(ctx, next) => {

    if(ctx.url.startsWith('/uploadFiles')){
      ctx.url = ctx.url.replace('/uploadFiles', '');
    }
    if(ctx.url.startsWith('/admin/css/')){
      ctx.type = 'text/css';
    }
    if(ctx.url.startsWith('/web/css/')){
      ctx.type = 'text/css';
    }
    if(ctx.url.startsWith('/admin/resume/index.css')){
      ctx.url = ctx.url.replace('/admin', '');
      ctx.type = 'text/css';
    }
    if(ctx.url.startsWith('/admin/resume/iconfont.css')){
      ctx.url = ctx.url.replace('/admin', '');
      ctx.type = 'text/css';
    }
    if(ctx.url.startsWith('/resume/resume.pdf')){
      ctx.type = 'application/pdf';
    }
    
    //处理首页
    if(ctx.url === '/'){
      ctx.url = '/web/index';
    }

    await next();
  }
}