import { AppState } from 'app/store/reducers';
import { MarketplaceState } from 'app/store/reducers/marketplace.reducer';
import { walletMock } from './mocks/entities.mock';

export const createMarketplaceState = ({ entities = {}, ids = [], basket = [], wallet = walletMock } = {}): MarketplaceState => ({
  entities,
  ids,
  basket,
  wallet,
});

export const createAppState = ({ marketplace = createMarketplaceState() } = {}): AppState =>
  ({
    marketplace,
  } as AppState);
