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
  GET_CUSTOMER_PROFILE_FAILED,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_JOWA_POSSIBLES,
  GET_JOWA_POSSIBLES_SUCCESS,
  GET_LAST_ACTIVITY,
  GET_LAST_ACTIVITY_FAILED,
  GET_LAST_ACTIVITY_SUCCESS,
  GET_MARE_POSSIBLES,
  GET_MARE_POSSIBLES_SUCCESS,
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAILED,
  GET_MATCH_LIST_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_SUCCESS,
  GET_POSSIBLES,
  GET_POSSIBLES_FAILED,
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

export const INITIAL_STATE = {
  customerDetails: [],
  customerPhoto: [],
  customerProfile: [],
  matchList: [],
  matchProfile: [],
  customerMatchData: [],
  matchLocation: [],
  loading: false,
  showModal: false,
  matchListLoading: false,
  modalMessage: '',
  currentLocation: {
    longitude: 0,
    latatitude: 0,
  },
  isSwipeReached: false,
  matchPhoto: '',
  allChatList: [],
  jowaChatList: [],
  mareChatList: [],
  chatCustomerDetails: [],
  sendMessageResponse: [],
  getMessageResponse: [],
  lastActivity: [],
  updatedLastActivity: [],
  mareCustomerDetails: [],
  unreadMessages: [],
  newUnreadMessage: [],
  readChatMessage: [],
  currentUserProfile: [],
  triggerReload: false,
  primaryDetailsState: [],
  personalityDetailsState: [],
  currentPhotoId: null,
  jowaPossibles: [],
  marePossibles: [],
  defaultMareTab: false,
  showReportUserModal: false,
  reportCategoryResponse: [],
  showReportButton: true,
  uploadPhotoResponse: [],
  downloadPhotoResponse: [],
};

const dashboard = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DASHBOARD_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // GET CUSTOMER DETAILS
    case GET_CUSTOMER_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customerDetails: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CUSTOMER DETAILS FOR MARE
    case GET_CHAT_CUSTOMER_DETAILS_MARE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CHAT_CUSTOMER_DETAILS_MARE_SUCCESS:
      return {
        ...state,
        mareCustomerDetails: [...state.mareCustomerDetails, action.payload],
        loading: false,
      };
    case GET_CHAT_CUSTOMER_DETAILS_MARE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CUSTOMER PHOTO
    case GET_CUSTOMER_PHOTO:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_PHOTO_SUCCESS:
      return {
        ...state,
        customerPhoto: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_PHOTO_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CUSTOMER PROFILE
    case GET_CUSTOMER_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_PROFILE_SUCCESS:
      return {
        ...state,
        customerProfile: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CURRENT USER PROFILE
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CURRENT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        currentUserProfile: action.payload,
        loading: false,
      };
    case GET_CURRENT_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET MATCH LIST
    case GET_MATCH_LIST:
      return {
        ...state,
        ...action.payload,
        matchListLoading: true,
      };
    case GET_MATCH_LIST_SUCCESS:
      return {
        ...state,
        matchList: action.payload,
        matchListLoading: false,
      };
    case GET_MATCH_LIST_FAILED:
      return {
        ...state,
        matchListLoading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // CUSTOMER MATCH
    case CUSTOMER_MATCH:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case CUSTOMER_MATCH_SUCCESS:
      return {
        ...state,
        customerMatchData: action.payload,
        loading: false,
      };
    case CUSTOMER_MATCH_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // UPDATE USER CURRENT LOCATION
    case UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        matchLocation: action.payload,
      };
    case UPDATE_CURRENT_LOCATION_FAILED:
      return {
        ...state,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CHAT MATCH LIST
    case GET_CHAT_MATCH_LIST:
      return {
        ...state,
        ...action.payload,
        matchListLoading: true,
      };
    case GET_CHAT_MATCH_LIST_SUCCESS:
      return {
        ...state,
        matchListLoading: false,
      };
    case GET_CHAT_MATCH_LIST_FAILED:
      return {
        ...state,
        matchListLoading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CHAT CUSTOMER DETAILS
    case GET_CHAT_CUSTOMER_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CHAT_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        chatCustomerDetails: [...state.chatCustomerDetails, action.payload],
        loading: false,
      };
    case GET_CHAT_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // FOR CHAT/GET MESSAGES
    case GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        getMessageResponse: action.payload,
        loading: false,
      };
    case GET_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // FOR CHAT/SEND MESSAGES
    case SEND_MESSAGE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessageResponse: action.payload,
        loading: false,
      };
    case SEND_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET LAST ACTIVITY
    case GET_LAST_ACTIVITY:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_LAST_ACTIVITY_SUCCESS:
      return {
        ...state,
        lastActivity: action.payload,
        loading: false,
      };
    case GET_LAST_ACTIVITY_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // UPDATE USER LAST ACTIVITY
    case UPDATE_LAST_ACTIVITY:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_LAST_ACTIVITY_SUCCESS:
      return {
        ...state,
        updatedLastActivity: action.payload,
      };
    case UPDATE_LAST_ACTIVITY_FAILED:
      return {
        ...state,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET UNREAD MESSAGES
    case GET_UNREAD_MESSAGES:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_UNREAD_MESSAGES_SUCCESS:
      const isMessageAlreadyExists = state.unreadMessages.some(
        message => message.chatRoomID === action.payload.chatRoomID,
      );

      if (!isMessageAlreadyExists) {
        // Message with the same chatRoomID does not exist, add it to the array
        return {
          ...state,
          unreadMessages: [...state.unreadMessages, action.payload],
          loading: false,
        };
      } else {
        // Message with the same chatRoomID already exists
        return {
          ...state,
          unreadMessages: state.unreadMessages.map(message =>
            message.chatRoomID === action.payload.chatRoomID
              ? {
                  ...message,
                  isRead: action.payload.isRead,
                } // Update isRead if it changed
              : message,
          ),
          loading: false,
        };
      }
    case GET_UNREAD_MESSAGES_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // READ CHAT MESSAGES
    case READ_CHAT_MESSAGE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case READ_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        readChatMessage: action.payload,
        loading: false,
      };
    case READ_CHAT_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET POSSIBLES
    case GET_POSSIBLES:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_JOWA_POSSIBLES_SUCCESS:
      return {
        ...state,
        jowaPossibles: action.payload,
        loading: false,
      };
    case GET_MARE_POSSIBLES_SUCCESS:
      return {
        ...state,
        marePossibles: action.payload,
        loading: false,
      };
    case GET_POSSIBLES_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // REPORT CATEGORY
    case REPORT_CATEGORY:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case REPORT_CATEGORY_SUCCESS:
      return {
        ...state,
        reportCategoryResponse: action.payload,
        loading: false,
      };
    case REPORT_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // UPLOAD PHOTO MESSAGE
    case UPLOAD_PHOTO_MESSAGE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case UPLOAD_PHOTO_MESSAGE_SUCCESS:
      return {
        ...state,
        uploadPhotoResponse: action.payload,
        loading: false,
      };
    case UPLOAD_PHOTO_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: 'There may be an error with the photo sending service',
      };
    // DOWNLOAD PHOTO MESSAGE
    case DOWNLOAD_PHOTO_MESSAGE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case DOWNLOAD_PHOTO_MESSAGE_SUCCESS:
      return {
        ...state,
        downloadPhotoResponse: action.payload,
        loading: false,
      };
    case DOWNLOAD_PHOTO_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: 'There may be an error with the photo sending service',
      };
    default:
      return state;
  }
};

export default dashboard;
