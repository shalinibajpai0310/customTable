import {
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_ERROR,
  UPDATE_DATA
} from "../actions/actionTypes";
import {getFilteredData} from '../utils/utils';
const initialState = {
  customers: [],
  origCustomerList: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        origCustomerList: action.payload
      };
    case FETCH_CUSTOMERS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_DATA:
      const { payload } = action;
      const { origCustomerList } = state;
      const filterData = origCustomerList.filter(customer => {
        return (
          payload.get(customer._id) === true ||
          payload.get(customer._id) === undefined
        );
      });
      const val = getFilteredData(origCustomerList,payload)
      console.log("VAL", filterData);

      return {
        ...state,
        customers:filterData
      };
    default:
      return state;
  }
};