import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from 'app/models/product.model';
import { Wallet } from 'app/models/wallet.model';
import { ProductService } from 'app/services/product.service';
import { UserService } from 'app/services/user.service';
import { map, switchMap } from 'rxjs';
import { MarketplaceActions } from '../actions/marketplace.actions';

@Injectable()
export class MarketplaceEffects {
  loadAllProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketplaceActions.loadProducts),
      switchMap(() => this.productService.loadAllProducts()),
      map((products: Product[]) =>
        MarketplaceActions.loadProductsSucceeeded({
          products: products.map((product) => ({
            ...product,
            isInBasket: false,
          })),
        })
      )
    );
  });

  getWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketplaceActions.loadWallet),
      switchMap(() => this.userService.getMyWallet()),
      map((wallet: Wallet) =>
        MarketplaceActions.loadWalletSucceeded({ wallet })
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) {}
}
