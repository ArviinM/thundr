import {QuickReplies, User} from 'react-native-gifted-chat';

export type BaseResponse<T> = {
  data: T;
  message: string;
  error: boolean;
  status: string;
};

export type AuthDataRequest = {
  phoneNumber: string;
  password: string;
};

export type AuthDataResponse = {
  username: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
  sub: string;
  loginDeactivated: boolean;
  forProfileCreation: boolean;
  session?: string;
};

export type AuthStoreState = {
  authData?: AuthDataResponse;
  setAuthData: (data: AuthDataResponse) => void;
};

export type AuthRefreshTokenRequest = {
  refreshToken: string;
  sub: string;
  username: string;
};

export type AuthRefreshTokenResponse = {
  accessToken: string;
  idToken: string;
  forProfileCreation: boolean;
};

// Auth SSO
export type SSOUrlRequest = {
  sso: 'Google' | 'Facebook';
};

// Mobile Validation Types
export type MobileValidationRequest = {
  phoneNumber: string;
};

export type MobileValidationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Mobile Verification Types
export type MobileVerificationRequest = {
  phoneNumber: string;
  session: string;
  challengeName: string;
  challengeAnswer: string;
};

export type MobileResendOTPRequest = {
  phoneNumber: string;
  session: string;
};

export type MobileVerificationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Email Validation Types
export type EmailValidationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
};

export type EmailValidationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
  email: string;
};

// Email Verification Types
export type EmailVerificationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
  challengeAnswer: string;
};

export type EmailCodeResendRequest = {
  phoneNumber: string;
  session: string;
  email: string;
};

export type EmailVerificationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
  email: string;
};

// Password Creation Types
export type PasswordCreationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
  password: string;
};

export type PasswordCreationResponse = {
  accessToken: string;
  idToken: string;
  username: string;
  refreshToken: string;
  sub: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Customer Profile Types
export type CustomerCreateProfileRequest = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
};

export type CustomerCreateProfileResponse = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
  created: string;
  deactivateDate: string | null;
  activated: boolean;
};

// Customer
export type CustomerMatchLocationRequest = {
  sub: string;
  longitude: string;
  latitude: string;
};

export type CustomerMatchLocationResponse = {
  sub: string;
  longitude: string;
  latitude: string;
  lastUpdate: string;
};

// Compatibility Questions
export type CompatibilityQuestionsRequest = {
  sub: string;
};

export type CompatibilityChoice = {
  id: number;
  answer: string;
  sequence: string;
  updateDate: string | null;
};

export type CompatibilityQuestion = {
  id: number;
  category: string;
  question: string;
  updateDate: string;
  compatibilityAnswer: CompatibilityChoice[];
  selected?: number;
};

//Compatibility POST Questions
export type CompatibilityAnswer = {
  questionId: string;
  answerId: number;
};

export type CompatibilityAnswersRequest = {
  sub: string;
  compatibilities: CompatibilityAnswer[];
};

export type CompatibilityAnswersResponse = {
  id: number;
  sub: null;
  questionId: number;
  answerId: number;
  createDate: string;
};

// Customer Details
export type CustomerDetailsRequest = {
  sub: string;
  bio: string;
  work: string;
  location: string;
  hobbies?: string;
  height?: string;
  starSign?: string;
  education?: string;
  drinking?: string;
  smoking?: string;
  religion?: string;
  pet?: string;
  politics?: string;
  personalityType?: string;
  pronouns?: string;
};

export type CustomerDetailsResponse = {
  id: number;
  sub: string;
  bio: string;
  work: string;
  location: string;
  hobbies: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
  pronouns: string;
};

// Match Details
export type CustomerMatchRequest = {
  sub: string;
};

export type CustomerMatchResponse = {
  sub: string;
  percent: string;
  customerData: CustomerData;
  isBlurred?: boolean;
};

export type CustomerMatchPostRequest = {
  sub: string;
  target: string;
  tag: 'Mare' | 'Jowa';
  possibleTag?: 'Mare' | 'Jowa';
};

export type CustomerMatchPostResponse = {
  sub: string;
  target: string;
  tag: 'MARE' | 'JOWA';
  dateTime: string;
  ttl: string;
  match: boolean;
  chatUUID: string;
  compatibilityScore: string;
};

