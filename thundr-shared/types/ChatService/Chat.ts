import {ChatAttachment} from './ChatAttachment.js';

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
}
