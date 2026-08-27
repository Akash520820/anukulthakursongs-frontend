import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useLanguage();

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
      .catch(() => setError(t("songs.loadError")))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  return (
    <section className="section container">
      <h1 className="section-title">{t("songs.title")}</h1>
      <p className="section-subtitle">{t("songs.subtitle")}</p>

      <div className="mb-4" style={{ maxWidth: 320 }}>
        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">{t("songs.allCategories")}</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p>{t("common.loading")}</p>}
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

      {!loading && songs.length === 0 && <p className="text-secondary">{t("songs.empty")}</p>}
    </section>
  );
};

export default Songs;
