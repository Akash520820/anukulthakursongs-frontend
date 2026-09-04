import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMusic, FaClock, FaBookOpen, FaImages } from "react-icons/fa";
import HeroSection from "../components/home/HeroSection.jsx";
import SectionDivider from "../components/home/SectionDivider.jsx";
import AnimatedSection from "../components/common/AnimatedSection.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fadeInUp, staggerContainer, hoverBounce, revealViewport } from "../utils/motion.js";

const cards = [
  { to: "/songs", icon: <FaMusic />, titleKey: "home.cardSongsTitle", descKey: "home.cardSongsDesc" },
  { to: "/prayers", icon: <FaClock />, titleKey: "home.cardPrayersTitle", descKey: "home.cardPrayersDesc" },
  { to: "/scriptures", icon: <FaBookOpen />, titleKey: "home.cardScripturesTitle", descKey: "home.cardScripturesDesc" },
  { to: "/stories", icon: <FaImages />, titleKey: "home.cardStoriesTitle", descKey: "home.cardStoriesDesc" }
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />

      <AnimatedSection className="section container">
        <h2 className="section-title text-center mx-auto">{t("home.exploreTitle")}</h2>
        <p className="section-subtitle text-center mx-auto">{t("home.exploreSubtitle")}</p>

        <motion.div
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer(0.1)}
        >
          {cards.map((c) => (
            <motion.div className="col-12 col-sm-6 col-lg-3" key={c.to} variants={fadeInUp}>
              <Link to={c.to} className="text-decoration-none">
                <motion.div className="card-devotional p-4 h-100" whileHover={hoverBounce.whileHover} whileTap={hoverBounce.whileTap}>
                  <div className="fs-3 mb-3" style={{ color: "var(--color-marigold)" }}>
                    {c.icon}
                  </div>
                  <h5 className="mb-2" style={{ color: "var(--color-maroon-dark)" }}>{t(c.titleKey)}</h5>
                  <p className="mb-0 text-secondary">{t(c.descKey)}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      <SectionDivider />
    </>
  );
};

export default Home;
