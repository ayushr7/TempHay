import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setTheme, updateSystemTheme } from '@redux/slices/themeSlice';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from './index';

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component that provides the theme and toggle function
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mode, systemTheme } = useAppSelector(state => state.theme);

  // Determine the current theme based on mode and system theme
  const currentTheme = mode === 'system' ? systemTheme : mode;
  const isDark = currentTheme === 'dark';

  // Determine the current theme based on isDark state
  const toggleTheme = () => {
    dispatch(setTheme(isDark ? 'light' : 'dark'));
  };

  // Determine the current theme based on the Redux state
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Update the system theme in Redux
      dispatch(updateSystemTheme(colorScheme ?? 'light'));
    });
    
    return () => subscription.remove();
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
