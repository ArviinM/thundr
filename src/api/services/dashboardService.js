import api from '..';
import {DASHBOARD} from '../constants';

const DashboardConfig = {
  getCustomerDetails: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_DETAILS}?sub=${payload.sub}`, payload),
  getCustomerPhoto: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_PHOTO}?sub=${payload.sub}`, payload),
  getCustomerProfile: payload =>
    api.get(`${DASHBOARD.GET_CUSTOMER_PROFILE}?sub=${payload.sub}`, payload),
  getMatchList: payload =>
    api.get(`${DASHBOARD.GET_MATCH_LIST}?sub=${payload.sub}`, payload),
  customerMatch: payload => api.post(DASHBOARD.CUSTOMER_MATCH, payload),
  updateCurrentLocation: payload =>
    api.post(DASHBOARD.CURRENT_LOCATION, payload),
  getChatMatchList: payload =>
    api.get(
      `${DASHBOARD.CUSTOMER_MATCH}?sub=${payload.sub}&tag=${payload.tag}`,
      payload,
    ),
};

export default DashboardConfig;
