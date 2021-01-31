import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    getUser: (state) => state,
    setUser: (state, { payload }) => {
      return {
        ...payload,
      };
    },
    removeUser: () => {
      return {};
    },
  },
});

export const { getUser, setUser, removeUser } = user.actions;

export default user.reducer;
