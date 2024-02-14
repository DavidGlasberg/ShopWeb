const express = require('express')
const cors = require('cors');
const cart = require('./src/cart.js')
const app = express()
const port = 3001
const mongojs = require('mongojs')
const MONGO_USERNAME = 'Student'
const MONGO_PWD = 'Webdev2023Student'
const MONGO_DB = 'webdev2023'
const MONGO_CONN = "mongodb+srv://"+MONGO_USERNAME +":" +MONGO_PWD + "@cluster0.uqyflra.mongodb.net/"+MONGO_DB;

const id_products_from_mongodb = mongojs.ObjectId('64bc399da3a6151986293b16'); 

const db = mongojs(MONGO_CONN);
const collection = db.carts_david; //UPDATE THIS LINE!!
console.log(MONGO_CONN)


const logRequest = (req,res,next) => {
  console.log(`Received request to ${req.url}`)
  next()
}
app.use(logRequest)
app.use(cors())
app.use(express.json())


app.get('/products', (req, res) => {
  // id = mongojs.ObjectId(id_products_from_mongodb);
  collection.findOne({_id:id_products_from_mongodb},(err,productsObj) => {
    res.json(productsObj);
  })
});

app.get('/cart',(req, res) => {
  let id = null;
  if (req.query['cart_id'] && req.query['cart_id'].length>=12){
    id = mongojs.ObjectId(req.query['cart_id'])
  }
  
  collection.findOne({_id:id},(err,cartObj)=>{
    if (!cartObj){
      console.log('NEW CART')
      cartObj = cart.new();
      collection.save(cartObj, (err,cartObj)=>{
        res.json(cartObj);
      });
    }else {
      res.json(cartObj);
    }
  });
} );

app.post('/cart/product',(req, res) => {
  const cart_id = req.body['cart_id']
  const product_id = req.body['product_id'];
  const quantity = req.body['quantity'] ;
  // console.log(product_id);


  collection.findOne({_id:id_products_from_mongodb},(err,productsObj) => { 
    let id = null;
    if (cart_id != "undefined"){
      id = mongojs.ObjectId(cart_id)
    }
  collection.findOne({_id:id},(err,cartObj)=>{
    if (!cartObj){
      cartObj = cart.new();
    }
    if(quantity)
      cart.update_quantity(cartObj,product_id, quantity )
    else
      cart.add(cartObj,product_id, 1, productsObj.items);

    cart.recalc(cartObj);
    collection.save(cartObj, (err,cartObj)=>{
      res.json(cartObj);
    });
  });
  })
} );

app.post('/products/new', (req,res) => {
  const product_id = req.body['product_id'];
  const name = req.body['name'];
  const img = req.body['img'];
  const desc = req.body['deac'];
  const price = req.body['price'];

  collection.findOne({_id:id_products_from_mongodb},(err,productsObj) => {
    cart.addProduct(productsObj, product_id,name,img, desc, price);
    console.log('product '+ name + ' added!');
    
    collection.save(productsObj, (err,productsObj) => {
      res.json(productsObj);
    })
  })
})

app.delete('/cart/product',(req, res) => {
  const product_id = req.body['product_id'];
  const cart_id = req.body['cart_id']
  const id = mongojs.ObjectId(cart_id);

  console.log('The product to remove is:'+product_id)
  collection.findOne({_id:id},(err,cartObj)=>{
    // console.log('cart before:'+cartObj)
    cart.remove(cartObj,product_id);
    cart.recalc(cartObj);

    collection.save(cartObj, (err,cartObj)=>{
      // console.log('send reponse to client')
      // console.log('cart after:'+cartObj)
      res.json(cartObj);
    });
  });
  
})


app.listen(port, ()=>{
  console.log(`Shop API running on http://localhost:${port}`)
})

