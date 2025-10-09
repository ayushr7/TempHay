import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { fonts, moderateScale, useTheme, verticalScale } from '@shared/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();

  // Calculate consistent width for each tab
  const tabWidth = (SCREEN_WIDTH - moderateScale(20)) / state.routes.length;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.tabBackground,
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get the icon for the route
        let icon = null;
        if (options.tabBarIcon) {
          icon = options.tabBarIcon({
            focused: isFocused,
            color: isFocused
              ? theme.colors.tabActive
              : theme.colors.tabInactive,
            size: 24,
          });
        }

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabItem,
              { width: tabWidth }, // Fixed width for all tabs
            ]}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.tabInner,
                isFocused && {
                  backgroundColor: theme.colors.activeTabBackground,
                  borderRadius: moderateScale(100),
                  marginBottom: verticalScale(5),
                },
              ]}
            >
              <View
                style={
                  isFocused ? styles.tabContent : styles.tabContentVertical
                }
              >
                {icon}
                <Text
                  style={[
                    isFocused ? styles.tabLabel : styles.tabLabelVertical,
                    {
                      color: isFocused
                        ? theme.colors.white
                        : theme.colors.tabInactive,
                    },
                  ]}
                >
                  {typeof label === 'string'
                    ? label
                    : (label as any)?.toString() || ''}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    borderTopWidth: moderateScale(1),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInner: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContentVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    marginLeft: moderateScale(5),
  },
  tabLabelVertical: {
    fontSize: moderateScale(12),
    fontFamily: fonts.medium,
    marginTop: moderateScale(4),
  },
});

export default CustomTabBar;
