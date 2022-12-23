import { Store } from '@ngrx/store';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import createMockInstance from 'jest-create-mock-instance';
import { HomePage } from './home.page';

describe('Home page', () => {
  let page: HomePage;
  let store: Store;

  beforeEach(() => {
    store = createMockInstance(Store) as Store;

    page = new HomePage(store);
  });

  test('Should dispatch add to basket action on add product to basket', () => {
    jest.spyOn(store, 'dispatch');

    page.onAddProductToBasket(1);

    expect(store.dispatch).toHaveBeenCalledWith(MarketplaceActions.addToBasket({ productId: 1 }));
  });
});
