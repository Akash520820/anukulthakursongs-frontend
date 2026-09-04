import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";

const StoryDetail = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");
  const { t, pickContent } = useLanguage();

  useEffect(() => {
    api
      .get(`/stories/${storyId}`)
      .then((res) => { setStory(res.data.data); setActiveImage(0); })
      .catch(() => setError(t("stories.notFound")));
  }, [storyId]);

  if (error) return <section className="section container"><p className="text-danger">{error}</p></section>;
  if (!story) return <section className="section container">{t("common.loading")}</section>;

  const title = pickContent(story.title);
  const content = pickContent(story.content);

  return (
    <AnimatedSection className="section container" style={{ maxWidth: 800 }}>
      <Link to="/stories" className="d-inline-flex align-items-center gap-2 mb-4 text-secondary">
        <FaArrowLeft /> {t("stories.backToList")}
      </Link>

      <div className="d-flex gap-2 flex-wrap mb-2">
        {story.deity && (
          <span className="badge" style={{ background: "var(--color-teal)" }}>{story.deity}</span>
        )}
        {story.source && (
          <span className="badge" style={{ background: "var(--color-marigold)", color: "var(--color-maroon-dark)" }}>{story.source}</span>
        )}
      </div>
      {title && <h1 className="section-title">{title}</h1>}

      {story.video?.url && (
        <div className="mb-4">
          <video
            controls
            preload="metadata"
            src={story.video.url}
            style={{ width: "100%", maxHeight: 480, borderRadius: "var(--radius-md)", background: "#000" }}
          />
        </div>
      )}

      {story.images?.length > 0 && (
        <div className="mb-4">
          <div style={{ overflow: "hidden", borderRadius: "var(--radius-md)" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={story.images[activeImage].url}
                alt=""
                style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>
          {story.images.length > 1 && (
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {story.images.map((img, idx) => (
                <motion.button
                  key={img.publicId}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className="p-0 border-0 bg-transparent"
                  style={{ cursor: "pointer" }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <img
                    src={img.url}
                    alt=""
                    style={{
                      width: 64, height: 64, objectFit: "cover", borderRadius: 8,
                      outline: idx === activeImage ? "3px solid var(--color-marigold)" : "none"
                    }}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="card-devotional p-4">
        <p style={{ whiteSpace: "pre-line", fontSize: "1.05rem", lineHeight: 1.9 }}>
          {content || t("stories.noContentInLanguage")}
        </p>
      </div>
    </AnimatedSection>
  );
};

export default StoryDetail;
