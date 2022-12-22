import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Basket } from 'app/models/basket.model';
import { HomeProduct } from 'app/models/product.model';
import { User } from 'app/models/user.model';
import { Wallet } from 'app/models/wallet.model';

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
    'Pay Basket': props<{ user: User }>(),
    'Payment successful': props<{ basket: Basket }>(),
    'Reset State': emptyProps(),
  },
});
