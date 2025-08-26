import { createSlice } from "@reduxjs/toolkit";
import { toast, Toaster } from "react-hot-toast";

// const initialState = {
//   pastes: localStorage.getItem("pastes")
//     ? JSON.parse(localStorage.getItem("pastes"))
//     : [],
// };

const initialState = {
  pastes: (() => {
    try {
      const data = localStorage.getItem("pastes");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing localStorage pastes:", error);
      localStorage.removeItem("pastes"); // Clean up invalid data
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully", { position: "bottom-center" });
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste Updated", { position: "bottom-center" });
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      // console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste Deleted", { position: "bottom-center" });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
