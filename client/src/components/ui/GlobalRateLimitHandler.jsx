import { useEffect, useState } from "react";
import RateLimitedUI from "./RateLimitedUI";

export function GlobalRateLimitHandler() {
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsRateLimited(true);

      // Auto-hide after 5s (or whatever time you want)
      setTimeout(() => {
        setIsRateLimited(false);
      }, 5000);
    };

    window.addEventListener("rateLimited", handler);
    return () => window.removeEventListener("rateLimited", handler);
  }, []);

  if (!isRateLimited) return null;

  return <RateLimitedUI />;
}

export default GlobalRateLimitHandler
