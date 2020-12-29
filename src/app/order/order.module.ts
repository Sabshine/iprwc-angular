import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserGuard } from "../shared/guards/user.guard";
import { OrderService } from "./order.service";
import { OrdersCustomerComponent } from './orders-customer/orders-customer.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductModule } from "../product/product.module";
import { CartModule } from "../cart/cart.module";
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AdminGuard } from "../shared/guards/admin.guard";
import { FormsModule } from "@angular/forms";

const orderRoutes: Routes = [
  {
    path: 'place-order', component: PlaceOrderComponent, canActivate: [UserGuard]
  },
  {
    path: 'all', component: AllOrdersComponent, canActivate: [AdminGuard]
  },
  {
    path: 'detail/:orderId', component: OrderDetailComponent, canActivate: [UserGuard]
  },
  {
    path: 'orders', component: OrdersCustomerComponent, canActivate: [UserGuard]
  }
]

@NgModule({
  declarations: [
    PlaceOrderComponent,
    OrdersCustomerComponent,
    OrderItemComponent,
    OrderDetailComponent,
    AllOrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
    ProductModule,
    CartModule,
    FormsModule
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }