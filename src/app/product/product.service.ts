import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscribable} from 'rxjs';
import { ProductModel } from '../shared/models/product.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Subscribable<any>  {
    return this.httpClient.get(
      'products/'
    );
  }

  getProductById(productId: number): Subscribable<any> {
    return this.httpClient.get(
      'products/' + productId
    );
  }

  // Voor de volgende funties moet je admin zijn
  addProduct(product :ProductModel): Observable<any> {
    return this.httpClient.post(
      'products',
      product
    )
  }

  editProduct(existingProduct: ProductModel) {
    return this.httpClient.patch(
      `products/${existingProduct.productId}`,
      existingProduct)
  }

  deleteProduct(productId: number): Observable<any> {
    return this.httpClient.delete(
      'products/' + productId
    );
  }
}
