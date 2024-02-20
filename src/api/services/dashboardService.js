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
  getMessage: payload =>
    api.get(
      `${DASHBOARD.GET_OR_SEND_MESSAGE}?sub=${payload.sub}&chatRoomID=${payload.chatRoomID}&sort=${payload.sort}&startDate=${payload.startDate}&endDate=${payload.endDate}`,
      payload,
    ),
  sendMessage: payload => api.post(DASHBOARD.GET_OR_SEND_MESSAGE, payload),
  getLastActivity: payload =>
    api.get(`${DASHBOARD.LAST_ACTIVITY}?sub=${payload.sub}`, payload),
  updateLastActivity: payload => api.post(DASHBOARD.LAST_ACTIVITY, payload),
  getUnreadMessages: payload =>
    api.get(
      `${DASHBOARD.GET_UNREAD_MESSAGES}?sub=${payload.sub}&chatRoomID=${payload.chatRoomID}`,
      payload,
    ),
  readChatMessage: payload => api.post(DASHBOARD.READ_CHAT_MESSAGE, payload),
  getPossibles: payload =>
    api.get(
      `${DASHBOARD.GET_POSSIBLES}?sub=${payload.sub}&tag=${payload.tag}`,
      payload,
    ),
  reportCategory: payload => api.post(DASHBOARD.REPORT_CATEGORY, payload),
};

export default DashboardConfig;
