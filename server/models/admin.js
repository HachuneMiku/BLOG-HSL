const db = require('./database.js');

module.exports = {
  findUserByUsername: async (username) => {
    return await db.q('select 1 from hsl_admin_user where username = ?', username);
    
  },
  findUserDataByUsername: async (username) => {
    return await db.q('select * from hsl_admin_user where username = ?', username);
  },
  /* 注册用户 */
  regUser: async (...user) => {
    return await db.q('insert into hsl_admin_user (username, password, cdate) values (?,?,?)', user)
  },

  /** 文章分类的操作 **/
  findTypeByTypename: async(category) => {
    return await db.q('select 1 from hsl_admin_articletype where category = ?', category);
  },
  addCategory: async(...category) => {
    return await db.q('insert into hsl_admin_articletype (category, cdate) values (?,?)', category);
  },


  /** 文章的操作 **/
  addArticle: async(...article) => {
    return await db.q('insert into hsl_admin_article (title, contenturl, content, classify, cdate, aid, editor) values (?,?,?,?,?,?,?)', article);
  },




}