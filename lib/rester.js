const http = require('http'),
	  url = require('url');
	  
const rester = {
	server: {},
	debug: true,
	_this: this,
	rutas: {
		put: [],
		get: [],
		post: [],
		delete: []
	},
	inicializar: function() {
		if (Object.keys(this.server).length === 0 && this.server.constructor == Object) {
			this.server = http.createServer(this.onRequest);
		}
	},
	
	onRequest: function(req, res) {
		console.log("Request listener");
	},
	
	escucha: function(port, host) {
		this.server.listen(port, host);
		this.log("El servidor esta escuchando en el host "+host+":"+port);
		this.server.on("request", this.requestHandler.bind(this));
	},
	
	requestHandler: function(req, res) {
		let m = req.method.toLowerCase();
		let urlx = url.parse(req.url);
		ruta = this.matchearRuta(m, urlx);
		if (ruta) {
			ruta.callback(req, res);
		} else {
			this.rutaNoDefinida(req, res);
		}
	},
	
	rutaNoDefinida: function(req, res) {
		res.statusCode=404;
		res.end("Ruta no definida");
	},
	
	matchearRuta: function(metodo, ruta) {
		let matches = false;
		for (var i in this.rutas[metodo]) {
			let r = this.rutas[metodo][i];
			let routeParts = this.rutas[metodo][i].path.split("/");
			let givenRouteParts = ruta.pathname.split("/");
			
			if (routeParts.length == givenRouteParts.length) {
				if (r.path === ruta.pathname) {
					return r;
				}
			}
			
			//console.log(ruta.pathname);
		}
		
		return matches;
		
	},
	
	parseUrl: function(url) {
		let tmpUrl = url.split("/");
		let tipo = "estatica";
		tmpUrl.forEach((item) => {
			if (item.startsWith(":", 0)) {
				tipo = "dinamica";
			}
		});
		return tipo;
	},
	
	get: function(path, callback) {
		this.rutas.get.push({ tipo: this.parseUrl(path), path: path, callback: callback });
	},
	post: function(path, callback) {
		this.rutas.get.push({ tipo: this.parseUrl(path), path: path, callback: callback });
	},
	delete: function(path, callback) {
		this.rutas.get.push({ tipo: this.parseUrl(path), path: path, callback: callback });
	},
	put: function(path, callback) {
		this.rutas.get.push({ tipo: this.parseUrl(path), path: path, callback: callback });
	},
	
	printRoutes: function() {
		this.log("PUT");
		this.log(this.rutas.put);
		this.log("GET");
		this.log(this.rutas.get);
		this.log("POST");
		this.log(this.rutas.post);
		this.log("DELETE");
		this.log(this.rutas.delete);
	},
	log: function(mensaje) {
		if (this.debug == true) {
			console.log(mensaje);
		}
	}
}

module.exports = rester;


