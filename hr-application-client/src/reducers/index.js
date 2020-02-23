import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import jobReducer from './jobReducer';
import applicationReducer from './applicationReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  errors: errorReducer,
  job: jobReducer,
  application: applicationReducer,
  security: securityReducer
});
