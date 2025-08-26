import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="max-w-[500px] m-auto">
      <input
        className="p-2 rounded-2xl w-[300px] sm:w-[500px] mt-5 dark:bg-[#1a1a1a] bg-gray-300"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="w-[300px] sm:w-[500px] flex flex-col gap-5 m-auto">
        {filteredData.length > 0 ? (
          filteredData.map((Paste) => {
            return (
              <div
                className="w-[300px] sm:w-[500px] rounded-xl mt-5 h-auto dark:bg-[#1a1a1a] bg-gray-300"
                key={Paste?._id}
              >
                <div className="pt-3 px-5 text-left">
                  <div className="text-3xl py-2">{Paste.title}</div>
                  <div>
                    {Paste.content.length > 30
                      ? Paste.content.slice(0, 150) + "..."
                      : Paste.content}
                  </div>
                </div>
                <div className="py-4 flex flex-row gap-4 place-content-evenly">
                  <button>
                    <NavLink
                      className="text-white"
                      to={`/?pasteId=${Paste?._id}`}
                    >
                      Edit
                    </NavLink>
                  </button>
                  <button>
                    <NavLink
                      className="text-white"
                      to={`/pastes/${Paste?._id}`}
                    >
                      View
                    </NavLink>
                  </button>
                  <button onClick={() => handleDelete(Paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(Paste.content);
                      toast.success("Copied To Clipboard");
                    }}
                  >
                    Copy
                  </button>
                </div>
                {/* <div className="py-3 text-white">{Paste.createdAt}</div> */}
              </div>
            );
          })
        ) : (
          <div className="mt-5 flex">
            <h1>Click To Add Some Data</h1>
            <button className="text-2xl">
              <NavLink to="/">Create a Paste</NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
