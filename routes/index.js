var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* Autoload de comandos con :quizId */
router.param('quizId', quizController.load);

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
router.get('/quizes/new', quizController.new);

/* Salvar la pregunta nueva*/
router.post('/quizes/create', quizController.create);

/* Modificar preguntas */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

/* Salvar pregunta modificada */
router.put('/quizes/:quizId(\\d+)', quizController.update);

/* Borrar una pregunta */
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
