import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products;
  loaded = false;
  search_results = [];

  constructor(private http: HttpClient) { 
  }

  getPageProducts(pagesize, pageindex){
    //pageindex start from 0

    var page_products = [];
    if(pagesize * pageindex < this.products.length){
      for(var index = 0; index < pagesize; index++){

        if((pagesize * pageindex + index) < this.products.length){
          page_products.push(this.products[pagesize * pageindex + index])
        }
      }
    }

    return page_products;
  }

  getProducts(){
    return this.products;
  }

  getProduct(id){
    for(var index = 0; index < this.products.length; index++){
      if(this.products[index].id == id){
        return this.products[index];
      }
    }
    
    return {};
  }

  searchProducts(key){
    this.search_results = [];
    for(var index = 0; index < this.products.length; index++){
      if(this.products[index].title.toLowerCase().search(key.toLowerCase()) != -1){
        this.search_results.push(this.products[index]);
      }
    }

    return this.search_results;
  }

  searchPageProducts(pagesize, pageindex){
    var page_products = [];
    if(pagesize * pageindex < this.search_results.length){
      for(var index = 0; index < pagesize; index++){

        if((pagesize * pageindex + index) < this.search_results.length){
          page_products.push(this.search_results[pagesize * pageindex + index])
        }
      }
    }

    return page_products;
  }

  load(){
    return new Promise((resolve, reject) => {
      this.http.get('/assets/products.json').subscribe(res => {
        this.products = res;
        this.loaded = true;
        resolve(true);
      });
    })
  }
}
