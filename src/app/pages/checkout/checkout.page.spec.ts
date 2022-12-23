import { Store } from '@ngrx/store';
import { User } from 'app/models/user.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import createMockInstance from 'jest-create-mock-instance';
import { CheckoutPage } from './checkout.page';

describe('Checkout page', () => {
  let page: CheckoutPage;
  let store: Store;

  beforeEach(() => {
    store = createMockInstance(Store) as Store;

    page = new CheckoutPage(store);
  });

  test('Should dispatch pay basket action on pay', () => {
    jest.spyOn(store, 'dispatch');

    page.onPay({} as User);

    expect(store.dispatch).toHaveBeenCalledWith(MarketplaceActions.payBasket({ user: {} as User }));
  });
});
