import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import fonts from '../theme/fonts';

const FontTestComponent = () => {
  const [platform] = useState(Platform.OS);

  // Platform-specific font handling
  const getPlatformFont = (baseFontName: string) => {
    if (Platform.OS === 'android') {
      // On Android, sometimes you need to use a simplified font name
      // Let's try to extract just the family name part
      return baseFontName.includes('-') ? baseFontName.split('-').slice(0, -1).join('') : baseFontName;
    }
    return baseFontName; // Use the name as-is for iOS
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Testing SF Pro Text Fonts</Text>
      <Text style={styles.platformInfo}>Platform: {platform}</Text>
      
      {/* Test with current fonts.ts config */}
      <Text style={styles.sectionHeader}>Using fonts.ts config ({platform}):</Text>
      <Text style={[styles.text, { fontFamily: fonts.thin }]}>
        Thin: {fonts.thin} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.extraLight }]}>
        Extra Light: {fonts.extraLight} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.light }]}>
        Light: {fonts.light} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.regular }]}>
        Regular: {fonts.regular} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.medium }]}>
        Medium: {fonts.medium} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.semiBold }]}>
        Semibold: {fonts.semiBold} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.bold }]}>
        Bold: {fonts.bold} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.extraBold }]}>
        Extra Bold: {fonts.extraBold} (Current)
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.black }]}>
        Black: {fonts.black} (Current)
      </Text>

      {/* Try platform-specific handling */}
      <Text style={styles.sectionHeader}>Platform-specific approach:</Text>
      <Text style={[styles.text, { fontFamily: getPlatformFont(fonts.thin || 'System') }]}>
        Thin: {getPlatformFont(fonts.thin || 'System')} (Platform-specific)
      </Text>
      <Text style={[styles.text, { fontFamily: getPlatformFont(fonts.light || 'System') }]}>
        Light: {getPlatformFont(fonts.light || 'System')} (Platform-specific)
      </Text>
      <Text style={[styles.text, { fontFamily: getPlatformFont(fonts.regular || 'System') }]}>
        Regular: {getPlatformFont(fonts.regular || 'System')} (Platform-specific)
      </Text>
      <Text style={[styles.text, { fontFamily: getPlatformFont(fonts.bold || 'System') }]}>
        Bold: {getPlatformFont(fonts.bold || 'System')} (Platform-specific)
      </Text>
      <Text style={[styles.text, { fontFamily: getPlatformFont(fonts.black || 'System') }]}>
        Black: {getPlatformFont(fonts.black || 'System')} (Platform-specific)
      </Text>

      {/* Alternative approach: Try different font naming patterns */}
      <Text style={styles.sectionHeader}>Alternative names:</Text>
      <Text style={[styles.text, { fontFamily: 'SFProText' }]}>SFProText (base)</Text>
      <Text style={[styles.text, { fontFamily: 'SF Pro Text' }]}>SF Pro Text (with space)</Text>

      {/* System font for comparison */}
      <Text style={styles.sectionHeader}>System font for comparison:</Text>
      <Text style={styles.text}>System Regular (Default)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  platformInfo: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
    paddingVertical: 2,
  },
});

export default FontTestComponent;