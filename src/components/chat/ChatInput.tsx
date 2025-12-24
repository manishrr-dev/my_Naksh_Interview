import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { useChatStore } from '../../store/chatStore';
import { Sender } from '../../types/common';
import { getSenderName } from '../../utils/commonUtlis';
const ChatInput = () => {
  const { replyText, setReplyText } = useChatStore();
  const sendMessage = () => {
    console.log('sendMessage');
  };

  const ReplyContainer = () => {
    return (
      <View style={styles.replyContainer}>
        {/* header of the reply text */}
        <View>
          <Text style={styles.replyTextHeader}>
            {getSenderName(replyText?.sender as Sender)}
          </Text>
          <Text style={styles.replyTextContent}>{replyText?.text}</Text>
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => setReplyText(null)}
        >
          <Text style={styles.buttonText}>X</Text>
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
          <TextInput style={styles.input} placeholder="Type your message" />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    width: '100%',
    padding: 5,
  },
  replyTextHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    maxWidth: '90%',
  },
  replyTextContent: {
    fontSize: 14,
    color: 'white',
    maxWidth: '90%',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
  },

  sendButton: {
    padding: 10,
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
});

export default ChatInput;
