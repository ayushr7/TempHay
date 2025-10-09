import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

type ThemeState = {
  mode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
};

// Use the device's color scheme as the initial state, defaulting to 'light'
const systemTheme = Appearance.getColorScheme() ?? 'light';

const initialState: ThemeState = {
  mode: 'system', // Default to system to follow device theme
  systemTheme: systemTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.mode = action.payload;
    },
    updateSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.systemTheme = action.payload;
      // If mode is system, update the current theme to match system
      if (state.mode === 'system') {
        state.mode = action.payload;
      }
    },
  },
});

export const { setTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
