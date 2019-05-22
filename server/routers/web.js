const Router = require('koa-router');

let webRouter = new Router();

const webController = require('../controllers/web.js');


/********* 显示页面 *********/
webRouter.get('/web/index', async(ctx, next) => {
  ctx.render('web/index');
})
.get('/web/note', async(ctx, next) => {
  ctx.render('web/index');
})
.get('/web/note/:page', async(ctx, next) => {
  ctx.render('web/index');
})
.get('/web/detail', async(ctx, next) => {
  ctx.render('web/index');
})
.get('/web/detail/:page', async(ctx, next) => {
  ctx.render('web/index');
})
/********* ↑↑↑↑↑↑↑ *********/

.get('/web/login', webController.viewLogin)
.get('/web/reg', webController.viewReg)
.get('/web/editpwd', webController.viewEditpwd)

/*** ↑↑↑ 显示页面的路由 ↑↑↑ ***/ 

.post('/web/login', webController.login)
.post('/web/reg', webController.reg)
.put('/web/editpwd', webController.editpwd)

/*** 文章分页 ***/
.post('/web/article/list', webController.listarticle)
.get('/web/wallpaper',webController.wallpaper)
/*** 文章详情 ***/
.post('/web/detail', webController.artdetail)


module.exports = webRouter;