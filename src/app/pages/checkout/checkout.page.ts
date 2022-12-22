import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/models/user.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { MarketplaceState } from 'app/store/reducers/marketplace.reducer';
import { selectBasket } from 'app/store/selectors/marketplace.selectors';

import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPage implements OnInit {
  totalPrice$!: Observable<number | null>;
  payed = false;

  constructor(private readonly store: Store<MarketplaceState>) {}

  ngOnInit(): void {
    this.totalPrice$ = this.store
      .select(selectBasket)
      .pipe(map((basket) => basket.total));
  }

  onPay(user: User) {
    this.store.dispatch(MarketplaceActions.payBasket({ user }));
  }
}
