import {ChatAttachment} from './ChatAttachment.js';
import {ChatMessage, Reaction} from '../../../src/types/generated.ts';

// TypeScript equivalent of the Chat class
export interface Chat {
  id: number;
  chatRoomID: string;
  senderSub: string;
  message: string;
  created: string;
  isRead: number;
  chatAttachments: ChatAttachment[];
  attachments?: string[]; // Transient field
  targetSub: string;
  isUnsent: boolean;
  replyingId?: number;
  replying?: ChatMessage;
  reactions?: Array<Reaction>;
}
