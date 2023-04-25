// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories(one) have many Products(many)
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products(many) belongsTo Category(one)
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Products(many) belongToMany Tags(many) (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags(many) belongToMany Products(many) (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

// ProductTag(many) has 
ProductTag.belongsTo(Product, {
  foreignKey:'product_id'
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
