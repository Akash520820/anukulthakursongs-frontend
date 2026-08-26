import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on navigation by default.
// Without this, a page that was scrolled down (or, on some mobile
// browsers, nudged slightly sideways) stays scrolled after clicking to
// a new route — showing up as content clipped at the top or left edge.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
