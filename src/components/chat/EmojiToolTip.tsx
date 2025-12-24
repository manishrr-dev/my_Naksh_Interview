import { Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { FeedbackEmoji } from '../../types/common';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface EmojiToolTipProps {
  onEmojiSelect: (emoji: FeedbackEmoji) => void;
  onClose: () => void;
  isLeft: boolean;
}

const emojis: FeedbackEmoji[] = ['👍', '👎', '❤️', '😂', '😢', '🙏'];

const EmojiToolTip: React.FC<EmojiToolTipProps> = ({
  onEmojiSelect,
  onClose,
  isLeft,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        isLeft ? styles.leftAlign : styles.rightAlign,
        animatedStyle,
      ]}
    >
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      {emojis.map(emoji => (
        <Pressable
          key={emoji}
          style={styles.emojiButton}
          onPress={() => onEmojiSelect(emoji)}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  leftAlign: {
    left: 0,
  },
  rightAlign: {
    right: 0,
  },
  emojiButton: {
    marginHorizontal: 5,
  },
  emoji: {
    fontSize: 24,
  },
  closeButton: {
    marginRight: 8,
    marginLeft: 2,
  },
  closeText: {
    fontSize: 12,
    color: '#666',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});

export default EmojiToolTip;
