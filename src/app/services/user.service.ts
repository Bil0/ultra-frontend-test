import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wallet } from 'app/models/wallet.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly WALLET_URL = '/api/wallet.json';

  constructor(private readonly httpClient: HttpClient) {}

  getMyWallet(): Observable<Wallet> {
    return this.httpClient.get<Wallet>(this.WALLET_URL);
  }
}
