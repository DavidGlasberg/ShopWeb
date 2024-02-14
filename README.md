# Shop - Backend API doc

* Base API URL: http://localhost:3001
* All responses are JSON encoded
* Requests body should be JSON-encoded

## Retrieve Cart

*GET* /cart?cart_id=<cart_id>

### Query Params
* cart_id (optional)<br>
    will retrieve the specific cart by id, or create a new cart if null, undefined or missing

### Response

Example for empty cart response:
```
 {
    items: {},
    sum: 0,
    _id: 1234567890
  }
```

Example for typical cart response:
```
{
    items: {
      ard:{
        name: "Arduino",
        line_price: 9.99,
        quantity: 2
      }
    },
    sum: 19.98,
    _id: 1234567890
  }
```

## Add / Modify Product

*POST* /cart/product

### Body params
* product_id <br>
    The product id to add / modify in the cart
* quantity (optional)<br>
  Set the product to a specific quantity.
  If quantity is missing, the product's quantity will increment +1
* cart_id (optional)<br>
    id of the cart to update, or create a new cart if null, undefined or missing

### Response
This call response's is similar to "Retrieve cart" 

## Delete Product

*DELETE* /cart/product

### Body params
* product_id <br>
    The product id to delete from the cart
* cart_id<br>
    id of the cart to update

### Response
This call response's is similar to "Retrieve cart" 

