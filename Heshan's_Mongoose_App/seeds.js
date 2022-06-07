/**
* Seed is used as a part of development, to set up the DB?
*/
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/heshansBasketballStore', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("Oh no.. CONNECTION ERROR!!!!")
    console.log(err)
})


const seedProds = [
    {
        name: 'Bryant Rookie Jersey',
        price: 550,
        category: 'jersey' 
    },
    {
        name: 'Grizzlies Hat',
        price: 55,
        category: 'hat' 
    },
    {
        name: 'Vince Carter Raptors Jersey',
        price: 350,
        category: 'jersey' 
    },
    {
        name: 'Jordan 1 - Retro',
        price: 3500,
        category: 'sneakers' 
    },
    
]

Product.insertMany(seedProds)
.then( res => {
    console.log(res);
})
.catch (e => {
    console.log(e);
})


/*
const p = new Product ({
    name: 'Lebron Rookie Jersey',
    price: 450,
    category: 'jersey'
})

p.save().then( p => {
    console.log(p);
})
.catch (e => {
    console.log('ERROR!');
    console.log(e);
})
*/