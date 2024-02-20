import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  products: Product[] = [];
  product!: any;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProducts().subscribe({
      next: val => {
        this.product =
          val.find(item => item.productId === this.productId) || {};
      },
    });
  }
}
