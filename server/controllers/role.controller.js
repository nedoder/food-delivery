const {
  createRole, findRole, findRoles, deleteRole,
} = require('../services/role.service');

// Create new role
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'You must enter role name!',
    });
    return;
  }
  try {
    const role = await createRole(req.body.name);
    res.status(200).send(role);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all roles from the database.
exports.findAll = async (req, res) => {
  try {
    const roles = await findRoles();
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete single role
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await findRole(id);
    if (!role) {
      return res.status(400).send({
        message: 'Role not found.',
      });
    }

    await deleteRole(id);
    return res.status(200).send({
      message: 'Role was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting role with id=${id}`,
    });
  }
};
