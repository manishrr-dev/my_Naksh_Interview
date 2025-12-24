import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  const onNav = useCallback(() => {
    navigation.navigate('ChatScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={onNav}>
        <Text style={styles.buttonText}>Go to Chat</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  navButton: {
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    backgroundColor: '#34C759',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
