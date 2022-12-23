import { createMarketplaceState } from 'app/testing/store.mock';
import * as fromMarketplace from './marketplace.selectors';

describe('Marketplace Selectors', () => {
  const testCases = [
    {
      name: 'select MarketplaceState',
      selector: fromMarketplace.selectMarketplaceState,
      state: createMarketplaceState(),
    },
    {
      name: 'select wallet',
      selector: fromMarketplace.selectWallet,
      state: createMarketplaceState(),
    },
    {
      name: 'select WalletBalance',
      selector: fromMarketplace.selectWalletBalance,
      state: createMarketplaceState(),
    },
    {
      name: 'select ProductIdsFromBasket',
      selector: fromMarketplace.selectProductIdsFromBasket,
      state: createMarketplaceState(),
    },
    {
      name: 'select HomeProducts',
      selector: fromMarketplace.selectHomeProducts,
      state: createMarketplaceState(),
    },
    {
      name: 'select Entities',
      selector: fromMarketplace.selectEntities,
      state: createMarketplaceState(),
    },
  ];

  testCases.forEach(({ name, state, selector }) => {
    it(`Should ${name}`, () => {
      expect(selector.projector(state)).toMatchSnapshot();
    });
  });
});
