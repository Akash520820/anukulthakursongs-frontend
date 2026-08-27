import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Songs from "./pages/Songs.jsx";
import SongDetail from "./pages/SongDetail.jsx";
import PrayerTimes from "./pages/PrayerTimes.jsx";
import PrayerSongs from "./pages/PrayerSongs.jsx";
import Scriptures from "./pages/Scriptures.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import Categories from "./pages/admin/Categories.jsx";
import SongsAdmin from "./pages/admin/SongsAdmin.jsx";
import PrayerTimesAdmin from "./pages/admin/PrayerTimesAdmin.jsx";
import PrayerSongsAdmin from "./pages/admin/PrayerSongsAdmin.jsx";
import PrayerOrderAdmin from "./pages/admin/PrayerOrderAdmin.jsx";
import ScripturesAdmin from "./pages/admin/ScripturesAdmin.jsx";

const App = () => (
  <BrowserRouter basename="/anukulthakursongs-frontend/">
    <LanguageProvider>
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/:songId" element={<SongDetail />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/prayers" element={<PrayerSongs />} />
          <Route path="/scriptures" element={<Scriptures />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="songs" element={<SongsAdmin />} />
            <Route path="prayer-times" element={<PrayerTimesAdmin />} />
            <Route path="prayer-songs" element={<PrayerSongsAdmin />} />
            <Route path="prayer-order" element={<PrayerOrderAdmin />} />
            <Route path="scriptures" element={<ScripturesAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
