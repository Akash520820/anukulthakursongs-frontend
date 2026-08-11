import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import api from "../api/axios.js";

const books = [
  { key: "satyanusaran", label: "সত্যানুসরণ" },
  { key: "narir_niti", label: "নারীর নীতি" }
];

const Scriptures = () => {
  const [active, setActive] = useState("satyanusaran");
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api.get(`/scriptures/${active}`)
      .then((res) => setParagraphs(res.data.data))
      .catch(() => setError("অনুচ্ছেদ লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <section className="section container" style={{ maxWidth: 780 }}>
      <h1 className="section-title d-flex align-items-center gap-2">
        <FaBookOpen style={{ color: "var(--color-marigold)" }} /> গ্রন্থ
      </h1>
      <p className="section-subtitle">শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের মূল গ্রন্থ থেকে অনুচ্ছেদ।</p>

      <div className="d-flex gap-2 mb-4">
        {books.map((b) => (
          <button
            key={b.key}
            className={`btn ${active === b.key ? "btn-marigold" : "btn-outline-maroon"}`}
            onClick={() => setActive(b.key)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {loading && <p>লোড হচ্ছে...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex flex-column gap-4">
        {paragraphs.map((p) => (
          <article key={p._id} className="card-devotional p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              {p.title && <h6 className="mb-0" style={{ color: "var(--color-maroon-dark)" }}>{p.title}</h6>}
              {p.number !== undefined && p.number !== null && (
                <span className="badge" style={{ background: "var(--color-teal)" }}>#{p.number}</span>
              )}
            </div>
            <p style={{ whiteSpace: "pre-line", lineHeight: 1.9, marginBottom: 0 }}>{p.content}</p>
          </article>
        ))}
      </div>

      {!loading && paragraphs.length === 0 && !error && (
        <p className="text-secondary">এই গ্রন্থে এখনো কোনো অনুচ্ছেদ যোগ করা হয়নি।</p>
      )}
    </section>
  );
};

export default Scriptures;
