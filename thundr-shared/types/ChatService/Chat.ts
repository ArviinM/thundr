import {
  Attachment,
  ChatMessage,
  Reaction,
} from '../../../src/types/generated.ts';

// TypeScript equivalent of the Chat class
export interface Chat {
  id: number;
  chatRoomID: string;
  senderSub: string;
  message: string;
  created: string;
  isRead: number;
  attachments?: Array<Attachment>; // Transient field
  targetSub: string;
  isUnsent: boolean;
  replyingId?: number;
  replying?: ChatMessage;
  reactions?: Array<Reaction>;
}
