<<<<<<< HEAD
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

=======
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

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default userInfoSlice.reducer