export type CustomerDetails = {
  bio: string;
  work: string;
  location: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
  hobbies: string;
  pronouns?: string;
};

// Define interface for customer photo
export type CustomerPhoto = {
  id: number;
  primary: boolean;
  photoUrl: string;
  index: number | null;
  blurHash: string;
};

// Define interface for customer data
export type CustomerData = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
  deactivateDate: string | null;
  customerDetails: CustomerDetails;
  withCustomerDetails: boolean;
  withCustomerCompatibilities: boolean;
  customerPhoto: CustomerPhoto[];
  withCustomerPhoto: boolean;
  activated: boolean;
  lastActivity: number;
  faceVerificationState: FacialVerificationState;
};

export type CustomerProfileRequest = {
  sub: string;
};

// Save FCM Token
export type CustomerFCMTokenRequest = {
  subId: string;
  token: string;
};

// Notification Data

enum ChannelType {
  GENERIC = 'GENERIC',
  MATCH = 'MATCH',
  CHAT = 'CHAT',
  MATCHED_CHAT = 'MATCHED_CHAT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  REPOST = 'REPOST',
  QUOTE = 'QUOTE',
  COMMUNITY_ACCEPTED = 'COMMUNITY_ACCEPTED',
  COMMUNITY_REJECTED = 'COMMUNITY_REJECTED',
  NEW_POST = 'NEW_POST',
  FACE_VERIFICATION_OK = 'FACE_VERIFICATION_OK',
  FACE_VERIFICATION_FAIL = 'FACE_VERIFICATION_FAIL',
}

export type RemoteData = {
  sentTime: string;
  matchType: string;
  channelType: ChannelType;
  targetSub: string;
  matchPhoto?: string;
  chatRoomUuid: string;
  extraProps?: string;
};

export type NotificationData = {
  body: string;
  remote: {
    senderId: string;
    messageId: string;
  };
  title: string;
  id: string;
  data: RemoteData;
  ios: {
    threadId: string;
    launchImageName: string;
    categoryId: string;
  };
  notification: {title: string; body: string};
};

// Forget Password
export type ForgetPasswordValidationRequest = {
  phoneNumber: string;
};

export type ForgetPasswordVerificationRequest = {
  phoneNumber: string;
  code: string;
};

export type ForgetPasswordVerificationResponse = {
  step: number;
  done: boolean;
  newHash: string;
  stepCount: number;
};

export type ForgetPasswordChangePasswordRequest = {
  phoneNumber: string;
  code: string;
  newPassword: string;
};

export type ForgetPasswordChangePasswordResponse = {
  step: number;
  done: boolean;
  stepCount: number;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

// Chat Types
export type Chat = {
  profile: CustomerData;
  lastActivity: number;
  chatRoomUuid: string;
  tag: 'MARE' | 'JOWA';
  ttl: number;
  matchDate: number;
  compatibilityScore: string;
  latestChat: ChatMessage | null;
  sub: string;
  userLastActive: string;
  target: string;
};

// Define a type for the attachment URLs
// export type Attachment = string;

export type Attachment = {
  fileUrl: string;
  blurHash?: string;
  thumbnailUrl?: string;
  mimeType?: string;
};

// Chat Reactions
export type Reaction = {
  reactionId: string;
  reactionSub: string;
  reactionEmoji: string;
  chatRoomId?: string;
};

// Define a type for a single chat message
export type ChatMessage = {
  id: number;
  chatRoomID: string;
  senderSub: string;
  message: string;
  created: string;
  isRead: number;
  attachments: Array<Attachment>;
  targetSub: string;
  status?: 'pending' | 'sent' | 'failed';
  isUnsent: boolean;
  replyingId?: number;
  replying?: ChatMessage | IMessage;
  reactions?: Array<Reaction>;
  hideForSubs?: string;
  hiddenForSelf?: boolean;
};

export type ChatListRequest = {
  sub: string;
  beforeLastActivity?: number;
};

export type ChatListResponse = {
  customerChatAndMatches: Chat[];
  unreads: number;
};

export type ChatMessageRequest = {
  sub: string;
  chatRoomID: string;
  limit: number;
  beforeId?: number;
};

export type ChatReadRequest = {
  id: string;
};

export type Base64Attachments = {
  fileName?: string;
  fileContentBase64?: string | null;
};

export type FileAttachment = {
  fileName: string | undefined;
  fileType: string;
  filePath: string;
};

export type ChatSendMessageRequest = {
  id?: number;
  senderSub: string;
  message: string;
  read: string;
  targetSub: string;
  attachments?: Array<FileAttachment>;
  chatRoomID?: string;
  replyingToId?: number;
  replying?: IMessage | undefined;
  type?: 'message' | 'image' | 'video';
};

// Transform Chat Messages for Gifted Chat
export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
  attachments?: Attachment[]; // Array to hold attachment URLs
  isRead: number;
  chatRoomID: string;
  unsent: boolean;
  reactions?: Array<Reaction>;
  reactionsCount?: number;
  replyingId?: number;
  replying?: IMessage;
  hiddenForSelf?: boolean;
  hideForSubs?: string;
  type?: 'message' | 'image' | 'video';
}

