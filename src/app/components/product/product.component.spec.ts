import { ProductComponent } from './product.component';

describe('Product component', () => {
  let component: ProductComponent;

  beforeEach(() => {
    component = new ProductComponent();
  });

  test('Should emit add product to basket on add product to basket with poroduct id', () => {
    jest.spyOn(component.addProductToBasket, 'emit');

    component.onAddProductToBasket(1);

    expect(component.addProductToBasket.emit).toHaveBeenCalledWith(1);
  });
});
