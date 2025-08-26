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
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[500px] pl-4 bg-gray-300 dark:bg-[#1a1a1a]"
          type="text"
          placeholder="Enter Title Here"
          disabled
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button className="p-2 rounded-2xl mt-2" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button> */}
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-300 dark:bg-[#1a1a1a]"
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
