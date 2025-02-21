import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './commonSlice'; 
import userReducer from './userSlice'; 
import projectReducer from './projectSlice';

export const store = configureStore({
	reducer: {
		common: commonReducer,
		user: userReducer,
		project: projectReducer,
	},
});

// Types for Redux hooks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;