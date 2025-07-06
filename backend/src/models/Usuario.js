const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // <-- Correto conforme seu projeto

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM('admin', 'gerente', 'operador', 'colaborador'),
    allowNull: false,
    defaultValue: 'operador',
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
  underscored: true,
});

module.exports = Usuario;
