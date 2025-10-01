import { Platform } from 'react-native';

const fonts = {
  // SF Pro Text font family names - platform-specific
  thin: Platform.select({
    ios: 'SFProText-Thin',
    android: 'SF-Pro-Text-Thin',
  }),
  extraLight: Platform.select({
    ios: 'SFProText-Ultralight',
    android: 'SF-Pro-Text-Ultralight',
  }),
  light: Platform.select({
    ios: 'SFProText-Light',
    android: 'SF-Pro-Text-Light',
  }),
  regular: Platform.select({
    ios: 'SFProText-Regular',
    android: 'SF-Pro-Text-Regular',
  }),
  medium: Platform.select({
    ios: 'SFProText-Medium',
    android: 'SF-Pro-Text-Medium',
  }),
  semiBold: Platform.select({
    ios: 'SFProText-Semibold',
    android: 'SF-Pro-Text-Semibold',
  }),
  bold: Platform.select({
    ios: 'SFProText-Bold',
    android: 'SF-Pro-Text-Bold',
  }),
  extraBold: Platform.select({
    ios: 'SFProText-Heavy',
    android: 'SF-Pro-Text-Heavy',
  }),
  black: Platform.select({
    ios: 'SFProText-Black',
    android: 'SF-Pro-Text-Black',
  }),
};

export default fonts;
