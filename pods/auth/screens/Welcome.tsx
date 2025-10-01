import { Layout, Text } from '@shared/index';
import {
  colors,
  fonts,
  IMAGES,
  moderateScale,
  spacing,
  verticalScale,
} from '@shared/theme';
import React, { useRef } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AuthNavigationProp } from '../types';

interface WelcomeProps {
  navigation: AuthNavigationProp<'Welcome'>;
}

const data = [
  // {
  //   key: 1,
  //   title: 'Hayti News',
  //   text: 'Daily News From Over 100 Black Publishers!',
  //   image: IMAGES.auth.intro_image_1,
  //   showAuthButtons: false,
  // },
  {
    key: 1,
    title: 'Hayti Podcasts',
    text: 'Discover Over 3000 Black Podcasters!',
    image: IMAGES.auth.intro_image_2,
    showAuthButtons: true,
  },
  {
    key: 2,
    title: 'Hayti Marketplace',
    text: 'Purchase Products From Hundreds Of Black-Owned Brands',
    image: IMAGES.auth.intro_image_3,
    showAuthButtons: true,
  },
];

type Item = (typeof data)[0];

const Welcome = ({ navigation: _navigation }: WelcomeProps) => {
  const sliderRef = useRef<AppIntroSlider>(null);

  const handleEmailAuth = () => {
    _navigation.navigate('Login');
  };

  const handleGoogleAuth = () => {
    // Implement Google auth
    console.log('Google auth');
  };

  const handleAppleAuth = () => {
    // Implement Apple auth
    console.log('Apple auth');
  };

  const handleNext = () => {
    sliderRef.current?.goToSlide(1);
  };

  const _renderItem = ({ item }: { item: Item }) => {
    return (
      <ImageBackground
        source={item.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleView}>
            <Image
              source={IMAGES.auth.hayti_icon_white_bg_rounded}
              resizeMode="contain"
              style={styles.haytiIcon}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.text}>{item.text}</Text>

          {item.showAuthButtons ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.authButton}
                onPress={handleEmailAuth}
                activeOpacity={0.8}
              >
                <Image
                  source={IMAGES.auth.email_icon} // You'll need to add this icon
                  style={styles.buttonIcon}
                />
                <Text style={styles.authButtonText}>Continue With Email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.authButton}
                onPress={handleGoogleAuth}
                activeOpacity={0.8}
              >
                <Image
                  source={IMAGES.auth.google_icon} // You'll need to add this icon
                  style={styles.buttonIcon}
                />
                <Text style={styles.authButtonText}>Continue With Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.authButton}
                onPress={handleAppleAuth}
                activeOpacity={0.8}
              >
                <Image
                  source={IMAGES.auth.apple_icon} // You'll need to add this icon
                  style={styles.buttonIcon}
                />
                <Text style={styles.authButtonText}>Continue With Apple</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  };

  const _keyExtractor = (item: Item) => item.title;

  return (
    <Layout fullScreen={true}>
      <StatusBar barStyle="light-content" />
      <Layout.Body style={styles.noPadding}>
        <AppIntroSlider
          ref={sliderRef}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          data={data}
          renderNextButton={() => null}
          renderDoneButton={() => null}
          showDoneButton={false}
          showNextButton={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          bottomButton={true}
        />
      </Layout.Body>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(75),
  },
  haytiIcon: {
    marginRight: moderateScale(8),
    height: verticalScale(35),
    width: moderateScale(35),
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(spacing.m),
  },
  text: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: moderateScale(spacing.m),
    fontFamily: fonts.semiBold,
    marginHorizontal: moderateScale(spacing.xl),
    marginBottom: verticalScale(spacing.xl),
  },
  title: {
    fontSize: moderateScale(spacing.xl),
    fontFamily: fonts.black,
    color: colors.background,
    textAlign: 'center',
  },
  noPadding: {
    padding: 0,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(spacing.m),
    gap: moderateScale(12),
  },
  buttonIcon: {
    marginRight: moderateScale(10),
    resizeMode: 'contain',
  },
  authButton: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authButtonText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.semiBold,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#00C853',
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: colors.background,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
  },
  activeDot: {
    backgroundColor: '#00C853',
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
  },
});

export default Welcome;
