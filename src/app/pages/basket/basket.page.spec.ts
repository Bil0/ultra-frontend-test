import { Store } from '@ngrx/store';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import createMockInstance from 'jest-create-mock-instance';
import { BasketPage } from './basket.page';

describe('Basket page', () => {
  let page: BasketPage;
  let store: Store;

  beforeEach(() => {
    store = createMockInstance(Store) as Store;

    page = new BasketPage(store);
  });

  test('Should dispatch remove from basket action on remove product from basket', () => {
    jest.spyOn(store, 'dispatch');

    page.removeProductFromBasket(1);

    expect(store.dispatch).toHaveBeenCalledWith(MarketplaceActions.removeFromBasket({ productId: 1 }));
  });
});
