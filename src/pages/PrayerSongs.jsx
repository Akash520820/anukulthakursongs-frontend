import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";
import { fadeInUp, staggerContainer, collapse, buttonBounce } from "../utils/motion.js";

const tabs = [
  { key: "morning", labelKey: "prayerSongs.morning", icon: <FaSun /> },
  { key: "evening", labelKey: "prayerSongs.evening", icon: <FaMoon /> }
];

const PrayerSongs = () => {
  const [active, setActive] = useState("morning");
  const [prayer, setPrayer] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { t, pickContent } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setError("");
    setExpandedId(null);
    api.get(`/prayers/${active}`)
      .then((res) => setPrayer(res.data.data))
      .catch(() => { setPrayer(null); setError(t("prayerSongs.notAddedYet")); })
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <AnimatedSection className="section container" style={{ maxWidth: 820 }}>
      <h1 className="section-title">{t("prayerSongs.title")}</h1>
      <p className="section-subtitle">{t("prayerSongs.subtitle")}</p>

      <div className="d-flex gap-2 mb-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.key}
            className={`btn d-inline-flex align-items-center gap-2 ${active === tab.key ? "btn-marigold" : "btn-outline-maroon"}`}
            onClick={() => setActive(tab.key)}
            {...buttonBounce}
          >
            {tab.icon} {t(tab.labelKey)}
          </motion.button>
        ))}
      </div>

      {loading && <p>{t("common.loading")}</p>}
      {error && <p className="text-secondary">{error}</p>}

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="d-flex flex-column gap-3"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={staggerContainer(0.06)}
        >
          {prayer?.songs?.map((song, idx) => (
            <motion.div key={song._id} className="card-devotional p-3" variants={fadeInUp}>
              <button
                className="btn w-100 text-start d-flex justify-content-between align-items-center border-0 bg-transparent p-0"
                onClick={() => setExpandedId(expandedId === song._id ? null : song._id)}
              >
                <span className="fw-semibold" style={{ color: "var(--color-maroon-dark)" }}>
                  {idx + 1}. {song.title}
                </span>
                <span className="text-secondary">{expandedId === song._id ? "−" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {expandedId === song._id && (
                  <motion.div
                    key="content"
                    variants={collapse}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mt-3 pt-3 border-top">
                      <p style={{ whiteSpace: "pre-line", lineHeight: 1.9 }}>
                        {pickContent(song.lyrics)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </AnimatedSection>
  );
};

export default PrayerSongs;
