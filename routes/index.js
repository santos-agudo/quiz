var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* Autoload de comandos con :quizId */
router.param('quizId', quizController.load);

/* Definición de rutas de sesión */ 
router.get('/login', sessionController.new);		// formulario login.
router.post('/login', sessionController.create);	// crear la sesión.
router.get('/logout', sessionController.destroy);	// destruir la sesión.

/* Lista de preguntas*/
router.get('/quizes', quizController.index);

/* Quizes.Question Id. */
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* Quizes.Answer QuestionId. */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* Author. */
router.get(	'/author', 
			function(req, res, next) {
				res.render('authors', {errors:[]});
			}
);

/* Nuevas preguntas */
router.get('/quizes/new', sessionController.loginRequired, quizController.new);

/* Salvar la pregunta nueva*/
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

/* Modificar preguntas */
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);

/* Salvar pregunta modificada */
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

/* Borrar una pregunta */
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
