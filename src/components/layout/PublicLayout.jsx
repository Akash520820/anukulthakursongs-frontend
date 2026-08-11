import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const PublicLayout = () => (
  <>
    <Navbar />
    <main className="page-wrapper">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default PublicLayout;
