import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoApi from "../../../api/photoApi";

export const getPhoto = createAsyncThunk(
  "photo",
  async (page: { start: number; end: number }) => {
    const { data } = await photoApi.getPhoto(page.start, page.end);

    return data;
  }
);

const photoSlice = createSlice({
  name: "photo",

  initialState: {
    photoList: [],
    disableBtt: true,
    resetTitle: false,
  },

  reducers: {
    disableButton: (state, action) => {
      state.disableBtt = action.payload;
    },

    resetTitle: (state, action) => {
      state.resetTitle = action.payload;
    },

    setPhotoList: (state: any, action) => {
      state.photoList = [...action.payload];
    },
  },

  extraReducers: {
    [getPhoto.fulfilled.toString()]: (state: any, action: any) => {
      state.photoList = [...state.photoList, ...action.payload];
    },
  },
});

const { actions, reducer } = photoSlice;

export const { disableButton, resetTitle, setPhotoList } = actions;
export default reducer;
