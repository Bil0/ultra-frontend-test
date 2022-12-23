import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeProduct } from 'app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product!: HomeProduct;
  @Output() readonly addProductToBasket = new EventEmitter<number>();

  onAddProductToBasket(id: number) {
    this.addProductToBasket.emit(id);
  }
}
