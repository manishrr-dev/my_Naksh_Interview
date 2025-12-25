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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerRight}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AA</Text>
            </View>
            <Text style={styles.userName}>Acharya Abhishek</Text>
          </View>
          <Pressable style={styles.endButton} onPress={handleEndSession}>
            <Text style={styles.endButtonText}>End</Text>
          </Pressable>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1c1c1e',
  },
  endButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
  },
  endButtonText: {
    color: '#ffffff',
    fontSize: 14,
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
