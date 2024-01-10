import api from '..';
import {SETTINGS} from '../constants';

const SettingsConfig = {
  getCustomerSettings: payload =>
    api.get(
      `${SETTINGS.GET_AND_SAVE_CUSTOMER_SETTINGS}?sub=${payload.sub}`,
      payload,
    ),
  updateCustomerSettings: payload =>
    api.post(SETTINGS.GET_AND_SAVE_CUSTOMER_SETTINGS, payload),
  getCustomerSurvey: payload =>
    api.get(
      `${SETTINGS.GET_AND_SAVE_CUSTOMER_SURVEY}?sub=${payload.sub}`,
      payload,
    ),
  updateCustomerSurvey: payload =>
    api.post(SETTINGS.GET_AND_SAVE_CUSTOMER_SURVEY, payload),
};

export default SettingsConfig;
