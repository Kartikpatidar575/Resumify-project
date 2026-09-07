import Logo from "./Logo";
import { TbLogout2 } from "react-icons/tb";
import "../styles/DashboardNavbar.css";
import { IoMenuSharp } from "react-icons/io5";

function DashboardNavbar() {
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-logo">
        <IoMenuSharp />
        <Logo />
      </div>

      <div className="dashboard-actions">
        <button className="upgrade-btn">Upgrade Subscription</button>

        <button className="logout-btn">
          <TbLogout2 />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
