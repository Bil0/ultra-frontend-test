import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeProduct } from 'app/models/product.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectHomeProducts } from 'app/store/selectors/marketplace.selectors';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  homeProducts$!: Observable<HomeProduct[] | undefined>;
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.homeProducts$ = this.store.select(selectHomeProducts);
  }

  onAddProductToBasket(productId: number) {
    this.store.dispatch(MarketplaceActions.addToBasket({ productId }));
  }
}
