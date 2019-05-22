const Router = require('koa-router');

let adminRouter = new Router();

const adminController = require('../controllers/admin.js');

/********* 显示页面 *********/
adminRouter.get('/admin/index', async (ctx, next) => {
  ctx.render('admin/index');
})
//个人简历
.get('/admin/resume', (ctx, next) => {
  ctx.render('resume/index');
})
/********* ↑↑↑↑↑↑↑ *********/


// 后台登录
.post('/admin/login', adminController.login)
.get('/admin/wallpaper',adminController.wallpaper)


// 后台添加用户
.post('/admin/reg', adminController.reg)
// 修改密码
.put('/admin/editpwd', adminController.editpwd)
// 添加或编辑文章
.post('/admin/article/curd', adminController.editarticle)
// 文章分页
.post('/admin/article/list', adminController.listarticle)
// 上传接口
.post('/admin/article/upload', adminController.uploadarticle)

// 添加或编辑文章分类
.post('/admin/articletype/curd', adminController.editarticletype)
// 文章分类分页
.post('/admin/articletype/list', adminController.listarticletype)
.post('/admin/articletype/allist', adminController.allistarticletype)

module.exports = adminRouter;