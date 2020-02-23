import axios from 'axios';
import { GET_ERRORS, GET_JOBS, GET_JOB, DELETE_JOB } from './types';

export const createJob = (job, history) => async dispatch => {
  try {
    await axios.post('/api/job', job);
    history.push('/managerPanel');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.validationErrors || error.response.data
    });
  }
};

export const getJobs = () => async dispatch => {
  const res = await axios.get('/api/job/all');
  dispatch({
    type: GET_JOBS,
    payload: res.data
  });
};

export const getJob = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/job/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (error) {
    history.push('/');
  }
};

export const deleteJob = id => async dispatch => {
  if (
    window.confirm(
      'Are you sure? This will delete the job and the data related to it'
    )
  ) {
    await axios.delete(`/api/job/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: id
    });
  }
};
