import { fonts, moderateScale, useTheme } from '@shared/theme';
import React from 'react';
import {
  Image,
  Text as RNText,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Option {
  label: string;
  value: string;
  icon: any;
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
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: theme.colors.tabBackground },
      ]}
    >
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
              isActive && [
                styles.activeOption,
                activeOptionStyle,
                { backgroundColor: theme.colors.activeTabBackground },
              ],
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.8}
          >
            <Image
              source={option.icon}
              style={[
                styles.icon,
                {
                  tintColor: isActive
                    ? theme.colors.white
                    : theme.colors.tabInactive,
                },
              ]}
            />
            <RNText
              style={[
                styles.text,
                textStyle,
                isActive && [
                  styles.activeText,
                  activeTextStyle,
                  {
                    color: isActive
                      ? theme.colors.white
                      : theme.colors.tabInactive,
                  },
                ],
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
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(6),
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
