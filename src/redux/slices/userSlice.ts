import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  isFirstLaunch: boolean;
}

const initialState: UserState = {
  email: null,
  isFirstLaunch: true,
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
  },
});

export const { setUser, clearUser, setFirstLaunchComplete } = userSlice.actions;
export default userSlice.reducer;
