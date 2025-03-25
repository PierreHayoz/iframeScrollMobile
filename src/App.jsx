import { useRef, useState } from "react";
import "./App.css";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import useScrollDirection from "./hooks/useScrollDirection";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const direction = useScrollDirection();
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  scale.on("change", (latest) => {
    if (latest === 1) {
      setIsAnimating(true);
      setHasAnimated(true);
    } else {
      setIsAnimating(false);
    }
  });

  console.log(isClicked);

  return (
    <div className={`bg-stone-800`}>
      <div className="bg-red-300 fixed top-0 z-[99999]">
        scroll direction : {direction}
      </div>

      <div className="h-screen"></div>
      <motion.div
        ref={ref}
        style={{ scale }}
        className="will-change-transform h-screen w-full overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {hasAnimated && (
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{
                y: { duration: 0.8, delay: 0.8, ease: [0.85, 0, 0.15, 1] },
                opacity: { duration: 1.2, delay: 0.8 },
              }}
              onClick={() => setIsClicked(!isClicked)}
              className="rounded-full absolute bottom-4 right-8 bg-gray-800 text-stone-200 py-2 px-4 z-[100] uppercase text-xs"
            >
              {isClicked
                ? "enter the iframe"
                : "click to exit iframe and keep scrolling"}
            </motion.div>
          )}
        </AnimatePresence>
        {!isAnimating && <div className="h-dvh w-full absolute z-50"></div>}
        {isClicked && <div className="h-dvh w-full absolute z-50"></div>}
        <motion.iframe
          className={`
          absolute top-0 left-0`}
          id="example"
          title="example"
          width="100%"
          height="100%"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik"
        ></motion.iframe>
      </motion.div>
      {isClicked && <div className="h-screen bg-stone-800"></div>}
    </div>
  );
}

export default App;
