import { Dictionary } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Product } from 'app/models/product.model';
import { Wallet } from 'app/models/wallet.model';
import { MarketplaceActions } from '../actions/marketplace.actions';

export interface MarketplaceState {
  readonly productIds: number[];
  readonly products: Dictionary<Product>;
  readonly wallet?: Wallet;
  readonly basket: number[];
}

export const initialState: MarketplaceState = {
  productIds: [],
  products: {},
  basket: [],
};

export const marketplaceReducer = createReducer(
  initialState,
  on(
    MarketplaceActions.loadWalletSucceeded,
    (state, { wallet }): MarketplaceState => ({
      ...state,
      wallet,
    })
  ),
  on(
    MarketplaceActions.loadProductsSucceeeded,
    (state, { products, productIds }): MarketplaceState => ({
      ...state,
      productIds,
      products,
    })
  ),
  on(
    MarketplaceActions.addToBasket,
    (state, { productId }): MarketplaceState => ({
      ...state,
      basket: [...state.basket, productId],
    })
  ),
  on(
    MarketplaceActions.removeFromBasket,
    (state, { productId }): MarketplaceState => ({
      ...state,
      basket: [...state.basket.filter((id) => id !== productId)],
    })
  ),
  on(
    MarketplaceActions.resetState,
    (): MarketplaceState => ({
      ...initialState,
    })
  )
);

export function reducer(
  state: MarketplaceState,
  action: Action
): MarketplaceState {
  return marketplaceReducer(state, action);
}
