const Router = require('koa-router');

let webRouter = new Router();

const webController = require('../controllers/web.js');



webRouter.get('/web/index', webController.viewIndex)
.get('/web/login', webController.viewLogin)
.get('/web/reg', webController.viewReg)
.get('/web/editpwd', webController.viewEditpwd)

/*** ↑↑↑ 显示页面的路由 ↑↑↑ ***/ 

.post('/web/login', webController.login)
.post('/web/reg', webController.reg)
.put('/web/editpwd', webController.editpwd)





module.exports = webRouter;