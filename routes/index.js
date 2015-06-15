var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* */
router.get('/quizes', quizController.index);

/* Quizes.Question Id. */
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* Quizes.Answer QuestionId. */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* Author. */
router.get(	'/author', 
			function(req, res, next) {
				res.render('authors');
			}
);

module.exports = router;
