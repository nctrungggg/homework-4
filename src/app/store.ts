import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "../modules/photos/redux/PhotoSlice";

const rootReducer = {
  photo: photoSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
