import React, { useEffect, useState, useContext } from "react";
import "../styles/DashboardLayout.css";
import { TbLogout2, TbChevronLeft } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { LuFiles } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SIDEBAR_COLLAPSE_KEY = "dashboard:sidebarCollapsed";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Manual collapse for laptop/desktop widths, independent of the mobile
  // hamburger menu below. Persisted so it survives a refresh.
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_COLLAPSE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close the mobile menu on Escape, like any dialog/overlay should.
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
      {isMenuOpen && (
        <div className="overlayMenu" onClick={closeMenu} role="presentation">
          <div
            className="menuBox"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={(e) => e.stopPropagation()}
          >
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
                  to="/dashboard/create-resume"
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
                  to="/dashboard/my-resume"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  <LuFiles className="aside-icon" />
                  <span>My Resume</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/#pricing"
                  onClick={() => {
                    closeMenu();
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
      )}

      <div
        className="dashboardShell"
        style={{
          display: "flex",
          width: "100%",
          "--dl-sidebar-w": isCollapsed ? "84px" : "250px",
        }}
      >
        <div className={`asideContainer${isCollapsed ? " collapsed" : ""}`}>
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <TbChevronLeft className="sidebar-toggle-icon" size={16} />
          </button>

          <div className="aside-container">
            <div className="dashboard-logo">
              <div className="sidebar-full-logo">
                <Logo />
              </div>

              <NavLink
                to="/"
                className="sidebar-small-logo"
                aria-label="Resumify Home"
              >
                <img src="/favicon.svg" alt="Resumify Logo" width="28px" />
              </NavLink>
            </div>
            <div className="items-container">
              <ul className="dashboard-ul-list">
                <li>
                  <NavLink
                    to="/dashboard/create-resume"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    title="Create Resume"
                  >
                    <IoIosCreate className="aside-icon" />
                    <span>Create Resume</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/templates"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    title="Templates"
                  >
                    <HiTemplate className="aside-icon" />
                    <span>Templates</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-resume"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    title="My Resume"
                  >
                    <LuFiles className="aside-icon" />
                    <span>My Resume</span>
                  </NavLink>
                </li>
              </ul>

              <div className="bottom-aside-container">
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <TbLogout2 style={{ fontSize: "22px" }} />
                  <span>Logout</span>
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
                  aria-label="Open navigation menu"
                >
                  <IoMenuOutline size={22} />
                </button>
              </div>
            </div>
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
