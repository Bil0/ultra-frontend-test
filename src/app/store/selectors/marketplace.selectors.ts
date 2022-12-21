import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeProduct, Product } from 'app/models/product.model';

import * as fromMarketplace from '../reducers/marketplace.reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  fromMarketplace.adapter.getSelectors();

export const selectMarketplaceState =
  createFeatureSelector<fromMarketplace.MarketplaceState>('marketplace');

export const selectWallet = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.wallet
);

export const selectProductIdsFromBasket = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.basket
);

export const selectHomeProducts = createSelector(
  selectMarketplaceState,
  selectAll
);

export const selectBasket = createSelector(
  selectEntities,
  selectProductIdsFromBasket,
  (products, productIdsFromBasket) => {
    const basketProducts = productIdsFromBasket.map(
      (id) => products[id] as Product
    );

    return {
      products: basketProducts,
      total: basketProducts.reduce((prev, product) => prev + product.price, 0),
    };
  }
);

export const selectBasketTotalItems = createSelector(
  selectProductIdsFromBasket,
  (ids: number[]) => ids.length
);
