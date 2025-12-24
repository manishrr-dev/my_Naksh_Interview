import { create } from 'zustand';
import {
  FeedbackChips,
  FeedbackEmoji,
  IMessageData,
  Sender,
} from '../types/common';

export interface IMessageState {
  // data types
  messageData: IMessageData[];
  replyText: IMessageData | null;
  activeTooltipMessageId: string | null;

  // actions
  setReplyText: (id: string | null) => void;
  setMessageEmoji: (id: string, emoji: FeedbackEmoji | undefined) => void;
  setActiveTooltipMessageId: (id: string | null) => void;
}

const initialState: Omit<
  IMessageState,
  'setReplyText' | 'setMessageEmoji' | 'setActiveTooltipMessageId'
> = {
  messageData: [
    {
      id: '1',
      sender: Sender.SYSTEM,
      text: 'Your session with Astrologer Vikram has started.',
      timestamp: 1734681480000,
      type: 'event',
      emoji: '👍',
    },
    {
      id: '2',
      sender: Sender.USER,
      text: 'Namaste. I am feeling very anxious about my current job. Can you look at my chart?',
      timestamp: 1734681600000,
      type: 'text',
    },
    {
      id: '3',
      sender: Sender.AI_ASTROLOGER,
      text: 'Namaste! I am analyzing your birth details. Currently, you are running through Shani Mahadasha. This often brings pressure but buildsresilience.',
      timestamp: 1734681660000,
      type: 'text',
      hasFeedback: true,
      feedbackType: 'liked',
    },
    {
      id: '4',
      sender: Sender.HUMAN_ASTROLOGER,
      text: 'I see the same. Look at your 6th house; Saturn is transiting there. This is why you feel the workload is heavy.',
      timestamp: 1734681720000,
      type: 'text',
    },
    {
      id: '5',
      sender: Sender.USER,
      text: 'Is there any remedy for this? I find it hard to focus.',
      timestamp: 1734681780000,
      type: 'text',
      replyTo: '4',
    },
    {
      id: '6',
      sender: Sender.AI_ASTROLOGER,
      text: 'I suggest chanting the Shani Mantra 108 times on Saturdays. Would you like the specific mantra text?',
      timestamp: 1734681840000,
      type: 'text',
      hasFeedback: false,
    },
  ],
  replyText: {
    id: '4',
    sender: Sender.HUMAN_ASTROLOGER,
    text: 'I see the same. Look at your 6th house; Saturn is transiting there. This is why you feel the workload is heavy.',
    timestamp: 1734681720000,
    type: 'text',
  },
  activeTooltipMessageId: null,
};

export const useChatStore = create<IMessageState>(set => ({
  ...initialState,
  setReplyText: (id: string | null) => {
    set(state => ({
      replyText:
        id === null
          ? null
          : state.messageData.find(
              (message: IMessageData) => message.id === id,
            ) || null,
    }));
  },
  setMessageEmoji: (id: string, emoji: FeedbackEmoji | undefined) => {
    set(state => ({
      messageData: state.messageData.map(message =>
        message.id === id ? { ...message, emoji } : message,
      ),
    }));
  },
  setActiveTooltipMessageId: (id: string | null) => {
    set({ activeTooltipMessageId: id });
  },
}));
