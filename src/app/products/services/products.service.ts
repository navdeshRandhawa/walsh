import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  addProducts(items: Product[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  getProducts(): Observable<Product[]>{
    const products =  JSON.parse(localStorage.getItem('products') || JSON.stringify([])) as Product[];
    return of(products);
  }

  getTrashedProducts(): Product[]{
    const trashedProducts =  JSON.parse(localStorage.getItem('trash') || JSON.stringify([])) as Product[];
    return trashedProducts;
  }

  clear(){
    localStorage.clear();
  }

}

