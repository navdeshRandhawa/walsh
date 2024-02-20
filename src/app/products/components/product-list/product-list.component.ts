import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/shared/models/products.model';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import {
  FormGroup,
  FormControl,
  UntypedFormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/assets/mockdata/products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Categories } from 'src/assets/mockdata/products';
// import { BsModalService } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('addModal') addModal!: ElementRef | undefined;

  products: Product[] = [];
  displayedProducts: Product[] = [];
  showDetails = false;
  filterFormGroup: FormGroup = new FormGroup({
    inStock: new FormControl<boolean>(false),
    favourites: new FormControl<boolean>(false),
  });
  query!: any;
  subscription: Subscription = new Subscription();
  productFormGroup: UntypedFormGroup = new UntypedFormGroup({});
  categories = Categories;
  searchStr!: string;
  submitted = false;
  modal!: any;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  get controls(): { [key: string]: AbstractControl } {
    console.log(this.productFormGroup.controls);

    return this.productFormGroup.controls;
  }

  ngOnInit() {
    this.getProducts();
    this.subscribeToFilterChanges();
    this.initializeForm();
  }

  getProducts() {
    this.subscription.add(
      this.productsService.getProducts().subscribe({
        next: val => (this.products = val),
      })
    );
  }

  removeProduct(product: Product) {
    const index = this.products.findIndex(
      item => item.productId === product.productId
    );
    this.products.splice(index, 1);
    this.updateProductList();
    this.productsService.moveToTrash(product);
  }

  openDetail(id: number) {
    this.router.navigate(['detail', id]).then();
  }

  likeProduct(product: Product) {
    product.like = !product.like;
    this.updateProductList();
  }

  updateProductList() {
    this.productsService.addProducts(this.products);
  }

  onSubmit(closeReason: string) {
    if (closeReason === 'save') {
      if (this.filterFormGroup && this.filterFormGroup.valid) {
        this.submitted = true;
        const product = this.productFormGroup.value;
        this.productsService.addProducts([...this.products, product]);
        this.getProducts();
        this.modal.close();
      }
    }
  }

  initializeForm() {
    this.productFormGroup = new FormGroup({
      productId: new FormControl(new Date().getTime()),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      like: new FormControl(false),
      likes: new FormControl(0),
      detailedDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      price: new FormControl('', Validators.required),
      isNewProduct: new FormControl(true),
      category: new FormControl('', Validators.required),
      outofStock: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSm(content: TemplateRef<any>) {
    // this.modal = content;
    this.initializeForm();
    this.submitted = false;
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal',
    }).result;
    // this.modalService.open(content).result.then(result => {
    //   if (result === 'save') {
    //     this.onSubmit();
    //   }
    // });
  }

  private subscribeToFilterChanges(): void {
    const query = this.query || {};
    this.subscription.add(
      this.filterFormGroup?.valueChanges.subscribe(value => {
        if (value) {
          for (const property in value) {
            switch (property) {
              case 'inStock': {
                if (value[property]) query['outofStock'] = false;
                else delete query['outofStock'];
                break;
              }
              case 'favourites': {
                if (value[property]) query['like'] = true;
                else delete query['like'];
                break;
              }
            }
          }
          this.query = { ...query };
          this.ref.detectChanges();
        }
      })
    );
  }
}
