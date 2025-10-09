import React from 'react';
import {
  View,
  TouchableOpacity,
  Text as RNText,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@shared/theme';
import { moderateScale, fonts } from '@shared/theme';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  activeOptionStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onValueChange,
  style,
  optionStyle,
  activeOptionStyle,
  textStyle,
  activeTextStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style, { backgroundColor: theme.colors.tabBackground }]}>
      {options.map((option, index) => {
        const isActive = value === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              optionStyle,
              {
                borderLeftWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
                borderLeftColor: theme.colors.border,
              },
              isActive && [styles.activeOption, activeOptionStyle, { backgroundColor: theme.colors.primary }],
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.8}
          >
            <RNText
              style={[
                styles.text,
                textStyle,
                isActive && [styles.activeText, activeTextStyle, { color: theme.colors.background }],
              ]}
            >
              {option.label}
            </RNText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
  },
  option: {
    flex: 1,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeOption: {
    backgroundColor: '#3B82F6',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
  },
});

export default SegmentedControl;