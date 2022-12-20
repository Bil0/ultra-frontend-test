import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly PRODUCT_URL = '/api/products.json';

  constructor(private readonly httpClient: HttpClient) {}

  loadAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URL);
  }
}
