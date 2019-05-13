module.exports = () => {
	return async (ctx, next)=>{
		try{
			//先放行
			await next();
		}catch(e){
			console.log(e);
			ctx.body = { code:'err',msg:'服务器出错' };
		}
		
	}
}