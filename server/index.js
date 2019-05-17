const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koabody = require('koa-body');
const path = require('path');

// 引入router文件
const webRouter = require('./routers/web');
const adminRouter = require('./routers/admin');


// 创建服务器
let app = new koa();


// 开启服务器
app.listen(3000, ()=>{
  console.log('服务器启动在3000端口');
});
// 设置允许跨域
app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "*");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);

  /*
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      Cache-Control、
      Content-Language、
      Content-Type、
      Expires、
      Last-Modified、
      Pragma。
  */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  ctx.set("Access-Control-Expose-Headers", "myData");

  await next();
})
// 设置允许跨域 结束


// 模板渲染
const render = require('koa-art-template');
render(app,{
  // 开发的配置 debug: true 
	debug: process.env.NODE_ENV !== 'production',
	root: path.join(__dirname, './static/resume'),
	extname: '.html'
})



/*** 中间件的使用 ***/
//重写url
let rewriteUrl = require('./middleware/rewriteUrl');
let error = require('./middleware/error');
// 处理异常
app.use(error());
app.use(rewriteUrl());

// 处理静态资源
//app.use(require('koa-static')(path.resolve('../web/dist/')));
app.use(require('koa-static')(path.resolve('./uploadFiles/')));
app.use(require('koa-static')(path.resolve('./static/')));

//app.use(bodyParser());
app.use(koabody({
  multipart: true, // 解析多部分主体
  formidable: {
    maxFileSize: 2*1024*1024,   // 设置上传文件大小最大限制，默认2M
    uploadDir: path.resolve('./uploadFiles/temp'),
    keepExtensions: true, // 写入的文件uploadDir将包含原始文件的扩展名
    hash: 'sha1',
    multiples: false  // 多个文件上传或否
  }

}));


app.use(webRouter.routes());
app.use(adminRouter.routes());
//处理405 方法不匹配 和501 方法未实现
app.use(webRouter.allowedMethods());





