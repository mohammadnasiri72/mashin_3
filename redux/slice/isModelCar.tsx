import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveTabNewsState {
  isModelCar: boolean;
}

const initialState: ActiveTabNewsState = {
  isModelCar: false,
};

export const isModelCarSlice = createSlice({
  name: "activeTabNews",
  initialState,
  reducers: {
    setIsModelCar: (state, action: PayloadAction<boolean>) => {
      state.isModelCar = action.payload;
    },
  },
});

export const { setIsModelCar } = isModelCarSlice.actions;
export default isModelCarSlice.reducer;