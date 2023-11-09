import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  GET_COMPATIBILTY_QUESTIONS,
  GET_COMPATIBILTY_QUESTIONS_FAILED,
  GET_COMPATIBILTY_QUESTIONS_SUCCESS,
  START_PROFILE_CREATION,
  START_PROFILE_CREATION_FAILED,
  START_PROFILE_CREATION_SUCCESS,
  SUBMIT_COMPATIBILITY_ANSWER,
  SUBMIT_COMPATIBILITY_ANSWER_FAILED,
  SUBMIT_COMPATIBILITY_ANSWER_SUCCESS,
  SUBMIT_CUSTOMER_DETAILS,
  SUBMIT_CUSTOMER_DETAILS_FAILED,
  SUBMIT_CUSTOMER_DETAILS_SUCCESS,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_SUCCESS,
} from './actionTypes';
import * as RootNavigation from '../../navigations/tempNavigation';
import ProfileCreationConfig from '../../api/services/profileCreationService';
import {GENERIC_ERROR} from '../../utils/commons';

export function* startProfileCreation({payload}) {
  const {loginData} = yield select(state => state.login);
  const {name, gender, birthday, hometown} = payload;

  try {
    const response = yield call(ProfileCreationConfig.createProfile, {
      sub: loginData.sub,
      name,
      gender,
      birthday,
      hometown,
    });

    if (response?.status === 200) {
      yield put({
        type: START_PROFILE_CREATION_SUCCESS,
        payload: response.data,
      });
      RootNavigation.navigate('CompatibilityQuestions');
    }
  } catch (error) {
    const isBelow35 =
      error.response.data.message === 'Customer is below 35'
        ? 'Your age does not meet the age requirement'
        : GENERIC_ERROR;
    yield put({
      type: START_PROFILE_CREATION_FAILED,
      payload: isBelow35,
    });
  }
}

export function* getCompatibilityQuestions({payload}) {
  try {
    const response = yield call(
      ProfileCreationConfig.compatibilityQuestions,
      payload,
    );
    if (response?.status === 200) {
      yield put({
        type: GET_COMPATIBILTY_QUESTIONS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_COMPATIBILTY_QUESTIONS_FAILED,
    });
  }
}

export function* submitCompatibilityAnswer({payload}) {
  const {loginData} = yield select(state => state.login);
  const {questionId, answerId} = payload;

  try {
    const response = yield call(ProfileCreationConfig.compatibilityAnswers, {
      sub: loginData.sub,
      questionId,
      answerId,
    });

    if (response?.status === 200) {
      yield put({
        type: SUBMIT_COMPATIBILITY_ANSWER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: SUBMIT_COMPATIBILITY_ANSWER_FAILED,
      payload: error,
    });
  }
}

export function* submitCustomerDetails({payload}) {
  const {loginData} = yield select(state => state.login);
  const {
    bio,
    work,
    location,
    height,
    starSign,
    education,
    drinking,
    smoking,
    religion,
    pet,
    politics,
    personalityType,
  } = payload;

  try {
    const response = yield call(ProfileCreationConfig.customerDetails, {
      sub: loginData.sub,
      bio,
      work,
      location,
      height,
      starSign,
      education,
      drinking,
      smoking,
      religion,
      pet,
      politics,
      personalityType,
    });

    if (response?.status === 200) {
      yield put({
        type: SUBMIT_CUSTOMER_DETAILS_SUCCESS,
        payload: response.data,
      });
      RootNavigation.navigate('Dashboard');
    }
  } catch (error) {
    yield put({
      type: SUBMIT_CUSTOMER_DETAILS_FAILED,
      payload: error,
    });
  }
}

export function* uploadPhoto({payload}) {
  const {loginData} = yield select(state => state.login);
  const {file} = payload;
  try {
    const response = yield call(ProfileCreationConfig.uploadPhoto, {
      sub: loginData.sub,
      file: file,
    });

    if (response?.status === 200) {
      yield put({
        type: UPLOAD_PHOTO_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPLOAD_PHOTO_FAILED,
      payload: error,
    });
  }
}

function* profileCreationWatcher() {
  yield takeLatest(START_PROFILE_CREATION, startProfileCreation);
  yield takeLatest(GET_COMPATIBILTY_QUESTIONS, getCompatibilityQuestions);
  yield takeLatest(SUBMIT_COMPATIBILITY_ANSWER, submitCompatibilityAnswer);
  yield takeLatest(SUBMIT_CUSTOMER_DETAILS, submitCustomerDetails);
  yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
}

export default profileCreationWatcher;
