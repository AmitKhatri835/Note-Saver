import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="max-w-[500px] m-auto flex flex-row justify-evenly">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pastes">Pastes</NavLink>
    </div>
  );
};

export default NavBar;
