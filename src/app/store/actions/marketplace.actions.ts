import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HomeProduct } from 'app/models/product.model';
import { Wallet } from 'app/models/wallet.model';
import { Update } from '@ngrx/entity';

export const MarketplaceActions = createActionGroup({
  source: 'Marketplace',
  events: {
    'Load Wallet': emptyProps(),
    'Load Wallet Succeeded': props<{ wallet: Wallet }>(),
    'Load Wallet Error': props<{ error: unknown }>(),
    'Load Products': emptyProps(),
    'Load Products Succeeeded': props<{ products: HomeProduct[] }>(),
    'Load Product Error': props<{ error: unknown }>(),
    'Add To Basket': props<{ productId: number }>(),
    'Remove from Basket': props<{ productId: number }>(),
    'Reset State': emptyProps(),
  },
});
