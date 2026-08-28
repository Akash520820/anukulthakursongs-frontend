import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaGlobe } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Navbar.css";
import logo from "../../assets/videosAndPhotos/logo-login.svg";

const LANGUAGE_OPTIONS = [
  { code: "bn", label: "বাংলা" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" }
];

const links = [
  { to: "/", key: "nav.home" },
  { to: "/songs", key: "nav.songs" },
  { to: "/prayer-times", key: "nav.prayerTimes" },
  { to: "/prayers", key: "nav.prayers" },
  { to: "/scriptures", key: "nav.scriptures" },
  { to: "/stories", key: "nav.stories" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="site-navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <span className="brand-text">{t("nav.brand")}</span>
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
              {t(link.key)}
            </NavLink>
          ))}

          <div className="nav-lang-switcher">
            <FaGlobe className="nav-lang-icon" aria-hidden="true" />
            <select
              className="nav-lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Choose site language"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
            </select>
          </div>

          {isAdmin ? (
            <Link to="/admin" className="nav-admin-btn" onClick={() => setOpen(false)}>
              <FaUserShield /> {t("nav.admin")}
            </Link>
          ) : (
            <Link to={user ? "/account" : "/login"} className="nav-admin-btn" onClick={() => setOpen(false)}>
              {user ? t("nav.myAccount") : t("nav.login")}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
