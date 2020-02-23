import { GET_APPLICATION, GET_APPLICATIONS } from '../actions/types';

const initialState = {
  applications: [],
  application: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload
      };

    case GET_APPLICATION:
      return {
        ...state,
        application: action.payload
      };
    default:
      return state;
  }
}
