import { HttpClient } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';
import createMockInstance from 'jest-create-mock-instance';
import { of } from 'rxjs';

import { ProductService } from './product.service';

describe('Product service', () => {
  let httpClient: HttpClient;
  let service: ProductService;

  beforeEach(() => {
    httpClient = createMockInstance(HttpClient);
    service = new ProductService(httpClient);
  });

  test('Sould load all product', waitForAsync(() => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of([]));

    service.loadAllProducts().subscribe(result => {
      expect(result).toEqual([]);
      expect(httpClient.get).toHaveBeenCalledWith(`/api/products.json`);
    });
  }));
});
