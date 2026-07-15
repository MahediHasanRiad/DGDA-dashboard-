import { createSlice } from '@reduxjs/toolkit'
import type { userRoleType } from './auth.redux';

interface userType {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
    role: userRoleType,
    phone: number,
    isActive: true,
  } | null,
  token: string | null,
  isLoading: false,
  isError: any
}

const initialState: userType = {
  user: null,
  token: null,
  isLoading: false,
  isError: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logedInUser: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.user.accessToken;
    },

    // get user 
    getUser: (state, action) => {
      state.user = action.payload
    }
  }
})


export const { logedInUser, getUser } = authSlice.actions

export default authSlice.reducer