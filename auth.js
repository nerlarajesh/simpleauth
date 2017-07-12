function cb(data,option1,option2){
    if(typeof(option2) == "object"){
        return true;
    }else{
        throw error;
    }
};
var Bcrypt = require('bcrypt');
var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');

var server = new Hapi.Server();
server.connection({ port: 3001 ,host:'localhost'});

var users = {
    rajesh: {
        username: 'rajesh',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // password is: 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};
var validate = function (one,username, password, cb) {
    var user = users[username];
    if (!user) {
        return cb(null, false,null);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        cb(err, isValid, { id: user.id, name: user.name });
    });
};
server.register(Basic, function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
              reply('Success!');
        },
        config: { auth: 'simple' } });
});
server.start(function () {
    console.log('Server running at:', server.info.uri);
});