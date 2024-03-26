import {
  call,
  put,
  takeLatest,
  select,
  takeLeading,
  takeEvery,
} from 'redux-saga/effects';
import {
  CUSTOMER_MATCH,
  CUSTOMER_MATCH_FAILED,
  CUSTOMER_MATCH_SUCCESS,
  DOWNLOAD_PHOTO_MESSAGE,
  DOWNLOAD_PHOTO_MESSAGE_FAILED,
  DOWNLOAD_PHOTO_MESSAGE_SUCCESS,
  GET_CHAT_CUSTOMER_DETAILS,
  GET_CHAT_CUSTOMER_DETAILS_FAILED,
  GET_CHAT_CUSTOMER_DETAILS_MARE,
  GET_CHAT_CUSTOMER_DETAILS_MARE_FAILED,
  GET_CHAT_CUSTOMER_DETAILS_MARE_SUCCESS,
  GET_CHAT_CUSTOMER_DETAILS_SUCCESS,
  GET_CHAT_MATCH_LIST,
  GET_CHAT_MATCH_LIST_FAILED,
  GET_CHAT_MATCH_LIST_SUCCESS,
  GET_CURRENT_USER_PROFILE,
  GET_CURRENT_USER_PROFILE_FAILED,
  GET_CURRENT_USER_PROFILE_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_JOWA_POSSIBLES_SUCCESS,
  GET_LAST_ACTIVITY,
  GET_LAST_ACTIVITY_FAILED,
  GET_LAST_ACTIVITY_SUCCESS,
  GET_MARE_POSSIBLES_SUCCESS,
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAILED,
  GET_MATCH_LIST_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_SUCCESS,
  GET_POSSIBLES,
  GET_POSSIBLES_FAILED,
  GET_POSSIBLES_SUCCESS,
  GET_UNREAD_MESSAGES,
  GET_UNREAD_MESSAGES_FAILED,
  GET_UNREAD_MESSAGES_SUCCESS,
  READ_CHAT_MESSAGE,
  READ_CHAT_MESSAGE_FAILED,
  READ_CHAT_MESSAGE_SUCCESS,
  REPORT_CATEGORY,
  REPORT_CATEGORY_FAILED,
  REPORT_CATEGORY_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESS,
  UPDATE_CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION_FAILED,
  UPDATE_CURRENT_LOCATION_SUCCESS,
  UPDATE_DASHBOARD_STATE,
  UPDATE_LAST_ACTIVITY,
  UPDATE_LAST_ACTIVITY_FAILED,
  UPDATE_LAST_ACTIVITY_SUCCESS,
  UPLOAD_PHOTO_MESSAGE,
  UPLOAD_PHOTO_MESSAGE_FAILED,
  UPLOAD_PHOTO_MESSAGE_SUCCESS,
} from './actionTypes';
import DashboardConfig from '../../api/services/dashboardService';
import {UPDATE_PERSISTED_STATE} from '../PersistedState/actionTypes';
import * as RootNavigation from '../../navigations/tempNavigation';
import moment from 'moment';
import axios from 'axios';
import {decode} from 'base64-arraybuffer';
import {formatMessages} from '../../screens/private/ChatScreen/utils';

export function* getCustomerDetails({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerDetails, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_DETAILS_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerPhoto({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerPhoto, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_PHOTO_SUCCESS,
        payload: response.data.data[0],
      });
      yield put({
        type: UPDATE_PERSISTED_STATE,
        newState: {customerPhoto: response.data.data[0].photoUrl},
      });
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_PHOTO_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerProfile({payload}) {
  const {fromSwipe} = payload;
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CUSTOMER_PHOTO_SUCCESS,
        payload: response.data.data,
      });
      yield put({
        type: GET_CUSTOMER_PROFILE_SUCCESS,
        payload: response.data.data,
      });
      /* getCustomerProfile is also used in match list.
      We need to add !fromSwipe to prevent overriding
      of data in persisted state which is used
      as users profile upon login */
      if (!fromSwipe) {
        yield put({
          type: UPDATE_PERSISTED_STATE,
          newState: {
            customerName: response.data.data.name,
            customerPhoto: response.data.data.customerPhoto[0].photoUrl,
          },
        });
      }
    }
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_PHOTO_FAILED,
      payload: error,
    });
  }
}

