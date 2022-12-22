import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-checkout-form',
  templateUrl: './user-checkout-form.component.html',
  styleUrls: ['./user-checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCheckoutFormComponent {
  @Input() totalPrice!: number | null;
  @Output() readonly pay = new EventEmitter<User>();

  userForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  onPay() {
    this.pay.emit(this.userForm.getRawValue());
  }
}
