import {ChatMessage, IMessage} from '../../types/generated.ts';

export function transformChatMessageForGiftedChat(
  message: ChatMessage,
): IMessage {
  return {
    _id: message.id,
    text: message.message,
    createdAt: new Date(message.created),
    user: {_id: message.senderSub},
    attachments: message.attachments,
    isRead: message.isRead,
    chatRoomID: message.chatRoomID,
    pending: message.status === 'pending',
    sent: message.status !== 'pending',
    received: message.isRead === 1,
    unsent: message && message.isUnsent,
    replyingId: message.replyingId || undefined,
    replying:
      typeof message.replying === 'object' &&
      message.replying !== null &&
      '_id' in message.replying
        ? message.replying
        : typeof message.replying === 'object' && message.replying !== null
        ? transformChatMessageForGiftedChat(message.replying)
        : undefined,
    reactions: message.reactions,
    hiddenForSelf: message.hiddenForSelf,
    hideForSubs: message.hideForSubs,
  };
}
