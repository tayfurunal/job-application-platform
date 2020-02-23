import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import jobReducer from './jobReducer';
import backlogReducer from './backlogReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  errors: errorReducer,
  job: jobReducer,
  backlog: backlogReducer,
  security: securityReducer
});
