import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : [],
  },
  reducers: {
    // Added the all the logics before pushing it to local storage
    //new paste add
    addToPaste: (state, action) => {
      const paste = action.payload;
      const existingPaste = state.pastes.find((p) => p.title === paste.title);
      if (existingPaste) {
        toast.error("Paste already exists");
      } else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully");
      }
    },
    // update paste
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      } else {
        toast.error("Paste not found");
      }
    },
    // delete all paste
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    // delete paste
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);

      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
