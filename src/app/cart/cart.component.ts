import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  total_price = 0;
  constructor(private cartService: CartService) { 
    this.items = this.cartService.getCartItems();
  }

  ngOnInit() {
    this.total_price = 0;
    for(var index = 0; index < this.items.length; index++){
      this.total_price = this.total_price + parseInt(this.items[index].quantity) * parseFloat(this.items[index].price);
    }
  }

  updateCart(){
    console.log('update price');
    this.total_price = 0;
    for(var index = 0; index < this.items.length; index++){
      this.total_price = this.total_price + parseInt(this.items[index].quantity) * parseFloat(this.items[index].price);
    }
  }

  deleteProduct(id){
    this.cartService.deleteCart(id);
    this.items = this.cartService.getCartItems();
    this.total_price = 0;
    for(var index = 0; index < this.items.length; index++){
      this.total_price = this.total_price + parseInt(this.items[index].quantity) * parseFloat(this.items[index].price);
    }
  }

}
