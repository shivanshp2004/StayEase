import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  propertyList: [],
};

export const addNewProperty = createAsyncThunk(
  "property/addNewProperty",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/property/add",
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
      "http://localhost:5000/api/admin/property/get",
      formData
    );
    return result?.data;
  }
);
export const editProperty = createAsyncThunk(
  "property/editProperty",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/property/edit/${id}`,
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
      `http://localhost:5000/api/admin/property/delete/${id}`
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
