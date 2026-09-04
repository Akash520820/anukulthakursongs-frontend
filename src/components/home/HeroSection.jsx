import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { staggerContainer, fadeInUp, buttonBounce } from "../../utils/motion.js";
import "./HeroSection.css";

// Single video hero — no slide carousel. import.meta.env.BASE_URL resolves
// to "/" in dev and "/anukulthakursongs-frontend/" in the deployed build
// (see vite.config.js `base`) — a plain "/media/..." string would 404 on
// GitHub Pages since it isn't prefixed with the repo subpath automatically.
const HeroSection = () => {
  const videoRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Belt-and-braces for autoplay: some browsers only honor a muted
    // video if `.muted` is also set as a JS property (not just the JSX
    // attribute), and .play() can return a rejected promise if it was
    // blocked — catching it avoids an uncaught-promise console error.
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* Autoplay blocked — the user can still tap the video to play it. */
      });
    }
  }, []);

  return (
    <section className="hero-container">
      <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="hero-video">
        <source src={`${import.meta.env.BASE_URL}media/anukul-thakur-hero.mp4`} type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.div
          className="hero-inner"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.1)}
        >
          <motion.span variants={fadeInUp} className="hero-tag">
            {t("hero.tag")}
          </motion.span>

          <motion.h1 variants={fadeInUp} className="hero-title">
            {t("hero.titlePrefix")} <span className="hero-highlight">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero-description">
            {t("hero.description")}
          </motion.p>

          <motion.div variants={fadeInUp} className="hero-actions">
            <motion.div {...buttonBounce}>
              <Link to="/prayers" className="btn-marigold hero-btn">
                <FaPlay /> {t("hero.ctaPrayers")}
              </Link>
            </motion.div>
            <motion.div {...buttonBounce}>
              <Link to="/songs" className="btn-outline-hero hero-btn">
                <FaMusic /> {t("hero.ctaSongs")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
