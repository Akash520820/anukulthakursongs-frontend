// Shared Framer Motion variants — keeps animation timing/easing consistent
// across the whole frontend instead of every component inventing its own.
// Respects prefers-reduced-motion at the CSS level (see index.css); the
// motion durations here are also short enough to feel calm rather than
// showy, fitting a devotional site rather than a marketing landing page.

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Applied via whileHover on cards / list rows for a light tactile "bounce".
export const hoverBounce = {
  whileHover: { y: -4, transition: { type: 'spring', stiffness: 380, damping: 16 } },
  whileTap: { scale: 0.97 },
};

// Applied via whileHover on buttons/links for a subtle lift + bounce.
export const buttonBounce = {
  whileHover: { scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 12 } },
  whileTap: { scale: 0.96 },
};

// Collapsible content (accordion rows, tab panels) — animate height + fade
// so expanding song lyrics / scripture text doesn't just pop in.
export const collapse = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
};

// Default viewport settings for scroll-triggered reveals — fires once,
// a little before the element is fully in view.
export const revealViewport = { once: true, amount: 0.2 };
