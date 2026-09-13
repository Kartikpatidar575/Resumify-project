import React from "react";
import "../styles/component/Container.css";

const Container = ({ children, className = "" }) => {
  return <div className={`container-custom ${className}`}>{children}</div>;
};

export default Container;
