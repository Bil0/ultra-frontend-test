import { walletMock } from 'app/testing/mocks/entities.mock';
import { MarketplaceActions } from '../actions/marketplace.actions';
import * as fromReducer from './marketplace.reducer';

describe('Marketplace reducer', () => {
  const { initialState } = fromReducer;

  test('Should return default state on unknown action', () => {
    const action = {
      type: 'Unknown',
    };

    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  test('Should update wallet on load wallet succeeded', () => {
    const newState: fromReducer.MarketplaceState = {
      ...initialState,
      wallet: walletMock,
    };

    const state = fromReducer.marketplaceReducer(initialState, MarketplaceActions.loadWalletSucceeded({ wallet: walletMock }));

    expect(state).toEqual(newState);
    // check new ref
    expect(state).not.toBe(newState);
  });
});
