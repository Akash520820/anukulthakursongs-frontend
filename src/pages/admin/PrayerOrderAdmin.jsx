import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import api from "../../api/axios.js";

const tabs = [
  { key: "morning", label: "প্রাতঃকালীন", icon: <FaSun /> },
  { key: "evening", label: "সান্ধ্যকালীন", icon: <FaMoon /> }
];

// Sets WHICH songs appear for morning/evening and in WHAT ORDER, by
// POSTing an ordered array of existing PrayerSong ids to /prayers/:type.
// This does not create/edit song content — that's PrayerSongsAdmin.
const PrayerOrderAdmin = () => {
  const [active, setActive] = useState("morning");
  const [pool, setPool] = useState([]);
  const [selected, setSelected] = useState([]); // array of song objects, in order
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/prayer-songs").then((res) => setPool(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setMessage("");
    api.get(`/prayers/${active}`)
      .then((res) => setSelected(res.data.data.songs || []))
      .catch(() => setSelected([]));
  }, [active]);

  const selectedIds = new Set(selected.map((s) => s._id));
  const available = pool.filter((s) => !selectedIds.has(s._id));

  const addSong = (song) => setSelected((s) => [...s, song]);
  const removeSong = (id) => setSelected((s) => s.filter((song) => song._id !== id));

  const moveUp = (index) => {
    if (index === 0) return;
    setSelected((s) => {
      const next = [...s];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index) => {
    setSelected((s) => {
      if (index === s.length - 1) return s;
      const next = [...s];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.post(`/prayers/${active}`, { songIds: selected.map((s) => s._id) });
      setMessage("সংরক্ষণ সফল হয়েছে।");
    } catch (err) {
      setMessage(err.response?.data?.message || "সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4" style={{ color: "var(--color-maroon-dark)" }}>প্রার্থনার ক্রম নির্ধারণ</h2>

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

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <h6>উপলব্ধ গান</h6>
          <div className="card-devotional p-3" style={{ minHeight: 200 }}>
            {available.map((song) => (
              <button
                key={song._id}
                className="btn btn-sm btn-light w-100 text-start mb-2"
                onClick={() => addSong(song)}
              >
                + {song.title}
              </button>
            ))}
            {available.length === 0 && <p className="text-secondary mb-0">সবগুলো গান যোগ করা হয়েছে।</p>}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h6>নির্বাচিত ক্রম ({active === "morning" ? "প্রাতঃকালীন" : "সান্ধ্যকালীন"})</h6>
          <div className="card-devotional p-3" style={{ minHeight: 200 }}>
            {selected.map((song, idx) => (
              <div key={song._id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                <span>{idx + 1}. {song.title}</span>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => moveUp(idx)} disabled={idx === 0}><FaArrowUp /></button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => moveDown(idx)} disabled={idx === selected.length - 1}><FaArrowDown /></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeSong(song._id)}><FaTimes /></button>
                </div>
              </div>
            ))}
            {selected.length === 0 && <p className="text-secondary mb-0">কোনো গান নির্বাচিত হয়নি।</p>}
          </div>
        </div>
      </div>

      {message && <p className="mt-3">{message}</p>}

      <button className="btn btn-marigold mt-4" onClick={handleSave} disabled={saving || selected.length === 0}>
        {saving ? "সংরক্ষণ হচ্ছে..." : "ক্রম সংরক্ষণ করুন"}
      </button>
    </div>
  );
};

export default PrayerOrderAdmin;
