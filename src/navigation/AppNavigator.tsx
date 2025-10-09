import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { VideoSplashScreen } from '@src/screens/auth';
import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const email = useAppSelector(state => state.user.email);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenSplash ? (
          // Show splash screen first
          <RootStack.Screen name="VideoSplash">
            {props => (
              <VideoSplashScreen
                {...props}
                onVideoEnd={() => setHasSeenSplash(true)}
              />
            )}
          </RootStack.Screen>
        ) : email ? (
          // User is logged in
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
        ) : (
          // User is not logged in
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
        {/* Add modal screens that can be shown on top of any stack */}
        {/* {hasSeenSplash && (
          <RootStack.Screen 
            name="ChatDetail" 
            component={ChatDetail}
            options={{ presentation: 'modal' }}
          />
        )} */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
