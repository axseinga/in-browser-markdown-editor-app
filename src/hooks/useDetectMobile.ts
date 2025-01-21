import { useEffect, useState } from "react";

export const useDetectMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectMobile = () => {
      if (window.innerWidth <= 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    detectMobile();

    window.addEventListener("resize", detectMobile);

    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  return isMobile;
};
