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
  /** 文章分类的分页查询 **/
  listCategory: async(page, number) => {
    let pageNow = (page-1)*number;
    let pageSize = Number(number);
    let result = {};
    let total = await db.q('SELECT COUNT(*) FROM hsl_admin_articletype',[]);
    let items = await db.q('select * from hsl_admin_articletype limit ?, ?;', [pageNow,pageSize]);
    total = total[0]['COUNT(*)'];
    result['total'] = total;
    result['items'] = items;
    return result;
  },


  /** 文章的操作 **/
  addArticle: async(...article) => {
    return await db.q('insert into hsl_admin_article (title, contenturl, content, classify, cdate, aid, editor) values (?,?,?,?,?,?,?)', article);
  },
  /** 文章的分页查询 **/
  listArticle: async() => {

  },








}