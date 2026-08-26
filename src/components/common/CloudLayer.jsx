import "./CloudLayer.css";

/**
 * Decorative, purely visual cloud layer that drifts left-to-right on an
 * infinite loop. Drop it inside any `position: relative/fixed` + `overflow:
 * hidden` container (Navbar, Hero, Footer, ...). It never intercepts clicks.
 *
 * - speed:   seconds for one full loop (bigger = slower/further away)
 * - count:   how many clouds per pass (the set is duplicated once more
 *            internally so the loop has no visible seam)
 * - opacity: overall layer opacity, handy for a soft parallax "back" layer
 */
const CloudLayer = ({ speed = 45, count = 6, opacity = 1, className = "" }) => {
  const base = Array.from({ length: count }, (_, i) => i);
  const clouds = [...base, ...base]; // duplicate for a seamless loop

  return (
    <div className={`cloud-layer ${className}`} style={{ opacity }} aria-hidden="true">
      <div className="cloud-track" style={{ animationDuration: `${speed}s` }}>
        {clouds.map((i, idx) => (
          <span
            key={idx}
            className={`cloud cloud-v${(i % 4) + 1}`}
            style={{
              top: `${6 + ((i * 17) % 65)}%`,
              transform: `scale(${0.7 + ((i * 13) % 5) / 10})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CloudLayer;
