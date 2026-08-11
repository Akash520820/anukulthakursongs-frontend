import { NavLink, Outlet, Link } from "react-router-dom";
import { FaHome, FaMusic, FaListAlt, FaClock, FaPray, FaBookOpen, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import "./AdminLayout.css";

const items = [
  { to: "/admin", label: "ড্যাশবোর্ড", icon: <FaHome />, end: true },
  { to: "/admin/categories", label: "ক্যাটাগরি", icon: <FaListAlt /> },
  { to: "/admin/songs", label: "গান", icon: <FaMusic /> },
  { to: "/admin/prayer-times", label: "প্রার্থনার সময়", icon: <FaClock /> },
  { to: "/admin/prayer-songs", label: "প্রার্থনার গান", icon: <FaPray /> },
  { to: "/admin/prayer-order", label: "প্রার্থনার ক্রম", icon: <FaPray /> },
  { to: "/admin/scriptures", label: "গ্রন্থ", icon: <FaBookOpen /> }
];

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">॥ আনুকূল ঠাকুর</Link>
        <nav className="admin-nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "admin-nav-link" + (isActive ? " active" : "")}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-user">
          <div className="admin-user-name">{user?.fullName}</div>
          <button className="admin-logout" onClick={logout}>
            <FaSignOutAlt /> লগ আউট
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
