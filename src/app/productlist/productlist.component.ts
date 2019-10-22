import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {

  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  products;
  products_loaded;
  product_quantities = {};
  focus = {};
  search_key = '';

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.products = this.productService.getPageProducts(this.pageSize, 0);

    console.log('products:', this.products);
    this.products_loaded = this.productService.loaded;

    this.length = this.productService.getProducts().length;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  addToCart(product){
    if(!this.product_quantities.hasOwnProperty(product.id) || this.product_quantities[product.id] == ''){
      alert("Please Input Quantity");
      this.focus[product.id] = true;
      return;
    }
    else{
      this.focus[product.id] = false;
    }
    this.cartService.addToCart(product, this.product_quantities[product.id]);
  }

  searchProduct(){
    console.log('search key:', this.search_key);
    this.products = this.productService.searchProducts(this.search_key);

    this.length = this.productService.searchProducts(this.search_key).length;
    this.products = this.productService.searchPageProducts(this.pageSize, 0);
  }

  changePage(event){
    this.pageEvent = event;
    // this.products = this.productService.getPageProducts(event.pageSize, event.pageIndex);
    this.products = this.productService.searchProducts(this.search_key);

    this.length = this.products.length;
    this.products = this.productService.searchPageProducts(event.pageSize, event.pageIndex);
  }
}
