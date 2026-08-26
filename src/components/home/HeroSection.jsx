import { FaPlay, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import CloudLayer from "../common/CloudLayer.jsx";
import "./HeroSection.css";

// Single video hero — no slide carousel. Swap the <source src> below for
// your actual Anukul Thakur video file/URL when you have it hosted.
const HeroSection = () => (
  <section className="hero-container">
    <video autoPlay muted loop playsInline className="hero-video">
      <source src="/media/anukul-thakur-hero.mp4" type="video/mp4" />
    </video>

    <div className="hero-overlay" />

    {/* Two depth layers for a gentle parallax "3D" drift */}
    <CloudLayer speed={70} count={4} opacity={0.5} className="hero-clouds hero-clouds-back" />
    <CloudLayer speed={42} count={5} opacity={0.85} className="hero-clouds hero-clouds-front" />

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
