var err_maker=require('./err_solver').err_maker;
exports.router=function(order,param,callback){
	var ccda='a'.charCodeAt(0),ccdz='z'.charCodeAt(0),ccdA='A'.charCodeAt(0),ccdZ='Z'.charCodeAt(0),ccd0='0'.charCodeAt(0),ccd9='9'.charCodeAt(0);
	var orderstr=order;
	for(var i=0;i<order.length;i++){
		if(!((order.charCodeAt(i)>=ccd0&&order.charCodeAt(i)<=ccd9)||(order.charCodeAt(i)>=ccda&&order.charCodeAt(i)<=ccdz)||(order.charCodeAt(i)>=ccdA&&order.charCodeAt(i)<=ccdZ)||order[i]=='.')){
			callback(err_maker(new Date(),'router.router','Order string is unacceptable','ERROR'));
		}
	}
	var orderarr=order.split('.');
	order='';
	for(var i=0;i<orderarr.length-1;i++){
		order=order+orderarr[i]+'/';
	}
	order='./'+order+orderarr[orderarr.length-1];
	try{
		var reqfun=require(order).main;
		reqfun(param,function(err,result){
			if(err)
				callback(err_maker(new Date(),orderstr,err));
			else
				callback(null,result);
		});
	}catch(e){
		callback();
	}
}

