import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";
import logo from "../../assets/videosAndPhotos/logo-login.svg";

const links = [
  { to: "/", label: "হোম" },
  { to: "/songs", label: "গান" },
  { to: "/prayer-times", label: "প্রার্থনার সময়" },
  { to: "/prayers", label: "প্রার্থনা" },
  { to: "/scriptures", label: "গ্রন্থ" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  return (
    <header className="site-navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <span className="brand-text">অনুকূল ঠাকুর</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {isAdmin ? (
            <Link to="/admin" className="nav-admin-btn" onClick={() => setOpen(false)}>
              <FaUserShield /> অ্যাডমিন
            </Link>
          ) : (
            <Link to={user ? "/account" : "/login"} className="nav-admin-btn" onClick={() => setOpen(false)}>
              {user ? "আমার অ্যাকাউন্ট" : "লগইন"}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
