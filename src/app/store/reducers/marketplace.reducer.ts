import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { HomeProduct } from 'app/models/product.model';
import { Wallet } from 'app/models/wallet.model';
import { MarketplaceActions } from '../actions/marketplace.actions';

export interface MarketplaceState extends EntityState<HomeProduct> {
  readonly wallet?: Wallet;
  readonly basket: number[];
}

export const adapter: EntityAdapter<HomeProduct> =
  createEntityAdapter<HomeProduct>();

export const initialState: MarketplaceState = adapter.getInitialState({
  basket: [],
});

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
    (state, { products }): MarketplaceState => adapter.setAll(products, state)
  ),
  on(
    MarketplaceActions.addToBasket,
    (state, { productId }): MarketplaceState =>
      adapter.updateOne({ id: productId, changes: { isInBasket: true } }, state)
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
    MarketplaceActions.removeFromBasket,
    (state, { productId }): MarketplaceState =>
      adapter.updateOne(
        { id: productId, changes: { isInBasket: false } },
        state
      )
  ),
  on(
    MarketplaceActions.resetState,
    (): MarketplaceState => ({
      ...initialState,
    })
  ),
  on(
    MarketplaceActions.paymentSuccessful,
    (state, { basket }): MarketplaceState => ({
      ...adapter.removeMany(
        basket.products.map((product) => product.id),
        state
      ),
      basket: [],
      wallet: {
        ...(state.wallet as Wallet),
        balance: (state.wallet as Wallet).balance - basket.total,
      },
    })
  )
);

export function reducer(
  state: MarketplaceState,
  action: Action
): MarketplaceState {
  return marketplaceReducer(state, action);
}
