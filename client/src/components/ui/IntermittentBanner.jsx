import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function IntermittentBanner({text}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          style={{
            position: "fixed",
            bottom: 90,
            right: 30,
            zIndex: 100,
            background: "#6366f1",
            color: "white",
            padding: "10px 16px",
            borderRadius: "24px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          { text }
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntermittentBanner
