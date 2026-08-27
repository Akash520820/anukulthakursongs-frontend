import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";
import { useLanguage } from "../context/LanguageContext.jsx";

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
    <section className="section container">
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
          <tbody>
            {times.map((time) => (
              <tr key={time._id}>
                <td className="fw-semibold">{time.month}</td>
                <td>{time.morningTime}</td>
                <td>{time.eveningTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {times.length === 0 && !error && <p className="text-secondary mt-3">{t("prayerTimes.empty")}</p>}
    </section>
  );
};

export default PrayerTimes;
