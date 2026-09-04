import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";
import { hoverBounce } from "../utils/motion.js";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [deities, setDeities] = useState([]);
  const [sources, setSources] = useState([]);
  const [deityFilter, setDeityFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t, pickContent } = useLanguage();

  useEffect(() => {
    api.get("/stories/deities").then((res) => setDeities(res.data.data)).catch(() => {});
    api.get("/stories/sources").then((res) => setSources(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (deityFilter) params.set("deity", deityFilter);
    if (sourceFilter) params.set("source", sourceFilter);
    const query = params.toString() ? `?${params.toString()}` : "";
    api
      .get(`/stories${query}`)
      .then((res) => setStories(res.data.data))
      .catch(() => setError(t("stories.loadError")))
      .finally(() => setLoading(false));
  }, [deityFilter, sourceFilter]);

  return (
    <AnimatedSection className="section container">
      <h1 className="section-title">{t("stories.title")}</h1>
      <p className="section-subtitle">{t("stories.subtitle")}</p>

      <div className="mb-4 d-flex gap-3 flex-wrap">
        <select
          className="form-select"
          style={{ maxWidth: 260 }}
          value={deityFilter}
          onChange={(e) => setDeityFilter(e.target.value)}
        >
          <option value="">{t("stories.allDeities")}</option>
          {deities.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          className="form-select"
          style={{ maxWidth: 260 }}
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="">{t("stories.allSources")}</option>
          {sources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading && <p>{t("common.loading")}</p>}
      {error && <p className="text-danger">{error}</p>}

      <motion.div className="row g-4" layout>
        <AnimatePresence mode="popLayout">
          {stories.map((story) => (
            <motion.div
              className="col-12 col-sm-6 col-lg-4"
              key={story._id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/stories/${story._id}`} className="text-decoration-none">
                <motion.div
                  className="card-devotional h-100 overflow-hidden"
                  style={{ position: "relative" }}
                  whileHover={hoverBounce.whileHover}
                  whileTap={hoverBounce.whileTap}
                >
                  {story.images?.[0]?.url && (
                    <img
                      src={story.images[0].url}
                      alt=""
                      style={{ width: "100%", height: 180, objectFit: "cover" }}
                    />
                  )}
                  {story.video?.url && (
                    <span
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        position: "absolute", top: 10, right: 10,
                        width: 32, height: 32, borderRadius: "50%",
                        background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 12
                      }}
                      title="Video"
                    >
                      ▶
                    </span>
                  )}
                  <div className="p-3">
                    <div className="d-flex gap-2 flex-wrap mb-2">
                      {story.deity && (
                        <span className="badge" style={{ background: "var(--color-teal)" }}>{story.deity}</span>
                      )}
                      {story.source && (
                        <span className="badge" style={{ background: "var(--color-marigold)", color: "var(--color-maroon-dark)" }}>{story.source}</span>
                      )}
                    </div>
                    <h6 style={{ color: "var(--color-maroon-dark)" }}>
                      {pickContent(story.title) || pickContent(story.content).slice(0, 60)}
                    </h6>
                    {story.images?.length > 1 && (
                      <div className="text-secondary small mt-1">
                        +{story.images.length - 1}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {!loading && stories.length === 0 && <p className="text-secondary">{t("stories.empty")}</p>}
    </AnimatedSection>
  );
};

export default Stories;
