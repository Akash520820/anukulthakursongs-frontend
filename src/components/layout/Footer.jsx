import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import CloudLayer from "../common/CloudLayer.jsx";
import "./Footer.css";

const Footer = () => (
  <footer className="site-footer">
    <CloudLayer speed={55} count={5} opacity={0.35} />
    <div className="container footer-grid">
      <div>
        <div className="footer-brand">॥ অনুকূল ঠাকুর ॥</div>
        <p className="footer-tagline">
          সত্যানুসরণ ও সেবার পথে — প্রার্থনা, গান ও গ্রন্থের একটি সংকলন।
        </p>
      </div>

      <div>
        <h6 className="footer-heading">অন্বেষণ করুন</h6>
        <ul className="footer-links">
          <li><Link to="/songs">গান</Link></li>
          <li><Link to="/prayer-times">প্রার্থনার সময়</Link></li>
          <li><Link to="/prayers">প্রার্থনা</Link></li>
          <li><Link to="/scriptures">গ্রন্থ</Link></li>
        </ul>
      </div>

      <div>
        <h6 className="footer-heading">যোগাযোগ</h6>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="#" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      © {new Date().getFullYear()} Anukul Thakur Songs. সর্বস্বত্ব সংরক্ষিত।
    </div>
  </footer>
);

export default Footer;
