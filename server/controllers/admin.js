const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');  // 密码加密包
const jwt = require('jsonwebtoken');  //生成token

const markdowner = require('markdown-it');  //解析markdown
const path = require('path');
const fs = require('fs');

const token_secret = 'hsl_token_secretkey';  //token秘钥


module.exports = {
  viewIndex: async (ctx, next) => {

  },




  // 登录
  login: async (ctx, next) => {
    let { username, password } = ctx.request.body;
    
    //查询相关用户
    let users = await adminModel.findUserDataByUsername(username);

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

  // 添加新用户
  reg: async (ctx, next) => {
    let { username, password } = ctx.request.body;

    //判断用户名是否存在
    let users = await adminModel.findUserByUsername(username);
    //判断是否可以注册
		if(users.length !== 0){
			ctx.body = { code:'err',msg:'用户名已存在' };
			return;
    }
    
    
    try{
      //开始注册
      let cdate = Date.now();
      password = bcrypt.hashSync(password, 10);
			let result = await adminModel.regUser(username, password, cdate);
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
  // 修改密码
  editpwd: async (ctx, next) => {

  },

  // 添加或修改文章
  editarticle: async (ctx, next) => {

  }



}