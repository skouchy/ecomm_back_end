const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // ? find all categories
  Category.findAll({
    attributes: ['category_name']
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // TODO: be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // ? find one category by its `id` value
  Category.findOne({
    attributes: ['category_name'],
    where: {
      category_name: req.params.id
    }
  })
  .then(dbOneCategory => res.json(dbOneCategory))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })

  // TODO: be sure to include its associated Products
});

router.post('/', (req, res) => {
  // TODO: create a new category
});

router.put('/:id', (req, res) => {
  // TODO: update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // TODO: delete a category by its `id` value
});

module.exports = router;
