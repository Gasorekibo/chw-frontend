import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import categoryReducer from "../slices/categorySlice";
import postReducer from "../slices/postSlices";
import reportReducer from "../slices/reportSlice"
import commentReducer from "../slices/commentSlices";
import enumerateReducer from "../slices/enumerateSlices"

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
    comment:commentReducer,
    report: reportReducer,
    enumerate:enumerateReducer
  },
});
