import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// ✅ FIXED: async function goes inside createAsyncThunk
export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Return a rejected value with error message
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const CheckAuth = createAsyncThunk(
  '/auth/checkauth',
  async ( ) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/check-auth',
        {
          withCredentials : true,
          headers:{
            'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Expires :'0'
          }
        }        
      );
      return response.data;
    } catch (error) {
      // Return a rejected value with error message
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  '/auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Return a rejected value with error message
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null; // backend response shape
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error('Registration failed:', action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null; // backend response shape
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        // console.error('Registration failed:', action.payload);
      })
      .addCase(CheckAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CheckAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null; // backend response shape
        state.isAuthenticated = true;
      })
      .addCase(CheckAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        // console.error('Registration failed:', action.payload);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
