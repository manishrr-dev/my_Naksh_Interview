import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
  IMessageData,
  Sender,
  FeedbackEmoji,
  FeedbackChips,
} from '../../types/common';
import { getSenderName } from '../../utils/commonUtlis';
import { usePanGesture } from './hooks/usePanGesture';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useChatStore } from '../../store/chatStore';
import EmojiToolTip from './EmojiToolTip';
import FeedbackChipsDropdown from './FeedbackChipsDropdown';
import FeedbackTag from './FeedbackTag';
import { scheduleOnRN } from 'react-native-worklets';

interface SwipeableChatBoxProps {
  message: IMessageData;
}

const SwipeableChatBox: React.FC<SwipeableChatBoxProps> = ({ message }) => {
  const {
    setReplyText,
    setMessageEmoji,
    activeTooltipMessageId,
    setActiveTooltipMessageId,
    setMessageFeedback,
    setMessageFeedbackReason,
  } = useChatStore();
  const showEmojiTooltip = activeTooltipMessageId === message.id;
  const [showFeedbackDropdown, setShowFeedbackDropdown] = useState(false);

  // writing this to calculate the alignmnet of chat box
  const isLeft =
    message.sender === Sender.AI_ASTROLOGER ||
    message.sender === Sender.HUMAN_ASTROLOGER ||
    message.sender === Sender.SYSTEM;

  const name = getSenderName(message.sender as Sender);
  const isAIMessage = message.sender === Sender.AI_ASTROLOGER;

  const { panGesture, translateX, animatedStyleForIcon } = usePanGesture({
    isLeft,
    messageId: message.id,
    setReplyText,
  });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      'worklet';
      scheduleOnRN(setActiveTooltipMessageId, message.id);
    });

  const combinedGesture = Gesture.Exclusive(panGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleEmojiSelect = (emoji: FeedbackEmoji) => {
    setMessageEmoji(message.id, emoji);
    setActiveTooltipMessageId(null);
  };

  const handleCloseTooltip = () => {
    setActiveTooltipMessageId(null);
  };

  const handleEmojiPress = () => {
    setMessageEmoji(message.id, undefined);
  };

  const handleLike = () => {
    setMessageFeedback(message.id, 'liked');
    setShowFeedbackDropdown(false);
  };

  const handleDislike = () => {
    if (message.feedbackType === 'disliked') {
      // Toggle dropdown if already disliked
      setShowFeedbackDropdown(!showFeedbackDropdown);
    } else {
      setMessageFeedback(message.id, 'disliked');
      setShowFeedbackDropdown(true);
    }
  };

  const handleFeedbackReasonSelect = (reason: FeedbackChips) => {
    setMessageFeedbackReason(message.id, reason);
    setShowFeedbackDropdown(false);
  };

  return (
    <View style={[styles.wrapper, showEmojiTooltip && styles.wrapperElevated]}>
      <Animated.View
        style={[
          styles.replyIconContainer,
          isLeft ? styles.replyIconLeft : styles.replyIconRight,
          animatedStyleForIcon,
        ]}
      >
        <Text style={styles.replyIcon}>↩️</Text>
      </Animated.View>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View
          style={[
            styles.container,
            isLeft ? styles.leftAlign : styles.rightAlign,
            animatedStyle,
          ]}
        >
          <Text style={styles.senderText}>{name}</Text>
          <Text style={styles.messageText}>{message.text}</Text>

          {/* Feedback Tags - Inside the message */}
          {message.feedbackType && (
            <FeedbackTag
              feedbackType={message.feedbackType}
              feedbackReason={message.feedbackReason}
            />
          )}

          {/* AI Feedback Buttons */}
          {isAIMessage && !message.feedbackType && (
            <View style={styles.feedbackButtons}>
              <Pressable onPress={handleLike} style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>👍</Text>
              </Pressable>
              <Pressable onPress={handleDislike} style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>👎</Text>
              </Pressable>
            </View>
          )}

          {/* Feedback Dropdown */}
          {showFeedbackDropdown && message.feedbackType === 'disliked' && (
            <FeedbackChipsDropdown
              onSelect={handleFeedbackReasonSelect}
              isLeft={isLeft}
            />
          )}

          {/* Emoji Tooltip */}
          {showEmojiTooltip && (
            <EmojiToolTip
              onEmojiSelect={handleEmojiSelect}
              onClose={handleCloseTooltip}
              isLeft={isLeft}
            />
          )}

          {/* Emoji Badge */}
          {message.emoji && (
            <Pressable
              style={[
                styles.selectedEmoji,
                isLeft ? styles.emojiLeft : styles.emojiRight,
              ]}
              onPress={handleEmojiPress}
            >
              <Text style={styles.emojiText}>{message.emoji}</Text>
            </Pressable>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginVertical: 5,
    zIndex: 1,
  },
  wrapperElevated: {
    zIndex: 999,
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxWidth: '80%',
    position: 'relative',
  },
  leftAlign: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  rightAlign: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  senderText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  replyIconContainer: {
    position: 'absolute',
    top: '50%',
    marginTop: -12,
    zIndex: -1,
  },
  replyIconLeft: {
    left: 10,
  },
  replyIconRight: {
    right: 10,
  },
  replyIcon: {
    fontSize: 24,
    color: '#888',
  },
  selectedEmoji: {
    position: 'absolute',
    bottom: -15,
    padding: 2,
  },
  emojiLeft: {
    left: 10,
  },
  emojiRight: {
    right: 10,
  },
  emojiText: {
    fontSize: 18,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  feedbackButton: {
    padding: 4,
  },
  feedbackButtonText: {
    fontSize: 20,
  },
});

export default SwipeableChatBox;
