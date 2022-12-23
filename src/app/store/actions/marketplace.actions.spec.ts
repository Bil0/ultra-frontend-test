import { Action } from '@ngrx/store';

import { MarketplaceActions } from './marketplace.actions';

describe('Marketplace Actions', () => {
  let action: Action;

  test('Should create load wallet action', () => {
    action = MarketplaceActions.loadWallet();
    expect(action).toMatchSnapshot();
  });
});
