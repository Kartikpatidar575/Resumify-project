import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <NavLink
      to="/"
      className="d-inline-flex link-body-emphasis text-decoration-none"
    >
      {" "}
      <img
        className="logo"
        style={{ width: "120px" }}
        src={logo}
        alt="Resumify Logo"
      />
    </NavLink>
  );
};

export default Logo;
