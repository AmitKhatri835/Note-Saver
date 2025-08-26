import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { useState } from "react";
import { useEffect } from "react";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar />
          <Home />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <NavBar />
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <NavBar />
          <ViewPaste />
        </div>
      ),
    },
  ]);

  return (
    <>
      <div className="w-full m-auto dark:text-white pt-7 bg-white dark:bg-[#242424]">
        {/* <div className="w-full m-auto"> */}
        <div className="w-8 rounded-full bg-gray-300 dark:bg-zinc-600 p-2 absolute right-10">
          {theme === "dark" ? (
            <MdWbSunny onClick={toggleTheme} />
          ) : (
            <BsMoonStarsFill onClick={toggleTheme} />
          )}
        </div>
        <RouterProvider router={router} />
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
