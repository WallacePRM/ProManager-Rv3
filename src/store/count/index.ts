import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      count: 0
    },
    reducers: {
      increment: (state) => {
        state.count++
      },
      decrement: (state) => {
        state.count--
      }
    }
});

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.count;

export default counterSlice.reducer;