import type { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  FirstPage: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
};

export type AuthNavigationProp<T extends keyof AuthStackParamList> =
  StackNavigationProp<AuthStackParamList, T>;
