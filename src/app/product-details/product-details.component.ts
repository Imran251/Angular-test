import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;
  quantity = '';
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = this.productService.getProduct(params.get('productId'));
    })
  }

  addToCart(product){
    if(this.quantity == ''){
      alert('Please Input Quantity');
      return;
    }

    this.cartService.addToCart(product, this.quantity);
  }
}
