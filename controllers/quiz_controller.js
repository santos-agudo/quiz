var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next (new Error('No existe quizId:' + quizId));
			}
		}
	);
};

// GET /quizes
exports.index = function(req, res) {
	var search = "%" + req.query.search + "%";
	models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
		function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors:[]})
		}
	);
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});	
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {	
									quiz: req.quiz.respuesta,
									respuesta: resultado,
									errors:[]
								}
	);
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz, errors: []});
}

exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(
		function(err) {
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ["pregunta","respuesta"]}).then(
					function() {
						res.redirect('/quizes');
					}
				);				
			}
		}
	);
};