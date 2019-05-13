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





}