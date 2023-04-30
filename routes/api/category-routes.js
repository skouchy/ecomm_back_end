const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// * GET ALL from categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// * GET ONE category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: ['category_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbOneCategory => res.json(dbOneCategory))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});


// * CREATE a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategoryData => {
      console.log(newCategoryData);
      res.json(newCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// * UPDATE a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
  })
  .then((category) => {
    console.log(category);
    res.json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((delCategory) => {
    console.log(delCategory);
    res.json(delCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
