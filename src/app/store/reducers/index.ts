import { MetaReducer } from '@ngrx/store';
import { environment } from 'environments/environment';

import * as fromSession from './marketplace.reducer';

export interface AppState {
  readonly marketplace: fromSession.MarketplaceState;
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
