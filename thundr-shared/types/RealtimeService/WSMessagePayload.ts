import {Chat} from '../ChatService/Chat.js';
import {NotificationPayload} from '../NotificationService/NotificationPayload.js';
import {WSStatus} from '../enum/WSStatus.js';
import {WSKeepaliveAckPayload} from './WSKeepaliveAckPayload.js';
import {WSKeepalivePayload} from './WSKeepalivePayload.js';
import {Reaction} from '../ChatService/Reaction.ts';
import {Unsend} from '../ChatService/Unsend.ts';

export default class WSMessagePayload<T> {
  public data: T;
  public msgType: WSMessageTypes;
  public wsStatus: WSStatus;

  constructor(data: T, msgType: WSMessageTypes, wsStatus: WSStatus) {
    this.data = data;
    this.msgType = msgType;
    this.wsStatus = wsStatus;
  }

  public static builder<T>(): WSMessagePayloadBuilder<T> {
    return new WSMessagePayloadBuilder<T>();
  }

  public static fromJson<T>(json: string): WSMessagePayload<T> {
    return fromJson<T>(json);
  }

  public toString(): string {
    return JSON.stringify({
      data: this.data,
      msgType: this.msgType,
      wsStatus: this.wsStatus,
    });
  }
}

class WSMessagePayloadBuilder<T> {
  private data: T | undefined;
  private msgType: WSMessageTypes | undefined;
  private wsStatus: WSStatus | undefined;

  public withData(data: T): this {
    this.data = data;
    return this;
  }

  public withMsgType(msgType: WSMessageTypes): this {
    this.msgType = msgType;
    return this;
  }

  public withWsStatus(wsStatus: WSStatus): this {
    this.wsStatus = wsStatus;
    return this;
  }

  public build(): WSMessagePayload<T> {
    if (!this.data || !this.msgType || !this.wsStatus) {
      throw new Error('All fields must be set before calling build().');
    }

    return new WSMessagePayload(this.data, this.msgType, this.wsStatus);
  }
}

function fromJson<T>(json: string): WSMessagePayload<T> {
  const data = JSON.parse(json);

  if (!data.data || !data.msgType || !data.wsStatus) {
    throw new Error('Invalid WSMessagePayload JSON.');
  }

  return new WSMessagePayload<T>(data.data, data.msgType, data.wsStatus);
}

export type WSServerToClientEvent = {
  USR_ACTIVE: 'USR_ACTIVE';
  TYPE_INDICATOR: 'TYPE_INDICATOR';
  AUTH_RESPONSE: Dispatch<WSMessagePayload<string>>;
  KEEPALIVE_ACK: Dispatch<WSKeepaliveAckPayload>;
  PUSH_NOTIFICATION: Dispatch<WSMessagePayload<NotificationPayload>>;
  CHAT: Dispatch<WSMessagePayload<Chat>>;
  REACTION_CREATE: Dispatch<WSMessagePayload<Reaction>>;
  REACTION_DELETE: Dispatch<WSMessagePayload<Reaction>>;
  CHAT_DELETE: Dispatch<WSMessagePayload<Unsend>>;
};

export type WSClientToServerEvent = {
  USR_ACTIVE: 'USR_ACTIVE';
  TYPE_INDICATOR: 'TYPE_INDICATOR';
  AUTH_RESPONSE: 'AUTH_RESPONSE';
  KEEPALIVE: DispatchCallback<
    WSMessagePayload<WSKeepalivePayload>,
    WSMessagePayload<WSKeepaliveAckPayload>
  >;
  PUSH_NOTIFICATION: Dispatch<WSMessagePayload<NotificationPayload>>;
  CHAT: Dispatch<WSMessagePayload<Chat>>;
};

export type Dispatch<T> = (value: T) => void;

export type DispatchCallback<T, C> = (
  value: T,
  callback: (value: C) => void,
) => void;

export type WSMessageTypes =
  | keyof WSClientToServerEvent
  | keyof WSServerToClientEvent;
