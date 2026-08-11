import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";

const tabs = [
  { key: "morning", label: "প্রাতঃকালীন", icon: <FaSun /> },
  { key: "evening", label: "সান্ধ্যকালীন", icon: <FaMoon /> }
];

const PrayerSongs = () => {
  const [active, setActive] = useState("morning");
  const [prayer, setPrayer] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");
    setExpandedId(null);
    api.get(`/prayers/${active}`)
      .then((res) => setPrayer(res.data.data))
      .catch(() => { setPrayer(null); setError(`${active === "morning" ? "প্রাতঃকালীন" : "সান্ধ্যকালীন"} প্রার্থনা এখনো যোগ করা হয়নি।`); })
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <section className="section container" style={{ maxWidth: 820 }}>
      <h1 className="section-title">প্রার্থনার গান</h1>
      <p className="section-subtitle">প্রাতঃ ও সান্ধ্যকালীন প্রার্থনায় গাওয়া গানসমূহ, ক্রম অনুযায়ী।</p>

      <div className="d-flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`btn d-inline-flex align-items-center gap-2 ${active === t.key ? "btn-marigold" : "btn-outline-maroon"}`}
            onClick={() => setActive(t.key)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading && <p>লোড হচ্ছে...</p>}
      {error && <p className="text-secondary">{error}</p>}

      <div className="d-flex flex-column gap-3">
        {prayer?.songs?.map((song, idx) => (
          <div key={song._id} className="card-devotional p-3">
            <button
              className="btn w-100 text-start d-flex justify-content-between align-items-center border-0 bg-transparent p-0"
              onClick={() => setExpandedId(expandedId === song._id ? null : song._id)}
            >
              <span className="fw-semibold" style={{ color: "var(--color-maroon-dark)" }}>
                {idx + 1}. {song.title}
              </span>
              <span className="text-secondary">{expandedId === song._id ? "−" : "+"}</span>
            </button>

            {expandedId === song._id && (
              <div className="mt-3 pt-3 border-top">
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.9 }}>
                  {song.lyrics?.bengali || song.lyrics?.hindi || song.lyrics?.english}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrayerSongs;
