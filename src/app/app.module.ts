import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { TrashComponent } from './products/components/trash/trash.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './products/components/home/home.component';
import { IconsModule } from './icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ProductFiltersPipe } from './shared/pipes/product-filters.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    TrashComponent,
    HomeComponent,
    FilterPipe,
    ProductFiltersPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
