import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

interface UsePanGestureProps {
  isLeft: boolean;
  messageId: string;
  setReplyText: (id: string | null) => void;
}

export const usePanGesture = ({
  isLeft,
  messageId,
  setReplyText,
}: UsePanGestureProps) => {
  const translateX = useSharedValue(0);
  const showReplyIcon = useSharedValue(0);

  const SWIPE_THRESHOLD = 100;
  const MAX_SWIPE = 150;

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (isLeft) {
        translateX.value = Math.max(0, Math.min(MAX_SWIPE, event.translationX));
      } else {
        translateX.value = Math.min(
          0,
          Math.max(-MAX_SWIPE, event.translationX),
        );
      }

      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        showReplyIcon.value = 1;
      } else {
        showReplyIcon.value = 0;
      }
    })
    .onEnd(() => {
      const shouldTriggerReply = Math.abs(translateX.value) > SWIPE_THRESHOLD;

      translateX.value = withTiming(0, {
        duration: 300,
      });
      showReplyIcon.value = withTiming(0, {
        duration: 300,
      });

      if (shouldTriggerReply) {
        scheduleOnRN(setReplyText, messageId);
      }
    });

  const animatedStyleForIcon = useAnimatedStyle(() => ({
    opacity: showReplyIcon.value,
    transform: [{ scale: showReplyIcon.value }],
  }));

  return {
    panGesture,
    translateX,
    showReplyIcon,
    isLeft,
    animatedStyleForIcon,
  };
};
