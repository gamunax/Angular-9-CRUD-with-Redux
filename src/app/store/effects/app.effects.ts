import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as fromCustomersActions from '../actions/customer.action';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

@Injectable()
export class CustomerEffects {

  constructor(
    private action$: Actions,
    private customerService: CustomerService
  ) {

  }

  // load Customer
  @Effect()
  loadCustomers$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.LOAD_CUSTOMERS),
    switchMap(() => this.customerService.getCustomers()
    .pipe(
      map(response => {
        return new fromCustomersActions.LoadCustomerSucess(response);
      },
      catchError(error => of(new fromCustomersActions.LoadCustomerFail(error)))
      )
    ))
  );

  // Update Customer
  @Effect()
  updateCustomer$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.UPDATE_CUSTOMER),
    map((action: fromCustomersActions.UpdateCustomer) => action.payLoad),
    switchMap((payLoad) => this.customerService.updateCustomer(payLoad)
      .pipe(
        map(response => new fromCustomersActions.UpdateCustomerSuccess(response)),
        catchError(error => of(new fromCustomersActions.UpdateCustomerFail(error)))
      )
    )
  );

  // Add Customer
  @Effect()
  addCustomer$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.ADD_CUSTOMER),
    map((action: fromCustomersActions.AddCustomer) => action.payLoad),
    switchMap((payLoad) => this.customerService.addCustomer(payLoad)
      .pipe(
        map(response => new fromCustomersActions.AddCustomerSuccess(response)),
        catchError(error => of(new fromCustomersActions.AddCustomerFail(error)))
      )
    )
  );

  // Delete Customer
  @Effect()
  deleteCustomer$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.DELETE_CUSTOMER),
    map((action: fromCustomersActions.DeleteCustomer) => action.payLoad),
    switchMap((payLoad: number) => this.customerService.deleteCustomer(payLoad)
      .pipe(
        map(() => new fromCustomersActions.DeleteCustomerSuccess(payLoad)),
        catchError(error => of(new fromCustomersActions.DeleteustomerFail(error)))
      )
    )
  );
}
