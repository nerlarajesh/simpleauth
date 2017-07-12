var hapi = require('hapi');
var server = new hapi.Server();
var handlebar = require('handlebars');
var vision = require('vision');
var cookieAuth = require('hapi-auth-basic');
server.connection({
	host:'localhost',
	port:8081
})
server.register([
{register:vision},
{register:require('./customView')},
{register: cookieAuth}
])
server.views({
	engines:{
		html:handlebar
	},
	path:__dirname + "/views"
})
server.start(function(){
	console.log('Serve up and running at the URL: ' + server.info.uri)
})