import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

// Two-stage flow matching the backend exactly:
// 1) POST /users/register (multipart — avatar is required) -> OTP emailed
// 2) POST /users/verify-otp -> account actually created, cookies set here
const Register = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [stage, setStage] = useState("form"); // "form" | "otp"
  const [form, setForm] = useState({ userName: "", email: "", fullName: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!avatar) {
      setError("প্রোফাইল ছবি আবশ্যক।");
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("userName", form.userName);
      data.append("email", form.email);
      data.append("fullName", form.fullName);
      data.append("password", form.password);
      data.append("avatar", avatar);

      await api.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setInfo("আপনার ইমেইলে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।");
      setStage("otp");
    } catch (err) {
      setError(err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/users/verify-otp", { email: form.email, otp });
      await refreshUser(); // cookies are set by verify-otp, pull the new user into context
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "ওটিপি যাচাই ব্যর্থ হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      await api.post("/users/resend-otp", { email: form.email });
      setInfo("নতুন কোড পাঠানো হয়েছে।");
    } catch (err) {
      setError(err.response?.data?.message || "কোড পুনরায় পাঠানো যায়নি।");
    }
  };

  return (
    <section className="section container" style={{ maxWidth: 460 }}>
      <h1 className="section-title">রেজিস্ট্রেশন</h1>

      {stage === "form" && (
        <form onSubmit={handleRegisterSubmit} className="card-devotional p-4">
          <fieldset disabled={submitting} className="border-0 p-0 m-0">
            <div className="mb-3">
              <label className="form-label">ইউজারনেম</label>
              <input className="form-control" autoComplete="off" required value={form.userName} onChange={(e) => handleChange("userName", e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">পূর্ণ নাম</label>
              <input className="form-control" autoComplete="off" required value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">ইমেইল</label>
              <input type="email" className="form-control" autoComplete="off" required value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">পাসওয়ার্ড</label>
              <input type="password" className="form-control" autoComplete="new-password" required minLength={6} value={form.password} onChange={(e) => handleChange("password", e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">প্রোফাইল ছবি</label>
              <input type="file" accept="image/*" className="form-control" required onChange={(e) => setAvatar(e.target.files[0])} />
            </div>
          </fieldset>

          {submitting && (
            <p className="text-secondary small d-flex align-items-center gap-2 mb-3">
              <FaSpinner className="spin-icon" />
              ছবি আপলোড ও ইমেইল পাঠানো হচ্ছে — এতে কিছুক্ষণ সময় লাগতে পারে, পাতাটি বন্ধ করবেন না।
            </p>
          )}

          {error && <p className="text-danger small">{error}</p>}

          <button type="submit" className="btn btn-marigold w-100 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
            {submitting ? (<><FaSpinner className="spin-icon" /> প্রসেসিং হচ্ছে...</>) : "রেজিস্ট্রেশন করুন"}
          </button>

          <p className="text-center mt-3 mb-0 small">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login">লগইন করুন</Link>
          </p>
        </form>
      )}

      {stage === "otp" && (
        <form onSubmit={handleOtpSubmit} className="card-devotional p-4">
          <p className="text-secondary small">
            <strong>{form.email}</strong>-এ পাঠানো ৬ সংখ্যার কোডটি দিন।
          </p>

          <div className="mb-3">
            <label className="form-label">ভেরিফিকেশন কোড</label>
            <input
              className="form-control"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {info && <p className="text-success small">{info}</p>}
          {error && <p className="text-danger small">{error}</p>}

          <button type="submit" className="btn btn-marigold w-100 mb-2 d-flex align-items-center justify-content-center gap-2" disabled={submitting}>
            {submitting ? (<><FaSpinner className="spin-icon" /> যাচাই হচ্ছে...</>) : "যাচাই করুন"}
          </button>
          <button type="button" className="btn btn-outline-maroon w-100" onClick={handleResend}>
            কোড আবার পাঠান
          </button>
        </form>
      )}
    </section>
  );
};

export default Register;
