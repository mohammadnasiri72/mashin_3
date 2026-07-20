import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './slice/setting'
import userReducer from './slice/user'
import activeTabNewsReducer from './slice/activeTabNews'
import redirectRegisterReducer from './slice/redirectRegister'

export const store = configureStore({
  reducer: {
    user : userReducer,
    setting: settingReducer,
    activeTabNews: activeTabNewsReducer,
    redirectRegister: redirectRegisterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})


// این دو خط مهم هستند:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

