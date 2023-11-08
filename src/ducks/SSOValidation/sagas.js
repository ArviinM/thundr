import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  START_SSO_MOBILE_VALIDATION,
  START_SSO_MOBILE_VALIDATION_FAILED,
  START_SSO_MOBILE_VALIDATION_SUCCESS,
  START_SSO_MOBILE_VERIFICATION,
  START_SSO_MOBILE_VERIFICATION_FAILED,
  START_SSO_MOBILE_VERIFICATION_SUCCESS,
  UPDATE_SSO_VALIDATION_STATE,
} from './actionTypes';
import * as RootNavigation from '../../navigations/tempNavigation';
import {UPDATE_LOGIN_STATE} from '../Login/actionTypes';
import SSOValidationConfig from '../../api/services/ssoValidationService';
import axios from 'axios';

export function* startMobileValidation({payload}) {
  const {ssoValidationData} = yield select(state => state.ssoValidation);
  const {mobileNumber} = payload;
  const phoneNumber = `+63${mobileNumber}`;

  try {
    const callApi = async () => {
      return await axios({
        method: 'post',
        url: 'https://dev-api.thundr.ph/auth/sso-sms-otp',
        data: {
          phoneNumber: phoneNumber,
          sub: ssoValidationData?.sub,
        },
        headers: {
          Authorization: `Bearer ${ssoValidationData.accessToken}`,
          Accept: 'application/json',
        },
      });
    };

    const response = yield call(callApi);

    if (response?.status === 200) {
      yield put({
        type: START_SSO_MOBILE_VALIDATION_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: UPDATE_SSO_VALIDATION_STATE,
        newState: {sub: ssoValidationData?.sub},
      });
      RootNavigation.navigate('MobileVerificationScreen');
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message === 'User already exist.'
        ? 'User already exist.'
        : GENERIC_ERROR;
    yield put({
      type: START_SSO_MOBILE_VALIDATION_FAILED,
      payload: errorMessage,
    });
  }
}

export function* startMobileVerification({payload}) {
  const {ssoValidationData, sub} = yield select(state => state.ssoValidation);
  const {otp} = payload;
  try {
    const response = yield call(SSOValidationConfig.ssoMobileVerification, {
      phoneNumber: ssoValidationData.data.username,
      session: ssoValidationData.data.session,
      challengeName: ssoValidationData.data.challengeName,
      challengeAnswer: otp,
      sub: sub,
    });

    const updatedValue = {
      ...ssoValidationData,
      forProfileCreation: true,
    };

    if (response?.status === 200) {
      yield put({
        type: START_SSO_MOBILE_VERIFICATION_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: UPDATE_LOGIN_STATE,
        newState: {loginData: updatedValue, authenticated: true},
      });
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message === 'OTP Sent Mismatch'
        ? ' Invalid OTP. Please try again.'
        : GENERIC_ERROR;
    yield put({
      type: START_SSO_MOBILE_VERIFICATION_FAILED,
      payload: errorMessage,
    });
  }
}

function* ssoValidationWatcher() {
  yield takeLatest(START_SSO_MOBILE_VALIDATION, startMobileValidation);
  yield takeLatest(START_SSO_MOBILE_VERIFICATION, startMobileVerification);
}

export default ssoValidationWatcher;