export function* getMatchList({payload}) {
  try {
    const response = yield call(DashboardConfig.getMatchList, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_MATCH_LIST_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MATCH_LIST_FAILED,
      payload: error,
    });
  }
}

export function* customerMatch({payload}) {
  const {target, tag, fromPossibles = false} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  const {customerPhoto} = yield select(state => state.dashboard);
  try {
    const response = yield call(DashboardConfig.customerMatch, {
      sub: loginData?.sub || sub,
      target,
      tag,
    });
    if (response?.status === 200) {
      yield put({
        type: CUSTOMER_MATCH_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: UPDATE_DASHBOARD_STATE,
        newState: {matchPhoto: customerPhoto},
      });

      // TODO: WILL TEST OR INTEGRATE TO NOTIFICATION
      // if (response?.data?.data.match === 'true') {
      //   RootNavigation.navigate('MatchFound', response?.data?.data);
      //   if (fromPossibles) {
      //     yield put({
      //       type: UPDATE_PERSISTED_STATE,
      //       newState: {showPossiblesPrompt: true},
      //     });
      //   }
      // }
    }
  } catch (error) {
    const isNumberOfSwipeReached =
      error?.response?.data?.message === 'Reach number of swipe allowed';
    if (isNumberOfSwipeReached) {
      yield put({
        type: UPDATE_DASHBOARD_STATE,
        newState: {isSwipeReached: true},
      });
    }
    yield put({
      type: CUSTOMER_MATCH_FAILED,
      payload: error,
    });
  }
}

export function* updateCurrentLocation({payload}) {
  const {longitude, latitude} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.updateCurrentLocation, {
      sub: loginData?.sub || sub,
      longitude,
      latitude,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_CURRENT_LOCATION_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_CURRENT_LOCATION_FAILED,
      payload: error,
    });
  }
}

export function* getChatMatchList({payload}) {
  const {tag} = payload;
  try {
    const response = yield call(DashboardConfig.getChatMatchList, payload);
    if (response?.status === 200) {
      if (tag === 'ALL') {
        yield put({
          type: UPDATE_DASHBOARD_STATE,
          newState: {allChatList: response.data.data},
        });
      } else if (tag === 'MARE') {
        yield put({
          type: UPDATE_DASHBOARD_STATE,
          newState: {mareChatList: response.data.data},
        });
        yield put({
          type: GET_CHAT_MATCH_LIST_SUCCESS,
          marePayload: response.data.data,
        });
      } else {
        yield put({
          type: UPDATE_DASHBOARD_STATE,
          newState: {jowaChatList: response.data.data},
        });
        yield put({
          type: GET_CHAT_MATCH_LIST_SUCCESS,
          jowaPayload: response.data.data,
        });
      }
    }
  } catch (error) {
    yield put({
      type: GET_CHAT_MATCH_LIST_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerChatProfile({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CHAT_CUSTOMER_DETAILS_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CHAT_CUSTOMER_DETAILS_FAILED,
      payload: error,
    });
  }
}

export function* getCustomerChatProfileMare({payload}) {
  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CHAT_CUSTOMER_DETAILS_MARE_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CHAT_CUSTOMER_DETAILS_MARE_FAILED,
      payload: error,
    });
  }
}

