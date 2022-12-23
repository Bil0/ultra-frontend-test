import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket } from 'app/models/basket.model';
import { User } from 'app/models/user.model';
import { Wallet } from 'app/models/wallet.model';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly WALLET_URL = '/api/wallet.json';

  constructor(private readonly httpClient: HttpClient) {}

  getMyWallet(): Observable<Wallet> {
    return this.httpClient.get<Wallet>(this.WALLET_URL);
  }

  payBasket(user: User, basket: Basket): Observable<boolean> {
    return of({ user, basket }).pipe(map(() => true));
  }
}
