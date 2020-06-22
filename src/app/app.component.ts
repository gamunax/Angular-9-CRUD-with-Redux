import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';
import { AppState } from './store';
import { Customer } from './models/customer.model';
import { CustomerService } from './services/customer.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customers: Customer[];
  display = 'none';
  isEditModeEnabled;
  person: Customer = {};

  constructor(
    private store: Store<AppState>
  ) {
    store.select(fromStore.getCustomers).subscribe(res => {
      this.customers = res;
    });

    store.select(fromStore.getCustomerById(2)).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    console.log('init');
    this.store.dispatch(new fromStore.LoadCustomer());
  }

  editClient(customer: Customer) {
    this.isEditModeEnabled = true;
    this.person = {...customer};
    this.display = 'block';
  }

  updateCustomer(myForm: NgForm) {
    console.log(myForm.value);
    this.store.dispatch(new fromStore.UpdateCustomer(myForm.value));
    this.closeModal(myForm);
  }

  addCustomer(myForm: NgForm) {
    const userId = new Date().getTime();
    const newCustomer = myForm.value;
    newCustomer.id = userId;

    if (newCustomer.name !== null && newCustomer !== undefined) {
      this.store.dispatch(new fromStore.AddCustomer(newCustomer));
      this.closeModal(myForm);
    }
  }

  deleteClient(customerId) {
    if (customerId !== undefined) {
      if (confirm('¿Estás seguro de eliminar el cliente?')) {
        this.store.dispatch(new fromStore.DeleteCustomer(customerId));
      }
    }
  }

  openModalDialog() {
    this.isEditModeEnabled = false;
    this.display = 'block';
  }

  closeModal(myForm: NgForm) {
    myForm.reset();
    this.display = 'none';
  }
}
