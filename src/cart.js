// const products = require('./products.js')

const get_empty_cart = ()=>{
  return {
    items: {},
    sum: 0
  };
}

const cart_add = (cartObj, product_id, quantity, products) => {
  if (product_id in cartObj.items){
    cartObj.items[product_id].quantity += quantity;
  }else{
    console.log(product_id);
    console.log(products[product_id]);
    console.log(products);


    cartObj.items[product_id] = {
      name: products[product_id].name, 
      quantity: quantity,
      unit_price: products[product_id].price
    };
  }
  return cartObj;
}

const cart_update_quantity = (cartObj, product_id, quantity) => {
  if (product_id in cartObj.items){
    cartObj.items[product_id].quantity = quantity;
  }
  return cartObj;
}


const cart_remove = (cartObj, product_id, quantity) => {
  if (product_id in cartObj.items){
    if (quantity) cartObj.items[product_id].quantity -= quantity;
    if (!quantity || cartObj.items[product_id].quantity <0 ){
      delete cartObj.items[product_id];
    }
  }
  return cartObj;
}

const cart_recalc = (cartObj) => {
  let sum = 0;
  for (key in cartObj.items){
    cartObj.items[key].line_price = cartObj.items[key].quantity * cartObj.items[key].unit_price;
    sum += cartObj.items[key].line_price;
  }
  cartObj.sum = sum.toFixed(2);
  return cartObj;
}

const products_add = (productsObj, product_id, name, img, desc, price) => {
  productsObj.items[product_id] = {
    name:name,
    img: img,
    desc: desc,
    price:price
  }
}



exports.add = cart_add;
exports.recalc = cart_recalc;
exports.remove = cart_remove;
exports.update_quantity = cart_update_quantity;
exports.new = get_empty_cart;
exports.addProduct = products_add;