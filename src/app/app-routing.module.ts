import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketPage } from './pages/basket/basket.page';
import { HomePage } from './pages/home/home.page';
import { LayoutPage } from './pages/layout/layout.page';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