// Deactivate
export type CustomerDeactivateRequest = {
  sub: string;
};

// Survey
export type CustomerSurveyRequest = {
  sub: string;
  type: string;
  value: string;
};

export type CustomerSurveyResponse = {
  id: number;
  sub: string;
  type: string;
  value: string;
  created: string;
};

// Filters
export type GetCustomerFilterRequest = {
  sub: string;
};

export type GetCustomerFiltersResponse = {
  sub: string;
  ageMin: string;
  ageMax: string;
  proximity: string;
  gender: string;
  hobbies: string;
  starSign: string;
  religion: string;
  politics: string;
  personalityType: string;
  updateDate: string;
};

export type CustomerFilter = {
  sub: string;
  ageMin?: string;
  ageMax?: string;
  proximity?: string;
  gender?: string;
  hobbies?: string;
  starSign?: string;
  religion?: string;
  politics?: string;
  personalityType?: string;
  updateDate: string;
};

// Possibles
export type PossiblesRequest = {
  sub: string;
  tag: 'MARE' | 'JOWA';
};

export type PossiblesResponse = {
  profiles: CustomerMatchResponse[];
  isBlurred: boolean;
  tag: 'MARE' | 'JOWA';
  nextActionTime: number;
  count: number;
};

export type PossiblesSkipRequest = {
  sub: string;
  tag: 'MARE' | 'JOWA';
};

export type NotificationRequest = {
  sub: string;
  beforeId?: number;
};

export type NotificationReadDeleteRequest = {
  sub: string;
  notificationId: number;
};

export type NotificationReadAll = {
  sub: string;
};

export type NotificationResponse = {
  id: number;
  subId: string;
  title: string;
  body: string;
  channelType: ChannelType;
  sentTime: string;
  matchType: string;
  notificationMethod: string;
  chatRoomUuid: string;
  targetSub: string;
  matchPhoto: string | null;
  isRead: boolean;
  extraProps: string;
};

export type ReportCustomerRequest = {
  sub: string;
  targetSub: string;
  reportCategory: {type: string; category: string};
  remark: string;
};

// Handoff Session for Payment to External
export type HandoffSessionRequest = {
  sub: string;
  session: string;
};

export type HandoffSessionResponse = {
  sub: string;
  key: string;
  session: string;
};

export type OrderIdResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  sub: string;
  productId: string;
  productExtraDays: number;
  customerSubscriptionId: string | null;
  status: string;
  amountCents: number;
  currency: string;
  paymentMethodId: string | null;
};

export type CustomerSubscribedRequest = {
  sub: string;
  productId: string;
};

export type CustomerSubscribedResponse = {
  hasSubscription: boolean;
  status:
    | 'ACTIVE'
    | 'PENDING_RENEWAL'
    | 'EXPIRED'
    | 'PENDING_CANCEL'
    | 'CANCELLED'
    | 'PENDING_PAYMENT';
  latestOrder?: OrderIdResponse;
};

export type CustomerDonationRequest = {
  sub: string;
};

export type CustomerDonationResponse = {
  id: string;
  updatedAt: string;
};

export type CustomerLatestOrderRequest = {
  sub: string;
  product: string;
};

export type CustomerLatestOrderResponse = {
  id: string;
  updatedAt: string;
  status: 'PENDING' | 'COMPLETED';
  productId: 'THDR-ADVC-001' | 'THDR-BOLT-001';
};

