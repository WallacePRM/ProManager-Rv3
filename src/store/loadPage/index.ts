import { createSlice } from "@reduxjs/toolkit";

const loadPageSlice = createSlice({
    name: 'loadPage',
    initialState: {
        visible: false
    },
    reducers: {
      showLoadPage: (state) => {
        state.visible = true;
      },
      removeLoadPage: (state) => {
        state.visible = false;
      }
    }
});

export const { showLoadPage, removeLoadPage } = loadPageSlice.actions;
export const selectLoadPage = (state: any) => state.loadPage.visible;

export default loadPageSlice.reducer;