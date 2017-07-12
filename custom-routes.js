var boom = require('boom');
var bcrypt = require('bcrypt')
var Users = require('./user-db')
var routes = [
        {
            method:'GET',
            path:'/',
              config:{
                auth:{
                    mode:'try',
                    strategy:'session'
                },
                plugins:{
                    'hapi-auth-cookie':{
                        redirectTo:false
                    }
                },
                handler:function(request,reply){
                        if(request.auth.isAuthenticated){
                            return reply.view('about')
                        }
                        reply.view('home');
                }
                }
            },
        {
            method:'POST',
            path:'/',
            config:{
                auth:{
                    mode:'try'
                },
                plugins:{
                    'hapi-auth-cookie':{
                        redirectTo:false
                    }
                },
                handler:function(request,reply){
                        if(request.auth.isAuthenticated){
                            return reply.view('about')
                        }
                        var username = request.payload.username
                        var user = Users['username']
                        if(!user){
                            return  reply(boom.notFound('No Users Registed with given credentials'))
                        }
                        var password= request.payload.password
                        return bcrypt.compare(password.err.password,function(error, isValid){
                            if(isValid){
                                request.server.log('info','user authentication success');
                                request.cookieAuth.set(user)
                                return reply.view('about')
                            }
                            return reply.view('home')
                        })

                }
                }
            },
        {
            method:'GET',
            path:'/logout',
            config:{
                auth:'session',
                handler:function(request,reply){
                    request.cookieAuth.clear();
                    reply.view('home');
                }
            }
        }
    ]
module.exports = routes