const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');  // 密码加密包
const jwt = require('jsonwebtoken');  //生成token
const request = require('request');

const markdowner = require('markdown-it');  //解析markdown
const path = require('path');
const fs = require('fs');
const moment = require('moment');
moment.locale('zh-cn'); 

const token_secret = 'hsl_token_secretkey';  //token秘钥

const md = new markdowner({
  html: true,  // 在源代码中启用HTML标记
  xhtmlOut: true,  //  使用'/'关闭单个标签（<br />）
  linkify: false,  // 自动将URL像文本一样转换为链接
  typographer: false,

})
// 异步读取文章
function readFile(target){
  return new Promise((resolve, reject)=>{
    fs.readFile(target, (err, data)=>{
      if(err){
        reject(err);
      }
      resolve(data);
    })
  });
}

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

module.exports = {
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
    let {type, title, classify, contenturl, id} = ctx.request.body;

    switch (type) {
      case "add":
        // 以后再加token
        let aid = 1, editor = 'HSL';

        let tempUrl = '/uploadFiles/temp/' + path.parse(contenturl).base;
        
        try{
          // markdown转HTML
          let file = await readFile(contenturl);
          let htmlData = md.render(file.toString());

          let cdate = Date.now();
          let result = await adminModel.addArticle(title, tempUrl, htmlData, classify, cdate, aid, editor);
          
          if(result.affectedRows === 1){
            ctx.body = { code: 'yes', msg: '添加文章成功' };

            return;
          }
          //不等于1的情况会发生id冲突，就不插入数据
          ctx.body = { code: 'err', msg:result.message };

        }catch(e){
          ctx.throw('err')
        }
        


        break;
      case "edit":
        
        break;
      case "del":
          try{
            let result = await adminModel.delArticle(id);
            console.log(result);
            if(result.affectedRows === 1){
              ctx.body = { code: 'yes', msg: '删除文章成功' };
              return;
            }
            ctx.body = { code: 'err', msg:result.message };
          }catch(e){
            ctx.throw('err')   
          }
        break;
    }

    
    // 获得前台传递的token
    /*let tokenRaw = String(ctx.header.authorization).split(' ').pop();
    jwt.verify(tokenRaw, token_secret, function(err, decoded){
      if(err || !decoded){
        ctx.body = {
          code:'err', msg:'token出错'
        };
      }
      console.log('1111', decoded);
    });*/

  },

  // 文章上传接口
  uploadarticle: async (ctx, next) => {
    let { content } = ctx.request.files;
    
    ctx.body = {code: 'yes', tempUrl: content.path}
  },

  // 文章分页
  listarticle: async (ctx, next) => {
    let {page, number} = ctx.request.body;
    let res = await adminModel.listArticle(page, number);
    res.items.forEach((e,i)=>{
      if(e.udate){
        e.udate = moment(Number(e.udate)).format('YYYY-MM-DD HH:mm:ss');
      }else{
        e.udate = '无';
      }
      e.cdate = moment(Number(e.cdate)).format('YYYY-MM-DD HH:mm:ss');
    })

    ctx.body = res;
  },

  // 添加或修改文章分类
  editarticletype: async (ctx, next) => {
    let { type, category, id } = ctx.request.body;
    
    switch (type) {
      case "add":
          console.log(type, category, id);

          //判断是否存在该分类
          let types = await adminModel.findTypeByTypename(category);
          //判断是否可以注册
          if(types.length !== 0){
            ctx.body = { code:'err',msg:'该分类已存在' };
            return;
          }
          
          try{
            let cdate = Date.now();
            let result = await adminModel.addCategory(category, cdate);
            //console.log('111', result);
            if(result.affectedRows === 1){
              ctx.body = { code: 'yes', msg: '添加成功' };
              return;
            }
            //不等于1的情况会发生id冲突，就不插入数据
            ctx.body = { code: 'err', msg:result.message };
          }catch(e){
            ctx.throw('err')
          }


        break;
      case "edit":
        console.log(type, category, id);
        try{
          //判断是否存在该分类
          let types = await adminModel.findTypeByTypename(category);
          //判断是否可以注册
          if(types.length !== 0){
            ctx.body = { code:'err',msg:'该分类已存在' };
            return;
          }

          let udate = Date.now();
          let result = await adminModel.editCategory(id, category, udate);
          console.log(result);
          if(result.affectedRows === 1){
            ctx.body = { code: 'yes', msg: '修改成功' };
            return;
          }
          ctx.body = { code: 'err', msg:result.message };
        }catch(e){
          ctx.throw('err');
        }

        
        break;
      case "del":
        
        break;
    }



  },

  // 文章分类分页
  listarticletype: async (ctx, next) => {
    let {page, number} = ctx.request.body;
    let res = await adminModel.listCategory(page, number);

    res.items.forEach((e,i)=>{
      if(e.udate){
        e.udate = moment(Number(e.udate)).format('YYYY-MM-DD HH:mm:ss');
      }else{
        e.udate = '无';
      }
      e.cdate = moment(Number(e.cdate)).format('YYYY-MM-DD HH:mm:ss');
    })

    ctx.body = res;
  },
  // 返回所有文章分类
  allistarticletype: async (ctx,next) => {
    let res = await adminModel.allistCategory();
    ctx.body = res;
  }

}