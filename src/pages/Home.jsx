import { Link } from "react-router-dom";
import { FaMusic, FaClock, FaBookOpen } from "react-icons/fa";
import HeroSection from "../components/home/HeroSection.jsx";
import SectionDivider from "../components/home/SectionDivider.jsx";

const cards = [
  {
    to: "/songs",
    icon: <FaMusic />,
    title: "ভক্তিমূলক গান",
    desc: "বিভিন্ন ক্যাটাগরি অনুযায়ী সাজানো গানের সংকলন, একাধিক ভাষায়।"
  },
  {
    to: "/prayers",
    icon: <FaClock />,
    title: "প্রাতঃ ও সান্ধ্য প্রার্থনা",
    desc: "প্রতিদিনের প্রার্থনার নির্ধারিত সময় ও গানের ক্রম।"
  },
  {
    to: "/scriptures",
    icon: <FaBookOpen />,
    title: "সত্যানুসরণ ও নারীর নীতি",
    desc: "শ্রীশ্রীঠাকুরের মূল গ্রন্থ থেকে অনুচ্ছেদ ভিত্তিক পাঠ।"
  }
];

const Home = () => (
  <>
    <HeroSection />

    <section className="section container">
      <h2 className="section-title text-center mx-auto">অন্বেষণ করুন</h2>
      <p className="section-subtitle text-center mx-auto">
        গান, প্রার্থনা এবং গ্রন্থ — সবকিছু একটি জায়গায় সাজানো।
      </p>

      <div className="row g-4">
        {cards.map((c) => (
          <div className="col-12 col-md-4" key={c.to}>
            <Link to={c.to} className="text-decoration-none">
              <div className="card-devotional p-4 h-100">
                <div className="fs-3 mb-3" style={{ color: "var(--color-marigold)" }}>
                  {c.icon}
                </div>
                <h5 className="mb-2" style={{ color: "var(--color-maroon-dark)" }}>{c.title}</h5>
                <p className="mb-0 text-secondary">{c.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>

    <SectionDivider />
  </>
);

export default Home;
