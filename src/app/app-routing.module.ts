import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { TrashComponent } from './products/components/trash/trash.component';
import { HomeComponent } from './products/components/home/home.component';

const routes: Routes = [
  {
    path: 'product',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'trash',
    component: TrashComponent,
    title: 'Trash',
  },
  {
    path: 'detail/:id',
    component: ProductDetailsComponent,
    title: 'Product details',
  },
  { path: '**', redirectTo: '/product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
