const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


// * GET ALL products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// * GET ONE product
router.get('/:id', (req, res) => {
  // * find a single product by its `id`
  Product.findOne({
    attributes: ['product_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(oneProduct => {
      console.log(oneProduct);
      res.json(oneProduct);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    })
});

// * CREATE new product
router.post('/', (req, res) => {
  const tagIds = req.body.tagIds; // map over tagIds array 

  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: tagIds // assign modified tagIds array to tagIds property
  })
  .then(product => {
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(product);
  })
  .then((product) => res.status(200).json(product))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});



// * UPDATE product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // TODO: delete one product by its `id` value
});

module.exports = router;
