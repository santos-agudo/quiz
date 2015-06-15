var pg = require('pg');
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');
var sequelize = null;

// usar BD MySQL o Postgres
if (process.env.DATABASE_URL) { 
	sequelize = new  Sequelize(
		'ddfkia0uhijkja', 'agxxxngbxflopp', 'G3VNwacYDeVnn0LoZERgw43WtI',
		{
			host: 'ec2-54-83-17-8.compute-1.amazonaws.com',
			dialect: 'postgres',
			protocol: 'postgres',
			port: '5432',
			omitNull: true
		}
	);
} else {
	sequelize = new  Sequelize(
		'QuizDB', 'root', 'root',
		{
			host: 'localhost',
			dialect: 'mysql'
		}
	);
}
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
						});
					Quiz.create(
						{
							pregunta: 'Capital de España',
							respuesta:'Madrid'
						});
					Quiz.create(
						{
							pregunta: 'Capital de Portugal',
							respuesta:'Lisboa'
						})					
					.then(
						function() {
							console.log('La BD se inicializó correctamente');
						}
					);
				};
			}
		);
	}
);