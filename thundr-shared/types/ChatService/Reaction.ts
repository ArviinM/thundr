export type Reaction = {
  reactionId: string;
  messageId?: number | null;

  /**
   * These two are nullables,
   * when delete requests are received
   */
  reactionSub?: string | null;
  reactionEmoji?: string | null;

  chatRoomId?: string;
};
