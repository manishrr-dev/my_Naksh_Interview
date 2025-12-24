import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ChatScreen: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
