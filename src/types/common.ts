export type MessageType =
  | 'user'
  | 'human_astrologer'
  | 'system'
  | 'ai_astrologer';

export type FeedbackChips = 'inaccurate' | 'too vague' | 'too long';

export type FeedbackEmoji = '👍' | '👎' | '❤️' | '😂' | '😢' | '🙏';

export interface IMessageData {
  id: string;
  sender: MessageType;
  text: string;
  timestamp: number;
  type: 'text' | 'event' | 'feedback';
  replyTo?: string;
  hasFeedback?: boolean;
  feedbackType?: 'liked' | 'disliked';
  feedbackReason?: FeedbackChips;
  emoji?: FeedbackEmoji;
}

export enum Sender {
  AI_ASTROLOGER = 'ai_astrologer',
  HUMAN_ASTROLOGER = 'human_astrologer',
  SYSTEM = 'system',
  USER = 'user',
}

export enum FeedbackType {
  LIKED = 'liked',
  DISLIKED = 'disliked',
}
