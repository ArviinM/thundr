import api from '..';
import {DASHBOARD} from '../constants';

const DashboardConfig = {
  getCustomerDetails: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_DETAILS}?sub=${payload.sub}`, payload, {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    }),
  getCustomerPhoto: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_PHOTO}?sub=${payload.sub}`, payload, {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    }),
  getCustomerProfile: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_PROFILE}?sub=${payload.sub}`, payload, {
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    }),
};

export default DashboardConfig;
