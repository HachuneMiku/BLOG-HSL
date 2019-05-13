const Router = require('koa-router');

let webRouter = new Router();

const userController = require('../controllers/web.js');



webRouter.get('/web/index', userController.viewIndex)
.get('/web/login', userController.viewLogin)
.get('/web/reg', userController.viewReg)
.get('/web/editpwd', userController.viewEditpwd)

/*** ↑↑↑ 显示页面的路由 ↑↑↑ ***/ 

.post('/web/login', userController.login)
.post('/web/reg', userController.reg)
.put('/web/editpwd', userController.editpwd)





module.exports = webRouter;