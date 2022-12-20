import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectBasketTotalItems,
  selectWallet,
} from 'app/store/selectors/marketplace.selectors';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { Wallet } from 'app/models/wallet.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPage implements OnInit {
  basketTotal$!: Observable<number>;
  wallet$!: Observable<Wallet | undefined>;
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(MarketplaceActions.loadWallet());
    this.store.dispatch(MarketplaceActions.loadProducts());

    this.basketTotal$ = this.store.select(selectBasketTotalItems);
    this.wallet$ = this.store.select(selectWallet);
  }
}
