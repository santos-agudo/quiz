// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// Get /login  -->Formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
}

// Post /login  -->Crear la sesión
exports.create = function(req, res) {
	var login 		= req.body.login;
	var password	= req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(
		login, 
		password,
		function(error, user) {
			if (error) { //si hay error devolvemos mensaje de error de sesión.
				req.session.errors=[{"message":'Se ha producido un error: ' + error}];
				res.redirect("/login");
				return;
			}

			//Crear req.session.user y guardar campos id y username
			//La sesión se define por la existencia de: req.session.user
			req.session.user = {id:user.id, username:user.username};
			req.session.activa = true;
			var horaActual = new Date();
			req.session.loginTime = horaActual.getTime();
			res.redirect(req.session.redir.toString()); //redirección a path anterior a login.
		}
	);
};

//DELETE /logout  -->Destruir sesión
exports.destroy = function(req, res) {
	req.session.activa = false;
	delete req.session.user;

	res.redirect(req.session.redir.toString()); //redirección a path anterior a login.
};