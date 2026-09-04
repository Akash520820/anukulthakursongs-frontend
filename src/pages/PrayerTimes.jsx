import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";
import { fadeIn, staggerContainer, revealViewport } from "../utils/motion.js";

const PrayerTimes = () => {
  const [times, setTimes] = useState([]);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    api.get("/prayers/times")
      .then((res) => setTimes(res.data.data))
      .catch(() => setError(t("prayerTimes.loadError")));
  }, []);

  return (
    <AnimatedSection className="section container">
      <h1 className="section-title">{t("prayerTimes.title")}</h1>
      <p className="section-subtitle">{t("prayerTimes.subtitle")}</p>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive card-devotional p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>{t("prayerTimes.month")}</th>
              <th><FaSun className="me-2" style={{ color: "var(--color-marigold)" }} />{t("prayerTimes.morning")}</th>
              <th><FaMoon className="me-2" style={{ color: "var(--color-teal)" }} />{t("prayerTimes.evening")}</th>
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={staggerContainer(0.04)}
          >
            {times.map((time) => (
              <motion.tr key={time._id} variants={fadeIn}>
                <td className="fw-semibold">{time.month}</td>
                <td>{time.morningTime}</td>
                <td>{time.eveningTime}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {times.length === 0 && !error && <p className="text-secondary mt-3">{t("prayerTimes.empty")}</p>}
    </AnimatedSection>
  );
};

export default PrayerTimes;
