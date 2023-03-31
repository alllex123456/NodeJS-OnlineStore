const path = require('path');
const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findById().then((user) => {
    req.user = user;
    next();
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(errorController.get404);

mongoose
  .connect(
  
  )
  .then(() => {
    if (!user) {
      const user = new User({
        name: 'Alex',
        email: 'alextanase454@gmail.com',
        cart: {
          items: [],
        },
      });
      user.save();
    }
  })
  .catch((err) => console.log(err));
