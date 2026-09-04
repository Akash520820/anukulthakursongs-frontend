import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";

const PrayerTimes = () => {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    api.get("/prayers/times")
      .then((res) => setTimes(res.data.data))
      .catch(() => setError(t("prayerTimes.loadError")))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AnimatedSection className="section container">
      <h1 className="section-title">{t("prayerTimes.title")}</h1>
      <p className="section-subtitle">{t("prayerTimes.subtitle")}</p>

      {loading && <p>{t("common.loading")}</p>}
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
          <tbody>
            {times.map((time, idx) => (
              <tr
                key={time._id}
                style={{
                  opacity: 0,
                  animation: `fadeInRow 0.35s ease-out ${idx * 0.04}s forwards`,
                }}
              >
                <td className="fw-semibold">{time.month}</td>
                <td>{time.morningTime}</td>
                <td>{time.eveningTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && times.length === 0 && !error && <p className="text-secondary mt-3">{t("prayerTimes.empty")}</p>}
    </AnimatedSection>
  );
};

export default PrayerTimes;