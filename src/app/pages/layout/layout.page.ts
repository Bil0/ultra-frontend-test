import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectBasketTotalItems, selectWalletBalance } from 'app/store/selectors/marketplace.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPage implements OnInit {
  basketTotal$!: Observable<number>;
  walletBalance$!: Observable<number | undefined>;
  constructor(private readonly store: Store) {
    this.store.dispatch(MarketplaceActions.loadWallet());
  }

  ngOnInit(): void {
    this.store.dispatch(MarketplaceActions.loadProducts());

    this.basketTotal$ = this.store.select(selectBasketTotalItems);
    this.walletBalance$ = this.store.select(selectWalletBalance);
  }
}
