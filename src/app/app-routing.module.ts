import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BasketPage } from './pages/basket/basket.page';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { HomePage } from './pages/home/home.page';
import { LayoutPage } from './pages/layout/layout.page';
import { selectCanCheckout } from './store/selectors/marketplace.selectors';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Marketplace',
        component: HomePage,
      },
      {
        path: 'basket',
        title: 'Marketplace - Basket',
        component: BasketPage,
      },
      {
        path: 'checkout',
        title: 'Matketplace - Checkout',
        component: CheckoutPage,
        canActivate: [
          () => {
            const router = inject(Router);

            return inject(Store)
              .select(selectCanCheckout)
              .pipe(map(canCheckout => canCheckout || router.createUrlTree(['/'])));
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
