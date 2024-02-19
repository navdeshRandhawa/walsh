import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/shared/models/products.model';
import { ProductsService } from '../../services/products.service';
import { Subscription, debounceTime } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
// import { BsModalService } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  showDetails = false;
  filterFormGroup: FormGroup = new FormGroup({
    searchParameter: new FormControl<string>(''),
  });
  subscription: Subscription = new Subscription();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('detailModal') detailModal!: ElementRef | undefined;
  searchStr = '';
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subscription.add(
      this.productsService.getProducts().subscribe({
        next: val => (this.products = val),
      })
    );
    this.subscribeToSearchParameterChanges();
  }

  removeProduct(id: number) {
    const index = this.products.findIndex(item => item.productId === id);
    this.products.splice(index, 1);
    this.updateProductList();
    this.productsService.addToTrash(this.products[index]);
  }

  likeProduct(product: Product) {
    product.like = !product.like;
    this.updateProductList();
  }

  updateProductList() {
    this.productsService.addProducts(this.products);
  }

  openModal() {
    this.detailModal?.nativeElement.style.setProperty('display', 'block');
    this.detailModal?.nativeElement;
  }

  closeModal() {
    this.detailModal?.nativeElement.style.setProperty('display', 'none');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToSearchParameterChanges(): void {
    this.subscription.add(
      this.filterFormGroup
        .get('searchParameter')
        ?.valueChanges.pipe(debounceTime(500))
        .subscribe(search => {
          this.searchStr = search;
        })
    );
  }
}
