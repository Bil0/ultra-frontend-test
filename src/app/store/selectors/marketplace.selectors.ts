import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeProduct } from 'app/models/product.model';

import * as fromMarketplace from '../reducers/marketplace.reducer';

const productsAdapter = fromMarketplace.adapter.getSelectors();

export const selectMarketplaceState = createFeatureSelector<fromMarketplace.MarketplaceState>('marketplace');

export const selectWallet = createSelector(selectMarketplaceState, (state: fromMarketplace.MarketplaceState) => state.wallet);
export const selectWalletBalance = createSelector(selectWallet, wallet => wallet?.balance);

export const selectProductIdsFromBasket = createSelector(selectMarketplaceState, (state: fromMarketplace.MarketplaceState) => state.basket);

export const selectHomeProducts = createSelector(selectMarketplaceState, productsAdapter.selectAll);
export const selectEntities = createSelector(selectMarketplaceState, productsAdapter.selectEntities);

export const selectBasket = createSelector(selectEntities, selectProductIdsFromBasket, (products, productIdsFromBasket) => {
  const basketProducts = productIdsFromBasket.map(id => products[id] as HomeProduct);

  return {
    products: basketProducts,
    total: basketProducts.reduce((prev, product) => prev + product.price, 0),
  };
});

export const selectBasketTotalPrice = createSelector(selectBasket, basket => basket.total);
export const selectInsufficientBalance = createSelector(selectBasket, selectWalletBalance, ({ total }, walletBalance = 0) => walletBalance < total);

export const selectBasketTotalItems = createSelector(selectProductIdsFromBasket, (ids: number[]) => ids.length);

export const selectCanCheckout = createSelector(
  selectBasketTotalItems,
  selectInsufficientBalance,
  (totalItems, insufficientBalance) => totalItems > 0 && !insufficientBalance,
);
