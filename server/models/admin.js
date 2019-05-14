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





}