'use strict';

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    roles,
    usuarios,
    entidades,
    modulos,
    permisos,
    personas,
    tokens
  } = models;

  // Tipos de relación

  // MANY TO MANY
  // horario.belongsToMany(persona, { foreignKey: { name: 'id_horario' }, through: horario_persona, as: 'personas' });
	// persona.belongsToMany(horario, { foreignKey: { name: 'id_persona' }, through: horario_persona, as: 'horarios' });
	// horario_persona.belongsTo(persona, { foreignKey: { name: 'id_persona' }, as: 'personas' });
	// persona.hasMany(horario_persona, { foreignKey: { name: 'id_persona' } });
	// horario_persona.belongsTo(horario, { foreignKey: { name: 'id_horario' }, as: 'horarios' });
	// horario.hasMany(horario_persona, { foreignKey: { name: 'id_horario' } });
  
  // ONE TO MANY
  // horario.hasMany(horario_persona, { foreignKey: { name: 'id_horario' } });
  
  // MANY TO ONE
  // horario_persona.belongsTo(horario, { foreignKey: { name: 'id_horario' }, as: 'horarios' });
  
  // MODULO USUARIOS
  // Asociaciones tabla usuarios
  usuarios.belongsTo(entidades, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });
  entidades.hasMany(usuarios, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });

  usuarios.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(usuarios, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });

  usuarios.belongsTo(personas, { foreignKey: { name: 'id_persona' }, as: 'persona' });
  personas.hasMany(usuarios, { foreignKey: { name: 'id_persona' }, as: 'persona' });

  // Asociaciones tablas permisos - roles
  permisos.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(permisos, { foreignKey: { name: 'id_rol', allowNull: false } });

  // Asociaciones tablas permisos - modulos
  permisos.belongsTo(modulos, { foreignKey: { name: 'id_modulo', allowNull: false }, as: 'modulo' });
  modulos.hasMany(permisos, { foreignKey: { name: 'id_modulo', allowNull: false } });

  // Asociaciones tablas modulos - sección
  modulos.belongsTo(modulos, { foreignKey: 'id_modulo' });
  modulos.hasMany(modulos, { foreignKey: 'id_modulo' });
  modulos.belongsTo(modulos, { foreignKey: 'id_seccion' });
  modulos.hasMany(modulos, { foreignKey: 'id_seccion' });

  // Asociaciones tabla tokens
  tokens.belongsTo(usuarios, { foreignKey: { name: 'id_usuario' }, as: 'usuario' });
  usuarios.hasMany(tokens, { foreignKey: { name: 'id_usuario' } });

  tokens.belongsTo(entidades, { foreignKey: { name: 'id_entidad' }, as: 'entidad' });
  entidades.hasMany(tokens, { foreignKey: { name: 'id_entidad' } });

  return models;
};
