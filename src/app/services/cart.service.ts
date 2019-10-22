import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];

  constructor() { 
    console.log('Cart Service Constructor');
  }

  addToCart(product, quantity){
    var newitem = product;
    newitem['quantity'] = quantity;
    alert('Added Successfully');

    //search previous added item
    var bFound = false;
    for(var index = 0; index < this.items.length; index++){
      if(this.items[index].id == product.id){
        this.items[index].quantity = parseInt(this.items[index].quantity) + parseInt(quantity);
        bFound = true;
      }
    }

    if(!bFound){
      this.items.push(newitem);
    }
    
  }

  getCartItems(){
    return this.items;
  }

  deleteCart(id){
    for(var index = 0; index < this.items.length; index++){
      if(this.items[index].id == id){
        this.items.splice(index, 1);        
      }
    }
  }
}
