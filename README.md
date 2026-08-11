# AnukulThakurSongs — Frontend

React (Vite) + React Router + Bootstrap 5 + react-icons. Talks to your existing
Express/Mongo backend via cookie-based auth (`withCredentials: true`).

## Setup

```bash
npm install
cp .env.example .env   # edit VITE_API_BASE_URL if your backend isn't on :8000
npm run dev
```

## Backend requirements before this works

1. **CORS**: your backend's `CORS_ORIGIN` env var must exactly match this app's
   dev URL (typically `http://localhost:5173` for Vite), and `credentials: true`
   must stay set in `app.js`'s `cors()` config (it already is).
2. **Cookie `secure: true` on localhost**: same caveat as before — if login
   succeeds but `current-user` still comes back logged-out, temporarily set
   `secure: false` for non-production in `user.controller.js`'s `cookieOptions`.
3. **Admin role**: log in as a normal user first, then flip that user's `role`
   to `"admin"` directly in MongoDB — there's still no endpoint to do this.

## Hero video

Drop your actual Anukul Thakur video file at `public/media/anukul-thakur-hero.mp4`
(create the `public/media/` folder) — `HeroSection.jsx` already points at that
path. If you'd rather stream from Cloudinary/YouTube instead of a static file,
swap the `<source src="...">` in `src/components/home/HeroSection.jsx`.

## Structure

```
src/
  api/axios.js              — shared axios instance (withCredentials)
  context/AuthContext.jsx   — current user + login/logout, used by ProtectedRoute
  components/layout/        — Navbar (sticky), Footer, PublicLayout, AdminLayout
  components/home/          — HeroSection, SectionDivider (signature element)
  components/admin/         — AdminResourceTable (generic CRUD table, reused
                               across Categories/Songs/PrayerTimes/PrayerSongs/
                               Scriptures admin pages)
  pages/                    — public pages (Home, Songs, SongDetail,
                               PrayerTimes, PrayerSongs, Scriptures, Login)
  pages/admin/               — Dashboard + one page per resource, plus
                               PrayerOrderAdmin (assigns/reorders which songs
                               appear in morning/evening)
```

## Known backend gaps this frontend works around or surfaces

- `GET /songs` (also used by the admin song list) always filters to
  `isPublished: true` — there's no admin override to see unpublished songs.
  Newly created songs default to published so they'll appear, but if you add
  an "unpublish" flow later, this list will need a backend fix to show them
  to admins.
- `POST /prayer-songs` has no duplicate-title guard (a prior version did,
  this one doesn't) — the admin form doesn't prevent creating two songs with
  the same title.
- `PATCH`/`DELETE /prayers/times/:id` don't exist — editing a prayer time
  just re-submits the upsert `POST /prayers/times`, and there's no delete
  button for prayer times in the admin UI because the backend has no route
  for it.

## Responsive behavior

Bootstrap grid (`container`, `row`, `col-*`) handles most breakpoints.
Navbar collapses to a hamburger menu under 900px. Hero, admin sidebar, and
footer all have their own breakpoints in their respective `.css` files —
check those if something looks off on a specific device width.
