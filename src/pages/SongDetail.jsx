import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api/axios.js";

const langKeyMap = { Bengali: "bengali", Hindi: "hindi", English: "english" };

const SongDetail = () => {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const [activeLang, setActiveLang] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/songs/${songId}`)
      .then((res) => {
        setSong(res.data.data);
        setActiveLang(res.data.data.language?.[0] || "Bengali");
      })
      .catch(() => setError("গানটি পাওয়া যায়নি।"));
  }, [songId]);

  if (error) return <section className="section container"><p className="text-danger">{error}</p></section>;
  if (!song) return <section className="section container">লোড হচ্ছে...</section>;

  return (
    <section className="section container" style={{ maxWidth: 760 }}>
      <Link to="/songs" className="d-inline-flex align-items-center gap-2 mb-4 text-secondary">
        <FaArrowLeft /> গান তালিকায় ফিরুন
      </Link>

      <h1 className="section-title">{song.title}</h1>
      {song.category?.name && <p className="text-secondary mb-4">{song.category.name}</p>}

      <div className="d-flex gap-2 mb-4">
        {song.language?.map((lang) => (
          <button
            key={lang}
            className={`btn btn-sm ${activeLang === lang ? "btn-marigold" : "btn-outline-maroon"}`}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="card-devotional p-4">
        <p style={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: 2 }}>
          {song.lyrics?.[langKeyMap[activeLang]] || "এই ভাষায় লিরিক্স নেই।"}
        </p>
      </div>
    </section>
  );
};

export default SongDetail;
