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
    unsent: message.isUnsent,
    replyingId: message.replyingId,
    replying: message.replying,
    reactions: message.reactions,
  };
}
