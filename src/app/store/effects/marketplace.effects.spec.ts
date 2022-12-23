import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductService } from 'app/services/product.service';
import { UserService } from 'app/services/user.service';
import { walletMock } from 'app/testing/mocks/entities.mock';
import { addMatchers, cold, hot, initTestScheduler } from 'jasmine-marbles';
import createMockInstance from 'jest-create-mock-instance';
import { Observable, of } from 'rxjs';
import { MarketplaceActions } from '../actions/marketplace.actions';
import { MarketplaceEffects } from './marketplace.effects';

describe('SessionEffects', () => {
  let actions$: Observable<Action>;
  let effects: MarketplaceEffects;
  let productService: ProductService;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        MarketplaceEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [],
        }),
        { provide: UserService, useValue: createMockInstance(UserService) },
        { provide: ProductService, useValue: createMockInstance(ProductService) },
      ],
    });

    effects = TestBed.inject(MarketplaceEffects);
    userService = TestBed.inject(UserService);
    productService = TestBed.inject(ProductService);
    initTestScheduler();
    addMatchers();
  }));

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  test('should dispatch load products succeeded on load products', () => {
    jest.spyOn(productService, 'loadAllProducts').mockReturnValue(of([]));
    actions$ = hot('-a', {
      a: MarketplaceActions.loadProducts(),
    });

    const expected = cold('-b', {
      b: MarketplaceActions.loadProductsSucceeeded({
        products: [],
      }),
    });

    expect(effects.loadAllProducts$).toBeObservable(expected);
  });

  test('should dispatch load wallet succeeded on load wallet', () => {
    jest.spyOn(userService, 'getMyWallet').mockReturnValue(of(walletMock));
    actions$ = hot('-a', {
      a: MarketplaceActions.loadWallet(),
    });

    const expected = cold('-b', {
      b: MarketplaceActions.loadWalletSucceeded({
        wallet: walletMock,
      }),
    });

    expect(effects.getWallet$).toBeObservable(expected);
  });
});
