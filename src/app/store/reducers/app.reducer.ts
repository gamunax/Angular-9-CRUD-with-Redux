import * as fromCustomerActions from '../actions/customer.action';
import { Customer } from 'src/app/models/customer.model';

export interface CustomerState {
    data: Customer[];
    loaded: boolean;
    loading: boolean;
    error: string;
}

export const initialState: CustomerState = {
    data: [],
    loaded: false,
    loading: false,
    error: ''
};

export function reducer(state = initialState, action: fromCustomerActions.CustomerActions) {
    switch (action.type) {
      case fromCustomerActions.LOAD_CUSTOMERS: {
          return {
              ...state,
              loading: true,
          };
      }

      case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS: {
        const data = action.payLoad;
        return {
          ...state,
          loading: false,
          loaded: true,
          data
        };
      }

      case fromCustomerActions.LOAD_CUSTOMERS_FAIL: {
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.payLoad
        };
      }

      case fromCustomerActions.UPDATE_CUSTOMER_SUCCESS: {
        const data = state.data.map( customer => {
          if (customer.id === action.payLoad.id) {
            return action.payLoad;
          } else {
            return customer;
          }
        });

        return {
          ...state,
          data,
          loaded: true,
          loading: false
        };
      }

      case fromCustomerActions.LOAD_CUSTOMERS_FAIL: {
        return {
          ...state,
          error: action.payLoad
        };
      }

      case fromCustomerActions.ADD_CUSTOMER_SUCCESS: {
        return {
          ...state,
          data: [...state.data, action.payLoad]
        };
      }

      case fromCustomerActions.ADD_CUSTOMER_FAIL: {
        return {
          ...state,
          error: action.payLoad
        };
      }

      case fromCustomerActions.DELETE_CUSTOMER_SUCCESS: {
        const userId = action.payLoad;
        return {
          ...state,
          data: [...state.data.filter(user => user.id !== userId)]
        };
      }

      case fromCustomerActions.DELETE_CUSTOMER_FAIL: {
        return {
          ...state,
          error: action.payLoad
        };
      }

      default: {
          return state;
      }
    }
}

export const getCustomers = (state: CustomerState) => state.data;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersError = (state: CustomerState) => state.error;
