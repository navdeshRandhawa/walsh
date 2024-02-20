import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products.model';
import { ProductMockData } from 'src/assets/mockdata/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'walsh';
  products: Product[] = ProductMockData.products;
  ngOnInit(): void {
    if (
      JSON.parse(localStorage.getItem('products') || JSON.stringify([]))
        .length < 1
    ) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    if (
      JSON.parse(localStorage.getItem('trash') || JSON.stringify([])).length < 1
    ) {
      localStorage.setItem('trash', JSON.stringify([]));
    }
  }
}
