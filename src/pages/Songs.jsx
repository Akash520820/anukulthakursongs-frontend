import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    const query = categoryFilter ? `?category=${categoryFilter}` : "";
    api
      .get(`/songs${query}`)
      .then((res) => setSongs(res.data.data))
      .catch(() => setError("গান লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <section className="section container">
      <h1 className="section-title">গান</h1>
      <p className="section-subtitle">ক্যাটাগরি অনুযায়ী বাছাই করুন অথবা সবগুলো দেখুন।</p>

      <div className="mb-4" style={{ maxWidth: 320 }}>
        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">সব ক্যাটাগরি</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p>লোড হচ্ছে...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {songs.map((song) => (
          <div className="col-12 col-sm-6 col-lg-4" key={song._id}>
            <Link to={`/songs/${song._id}`} className="text-decoration-none">
              <div className="card-devotional p-3 h-100">
                <h6 style={{ color: "var(--color-maroon-dark)" }}>{song.title}</h6>
                <div className="d-flex gap-2 flex-wrap mt-2">
                  {song.language?.map((lang) => (
                    <span key={lang} className="badge" style={{ background: "var(--color-marigold)", color: "var(--color-maroon-dark)" }}>
                      {lang}
                    </span>
                  ))}
                </div>
                {song.category?.name && (
                  <div className="text-secondary small mt-2">{song.category.name}</div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {!loading && songs.length === 0 && <p className="text-secondary">কোনো গান পাওয়া যায়নি।</p>}
    </section>
  );
};

export default Songs;
