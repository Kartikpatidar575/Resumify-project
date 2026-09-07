import React, { useEffect, useState, useContext } from "react";
import "../styles/DashboardLayout.css";
import { TbLayoutDashboardFilled, TbLogout2 } from "react-icons/tb";
import { IoIosCreate, IoIosArrowDown } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { FaFolder } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { IoMenuSharp, IoMenuOutline, IoClose } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className={isMenuOpen ? "overlayMenu" : "hidden"}>
        <div className="menuBox">
          <button
            type="button"
            className="close-btn-div"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <IoClose className="close-btn" size={20} />
          </button>

          <h2 className="menu-title">Menu</h2>
          <ul className="menu-list">
            <li>
              <NavLink
                to="/create-resume"
                className={({ isActive }) => (isActive ? "active" : "")}
                end
                onClick={closeMenu}
              >
                <IoIosCreate className="aside-icon" />
                <span>Create Resume</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/templates"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                <HiTemplate className="aside-icon" />
                <span>Templates</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-resume/my-resume"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                <FaFolder className="aside-icon" />
                <span>My Resume</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/#pricing"
                onClick={() => {
                  onClick = { closeMenu };
                  toast("Upgrade feature coming soon!", {
                    icon: "⚠️",
                  });
                }}
              >
                <FaCrown className="aside-icon" />
                <span>Upgrade</span>
              </NavLink>
            </li>

            <li>
              <button onClick={handleLogout} className="menu-logout-btn">
                <TbLogout2 className="aside-icon" style={{ color: "red" }} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        <div className="asideContainer">
          <div className="top-aside-container">
            <div className="dashboard-logo">
              <Logo />
            </div>
            <ul className="dashboard-ul-list">
              <li>
                <NavLink
                  to="/create-resume"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end
                >
                  <IoIosCreate className="aside-icon" />
                  <span>Create Resume</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/templates"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <HiTemplate className="aside-icon" />
                  <span>Templates</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-resume/my-resume"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FaFolder className="aside-icon" />
                  <span>My Resume</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom-aside-container">
            <button className="logout-btn" onClick={handleLogout}>
              <TbLogout2 style={{ fontSize: "22px" }} />
              Logout
            </button>

            <div className="premium-card">
              <div className="premium-icon">
                👑 <span>Go Premium</span>
              </div>
              <p>
                Unlock premium templates, unlimited downloads and advanced
                features.
              </p>

              <button
                className="premium-btn"
                onClick={() =>
                  toast("Upgrade feature coming soon!", {
                    icon: "⚠️",
                  })
                }
              >
                Upgrade Now
              </button>
            </div>

            <div className="upgrade-cta">
              <div className="upgrade-icon">👑</div>

              <button
                type="button"
                className="upgrade-button"
                onClick={() =>
                  toast("Upgrade feature coming soon!", {
                    icon: "⚠️",
                  })
                }
              >
                Upgrade Now
              </button>
            </div>

            <button
              className="menu-button"
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <IoMenuOutline size={22} />
            </button>
          </div>
        </div>

        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
