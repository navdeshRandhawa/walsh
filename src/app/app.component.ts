import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products/services/products.service';
import productData from '../assets/mockdata/products.json';
import { Product } from './shared/models/products.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'walsh';
  products: Product[]= productData.products;
  constructor(private productsService: ProductsService){}
  ngOnInit(): void {
    this.productsService.addProducts(this.products)
  }
}
