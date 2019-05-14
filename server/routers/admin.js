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
// 添加文章
.post('/admin/addarticle', adminController.addarticle)


module.exports = adminRouter;