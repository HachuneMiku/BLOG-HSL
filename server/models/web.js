const db = require('./database.js');

module.exports = {
  findUserByUsername: async (username) => {
    return await db.q('select 1 from hsl_web_user where username = ?', username);
    
  },
  findUserDataByUsername: async (username) => {
    return await db.q('select * from hsl_web_user where username = ?', username);
  },
  /* 注册用户 */
  regUser: async (...user) => {
    return await db.q('insert into hsl_web_user (username, password, email, cdate) values (?,?,?,?)', user)
  },

  listArticle: async (page, number) => {
    let pageNow = (page-1)*number;
    let pageSize = Number(number);
    let result = {};
    let total = await db.q('SELECT COUNT(*) FROM hsl_admin_article',[]);
    let items = await db.q('select * from hsl_admin_article limit ?, ?;', [pageNow,pageSize]);
    total = total[0]['COUNT(*)'];
    result['total'] = total;
    result['items'] = items;
    return result;
  },

  artDetail: async(id) => {
    return await db.q('select * from hsl_admin_article where id = ?', id);
  }




}