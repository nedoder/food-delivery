const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {
  createFood, findFood, findFoodItem, deleteFood,
} = require('../services/food.service');

// Create new food item
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'You must enter name!',
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).send({
      message: 'You must enter price!',
    });
    return;
  }
  // resize image
  const formattedFileName = `resized${req.file.filename}`;
  await sharp(req.file.path)
    .toFormat('webp')
    .webp({ quality: 70, force: true })
    .toFile(path.resolve(`./uploads/${formattedFileName}`));
  const food = {
    name: req.body.name,
    price: req.body.price,
    picture: formattedFileName,
  };

  // remove old image
  fs.unlinkSync(req.file.path);

  // Save food item in the database
  try {
    const foodItem = await createFood(food);
    res.status(200).send(foodItem);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all food items from the database.
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) - 1;
  const limit = 20;

  try {
    const food = await findFood(page, limit);
    res.status(200).send(food);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find a single food item
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await findFoodItem(id);
    // eslint-disable-next-line no-unused-expressions
    food ? res.status(200).send(food) : res.status(404).send({
      message: `Cannot find food with id=${id}.`,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving food with id=${id}`,
    });
  }
};

// Delete single food item
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;
  let imagePath = null;

  try {
    const food = await findFoodItem(id);
    if (!food) {
      return res.status(404).send({
        message: 'Food not found.',
      });
    }
    imagePath = `./uploads/${food.picture}`;
    await deleteFood(id);
    fs.unlinkSync(imagePath);
    return res.status(200).send({
      message: 'Food was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting food with id=${id}`,
    });
  }
};
