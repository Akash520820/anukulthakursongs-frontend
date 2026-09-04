import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";
import { buttonBounce } from "../utils/motion.js";

const Account = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <section className="section container">লোড হচ্ছে...</section>;
  if (!user) { navigate("/login"); return null; }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <AnimatedSection className="section container" style={{ maxWidth: 480 }}>
      <h1 className="section-title">আমার অ্যাকাউন্ট</h1>

      <div className="card-devotional p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.fullName}
              style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <div className="fw-semibold fs-5" style={{ color: "var(--color-maroon-dark)" }}>{user.fullName}</div>
            <div className="text-secondary small">@{user.userName}</div>
          </div>
        </div>

        <div className="mb-2"><span className="text-secondary">ইমেইল: </span>{user.email}</div>
        <div className="mb-4"><span className="text-secondary">ভূমিকা: </span>{user.role === "admin" ? "অ্যাডমিন" : "ব্যবহারকারী"}</div>

        <motion.button className="btn btn-outline-maroon d-inline-flex align-items-center gap-2" onClick={handleLogout} {...buttonBounce}>
          <FaSignOutAlt /> লগ আউট
        </motion.button>
      </div>
    </AnimatedSection>
  );
};

export default Account;
