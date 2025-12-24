import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { FeedbackChips } from '../../types/common';

interface FeedbackChipsDropdownProps {
  onSelect: (reason: FeedbackChips) => void;
  isLeft: boolean;
}

const FEEDBACK_OPTIONS: FeedbackChips[] = [
  'Inaccurate',
  'Too vague',
  'Too long',
];

const FeedbackChipsDropdown: React.FC<FeedbackChipsDropdownProps> = ({
  onSelect,
  isLeft,
}) => {
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming(100, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    animatedOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        isLeft ? styles.containerLeft : styles.containerRight,
        animatedStyle,
      ]}
    >
      <Text style={styles.title}>Why did you dislike?</Text>
      <View style={styles.chipsContainer}>
        {FEEDBACK_OPTIONS.map(option => (
          <Pressable
            key={option}
            style={styles.chip}
            onPress={() => onSelect(option)}
          >
            <Text style={styles.chipText}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 1000,
  },
  containerLeft: {
    left: 0,
  },
  containerRight: {
    right: 0,
  },
  title: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipText: {
    fontSize: 12,
    color: '#333',
  },
});

export default FeedbackChipsDropdown;
