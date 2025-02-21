import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store'; // Replace with the actual path to your store
import axiosInstance from "../_helpers/axiosInstance";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  apple_id: string;
  country_id: number;
  country_name: string;
  email_verified_at: string;
  google_id: string;
  last_name: string;
  profile_image: string;
  profile_image_path: string;
  role_id: number;
  role_name: 'client' | 'freelancer';
  user_status: number;
  username: string;
}

// Define the initial state
interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching user data from an API
export const fetchUserFromAPI = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/fetchUserFromAPI',
  async (_, { rejectWithValue }) => {
    try {
     const response = await axiosInstance({
					url: 'get-loggedin-user-info',
					method: "GET"
				});
		//console.log('get-loggedin-user-info', response)
		return response.data.details;
    } catch (error: any) {
		return rejectWithValue(error.message);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRedux(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFromAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserFromAPI.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserFromAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user data';
      });
  },
});

export const { setUserRedux } = userSlice.actions;

// Selector to get user data from the store
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
