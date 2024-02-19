import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products.model';
import { ProductsService } from '../../services/products.service';
import { ProductMockData } from 'src/assets/mockdata/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'walsh';
  products: Product[] = ProductMockData.products;

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.addProducts(this.products);
  }
}
