import {createSlice} from '@reduxjs/toolkit';

export const CountSlice = createSlice({
  name: 'count',
  initialState: {count: {schedule: 0}},
  reducers: {
    getCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {getCount} = CountSlice.actions;

export const selectCount = state => state.count;

export default CountSlice.reducer;
