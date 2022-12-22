import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { UserCheckoutFormComponent } from './components/user-checkout-form/user-checkout-form.component';
import { BasketPage } from './pages/basket/basket.page';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { HomePage } from './pages/home/home.page';
import { LayoutPage } from './pages/layout/layout.page';
import { MarketplaceEffects } from './store/effects/marketplace.effects';
import { metaReducers } from './store/reducers';
import { marketplaceReducer } from './store/reducers/marketplace.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPage,
    HomePage,
    ProductComponent,
    BasketPage,
    CheckoutPage,
    UserCheckoutFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    AppMaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { marketplace: marketplaceReducer },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot([MarketplaceEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
