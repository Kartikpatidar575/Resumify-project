import React, { useEffect, useState, useContext } from "react";
import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import Container from "./Container";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = isMenuOpen ? "hidden" : "";
    };
  }, [isMenuOpen]);

  const handleClickMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="navbar-wrapper">
      <Container>
        <header className="d-flex flex-wrap align-items-center justify-content-md-between header-container">
          {" "}
          <div className="mb-md-0 logo-container">
            {" "}
            <Logo />
          </div>{" "}
          <div className={isMenuOpen ? "ul-list-div-active" : "ul-list-div"}>
            <ul className={`nav ${isMenuOpen ? " ul-list-active" : "ul-list"}`}>
              {isMenuOpen && (
                <>
                  <div className="btn-container">
                    {" "}
                    <button
                      type="button"
                      className="close-menu-btn"
                      onClick={handleClickMenu}
                      aria-label="Close menu"
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                  <h1 className="menu-title">Menu</h1>{" "}
                </>
              )}
              <li className="nav-link-contains">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>{" "}
              <li
                className="nav-link-contains"
                onClick={() => setIsMenuOpen(false)}
              >
                <NavLink to="/templates" className="nav-link">
                  Templates
                </NavLink>
              </li>{" "}
              <li
                className="nav-link-contains"
                onClick={() => setIsMenuOpen(false)}
              >
                <NavLink to="/#pricing" className="nav-link">
                  Pricing
                </NavLink>
              </li>{" "}
              <li
                className="nav-link-contains"
                onClick={() => setIsMenuOpen(false)}
              >
                <NavLink to="/#features" className="nav-link">
                  Features
                </NavLink>
              </li>{" "}
              {/* <li
              className="nav-link-contains"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavLink to="/" className="nav-link">
                About
              </NavLink>
            </li>{" "} */}
              {isAuthenticated ? (
                <li
                  className={
                    isMenuOpen ? "mobile-logout-btn" : "mobile-auth-btn-hide"
                  }
                >
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li
                  className={
                    isMenuOpen ? "mobile-auth-btn" : "mobile-auth-btn-hide"
                  }
                >
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    Get Started Free
                  </NavLink>
                </li>
              )}
            </ul>{" "}
          </div>
          <div className="hamburger-menu" onClick={() => setIsMenuOpen(true)}>
            <IoMenuOutline size={20} />
          </div>
          {isAuthenticated ? (
            <div className="header-logout-div">
              <button
                type="button"
                className="btn px-4 py-2 text-font header-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-button">
              {" "}
              <NavLink to="/register">
                <button
                  type="button"
                  className="btn px-4 py-2 text-font login-btn"
                >
                  Register
                </button>
              </NavLink>{" "}
              <NavLink to="/login">
                <button
                  type="button"
                  className="btn btn-primary px-3 py-2 text-font"
                >
                  Get Started Free
                </button>{" "}
              </NavLink>
            </div>
          )}
        </header>
      </Container>
    </div>
  );
};

export default Header;
