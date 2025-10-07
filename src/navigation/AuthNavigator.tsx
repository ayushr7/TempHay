import { ForgotPassword, Login, SignUp, Welcome } from '@pods/auth/index';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const isFirstLaunch = useSelector((state: any) => state.user.isFirstLaunch);
  console.log('isFirstLaunch', isFirstLaunch);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isFirstLaunch ? 'Welcome' : 'Login'}
    >
      {/* <Stack.Screen name="FirstPage" component={FirstPage} /> */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
