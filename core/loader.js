var async=require('async');
var router=require('router').router;
var err_solver=require('err_solver').err_solver;
function loader(){
	async.waterfall([
	function(callback){
		router('data.conf.fetch',null,callback);
	},
	function(conf,callback){
		router('data.db.init',null,function(err,db){
			callback(err,conf,db);
		});
	function(conf,db,callback){
		router('control.webserver.init',conf,function(err,ws){
			callback(err,ws,db);
		});
	},
	function(ws,db,callback){
		ws.start(db);
		callback();
	}],
	function(err){
		err_solver(err);
	});
}
exports.loader=loader;
