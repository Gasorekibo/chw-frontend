import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export const createReportAction = createAsyncThunk(
    "report/created",
    async (report, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.user;
  
      const { auth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      };
      try {
        //http call
        const formData = new FormData();
        formData.append("title", report?.title);
        formData.append("description", report?.description);
        formData.append("chw", report?.chw);
        formData.append("image", report?.image);
        const { data } = await axios.post(
          `${baseURL}/api/report/add`,
          formData,
          config
        );
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );


  //===========slice =================

const reportSlice = createSlice({
    name: "report",
    initialState: {},
    extraReducers: (builder) => {
      //create post
      builder.addCase(createReportAction.pending, (state, action) => {
        state.loading = true;
      });

      builder.addCase(createReportAction.fulfilled, (state, action) => {
        state.reportCreated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createReportAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      })
    }
})

export default reportSlice.reducer;