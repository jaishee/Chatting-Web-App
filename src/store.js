<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './slices/userInfoSlice'

export default configureStore({
  reducer: {
    activeUser: userInfoSlice
  },
  
=======
import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './slices/userInfoSlice'

export default configureStore({
  reducer: {
    activeUser: userInfoSlice
  },
  
>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
})