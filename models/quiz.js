// Definición del modelo de la entidad Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Quiz',
		{
			pregunta:  DataTypes.STRING(100),
			respuesta: DataTypes.STRING(100)
		}
	);
}