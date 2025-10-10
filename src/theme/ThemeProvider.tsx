import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setUserSelectedTheme, updateSystemTheme } from '@redux/slices/themeSlice';
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
  const { userSelectedTheme, systemTheme } = useAppSelector(state => state.theme);

  // Determine the current theme based on user preference and system theme
  const currentTheme = userSelectedTheme === 'system' ? systemTheme : userSelectedTheme;
  const isDark = currentTheme === 'dark';

  // Toggle theme based on current state, but respect user preference for system mode
  const toggleTheme = () => {
    // If user is in system mode, switch to the opposite of the current system theme
    if (userSelectedTheme === 'system') {
      dispatch(setUserSelectedTheme(isDark ? 'light' : 'dark'));
    } else {
      // If user has a specific theme selected, toggle between light/dark
      dispatch(setUserSelectedTheme(isDark ? 'light' : 'dark'));
    }
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
