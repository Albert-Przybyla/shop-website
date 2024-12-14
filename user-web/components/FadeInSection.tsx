import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { delay: delay, duration: 1 } },
        hidden: { opacity: 0, transition: { delay: delay, duration: 1 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
