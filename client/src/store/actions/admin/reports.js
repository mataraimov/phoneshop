import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'animate.css';
import api from '../../../api';
import constants from '../../constants';
import notifications from '../../../utils/notifications';

export const getReports =
  ({ startDate, endDate }) =>
  async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch({ type: constants.GET_REPORT_LOADING });
    axios
      .get(api.admin.reports.getReportByDates, {
        headers: { Authorization: token },
        params: { startDate, endDate },
      })
      .then(({ data }) => {
        dispatch({ type: constants.GET_REPORT_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({
          type: constants.GET_REPORT_FAILED,
          payload: err.response.data.message,
        });
        Store.addNotification({
          ...notifications.common,
          ...notifications.failed,
          message: err.response.data.message,
        });
      });
  };
