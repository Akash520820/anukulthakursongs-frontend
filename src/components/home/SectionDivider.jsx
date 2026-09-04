import { motion } from "framer-motion";
import { revealViewport } from "../../utils/motion.js";

// Signature element: a marigold garland scallop — echoes the actual flower
// garlands used in these prayers, used once per major section break.
const SectionDivider = () => (
  <motion.svg
    className="garland-divider"
    viewBox="0 0 1200 40"
    preserveAspectRatio="none"
    aria-hidden="true"
    initial={{ opacity: 0, scaleX: 0.9 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={revealViewport}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <path
      d="M0,10 Q50,40 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10 T1100,10 T1200,10"
      fill="none"
      stroke="var(--color-marigold)"
      strokeWidth="3"
    />
    {Array.from({ length: 25 }).map((_, i) => (
      <circle key={i} cx={i * 50} cy={i % 2 === 0 ? 2 : 18} r="4" fill="var(--color-maroon)" />
    ))}
  </motion.svg>
);

export default SectionDivider;
