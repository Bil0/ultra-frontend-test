import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeProduct } from 'app/models/product.model';
import { MarketplaceActions } from 'app/store/actions/marketplace.actions';
import { selectHomeProducts } from 'app/store/selectors/marketplace.selectors';

import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  homeProducts$!: Observable<HomeProduct[] | undefined>;
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.homeProducts$ = this.store.select(selectHomeProducts).pipe(
      tap((p) => {
        console.log('prod', p);
      })
    );
  }

  onAddProductToBasket(productId: number) {
    this.store.dispatch(MarketplaceActions.addToBasket({ productId }));
  }
}
