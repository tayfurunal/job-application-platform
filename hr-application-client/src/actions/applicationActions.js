import axios from 'axios';
import { GET_ERRORS, GET_APPLICATIONS, GET_APPLICATION } from './types';

export const addApplication = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/application/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
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

export const getApplication = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/api/application/${backlog_id}`);
    dispatch({
      type: GET_APPLICATION,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.validationErrors || error.response.data
    });
  }
};

export const getApplications = (
  backlog_id,
  pt_id,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`/api/application/${backlog_id}/${pt_id}`);
    dispatch({
      type: GET_APPLICATIONS,
      payload: res.data
    });
  } catch (error) {
    history.push('/managerPanel');
  }
};
