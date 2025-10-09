import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearUser } from '../redux/slices/userSlice';
import { Layout, Text } from '@shared/index';
import SegmentedControl from '@shared/ui/SegmentedControl';
import { setTheme, updateSystemTheme } from '../redux/slices/themeSlice';
import { Appearance } from 'react-native';
import {
  fonts,
  IMAGES,
  moderateScale,
  useTheme,
  verticalScale,
} from '@shared/theme';

type MenuItemProps = {
  icon?: number | string; // Image source prop type
  text: string;
  onPress: () => void;
  iconColor?: string;
};

type SocialMenuItemProps = {
  icon: number | string; // Image source prop type
  text: string;
  onPress: () => void;
  iconColor?: string;
};

const MenuItem = React.memo(
  ({ icon, text, onPress, iconColor = '#374151' }: MenuItemProps) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        {icon && (
          <Image
            source={typeof icon === 'string' ? { uri: icon } : icon}
            tintColor={iconColor}
            style={styles.icon}
            resizeMode="contain"
            fadeDuration={0}
          />
        )}
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
      <Image
        source={IMAGES.dash.right_arrow}
        style={styles.icon}
        resizeMode="contain"
        fadeDuration={0}
      />
    </TouchableOpacity>
  ),
);

const SocialMenuItem = React.memo(
  ({ icon, text, iconColor, onPress }: SocialMenuItemProps) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <Image
          source={typeof icon === 'string' ? { uri: icon } : icon}
          tintColor={iconColor}
          style={[styles.socialIcon, { tintColor: iconColor }]}
          fadeDuration={0}
        />
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
    </TouchableOpacity>
  ),
);

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  console.log('notificationsEnabled', notificationsEnabled);
  const email = useAppSelector(state => state.user.email);
  const themeState = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();

  const { isDark } = useTheme();

  // Set the theme selection based on the current theme state
  const [themeSelection, setThemeSelection] = useState<string>(themeState);

  // Handle device theme changes when in 'system' mode
  useEffect(() => {
    // Set initial theme selection based on Redux state
    setThemeSelection(themeState);

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Update the system theme in Redux
      dispatch(updateSystemTheme(colorScheme ?? 'light'));
    });

    return () => subscription.remove();
  }, [dispatch, themeState]);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleThemeChange = (value: string) => {
    setThemeSelection(value);
    // Dispatch the theme change to Redux
    dispatch(setTheme(value as 'light' | 'dark' | 'system'));
  };

  // Extract first letter for avatar
  const getInitial = () => {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Extract display name from email
  const getDisplayName = () => {
    if (email) {
      return email.split('@')[0];
    }
    return 'User';
  };

  return (
    <Layout style={styles.container}>
      {/* Header - Fixed */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section - Fixed */}
      <View style={styles.profileSection}>
        <View style={styles.profileLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitial()}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{getDisplayName()}</Text>
            <TouchableOpacity onPress={() => console.log('Show profile')}>
              <Text style={styles.showProfile}>Show Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <Layout.Body scrollable style={styles.scrollableContent}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={[styles.menuItem, styles.appearanceContainer]}>
            <View style={styles.menuItemLeft}>
              <Image
                source={IMAGES.dash.info_icon}
                resizeMode="contain"
                style={styles.icon}
                fadeDuration={0}
              />
              <Text style={styles.menuItemText}>Theme</Text>
            </View>

            <SegmentedControl
              options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'System', value: 'system' },
              ]}
              value={themeSelection}
              onValueChange={handleThemeChange}
            />
          </View>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={IMAGES.dash.bell_icon}
                resizeMode="contain"
                style={styles.icon}
                fadeDuration={0}
              />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </View>

          <MenuItem
            icon={IMAGES.dash.location_icon}
            text="Location"
            onPress={() => console.log('Location clicked')}
          />
          <MenuItem
            icon={IMAGES.dash.info_icon}
            text="About"
            onPress={() => console.log('About clicked')}
          />
          <MenuItem
            icon={IMAGES.dash.star_outline}
            text="Rate the app"
            onPress={() => console.log('Rate clicked')}
          />
          <MenuItem
            text="Send Feedback"
            onPress={() => console.log('Feedback clicked')}
            showArrow={false}
          />
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <MenuItem
            text="Privacy Policy"
            onPress={() => console.log('Privacy clicked')}
          />
          <MenuItem
            text="Terms of Service"
            onPress={() => console.log('Terms clicked')}
          />
          <MenuItem
            text="Contact Us"
            onPress={() => console.log('Contact clicked')}
          />
          <MenuItem
            text="Delete Account"
            onPress={() => console.log('Delete clicked')}
          />
          <MenuItem
            text="Tell a Friend"
            onPress={() => console.log('Tell friend clicked')}
          />
        </View>

        {/* Stay in Touch Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleBold}>STAY IN TOUCH</Text>
          <SocialMenuItem
            icon={IMAGES.auth.twitter_x_icon}
            text="Follow on Twitter"
            iconColor={isDark ? '#fff' : undefined}
            onPress={() => console.log('Twitter clicked')}
          />
          <SocialMenuItem
            icon={IMAGES.dash.instagram_icon}
            text="Follow on Instagram"
            onPress={() => console.log('Instagram clicked')}
          />
          <SocialMenuItem
            icon={IMAGES.dash.facebook_icon}
            text="Like on Facebook"
            onPress={() => console.log('Facebook clicked')}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#E5E7EB',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: moderateScale(32),
    fontFamily: fonts.bold,
    color: '#fff',
  },
  userName: {
    fontSize: moderateScale(20),
    fontFamily: fonts.bold,
    marginBottom: verticalScale(4),
  },
  showProfile: {
    fontSize: moderateScale(14),
    fontFamily: fonts.bold,
    color: '#DC2626',
  },

  scrollableContent: {
    padding: 0,
  },
  icon: {
    width: moderateScale(20),
    height: verticalScale(20),
    tintColor: '#6B7280',
  },
  socialIcon: {
    width: moderateScale(27),
    height: verticalScale(25),
  },
  section: {
    marginTop: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: fonts.semiBold,
    paddingHorizontal: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  sectionTitleBold: {
    fontSize: moderateScale(18),
    fontFamily: fonts.extraBold,
    paddingHorizontal: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#E5E7EB',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  menuItemText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.regular,
  },
  appearanceContainer: {
    flexDirection: 'column',
    gap: verticalScale(8),
    paddingVertical: verticalScale(12),
  },
  signOutButton: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(24),
  },
  signOutText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.bold,
    color: '#DC2626',
  },
});

export default ProfileScreen;
