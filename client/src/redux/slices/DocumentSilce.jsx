import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    currentDocument: null,
  },
  reducers: {
    setDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
    clearDocument: (state) => {
      state.currentDocument = null;
    },
  },
});

export const { setDocument, clearDocument } = documentSlice.actions;
export default documentSlice.reducer;
