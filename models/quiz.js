// Definición del modelo de la entidad Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Quiz',
		{
			pregunta:  {
				type: DataTypes.STRING(100),
				validate: {notEmpty: {msg: "--> Falta Pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING(100),
				validate: {notEmpty: "--> Falta Respuesta"}
			},
			tema: {
				type: DataTypes.STRING(50),
				validate: {notEmpty: "--> Falta tema"}
			}
		}
	);
}