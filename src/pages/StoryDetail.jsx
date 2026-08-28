import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";

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
    <section className="section container" style={{ maxWidth: 800 }}>
      <Link to="/stories" className="d-inline-flex align-items-center gap-2 mb-4 text-secondary">
        <FaArrowLeft /> {t("stories.backToList")}
      </Link>

      <span className="badge mb-2" style={{ background: "var(--color-teal)" }}>{story.deity}</span>
      {title && <h1 className="section-title">{title}</h1>}

      {story.images?.length > 0 && (
        <div className="mb-4">
          <img
            src={story.images[activeImage].url}
            alt=""
            style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: "var(--radius-md)" }}
          />
          {story.images.length > 1 && (
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {story.images.map((img, idx) => (
                <button
                  key={img.publicId}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className="p-0 border-0 bg-transparent"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img.url}
                    alt=""
                    style={{
                      width: 64, height: 64, objectFit: "cover", borderRadius: 8,
                      outline: idx === activeImage ? "3px solid var(--color-marigold)" : "none"
                    }}
                  />
                </button>
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
    </section>
  );
};

export default StoryDetail;
