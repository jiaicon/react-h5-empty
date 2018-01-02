import fetch from '../../utils/fetch';
import { combineReducers } from 'redux';

// 保险列表接口
export const getInsurance = () => ({
  type: 'INSURANCE_DATA',
  payload: fetch('/insurance', { method: 'GET' }),
});

const getInsuranceReducer = (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  switch (action.type) {
    case 'INSURANCE_DATA_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'INSURANCE_DATA_FULFILLED':
      return {
        ...state,
        fetching: false,
        failed: false,
        data: action.payload.data,
      };
    case 'INSURANCE_DATA_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};
const reducer = combineReducers({
  insurance: getInsuranceReducer,
});
export default reducer;
