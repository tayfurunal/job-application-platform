import { GET_JOBS, GET_JOB, DELETE_JOB } from '../actions/types';

const initialState = { jobs: [], job: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.projectIdentifier !== action.payload)
      };
    default:
      return state;
  }
}
