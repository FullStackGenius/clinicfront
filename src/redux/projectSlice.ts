import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store'; // Replace with the actual path to your store
import axiosInstance from "../_helpers/axiosInstance";

// Define the Project interface
interface Project {
  id: number;
  budget_type: number;
  completed_steps: number;
  description: string;
  fixed_rate: number;
  hourly_from: string;
  hourly_to: string;
  next_step: number;
  project_duration_id: number;
  project_experience_id: number;
  project_scope_id: number;
  project_type_id: number;
  project_status_label: string;
  title: number;
  user_id: number;
}

// Define the initial state
interface ProjectState {
  project: Project | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching project data from an API
export const fetchProjectFromAPI = createAsyncThunk<Project, void, { rejectValue: string }>(
  'project/fetchProjectFromAPI',
  async (_, { rejectWithValue }) => {
    try {
     const response = await axiosInstance({
					url: 'get-project-info',
					method: "GET"
				});
		//console.log('get-project-info', response)
		return response.data.details;
    } catch (error: any) {
		return rejectWithValue(error.message);
    }
  }
);

// Project slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project | null>) {
      state.project = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectFromAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectFromAPI.fulfilled, (state, action: PayloadAction<Project>) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(fetchProjectFromAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch project data';
      });
  },
});

export const { setProject } = projectSlice.actions;

// Selector to get project data from the store
export const selectProject = (state: RootState) => state.project.project;

export default projectSlice.reducer;
