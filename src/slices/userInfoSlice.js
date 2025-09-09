import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'info',
  initialState: {
    value: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null,
  },
  reducers: {
    userDetails: (state,action) => {
        state.value = action.payload
    },
    removeUserDetails: (state,action) => {
        state.value = null
    },
    
  },
})

export const { userDetails, removeUserDetails } = userInfoSlice.actions

export default userInfoSlice.reducer