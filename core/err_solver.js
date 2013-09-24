var is_debug=require('./defines').is_debug;
function err_maker(when,where,what,importance){
	if(importance==null)importance='WARN';
	if(importance!=='INFO'&&importance!=='WARN'&&importance!=='ERROR'&&importance!=='FATAL'){
		return err_maker(when,where,'Out put error:'+what+' ::WITH FORMAT ERROR','ERROR');
	}
	if(what==null||where==null||when==null)
		console.err('Make Fatal Error');
	var err_obj={
		time:new Date(when),
		message:what,
		place:where,
		'importance':importance
		};
	return err_obj;
}
function checkobj(errobj){
	if(!errobj.time||!errobj.message||!errobj.place||!errobj.importance)return false;
	if(errobj.importance!=='INFO'&&errobj.importance!=='WARN'&&errobj.importance!=='ERROR'&&errobj.importance!=='FATAL')return false;
	return true;
}

function print(errobj,print_func){
	if(!checkobj(errobj)){
		err_solver(err_maker(new Date(),'err_solver.print','Error object input invaild:'+JSON.stringify(errobj),'ERROR'));
		return;
	}
	if(!is_debug){
		print_func('There is an error in the program. Please call webmaster for help.');
		return;
	}
	if(typeof(errobj)!="object")return;
	console.log(errobj.time+': Error at '+errobj.place+' :: '+errobj.message);
	return;
}
function suicide(){
	process.exit(1);
}
function err_solver(errobj){
	if(errobj==null)return;
	if(!checkobj(errobj)){
		err_solver(err_maker(new Date(),'err_solver.err_solver','Error object input invaild:'+JSON.stringify(errobj),'ERROR'));
		return;
	}
	if(errobj.importance==='INFO')
		print(errobj,console.info);
	else if(errobj.importance==='WARN')
		print(errobj,console.warn);
	else if(errobj.importance==='ERROR')
		print(errobj,console.error);
	else if(error.importance==='FATAL'){
		print(errobj,console.error);
		suicide();
	}
}
exports.err_maker=err_maker;
exports.err_solver=err_solver;
