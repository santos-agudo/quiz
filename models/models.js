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

// Importar la definición de la tabla Comment en comment.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Definición de relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;
exports.Comment = Comment;

// Crear e inicializar tabla de preguntas en la BD
sequelize.sync().then(
	function() {	// se ejecuta una vez creada la tabla
		Quiz.count().then(
			function (count) {
				if (count === 0) {	// La tabla se inicializa sólo si está vacía
					Quiz.create(
						{
							pregunta: 'Capital de Italia',
							respuesta:'Roma',
							tema: 'Humanidades'
						});
					Quiz.create(
						{
							pregunta: 'Capital de España',
							respuesta:'Madrid',
							tema: 'Humanidades'
						});
					Quiz.create(
						{
							pregunta: 'Capital de Portugal',
							respuesta:'Lisboa',
							tema: 'Ocio'
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