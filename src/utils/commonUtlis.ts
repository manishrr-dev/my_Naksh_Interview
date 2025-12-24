import { Sender } from '../types/common';

export const getSenderName = (sender: Sender) => {
  switch (sender) {
    case Sender.AI_ASTROLOGER:
      return 'AI Astrologer';
    case Sender.HUMAN_ASTROLOGER:
      return 'Human Astrologer';
    case Sender.SYSTEM:
      return 'System';
    case Sender.USER:
      return 'User';
  }
};