// Generator function to fetch messages
export function* getMessage({payload}) {
  try {
    const {chatUUID} = payload;
    const {sub} = yield select(state => state.persistedState);
    const {loginData} = yield select(state => state.login);
    const {getMessageResponse} = yield select(state => state.dashboard);

    if (!chatUUID || !sub || !loginData) {
      throw new Error('Missing required data for fetching messages');
    }

    const todayFormattedDate = moment().format('YYYY-MM-DD');
    const twoDaysAgoFormattedDate = moment()
      .subtract(2, 'days')
      .format('YYYY-MM-DD');

    const apiPayload = {
      sub: loginData?.sub || sub,
      chatRoomID: chatUUID,
      sort: 'ASC',
      startDate: twoDaysAgoFormattedDate,
      endDate: todayFormattedDate,
    };

    const response = yield call(DashboardConfig.getMessage, apiPayload);

    if (response?.status === 200) {
      const formattedMessages = formatMessages(response.data.data);

      // Check if chatUUID matches the chatRoomID of the first message in response
      if (
        response.data.data.length > 0 &&
        chatUUID === response.data.data[0].chatRoomID
      ) {
        if (getMessageResponse.length === 0) {
          yield put({
            type: GET_MESSAGE_SUCCESS,
            payload: formattedMessages,
          });
        } else {
          const newMessages = formattedMessages.filter(
            message => !getMessageResponse.some(msg => msg._id === message._id),
          );
          const mergedMessages = [...getMessageResponse, ...newMessages];

          yield put({
            type: GET_MESSAGE_SUCCESS,
            payload: mergedMessages,
          });
        }
      } else {
        // Return formattedMessages if chatUUID does not match chatRoomID in response
        yield put({
          type: GET_MESSAGE_SUCCESS,
          payload: formattedMessages,
        });
      }
    } else {
      throw new Error('Failed to fetch messages');
    }
  } catch (error) {
    yield put({
      type: GET_MESSAGE_FAILED,
      payload: error,
    });
  }
}
export function* sendMessage({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.sendMessage, {
      senderSub: loginData?.sub || sub,
      ...payload,
    });

    if (response?.status === 200) {
      yield put({
        type: SEND_MESSAGE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: SEND_MESSAGE_FAILED,
      payload: error,
    });
  }
}

export function* getLastActivity({payload}) {
  try {
    const response = yield call(DashboardConfig.getLastActivity, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_LAST_ACTIVITY_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_LAST_ACTIVITY_FAILED,
      payload: error,
    });
  }
}

export function* updateLastActivity({}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.updateLastActivity, {
      sub: loginData?.sub || sub,
    });

    if (response?.status === 200) {
      yield put({
        type: UPDATE_LAST_ACTIVITY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_LAST_ACTIVITY_FAILED,
      payload: error,
    });
  }
}

export function* getUnreadMessages({payload}) {
  try {
    const response = yield call(DashboardConfig.getUnreadMessages, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_UNREAD_MESSAGES_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_UNREAD_MESSAGES_FAILED,
      payload: error,
    });
  }
}

