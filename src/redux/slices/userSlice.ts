import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  isFirstLaunch: boolean;
  hasSeenVideoSplash: boolean; // New state to track if video splash has been shown
}

const initialState: UserState = {
  email: null,
  isFirstLaunch: true,
  hasSeenVideoSplash: false, // New state to track if video splash has been shown
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUser: state => {
      state.email = null;
    },
    setFirstLaunchComplete: state => {
      state.isFirstLaunch = false;
    },
    setVideoSplashShown: state => {
      state.hasSeenVideoSplash = true;
    },
  },
});

export const {
  setUser,
  clearUser,
  setFirstLaunchComplete,
  setVideoSplashShown,
} = userSlice.actions;
export default userSlice.reducer;
