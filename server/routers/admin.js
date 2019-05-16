const Router = require('koa-router');

let adminRouter = new Router();

const adminController = require('../controllers/admin.js');

adminRouter.get('/admin/index', adminController.viewIndex)
// 后台登录
.post('/admin/login', adminController.login)
// 后台添加用户
.post('/admin/reg', adminController.reg)
// 修改密码
.put('/admin/editpwd', adminController.editpwd)
// 添加或编辑文章
.post('/admin/article/curd', adminController.editarticle)
// 文章分页
.post('/admin/article/list', adminController.listarticle)

// 添加或编辑文章分类
.post('/admin/articletype/curd', adminController.editarticletype)
// 文章分类分页
.post('/admin/articletype/list', adminController.listarticletype)


module.exports = adminRouter;