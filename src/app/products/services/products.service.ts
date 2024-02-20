import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  addProducts(items: Product[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  addTrashedProducts(items: any) {
    localStorage.setItem('trash', JSON.stringify(items));
  }

  getProducts(): Observable<Product[]> {
    const products = JSON.parse(
      localStorage.getItem('products') || JSON.stringify([])
    ) as Product[];
    return of(products);
  }

  getTrashedProducts(): Product[] {
    const trashedProducts = JSON.parse(
      localStorage.getItem('trash') || JSON.stringify([])
    ) as Product[];
    return trashedProducts;
  }

  updateTrash(items: Product[]) {
    localStorage.setItem('trash', JSON.stringify(items));
  }

  moveToTrash(item: Product) {
    const trashedProduts = JSON.parse(
      localStorage.getItem('trash') || JSON.stringify([])
    );
    trashedProduts.push(item);
    localStorage.setItem('trash', JSON.stringify(trashedProduts));
  }

  restoreProduct(item: Product) {
    const products = JSON.parse(
      localStorage.getItem('products') || JSON.stringify([])
    );
    products.push(item);
    this.addProducts(products);
  }
  clear() {
    localStorage.clear();
  }
}