export function* readChatMessage({payload}) {
  try {
    const response = yield call(DashboardConfig.readChatMessage, payload);

    if (response?.status === 200) {
      yield put({
        type: READ_CHAT_MESSAGE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: READ_CHAT_MESSAGE_FAILED,
      payload: error,
    });
  }
}

export function* getCurrentUserProfile() {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  const payload = {
    sub: loginData?.sub || sub,
  };

  try {
    const response = yield call(DashboardConfig.getCustomerProfile, payload);
    if (response?.status === 200) {
      yield put({
        type: GET_CURRENT_USER_PROFILE_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CURRENT_USER_PROFILE_FAILED,
      payload: error,
    });
  }
}

export function* getPossibles({payload}) {
  const {tag} = payload;
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);

  try {
    const response = yield call(DashboardConfig.getPossibles, {
      sub: loginData?.sub || sub,
      tag,
    });
    if (response?.status === 200) {
      if (tag === 'JOWA') {
        yield put({
          type: GET_JOWA_POSSIBLES_SUCCESS,
          payload: response.data.data,
        });
      } else {
        yield put({
          type: GET_MARE_POSSIBLES_SUCCESS,
          payload: response.data.data,
        });
      }
    }
  } catch (error) {
    yield put({
      type: GET_POSSIBLES_FAILED,
      payload: error,
    });
  }
}

export function* reportCategory({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {loginData} = yield select(state => state.login);
  try {
    const response = yield call(DashboardConfig.reportCategory, {
      sub: loginData?.sub || sub,
      ...payload,
    });

    if (response?.status === 200) {
      yield put({
        type: REPORT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: REPORT_CATEGORY_FAILED,
      payload: error,
    });
  }
}

export function* uploadPhotoMessage({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {imagesData, targetSub, chatUUID} = payload;

  const imageFileNames = [];

  try {
    for (const imageData of imagesData) {
      const response = yield call(DashboardConfig.uploadPhotoMessage, {
        sub: sub,
        target: targetSub,
        contentType: imageData.mime,
        fileExtension: 'JPG',
      });

      if (response?.status === 200) {
        const arrayBuffer = decode(imageData.data);
        const uploadToS3 = async () => {
          return await axios({
            method: 'put',
            url: response.data.data.url,
            data: arrayBuffer,
            headers: {
              'Content-Type': imageData.mime, // Use the retrieved mime type for accuracy
              'Content-Encoding': 'base64', // Specify base64 encoding
            },
          });
        };

        const uploadResponse = yield call(uploadToS3);
        if (uploadResponse?.status === 200) {
          imageFileNames.push(response.data.data.fileName);
        }
      }
    }
    yield put({
      type: SEND_MESSAGE,
      payload: {
        targetSub: targetSub,
        message: '',
        read: '0',
        attachments: imageFileNames,
      },
    });
    yield put({type: GET_MESSAGE, payload: {chatUUID}});
    yield put({
      type: UPLOAD_PHOTO_MESSAGE_SUCCESS,
      payload: {message: 'photo uploaded successfully.'},
    });
  } catch (error) {
    console.error(error?.message);
    yield put({
      type: UPLOAD_PHOTO_MESSAGE_FAILED,
    });
  }
}

export function* downloadPhotoMessage({payload}) {
  const {sub} = yield select(state => state.persistedState);
  const {targetSub, filenames} = payload;

  let imagesURL = [];
  console.log(targetSub, filenames);

  try {
    for (const filename of filenames) {
      const response = yield call(DashboardConfig.downloadPhotoMessage, {
        sub: sub,
        target: targetSub,
        filename: filename,
      });

      if (response?.status === 200) {
        imagesURL.push(response.data.data);
      }
    }

    yield put({
      type: DOWNLOAD_PHOTO_MESSAGE_SUCCESS,
      payload: imagesURL,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: DOWNLOAD_PHOTO_MESSAGE_FAILED,
    });
  }
}

function* dashboardWatcher() {
  yield takeLatest(GET_CUSTOMER_DETAILS, getCustomerDetails);
  yield takeLatest(GET_CUSTOMER_PHOTO, getCustomerPhoto);
  yield takeLatest(GET_CUSTOMER_PROFILE, getCustomerProfile);
  yield takeLatest(GET_MATCH_LIST, getMatchList);
  yield takeLatest(CUSTOMER_MATCH, customerMatch);
  yield takeLatest(UPDATE_CURRENT_LOCATION, updateCurrentLocation);
  yield takeLatest(GET_CHAT_MATCH_LIST, getChatMatchList);
  yield takeEvery(GET_CHAT_CUSTOMER_DETAILS, getCustomerChatProfile);
  yield takeEvery(GET_CHAT_CUSTOMER_DETAILS_MARE, getCustomerChatProfileMare);
  yield takeLatest(SEND_MESSAGE, sendMessage);
  yield takeLatest(GET_LAST_ACTIVITY, getLastActivity);
  yield takeLatest(UPDATE_LAST_ACTIVITY, updateLastActivity);
  yield takeLatest(GET_MESSAGE, getMessage);
  yield takeEvery(GET_UNREAD_MESSAGES, getUnreadMessages);
  yield takeLatest(READ_CHAT_MESSAGE, readChatMessage);
  yield takeLatest(GET_CURRENT_USER_PROFILE, getCurrentUserProfile);
  yield takeLatest(GET_POSSIBLES, getPossibles);
  yield takeLatest(REPORT_CATEGORY, reportCategory);
  yield takeLatest(UPLOAD_PHOTO_MESSAGE, uploadPhotoMessage);
  yield takeLatest(DOWNLOAD_PHOTO_MESSAGE, downloadPhotoMessage);
}

export default dashboardWatcher;
