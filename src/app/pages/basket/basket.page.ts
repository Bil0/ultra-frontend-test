import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Basket } from 'app/models/basket.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectBasket, selectCanCheckout, selectInsufficientBalance } from 'app/store/selectors/marketplace.selectors';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketPage implements OnInit {
  basket$!: Observable<Basket>;
  isInsufficientBalance$!: Observable<boolean>;
  canCheckout$!: Observable<boolean>;
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.basket$ = this.store.select(selectBasket);
    this.isInsufficientBalance$ = this.store.select(selectInsufficientBalance);
    this.canCheckout$ = this.store.select(selectCanCheckout);
  }

  removeProductFromBasket(productId: number) {
    this.store.dispatch(MarketplaceActions.removeFromBasket({ productId }));
  }
}
