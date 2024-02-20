import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  trashedProduct: Product[] = [];
  subscription: Subscription = new Subscription();

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.trashedProduct = this.productsService.getTrashedProducts() || [];
  }

  restoreProduct(product: Product) {
    const index = this.trashedProduct.findIndex(
      item => item.productId === product.productId
    );
    this.trashedProduct.splice(index, 1);
    this.updateTrashList();
    this.productsService.restoreProduct(product);
  }

  deleteProduct(id: number) {
    const index = this.trashedProduct.findIndex(item => item.productId === id);
    this.trashedProduct.splice(index, 1);
    this.updateTrashList();
  }

  updateTrashList() {
    this.productsService.addTrashedProducts(this.trashedProduct);
  }
}
