import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext.jsx";
import AnimatedSection from "../common/AnimatedSection.jsx";
import { hoverBounce } from "../../utils/motion.js";
import "./Footer.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection as="footer" className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">॥ {t("nav.brand")} ॥</div>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <div>
          <h6 className="footer-heading">{t("footer.explore")}</h6>
          <ul className="footer-links">
            <li><Link to="/songs">{t("nav.songs")}</Link></li>
            <li><Link to="/prayer-times">{t("nav.prayerTimes")}</Link></li>
            <li><Link to="/prayers">{t("nav.prayers")}</Link></li>
            <li><Link to="/scriptures">{t("nav.scriptures")}</Link></li>
            <li><Link to="/stories">{t("nav.stories")}</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="footer-heading">{t("footer.contact")}</h6>
          <div className="footer-socials">
            <motion.a href="#" aria-label="Facebook" whileHover={hoverBounce.whileHover} whileTap={hoverBounce.whileTap}>
              <FaFacebook />
            </motion.a>
            <motion.a href="#" aria-label="YouTube" whileHover={hoverBounce.whileHover} whileTap={hoverBounce.whileTap}>
              <FaYoutube />
            </motion.a>
            <motion.a href="#" aria-label="Email" whileHover={hoverBounce.whileHover} whileTap={hoverBounce.whileTap}>
              <FaEnvelope />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Anukul Thakur Songs. {t("footer.rights")}
      </div>
    </AnimatedSection>
  );
};

export default Footer;
