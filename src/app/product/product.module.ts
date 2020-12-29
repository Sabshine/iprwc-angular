import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from './product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductCustomerComponent } from './product-customer/product-customer.component';
import { ProductComponent } from './product/product.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const productRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product/:productId', component: ProductDetailComponent
      },
      {
        path: "products/add", component: AddProductComponent, canActivate: [AdminGuard]
      },
      {
        path: "products/edit/:productId", component: EditProductComponent, canActivate: [AdminGuard]
      },
      {
        path: "home", component: ProductCustomerComponent
      },
    ]
  }
];

  // {
  //   path: "products/manage", component: ManageProductsComponent, canActivate: [AdminGuard]
  // },

@NgModule({
  declarations: [
    AddProductComponent,
    EditProductComponent,
    ProductCustomerComponent,
    ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
