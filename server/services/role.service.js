const { UserRole } = require('../models');

// create user role
exports.createRole = async (name) => UserRole.create({ name });

// find user roles
exports.findRoles = async () => UserRole.findAll({});

// find single role
exports.findRole = async (id) => UserRole.findByPk(id);

// delete single role
exports.deleteRole = async (id) => UserRole.destroy({ where: { id } });
