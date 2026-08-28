import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [deities, setDeities] = useState([]);
  const [deityFilter, setDeityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t, pickContent } = useLanguage();

  useEffect(() => {
    api.get("/stories/deities").then((res) => setDeities(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    const query = deityFilter ? `?deity=${encodeURIComponent(deityFilter)}` : "";
    api
      .get(`/stories${query}`)
      .then((res) => setStories(res.data.data))
      .catch(() => setError(t("stories.loadError")))
      .finally(() => setLoading(false));
  }, [deityFilter]);

  return (
    <section className="section container">
      <h1 className="section-title">{t("stories.title")}</h1>
      <p className="section-subtitle">{t("stories.subtitle")}</p>

      <div className="mb-4" style={{ maxWidth: 320 }}>
        <select
          className="form-select"
          value={deityFilter}
          onChange={(e) => setDeityFilter(e.target.value)}
        >
          <option value="">{t("stories.allDeities")}</option>
          {deities.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {loading && <p>{t("common.loading")}</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {stories.map((story) => (
          <div className="col-12 col-sm-6 col-lg-4" key={story._id}>
            <Link to={`/stories/${story._id}`} className="text-decoration-none">
              <div className="card-devotional h-100 overflow-hidden">
                {story.images?.[0]?.url && (
                  <img
                    src={story.images[0].url}
                    alt=""
                    style={{ width: "100%", height: 180, objectFit: "cover" }}
                  />
                )}
                <div className="p-3">
                  <span
                    className="badge mb-2"
                    style={{ background: "var(--color-teal)" }}
                  >
                    {story.deity}
                  </span>
                  <h6 style={{ color: "var(--color-maroon-dark)" }}>
                    {pickContent(story.title) || pickContent(story.content).slice(0, 60)}
                  </h6>
                  {story.images?.length > 1 && (
                    <div className="text-secondary small mt-1">
                      +{story.images.length - 1}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {!loading && stories.length === 0 && <p className="text-secondary">{t("stories.empty")}</p>}
    </section>
  );
};

export default Stories;
