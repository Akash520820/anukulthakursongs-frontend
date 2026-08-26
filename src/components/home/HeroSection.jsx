import { FaPlay, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./HeroSection.css";

// Single video hero — no slide carousel. import.meta.env.BASE_URL resolves
// to "/" in dev and "/anukulthakursongs-frontend/" in the deployed build
// (see vite.config.js `base`) — a plain "/media/..." string would 404 on
// GitHub Pages since it isn't prefixed with the repo subpath automatically.
const HeroSection = () => (
  <section className="hero-container">
    <video autoPlay muted loop playsInline className="hero-video">
      <source src={`${import.meta.env.BASE_URL}media/anukul-thakur-hero.mp4`} type="video/mp4" />
    </video>

    <div className="hero-overlay" />

    <div className="hero-content">
      <div className="hero-inner">
        <span className="hero-tag">সত্যানুসরণ ও সেবার পথ</span>

        <h1 className="hero-title">
          শ্রীশ্রীঠাকুর অনুকূলচন্দ্রের <span className="hero-highlight">বাণী, প্রার্থনা ও গান</span>
        </h1>

        <p className="hero-description">
          প্রাতঃ ও সান্ধ্যকালীন প্রার্থনা, ভক্তিমূলক গান এবং সত্যানুসরণ ও নারীর নীতি
          গ্রন্থ থেকে বাছাই করা অনুচ্ছেদ — একত্রে, এক জায়গায়।
        </p>

        <div className="hero-actions">
          <Link to="/prayers" className="btn-marigold hero-btn">
            <FaPlay /> প্রার্থনার গান
          </Link>
          <Link to="/songs" className="btn-outline-hero hero-btn">
            <FaMusic /> গান দেখুন
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
