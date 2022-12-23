import { Store } from '@ngrx/store';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectBasketTotalItems, selectWalletBalance } from 'app/store/selectors/marketplace.selectors';
import createMockInstance from 'jest-create-mock-instance';
import { LayoutPage } from './layout.page';

describe('Layout page', () => {
  let page: LayoutPage;
  let store: Store;

  beforeEach(() => {
    store = createMockInstance(Store) as Store;

    jest.spyOn(store, 'dispatch');
    page = new LayoutPage(store);
  });

  test('Should init class variable from store on init', () => {
    jest.spyOn(store, 'select');

    page.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(MarketplaceActions.loadWallet());
    expect(store.dispatch).toHaveBeenCalledWith(MarketplaceActions.loadProducts());
    expect(store.select).toHaveBeenCalledWith(selectBasketTotalItems);
    expect(store.select).toHaveBeenCalledWith(selectWalletBalance);
  });
});
