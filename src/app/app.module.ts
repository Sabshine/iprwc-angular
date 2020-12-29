import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from "./authentication/authentication.module";
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from './api/http-client.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './shared/toast-service/toast.service';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    HttpClientModule,
    AutosizeModule,
    NgbModule,
    ProductModule,
    CartModule,
    OrderModule
  ],
  providers: [
    HttpClient,
    { provide: 'BASE_API_URL', useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
