// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import DocumentSlice from "./slices/DocumentSilce.jsx";
import documentReducer from "./slices/DocumentSilce.jsx";
export const store = configureStore({
  reducer: {
    document: documentReducer,
  },
});
