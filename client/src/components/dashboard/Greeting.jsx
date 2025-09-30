import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TypewriterText({ text, speed = 80, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span className="text-sm text-text-secondary">{displayed}</span>;
}

export default function Greeting({ user }) {
  const name = user.name.split(" ")[0];

  // Time-based greeting
  function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${name} ☀️`;
    if (hour < 18) return `Good afternoon, ${name} ☀️`;
    return `Good evening, ${name} 🌙`;
  }

  // Pool of inspirational messages
  const messages = [
    `Let's crush your goals today, ${name}! 🚀`,
    `Small steps every day lead to big results, ${name}. ✨`,
    `Stay focused, ${name} — you got this 💪`,
    `Progress, not perfection, ${name}. 🌱`,
    `Your future self will thank you, ${name}. 🙌`,
  ];

  const [showAlt, setShowAlt] = useState(false);
  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    // pick a random inspirational message once
    setAltMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className="h-6">
      <AnimatePresence mode="wait">
        {!showAlt ? (
          <motion.span
            key="time"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-text-secondary block"
          >
            <TypewriterText
              text={getTimeGreeting()}
              speed={60}
              onComplete={() => setTimeout(() => setShowAlt(true), 1000)} // wait 1s before switching
            />
          </motion.span>
        ) : (
          <motion.span
            key="alt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-text-secondary block"
          >
            <TypewriterText text={altMessage} speed={60} />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
