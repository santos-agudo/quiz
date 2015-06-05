var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Quizes.Question. */
router.get('/quizes/question', quizController.question);

/* Quizes.Answer. */
router.get('/quizes/answer', quizController.answer);

/* Author. */
router.get(	'/author', 
			function(req, res, next) {
				res.render('authors');
			}
);

module.exports = router;
