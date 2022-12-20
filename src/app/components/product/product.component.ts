import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HomeProduct } from 'app/models/product.model';

/** PageNotFoundComponent */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnChanges {
  @Input() product!: HomeProduct;
  @Output() readonly addProductToBasket = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  onAddProductToBasket(id: number) {
    this.addProductToBasket.emit(id);
  }
}
