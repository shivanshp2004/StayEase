import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  propertyList: [],
  propertyDetails: {},
};

export const fetchPropertyDetails = createAsyncThunk(
  "property/fetchPropertyDetails",
  async (id) => {


    const result = await axios.get(
      `http://localhost:5000/api/shop/property/get/${id}`
    );
    return result?.data;
  }
);
export const fetchAllFilteredProperties = createAsyncThunk(
  "property/fetchAllFilteredProperties",
  async ({filterParams,sortParams}) => {

    const query= new URLSearchParams({
      ...filterParams,
      sortBy:sortParams
    })
    
    const result = await axios.get(
      `http://localhost:5000/api/shop/property/get?${query}`
    );
    console.log(result);
    return result?.data;
  }
);

const shopPropertySlice = createSlice({
  name: "shopProperty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProperties.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertyList = action.payload.data;
      })
      .addCase(fetchAllFilteredProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.propertyList = [];
      })
      .addCase(fetchPropertyDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertyDetails = action.payload.data;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.propertyDetails = null;
      })
  },
});

export default shopPropertySlice.reducer;
