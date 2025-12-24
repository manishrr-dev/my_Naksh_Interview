import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface StarRatingProps {
  visible: boolean;
  onClose: () => void;
}

const StarRating: React.FC<StarRatingProps> = ({ visible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  // Animated values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.8)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const thanksOpacity = useRef(new Animated.Value(0)).current;
  const ratedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      setRating(0);
      setHasRated(false);
      setShowThanksMessage(false);

      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.spring(contentScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      overlayOpacity.setValue(0);
      contentScale.setValue(0.8);
      contentOpacity.setValue(0);
      thanksOpacity.setValue(0);
      ratedOpacity.setValue(0);
    }
  }, [visible]);

  const handleStarPress = (starIndex: number) => {
    if (hasRated) return;

    setRating(starIndex);
    setShowThanksMessage(true);
    setHasRated(true);

    Animated.timing(thanksOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(thanksOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(ratedOpacity, {
            toValue: 1,
            duration: 600,
            delay: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(contentOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start(() => {
              onClose();
            });
          }, 1500);
        });
      }, 1500);
    });
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: contentOpacity,
            transform: [{ scale: contentScale }],
          },
        ]}
      >
        <Text style={styles.thankYouText}>Thank You!</Text>
        <Text style={styles.ratingPrompt}>How was your experience?</Text>

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <Pressable
              key={star}
              onPress={() => handleStarPress(star)}
              disabled={hasRated}
              style={styles.starButton}
            >
              <Text style={styles.starEmoji}>
                {rating >= star ? '⭐' : '☆'}
              </Text>
            </Pressable>
          ))}
        </View>

        {showThanksMessage && (
          <Animated.View
            style={[styles.messageContainer, { opacity: thanksOpacity }]}
          >
            <Text style={styles.thanksMessage}>Thanks for rating!</Text>
          </Animated.View>
        )}

        <Animated.View
          style={[styles.messageContainer, { opacity: ratedOpacity }]}
        >
          <Text style={styles.ratedMessage}>Rated ✓</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thankYouText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#12ba00',
    marginBottom: 10,
  },
  ratingPrompt: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  starEmoji: {
    fontSize: 48,
    lineHeight: 48,
    width: 48,
    textAlign: 'center',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  thanksMessage: {
    fontSize: 16,
    color: '#12ba00',
    fontWeight: '600',
  },
  ratedMessage: {
    fontSize: 18,
    color: '#12ba00',
    fontWeight: 'bold',
  },
});

export default StarRating;
