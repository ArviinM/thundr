import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  START_EMAIL_VALIDATION,
  START_EMAIL_VALIDATION_FAILED,
  START_EMAIL_VALIDATION_SUCCESS,
  START_EMAIL_VERIFICATION,
  START_EMAIL_VERIFICATION_FAILED,
  START_EMAIL_VERIFICATION_SUCCESS,
  START_MOBILE_VALIDATION,
  START_MOBILE_VALIDATION_FAILED,
  START_MOBILE_VALIDATION_SUCCESS,
  START_MOBILE_VERIFICATION,
  START_MOBILE_VERIFICATION_FAILED,
  START_MOBILE_VERIFICATION_SUCCESS,
  START_PASSWORD_VALIDATION,
  UPDATE_MOBILE_EMAIL_STATE,
} from './actionTypes';
import MobileEmailConfig from '../../api/services/mobileEmailService';
import * as RootNavigation from '../../navigations/tempNavigation';
import {UPDATE_LOGIN_STATE} from '../Login/actionTypes';
import {GENERIC_ERROR} from '../../utils/commons';

export function* startMobileValidation({payload}) {
  const {mobileNumber} = payload;
  const phoneNumber = `+63${mobileNumber}`;

  try {
    const response = yield call(MobileEmailConfig.mobileValidation, {
      phoneNumber: phoneNumber,
    });

    if (response?.status === 200) {
      yield put({
        type: START_MOBILE_VALIDATION_SUCCESS,
        payload: response.data,
      });
      RootNavigation.navigate('MobileVerificationScreen');
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message === 'User already exist.'
        ? 'User already exist.'
        : GENERIC_ERROR;
    if (error?.response?.data?.message === 'User already exist.') {
      yield put({
        type: UPDATE_MOBILE_EMAIL_STATE,
        newState: {loading: false, phoneNumber: mobileNumber},
      });
      RootNavigation.navigate('LoginScreen');
    } else {
      yield put({
        type: START_MOBILE_VALIDATION_FAILED,
        payload: errorMessage,
      });
    }
  }
}

export function* startMobileVerification({payload}) {
  const {mobileEmailData} = yield select(state => state.mobileEmail);
  const {otp} = payload;
  try {
    const response = yield call(MobileEmailConfig.mobileVerification, {
      phoneNumber: mobileEmailData.data.username,
      session: mobileEmailData.data.session,
      challengeName: mobileEmailData.data.challengeName,
      challengeAnswer: otp,
    });

    if (response?.status === 200) {
      yield put({
        type: START_MOBILE_VERIFICATION_SUCCESS,
        payload: response.data,
      });
      RootNavigation.navigate('EmailValidationScreen');
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message === 'OTP Sent Mismatch'
        ? ' Invalid OTP. Please try again.'
        : GENERIC_ERROR;
    yield put({
      type: START_MOBILE_VERIFICATION_FAILED,
      payload: errorMessage,
    });
  }
}

export function* startEmailValidation({payload}) {
  const {mobileEmailData} = yield select(state => state.mobileEmail);
  const {email} = payload;

  try {
    const response = yield call(MobileEmailConfig.emailValidation, {
      email,
      session: mobileEmailData.data.session,
      phoneNumber: mobileEmailData.data.username,
    });

    if (response?.status === 200) {
      yield put({
        type: START_EMAIL_VALIDATION_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: UPDATE_MOBILE_EMAIL_STATE,
        newState: {
          email: email,
        },
      });
      RootNavigation.navigate('EmailVerificationScreen');
    }
  } catch (error) {
    yield put({
      type: START_EMAIL_VALIDATION_FAILED,
      payload: error,
    });
  }
}

export function* startEmailVerification({payload}) {
  const {mobileEmailData, phoneNumber, email} = yield select(
    state => state.mobileEmail,
  );
  const {otp, password} = payload;
  try {
    const response = yield call(MobileEmailConfig.emailVerification, {
      email: email,
      session: mobileEmailData.data.session,
      challengeName: mobileEmailData.data.challengeName,
      challengeAnswer: otp,
      phoneNumber,
      password: password,
    });

    if (response?.status === 200) {
      yield put({
        type: START_EMAIL_VERIFICATION_SUCCESS,
        payload: response.data,
      });
      if (mobileEmailData.data.challengeName === 'NEW_PASSWORD_REQUIRED') {
        yield put({
          type: UPDATE_LOGIN_STATE,
          newState: {
            authenticated: true,
            loginData: response.data.data,
            token: response.data.data.accessToken,
          },
        });
        // RootNavigation.navigate('PrivateScreenNavigation');
      } else {
        RootNavigation.navigate('CreatePasswordScreen');
      }
    }
  } catch (error) {
    const isCodeSentMismatch =
      error?.response?.data?.message === 'Code Sent Mismatch';
    const isInvalidPassword =
      error?.response?.data?.message ===
        'Password does not conform to policy: Password must satisfy regular expression pattern: ^\\S.*\\S$' ||
      'Password does not conform to policy: Password not long enough';

    let errorMessage = '';

    if (isCodeSentMismatch) {
      errorMessage = 'Code Sent Mismatch';
    } else if (isInvalidPassword) {
      errorMessage = `Password does not meet criteria.\n\n\nPlease create a new one.`;
    } else {
      errorMessage = GENERIC_ERROR;
    }

    yield put({
      type: START_EMAIL_VERIFICATION_FAILED,
      payload: errorMessage,
    });
  }
}

function* mobileEmailWatcher() {
  yield takeLatest(START_MOBILE_VALIDATION, startMobileValidation);
  yield takeLatest(START_MOBILE_VERIFICATION, startMobileVerification);
  yield takeLatest(START_EMAIL_VALIDATION, startEmailValidation);
  yield takeLatest(START_EMAIL_VERIFICATION, startEmailVerification);
  yield takeLatest(START_PASSWORD_VALIDATION, startEmailVerification);
}

export default mobileEmailWatcher;
