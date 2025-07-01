import { colors, moderateScale, spacing } from '@src/theme';
import React, { ReactNode } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewProps,
  ScrollViewProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from './Header';

interface LayoutProps extends ViewProps {
  children: ReactNode;
}

interface LayoutBodyProps extends ViewProps, ScrollViewProps {
  scrollable?: boolean;
  children: ReactNode;
}

const Body: React.FC<LayoutBodyProps> = ({
  children,
  style,
  scrollable = false,
  ...props
}) =>
  scrollable ? (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.body, style]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );

// Compound component pattern
const Layout: React.FC<LayoutProps> & {
  Header: typeof Header;
  Body: typeof Body;
} = ({ children, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

Layout.Header = Header;
Layout.Body = Body;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: moderateScale(spacing.s),
    backgroundColor: colors.background,
  },
  flex1: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Layout;
