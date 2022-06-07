const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product'); //exported from product.js

mongoose.connect('mongodb://localhost:27017/heshansBasketballStore', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("Oh no.. CONNECTION ERROR!!!!")
    console.log(err)
})

//this is neede for the views folder items / EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware used
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')) //this goes in the forms where we use method overrides (edit form)

/**
* Common pattern to use with async
*/
app.get( '/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products})  //2nd argument in render can pass things through
    
})


/**
* create new products
*/
app.get('/products/new', (req, res) => {
    res.render('products/new');
})

/**
* Accepts the form from /new
* Note: need to add: app.use(express.urlencoded({extended: true}));
*/
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`); //IMPORTANT!!! this prevents resubmits
    
})


/**
* used to show prod details
*/
app.get('/products/:id', async (req, res) => {
    const { id } = req.params; //destructure tp get the id from the user selection
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/showprod', {product}); //pass the product to new EJS file to show user
})

/**
* edit prod details
*/
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params; 
    const product = await Product.findById(id);
    res.render('products/edit', { product });
    //IMPORTANT!!! const methodOverride = require('method-override')
    
})


//PROBLEM!!! --> Need to figure this out, not posting
app.put('/products/:id', (req, res) => {
    console.log(req.body);
    res.send('PUT!!!');
})

app.listen(3000, () =>{
    console.log('App is listening on PORT 3000!');
})