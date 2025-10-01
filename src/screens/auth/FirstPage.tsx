import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { IMAGES } from '@assets/images/index';
import {
  colors,
  fonts,
  moderateScale,
  spacing,
  verticalScale,
} from '@src/theme';
import { Text, Layout } from '@shared/index';
import { AuthNavigationProp } from '../../../pods/auth/types';

interface FirstPageProps {
  navigation: AuthNavigationProp<'FirstPage'>;
}

const FirstPage = ({ navigation: _navigation }: FirstPageProps) => {
  const { width } = Dimensions.get('window');

  return (
    <Layout fullScreen={true}>
      <StatusBar barStyle="light-content" />
      <Layout.Body style={styles.noPadding}>
        <ImageBackground
          source={IMAGES.auth.intro_image_1}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Image
                source={IMAGES.auth.hayti_icon_white_bg_rounded}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.title}>Hayti News</Text>
            </View>

            <Text style={styles.text}>
              Daily News from Over 100 Black Publishers!
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => _navigation.navigate('Welcome')}
              style={[
                styles.nextButton,
                {
                  width: width * 0.9,
                },
              ]}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  noPadding: {
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // paddingBottom: moderateScale(120),
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:
      Platform.OS === 'android'
        ? verticalScale(spacing.s)
        : verticalScale(spacing.m),
  },
  icon: {
    marginRight: moderateScale(8),
    height: verticalScale(35),
    width: moderateScale(35),
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: moderateScale(spacing.xl),
    fontFamily: fonts.black,
    textAlign: 'center',
    includeFontPadding: false, // Android-specific
  },
  text: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: moderateScale(spacing.m),
    fontFamily: fonts.medium,
    marginHorizontal: moderateScale(spacing.xl),
    marginBottom: verticalScale(spacing.xxl),
    includeFontPadding: false, // Android-specific
  },
  nextButton: {
    alignItems: 'center',
    padding:
      Platform.OS === 'ios'
        ? verticalScale(spacing.s)
        : verticalScale(spacing.xxs),
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginBottom: verticalScale(spacing.xxxl),
    width: '90%',
  },
  nextButtonText: {
    fontSize: moderateScale(spacing.s),
    fontFamily: fonts.extraBold,
    color: colors.background,
  },
});

export default FirstPage;
