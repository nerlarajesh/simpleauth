var customView = {
	register:function(server,options,next){
		server.route([
		{
			method:'GET',
			path:'/',
			handler:function(request,reply){
				JSONData = {name:'Rajesh',Desc:'Welcome'}
				reply.view('home',JSONData);
			}
		},
		{
			method:'GET',
			path:'/about',
			handler:function(request,reply){
				JSONData = {Desc:'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s by Aldus Corporation, which employed it in graphics and word-processing templates for its desktop publishing program '}
				reply.view('about',JSONData);
			}
		}
		])
		next()
	}
}
customView.register.attributes = {
	name:'customView',
	version:'1.0.0'
}
module.exports = customView