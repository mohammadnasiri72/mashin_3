// slice/activeTabNews.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RedirectRegister {
  redirectRegister: string;
}

const initialState: RedirectRegister = {
  redirectRegister: '/',
};

export const redirectRegisterSlice = createSlice({
  name: "redirectRegister",
  initialState,
  reducers: {
    setRedirectRegister: (state, action: PayloadAction<string>) => {
      state.redirectRegister = action.payload;
    },
  },
});

export const { setRedirectRegister } = redirectRegisterSlice.actions;
export default redirectRegisterSlice.reducer;