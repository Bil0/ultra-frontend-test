import { HttpClient } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';
import { walletMock } from 'app/testing/mocks/entities.mock';
import createMockInstance from 'jest-create-mock-instance';
import { of } from 'rxjs';

import { UserService } from './user.service';

describe('User service', () => {
  let httpClient: HttpClient;
  let service: UserService;
  const wallet = walletMock;

  beforeEach(() => {
    httpClient = createMockInstance(HttpClient);
    service = new UserService(httpClient);
  });

  test('Sould get my wallet', waitForAsync(() => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(wallet));

    service.getMyWallet().subscribe(result => {
      expect(result).toEqual(wallet);
      expect(httpClient.get).toHaveBeenCalledWith(`/api/wallet.json`);
    });
  }));
});
