import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    role: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    password: '',
    createdAt: '',
    updatedAt: '',
    hospitalName: '',
    organisationName: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
