const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // ? find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name']
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['Product_id']
    //   }
    // ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // TODO: be sure to include its associated Product Tag data
});

router.get('/:id', (req, res) => {
  // ? find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbOneTag => res.json(dbOneTag))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
  // TODO: be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // TODO: create a new tag
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

router.put('/:id', (req, res) => {
  // TODO: update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // TODO: delete on tag by its `id` value
});

module.exports = router;
