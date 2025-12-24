import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';
import { IMessageData } from '../../types/common';
import ChatInput from './ChatInput';
import SwipeableChatBox from './SwipeableChatBox';
import { useChatStore } from '../../store/chatStore';
import StarRating from './starrating/StarRating';

const ChatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { messageData } = useChatStore();
  const [showRatingOverlay, setShowRatingOverlay] = useState(false);

  const handleEndSession = () => {
    setShowRatingOverlay(true);
  };

  const handleRatingClose = () => {
    setShowRatingOverlay(false);
    navigation.navigate('Home');
  };

  const renderItem = useCallback(({ item }: { item: IMessageData }) => {
    return <SwipeableChatBox message={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={handleEndSession}>
        <Text style={styles.buttonText}>End Your Session</Text>
      </Pressable>
      <View style={styles.chatContainer}>
        <FlatList<IMessageData>
          data={messageData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
      <ChatInput />
      <StarRating visible={showRatingOverlay} onClose={handleRatingClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navButton: {
    padding: 15,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: '#12ba00',
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#ede6da',
    paddingHorizontal: 10,
  },
  flatListContentContainer: {
    paddingBottom: 100,
  },
});

export default ChatScreen;
