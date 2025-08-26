import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste", paste);

  return (
    <div className="h-screen w-full">
      <div className="w-[70%] sm:w-[50%] m-auto mt-6">
        <input
          className="w-full p-2 rounded-2xl mt-2 bg-gray-300 dark:bg-[#1a1a1a]"
          type="text"
          placeholder="Enter Title Here"
          disabled
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-[70%] sm:w-[50%] m-auto">
        <textarea
          className="w-[100%] rounded-2xl mt-4 p-4 bg-gray-300 dark:bg-[#1a1a1a]"
          value={paste.content}
          disabled
          placeholder="Enter Conent Here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
