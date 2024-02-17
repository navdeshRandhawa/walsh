import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];

  constructor(private productsService: ProductsService){}

  ngOnInit(){
    this.productsService.getProducts().subscribe({
      next: (val) => this.products = val
    })
  }

}
