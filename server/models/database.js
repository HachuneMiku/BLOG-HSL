const mysql = require('mysql');

//const { dbConfig } = require('../config.js')
var pool  = mysql.createPool({
  connectionLimit : 10,
		host            : '47.52.209.9',
		port            : 3306,
		user            : 'root',
		password        : 'Flash0807',
		database        : 'blog_hsl'
});
 
var database = {};
	
	
database.q = function (sql, params) {
  return new Promise((resolve, reject)=>{
		// 取出链接
		pool.getConnection(function(err, connection) {
		  if (err) {
		    reject(err);
		    return;
		  }
		  connection.query(sql,params, function (error, results, fields) {
					console.log(`${sql}=>${params}`);
					 // 释放连接
					connection.release();
					if(error){
						reject(error);
						return;
					}
					resolve(results);
		  });
		});
	})
}





module.exports = database;
