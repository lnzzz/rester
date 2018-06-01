const config = require('./config/server.js'),
	  rester = require('./lib/rester.js');
	  

rester.inicializar();
rester.escucha(config.port, config.host);


rester.get('/xxx/asdasdas', function(req, res) {
	console.log("lalala");
	res.statusCode=200;
	res.end("/xxx");
});

rester.get('/xxx/:fafafa', function(req, res) {
	res.statusCode=200;
	res.end("/xxx/:fafafa");
});

rester.put('/asdasdasdasd', function(req, res) {
	res.statusCode=200;
	res.end("/xxx");
});

//rester.printRoutes();
