const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// * GET ALL from tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// * GET ONE single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
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
    .then(dbOneTag => res.json(dbOneTag))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});


// * CREATE a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(newTagData => {
      console.log(newTagData);
      res.json(newTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// * UPDATE a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  })
  .then((tag) => {
    console.log(tag);
    res.json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


// * DELETE single tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((delTag) => {
    console.log(delTag);
    res.json(delTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});



module.exports = router;
