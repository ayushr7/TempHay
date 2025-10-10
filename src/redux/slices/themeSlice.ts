import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

type ThemeState = {
  userSelectedTheme: 'light' | 'dark' | 'system'; // User's preference
  systemTheme: 'light' | 'dark'; // Current system theme
};

// Use the device's color scheme as the initial state, defaulting to 'light'
const systemTheme = Appearance.getColorScheme() ?? 'light';

const initialState: ThemeState = {
  userSelectedTheme: 'system', // Default to system as user preference
  systemTheme: systemTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setUserSelectedTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.userSelectedTheme = action.payload;
    },
    updateSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.systemTheme = action.payload;
    },
  },
});

export const { setUserSelectedTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
