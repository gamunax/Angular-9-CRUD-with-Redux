import * as fromCustomerReducer from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    customers: fromCustomerReducer.CustomerState;
}

export const reducers = {
    customers: fromCustomerReducer.reducer
};

export const getState = (state) => state;

export const getStateCustomersState = createFeatureSelector<fromCustomerReducer.CustomerState>('customers');
export const getCustomers = createSelector(getStateCustomersState, fromCustomerReducer.getCustomers);

export const getCustomerById = (id) => createSelector(getCustomers, (customers) => {
    if (customers) {
        const customerFound = customers.find(persona => persona.id === id);
        return customerFound || {};
    } else {
        return {};
    }
});
