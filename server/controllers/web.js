const webModel = require('../models/web');
const bcrypt = require('bcrypt');  // 密码加密包
const jwt = require('jsonwebtoken');  //生成token
const request = require('request');

const moment = require('moment');
moment.locale('zh-cn'); 

//const markdowner = require('markdown-it');  //解析markdown
const path = require('path');
const fs = require('fs');

const token_secret = 'hsl_token_secretkey';  //token秘钥

function reqWallpaper(){
  return new Promise((resolve, reject)=>{
    request('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', (error, response, body) => {
      if(response.statusCode == 200){
        resolve(body);
      }else{
        reject(err);
      }
    });
  }); 
}

/*let md = new markdowner({
  html: true,  // 在源代码中启用HTML标记
  xhtmlOut: true,  //  使用'/'关闭单个标签（<br />）
  linkify: false,  // 自动将URL像文本一样转换为链接
  typographer: false,
})*/

module.exports = {


  viewLogin: async(ctx, next) => {

  },
  viewReg: async(ctx, next) => {

  },
  viewEditpwd: async(ctx, next) => {

  },

  /*** ↑↑↑ 显示页面的路由 ↑↑↑ ***/ 

  // 登录接口
  login: async(ctx, next) => {
    let { username, password } = ctx.request.body;
    
    //查询相关用户
    let users = await webModel.findUserDataByUsername(username);

    if(users.length === 0){
			ctx.body = {
				code:'err', msg:'用户名或密码不正确'
			};
			return;
		}
    let user = users[0];
    // 使用包同步验证密码是否正确，前面明文，后面密文
    let isPassword = bcrypt.compareSync(password, user.password);
    if(isPassword){
      let token = jwt.sign({
        uid: user.uid
      }, token_secret, { expiresIn: 3600 })

			// 如果密码正确，认证用户，生成token返回
			ctx.body = { code:'yes',msg:'登录成功', token:token };
			
			return;
		}
		// 3.2 响应json结果
		ctx.body = { code:'err',msg:'用户名或密码不正确' };

  },
  // 注册接口
  reg: async(ctx, next) => {
    let { username, password, email, vcode } = ctx.request.body;

    //比较验证码是否正确
    // if(v_code !== ctx.session.v_code){
		// 	ctx.body={code:'002',msg:'验证码不正确'}
		// 	return;
		// }

    //判断用户名是否存在
    let users = await webModel.findUserByUsername(username);
    //判断是否可以注册
		if(users.length !== 0){
			ctx.body = { code:'err',msg:'用户名已存在' };
			return;
    }
    
    
    try{
      //开始注册
      let cdate = Date.now();
      password = bcrypt.hashSync(password, 10);
			let result = await webModel.regUser(username, password, email, cdate);
			console.log('111', result);
			if(result.affectedRows === 1){
				ctx.body = { code: 'yes', msg: '注册成功' };
				return;
			}
			//不等于1的情况会发生id冲突，就不插入数据
			ctx.body = { code: 'err', msg:result.message };
		}catch(e){
			ctx.throw('err')
		}

  },
  // 修改密码接口
  editpwd: async(ctx, next) => {
    
  },

  // 文章分页
  listarticle: async(ctx, next) => {
    let {page, number} = ctx.request.body;
    let res = await webModel.listArticle(page, number);
    res.items.forEach((e,i)=>{
      if(e.udate){
        e.udate = moment(Number(e.udate)).format('YYYY年MM月DD日 HH:mm:ss');
      }else{
        e.udate = '无';
      }
      e.cdate = moment(Number(e.cdate)).format('YYYY年MM月DD日 HH:mm:ss');
    })

    ctx.body = res;
  },
  // 获取bing壁纸
  wallpaper: async(ctx, next) => {
    try{
      let res = await reqWallpaper();
      let copyright = JSON.parse(res).images[0].copyright;
      let imgUrl = 'https://cn.bing.com' + JSON.parse(res).images[0].url;
      ctx.body = {'copyright':copyright,'imgUrl':imgUrl}
    }catch(e){
      ctx.throw('err')
    }
  },
  // 文章详情
  artdetail: async(ctx, next) => {
    let { id } = ctx.request.body;
    let res = await webModel.artDetail(id);
    if(res.length === 0){
			ctx.body = {
				code:'err', msg:'没有该文章'
			};
			return;
    }
    res[0].cdate = moment(Number(res[0].cdate)).format('YYYY年MM月DD日 HH:mm:ss');
    if(res[0].udate){
      res[0].udate = moment(Number(res[0].udate)).format('YYYY年MM月DD日 HH:mm:ss');
    }else{
      res[0].udate = '无';
    }
    ctx.body = {code:'yes', data: res};
  },





}