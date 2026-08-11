import { Link } from "react-router-dom";
import { FaListAlt, FaMusic, FaClock, FaPray, FaBookOpen } from "react-icons/fa";

const tiles = [
  { to: "/admin/categories", icon: <FaListAlt />, label: "ক্যাটাগরি ব্যবস্থাপনা" },
  { to: "/admin/songs", icon: <FaMusic />, label: "গান ব্যবস্থাপনা" },
  { to: "/admin/prayer-times", icon: <FaClock />, label: "প্রার্থনার সময় ব্যবস্থাপনা" },
  { to: "/admin/prayer-songs", icon: <FaPray />, label: "প্রার্থনার গান ব্যবস্থাপনা" },
  { to: "/admin/prayer-order", icon: <FaPray />, label: "প্রার্থনার ক্রম নির্ধারণ" },
  { to: "/admin/scriptures", icon: <FaBookOpen />, label: "গ্রন্থ ব্যবস্থাপনা" }
];

const Dashboard = () => (
  <div>
    <h2 className="mb-4" style={{ color: "var(--color-maroon-dark)" }}>ড্যাশবোর্ড</h2>
    <div className="row g-4">
      {tiles.map((t) => (
        <div className="col-12 col-sm-6 col-lg-4" key={t.to}>
          <Link to={t.to} className="text-decoration-none">
            <div className="card-devotional p-4 h-100 d-flex flex-column align-items-start gap-2">
              <div className="fs-3" style={{ color: "var(--color-marigold)" }}>{t.icon}</div>
              <div className="fw-semibold" style={{ color: "var(--color-maroon-dark)" }}>{t.label}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
