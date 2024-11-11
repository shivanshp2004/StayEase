import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { host } from "@/store/host";


const initialState = {
  isLoading: false,
  propertyList: [],
};

export const addNewProperty = createAsyncThunk(
  "property/addNewProperty",
  async (formData) => {
    const result = await axios.post(
      `${host}/api/admin/property/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const fetchAllProperties = createAsyncThunk(
  "property/fetchAllProperties",
  async (formData) => {
    const result = await axios.get(
      `${host}/api/admin/property/get`,
      formData
    );
    return result?.data;
  }
);
export const editProperty = createAsyncThunk(
  "property/editProperty",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${host}/api/admin/property/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async ( id) => {
    const result = await axios.delete(
      `${host}/api/admin/property/delete/${id}`
    );
    return result?.data;
  }
);

const AdminPropertySlice = createSlice({
  name: "adminProperty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProperties.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchAllProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.propertyList = action.payload.data;
    }).addCase(fetchAllProperties.rejected, (state) => {
      state.isLoading = false;
      state.propertyList = [];
    })
  },
});

export default AdminPropertySlice.reducer;
