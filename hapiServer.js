var hapi = require('hapi');
var Server = new hapi.Server();
Server.connection({
	host:'localhost',
	port:8080
})
Server.route({
	method:'GET',
	path:'/',
	handler:function(request,reply){
		reply('Welcome to Hapi App');
	}
})
Server.start(function(err){
	console.log('Server up and running ' + Server.info.uri)
})