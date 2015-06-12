var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// usar BD MySQL
var sequelize = new  Sequelize(
		'QuizDB', 'root', 'root',
		{
			host: 'localhost',
			dialect: 'mysql'
		}
	);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// Crear e inicializar tabla de preguntas en la BD
sequelize.sync().then(
	function() {	// se ejecuta una vez creada la tabla
		Quiz.count().then(
			function (count) {
				if (count === 0) {	// La tabla se inicializa sólo si está vacía
					Quiz.create(
						{
							pregunta: 'Capital de Italia',
							respuesta:'Roma'
						}
					).then(
						function() {
							console.log('La BD se inicializó correctamente');
						}
					);
				};
			}
		);
	}
);