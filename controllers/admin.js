const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  const editing = req.params.edit;
  res.render('admin/edit-product', {
    pageTitle: 'Admin Panel - Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { productName, imageUrl, description, price } = req.body;
  Product.create({ title: productName, imageUrl, description, price })
    .then(() => {
      res.redirect('/');
      console.log('product created');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.edit;
  const { productId } = req.params;

  if (!editing) {
    res.redirect('/');
  }

  Product.findByPk(productId)
    .then((product) => {
      if (!product) res.redirect('/');
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        path: '/admin/edit-product/:productId?edit=true',
        editing,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    price: updatedPrice,
    description: updatedDescription,
  } = req.body;

  console.log(updatedTitle, productId);

  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then((res) => console.log('updated product'))
    .catch((err) => console.log(err));
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        pageTitle: 'Shop Main Page',
        path: '/admin/products',
        products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
