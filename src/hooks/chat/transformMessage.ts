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
    // sent: true,
  };
}
