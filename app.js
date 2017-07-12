/*var http = require('http');
function handler(request,response){
	response.end('Welcome First App');
}
http.createServer(handler).listen(8081,function(){
	console.log("server up and runiing");
});*/

var http = require('http');
var app = http.createServer(example);
function example(request,response){
	response.end('jdbfdbjfd');
}
app.listen(8081,function(){
	console.log('server up and running')
})