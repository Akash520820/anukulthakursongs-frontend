import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import api from "../api/axios.js";

const PrayerTimes = () => {
  const [times, setTimes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/prayers/times")
      .then((res) => setTimes(res.data.data))
      .catch(() => setError("প্রার্থনার সময় লোড করা যায়নি।"));
  }, []);

  return (
    <section className="section container">
      <h1 className="section-title">প্রার্থনার সময়</h1>
      <p className="section-subtitle">মাস অনুযায়ী প্রাতঃ ও সান্ধ্যকালীন প্রার্থনার সময়সূচি।</p>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive card-devotional p-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>মাস</th>
              <th><FaSun className="me-2" style={{ color: "var(--color-marigold)" }} />প্রাতঃকাল</th>
              <th><FaMoon className="me-2" style={{ color: "var(--color-teal)" }} />সন্ধ্যাকাল</th>
            </tr>
          </thead>
          <tbody>
            {times.map((t) => (
              <tr key={t._id}>
                <td className="fw-semibold">{t.month}</td>
                <td>{t.morningTime}</td>
                <td>{t.eveningTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {times.length === 0 && !error && <p className="text-secondary mt-3">এখনো কোনো সময় নির্ধারণ করা হয়নি।</p>}
    </section>
  );
};

export default PrayerTimes;