export type ChatReactionRequest = {
  sub: string;
  messageId: number;
  reaction: string;
};

export type ChatReactionResponse = {
  reactionId: string;
  reactionSub: string;
  reactionEmoji: string;
  sub: string | null;
};

export type ChatUnsendMessageRequest = {
  sub: string;
  messageId: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type ImageSource = {uri: string; alt?: string};

export type GenericCustomerRequest = {
  sub: string;
};

export type CustomerDeleteProfilePhotoRequest = {
  sub: string;
  id: number;
};

export type FacialVerificationState =
  | 'UNVERIFIED'
  | 'PENDING'
  | 'VERIFIED'
  | 'VERIFY_FAIL';

export type PostRequest = {
  sub: string;
  content: string;
  inCommunity?: string;
  privacySettings?: PrivacySettings;
  referencedPost?: string;
  repostType?: RepostType;
  media: FileAttachment[];
};

export type PrivacySettings = 'PUBLIC' | 'MATCHES';
export type RepostType = 'QUOTE' | 'REPOST';
export type AttachmentType = 'PHOTO' | 'VIDEO' | 'WEB_EMBED' | 'GIF';

export type PostAttachment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  referencedPostId: string;
  attachmentType: AttachmentType;
  attachmentImage: string;
  attachmentThumbnail: string;
  attachmentBlurhash: string;
  attachmentUrl: string | null;
  attachmentDomain: string | null;
  attachmentTitle: string | null;
  attachmentDescription: string | null;
  attachmentWidth: number;
  attachmentHeight: number;
  attachmentEmbedHasImage: number | null;
};

export type FeedResponse = {
  snowflakeId: string;
  createdAt: string; // Consider using Date type for timestamps
  updatedAt: string; // Consider using Date type for timestamps
  referencedCommunnityId: number;
  sub: string;
  privacySettings: PrivacySettings;
  content: string;

  // Reposts
  referencedPostId: bigint; // bigint is for very large integers
  referencedPost?: FeedResponse; // Optional for lazy loading
  referenceType: RepostType;

  attachments: PostAttachment[];
  deleted: boolean;
  edited: number;

  // Customer (User?) Info
  customerPhoto: string; // This seems related to the user, not the post
  customerPhotoBlurHash?: string; // Also user-related?
  customerName: string; // Definitely user-related

  // Stats Section  (Consider if you want this directly on the PostResponse)
  commentCount?: number;
  likeCount?: number;
  repostCount?: number;

  isLiked?: boolean;
  isReposted?: boolean;
  topLevelPostId: string | null;
  parentPostId: string | null;
  topLevelReplies: FeedResponse[] | null;

  // Account Type
  accountType: ('CUSTOMER' | 'FORUM_ADMIN' | 'CORPORATE') | null;
  matchTag?: 'MARE' | 'JOWA';
};

// Define the params for the CreatePost route
export type CreatePostParams = {
  isComment?: boolean;
  referenceId?: string;
  screenTitle?: string;
};

// Reply to a Post
export type ReplyRequest = {
  sub: string;
  content: string;
  privacySettings: PrivacySettings;
  inCommunity?: string;
  parentPostId: string;
  topLevelPostId: string;
  media: FileAttachment[];
};

export type GetReplyRequest = {
  sub: string;
  snowflakeId: string;
  beforeId?: string;
};

export type GetFeedRequest = {
  sub: string;
  beforeId?: string;
  limit?: number;
};

export type LikePost = {
  sub: string;
  postId: string;
  isLiked: boolean;
};

export type GetPostRequest = {
  sub: string;
  postId: string;
};

export type DeletePostRequest = {
  sub: string;
  postId: string;
};

export type RepostRequest = {
  sub: string;
  postId: string;
  isReposted: boolean;
  community: number;
  privacySettings: PrivacySettings;
};

export type CommunityResponse = {
  customerEnabled: boolean;
  communityIcon: string;
  id: number;
  name: string;
};

export type EditPostRequest = {
  sub: string;
  postId: string;
  newContent: string;
};

export type GetEditHistoryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  referencedPostId: string;
  originalContent: string;
  originalPostUpdateTime: string;
};
