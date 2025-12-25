import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const onNav = useCallback(() => {
    navigation.navigate('ChatScreen');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          {imageLoading && !imageError && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#34C759" />
            </View>
          )}
          {!imageError ? (
            <Image
              source={{
                uri: 'https://www.mynaksh.com/static/media/logo-nav.3b85adb47713ebd0fba6.webp',
              }}
              style={[styles.logo, imageLoading && styles.hidden]}
              resizeMode="contain"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>MN</Text>
            </View>
          )}
        </View>
        <Text style={styles.brandName}>myNaksh</Text>
      </View>
      <Pressable style={styles.navButton} onPress={onNav}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ede6da',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  hidden: {
    opacity: 0,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1c1c1e',
    letterSpacing: 0.5,
  },
  navButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 20,
    minWidth: 160,
    alignItems: 'center',
    backgroundColor: '#34C759',
    shadowColor: '#34C759',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Home;
