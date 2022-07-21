import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: [
    { start: moment() },
    { end: moment() },
  ],
  reducers: {
    setStartDate: (state, action) => {
      const startDate = state.find((d) => Object.keys(d).includes('start'));
      startDate.start = action.payload;
      return state;
    },
    setEndDate: (state, action) => {
      const startDate = state.find((d) => Object.keys(d).includes('end'));
      startDate.end = action.payload;
      return state;
    },
  },
});

export const { setStartDate, setEndDate } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
