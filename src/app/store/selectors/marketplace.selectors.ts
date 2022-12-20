import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeProduct, Product } from 'app/models/product.model';

import * as fromMarketplace from '../reducers/marketplace.reducer';

export const selectMarketplaceState =
  createFeatureSelector<fromMarketplace.MarketplaceState>('marketplace');

export const selectWallet = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.wallet
);

export const selectProducts = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.products
);

export const selectProductIds = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.productIds
);

export const selectProductIdsFromBasket = createSelector(
  selectMarketplaceState,
  (state: fromMarketplace.MarketplaceState) => state.basket
);

export const selectHomeProducts = createSelector(
  selectProductIds,
  selectProducts,
  selectProductIdsFromBasket,
  (ids, products, productIdsFromBasket): HomeProduct[] => {
    return ids.map((id) => ({
      ...(products[id] as Product), // we'll just assume that every field you access is valid
      isInBasket: productIdsFromBasket.includes(id),
    }));
  }
);

export const selectBasket = createSelector(
  selectProducts,
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
