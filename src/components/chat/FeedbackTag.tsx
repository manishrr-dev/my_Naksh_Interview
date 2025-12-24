import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FeedbackChips } from '../../types/common';

interface FeedbackTagProps {
  feedbackType: 'liked' | 'disliked';
  feedbackReason?: FeedbackChips;
}

const FeedbackTag: React.FC<FeedbackTagProps> = ({
  feedbackType,
  feedbackReason,
}) => {
  if (feedbackType === 'liked') {
    return (
      <View style={[styles.feedbackTag, styles.likedTag]}>
        <Text style={styles.feedbackTagText}>Liked</Text>
      </View>
    );
  }

  if (feedbackType === 'disliked' && feedbackReason) {
    return (
      <View style={[styles.feedbackTag, styles.dislikedTag]}>
        <Text style={styles.feedbackTagText}>{feedbackReason}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  feedbackTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  likedTag: {
    backgroundColor: '#d4edda',
  },
  dislikedTag: {
    backgroundColor: '#f8d7da',
  },
  feedbackTagText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#333',
  },
});

export default FeedbackTag;

