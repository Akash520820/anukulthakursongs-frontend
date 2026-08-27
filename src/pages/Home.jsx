import { Link } from "react-router-dom";
import { FaMusic, FaClock, FaBookOpen } from "react-icons/fa";
import HeroSection from "../components/home/HeroSection.jsx";
import SectionDivider from "../components/home/SectionDivider.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const cards = [
  { to: "/songs", icon: <FaMusic />, titleKey: "home.cardSongsTitle", descKey: "home.cardSongsDesc" },
  { to: "/prayers", icon: <FaClock />, titleKey: "home.cardPrayersTitle", descKey: "home.cardPrayersDesc" },
  { to: "/scriptures", icon: <FaBookOpen />, titleKey: "home.cardScripturesTitle", descKey: "home.cardScripturesDesc" }
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />

      <section className="section container">
        <h2 className="section-title text-center mx-auto">{t("home.exploreTitle")}</h2>
        <p className="section-subtitle text-center mx-auto">{t("home.exploreSubtitle")}</p>

        <div className="row g-4">
          {cards.map((c) => (
            <div className="col-12 col-md-4" key={c.to}>
              <Link to={c.to} className="text-decoration-none">
                <div className="card-devotional p-4 h-100">
                  <div className="fs-3 mb-3" style={{ color: "var(--color-marigold)" }}>
                    {c.icon}
                  </div>
                  <h5 className="mb-2" style={{ color: "var(--color-maroon-dark)" }}>{t(c.titleKey)}</h5>
                  <p className="mb-0 text-secondary">{t(c.descKey)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />
    </>
  );
};

export default Home;
