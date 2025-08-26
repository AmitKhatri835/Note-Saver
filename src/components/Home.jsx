import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { toast, Toaster } from "react-hot-toast";
// import "react-toastify/dist/React"

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      if (title === "" || value === "") {
        toast.error("Tilte Or Content is Missing!", {
          position: "bottom-center",
        });
      } else {
        dispatch(addToPastes(paste));
      }
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <div className="h-screen m-auto">
      <div className="w-[70%] sm:w-[50%] m-auto flex justify-between items-center mt-6">
        <input
          className="p-2 rounded-2xl mt-2 w-[70%] sm:w-[80%] bg-gray-300 dark:bg-[#1a1a1a]"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>
          {pasteId ? "Update" : "Create"}
          <Toaster />
        </button>
      </div>
      <div className="w-[70%] sm:w-[50%] m-auto mt-4">
        <textarea
          className="w-[100%] sm:w-[100%] rounded-2xl mt-4 p-4 bg-gray-300 dark:bg-[#1a1a1a]"
          value={value}
          placeholder="Enter Conent Here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;
