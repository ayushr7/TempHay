import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGES, useTheme } from '@shared/theme';
import { CustomTabBar } from '@src/components';
import { HomeScreen, Podcasts, ProfileScreen } from '@src/screens';
import React from 'react';
import { Image } from 'react-native';
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
  Calendar: undefined;
  // News: undefined;
  Podcasts: undefined;
};

export type TabImages = {
  Home: any;
  Profile: any;
  Calendar: any;
  Chat: any;
  // News: any;
  Podcasts: any;
};

const Tab = createBottomTabNavigator<TabParamList>();

function renderTabIcon(
  routeName: string,
  color: string,
  size: number,
  tabImages: TabImages,
) {
  const Icon = tabImages[routeName as keyof TabImages];
  // Treat as image source (since we're now using static images from IMAGES)
  return (
    <Image
      source={Icon}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}
//add custom images here
function getTabImages() {
  return {
    Home: IMAGES.dash.home_icon,
    Profile: IMAGES.dash.profile_icon,
    News: IMAGES.dash.news_icon,
    Chat: IMAGES.dash.profile_icon,
    Calendar: IMAGES.dash.podcasts_icon,
    Podcasts: IMAGES.dash.podcasts_icon,
  };
}

interface TabNavigatorProps {
  tabImages?: TabImages;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({
  tabImages = getTabImages(),
}) => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarIcon: ({ color, size }) =>
          renderTabIcon(route.name, color, size, tabImages),
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      {/* <Tab.Screen
        name="News"
        component={News}
        options={{ tabBarLabel: 'News' }}
      /> */}
      <Tab.Screen
        name="Podcasts"
        component={Podcasts}
        options={{ tabBarLabel: 'Podcasts' }}
      />
      {/* <Tab.Screen name="Chat" component={ChatList} /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
