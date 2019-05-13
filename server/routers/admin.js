const Router = require('koa-router');

let adminRouter = new Router();



adminRouter.get('/admin/index', async ctx => {
  ctx.body = '后台页面'
})
.get('/admin/login', async ctx => {
  ctx.body = '后台页面'
})
.get('/admin/reg', async ctx => {
  ctx.body = '后台页面'
})
.get('/admin/editpwd', async ctx => {
  ctx.body = '后台页面'
})

module.exports = adminRouter;