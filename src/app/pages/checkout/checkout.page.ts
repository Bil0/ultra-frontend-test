import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/models/user.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectBasketTotalPrice } from 'app/store/selectors/marketplace.selectors';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPage implements OnInit {
  totalPrice$!: Observable<number | null>;
  payed = false;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.totalPrice$ = this.store.select(selectBasketTotalPrice);
  }

  onPay(user: User) {
    this.store.dispatch(MarketplaceActions.payBasket({ user }));
  }
}
