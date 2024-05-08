import { ChannelType } from "./ChannelType.js";
import { MatchType } from "./MatchType.js";
import { NotificationMethod } from "./NotificationMethod.js";

// Interface for NotificationPayload with number for sentTime
export interface NotificationPayload {
  subId: string;
  title: string;
  body: string;
  channelType: ChannelType;
  sentTime: number; // Using number instead of Timestamp
  matchType?: MatchType;
  notificationMethod?: NotificationMethod;
  chatRoomUuid?: string;
  targetSub?: string;
  matchPhoto?: string;
  save?: boolean;
}