import { motion } from "framer-motion";
import { fadeInUp, revealViewport } from "../../utils/motion.js";

/**
 * Wraps a page-level block in a fade-in + slide-up reveal that fires once
 * when it scrolls into view. Keeps every page section animating the same
 * way instead of each page re-implementing whileInView by hand.
 */
const AnimatedSection = ({ as = "section", className, style, children, ...rest }) => {
  const MotionTag = motion[as] || motion.section;
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeInUp}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;
