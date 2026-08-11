import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "লগইন ব্যর্থ হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section container" style={{ maxWidth: 420 }}>
      <h1 className="section-title">লগইন</h1>
      <form onSubmit={handleSubmit} className="card-devotional p-4">
        <div className="mb-3">
          <label className="form-label">ইমেইল</label>
          <input type="email" className="form-control" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">পাসওয়ার্ড</label>
          <input type="password" className="form-control" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-danger small">{error}</p>}
        <button type="submit" className="btn btn-marigold w-100 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
          {submitting ? (<><FaSpinner className="spin-icon" /> লগইন হচ্ছে...</>) : "লগইন করুন"}
        </button>

        <p className="text-center mt-3 mb-0 small">
          অ্যাকাউন্ট নেই? <Link to="/register">রেজিস্ট্রেশন করুন</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
