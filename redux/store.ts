// import { configureStore } from '@reduxjs/toolkit'
// import settingReducer from './slice/setting'
// import activeTabNewsReducer from './slice/activeTabNews'

// export const store = configureStore({
//   reducer: {
//     setting : settingReducer,
//     activeTabNews : activeTabNewsReducer,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// })

// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './slice/setting'
import activeTabNewsReducer from './slice/activeTabNews'

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    activeTabNews: activeTabNewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// تعریف تایپ‌ها
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch