import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useChatStore } from '../../store/chatStore';
import { Sender } from '../../types/common';
import { getSenderName } from '../../utils/commonUtlis';
const ChatInput = () => {
  const { replyText, setReplyText, addMessage } = useChatStore();
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    console.log(message);
    addMessage({
      id: `user-${Date.now()}`,
      sender: Sender.USER,
      text: message,
      timestamp: Date.now(),
      type: 'text',
    });
    setMessage('');
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.nativeEvent.text);
  };

  const ReplyContainer = () => {
    return (
      <View style={styles.replyContainer}>
        <View style={styles.replyAccent} />
        <View style={styles.replyContent}>
          <Text style={styles.replyLabel}>Replying to</Text>
          <Text style={styles.replyTextHeader} numberOfLines={1}>
            {getSenderName(replyText?.sender as Sender)}
          </Text>
          <Text style={styles.replyTextContent} numberOfLines={2}>
            {replyText?.text}
          </Text>
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => setReplyText(null)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputContainer}>
        {/*  reply text container on top of the input */}
        {replyText && <ReplyContainer />}
        {/* input container */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
            value={message}
            onChange={handleMessageChange}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.sendButtonPressed,
            ]}
            onPress={sendMessage}
          >
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  replyAccent: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginRight: 12,
  },
  replyContent: {
    flex: 1,
    gap: 2,
  },
  replyLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#007AFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  replyTextHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  replyTextContent: {
    fontSize: 13,
    color: '#6c757d',
    lineHeight: 18,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  closeButtonText: {
    color: '#6c757d',
    fontSize: 18,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#34C759',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34C759',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonPressed: {
    backgroundColor: '#2da84a',
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ChatInput;
