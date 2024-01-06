import api from '..';
import {SUBSCRIPTION} from '../constants';

const SubscriptionConfig = {
  getSubscriptionDetails: payload =>
    api.get(
      `${SUBSCRIPTION.GET_SUBSCRIPTION_DETAILS}?sub=${payload.currentUserSub}`,
      payload,
    ),
};

export default SubscriptionConfig;
