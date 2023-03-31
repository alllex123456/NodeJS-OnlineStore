const Product = require('../model/product');
const cart = require('../model/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        pageTitle: 'Shop Main Page',
        path: '/',
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByPk(productId)
    .then((product) => {
      res.render('shop/product-details', {
        pageTitle: product.title,
        path: `products/${product.id}`,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  cart.getCart((cart) => {
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart',
      products: cart.products,
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId, productPrice } = req.body;
  cart.addToCart(productId, productPrice);
  res.redirect('/');
};
