// slice/activeTabNews.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveTabNewsState {
  activeTabNews: string;
}

const initialState: ActiveTabNewsState = {
  activeTabNews: 'all',
};

export const activeTabNewsSlice = createSlice({
  name: "activeTabNews",
  initialState,
  reducers: {
    setActiveTabNews: (state, action: PayloadAction<string>) => {
      state.activeTabNews = action.payload;
    },
  },
});

export const { setActiveTabNews } = activeTabNewsSlice.actions;
export default activeTabNewsSlice.reducer;