
import {FETCH_CUSTOMERS_SUCCESS,FETCH_CUSTOMERS_ERROR,UPDATE_DATA} from './actionTypes';


export const  fetchCustomersSuccess = (customers) => {
    return {
        type: FETCH_CUSTOMERS_SUCCESS,
        payload: customers
    }
}

export const updateCustomerList = (data) => {
    return {
        type:UPDATE_DATA,
        payload:data
    }
}
export const fetchCustomersError = (error) => {
    return {
        type: FETCH_CUSTOMERS_ERROR,
        payload: error
    }
}

export const fetchCustomers =() => {
    return dispatch => {
        fetch('./customersList.json')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCustomersSuccess(res.customers));
        })
        .catch(error => {
            dispatch(fetchCustomersError(error));
        })
    }
}