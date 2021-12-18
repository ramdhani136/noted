import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice';
import CountReducer from './slices/CountSlice';
// import ApiReducer from './slices/ApiSlices';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    count: CountReducer,
  },
});
