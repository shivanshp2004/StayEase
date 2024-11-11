import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { host } from "@/store/host";
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
    isLoading: true,
}

export const registerUser = createAsyncThunk(
    "/auth/register",
  
    async (formData) => {
      const response = await axios.post(
        `${host}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );
export const loginUser = createAsyncThunk(
    "/auth/login",
  
    async (formData) => {
      const response = await axios.post(
        `${host}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );

  export const logoutUser=createAsyncThunk(
    "/auth/logout",
    async () => {
      const response = await axios.post(
        `${host}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  )

  export const checkAuth = createAsyncThunk(
    "/auth/check-auth",
  
    async () => {
      const response = await axios.get(
        `${host}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
  
      return response.data;
    }
  );

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setUser: (state,action)=> {

        }
    },
    extraReducers : (builder)=> {
        builder
        .addCase(registerUser.pending, (state,action)=> {
            state.isLoading=true;
        }).addCase(registerUser.fulfilled, (state,action)=> {
            state.isLoading=false;
            state.isAuthenticated=false;
            state.user=null;
        }).addCase(registerUser.rejected, (state,action)=> {
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(loginUser.pending, (state,action)=> {
            state.isLoading=true;
        }).addCase(loginUser.fulfilled, (state,action)=> {
            state.isLoading=false;
            state.isAuthenticated=!action.payload.success ? false :true;
            state.user=action?.payload?.success ? action.payload.user : null;
        }).addCase(loginUser.rejected, (state,action)=> {
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(checkAuth.pending, (state,action)=> {
            state.isLoading=true;
        }).addCase(checkAuth.fulfilled, (state,action)=> {
            state.isLoading=false;
            state.isAuthenticated=action.payload.success
            state.user=action?.payload?.success ? action.payload.user : null;
        }).addCase(checkAuth.rejected, (state,action)=> {
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(logoutUser.pending, (state,action)=> {
            state.isLoading=true;
        }).addCase(logoutUser.fulfilled, (state,action)=> {
            state.isLoading=false;
            state.isAuthenticated=false
            state.user= null;
        }).addCase(logoutUser.rejected, (state,action)=> {
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;